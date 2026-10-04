import Link from "next/link";
import { Wordmark } from "@/components/app/wordmark";

const links = [
  { label: "Discover", href: "/discover" },
  { label: "Statement", href: "#statement" },
  { label: "About", href: "#join" },
];

export function LandingNav() {
  return (
    <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-6 py-6 sm:px-12 sm:py-7">
      <Wordmark />

      <nav className="hidden gap-9 md:flex">
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            className="text-xs uppercase tracking-[0.16em] text-paper/80 transition-colors hover:text-paper"
          >
            {l.label}
          </a>
        ))}
      </nav>

      <Link href="#join" className="pill pill-gold">
        Apply Now
      </Link>
    </div>
  );
}
