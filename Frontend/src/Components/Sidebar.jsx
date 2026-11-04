import "../app.css";

function Sidebar({
  showSidebar,
  fetchMessages,
  chatSessions,
  current_session,
  setCurrentSession,
  createChatSession,
}) {
  const handleSessionClick = (session) => {
    fetchMessages(session.id);
    setCurrentSession(session.id);
  };

  return (
    <aside
      className={`h-full bg-[#2d4a3e] border-2 transition-all duration-300 ease-in-out shrink-0 ${
        showSidebar
          ? "w-full sm:w-1/2 md:w-1/2 lg:w-1/5"
          : "w-0 overflow-hidden border-none"
      }`}
    >
      <div className="flex flex-col w-full h-full text-zinc-200 p-2 ">
        <div className="flex w-full bg-black/30 justify-between items-center my-4 p-1">
          <h5
            className={`flex justify-center text-md transition-transform duration-300 ease-in  ${showSidebar ? "" : " -translate-x-50"}`}
          >
            Conversations
          </h5>
          <button
            className="cursor-pointer"
            onClick={() => createChatSession(2)}
          >
            ➕
          </button>
        </div>
        <ul className="space-y-6 overflow-y-auto scrollbar-none">
          {Array.isArray(chatSessions) &&
            chatSessions.map((session, index) => {
              return (
                <div key={session.id || index}>
                  <button
                    className={`w-full flex justify-start hover:bg-amber-50 hover:text-black p-1 rounded-2xl pl-3 cursor-pointer transition-all duration-300 ease-in ${current_session === session.id ? "bg-white/15" : ""} ${showSidebar ? "" : " -translate-x-50"}`}
                    onClick={() => handleSessionClick(session)}
                  >
                    {session.title}
                  </button>
                </div>
              );
            })}
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
