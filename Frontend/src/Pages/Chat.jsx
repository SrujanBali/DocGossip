import "../app.css";
import { useState } from "react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import TextScreen from "../Components/TextScreen";

function Chat() {
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <div className="flex w-screen h-screen bg-[#f4f1ea] overflow-hidden">
      <Navbar
        showSidebar={showSidebar}
        toggleSidebar={() => setShowSidebar((prev) => !prev)}
      />
      <div className="flex w-full h-full pt-16">
        <Sidebar showSidebar={showSidebar} />
        <TextScreen showSidebar={showSidebar} />
      </div>
    </div>
  );
}

export default Chat;