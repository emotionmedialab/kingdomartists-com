"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, MessageCircle, User, Compass } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { href: "/discover", label: "Discover", icon: Compass },
  { href: "/messages", label: "Messages", icon: MessageCircle },
  { href: "/profile", label: "Profile", icon: User },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-xl border-t border-border/30 pb-[env(safe-area-inset-bottom)]">
      <div className="flex items-center justify-around h-14">
        {tabs.map((tab) => {
          const isActive =
            pathname.startsWith(tab.href) ||
            (tab.href === "/discover" && pathname.startsWith("/artists"));
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "flex flex-col items-center gap-0.5 px-4 py-1.5 transition-colors",
                isActive ? "text-foreground" : "text-muted-foreground/50"
              )}
            >
              <tab.icon className={cn("w-5 h-5", isActive && "stroke-[2.5]")} />
              <span className="text-[10px] font-medium">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
