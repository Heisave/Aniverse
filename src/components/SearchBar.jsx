import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function SearchBar({ onSearch }) {
  const [input, setInput] = useState("");

  useEffect(() => {
    const delay = setTimeout(() => {
      onSearch(input);
    }, 400);

    return () => clearTimeout(delay);
  }, [input]);

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Font Awesome search icon */}
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
        <FontAwesomeIcon icon={faSearch} />
      </span>

      <input
        type="text"
        placeholder="Search anime..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="
          w-full
          bg-zinc-900
          text-white
          placeholder:text-gray-500
          rounded-xl
          px-12
          py-3
          border-2 border-transparent
          shadow-inner shadow-black/50
          focus:border-amber-400
          focus:ring-2 focus:ring-amber-400
          focus:ring-opacity-50
          transition-all duration-300
          hover:scale-[1.02] hover:shadow-lg
        "
      />

      {/* Neon glow effect */}
      <span className="
        absolute inset-0 rounded-xl pointer-events-none
        border-2 border-amber-400/30 opacity-0
        hover:opacity-100 transition-opacity duration-300
      "></span>
    </div>
  );
}
