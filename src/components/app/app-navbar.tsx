"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CURRENT_USER, MOCK_CONVERSATIONS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { Wordmark } from "./wordmark";

const navLinks = [
  { href: "/discover", label: "Explore" },
  { href: "/messages", label: "Messages" },
];

export function AppNavbar() {
  const pathname = usePathname();
  const unreadCount = MOCK_CONVERSATIONS.filter((c) => c.unread).length;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-line bg-bg/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1320px] items-center gap-4 px-5 sm:px-8">
        <Wordmark size="sm" />

        {/* Pill nav group (Cosmos style) */}
        <nav className="ml-1 hidden items-center gap-1 rounded-full bg-bg2 p-1 md:flex">
          {navLinks.map((link) => {
            const isActive =
              pathname.startsWith(link.href) ||
              (link.href === "/discover" && pathname.startsWith("/artists"));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative rounded-full px-4 py-1.5 text-[13px] transition-colors",
                  isActive
                    ? "bg-bg3 text-paper"
                    : "text-muted-foreground hover:text-paper",
                )}
              >
                {link.label}
                {link.href === "/messages" && unreadCount > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[9px] font-semibold text-[#1c1206]">
                    {unreadCount}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex-1" />

        {/* Search shortcut → discover (hidden on Discover, which has its own search) */}
        {!pathname.startsWith("/discover") && (
          <Link
            href="/discover"
            className="hidden items-center gap-2 rounded-full bg-bg2 px-4 py-2 text-[13px] text-muted-foreground transition-colors hover:text-paper sm:flex"
          >
            <span aria-hidden className="text-base leading-none">
              ⌕
            </span>
            <span>Search creatives…</span>
          </Link>
        )}

        <Link
          href="/profile"
          className="group flex items-center"
          aria-label="Your profile"
        >
          <img
            src={CURRENT_USER.image}
            alt={CURRENT_USER.name}
            className="h-8 w-8 rounded-full object-cover ring-1 ring-line transition-all group-hover:ring-line2"
          />
        </Link>
      </div>
    </header>
  );
}
