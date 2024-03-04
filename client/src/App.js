import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import Login from "./pages/login/Login";
import RegisterForm from "./pages/RegisterForm/RegisterForm";
import Chatbot from "./pages/Chat_bot/Chatbot";
import FPassword from "./pages/FPassword/FPassword";
import RestorePassword from "./pages/RestorePassword/RestorePassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<List />} />
        <Route path="/hotels/:id" element={<Hotel />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/FPassword" element={<FPassword />} />
        <Route path="/ResetPassword" element={<RestorePassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
