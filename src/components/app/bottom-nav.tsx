"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircle, User, Compass } from "lucide-react";
import { cn } from "@/lib/utils";
import { MOCK_CONVERSATIONS } from "@/lib/mock-data";

const tabs = [
  { href: "/discover", label: "Discover", icon: Compass },
  { href: "/messages", label: "Messages", icon: MessageCircle },
  { href: "/profile", label: "Profile", icon: User },
];

export function BottomNav() {
  const pathname = usePathname();
  const unreadCount = MOCK_CONVERSATIONS.filter((c) => c.unread).length;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-xl border-t border-border/20 pb-[env(safe-area-inset-bottom)]">
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
                "relative flex flex-col items-center gap-0.5 px-5 py-1.5 transition-colors",
                isActive ? "text-foreground" : "text-muted-foreground/40"
              )}
            >
              <div className="relative">
                <tab.icon
                  className={cn("w-5 h-5", isActive && "stroke-[2.5]")}
                />
                {tab.href === "/messages" && unreadCount > 0 && (
                  <div className="absolute -top-1 -right-1.5 w-4 h-4 rounded-full bg-foreground text-background text-[9px] font-bold flex items-center justify-center">
                    {unreadCount}
                  </div>
                )}
              </div>
              <span
                className={cn(
                  "text-[10px]",
                  isActive ? "font-semibold" : "font-medium"
                )}
              >
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
