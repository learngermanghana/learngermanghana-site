"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { SITE, LINKS } from "@/lib/site";

const navItems = [
  { label: "Upcoming Classes", href: LINKS.classes },
  { label: "Placement test", href: LINKS.placementTest },
  { label: "Goethe practice", href: "https://www.falowen.app/exam-practice" },
  { label: "German books", href: LINKS.books },
  { label: "Team", href: LINKS.visitorGuide },
  { label: "Contact", href: "/contact" },
];
const mobileExtras = [
  { label: "About the academy", href: "/about" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-[#e8edf5] bg-white/95 backdrop-blur">
      <div className="mx-auto flex min-h-[74px] max-w-[1200px] items-center justify-between gap-2 px-3 py-2 sm:px-6">
        <Link href="/" aria-label={SITE.brand + " homepage"} onClick={() => setOpen(false)} className="flex min-w-0 items-center gap-2 sm:gap-3">
          <Image src="/logo.svg" alt="" width={40} height={40} priority className="hidden h-10 w-10 shrink-0 rounded-xl min-[380px]:block" />
          <span className="min-w-0 leading-[1.1]">
            <strong className="block text-[12px] font-extrabold tracking-tight text-[#10254a] sm:text-[16px]">Learn Language<br />Education Academy</strong>
            <span className="mt-1 hidden text-[10px] font-semibold text-[#526987] sm:block">Learning powered by Falowen</span>
          </span>
        </Link>
        <nav aria-label="Main navigation" className="hidden items-center gap-5 text-xs font-bold text-[#405675] xl:flex">
          {navItems.map((item) => <a key={item.label} href={item.href} className="whitespace-nowrap hover:text-[#075cf1]">{item.label}</a>)}
        </nav>
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <a href="https://www.falowen.app/login/" className="inline-flex min-h-9 items-center justify-center rounded-xl border border-[#c7d5ed] bg-white px-2.5 text-xs font-bold text-[#10254a] hover:bg-[#eff5ff] sm:min-h-10 sm:px-4 sm:text-sm">Log in</a>
          <a href="https://www.falowen.app/signup?program=german" className="inline-flex min-h-9 items-center justify-center rounded-xl bg-[#075cf1] px-2.5 text-xs font-bold text-white hover:bg-[#0349c8] sm:min-h-10 sm:px-4 sm:text-sm">Register</a>
          <button type="button" aria-label={open ? "Close menu" : "Open menu"} aria-controls="academy-nav-menu" aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-xl text-[#10254a] hover:bg-[#eff5ff] xl:hidden">☰</button>
        </div>
      </div>
      {open ? (
        <nav id="academy-nav-menu" aria-label="Mobile navigation" className="mx-auto max-w-[1200px] border-t border-[#e8edf5] bg-white px-4 py-3 xl:hidden">
          {[...navItems, ...mobileExtras].map((item) => (
            item.href.startsWith("/") ?
              <Link key={item.label} href={item.href} onClick={() => setOpen(false)} aria-current={pathname === item.href ? "page" : undefined} className="block rounded-xl px-3 py-3 text-sm font-semibold text-[#203b61] hover:bg-[#eff5ff]">{item.label}</Link> :
              <a key={item.label} href={item.href} onClick={() => setOpen(false)} className="block rounded-xl px-3 py-3 text-sm font-semibold text-[#203b61] hover:bg-[#eff5ff]">{item.label}</a>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
