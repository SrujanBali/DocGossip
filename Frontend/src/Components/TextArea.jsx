import "../app.css";
import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { SyncLoader } from "react-spinners";

function TextArea({
  messages,
  llm_processing,
  isMessagesLoading,
}) {
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      className="flex-1 overflow-y-auto scrollbar-none"
      ref={scrollContainerRef}
    >
      {isMessagesLoading ? (
        <div className="flex justify-center items-center h-full">
          Loading...
        </div>
      ) : (
        <div className="flex flex-col space-y-4 py-10 gap-7">
          {Array.isArray(messages) &&
            messages?.map((msg, index) => {
              const isMe = !msg?.is_ai;
              return (
                <div
                  key={msg?.id || index}
                  className={`flex flex-col ${isMe ? "items-end" : "items-start"} animate-message-appear`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg wrap-break-word  text-[25px] pt-4 pb-5 px-3 ${isMe ? "bg-blue-300" : ""}`}
                  >
                    <ReactMarkdown>{msg?.text_body}</ReactMarkdown>
                  </div>
                </div>
              );
            })}
          {llm_processing && (
            <div>
              <div className="max-w-[70%] rounded-lg wrap-break-word  text-[25px] py-4 px-2">
                <SyncLoader size={10} />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default TextArea;
