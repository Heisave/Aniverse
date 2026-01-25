import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import AnimeCard from "../components/AnimeCard";
import SearchBar from "../components/SearchBar";

export default function Ongoing() {
  const [ongoing, setOngoing] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const PAGE_LIMIT = 20;

  const fetchOngoing = async () => {
    setLoading(true);
    try {
      const offset = (page - 1) * PAGE_LIMIT;

      const url = query
        ? `https://kitsu.io/api/edge/anime?filter[text]=${query}&filter[status]=current&page[limit]=${PAGE_LIMIT}&page[offset]=${offset}`
        : `https://kitsu.io/api/edge/anime?filter[status]=current&page[limit]=${PAGE_LIMIT}&page[offset]=${offset}`;

      const res = await fetch(url);
      const data = await res.json();
      setOngoing(data.data);

      const total = data.meta?.count || 0;
      setTotalPages(Math.ceil(total / PAGE_LIMIT));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOngoing();
  }, [query, page]); // page was missing before

  return (
    <div className="relative min-h-screen bg-zinc-950 text-white">
      <Navbar />

      <div className="fixed top-[64px] left-0 right-0 z-50 bg-zinc-950 px-4 py-4 shadow-md">
        <div className="max-w-7xl mx-auto">
         <SearchBar onSearch={setQuery} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-[140px]">
        <h1 className="text-2xl font-bold mb-4">Ongoing Anime</h1>

        {loading ? (
          <p className="text-center py-20">Loading...</p>
        ) : ongoing.length === 0 ? (
          <p className="text-gray-400 text-center py-20">No results found</p>
        ) : (
          <div className="grid grid-cols-4 gap-2 mt-6">
            {ongoing.map((anime) => (
              <AnimeCard key={anime.id} anime={anime} />
            ))}
          </div>
        )}
      </div>

     <div className="flex items-center justify-center gap-6 py-10 text-sm">
  <button
    onClick={() => setPage(p => Math.max(p - 1, 1))}
    disabled={page === 1}
    className="px-4 py-2 rounded-md font-medium
               bg-zinc-800 text-white
               hover:bg-zinc-700
               disabled:bg-zinc-900 disabled:text-zinc-500
               disabled:cursor-not-allowed
               transition"
  >
    ← Prev
  </button>

  <span className="min-w-[64px] text-center text-zinc-400">
    {page} / {totalPages}
  </span>

  <button
    onClick={() => setPage(p => Math.min(p + 1, totalPages))}
    disabled={page === totalPages}
    className="px-4 py-2 rounded-md font-medium
               bg-zinc-800 text-white
               hover:bg-zinc-700
               disabled:bg-zinc-900 disabled:text-zinc-500
               disabled:cursor-not-allowed
               transition"
  >
    Next →
  </button>
</div>

    </div>
  );
}
