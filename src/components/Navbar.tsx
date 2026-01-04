"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Container } from "@/components/Container";
import { SITE, CTA } from "@/lib/site";

const nav = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/classes", label: "Classes" },
  { href: "/tutors", label: "Tutors" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white/80 backdrop-blur">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-brand-950 text-white shadow-sm">
              🇩🇪
            </span>
            <div className="leading-tight">
              <div className="font-semibold tracking-tight">{SITE.brand}</div>
              <div className="text-xs text-neutral-600">Learn Language Education Academy</div>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <nav className="hidden md:flex items-center gap-5 text-sm">
              {nav.map((n) => {
                const active = pathname === n.href;
                return (
                  <Link
                    key={n.href}
                    href={n.href}
                    className={`hover:text-neutral-900 ${
                      active ? "text-neutral-900 font-semibold" : "text-neutral-700"
                    }`}
                  >
                    {n.label}
                  </Link>
                );
              })}
            </nav>

            <Link
              href="/classes"
              className="hidden md:inline-flex rounded-2xl bg-brand-950 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-900 shadow-sm"
              title="Enrollment & Class Details"
            >
              Register
            </Link>

            <button
              type="button"
              className="inline-flex items-center justify-center rounded-2xl border border-black/10 bg-white px-3 py-2 text-sm font-semibold text-neutral-700 shadow-sm hover:bg-neutral-50 md:hidden"
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
            className="md:hidden border-t border-black/10 bg-white/95 py-4"
          >
            <div className="flex flex-col gap-3">
              {nav.map((n) => {
                const active = pathname === n.href;
                return (
                  <Link
                    key={n.href}
                    href={n.href}
                    className={`rounded-xl px-3 py-2 text-sm font-semibold transition ${
                      active
                        ? "bg-neutral-900 text-white"
                        : "text-neutral-700 hover:bg-neutral-50"
                    }`}
                  >
                    {n.label}
                  </Link>
                );
              })}
              <Link
                href="/classes"
                className="inline-flex items-center justify-center rounded-2xl bg-brand-950 px-4 py-2 text-sm font-semibold text-white shadow-sm"
                title="Enrollment & Class Details"
              >
                Register
              </Link>
            </div>
          </div>
        ) : null}
      </Container>
    </header>
  );
}
