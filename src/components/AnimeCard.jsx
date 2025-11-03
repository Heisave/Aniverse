import React from "react";

export default function AnimeCard({ anime }) {
  const { canonicalTitle, synopsis, posterImage, episodeCount, ageRating } =
    anime.attributes;

  return (
    <div className="bg-zinc-800 rounded-lg overflow-hidden shadow-lg hover:scale-105 transform transition duration-300">
      {/* Poster */}
      <img
        src={posterImage?.medium || posterImage?.tiny}
        alt={canonicalTitle}
        className="w-full h-64 object-cover"
      />

      {/* Content */}
      <div className="p-4">
        <h2 className="text-white text-lg font-bold truncate">{canonicalTitle}</h2>
        <p className="text-gray-400 text-sm mt-1 line-clamp-3">{synopsis}</p>

        <div className="flex justify-between items-center mt-3 text-gray-300 text-sm">
          <span>{episodeCount ? `${episodeCount} eps` : "Unknown"} </span>
          <span>{ageRating || "All Ages"}</span>
        </div>

        <button className="mt-3 w-full bg-amber-500 hover:bg-amber-400 text-zinc-900 font-semibold py-2 rounded transition-colors">
          Watch Now
        </button>
      </div>
    </div>
  );
}
