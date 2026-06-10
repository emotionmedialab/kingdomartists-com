"use client";

import {
  useRef,
  type CSSProperties,
  type MouseEvent,
  type ReactNode,
} from "react";

const easeOut = "cubic-bezier(0.16, 1, 0.3, 1)";

export function MagneticLink({
  href,
  children,
  style,
  className,
  appendSearch = false,
}: {
  href: string;
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
  /** Forward the current query string (e.g. ?ref=) to the destination. */
  appendSearch?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  function onClick(e: MouseEvent<HTMLAnchorElement>) {
    if (appendSearch && window.location.search) {
      e.preventDefault();
      window.location.href = href + window.location.search;
    }
  }

  function onMouseMove(e: MouseEvent<HTMLAnchorElement>) {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    el.style.transition = "";
    el.style.transform = `translate(${(dx * 0.18).toFixed(1)}px, ${(dy * 0.32).toFixed(1)}px)`;
  }

  function onMouseLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.transition = `transform 0.5s ${easeOut}`;
    el.style.transform = "translate(0px, 0px)";
  }

  return (
    <a
      ref={ref}
      href={href}
      className={className}
      style={{ willChange: "transform", ...style }}
      onClick={onClick}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </a>
  );
}
