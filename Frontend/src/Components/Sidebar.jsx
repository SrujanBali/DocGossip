import "../app.css";

function Sidebar({ showSidebar, fetchMessages }) {
  return (
    <aside
      className={`h-full bg-[#2d4a3e] border-2 transition-all duration-300 ease-in-out shrink-0 ${
        showSidebar ? "w-full sm:w-1/2 md:w-1/2 lg:w-1/5" : "w-0 overflow-hidden border-none"
      }`}
    >
      <div className="flex flex-col text-zinc-200 p-2">
        <ul className="space-y-6">
          <li>Current Chat Session</li>
          <li>New Chat Session</li>
          <li>Another New Chat Session</li>
          <button className="bg-amber-50 rounded-2xl w-[60%] text-black text-lg" onClick={() => fetchMessages(2)}>Fetch Messages</button>
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;