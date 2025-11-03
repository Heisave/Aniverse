// In App.jsx or your main layout file
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import "./index.css"

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar />
      <Header/>
    </div>
  );
}
