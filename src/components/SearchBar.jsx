import React, { useEffect, useState } from "react";
import AnimeCard from "./AnimeCard";
import SearchBar from "./SearchBar";

export default function AnimeGrid() {
  const [animes, setAnimes] = useState([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(""); // store search input
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const PAGE_LIMIT = 12;

  const fetchAnimes = async (page = 1, query = "") => {
    setLoading(true);
    try {
      const searchParam = query ? `&filter[text]=${encodeURIComponent(query)}` : "";
      const res = await fetch(
        `https://kitsu.io/api/edge/anime?page[limit]=${PAGE_LIMIT}&page[offset]=${
          (page - 1) * PAGE_LIMIT
        }${searchParam}`
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
    fetchAnimes(page, searchQuery);
  }, [page, searchQuery]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setPage(1); // reset to first page when searching
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Search Bar */}
      <div className="mb-6">
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* Anime Grid */}
      {loading ? (
        <p className="text-white text-center py-20">Loading...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {animes.map((anime) => (
            <AnimeCard key={anime.id} anime={anime} />
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center items-center mt-8 space-x-4">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className={`px-4 py-2 rounded-md font-semibold ${
            page === 1
              ? "bg-zinc-700 cursor-not-allowed"
              : "bg-amber-500 hover:bg-amber-400"
          } text-zinc-900 transition`}
        >
          Previous
        </button>
        <span className="text-white">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
          className={`px-4 py-2 rounded-md font-semibold ${
            page === totalPages
              ? "bg-zinc-700 cursor-not-allowed"
              : "bg-amber-500 hover:bg-amber-400"
          } text-zinc-900 transition`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
