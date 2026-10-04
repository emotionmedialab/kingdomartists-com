"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ArtistProfile } from "@/components/app/artist-profile";
import { ArtistCard } from "@/components/app/artist-card";
import { getAllArtists, getArtistByUsername } from "@/lib/artist-store";

export default function ArtistProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = use(params);
  const artist = getArtistByUsername(username);

  if (!artist) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-24 text-center">
        <h1 className="serif text-2xl text-paper">Creative not found</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          This profile doesn&apos;t exist or has been removed.
        </p>
        <Link
          href="/discover"
          className="mt-6 inline-flex items-center gap-2 text-sm text-gold underline-offset-4 hover:underline"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Explore
        </Link>
      </div>
    );
  }

  const similar = getAllArtists()
    .filter((a) => a.category === artist.category && a.id !== artist.id)
    .slice(0, 4);

  return (
    <div className="pb-16">
      <div className="mx-auto max-w-[1280px] px-5 pt-4 sm:px-8">
        <Link
          href="/discover"
          className="inline-flex items-center gap-2 text-[13px] text-muted-foreground transition-colors hover:text-paper"
        >
          <ArrowLeft className="h-4 w-4" /> Explore
        </Link>
      </div>

      <ArtistProfile artist={artist} />

      {similar.length > 0 && (
        <section className="mx-auto max-w-[1280px] border-t border-line px-5 pt-10 sm:px-8">
          <h2 className="serif mb-5 text-2xl font-normal tracking-[-0.02em] text-paper">
            More from the roster
          </h2>
          <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-4">
            {similar.map((a) => (
              <ArtistCard key={a.id} artist={a} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
