import Link from "next/link";
import { LINKS } from "@/lib/site";

const paths = [
  {
    number: "01",
    category: "GUIDED LEARNING",
    title: "Join Live German Classes",
    description: "Join tutor-led German lessons online or in Accra, with class support and recorded lessons you can replay.",
    href: LINKS.classes,
    action: "View Live Classes",
    tone: "dark",
    visual: "classes",
  },
  {
    number: "02",
    category: "EXAM PREPARATION",
    title: "Take a Goethe Sample Test",
    description: "Preparing for a Goethe exam? Try Goethe-style sample questions in Lesen, Hören, Schreiben and Sprechen.",
    href: LINKS.exams,
    action: "Take a Sample Test",
    tone: "blue",
    visual: "exams",
  },
  {
    number: "03",
    category: "STUDY MATERIALS",
    title: "Buy German Books",
    description: "Shop German course books and study guides from Falowen. Choose a digital edition or an available printed copy.",
    href: LINKS.books,
    action: "Buy German Books",
    tone: "sand",
    visual: "books",
  },
  {
    number: "04",
    category: "CHECK YOUR LEVEL",
    title: "Take a Free Placement Test",
    description: "Not sure whether to start at A1, A2 or B1? Take the free Falowen placement test to find your starting level.",
    href: LINKS.placementTest,
    action: "Take the Free Placement Test",
    tone: "mint",
    visual: "placement",
  },
] as const;

function CardVisual({ visual }: { visual: (typeof paths)[number]["visual"] }) {
  if (visual === "classes") {
    return (
      <div className="flex h-32 items-center justify-center" aria-hidden="true">
        <div className="relative w-48 rounded-2xl border border-white/20 bg-white/10 p-3 shadow-2xl">
          <div className="mb-3 flex items-center justify-between text-[10px] font-semibold tracking-wide text-white/75">
            <span>LIVE CLASS</span><span className="rounded-full bg-emerald-300 px-2 py-0.5 text-emerald-950">A1–B1</span>
          </div>
          <div className="flex items-end gap-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-200 text-xl font-bold text-emerald-950">Aa</div>
            <div className="flex-1 space-y-2 pb-1"><div className="h-2 rounded-full bg-white/65" /><div className="h-2 w-3/4 rounded-full bg-white/30" /></div>
          </div>
        </div>
      </div>
    );
  }
  if (visual === "exams") {
    return (
      <div className="flex h-32 items-center justify-center" aria-hidden="true">
        <div className="w-48 rotate-[-3deg] rounded-2xl border border-sky-200 bg-white p-3 shadow-lg">
          <div className="flex items-center justify-between text-[10px] font-bold text-sky-900"><span>MOCK TEST</span><span>A1–C2</span></div>
          <div className="mt-3 grid grid-cols-2 gap-2 text-[10px] font-semibold text-slate-700">
            {["Lesen", "Hören", "Schreiben", "Sprechen"].map((part) => <span className="rounded-lg bg-sky-50 px-2 py-1.5" key={part}>{part}</span>)}
          </div>
        </div>
      </div>
    );
  }
  if (visual === "books") {
    return (
      <div className="relative flex h-32 items-center justify-center" aria-hidden="true">
        <div className="absolute left-[35%] top-3 h-24 w-16 rotate-[-13deg] rounded-r-lg rounded-l-sm bg-amber-500 shadow-lg ring-1 ring-amber-700/15" />
        <div className="relative flex h-28 w-20 rotate-[8deg] flex-col justify-between rounded-r-lg rounded-l-sm bg-[#173c36] px-3 py-3 text-white shadow-xl">
          <span className="text-[9px] font-bold tracking-[0.15em]">FALOWEN</span>
          <span className="text-2xl font-bold">A1</span>
          <span className="text-[8px] text-white/80">GERMAN COURSE BOOK</span>
        </div>
      </div>
    );
  }
  return (
    <div className="flex h-32 items-center justify-center" aria-hidden="true">
      <div className="w-48 -rotate-3 rounded-2xl border border-emerald-100 bg-white p-3 shadow-xl">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] font-bold tracking-wider text-emerald-950">PLACEMENT TEST</span>
          <span className="rounded-md bg-emerald-100 px-1.5 py-1 text-[9px] font-bold text-emerald-900">FREE</span>
        </div>
        <div className="mt-3 text-[10px] font-semibold text-slate-700">Choose the right answer</div>
        <div className="mt-2 flex items-center gap-2 rounded-md border border-emerald-500 bg-emerald-50 px-2 py-1.5 text-[10px] font-semibold text-emerald-900">
          <span className="h-2.5 w-2.5 rounded-full border-[3px] border-emerald-600" /> A1 · A2 · B1
        </div>
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-neutral-100"><div className="h-full w-1/3 rounded-full bg-emerald-500" /></div>
      </div>
    </div>
  );
}

const tones = {
  dark: {
    wrapper: "border-[#0c3a32] bg-[#103d35] text-white",
    category: "text-emerald-200",
    body: "text-white/75",
    link: "border-white/25 bg-white text-[#103d35] hover:bg-emerald-50",
  },
  blue: {
    wrapper: "border-sky-200 bg-[#e9f5ff] text-slate-950",
    category: "text-sky-800",
    body: "text-slate-700",
    link: "border-sky-900 bg-sky-900 text-white hover:bg-sky-800",
  },
  sand: {
    wrapper: "border-amber-200 bg-[#fff2dd] text-slate-950",
    category: "text-amber-800",
    body: "text-slate-700",
    link: "border-amber-900 bg-amber-900 text-white hover:bg-amber-800",
  },
  mint: {
    wrapper: "border-emerald-200 bg-[#e9f5ec] text-slate-950",
    category: "text-emerald-800",
    body: "text-slate-700",
    link: "border-emerald-900 bg-emerald-900 text-white hover:bg-emerald-800",
  },
} as const;

export function EcosystemPaths() {
  return (
    <section aria-labelledby="learning-paths-heading" className="py-14 sm:py-20">
      <div className="mb-9 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-800">Your learning journey</p>
          <h2 id="learning-paths-heading" className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-5xl">One academy. More ways to learn German.</h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">Join live classes, buy German books, try a Goethe-style sample test or check your level for free.</p>
        </div>
        <a href={LINKS.visitorGuide} target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50">
          New to Falowen? Start here <span aria-hidden="true">↗</span>
        </a>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {paths.map((path) => {
          const tone = tones[path.tone];
          return (
            <article key={path.number} className={`group grid overflow-hidden rounded-[30px] border p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg sm:grid-cols-[1fr_170px] sm:items-center sm:p-8 ${tone.wrapper}`}>
              <div className="flex h-full flex-col items-start">
                <span className={`text-[11px] font-bold tracking-[0.18em] ${tone.category}`}>{path.number} / {path.category}</span>
                <h3 className="mt-4 max-w-sm text-2xl font-semibold leading-tight sm:text-[28px]">{path.title}</h3>
                <p className={`mt-3 max-w-sm text-sm leading-6 ${tone.body}`}>{path.description}</p>
                <a href={path.href} target="_blank" rel="noopener noreferrer" className={`mt-6 inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition ${tone.link}`}>
                  {path.action}<span aria-hidden="true">↗</span>
                </a>
              </div>
              <CardVisual visual={path.visual} />
            </article>
          );
        })}
      </div>

      <div className="mt-6 flex flex-col gap-4 rounded-[26px] border border-slate-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between sm:p-7">
        <div>
          <h3 className="text-lg font-semibold text-slate-950">Meet the people behind your German learning</h3>
          <p className="mt-1 text-sm leading-6 text-slate-600">Get to know our tutors and find out how Falowen supports students beyond the classroom.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href={LINKS.visitorGuide} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-xl bg-[#103d35] px-5 py-3 text-sm font-semibold text-white hover:bg-[#1e594d]">Explore Falowen ↗</a>
          <Link href="/tutors" className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50">Meet our team →</Link>
        </div>
      </div>
      <p className="mt-4 text-center text-xs text-slate-500">Falowen offers independent Goethe-style preparation and is not affiliated with or endorsed by Goethe-Institut.</p>
    </section>
  );
}
