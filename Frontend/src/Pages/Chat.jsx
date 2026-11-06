import "../app.css";
import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import ChatScreen from "../Components/ChatScreen";
import { useChatStore } from "../stores/useChatStore.js";

function Chat() {
  const [showSidebar, setShowSidebar] = useState(true);
  const {
    messages,
    fetchMessages,
    chatSessions,
    fetchChatSessions,
    createChatSession,
    updateSessionTitle,
    deleteChatSession,
  } = useChatStore();
  const [current_session, setCurrentSession] = useState(null);

  useEffect(() => {
    fetchChatSessions();
  }, [fetchChatSessions]);

  return (
    <div className="flex w-screen h-screen bg-[#f4f1ea] overflow-hidden">
      <Navbar
        showSidebar={showSidebar}
        toggleSidebar={() => setShowSidebar((prev) => !prev)}
      />
      <div className="flex w-full h-full pt-16">
        <Sidebar
          showSidebar={showSidebar}
          fetchMessages={fetchMessages}
          chatSessions={chatSessions}
          current_session={current_session}
          setCurrentSession={setCurrentSession}
          createChatSession={createChatSession}
          updateSessionTitle={updateSessionTitle}
          deleteChatSession={deleteChatSession}
        />
        <ChatScreen showSidebar={showSidebar} messages={messages} />
      </div>
    </div>
  );
}

export default Chat;
