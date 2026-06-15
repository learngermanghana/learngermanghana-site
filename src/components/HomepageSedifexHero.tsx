"use client";

import { usePathname } from "next/navigation";
import { SedifexHero } from "@/components/SedifexHero";
import type { HeroSlide } from "@/lib/sedifexHero";

export function HomepageSedifexHero({ slides }: { slides: HeroSlide[] }) {
  const pathname = usePathname();

  if (pathname !== "/" || slides.length === 0) return null;

  return (
    <>
      {/* The existing first homepage section remains the no-data/error fallback. */}
      <style>{`main > div > section:first-child { display: none !important; }`}</style>
      <SedifexHero slides={slides} />
    </>
  );
}
