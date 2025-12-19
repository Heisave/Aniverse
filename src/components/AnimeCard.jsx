import React from "react";

export default function AnimeCard({ anime }) {
  // Support both shapes: anime.attributes (Kitsu-style) or flat anime objects
  const attrs = anime?.attributes ?? anime ?? {};

  const canonicalTitle =
    attrs.canonicalTitle || attrs.titles?.en || attrs.title || attrs.name || 'Untitled';

  const posterImage = attrs.posterImage || attrs.poster_image || attrs.image || {};

  const episodeCount = attrs.episodeCount ?? attrs.episode_count ?? attrs.episodes ?? null;

  const imageUrl = posterImage?.large || posterImage?.medium || posterImage?.original || posterImage?.small || null;

  return (
    <div className="group relative bg-zinc-900 rounded-xl overflow-hidden shadow-xl hover:shadow-amber-500/20 transition-all duration-300">
      {/* Poster */}
      <div className="relative">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={canonicalTitle}
            className="w-full h-72 object-cover group-hover:scale-105 transition duration-300"
          />
        ) : (
          <div className="w-full h-72 bg-zinc-800 flex items-center justify-center text-gray-400">
            <span className="text-center">No image</span>
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/40 to-transparent"></div>

        {/* Title on Image */}
        <h2 className="absolute bottom-3 left-3 right-3 text-lg font-bold text-white drop-shadow-md line-clamp-2">
          {canonicalTitle}
        </h2>
      </div>

      {/* Bottom Section */}
      <div className="p-4 flex items-center justify-between text-gray-300 text-sm">
        <span>{episodeCount ? `${episodeCount} eps` : '?? eps'}</span>

        <button className="bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold px-3 py-1 rounded-md text-sm transition">
          Watch
        </button>
      </div>
    </div>
  );
}
