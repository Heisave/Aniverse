import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import AnimeCard from "./AnimeCard";

export default function AnimeGrid() {
  const [animes, setAnimes] = useState([]);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const PAGE_LIMIT = 16;

  const fetchAnimes = async (page = 1, filterText = "") => {
    setLoading(true);
    try {
      const query = filterText ? `&filter[text]=${filterText}` : "";
      const res = await fetch(
        `https://kitsu.io/api/edge/anime?page[limit]=${PAGE_LIMIT}&page[offset]=${
          (page - 1) * PAGE_LIMIT
        }${query}`
      );

      const data = await res.json();
      setAnimes(data.data);

      const total = data.meta?.count || PAGE_LIMIT * 10;
      setTotalPages(Math.ceil(total / PAGE_LIMIT));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // fetch when page or filter changes
  useEffect(() => {
    fetchAnimes(page, filter);
  }, [page, filter]);

  // reset page ONLY when filter changes
  useEffect(() => {
    setPage(1);
  }, [filter]);

  return (
    <div className="relative min-h-screen bg-zinc-950 text-white">
      <Navbar />

      {/* Fixed Search Bar */}
      <div className="fixed top-16 left-0 right-0 z-50 bg-zinc-950 px-4 py-4 shadow-md">
        <div className="max-w-7xl mx-auto">
          <SearchBar onSearch={(text) => setFilter(text)} />
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 pt-[140px]">
        {loading ? (
          <p className="text-center py-20">Loading...</p>
        ) : (
          <div className="grid grid-cols-4 grid-rows-4 gap-2 mt-6">
            {animes.map((anime) => (
              <AnimeCard key={anime.id} anime={anime} />
            ))}
          </div>
        )}

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
    </div>
  );
}
