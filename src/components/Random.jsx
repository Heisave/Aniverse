import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import AnimeCard from "../components/AnimeCard";
import SearchBar from "../components/SearchBar";

export default function Random() {
  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

  // Fetch random anime or search results
  const fetchRandom = async (search = "") => {
    setLoading(true);
    try {
      if (search.trim()) {
        // Search API
        const res = await fetch(
          `https://kitsu.io/api/edge/anime?filter[text]=${search}`
        );
        const data = await res.json();
        setAnimes(data.data);
      } else {
        // Random API
        const randomOffset = Math.floor(Math.random() * 20000);
        const res = await fetch(
          `https://kitsu.io/api/edge/anime?page[limit]=18&page[offset]=${randomOffset}`
        );
        const data = await res.json();
        setAnimes(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandom();
  }, []);

  // Trigger search whenever query changes
  useEffect(() => {
    fetchRandom(query);
  }, [query]);

  return (
    <div className="relative min-h-screen bg-zinc-950 text-white">
      {/* Navbar */}
      <Navbar />

      {/* Fixed Search Bar below Navbar */}
      <div className="fixed top-[64px] left-0 right-0 z-50 bg-zinc-950 px-4 py-4 shadow-md">
        <div className="max-w-7xl mx-auto">
          <SearchBar onSearch={setQuery} />
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 pt-[140px]">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Random Picks</h1>

          <button
            onClick={() => fetchRandom(query)}
            className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded text-sm text-white"
          >
            Refresh
          </button>
        </div>

        {loading ? (
          <p className="text-center py-20">Loading...</p>
        ) : animes.length === 0 ? (
          <p className="text-gray-400 text-center py-20">No results found</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 mt-6">
            {animes.map((anime) => (
              <AnimeCard key={anime.id} anime={anime} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
