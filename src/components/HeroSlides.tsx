"use client";

import { useEffect, useState } from "react";
import type { HeroSlide } from "@/lib/sedifexHero";

export function HeroSlides({ slides }: { slides: HeroSlide[] }) {
  const [active, setActive] = useState(0);
  useEffect(() => {
    if (slides.length < 2) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % slides.length), 7000);
    return () => window.clearInterval(timer);
  }, [slides.length]);

  const slide = slides[active];
  const alignment = slide.layout === "center_text" ? "items-center text-center" : slide.layout === "right_text" ? "items-end text-right" : "items-start text-left";
  const text = slide.textColor === "dark" ? "text-neutral-950" : "text-white";
  const overlay = slide.overlayStyle === "none" ? "" : slide.overlayStyle === "solid" ? "bg-black/55" : "bg-gradient-to-r from-black/80 via-black/45 to-black/10";

  return (
    <section className={`relative isolate min-h-[560px] overflow-hidden ${text}`} aria-roledescription="carousel" aria-label="Homepage highlights">
      {slides.map((item, index) => (
        <picture key={item.id} className={`absolute inset-0 -z-20 transition-opacity duration-700 ${index === active ? "opacity-100" : "opacity-0"}`}>
          {item.mobileImageUrl ? <source media="(max-width: 639px)" srcSet={item.mobileImageUrl} /> : null}
          {item.imageUrl ? <img src={item.imageUrl} alt="" className="h-full w-full object-cover" /> : <span className="block h-full w-full bg-gradient-to-br from-brand-950 via-brand-900 to-emerald-950" />}
        </picture>
      ))}
      <div className={`absolute inset-0 -z-10 ${overlay}`} />
      <div className={`mx-auto flex min-h-[560px] max-w-7xl flex-col justify-center px-5 py-20 sm:px-8 lg:px-10 ${alignment}`}>
        <div className="max-w-3xl" aria-live="polite">
          {slide.eyebrow ? <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em]" style={{ color: slide.accent }}>{slide.eyebrow}</p> : null}
          <h1 className="text-4xl font-semibold leading-tight sm:text-6xl">{slide.title}</h1>
          {slide.subtitle ? <p className="mt-5 max-w-2xl text-base leading-7 opacity-90 sm:text-xl">{slide.subtitle}</p> : null}
          <div className={`mt-8 flex flex-wrap gap-3 ${slide.layout === "center_text" ? "justify-center" : slide.layout === "right_text" ? "justify-end" : ""}`}>
            {slide.ctaLabel && slide.ctaHref ? <a href={slide.ctaHref} className="rounded-2xl px-6 py-3 font-semibold text-neutral-950 shadow-lg" style={{ backgroundColor: slide.accent || "#fcd34d" }}>{slide.ctaLabel}</a> : null}
            {slide.secondaryCtaLabel && slide.secondaryCtaHref ? <a href={slide.secondaryCtaHref} className="rounded-2xl border border-current/40 bg-black/20 px-6 py-3 font-semibold backdrop-blur-sm">{slide.secondaryCtaLabel}</a> : null}
          </div>
        </div>
      </div>
      {slides.length > 1 ? <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">{slides.map((item, index) => <button key={item.id} type="button" onClick={() => setActive(index)} aria-label={`Show slide ${index + 1}`} aria-current={index === active} className={`h-2.5 rounded-full transition-all ${index === active ? "w-8 bg-white" : "w-2.5 bg-white/50"}`} />)}</div> : null}
    </section>
  );
}
