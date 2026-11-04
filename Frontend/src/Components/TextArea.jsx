import "../app.css";

function TextArea({ messages }) {
  return (
    <div className="flex-1 overflow-y-auto scrollbar-none">
      <div className="flex flex-col space-y-4 py-10 gap-7">
        {Array.isArray(messages) &&
          messages?.map((msg, index) => {
            const isMe = !msg.is_ai;
            return (
              <div
                key={msg.id || index}
                className={`flex flex-col ${isMe ? "items-end" : "items-start"} `}
              >
                <div
                  className={`max-w-[70%] rounded-lg wrap-break-word  text-[25px] py-4 px-2 ${isMe ? "bg-blue-300" : ""}`}
                >
                  <p>{msg.text_body}</p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default TextArea;
