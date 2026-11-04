import { create } from "zustand";
import axios from "axios";

const base_URL = import.meta.env.VITE_BASE_URL;

export const useChatStore = create((set) => ({
  messages: [],
  chatSessions: [],
  isLoading: false,

  fetchMessages: async (chatID) => {
    try {
      set({ isLoading: true });
      const res = await axios.get(`${base_URL}/api/messages/${chatID}`);
      set({ messages: res.data.messages, isLoading: false });
    } catch (error) {
      console.error(
        `Failed to load messsage by ID:- ${chatID} Error:-  `,
        error,
      );
      set({ isLoading: false });
    }
  },

  fetchChatSessions: async () => {
    try {
      set({ isLoading: true });
      const res = await axios.get(`${base_URL}/api/sessions/`);
      set({ chatSessions: res.data.chat_sessions, isLoading: false });
    } catch (error) {
      console.error("Failed to load all chat sessions", error);
      set({ isLoading: false });
    }
  },

  createChatSession: async (userID) => {
    try {
      const res = await axios.post(`${base_URL}/api/sessions/`, {
        user_id: userID,
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
}));
