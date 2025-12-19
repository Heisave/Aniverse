import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Login from "./components/login";
import Signup from "./components/signup";
import Ongoing from "./components/Ongoing";
import React from "react";
import Movies from "./components/Movies";
import Random from "./components/Random";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-zinc-950 text-white">
        <Navbar />

        <Routes>
          <Route
            path="/ongoing"
            element={<Ongoing />}
          />
          <Route
            path="/random"
            element={<Random />}
          />
          <Route
            path="/movies"
            element={<Movies />}
          />
          <Route path="/" element={<Header />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
