
"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

import { Container } from "@/components/Container";
import { tuitionFeesGHS, goetheExamFeesGHS } from "@/data/content";
import { publicUpcomingClasses as upcomingClasses } from "@/data/classesCatalog";
import { getClassPath, getNextIntake } from "@/lib/classes";
import { formatDatePretty, getDaysUntilStart } from "@/lib/date";
import { SITE } from "@/lib/site";

function money(amount: number) {
  return `GHS ${amount.toLocaleString("en-GH")}`;
}

function Step({
  n,
  title,
  text,
}: {
  n: number;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-3xl border border-black/10 bg-neutral-50 p-5">
      <div className="flex items-center gap-3">
        <div className="grid h-9 w-9 place-items-center rounded-2xl bg-amber-300 text-neutral-900 font-bold">
          {n}
        </div>
        <div className="text-base font-semibold text-neutral-900">{title}</div>
      </div>
      <p className="mt-3 text-sm leading-6 text-neutral-700">{text}</p>
    </div>
  );
}

function getFormatLabel(format: string) {
  const normalized = format.toLowerCase();

  if (normalized.includes("self-learning")) {
    return "Self-learning";
  }

  if (normalized.includes("hybrid")) {
    return "Hybrid";
  }

  return "Other";
}

function getClassHeaderTheme(language: string, formatLabel: string) {
  if (formatLabel === "Self-learning") {
    return {
      icon: "💻",
      label: "Digital learning track",
      panelClass: "border-violet-200 bg-gradient-to-r from-violet-100 via-fuchsia-50 to-white",
    };
  }

  if (language === "French") {
    return {
      icon: "🇫🇷",
      label: "French class stream",
      panelClass: "border-sky-200 bg-gradient-to-r from-sky-100 via-white to-rose-100",
    };
  }

  return {
    icon: "🇩🇪",
    label: "German class stream",
    panelClass: "border-amber-200 bg-gradient-to-r from-amber-100 via-white to-neutral-100",
  };
}

export default function ClassesPage() {
  const nextIntake = useMemo(() => getNextIntake(), []);
  const [scrollProgress, setScrollProgress] = useState(0);

  const filteredClasses = upcomingClasses;

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

      if (maxScroll <= 0) {
        setScrollProgress(100);
        return;
      }

      const progress = Math.min((scrollTop / maxScroll) * 100, 100);
      setScrollProgress(progress);
    };

    updateScrollProgress();
    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    window.addEventListener("resize", updateScrollProgress);

    return () => {
      window.removeEventListener("scroll", updateScrollProgress);
      window.removeEventListener("resize", updateScrollProgress);
    };
  }, []);

  return (
    <div className="bg-neutral-50">
      <div className="fixed inset-x-0 top-0 z-50 h-1 bg-black/10" aria-hidden="true">
        <div
          className="h-full bg-amber-500 transition-[width] duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
      <Container>
        <section className="py-8 pb-14 sm:py-10 sm:pb-20">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-neutral-900">Upcoming Classes</h2>
          </div>

          <p className="mt-2 text-sm text-neutral-700">
            Tuition covers classes only. Exam fees are paid directly to the exam provider when you are ready to sit
            the exam.
          </p>

          {nextIntake ? (
            <div className="mt-6 rounded-3xl border border-amber-200 bg-amber-50/70 p-5 shadow-sm">
              <div className="text-xs font-semibold uppercase text-amber-800">Next intake</div>
              <div className="mt-2 text-lg font-semibold text-neutral-900">{nextIntake.title}</div>
              <p className="mt-2 text-sm text-neutral-800">
                {nextIntake.language} {nextIntake.level} starts <span className="font-semibold">{formatDatePretty(nextIntake.startDate)}</span> at <span className="font-semibold">{nextIntake.location}</span>.
              </p>
              <a
                href={getClassPath(nextIntake.id)}
                className="mt-4 inline-flex items-center justify-center rounded-2xl border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-neutral-900 hover:bg-neutral-50"
              >
                View class details
              </a>
            </div>
          ) : null}

          <div className="mt-4 rounded-2xl border border-black/10 bg-white/70 p-4 text-sm text-neutral-700">
            New here? Open each class detail page to quickly review the schedule, fees, and enrollment steps one by one.
          </div>

          <div className="mt-6 grid gap-4">
            {filteredClasses.map((c, index) => {
              const tuition = tuitionFeesGHS[c.level];
              const examFee = c.examFee ?? goetheExamFeesGHS[c.level];
              const formatLabel = getFormatLabel(c.format);
              const isAlwaysOpen = c.startDate === "Always open";
              const effectiveTuition = c.tuitionFee ?? tuition;
              const daysUntilStart = getDaysUntilStart(c.startDate);
              const headerTheme = getClassHeaderTheme(c.language, formatLabel);

              return (
                <div id={c.id} key={c.id} className="rounded-3xl border-2 border-black/10 bg-white p-6 shadow-sm">
                  <div className="mb-4 flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-neutral-500">
                    <span>Class {index + 1}</span>
                    <span>{c.level}</span>
                  </div>

                  <div className="mb-4 overflow-hidden rounded-2xl border border-black/10 bg-neutral-100">
                    <Image
                      src={c.photo ?? "https://raw.githubusercontent.com/learngermanghana/learngermanghana-site/master/photos/classes/pexels-keira-burton-6147219.jpg"}
                      alt={`${c.title} class preview`}
                      width={1200}
                      height={675}
                      className="h-44 w-full object-cover"
                    />
                  </div>

                  <div className={`mb-4 flex items-center justify-between rounded-2xl border px-4 py-3 ${headerTheme.panelClass}`}>
                    <div className="flex items-center gap-2 text-sm font-semibold text-neutral-900">
                      <span aria-hidden="true" className="text-lg leading-none">{headerTheme.icon}</span>
                      <span>{headerTheme.label}</span>
                    </div>
                    <span className="rounded-full border border-black/10 bg-white/80 px-3 py-1 text-xs font-medium text-neutral-700">
                      {formatLabel}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-black/10 bg-neutral-50 px-3 py-1 text-xs font-semibold text-neutral-800">
                      {c.language}
                    </span>
                    <span className="rounded-full border border-black/10 bg-neutral-50 px-3 py-1 text-xs font-semibold text-neutral-800">
                      Level: {c.level}
                    </span>
                    <span className="rounded-full border border-black/10 bg-neutral-50 px-3 py-1 text-xs text-neutral-700">
                      {formatLabel}
                    </span>
                    <span className="rounded-full border border-black/10 bg-neutral-50 px-3 py-1 text-xs text-neutral-700">
                      {c.duration}
                    </span>
                    {isAlwaysOpen ? (
                      <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                        Self-paced / Always open
                      </span>
                    ) : null}
                    <span className="rounded-full border border-black/10 bg-amber-100 px-3 py-1 text-xs font-semibold text-neutral-900">
                      Tuition: {effectiveTuition ? money(effectiveTuition) : "Check in Falowen"}
                    </span>
                    {c.language === "German" ? (
                      <span className="rounded-full border border-black/10 bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-900">
                        Goethe exam fee: {examFee ? money(examFee) : "Check Goethe"}
                      </span>
                    ) : null}
                  </div>

                  <div className="mt-3 text-lg font-semibold text-neutral-900">{c.title}</div>

                  <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2">
                    <div className="text-xs font-semibold uppercase tracking-wide text-amber-800">Start date</div>
                    <div className="text-base font-semibold text-neutral-900">{formatDatePretty(c.startDate)}</div>
                  </div>
                  {daysUntilStart !== null ? (
                    <div className="mt-1 text-xs font-semibold text-amber-700">
                      {daysUntilStart <= 0
                        ? "Starts today"
                        : `${daysUntilStart} day${daysUntilStart === 1 ? "" : "s"} remaining`}
                    </div>
                  ) : null}

                  <div className="mt-3 rounded-2xl border border-black/10 bg-neutral-50 p-4">
                    <div className="text-sm font-semibold text-neutral-900">Meeting days</div>
                    <ul className="mt-2 space-y-1 text-sm text-neutral-700">
                      {c.meetingDays.map((m) => (
                        <li key={m.day} className="flex items-center justify-between gap-4">
                          <span className="font-medium">{m.day}</span>
                          <span className="text-neutral-600">{m.time}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-2 text-sm text-neutral-700">
                    <span className="font-semibold">Location:</span> {c.location}
                  </div>

                  <div className="mt-2 text-sm text-neutral-700">
                    <span className="font-semibold">Format:</span> {c.format}
                  </div>

                  {c.language === "German" ? (
                    <div className="mt-2 text-sm text-neutral-700">
                      Tuition covers classes only. Exams are paid directly to Goethe-Institut.
                    </div>
                  ) : null}

                  <div className="mt-4 rounded-2xl border border-black/10 bg-white p-4">
                    <div className="text-sm font-semibold text-neutral-900">What&apos;s included</div>
                    <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-neutral-700">
                      {c.bonus.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  {c.level === "A1" ? (
                    <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50/70 p-4 text-sm text-neutral-800">
                      <div className="text-sm font-semibold text-neutral-900">Class session length &amp; assignments</div>
                      <p className="mt-1 text-sm text-neutral-700 leading-6">
                        Each live class is <span className="font-semibold">1 hour</span>. After every session, students
                        receive assignments to complete at their own pace before the next class.
                      </p>
                    </div>
                  ) : null}

                  <div className="mt-5">
                    <a
                      href={getClassPath(c.id)}
                      className="inline-flex w-full sm:w-auto items-center justify-center rounded-2xl border border-black/10 bg-white px-5 py-3 text-sm font-semibold hover:bg-neutral-50"
                    >
                      Open class details
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 rounded-3xl border border-black/10 bg-white p-6">
            <div className="text-lg font-semibold text-neutral-900">How enrollment works</div>
            <p className="mt-1 text-sm text-neutral-700">
              Register inside Falowen to see dates, locations, and prices before you pay.
            </p>
            <div className="mt-4 grid gap-4 lg:grid-cols-3">
              <Step
                n={1}
                title="Create an account"
                text="Go to www.falowen.app and tap Sign up."
              />
              <Step
                n={2}
                title="Pick your class"
                text="Open Upcoming Classes to view dates, locations, and prices."
              />
              <Step
                n={3}
                title="Pay online → get access"
                text="Complete payment to receive automatic access right away."
              />
            </div>
          </div>

          <div className="mt-8 rounded-3xl border border-black/10 bg-white p-6">
            <div className="text-lg font-semibold text-neutral-900">Download the class brochure</div>
            <p className="mt-1 text-sm text-neutral-700">
              Need a printable summary? Open the brochure and use the print button to save it as a PDF.
            </p>
            <div className="mt-4">
              <a
                href="/classes/brochure"
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full sm:w-auto items-center justify-center rounded-2xl border border-black/10 bg-white px-5 py-3 text-sm font-semibold shadow-sm transition hover:bg-neutral-50"
              >
                Open brochure
              </a>
            </div>
          </div>

          <div className="mt-8 rounded-3xl border border-black/10 bg-white p-6">
            <div className="text-sm font-semibold text-neutral-900">Still have questions?</div>
            <div className="mt-2 text-sm text-neutral-700 leading-6">
              Email <span className="font-semibold">{SITE.email}</span> or use WhatsApp support. Most information
              (dates, fees, and cohorts) is inside Falowen under <span className="font-semibold">Upcoming Classes</span>.
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
}
