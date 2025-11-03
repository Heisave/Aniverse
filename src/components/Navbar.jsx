import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUserCircle, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import Searchbar from "./SearchBar";
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = ["Home", "Ongoing", "Movies", "Random"];

  return (
    <nav className="bg-zinc-900 text-white fixed top-0 left-0 right-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <div className="flex-shrink-0 text-2xl font-bold text-red-400 tracking-wide">
            Anime<span className="text-white">web</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">

            {/* Links */}
            {navLinks.map((link) => (
              <button
                key={link}
                className="hover:text-amber-400 transition-colors duration-200 font-medium"
              >
                {link}
              </button>
            ))}

            {/* Search */}
            <div className="flex items-center bg-zinc-800 rounded-md px-3 py-1 ml-4 focus-within:ring-2 focus-within:ring-amber-400">
              <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
              <Searchbar/>
            </div>

            {/* User Icon */}
            <FontAwesomeIcon
              icon={faUserCircle}
              className="text-2xl hover:text-amber-400 cursor-pointer ml-4"
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
                className="text-2xl"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-zinc-800 px-4 pb-4 space-y-3 animate-slideDown">
          {/* Search */}
          <div className="flex items-center bg-zinc-700 rounded-md px-3 py-1">
            <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search anime..."
              className="bg-transparent focus:outline-none text-sm text-gray-200 ml-2 w-full"
            />
          </div>

          {/* Links */}
          {navLinks.map((link) => (
            <button
              key={link}
              className="block w-full text-left hover:text-amber-400 font-medium transition-colors"
            >
              {link}
            </button>
          ))}

          {/* User Icon */}
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
