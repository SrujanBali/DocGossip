import {Routes, Route} from "react-router"
import { useAuth0 } from "@auth0/auth0-react";
import useSyncUser from "./Hooks/useSyncUser.js"
import Chat from "./Pages/Chat.jsx"
import { useEffect } from "react";
import { setTokenGetter } from "./API/axios.js";

function App() {
  const  {getAccessTokenSilently, isLoading: authLoading} = useAuth0()

  useEffect(() => {
    setTokenGetter(getAccessTokenSilently);
  }, [getAccessTokenSilently])

  const {currentUser, userLoading} = useSyncUser();

  if (authLoading || userLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-500 mx-auto mb-3"></div>
          <p className="text-sm text-gray-400">Syncing your account...</p>
        </div>
      </div>
    );
  }
  return (
    <Routes>
      <Route path="/" element={<Chat currentUser={currentUser}/>}  />
    </Routes>
  )
}

export default App
