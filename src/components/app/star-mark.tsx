import { cn } from "@/lib/utils";

/**
 * The Kingdom Artists brand mark — a four-point star (✦).
 * Gold in the wordmark; gold next to a name = verified member.
 * Uses `currentColor` so callers control the color via text-* utilities.
 */
export function StarMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn("inline-block shrink-0", className)}
      aria-hidden="true"
    >
      <path d="M12 0c.55 6.18 5.82 11.45 12 12-6.18.55-11.45 5.82-12 12-.55-6.18-5.82-11.45-12-12C6.18 11.45 11.45 6.18 12 0Z" />
    </svg>
  );
}
