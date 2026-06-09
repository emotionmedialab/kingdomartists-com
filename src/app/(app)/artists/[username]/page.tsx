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
  Share2,
  Heart,
} from "lucide-react";
import { VerifiedBadge } from "@/components/app/verified-badge";
import { ArtistCard } from "@/components/app/artist-card";
import { MOCK_ARTISTS } from "@/lib/mock-data";
import { getAllArtists, getArtistByUsername } from "@/lib/artist-store";

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
  const artist = getArtistByUsername(username);

  if (!artist) {
    return (
      <div className="max-w-3xl mx-auto px-5 py-20 text-center">
        <h1 className="font-[family-name:var(--font-heading)] text-2xl font-medium">
          Artist not found
        </h1>
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
  const similar = getAllArtists().filter(
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
        className="relative h-40 sm:h-52 lg:h-60 bg-muted overflow-hidden"
      >
        <img
          src={artist.banner}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute top-4 left-4 sm:top-5 sm:left-5 flex gap-2">
          <Link
            href="/discover"
            className="p-2 rounded-full bg-black/30 backdrop-blur-md text-white hover:bg-black/50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </div>
        <div className="absolute top-4 right-4 sm:top-5 sm:right-5 flex gap-2">
          <button className="p-2 rounded-full bg-black/30 backdrop-blur-md text-white hover:bg-black/50 transition-colors">
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </motion.div>

      <div className="max-w-3xl mx-auto px-5 sm:px-6">
        {/* Avatar — overlaps banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease }}
          className="-mt-14 sm:-mt-16 relative z-10"
        >
          <img
            src={artist.image}
            alt={artist.name}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-[3px] border-background shadow-xl"
          />
        </motion.div>

        {/* Name, role, location — fully on solid background with clear space */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease }}
          className="mt-4"
        >
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <h1 className="font-[family-name:var(--font-heading)] text-[clamp(1.625rem,5vw,2.25rem)] font-semibold tracking-tight text-foreground leading-tight">
                {artist.name}
                {artist.verified && (
                  <VerifiedBadge className="w-5 h-5 sm:w-6 sm:h-6 inline-block ml-2 align-middle" />
                )}
              </h1>
              <p className="text-foreground/55 text-[15px] sm:text-base mt-1.5 font-medium">
                {artist.role}
              </p>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-sm text-muted-foreground/60">
                {location && (
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    {location}
                  </span>
                )}
                {artist.from && (
                  <span className="text-muted-foreground/40">
                    From {artist.from}
                  </span>
                )}
              </div>
            </div>

            {/* Actions — desktop inline, mobile full width */}
            <div className="flex gap-2 flex-shrink-0">
              <Link
                href="/messages"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-foreground text-background px-6 py-2.5 rounded-full text-sm font-medium hover:opacity-90 transition-opacity active:scale-[0.97]"
              >
                <MessageCircle className="w-4 h-4" />
                Message
              </Link>
              <button className="inline-flex items-center justify-center gap-2 border border-border/60 px-5 py-2.5 rounded-full text-sm text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-all active:scale-[0.97]">
                <Heart className="w-4 h-4" />
                <span className="hidden sm:inline">Save</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease }}
          className="mt-6 sm:mt-8"
        >
          <p className="text-[15px] sm:text-base leading-[1.7] text-foreground/70">
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
              className="px-3.5 py-1.5 rounded-full bg-muted/50 text-xs sm:text-[13px] text-foreground/60 font-medium"
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
            className="mt-6 grid grid-cols-2 gap-2.5"
          >
            {socialLinks.map(([platform, handle]) => (
              <div
                key={platform}
                className="flex items-center gap-3 p-3.5 rounded-xl bg-muted/25 border border-border/15 text-sm hover:bg-muted/40 hover:border-border/30 transition-all cursor-pointer group"
              >
                <div className="w-9 h-9 rounded-xl bg-foreground/[0.06] flex items-center justify-center flex-shrink-0 group-hover:bg-foreground/[0.1] transition-colors">
                  <SocialIcon platform={platform} />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] text-muted-foreground/50 uppercase tracking-wider font-medium">
                    {formatPlatformName(platform)}
                  </div>
                  <div className="text-foreground/70 truncate text-[13px] mt-0.5">
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
            <h2 className="font-[family-name:var(--font-heading)] text-lg sm:text-xl font-semibold tracking-tight mb-4">
              Work
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {artist.workSamples.map((sample, i) => (
                <div
                  key={i}
                  className="group aspect-[4/3] rounded-xl overflow-hidden bg-muted cursor-pointer"
                >
                  <img
                    src={sample.src}
                    alt={sample.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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
          className="mt-8 flex items-center gap-2 text-xs text-muted-foreground/35"
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
            className="mt-10 pt-8 border-t border-border/20"
          >
            <h2 className="font-[family-name:var(--font-heading)] text-lg sm:text-xl font-semibold tracking-tight mb-4">
              Similar Creatives
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
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
