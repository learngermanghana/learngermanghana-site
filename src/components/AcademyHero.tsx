"use client";

import { useEffect, useRef, useState } from "react";
import { LINKS } from "@/lib/site";

const PHOTO = "https://raw.githubusercontent.com/learngermanghana/learngermanghana-site/master/photos/2025-07-02.jpg";

const slides = [
  {
    label: "German language courses",
    title: "Learn German.",
    emphasis: "Build your future.",
    description: "Join classes online or in Accra, practise with structured workbooks and get guidance from a real tutor.",
    button: "Register for German",
    href: "https://www.falowen.app/signup?program=german",
    extra: "See live classes and schedules",
    extraHref: LINKS.classes,
    theme: "course",
  },
  {
    label: "Find your starting point",
    title: "What is your",
    emphasis: "German level?",
    description: "Not sure whether to start at A1, A2 or B1? Take a free placement test to discover where to begin.",
    button: "Take free placement test",
    href: LINKS.placementTest,
    theme: "level",
  },
  {
    label: "Separate exam preparation",
    title: "Get ready for",
    emphasis: "Goethe-style exams.",
    description: "Practise sample tests and full mocks in Lesen, Hören, Schreiben and Sprechen, with AI-supported feedback.",
    button: "Try a sample test",
    href: "https://www.falowen.app/exam-practice",
    theme: "exam",
  },
  {
    label: "Falowen course books",
    title: "Take your German",
    emphasis: "off-screen.",
    description: "Explore Falowen German course books, with available digital editions and printed copies ordered on demand.",
    button: "Browse German books",
    href: LINKS.books,
    theme: "books",
  },
] as const;

const tones = {
  course: { outer: "bg-[#eaf4ff]", kicker: "text-[#075cf1]", title: "text-[#075cf1]", button: "bg-[#075cf1] hover:bg-[#0349c8]" },
  level: { outer: "bg-[#fff7e9]", kicker: "text-[#a06a28]", title: "text-[#a06a28]", button: "bg-[#98601f] hover:bg-[#7f4f19]" },
  exam: { outer: "bg-[#e9f8f2]", kicker: "text-[#0d7259]", title: "text-[#0d7259]", button: "bg-[#0d7259] hover:bg-[#095942]" },
  books: { outer: "bg-[#f4f0ff]", kicker: "text-[#7653bc]", title: "text-[#7653bc]", button: "bg-[#6950b6] hover:bg-[#58429e]" },
} as const;

function Visual({ theme }: { theme: (typeof slides)[number]["theme"] }) {
  if (theme === "course") {
    return (
      <div className="relative h-full min-h-[185px] w-full overflow-hidden bg-[#d5e9fa]">
        <div role="img" aria-label="Real Learn Language Education Academy classroom"
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "linear-gradient(90deg, rgba(234,244,255,.18), transparent 55%), url('" + PHOTO + "')" }} />
        <div className="absolute bottom-3 right-3 rounded-xl border border-white/80 bg-white/90 px-3 py-2 text-[11px] font-bold text-[#234161] shadow-lg">
          Real people. Real support.
        </div>
      </div>
    );
  }
  if (theme === "level") {
    return (
      <div className="flex h-full min-h-[185px] items-center justify-center overflow-hidden bg-gradient-to-br from-[#f9e7c8] to-[#fff9ed] p-4" aria-hidden="true">
        <div className="w-[min(100%,300px)] rotate-[2deg] rounded-[22px] bg-white px-5 py-5 shadow-[0_22px_50px_#7c5a312a] sm:p-6">
          <p className="text-[10px] font-extrabold tracking-[0.13em] text-[#98601f]">FIND YOUR LEVEL · A1–B1</p>
          <p className="mt-3 text-xl font-extrabold text-[#10254a]">German placement test</p>
          <p className="mt-1 text-xs text-[#68758b]">Choose the correct word:</p>
          <p className="mt-3 rounded-xl border border-[#e9e5dd] px-3 py-2 text-xs text-[#53617a]">Ich ____ in Accra.</p>
          <p className="mt-2 rounded-xl border border-[#deb675] bg-[#fff3de] px-3 py-2 text-xs font-bold text-[#936020]">◉ wohne</p>
          <p className="mt-2 rounded-xl border border-[#e9e5dd] px-3 py-2 text-xs text-[#53617a]">○ wohnst</p>
        </div>
      </div>
    );
  }
  if (theme === "exam") {
    return (
      <div className="flex h-full min-h-[185px] items-center justify-center overflow-hidden bg-gradient-to-br from-[#cbe9de] to-[#f3fbf8] p-4" aria-hidden="true">
        <div className="w-[min(100%,300px)] -rotate-[2deg] rounded-[22px] bg-white px-5 py-5 shadow-[0_22px_50px_#275c4c29] sm:p-6">
          <div className="flex items-center justify-between gap-2">
            <p className="text-[10px] font-extrabold tracking-widest text-[#0d7259]">FALOWEN EXAM PRACTICE</p>
            <span className="rounded-full bg-[#e3f5eb] px-2 py-1 text-[10px] font-bold text-[#0d7259]">A1–C2</span>
          </div>
          <p className="mt-3 text-xl font-extrabold text-[#10254a]">Build exam confidence</p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {["Lesen", "Hören", "Schreiben", "Sprechen"].map((skill) => (
              <div key={skill} className="rounded-xl border border-[#d9eee4] bg-[#f2faf6] px-3 py-3 text-xs font-bold text-[#17624b]">{skill}</div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="relative grid h-full min-h-[210px] w-full place-items-center overflow-hidden bg-gradient-to-br from-[#e5d7fb] to-[#faf7ff] px-6 pb-9 pt-4 sm:min-h-[300px] sm:px-8 sm:py-8" aria-hidden="true">
      {/* Keep the full book cover, spine and shadow inside the visible slide at every breakpoint. */}
      <div className="relative flex h-[152px] w-[122px] -rotate-3 flex-col justify-between rounded-l-sm rounded-r-xl border-l-[7px] border-[#0c285a] bg-gradient-to-br from-[#05438e] to-[#126cbe] px-3.5 py-3 text-white shadow-[8px_10px_0_#163a6b,12px_14px_24px_#4a397040] sm:h-[242px] sm:w-[186px] sm:-rotate-6 sm:border-l-[10px] sm:px-5 sm:py-5 sm:shadow-[12px_14px_0_#163a6b,18px_22px_32px_#4a397040]">
        <div>
          <p className="text-[16px] font-extrabold tracking-tight sm:text-[22px]">Falowen</p>
          <p className="mt-1.5 text-[8px] font-bold tracking-[0.08em] sm:mt-3 sm:text-[11px] sm:tracking-[0.12em]">DEUTSCH LERNEN</p>
        </div>
        <div className="text-right text-[52px] font-black leading-none text-[#ffd387] sm:text-[80px]">A1</div>
        <p className="text-[7px] font-semibold tracking-wide text-white/85 sm:text-[10px]">COURSE &amp; WORKBOOK</p>
      </div>
    </div>
  );
}

export function AcademyHero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reset, setReset] = useState(0);
  const startX = useRef<number | null>(null);
  const current = slides[index];
  const tone = tones[current.theme];

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => window.clearInterval(timer);
  }, [paused, reset]);

  const move = (next: number) => {
    setIndex((next + slides.length) % slides.length);
    setReset((value) => value + 1);
  };

  return (
    <section aria-labelledby="homepage-title" className="mx-auto max-w-[1200px] px-4 pt-5 sm:px-6 sm:pt-8">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2 px-1">
        <h1 id="homepage-title" className="text-sm font-extrabold tracking-tight text-[#10254a] sm:text-base">Learn German. Open new doors.</h1>
        <span className="text-xs text-[#63748f]">Made for learners in Ghana and beyond</span>
      </div>
      <div aria-roledescription="carousel" aria-label="Ways to learn German with the Academy"
        className={"relative min-h-[535px] overflow-hidden rounded-[22px] border border-[#e0e7f3] shadow-[0_16px_40px_#183b6215] sm:min-h-[455px] sm:rounded-[26px] " + tone.outer}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setPaused(false); }}
        onTouchStart={(event) => { startX.current = event.changedTouches[0]?.clientX ?? null; }}
        onTouchEnd={(event) => {
          if (startX.current === null) return;
          const dx = (event.changedTouches[0]?.clientX ?? startX.current) - startX.current;
          startX.current = null;
          if (Math.abs(dx) > 45) move(index + (dx < 0 ? 1 : -1));
        }}
        onKeyDown={(event) => {
          if (event.target instanceof HTMLButtonElement || event.target instanceof HTMLAnchorElement) return;
          if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
            event.preventDefault();
            move(index + (event.key === "ArrowRight" ? 1 : -1));
          }
        }}
      >
        <div key={current.theme} aria-roledescription="slide" aria-label={(index + 1) + " of 4: " + current.label}
          className="grid min-h-[535px] grid-rows-[auto_minmax(180px,1fr)] sm:min-h-[455px] sm:grid-cols-[52%_48%] sm:grid-rows-1">
          <div className="flex flex-col items-start justify-center px-7 pb-9 pt-10 sm:px-14 sm:py-10">
            <p className={"text-[10px] font-extrabold uppercase tracking-[0.17em] sm:text-xs " + tone.kicker}>{current.label}</p>
            <h2 className="mt-4 max-w-[520px] text-[33px] font-black leading-[1.09] tracking-[-0.055em] text-[#10254a] sm:text-[43px] lg:text-[51px]">
              {current.title} <span className={tone.title}>{current.emphasis}</span>
            </h2>
            <p className="mt-4 max-w-[430px] text-sm leading-6 text-[#475c77] sm:text-[16px] sm:leading-7">{current.description}</p>
            <a href={current.href} className={"mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-extrabold text-white transition " + tone.button}>
              {current.button} <span aria-hidden="true">→</span>
            </a>
            {"extra" in current ? <a href={current.extraHref} className="mt-3 text-xs font-bold text-[#175cae] underline underline-offset-4 sm:text-sm">{current.extra}</a> : null}
          </div>
          <Visual theme={current.theme} />
        </div>
        <div className="pointer-events-none absolute inset-x-2 bottom-2 z-10 flex justify-between sm:inset-x-4 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2">
          <button type="button" aria-label="Previous slide" onClick={() => move(index - 1)}
            className="pointer-events-auto grid h-9 w-9 place-items-center rounded-full border border-[#e4ebf4] bg-white/95 text-xl font-bold text-[#152f55] shadow-md sm:h-10 sm:w-10">‹</button>
          <button type="button" aria-label="Next slide" onClick={() => move(index + 1)}
            className="pointer-events-auto grid h-9 w-9 place-items-center rounded-full border border-[#e4ebf4] bg-white/95 text-xl font-bold text-[#152f55] shadow-md sm:h-10 sm:w-10">›</button>
        </div>
        <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 sm:bottom-5" role="group" aria-label="Choose a slide">
          {slides.map((slide, position) => (
            <button key={slide.theme} type="button" aria-label={"Show " + slide.label} aria-pressed={position === index}
              onClick={() => move(position)}
              className={position === index ? "h-2.5 w-7 rounded-full bg-[#075cf1]" : "h-2.5 w-2.5 rounded-full bg-[#819cba] hover:bg-[#075cf1]"} />
          ))}
        </div>
      </div>
    </section>
  );
}
