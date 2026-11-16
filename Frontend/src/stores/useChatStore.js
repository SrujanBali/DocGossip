import { create } from "zustand";
import api from "../API/axios";

export const useChatStore = create((set, get) => ({
  messages: [],
  chatSessions: [],
  currentSessionID: null,
  isSessionLoading: false,
  isMessagesLoading: false,
  llm_processing: false,

  setMessagesNull: () => set({ messages: [] }),

  setCurrentSessionID: (sessionID) => {
    if (sessionID === null) {
      get().setMessagesNull();
    }
    set({ currentSessionID: sessionID });
  },

  fetchMessages: async (chatID) => {
    if (!chatID) {
      set({ messagse: [] });
      return;
    }
    try {
      set({ isMessagesLoading: true });
      const res = await api.get(`/api/messages/${chatID}`);
      set({ messages: res.data.messages, isMessagesLoading: false });
    } catch (error) {
      console.error(
        `Failed to load messsage by ID:- ${chatID} Error:-  `,
        error,
      );
      set({ isMessagesLoading: false });
    }
  },

  fetchChatSessions: async () => {
    try {
      set({ isSessionLoading: true });
      const res = await api.get("/api/sessions/");
      set({ chatSessions: res.data.chat_sessions, isSessionLoading: false });
    } catch (error) {
      console.error("Failed to load all chat sessions", error);
      set({ isSessionLoading: false });
    }
  },

  createChatSession: async () => {
    try {
      const res = await api.post("/api/sessions/", {
        title: "New Chat",
      });
      set((state) => ({
        chatSessions: [...state.chatSessions, res.data.chat_session],
      }));

      console.log(res.data.chat_session);
    } catch (error) {
      console.error("Failed to create chat session. ", error);
    }
  },

  updateSessionTitle: async (chatID, title) => {
    try {
      const res = await api.put(`/api/sessions/${chatID}`, {
        title: title,
      });
      set((state) => ({
        chatSessions: state.chatSessions.map((session) =>
          session.id === chatID
            ? { ...session, title: res.data.new_title }
            : session,
        ),
      }));
    } catch (error) {
      console.error("Failed to update session title : ", error);
    }
  },

  deleteChatSession: async (chatID) => {
    try {
      await api.delete(`/api/sessions/${chatID}`);
      set((state) => ({
        chatSessions: state.chatSessions.filter(
          (session) => session.id !== chatID,
        ),
      }));
    } catch (error) {
      console.error("Failed to delete session title : ", error);
    }
  },

  createMessage: async (chatID, text_body) => {
    const tempID = `temp-${Date.now()}`;
    const optimisticUserMsg = {
      id: tempID,
      chat_id: chatID,
      text_body: text_body,
      is_ai: false,
    };

    set((state) => ({
      messages: [...state.messages, optimisticUserMsg],
    }));
    try {
      set({ llm_processing: true });
      const res = await api.post(`/api/local_llm/${chatID}`, {
        text_body: text_body,
      });
      set((state) => ({
        messages: [
          ...state.messages.filter((msg) => msg.id !== tempID),
          res.data.user_message,
          res.data.llm_message,
        ],
      }));
      set({ llm_processing: false });
    } catch (error) {
      console.error("Failed to send message: ", error);
      set({ llm_processing: false });

      set((state) => ({
        messages: state.messages.filter((msg) => msg.id !== tempID),
      }));
    }
  },
}));
