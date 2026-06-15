"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Container } from "@/components/Container";
import type { HeroSlide } from "@/lib/sedifexHero";

const AUTO_ROTATE_MS = 7000;

function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mediaQuery.matches);

    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  return reducedMotion;
}

function buttonTextColor(accent: string) {
  const normalized = accent.slice(1);
  const hex =
    normalized.length === 3
      ? normalized
          .split("")
          .map((character) => character + character)
          .join("")
      : normalized.slice(0, 6);

  if (!/^[0-9a-f]{6}$/i.test(hex)) return "#111827";

  const red = Number.parseInt(hex.slice(0, 2), 16);
  const green = Number.parseInt(hex.slice(2, 4), 16);
  const blue = Number.parseInt(hex.slice(4, 6), 16);
  const luminance = (red * 299 + green * 587 + blue * 114) / 1000;
  return luminance > 145 ? "#111827" : "#ffffff";
}

function contentAlignment(layout: HeroSlide["layout"]) {
  if (layout === "center_text") {
    return {
      wrapper: "items-center text-center",
      buttons: "justify-center",
    };
  }

  if (layout === "right_text") {
    return {
      wrapper: "items-end text-right",
      buttons: "justify-end",
    };
  }

  return {
    wrapper: "items-start text-left",
    buttons: "justify-start",
  };
}

function overlayClass(slide: HeroSlide) {
  if (slide.overlayStyle === "none") return "";
  if (slide.overlayStyle === "solid") {
    return slide.textColor === "dark" ? "bg-white/80" : "bg-black/60";
  }
  if (slide.overlayStyle === "light") return "bg-white/65";

  if (slide.textColor === "dark") {
    if (slide.layout === "right_text") {
      return "bg-gradient-to-l from-white/95 via-white/75 to-white/15";
    }
    if (slide.layout === "center_text") {
      return "bg-gradient-to-r from-white/35 via-white/90 to-white/35";
    }
    return "bg-gradient-to-r from-white/95 via-white/75 to-white/15";
  }

  if (slide.layout === "right_text") {
    return "bg-gradient-to-l from-black/85 via-black/55 to-black/10";
  }
  if (slide.layout === "center_text") {
    return "bg-gradient-to-r from-black/25 via-black/75 to-black/25";
  }
  return "bg-gradient-to-r from-black/85 via-black/55 to-black/10";
}

export function SedifexHero({ slides }: { slides: HeroSlide[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useReducedMotion();
  const multipleSlides = slides.length > 1;

  useEffect(() => {
    setActiveIndex((current) =>
      Math.min(current, Math.max(slides.length - 1, 0)),
    );
  }, [slides.length]);

  const showSlide = useCallback(
    (index: number) => {
      if (!slides.length) return;
      setActiveIndex((index + slides.length) % slides.length);
    },
    [slides.length],
  );

  useEffect(() => {
    if (!multipleSlides || paused || reducedMotion) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, AUTO_ROTATE_MS);

    return () => window.clearInterval(timer);
  }, [multipleSlides, paused, reducedMotion, slides.length]);

  const slide = slides[activeIndex];
  const alignment = useMemo(
    () =>
      slide ? contentAlignment(slide.layout) : contentAlignment("left_text"),
    [slide],
  );

  if (!slide) return null;

  const lightText = slide.textColor === "light";
  const secondaryButtonClass = lightText
    ? "border-white/55 bg-black/20 text-white hover:bg-black/35"
    : "border-neutral-900/25 bg-white/45 text-neutral-950 hover:bg-white/70";

  return (
    <section
      aria-label="Homepage highlights"
      aria-roledescription={multipleSlides ? "carousel" : undefined}
      className="relative overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          setPaused(false);
      }}
      onKeyDown={(event) => {
        if (!multipleSlides) return;
        if (event.key === "ArrowLeft") showSlide(activeIndex - 1);
        if (event.key === "ArrowRight") showSlide(activeIndex + 1);
      }}
      style={{ backgroundColor: slide.accent }}
    >
      <div
        aria-atomic="true"
        aria-live={paused ? "polite" : "off"}
        className="relative min-h-[520px] sm:min-h-[620px]"
      >
        {slide.imageUrl ? (
          <picture className="absolute inset-0 block h-full w-full">
            {slide.mobileImageUrl ? (
              <source
                media="(max-width: 639px)"
                srcSet={slide.mobileImageUrl}
              />
            ) : null}
            {/* Dynamic store-managed images cannot be declared in next.config.ts. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={slide.imageUrl}
              alt=""
              className="h-full w-full object-cover"
              loading={activeIndex === 0 ? "eager" : "lazy"}
            />
          </picture>
        ) : (
          <div
            className="absolute inset-0"
            style={{ backgroundColor: slide.accent }}
          />
        )}

        <div className={`absolute inset-0 ${overlayClass(slide)}`} />

        <Container>
          <div
            className={`relative z-10 flex min-h-[520px] flex-col justify-center py-16 sm:min-h-[620px] sm:py-24 ${alignment.wrapper}`}
          >
            <div className="max-w-3xl">
              {slide.eyebrow ? (
                <div
                  className={`mb-4 inline-flex rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] ${
                    lightText
                      ? "border-white/35 bg-black/25 text-white"
                      : "border-neutral-900/20 bg-white/55 text-neutral-950"
                  }`}
                >
                  {slide.eyebrow}
                </div>
              ) : null}

              <h1
                className={`text-4xl font-semibold leading-[1.05] sm:text-6xl lg:text-7xl ${
                  lightText ? "text-white" : "text-neutral-950"
                }`}
              >
                {slide.title}
              </h1>

              {slide.subtitle ? (
                <p
                  className={`mt-5 max-w-2xl text-base leading-7 sm:text-xl sm:leading-8 ${
                    lightText ? "text-white/90" : "text-neutral-900/85"
                  } ${slide.layout === "center_text" ? "mx-auto" : slide.layout === "right_text" ? "ml-auto" : ""}`}
                >
                  {slide.subtitle}
                </p>
              ) : null}

              {(slide.ctaLabel && slide.ctaHref) ||
              (slide.secondaryCtaLabel && slide.secondaryCtaHref) ? (
                <div
                  className={`mt-8 flex flex-col gap-3 sm:flex-row ${alignment.buttons}`}
                >
                  {slide.ctaLabel && slide.ctaHref ? (
                    <a
                      href={slide.ctaHref}
                      className="inline-flex items-center justify-center rounded-2xl px-7 py-3.5 text-sm font-semibold shadow-lg ring-1 ring-black/10 transition hover:brightness-105 focus:outline-none focus-visible:ring-4 focus-visible:ring-white/60"
                      style={{
                        backgroundColor: slide.accent,
                        color: buttonTextColor(slide.accent),
                      }}
                    >
                      {slide.ctaLabel}
                    </a>
                  ) : null}

                  {slide.secondaryCtaLabel && slide.secondaryCtaHref ? (
                    <a
                      href={slide.secondaryCtaHref}
                      className={`inline-flex items-center justify-center rounded-2xl border px-7 py-3.5 text-sm font-semibold shadow-sm backdrop-blur-sm transition focus:outline-none focus-visible:ring-4 focus-visible:ring-white/60 ${secondaryButtonClass}`}
                    >
                      {slide.secondaryCtaLabel}
                    </a>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
        </Container>
      </div>

      {multipleSlides ? (
        <div className="absolute inset-x-0 bottom-5 z-20 flex items-center justify-center gap-3 px-4">
          <button
            type="button"
            aria-label="Show previous hero slide"
            onClick={() => showSlide(activeIndex - 1)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/45 text-xl text-white ring-1 ring-white/35 backdrop-blur-sm transition hover:bg-black/65 focus:outline-none focus-visible:ring-4 focus-visible:ring-white/60"
          >
            <span aria-hidden="true">‹</span>
          </button>

          <div className="flex items-center gap-2 rounded-full bg-black/35 px-3 py-2 ring-1 ring-white/25 backdrop-blur-sm">
            {slides.map((item, index) => (
              <button
                key={item.id}
                type="button"
                aria-label={`Show slide ${index + 1}: ${item.title}`}
                aria-current={index === activeIndex ? "true" : undefined}
                onClick={() => showSlide(index)}
                className={`h-2.5 rounded-full transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                  index === activeIndex
                    ? "w-7 bg-white"
                    : "w-2.5 bg-white/55 hover:bg-white/80"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            aria-label="Show next hero slide"
            onClick={() => showSlide(activeIndex + 1)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/45 text-xl text-white ring-1 ring-white/35 backdrop-blur-sm transition hover:bg-black/65 focus:outline-none focus-visible:ring-4 focus-visible:ring-white/60"
          >
            <span aria-hidden="true">›</span>
          </button>
        </div>
      ) : null}
    </section>
  );
}
