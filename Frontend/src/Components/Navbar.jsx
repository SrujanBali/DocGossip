import "../app.css";
import Sidebar_Icon from "../assets/sidebar_icon.svg";
import Logout_Icon from "../assets/logout_icon.svg";
import Account_Icon from "../assets/account-icon.svg";
import { useAuth0 } from "@auth0/auth0-react";

function Navbar({ showSidebar, toggleSidebar }) {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

  return (
    <>
      <div className="fixed flex top-0 left-0 w-full h-16 border-b-2 justify-between px-4 z-30">
        <button
          className={`text-2md h-full cursor-pointer transition-transform duration-300 transform ${showSidebar ? "-rotate-360" : "rotate-180"}`}
          onClick={toggleSidebar}
        >
          <img src={Sidebar_Icon} alt="Sidebar" className="w-7 sm:w-10" />
        </button>
        <h1 className="absolute right-1/2 mt-2 flex text-center items-center text-3xl sm:text-4xl md:text-4xl lg:text-4xl font-roboto-slab">
          DocGossip
        </h1>
        <div>
          {!isAuthenticated ? (
            <>
              <div className="flex  justify-center items-center w-fit h-full gap-6">
                <button
                  className="px-3 py-2 text-2xl font-bold cursor-pointer bg-blue-300 rounded-2xl  transition-colors duration-200 ease-in-out hover:bg-blue-500/70"
                  onClick={() => loginWithRedirect()}
                >
                  Log In
                </button>
                <button
                  className="px-3 py-2 text-2xl font-bold cursor-pointer bg-green-300 rounded-2xl  transition-colors duration-200 ease-in-out hover:bg-green-500/70"
                  onClick={() =>
                    loginWithRedirect({
                      authorizationParams: { screen_hint: "signup" },
                    })
                  }
                >
                  Sign Up
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center h-full gap-6">
              <div>
                {user?.picture ? (
                  <img
                    src={user.picture}
                    alt={user.name || "User"}
                    className="w-8 h-8 rounded-full border border-gray-600"
                  />
                ) : (
                  <img
                    src={Account_Icon}
                    alt="Account"
                    className="w-7 sm:w-10"
                  />
                )}
                <span className="text-sm font-medium hidden md:inline">
                  {user?.name || user?.email}
                </span>
              </div>
              <button
                className="flex h-full justify-center items-center"
                onClick={() =>
                  logout({ logoutParams: { returnTo: window.location.origin } })
                }
              >
                {" "}
                <img
                  src={Logout_Icon}
                  alt="Logout"
                  className="w-7 sm:w-10"
                />{" "}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Navbar;
