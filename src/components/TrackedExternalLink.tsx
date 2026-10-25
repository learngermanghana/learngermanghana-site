"use client";

import type { AnchorHTMLAttributes } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  eventLabel: "classes" | "books" | "goethe_sample_tests" | "placement_test" | "visitor_guide";
  eventSource: "hero" | "learning_paths" | "navigation" | "footer";
};

/**
 * Reuses the existing Google tag configured in layout.tsx.
 * No new analytics provider, cookies, user identifiers or recurring service costs.
 */
export function TrackedExternalLink({ eventLabel, eventSource, onClick, ...props }: Props) {
  return (
    <a
      {...props}
      onClick={(event) => {
        if (typeof window !== "undefined" && typeof window.gtag === "function") {
          window.gtag("event", "homepage_path_click", {
            destination: eventLabel,
            source: eventSource,
          });
        }
        onClick?.(event);
      }}
    />
  );
}
