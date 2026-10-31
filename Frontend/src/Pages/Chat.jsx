import "../app.css";
import Sidebar_Icon from "../assets/sidebar_icon.svg";
import Logout_Icon from "../assets/logout_icon.svg"
import { useState } from "react";

function Chat() {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggle_sidebar = () => {
    setShowSidebar((prev) => !prev);
  };

  return (
    <div className="relative w-screen h-screen justify-center items-center bg-[#f4f1ea]">
      <div className="fixed flex top-0 left-0 w-full h-16 border-2 justify-between">
        <button className={`text-2md h-full transition-transform duration-300 transform ${showSidebar ? "-rotate-360": "rotate-180"}`} onClick={toggle_sidebar}>
          <img src={Sidebar_Icon} alt="Sidebar" />
        </button>
        <h1 className="flex text-center items-center text-5xl font-roboto-slab">DocGossip</h1>
        <h1 className="flex items-center"><img src={Logout_Icon} alt="Logout" /></h1>
      </div>
      <div
        className={`absolute top-16 left-0 w-[50%] sm:w-3/4 md:w-1/2 lg:w-1/5 h-[calc(100vh-4rem)] border-2 bg-[#2d4a3e] transition-transform duration-300 ease-in-out transform ${showSidebar ? "" : "-translate-x-full "}`}
      ></div>
    </div>
  );
}

export default Chat;
