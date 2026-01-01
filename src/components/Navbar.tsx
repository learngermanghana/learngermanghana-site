"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/Container";
import { SITE, CTA } from "@/lib/site";

const nav = [
  { href: "/", label: "Home" },
  { href: "/classes", label: "Classes" },
  { href: "/tutors", label: "Tutors" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();

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
            href="/register"
            className="rounded-2xl bg-brand-950 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-900 shadow-sm"
            title="Contract & Registration"
          >
            Register
          </Link>
        </div>
      </Container>
    </header>
  );
}
