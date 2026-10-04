"use client";

import Link from "next/link";
import { VerifiedBadge } from "./verified-badge";
import type { Artist } from "@/lib/mock-data";

export function ArtistCard({ artist }: { artist: Artist }) {
  const location = [artist.city, artist.state].filter(Boolean).join(", ");

  return (
    <Link href={`/artists/${artist.username}`} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-line bg-bg2">
        {/* User work stays true-color; only a bottom scrim for legibility */}
        <img
          src={artist.image}
          alt={artist.name}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-3.5">
          <h3 className="serif flex items-center gap-1.5 text-[15px] font-normal leading-tight text-white">
            <span className="truncate">{artist.name}</span>
            {artist.verified && <VerifiedBadge className="h-2.5 w-2.5" />}
          </h3>
          <p className="mt-0.5 line-clamp-1 text-xs text-white/60">
            {artist.role}
          </p>
          {location && (
            <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-white/35">
              {location}
            </p>
          )}
        </div>
      </div>
      <div className="mt-2 flex flex-wrap gap-1">
        {artist.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-line px-2 py-0.5 text-[10px] text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
