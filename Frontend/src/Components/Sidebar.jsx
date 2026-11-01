import "../app.css";

function Sidebar({ showSidebar }) {
  return (
    <aside
      className={`h-full bg-[#2d4a3e] border-2 transition-all duration-300 ease-in-out shrink-0 ${
        showSidebar ? "w-full sm:w-1/2 md:w-1/2 lg:w-1/5" : "w-0 overflow-hidden border-none"
      }`}
    ></aside>
  );
}

export default Sidebar;