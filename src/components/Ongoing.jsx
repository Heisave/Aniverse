import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import AnimeCard from "../components/AnimeCard";
import SearchBar from "../components/SearchBar";

export default function Ongoing() {
  const [ongoing, setOngoing] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

  const fetchOngoing = async (search = "") => {
    setLoading(true);
    try {
      const url = search
        ? `https://kitsu.io/api/edge/anime?filter[text]=${search}&filter[status]=current`
        : `https://kitsu.io/api/edge/anime?filter[status]=current&page[limit]=20`;

      const res = await fetch(url);
      const data = await res.json();
      setOngoing(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOngoing(query);
  }, [query]);

  return (
    <div className="relative min-h-screen bg-zinc-950 text-white">
      <Navbar />

      {/* Fixed Search Bar below Navbar */}
      <div className="fixed top-[64px] left-0 right-0 z-50 bg-zinc-950 px-4 py-4 shadow-md">
        <div className="max-w-7xl mx-auto">
          <SearchBar onSearch={setQuery} />
        </div>
      </div>

      {/* Main content */}
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
    </div>
  );
}
