import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faBars, faTimes, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  const navLinks = ["Home", "Ongoing", "Movies", "Random"];
  const navigate = useNavigate();
  const location = useLocation();
  const searchRef = useRef(null);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-zinc-900/90 shadow-md font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <div
            className="flex-shrink-0 text-3xl font-extrabold text-red-500 tracking-wider cursor-pointer hover:scale-105 transition-transform font-sans"
            onClick={() => navigate("/")}
          >
            Ani<span className="text-white">verse</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => {
              const isActive =
                (location.pathname === "/" && link === "Home") ||
                location.pathname.includes(link.toLowerCase());
              return (
                <button
                  key={link}
                  onClick={() =>
                    navigate(link === "Home" ? "/" : `/${link.toLowerCase()}`)
                  }
                  className={`relative font-semibold font-sans transition-all hover:text-amber-400 ${
                    isActive
                      ? "text-amber-400 after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-amber-400"
                      : "text-gray-200"
                  }`}
                >
                  {link}
                </button>
              );
            })}

            {/* User Icon */}
            <FontAwesomeIcon
              icon={faUserCircle}
              className="text-2xl hover:text-amber-400 cursor-pointer ml-4 transition-transform hover:scale-110"
            />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 focus:outline-none"
            >
              <FontAwesomeIcon
                icon={isOpen ? faTimes : faBars}
                className="text-2xl text-gray-200"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-zinc-800 px-4 py-4 space-y-3 shadow-lg animate-slideDown font-sans">
          <div className="flex items-center bg-zinc-700 rounded-lg px-3 py-2">
            <FontAwesomeIcon icon={faSearch} className="text-gray-400 mr-2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search anime..."
              className="bg-transparent focus:outline-none text-sm text-gray-200 w-full placeholder-gray-400"
            />
          </div>

          {navLinks.map((link) => (
            <button
              key={link}
              onClick={() =>
                navigate(link === "Home" ? "/" : `/${link.toLowerCase()}`)
              }
              className="block w-full text-left hover:text-amber-400 font-medium text-gray-200 transition-colors"
            >
              {link}
            </button>
          ))}

          <div className="pt-2 border-t border-zinc-700 flex justify-start">
            <FontAwesomeIcon
              icon={faUserCircle}
              className="text-2xl hover:text-amber-400 cursor-pointer"
            />
          </div>
        </div>
      )}
    </nav>
  );
}
