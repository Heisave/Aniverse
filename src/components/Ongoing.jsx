// src/pages/Ongoing.jsx
import { useEffect, useState } from "react";
import AnimeCard from "../components/AnimeCard";

export default function Ongoing() {
  const [ongoing, setOngoing] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOngoing = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://kitsu.io/api/edge/anime?filter[status]=current&page[limit]=20"
      );
      const data = await res.json();
      setOngoing(data.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOngoing();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-white mb-6">Ongoing Anime</h1>

      {loading ? (
        <p className="text-white text-center py-20">Loading...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {ongoing.map((anime) => (
            <AnimeCard key={anime.id} anime={anime} />
          ))}
        </div>
      )}
    </div>
  );
}
