import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import Signup from "./pages/Signup";
import BoardPage from "./pages/board";
import MemoPage from "./pages/memo";
import ChatPage from "../src/components/home/Chatting/Chat";
import ChatRoom from "../src/components/home/Chatting/ChatRoom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/memo" element={<MemoPage />}></Route>
        <Route path="/board" element={<BoardPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/chat" element={<ChatPage />}></Route> 
        <Route path="/chatroom/:id" element={<ChatRoom />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
