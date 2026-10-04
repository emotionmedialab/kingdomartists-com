import { Wordmark } from "@/components/app/wordmark";

export function Footer() {
  return (
    <footer className="flex flex-col items-start justify-between gap-4 border-t border-line px-6 py-10 sm:flex-row sm:items-center sm:px-12">
      <Wordmark size="sm" />
      <span className="text-xs tracking-[0.04em] text-faint">
        © 2026 Kingdom Artists. Built with purpose.
      </span>
    </footer>
  );
}
