import React, { useEffect, useState } from "react";
import AnimeCard from "./AnimeCard";

export default function AnimeGrid() {
  const [animes, setAnimes] = useState([]);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const PAGE_LIMIT = 12;

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

  useEffect(() => {
    fetchAnimes(page, filter);
  }, [page, filter]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      {/* Search */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search anime..."
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            setPage(1);
          }}
          className="w-full sm:w-72 px-4 py-2 bg-zinc-900 text-white rounded-md focus:ring-2 focus:ring-amber-500 outline-none"
        />
      </div>

      {/* Grid */}
      {loading ? (
        <p className="text-center text-white py-20">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {animes.map((anime) => (
            <AnimeCard key={anime.id} anime={anime} />
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center items-center mt-10 gap-4">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className={`px-4 py-2 rounded-md font-semibold ${
            page === 1
              ? "bg-zinc-700 cursor-not-allowed"
              : "bg-amber-500 hover:bg-amber-400"
          }`}
        >
          Prev
        </button>

        <span className="text-white">Page {page} / {totalPages}</span>

        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
          className={`px-4 py-2 rounded-md font-semibold ${
            page === totalPages
              ? "bg-zinc-700 cursor-not-allowed"
              : "bg-amber-500 hover:bg-amber-400"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
