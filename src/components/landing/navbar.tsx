"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/30">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          <a href="/" className="flex items-center">
            <span className="font-[family-name:var(--font-heading)] text-lg sm:text-xl font-semibold tracking-tight">
              Kingdom Artists
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-7">
            {[
              { href: "/discover", label: "Discover" },
              { href: "#mission", label: "Mission" },
              { href: "#join", label: "Community" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/onboarding"
              className="text-sm font-medium bg-foreground text-background px-5 py-2 rounded-full hover:opacity-90 transition-opacity"
            >
              Get Started
            </a>
          </nav>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 -mr-2"
            aria-label="Menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden border-t border-border/30 bg-background/95 backdrop-blur-xl"
          >
            <nav className="flex flex-col gap-0.5 p-4">
              {[
                { href: "/discover", label: "Discover" },
                { href: "#mission", label: "Mission" },
                { href: "#join", label: "Community" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-base text-muted-foreground hover:text-foreground transition-colors py-3 px-2"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#join"
                onClick={() => setOpen(false)}
                className="text-sm font-medium bg-foreground text-background px-5 py-3 rounded-full text-center mt-3 hover:opacity-90 transition-opacity"
              >
                Join Waitlist
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
