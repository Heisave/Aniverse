import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import AnimeCard from "../components/AnimeCard";
import SearchBar from "../components/SearchBar";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

  const fetchMovies = async (search = "") => {
    setLoading(true);
    try {
      const url = search
        ? `https://kitsu.io/api/edge/anime?filter[text]=${search}&filter[subtype]=movie`
        : `https://kitsu.io/api/edge/anime?filter[subtype]=movie&page[limit]=20`;

      const res = await fetch(url);
      const data = await res.json();
      setMovies(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(query);
  }, [query]);

  return (
    <div className="relative min-h-screen bg-zinc-950 text-white">
      {/* Navbar */}
      <Navbar />

      {/* Fixed Search Bar below Navbar (adjust top according to Navbar height) */}
      <div className="fixed top-[64px] left-0 right-0 z-50 bg-zinc-950 px-4 py-4 shadow-md">
        <div className="max-w-7xl mx-auto">
          <SearchBar onSearch={setQuery} />
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 pt-[140px]">
        <h1 className="text-2xl font-bold mb-4">Anime Movies</h1>

        {loading ? (
          <p className="text-center py-20">Loading...</p>
        ) : movies.length === 0 ? (
          <p className="text-gray-400 text-center py-20">No results found</p>
        ) : (
          <div className="grid grid-cols-4 gap-2 mt-6">
                     {movies.map((anime) => (
                       <AnimeCard key={anime.id} anime={anime} />
                     ))}
                   </div>
        )}
      </div>
    </div>
  );
}
