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
    isSessionLoading,
    isMessagesLoading,
    setMessagesNull,
    llm_processing,
    currentSessionID,
    setCurrentSessionID,
    fetchMessages,
    chatSessions,
    fetchChatSessions,
    createChatSession,
    updateSessionTitle,
    deleteChatSession,
    createMessage,
  } = useChatStore();

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
          isSessionLoading={isSessionLoading}
          showSidebar={showSidebar}
          fetchMessages={fetchMessages}
          setMessagesNull={setMessagesNull}
          chatSessions={chatSessions}
          currentSessionID={currentSessionID}
          setCurrentSessionID={setCurrentSessionID}
          createChatSession={createChatSession}
          updateSessionTitle={updateSessionTitle}
          deleteChatSession={deleteChatSession}
        />
        <ChatScreen
          isMessagesLoading={isMessagesLoading}
          showSidebar={showSidebar}
          messages={messages}
          createMessage={createMessage}
          currentSessionID={currentSessionID}
          llm_processing={llm_processing}
        />
      </div>
    </div>
  );
}

export default Chat;
