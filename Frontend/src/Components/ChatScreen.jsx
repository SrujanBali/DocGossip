import "../app.css";
import TextArea from "./TextArea";
import PromptBox from "./PromptBox";

function ChatScreen({
  isMessagesLoading,
  messages,
  createMessage,
  currentSessionID,
  llm_processing,
}) {
  return (
    <div className="flex-1 flex flex-col h-full bg-amber-50 relative overflow-y-auto px-6 pb-24">
      <TextArea
        messages={messages}
        llm_processing={llm_processing}
        isMessagesLoading={isMessagesLoading}
        currentSessionID={currentSessionID}
      />
      <PromptBox
        currentSessionID={currentSessionID}
        createMessage={createMessage}
      />
    </div>
  );
}

export default ChatScreen;
