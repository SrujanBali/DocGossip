import "../app.css";
import { useState } from "react";

function PrompBox({ createMessage, currentSessionID }) {
  const [textBody, setTextBody] = useState("");

  const handleSendMessage = () => {
    if (textBody.trim() === "") return;
    createMessage(currentSessionID, textBody);
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
    <>

      <div
        className={`text-area absolute left-1/2 -translate-x-1/2 flex justify-center h-[10%] items-center border-2 bg-[#dfccbf] rounded-2xl p-2 transition-all duration-400 ease-in-out ${currentSessionID !== null ? "bottom-4 w-[98%]" : "bottom-80 w-[90%] sm:w-[80%] md:w-[60%] lg:w-[45%]"}`}
      >
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
    </>
  );
}

export default PrompBox;
