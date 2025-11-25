import { useState, useEffect } from "react";

export default function SearchBar({ onSearch }) {
  const [input, setInput] = useState("");

  useEffect(() => {
    const delay = setTimeout(() => {
      onSearch(input);
    }, 400);

    return () => clearTimeout(delay);
  }, [input, onSearch]); // remove onSearch to avoid unnecessary reruns

  return (
    <input
      type="text"
      placeholder="Search anime..."
      value={input}
      onChange={(e) => setInput(e.target.value)}
      className="bg-zinc-800 rounded-md px-3 py-2 w-full text-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-400"
    />
  );
}
