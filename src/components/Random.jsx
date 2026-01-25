import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import AnimeCard from "../components/AnimeCard";
import SearchBar from "../components/SearchBar";

const PAGE_LIMIT = 20;

export default function Random() {
  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

  const fetchRandom = async (search = "") => {
    setLoading(true);
    try {
      let collected = [];
      let offset = Math.floor(Math.random() * 20000);

      while (collected.length < PAGE_LIMIT) {
        const url = query
          ? `https://kitsu.io/api/edge/anime?filter[text]=${query}&page[limit]=20&page[offset]=${offset}`
          : `https://kitsu.io/api/edge/anime?page[limit]=20&page[offset]=${offset}`;

        const res = await fetch(url);
        const data = await res.json();

        if (!data.data.length) break;

        collected = [...collected, ...data.data];
        offset += 20;
      }

      setAnimes(collected.slice(0, PAGE_LIMIT));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandom();
  }, []);

  useEffect(() => {
    fetchRandom(query);
  }, [query]);

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar />

      <div className="fixed top-[64px] inset-x-0 z-50 bg-zinc-950 px-4 py-4 shadow-md">
        <div className="max-w-7xl mx-auto">
          <SearchBar onSearch={setQuery} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-[140px]">
        <h1 className="text-2xl font-bold mb-6">Random Picks</h1>

        {loading ? (
          <p className="text-center py-20">Loading...</p>
        ) : animes.length === 0 ? (
          <p className="text-gray-400 text-center py-20">No results found</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {animes.map((anime) => (
              <AnimeCard key={anime.id} anime={anime} />
            ))}
          </div>
        )}

        <div className="flex justify-center py-12">
          <button
            onClick={() => fetchRandom(query)}
            disabled={loading}
            className="px-6 py-3 text-sm font-semibold rounded-md
                       bg-gradient-to-r from-zinc-800 to-zinc-700
                       hover:from-zinc-700 hover:to-zinc-600
                       disabled:opacity-50 disabled:cursor-not-allowed
                       transition"
          >
            Shuffle Picks
          </button>
        </div>
      </div>
    </div>
  );
}
