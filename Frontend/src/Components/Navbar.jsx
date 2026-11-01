import "../app.css"
import Sidebar_Icon from "../assets/sidebar_icon.svg";
import Logout_Icon from "../assets/logout_icon.svg"

function Navbar({showSidebar, toggleSidebar}) {
  return (
    <>
      <div className="fixed flex top-0 left-0 w-full h-16 border-b-2 justify-between px-4 z-30">
        <button className={`text-2md h-full cursor-pointer transition-transform duration-300 transform ${showSidebar ? "-rotate-360": "rotate-180"}`} onClick={toggleSidebar}>
          <img src={Sidebar_Icon} alt="Sidebar" className="w-7 sm:w-10"  />
        </button>
        <h1 className="flex text-center items-center text-3xl sm:text-4xl md:text-4xl lg:text-4xl font-roboto-slab">DocGossip</h1>
        <h1 className="flex items-center cursor-pointer]"><img src={Logout_Icon} alt="Logout" className="w-7 sm:w-10" /></h1>
      </div>
    </>
  )
}

export default Navbar