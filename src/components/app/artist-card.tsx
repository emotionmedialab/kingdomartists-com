"use client";

import Link from "next/link";
import { MapPin } from "lucide-react";
import { VerifiedBadge } from "./verified-badge";
import type { Artist } from "@/lib/mock-data";

export function ArtistCard({ artist }: { artist: Artist }) {
  const location = [artist.city, artist.state, artist.country]
    .filter(Boolean)
    .join(", ");

  return (
    <Link
      href={`/artists/${artist.username}`}
      className="group block"
    >
      <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-muted">
        <img
          src={artist.image}
          alt={artist.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        {artist.verified && (
          <div className="absolute top-3 right-3">
            <VerifiedBadge className="w-5 h-5" />
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-white text-base font-medium leading-tight flex items-center gap-1.5">
            {artist.name}
          </h3>
          <p className="text-white/60 text-sm mt-0.5">{artist.role}</p>
          <div className="flex items-center gap-1 mt-1.5 text-white/40 text-xs">
            <MapPin className="w-3 h-3 flex-shrink-0" />
            {location}
          </div>
        </div>
      </div>
      <div className="mt-2.5 flex flex-wrap gap-1">
        {artist.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="text-[11px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
