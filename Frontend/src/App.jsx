import {Routes, Route} from "react-router"
import useSyncUser from "./Hooks/useSyncUser.js"
import Chat from "./Pages/Chat.jsx"

function App() {
  useSyncUser();
  return (
    <Routes>
      <Route path="/" element={<Chat />}  />
    </Routes>
  )
}

export default App
