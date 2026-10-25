"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { SITE, CTA, LINKS } from "@/lib/site";

type NavItem = {
  href: string;
  label: string;
  external?: boolean;
  featured?: boolean;
  eventLabel?: "classes" | "books" | "goethe_sample_tests" | "placement_test" | "visitor_guide";
};

const nav: NavItem[] = [
  { href: "/", label: "Home" },
  { href: LINKS.classes, label: "Live Classes", external: true, eventLabel: "classes" },
  { href: LINKS.books, label: "German Books", external: true, featured: true, eventLabel: "books" },
  { href: LINKS.exams, label: "Goethe Sample Tests", external: true, featured: true, eventLabel: "goethe_sample_tests" },
  { href: LINKS.placementTest, label: "Placement Test", external: true, featured: true, eventLabel: "placement_test" },
  { href: "/tutors", label: "Team" },
];

const mobileExtras: NavItem[] = [
  { href: LINKS.visitorGuide, label: "Falowen Guide", external: true, eventLabel: "visitor_guide" },
  { href: "/about", label: "About the Academy" },
  { href: "/contact", label: "Contact Us" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white/80 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.svg"
              alt={`${SITE.brand} logo`}
              width={40}
              height={40}
              priority
              className="h-10 w-10 rounded-2xl shadow-sm"
            />
            <div className="leading-tight">
              <div className="text-sm font-bold tracking-tight sm:text-base">Learn Language</div>
              <div className="text-xs text-neutral-600">Education Academy</div>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <nav aria-label="Main navigation" className="hidden xl:flex items-center gap-4 text-[13px]">
              {nav.map((n) => {
                const active = !n.external && pathname === n.href;
                return (
                  <Link
                    key={n.href}
                    href={n.href}
                    target={n.external ? "_blank" : undefined}
                    rel={n.external ? "noopener noreferrer" : undefined}
                    onClick={() => {
                      if (n.eventLabel) window.gtag?.("event", "homepage_path_click", { destination: n.eventLabel, source: "navigation" });
                    }}
                    className={`hover:text-neutral-900 ${
                      active ? "text-neutral-900 font-semibold" : n.featured ? "text-emerald-950 font-semibold" : "text-neutral-700"
                    }`}
                  >
                    {n.label}
                  </Link>
                );
              })}
            </nav>

            <Link
              href={CTA.primary.href}
              className="hidden xl:inline-flex rounded-2xl bg-brand-950 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-900 shadow-sm"
              title="Register on Falowen"
            >
              {CTA.primary.label}
            </Link>

            <button
              type="button"
              className="inline-flex items-center justify-center rounded-2xl border border-black/10 bg-white px-3 py-2 text-sm font-semibold text-neutral-700 shadow-sm hover:bg-neutral-50 xl:hidden"
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
              onClick={() => setIsOpen((open) => !open)}
            >
              <span className="sr-only">Toggle navigation</span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-neutral-900"
              >
                <path
                  d={
                    isOpen
                      ? "M6 6L18 18M6 18L18 6"
                      : "M4 7H20M4 12H20M4 17H20"
                  }
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        {isOpen ? (
          <div
            id="mobile-navigation"
            className="xl:hidden border-t border-black/10 bg-white/95 py-4"
          >
            <div className="flex flex-col gap-3">
              {[...nav, ...mobileExtras].map((n) => {
                const active = !n.external && pathname === n.href;
                return (
                  <Link
                    key={n.href}
                    href={n.href}
                    target={n.external ? "_blank" : undefined}
                    rel={n.external ? "noopener noreferrer" : undefined}
                    onClick={() => {
                      if (n.eventLabel) window.gtag?.("event", "homepage_path_click", { destination: n.eventLabel, source: "navigation" });
                      setIsOpen(false);
                    }}
                    className={`rounded-xl px-3 py-2 text-sm font-semibold transition ${
                      active
                        ? "bg-neutral-900 text-white"
                        : n.featured
                        ? "bg-emerald-50 text-emerald-950 hover:bg-emerald-100"
                        : "text-neutral-700 hover:bg-neutral-50"
                    }`}
                  >
                    {n.label}
                  </Link>
                );
              })}
              <Link
                href={CTA.primary.href}
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center justify-center rounded-2xl bg-brand-950 px-4 py-2 text-sm font-semibold text-white shadow-sm"
                title="Register on Falowen"
              >
                {CTA.primary.label}
              </Link>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}
