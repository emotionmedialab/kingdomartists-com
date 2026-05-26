"use client";

import Link from "next/link";
import { MapPin } from "lucide-react";
import { VerifiedBadge } from "./verified-badge";
import type { Artist } from "@/lib/mock-data";

export function ArtistCard({ artist }: { artist: Artist }) {
  const location = [artist.city, artist.state].filter(Boolean).join(", ");

  return (
    <Link href={`/artists/${artist.username}`} className="group block">
      <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-muted shadow-sm group-hover:shadow-lg transition-shadow duration-500">
        <img
          src={artist.image}
          alt={artist.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
        {artist.verified && (
          <div className="absolute top-3 right-3">
            <VerifiedBadge className="w-4.5 h-4.5 drop-shadow-sm" />
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 p-3.5 sm:p-4">
          <h3 className="text-white text-[15px] sm:text-base font-medium leading-tight">
            {artist.name}
          </h3>
          <p className="text-white/55 text-xs sm:text-sm mt-0.5 line-clamp-1">
            {artist.role}
          </p>
          <div className="flex items-center gap-1 mt-1.5 text-white/35 text-[11px] sm:text-xs">
            <MapPin className="w-3 h-3 flex-shrink-0" />
            <span className="truncate">{location}</span>
          </div>
        </div>
      </div>
      <div className="mt-2 flex flex-wrap gap-1">
        {artist.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="text-[10px] sm:text-[11px] px-2 py-0.5 rounded-full bg-muted/80 text-muted-foreground/70"
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
