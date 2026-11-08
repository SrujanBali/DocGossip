import { useState } from "react";
import "../app.css";
import TextArea from "./TextArea";

function ChatScreen({
  messages,
  createMessage,
  current_session,
  llm_processing,
}) {
  const [textBody, setTextBody] = useState("");

  const handleSendMessage = () => {
    if (textBody.trim() === "") return;
    console.log("Chat Screen current_session: ", current_session);
    createMessage(current_session, textBody);
    setTextBody("");
  };

  const handleEnterKeyPress = (event) => {
    if (textBody.trim() === "") return;

    if (event.key === "Enter") {
      if (!event.shiftKey) {
        event.preventDefault();
        handleSendMessage();
      }
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-amber-50 relative overflow-y-auto px-6 pb-24">
      <TextArea messages={messages} llm_processing={llm_processing} />
      <div className="text-area absolute bottom-4 left-6 right-6 flex h-[10%] items-center border-2 bg-[#dfccbf] rounded-2xl p-2">
        <textarea
          name="text-box"
          id="text-box"
          value={textBody}
          onKeyDown={handleEnterKeyPress}
          onChange={(e) => setTextBody(e.target.value)}
          className="flex w-full h-full rounded-2xl text-xl p-2 outline-none resize-none"
          placeholder="Type your message here..."
        ></textarea>
        <button
          className="bg-[#5c7f67] text-white rounded-xl px-4 py-2 ml-2 cursor-pointer"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatScreen;
