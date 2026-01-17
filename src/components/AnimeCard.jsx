import React from "react";

export default function AnimeCard({ anime }) {
  const attrs = anime?.attributes ?? anime ?? {};

  const canonicalTitle =
    attrs.canonicalTitle ||
    attrs.titles?.en ||
    attrs.title ||
    attrs.name ||
    "Untitled";

  const posterImage = attrs.posterImage || attrs.poster_image || attrs.image || {};
  const episodeCount =
    attrs.episodeCount ?? attrs.episode_count ?? attrs.episodes ?? null;

  const imageUrl =
    posterImage?.large ||
    posterImage?.medium ||
    posterImage?.original ||
    posterImage?.small ||
    null;

  return (
    <div className="relative w-full overflow-hidden rounded-md bg-zinc-900">
      {/* Poster */}
      <div className="relative aspect-[2/3] w-full">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={canonicalTitle}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-zinc-800 text-[10px] text-gray-400">
            No image
          </div>
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/95 to-transparent" />

        {/* Title */}
        <h2 className="absolute bottom-1 left-1 right-1 text-[10px] font-medium text-white leading-snug line-clamp-2">
          {canonicalTitle}
        </h2>
      </div>

      {/* Bottom bar */}
      <div className="flex items-center justify-between px-1.5 py-1 text-[10px] text-gray-300">
        <span>{episodeCount ? `${episodeCount}e` : "??"}</span>

        <button className="rounded bg-amber-500 px-1 md:px-4 md:py-2 text-[10px] font-medium text-zinc-950">
          Watch
        </button>
      </div>
    </div>
  );
}
