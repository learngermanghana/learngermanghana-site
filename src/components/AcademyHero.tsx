import Image from "next/image";
import { Container } from "@/components/Container";
import { TrackedExternalLink } from "@/components/TrackedExternalLink";
import { LINKS } from "@/lib/site";

// Existing academy classroom photograph, already used on the live website.
// Rendered unoptimized to avoid Vercel image-transformation charges.
const classroomPhoto =
  "https://raw.githubusercontent.com/learngermanghana/learngermanghana-site/master/photos/2025-07-02.jpg";

export function AcademyHero() {
  return (
    <section aria-labelledby="homepage-title" className="relative overflow-hidden bg-[#103d35] text-white">
      <div aria-hidden="true" className="pointer-events-none absolute -left-20 -top-28 h-64 w-64 rounded-full bg-emerald-300/10 blur-3xl" />
      <Container>
        <div className="relative grid items-center gap-5 py-7 sm:gap-10 sm:py-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:py-16">
          <div className="max-w-2xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-amber-200 sm:text-xs sm:tracking-[0.22em]">
              Learn Language Education Academy · Accra
            </p>
            <h1 id="homepage-title" className="mt-3 text-[34px] font-semibold leading-[1.08] tracking-tight sm:mt-5 sm:text-5xl lg:text-[55px]">
              Your German Learning Journey <span className="text-amber-200">Starts Here.</span>
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-emerald-50/90 sm:mt-5 sm:text-base sm:leading-7">
              Join live German classes, buy course books, practise Goethe-style sample tests,
              or discover your level with our free placement test.
            </p>
            <div className="mt-5 flex flex-wrap gap-2.5 sm:mt-7 sm:gap-3">
              <TrackedExternalLink
                href={LINKS.classes}
                eventLabel="classes"
                eventSource="hero"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center rounded-xl bg-amber-200 px-4 py-2.5 text-sm font-bold text-emerald-950 transition hover:bg-amber-100 sm:px-6 sm:py-3"
              >
                Explore German Classes
              </TrackedExternalLink>
              <TrackedExternalLink
                href={LINKS.placementTest}
                eventLabel="placement_test"
                eventSource="hero"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/50 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10 sm:px-6 sm:py-3"
              >
                Find My German Level
              </TrackedExternalLink>
            </div>
            <p className="mt-4 text-xs leading-5 text-white/70 sm:mt-6 sm:text-sm">
              In-person learning in Awoshie, Accra · Online classes · Falowen learning support
            </p>
          </div>
          <div className="relative h-36 overflow-hidden rounded-2xl border border-white/15 bg-emerald-900 shadow-xl sm:h-72 sm:rounded-[28px] lg:h-[360px]">
            <Image
              src={classroomPhoto}
              alt="Students learning together in a Learn Language Education Academy classroom"
              fill
              priority
              unoptimized
              sizes="(max-width: 639px) calc(100vw - 32px), (max-width: 1023px) calc(100vw - 48px), 45vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent px-4 pb-3 pt-10 sm:px-6 sm:pb-5">
              <p className="text-xs font-semibold text-white sm:text-sm">Real classes. Real tutors. Learn in Ghana or online.</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
