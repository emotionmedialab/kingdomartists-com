import Link from "next/link";
import { cn } from "@/lib/utils";
import { StarMark } from "./star-mark";

/**
 * The Kingdom Artists wordmark: ✦ Kingdom Artists.
 * Fraunces italic 500 — gold star, paper-white words, trailing period.
 */
export function Wordmark({
  className,
  href = "/",
  size = "md",
}: {
  className?: string;
  /** Pass `null` to render a plain span (no link). */
  href?: string | null;
  size?: "sm" | "md" | "lg";
}) {
  const sizeClass =
    size === "lg"
      ? "text-[26px]"
      : size === "sm"
        ? "text-[18px]"
        : "text-[21px]";

  const content = (
    <span
      className={cn(
        "serif inline-flex items-center gap-[0.4em] italic font-medium tracking-[-0.01em] text-paper leading-none",
        sizeClass,
        className,
      )}
    >
      <StarMark className="h-[0.62em] w-[0.62em] not-italic text-gold" />
      <span>Kingdom Artists.</span>
    </span>
  );

  if (href === null) return content;

  return (
    <Link href={href} className="inline-flex items-center" aria-label="Kingdom Artists — home">
      {content}
    </Link>
  );
}
