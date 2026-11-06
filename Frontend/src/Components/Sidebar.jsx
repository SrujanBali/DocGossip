import { useEffect, useState } from "react";
import "../app.css";
import MoreIcon from "../assets/more_icon.svg";

function Sidebar({
  showSidebar,
  fetchMessages,
  chatSessions,
  current_session,
  setCurrentSession,
  createChatSession,
  updateSessionTitle,
  deleteChatSession,
}) {
  const [openMenuID, setOpenMenuID] = useState(null);
  const [renamingSession, setRenamingSession] = useState(null);
  const [renamingTitle, setRenamingTitle] = useState("")

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openMenuID !== null && !event.target.closest(".menu-container")) {
        setOpenMenuID(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMenuID]);

  const handleSessionClick = (session) => {
    fetchMessages(session.id);
    setCurrentSession(session.id);
    setOpenMenuID(null);
  };

  const toggleMore = (e, sessionID) => {
    e.stopPropagation();
    setOpenMenuID(openMenuID === sessionID ? null : sessionID);
  };

  const handleOpenRename = (session) => {
    setRenamingSession(session)
    setRenamingTitle(session.title);
    setOpenMenuID(null);
  };

  const handleRenameSubmit = () => {
    if (renamingTitle.trim() === ""){
      alert("Give your conversation a name!");
      return
    }
    updateSessionTitle(renamingSession.id, renamingTitle)
    setRenamingSession(null)
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
        <ul className="space-y-6 overflow-y-auto scrollbar-none pb-48">
          {Array.isArray(chatSessions) &&
            chatSessions.map((session, index) => {
              const isMenuOpen = openMenuID === session.id;
              return (
                <div
                  key={session.id || index}
                  className={`menu-container relative flex group hover:bg-amber-50 p-1 hover:text-black rounded-2xl pl-3 cursor-pointer transition-all duration-300 ease-in ${current_session === session.id ? "bg-white/15" : ""} ${showSidebar ? "" : " -translate-x-50"}`}
                >
                  <button
                    className={`w-full flex justify-start text-lg cursor-pointer`}
                    onClick={() => handleSessionClick(session)}
                  >
                    {session.title}
                  </button>
                  <button
                    onClick={(e) => toggleMore(e, session.id)}
                    className=" opacity-0 mr-1 hover:bg-black/80 bg-black/50 px-1 rounded-full group-hover:opacity-100 transition-opacity duration-200 text-bold "
                  >
                    <img src={MoreIcon} alt="More" width={25} />
                  </button>
                  {isMenuOpen && (
                    <div className="absolute right-10 top-12 w-48 bg-zinc-800 rounded-xl z-50 hover:text-white text-white">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenRename(session);
                        }}
                        className="w-full text-left  px-4 py-2 text-lg hover:bg-zinc-500/50 rounded-t-xl hover:text-blue-300"
                      >
                        Rename
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteChatSession(session.id);
                          setOpenMenuID(null);
                        }}
                        className="w-full text-left  px-4 py-2 text-lg hover:bg-zinc-500/50 rounded-b-xl hover:text-red-300"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                  {renamingSession && (
                    <div className="fixed inset-0  z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs">
                      <div className="flex flex-col justify-between bg-zinc-900 text-zinc-100 p-6 rounded-2xl shadow-2xl border border-zinc-700 w-[90vw] sm:w-[50vw] md:w-[60vw] lg:w-[50vw] h-fit gap-3">
                        <h3 className="text-2xl font-bold mb-2">
                          Rename Conversation
                        </h3>
                        <input
                          type="text"
                          className="flex w-full text-2xl py-2 px-4 bg-white/10 rounded-2xl placeholder:opacity-50 focus:placeholder:opacity-0"
                          value={renamingTitle}
                          onChange={(e) => setRenamingTitle(e.target.value)}
                          required
                        />
                        <div className="flex w-full p-2 flex-col sm:flex-row sm:justify-end justify-center sm:gap-6 gap-4 text-2xl">
                          <button
                            className="text-red-400 font-bold hover:scale-105"
                            onClick={() => setRenamingSession(null)}
                          >
                            Cancel
                          </button>
                          <button className="text-blue-300 font-bold hover:scale-105" onClick={handleRenameSubmit}>
                            Rename
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
