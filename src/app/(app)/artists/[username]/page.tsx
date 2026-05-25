"use client";

import { use } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  MapPin,
  Globe,
  MessageCircle,
  ArrowLeft,
  AtSign,
  Play,
  Music,
  ExternalLink,
  Calendar,
} from "lucide-react";
import { VerifiedBadge } from "@/components/app/verified-badge";
import { ArtistCard } from "@/components/app/artist-card";
import { MOCK_ARTISTS } from "@/lib/mock-data";

const ease = [0.22, 1, 0.36, 1] as const;

function SocialIcon({ platform }: { platform: string }) {
  switch (platform) {
    case "instagram":
      return <AtSign className="w-4 h-4" />;
    case "youtube":
      return <Play className="w-4 h-4" />;
    case "spotify":
      return <Music className="w-4 h-4" />;
    case "soundcloud":
      return <Music className="w-4 h-4" />;
    case "website":
      return <Globe className="w-4 h-4" />;
    case "behance":
      return <ExternalLink className="w-4 h-4" />;
    case "tiktok":
      return <Music className="w-4 h-4" />;
    default:
      return <ExternalLink className="w-4 h-4" />;
  }
}

function formatPlatformName(key: string) {
  const names: Record<string, string> = {
    instagram: "Instagram",
    youtube: "YouTube",
    spotify: "Spotify",
    soundcloud: "SoundCloud",
    website: "Website",
    behance: "Behance",
    tiktok: "TikTok",
  };
  return names[key] || key;
}

export default function ArtistProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = use(params);
  const artist = MOCK_ARTISTS.find((a) => a.username === username);

  if (!artist) {
    return (
      <div className="max-w-3xl mx-auto px-5 py-20 text-center">
        <h1 className="text-2xl font-medium">Artist not found</h1>
        <p className="text-muted-foreground text-sm mt-2">
          This profile doesn&apos;t exist or has been removed.
        </p>
        <Link
          href="/discover"
          className="inline-flex items-center gap-2 mt-6 text-sm text-foreground underline underline-offset-4"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Discover
        </Link>
      </div>
    );
  }

  const location = [artist.city, artist.state, artist.country]
    .filter(Boolean)
    .join(", ");
  const socialLinks = Object.entries(artist.links).filter(
    ([, v]) => v
  ) as [string, string][];
  const similar = MOCK_ARTISTS.filter(
    (a) => a.category === artist.category && a.id !== artist.id
  ).slice(0, 4);
  const joinDate = new Date(artist.joinedAt).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="pb-12">
      {/* Banner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease }}
        className="relative h-48 sm:h-64 lg:h-72 bg-muted overflow-hidden"
      >
        <img
          src={artist.banner}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <Link
          href="/discover"
          className="absolute top-4 left-4 sm:top-6 sm:left-6 p-2 rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
      </motion.div>

      <div className="max-w-3xl mx-auto px-5 sm:px-6">
        {/* Profile header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease }}
          className="-mt-16 sm:-mt-20 relative"
        >
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-6">
            <img
              src={artist.image}
              alt={artist.name}
              className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl object-cover border-4 border-background shadow-lg"
            />
            <div className="flex-1 pb-1">
              <h1 className="font-[family-name:var(--font-heading)] text-2xl sm:text-3xl font-medium flex items-center gap-2">
                {artist.name}
                {artist.verified && <VerifiedBadge className="w-5 h-5" />}
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base mt-0.5">
                {artist.role}
              </p>
              <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {location}
                </span>
                {artist.from && (
                  <span className="text-muted-foreground/50">
                    From {artist.from}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2.5 mt-5 sm:mt-6">
            <Link
              href="/messages"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-foreground text-background px-6 py-2.5 rounded-full text-sm font-medium hover:opacity-90 transition-opacity active:scale-[0.97]"
            >
              <MessageCircle className="w-4 h-4" />
              Message
            </Link>
          </div>
        </motion.div>

        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease }}
          className="mt-8"
        >
          <p className="text-sm sm:text-[15px] leading-relaxed text-foreground/80">
            {artist.bio}
          </p>
        </motion.div>

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25, ease }}
          className="mt-5 flex flex-wrap gap-2"
        >
          {artist.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1.5 rounded-full bg-muted/70 text-xs sm:text-sm text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* Links */}
        {socialLinks.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease }}
            className="mt-6 grid grid-cols-2 gap-2"
          >
            {socialLinks.map(([platform, handle]) => (
              <div
                key={platform}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-muted/40 border border-border/30 text-sm"
              >
                <SocialIcon platform={platform} />
                <div className="min-w-0">
                  <div className="text-[11px] text-muted-foreground/50 uppercase tracking-wider">
                    {formatPlatformName(platform)}
                  </div>
                  <div className="text-foreground/80 truncate text-xs">
                    {handle}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Work Samples */}
        {artist.workSamples.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35, ease }}
            className="mt-8"
          >
            <h2 className="font-[family-name:var(--font-heading)] text-lg font-medium mb-4">
              Work
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {artist.workSamples.map((sample, i) => (
                <div
                  key={i}
                  className="aspect-[4/3] rounded-xl overflow-hidden bg-muted"
                >
                  <img
                    src={sample.src}
                    alt={sample.alt}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Member since */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4, ease }}
          className="mt-8 flex items-center gap-2 text-xs text-muted-foreground/40"
        >
          <Calendar className="w-3.5 h-3.5" />
          Member since {joinDate}
        </motion.div>

        {/* Similar Artists */}
        {similar.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45, ease }}
            className="mt-10 pt-8 border-t border-border/30"
          >
            <h2 className="font-[family-name:var(--font-heading)] text-lg font-medium mb-5">
              Similar Creatives
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {similar.map((a) => (
                <ArtistCard key={a.id} artist={a} />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
