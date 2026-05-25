"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  MapPin,
  Globe,
  Settings,
  AtSign,
  Play,
  Music,
  ExternalLink,
  Calendar,
  Edit3,
  LogOut,
  Bell,
  Shield,
} from "lucide-react";
import { VerifiedBadge } from "@/components/app/verified-badge";
import { CURRENT_USER } from "@/lib/mock-data";

const ease = [0.22, 1, 0.36, 1] as const;

function SocialIcon({ platform }: { platform: string }) {
  switch (platform) {
    case "instagram": return <AtSign className="w-4 h-4" />;
    case "youtube": return <Play className="w-4 h-4" />;
    case "spotify": return <Music className="w-4 h-4" />;
    case "website": return <Globe className="w-4 h-4" />;
    default: return <ExternalLink className="w-4 h-4" />;
  }
}

const settingsLinks = [
  { icon: Edit3, label: "Edit Profile", href: "/onboarding" },
  { icon: Bell, label: "Notifications", href: "#" },
  { icon: Shield, label: "Privacy & Security", href: "#" },
  { icon: Settings, label: "Account Settings", href: "#" },
];

export default function ProfilePage() {
  const user = CURRENT_USER;
  const location = [user.city, user.state, user.country]
    .filter(Boolean)
    .join(", ");
  const socialLinks = Object.entries(user.links).filter(
    ([, v]) => v
  ) as [string, string][];
  const joinDate = new Date(user.joinedAt).toLocaleDateString("en-US", {
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
        className="relative h-40 sm:h-56 bg-muted overflow-hidden"
      >
        <img
          src={user.banner}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </motion.div>

      <div className="max-w-3xl mx-auto px-5 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease }}
          className="-mt-14 sm:-mt-18 relative"
        >
          <div className="flex items-end gap-4 sm:gap-6">
            <img
              src={user.image}
              alt={user.name}
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl object-cover border-4 border-background shadow-lg"
            />
            <div className="flex-1 pb-1">
              <h1 className="font-[family-name:var(--font-heading)] text-xl sm:text-2xl font-medium flex items-center gap-2">
                {user.name}
                {user.verified && <VerifiedBadge className="w-5 h-5" />}
              </h1>
              <p className="text-muted-foreground text-sm mt-0.5">
                {user.role}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              {location}
            </span>
            {user.from && (
              <span className="text-muted-foreground/50">
                From {user.from}
              </span>
            )}
          </div>

          <Link
            href="/onboarding"
            className="mt-4 inline-flex items-center gap-2 px-5 py-2 rounded-full border border-border/60 text-sm text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-all"
          >
            <Edit3 className="w-3.5 h-3.5" />
            Edit Profile
          </Link>
        </motion.div>

        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease }}
          className="mt-6"
        >
          <p className="text-sm leading-relaxed text-foreground/80">
            {user.bio}
          </p>
        </motion.div>

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25, ease }}
          className="mt-4 flex flex-wrap gap-2"
        >
          {user.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1.5 rounded-full bg-muted/70 text-xs text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* Social Links */}
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
                <span className="text-foreground/70 text-xs truncate capitalize">
                  {platform}: {handle}
                </span>
              </div>
            ))}
          </motion.div>
        )}

        {/* Work Samples */}
        {user.workSamples.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35, ease }}
            className="mt-8"
          >
            <h2 className="font-[family-name:var(--font-heading)] text-lg font-medium mb-4">
              Your Work
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {user.workSamples.map((sample, i) => (
                <div
                  key={i}
                  className="aspect-[4/3] rounded-xl overflow-hidden bg-muted"
                >
                  <img
                    src={sample.src}
                    alt={sample.alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Settings */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4, ease }}
          className="mt-10 pt-8 border-t border-border/30"
        >
          <h2 className="font-[family-name:var(--font-heading)] text-lg font-medium mb-4">
            Settings
          </h2>
          <div className="space-y-1">
            {settingsLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors"
              >
                <item.icon className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">{item.label}</span>
              </Link>
            ))}
            <button className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors w-full text-left text-destructive">
              <LogOut className="w-4 h-4" />
              <span className="text-sm">Sign Out</span>
            </button>
          </div>
        </motion.div>

        {/* Member since */}
        <div className="mt-8 flex items-center gap-2 text-xs text-muted-foreground/40">
          <Calendar className="w-3.5 h-3.5" />
          Member since {joinDate}
        </div>
      </div>
    </div>
  );
}
