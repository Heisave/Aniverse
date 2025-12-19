import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faBars,
  faTimes,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";
import Searchbar from "./SearchBar";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const searchRef = useRef(null);
  const navLinks = ["Home", "Ongoing", "Movies", "Random"];
  const navigate = useNavigate();
  const location = useLocation();

  // Debounced search
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchAnime = async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }
      setLoading(true);
      try {
        const res = await fetch(
          `https://kitsu.io/api/edge/anime?filter[text]=${encodeURIComponent(
            query
          )}&page[limit]=6`,
          { signal }
        );
        const data = await res.json();
        setResults(data.data || []);
      } catch (err) {
        if (err.name !== "AbortError") console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchAnime, 300);
    return () => {
      clearTimeout(debounceTimer);
      controller.abort();
    };
  }, [query]);

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowResults(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-zinc-900/80 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div
            className="flex-shrink-0 text-3xl font-extrabold text-red-500 tracking-wider cursor-pointer hover:scale-105 transition-transform"
            onClick={() => navigate("/")}
          >
            Ani<span className="text-white">verse</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => {
              const isActive =
                location.pathname === "/" && link === "Home" ||
                location.pathname.includes(link.toLowerCase());
              return (
                <button
                  key={link}
                  onClick={() =>
                    navigate(link === "Home" ? "/" : `/${link.toLowerCase()}`)
                  }
                  className={`relative font-semibold transition-all hover:text-amber-400 ${isActive ? "text-amber-400 after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-amber-400" : ""
                    }`}
                >
                  {link}
                </button>
              );
            })}

            {/* Search
            <div
              ref={searchRef}
              className="relative ml-4 w-72 group"
            >
              <div className="flex items-center bg-zinc-800 rounded-lg px-3 py-1 focus-within:ring-2 focus-within:ring-amber-400 transition-all duration-200 group-hover:ring-amber-400">
                <FontAwesomeIcon
                  icon={faSearch}
                  className="text-gray-400 mr-2"
                />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setShowResults(true);
                  }}
                  placeholder="Search anime..."
                  className="bg-transparent focus:outline-none text-sm text-gray-200 w-full placeholder-gray-400"
                />
              </div>

              {/* Search Results */}
              {/* {showResults && query && (
                <div className="absolute top-full left-0 right-0 bg-zinc-800 border border-zinc-700 rounded-lg mt-2 max-h-80 overflow-y-auto shadow-xl animate-fadeIn z-50">
                  {loading ? (
                    <p className="text-center text-gray-400 py-2">Loading...</p>
                  ) : results.length > 0 ? (
                    <div className="grid grid-cols-1 gap-1 p-2">
                      {results.map((anime) => (
                        <div
                          key={anime.id}
                          onClick={() => navigate(`/anime/${anime.id}`)}
                          className="flex items-center gap-3 px-2 py-1 hover:bg-zinc-700 cursor-pointer rounded transition-colors"
                        >
                          <img
                            src={anime.attributes.posterImage?.tiny}
                            alt={anime.attributes.canonicalTitle}
                            className="w-12 h-16 object-cover rounded"
                          />
                          <span className="text-sm text-gray-200 truncate">
                            {anime.attributes.canonicalTitle}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-gray-400 py-2">
                      No results found
                    </p>
                  )}
                </div>
              )}
            </div> */}

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
                className="text-2xl"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-zinc-800 px-4 pb-4 space-y-3 animate-slideDown backdrop-blur-md shadow-lg">
          <div className="flex items-center bg-zinc-700 rounded-lg px-3 py-1">
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
              className="block w-full text-left hover:text-amber-400 font-medium transition-colors"
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
