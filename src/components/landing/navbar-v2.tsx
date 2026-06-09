"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export function NavbarV2() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 50);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-xl bg-background/80 border-b border-foreground/[0.04] shadow-sm shadow-foreground/[0.02]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          <a href="/" className="flex items-center">
            <span className="font-[family-name:var(--font-heading)] text-lg sm:text-xl font-semibold tracking-tight">
              Kingdom Artists
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-7">
            <a
              href="#join"
              className="text-sm font-medium bg-foreground text-background px-6 py-2.5 rounded-full hover:opacity-90 transition-opacity active:scale-[0.97]"
            >
              Apply Now
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
            className="md:hidden overflow-hidden border-t border-foreground/[0.04] bg-background/95 backdrop-blur-xl"
          >
            <nav className="flex flex-col gap-0.5 p-4">
              <a
                href="#join"
                onClick={() => setOpen(false)}
                className="text-sm font-medium bg-foreground text-background px-5 py-3 rounded-full text-center hover:opacity-90 transition-opacity"
              >
                Apply Now
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
