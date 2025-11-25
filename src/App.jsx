import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Login from "./components/login";
import Signup from "./components/signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-zinc-950 text-white">
        <Navbar />

        <Routes>
          <Route path="/home" element={<Header />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

