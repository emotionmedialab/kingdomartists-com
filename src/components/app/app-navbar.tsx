"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, MessageCircle, User, Compass } from "lucide-react";
import { CURRENT_USER, MOCK_CONVERSATIONS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/discover", label: "Discover", icon: Compass },
  { href: "/messages", label: "Messages", icon: MessageCircle },
];

export function AppNavbar() {
  const pathname = usePathname();
  const unreadCount = MOCK_CONVERSATIONS.filter((c) => c.unread).length;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/20">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          <Link href="/" className="flex items-center">
            <span className="font-[family-name:var(--font-heading)] text-lg sm:text-xl font-semibold tracking-tight">
              Kingdom Artists
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive =
                pathname.startsWith(link.href) ||
                (link.href === "/discover" && pathname.startsWith("/artists"));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-colors",
                    isActive
                      ? "bg-foreground text-background font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <link.icon className="w-4 h-4" />
                  {link.label}
                  {link.href === "/messages" && unreadCount > 0 && !isActive && (
                    <span className="w-4 h-4 rounded-full bg-foreground text-background text-[9px] font-bold flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          <Link
            href="/profile"
            className="flex items-center gap-2.5 group"
          >
            <img
              src={CURRENT_USER.image}
              alt={CURRENT_USER.name}
              className="w-8 h-8 rounded-full object-cover ring-2 ring-transparent group-hover:ring-border/50 transition-all"
            />
          </Link>
        </div>
      </div>
    </header>
  );
}
