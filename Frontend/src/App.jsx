import {Routes, Route} from "react-router"
import Chat from "./Pages/Chat.jsx"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Chat />}  />
    </Routes>
  )
}

export default App
