import { cn } from "@/lib/utils";
import { StarMark } from "./star-mark";

/**
 * Verified-member mark: the gold brand star (✦) shown next to a creative's name.
 * Kept visually distinct from the green "open to collaborate" status dot.
 */
export function VerifiedBadge({ className }: { className?: string }) {
  return (
    <span aria-label="Verified member" role="img" className="inline-flex">
      <StarMark className={cn("h-3.5 w-3.5 text-gold", className)} />
    </span>
  );
}
