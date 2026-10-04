"use client";

import Link from "next/link";
import {
  Settings,
  Edit3,
  LogOut,
  Bell,
  Shield,
  ChevronRight,
} from "lucide-react";
import { ArtistProfile } from "@/components/app/artist-profile";
import { CURRENT_USER } from "@/lib/mock-data";

const settingsLinks = [
  { icon: Edit3, label: "Edit Profile", href: "/onboarding" },
  { icon: Bell, label: "Notifications", href: "#" },
  { icon: Shield, label: "Privacy & Security", href: "#" },
  { icon: Settings, label: "Account Settings", href: "#" },
];

export default function ProfilePage() {
  return (
    <div className="pb-16">
      <ArtistProfile artist={CURRENT_USER} self />

      <section className="mx-auto max-w-[1280px] border-t border-line px-5 pt-10 sm:px-8">
        <h2 className="serif mb-4 text-2xl font-normal tracking-[-0.02em] text-paper">
          Settings
        </h2>
        <div className="max-w-xl divide-y divide-line overflow-hidden rounded-2xl border border-line">
          {settingsLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-3 p-3.5 transition-colors hover:bg-bg2"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-bg2">
                <item.icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <span className="flex-1 text-sm text-paper">{item.label}</span>
              <ChevronRight className="h-4 w-4 text-faint" />
            </Link>
          ))}
          <button className="flex w-full items-center gap-3 p-3.5 text-left transition-colors hover:bg-bg2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-destructive/15">
              <LogOut className="h-4 w-4 text-destructive" />
            </div>
            <span className="text-sm text-destructive">Sign Out</span>
          </button>
        </div>
      </section>
    </div>
  );
}
