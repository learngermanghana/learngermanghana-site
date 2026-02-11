import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/Container";
import { RandomReviews } from "@/components/RandomReviews";
import { CTA, LINKS, SITE } from "@/lib/site";
import { upcomingClasses, reviews } from "@/data/content";
import { getBlogPosts } from "@/lib/blog";
import { formatDatePretty } from "@/lib/date";



export const metadata: Metadata = {
  title: "German Classes in Ghana | Learn German & French",
  description:
    "Looking for a German language school in Ghana? Join hybrid and online German classes in Accra from A1 to C1, prepare for Goethe exams, and learn with guided support.",
  keywords: [
    "german classes in ghana",
    "german language school in ghana",
    "learn german in ghana",
    "study german language",
    "where to study german",
    "how to get b1 level in german",
    "how to learn german language online",
    "goethe exam preparation ghana",
  ],
  alternates: {
    canonical: "/",
  },
};

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-black/35 px-3 py-1 text-xs text-white/90 ring-1 ring-white/15">
      <span className="h-2 w-2 rounded-full bg-amber-300" />
      {children}
    </span>
  );
}

function toTime(startDate: string) {
  if (!startDate || startDate === "TBA") return Number.POSITIVE_INFINITY;
  const d = new Date(startDate);
  const t = d.getTime();
  return Number.isFinite(t) ? t : Number.POSITIVE_INFINITY;
}

export default async function HomePage() {
  const posts = await getBlogPosts(4);

  // Pick earliest upcoming class (non-TBA, not in the past). If all are TBA, fallback to first.
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dated = upcomingClasses
    .filter((c) => c.startDate !== "TBA")
    .map((c) => ({ c, t: toTime(c.startDate) }))
    .filter(({ t }) => t !== Number.POSITIVE_INFINITY && t >= today.getTime())
    .sort((a, b) => a.t - b.t);

  const nextClass = dated.length ? dated[0].c : upcomingClasses[0];
  const isTBA = nextClass.startDate === "TBA";

  return (
    <div>
      {/* HERO BAND */}
      <section className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-950 via-brand-900 to-emerald-950" />

        {/* Glow blobs */}
        <div className="absolute -left-40 -top-40 h-80 w-80 sm:h-96 sm:w-96 rounded-full bg-amber-300/20 blur-3xl" />
        <div className="absolute -right-40 top-10 h-80 w-80 sm:h-96 sm:w-96 rounded-full bg-emerald-300/15 blur-3xl" />

        {/* IMPORTANT: darker overlay on mobile so text isn't washed out */}
        <div className="absolute inset-0 bg-black/45 sm:bg-black/35" />

        <Container>
          <div className="relative py-12 sm:py-20 text-white">
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
              <Badge>Language School • Ghana</Badge>
              <Badge>A1–C1 Programs</Badge>
              <Badge>Powered by Falowen</Badge>
            </div>

            <div className="mt-6 sm:mt-8 grid gap-8 lg:grid-cols-2 lg:items-center">
              {/* Left text */}
              <div>
                <h1 className="text-3xl sm:text-6xl font-semibold leading-[1.12] sm:leading-[1.05] text-white">
                  Learn German & French in Ghana the smart way —
                  <span className="text-amber-200"> class + app practice</span>.
                </h1>

                <p className="mt-4 max-w-xl text-white/85 text-sm sm:text-lg leading-7">
                  {SITE.brand} is a trusted German language school in Ghana helping you build speaking confidence, writing skills, and exam readiness.
                  Registration is done on our official portal:
                  <span className="font-semibold"> register.falowen.app</span>.
                </p>

                <div className="mt-5 max-w-xl rounded-3xl bg-black/25 ring-1 ring-white/15 p-4">
                  <div className="text-sm font-semibold text-white">Levels & study modes</div>
                  <ul className="mt-2 space-y-2 text-sm text-white/85">
                    <li>
                      <span className="font-semibold text-white">A1–B1:</span> Hybrid (online + in-person)
                      with daily options, or use recorded lectures for self-learning.
                    </li>
                    <li>
                      <span className="font-semibold text-white">B2–C1:</span> Self-paced with AI
                      integration, no physical classes — students learn independently.
                    </li>
                  </ul>
                </div>

                <div className="mt-4 max-w-xl rounded-3xl bg-white/10 ring-1 ring-white/20 p-4">
                  <div className="text-sm font-semibold text-white">Not sure your level?</div>
                  <p className="mt-2 text-sm text-white/85">
                    Take the Falowen placement test to find the right class for you.
                  </p>
                  <div className="mt-3 overflow-hidden rounded-2xl ring-1 ring-white/10">
                    <Image
                      src="https://raw.githubusercontent.com/learngermanghana/falowenexamtrainer/main/photos/pexels-lagosfoodbank-9090820.jpg"
                      alt="Learner taking a placement test"
                      width={640}
                      height={360}
                      className="h-auto w-full object-cover"
                    />
                  </div>
                  <Link
                    href={LINKS.placementTest}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex text-sm font-semibold text-amber-200 hover:underline"
                  >
                    Start placement test →
                  </Link>
                </div>

                <div className="mt-6 sm:mt-7 flex flex-col sm:flex-row gap-3">
                  <a
                    href={CTA.primary.href}
                    className="inline-flex w-full sm:w-auto items-center justify-center rounded-2xl bg-amber-300 px-7 py-3.5 text-sm font-semibold text-neutral-900 shadow-lg hover:bg-amber-200 ring-1 ring-black/10"
                  >
                    Register / Contract
                  </a>

                  <a
                    href={LINKS.register}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex w-full sm:w-auto items-center justify-center rounded-2xl border border-white/40 bg-black/25 px-7 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-black/35"
                  >
                    How to enroll (steps)
                  </a>

                  <a
                    href="/lead-capture?intent=talk-to-us&source=homepage"
                    className="inline-flex w-full sm:w-auto items-center justify-center rounded-2xl border border-white/25 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white hover:bg-white/15"
                  >
                    Talk to us
                  </a>
                </div>

                <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl">
                  <div className="rounded-3xl bg-black/25 ring-1 ring-white/15 p-4">
                    <div className="text-xs text-white/70">Next start date</div>
                    <div className="mt-1 font-semibold text-white">
                      {formatDatePretty(nextClass.startDate)}
                    </div>
                  </div>
                  <div className="rounded-3xl bg-black/25 ring-1 ring-white/15 p-4">
                    <div className="text-xs text-white/70">Schedule</div>
                    <div className="mt-1 font-semibold text-white">{nextClass.scheduleSummary}</div>
                  </div>
                </div>

                {/* Quick help */}
                <div className="mt-6 rounded-3xl bg-black/25 ring-1 ring-white/15 p-4">
                  <div className="text-sm font-semibold text-white">Need help?</div>
                  <div className="mt-1 text-sm text-white/85">
                    If you have any questions, share your details and we will reach out.
                  </div>
                  <div className="mt-3">
                    <a
                      href="/lead-capture?intent=talk-to-us&source=homepage"
                      className="inline-flex items-center justify-center rounded-2xl bg-black/40 px-4 py-2 text-sm font-semibold text-white hover:bg-black/55 ring-1 ring-white/15"
                    >
                      Talk to us
                    </a>
                  </div>
                </div>
              </div>

              {/* Right: hero image + upcoming class card */}
              <div className="flex flex-col gap-6">
                <div className="relative overflow-hidden rounded-[28px] ring-1 ring-white/20 shadow-2xl">
                  <Image
                    src="/hero/hero.jpg"
                    alt="Learn Language Education Academy class"
                    width={1200}
                    height={900}
                    priority
                    className="h-[260px] sm:h-[420px] w-full object-cover"
                  />
                  {/* Darken image bottom more so card doesn't “fight” */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />

                  <div className="absolute left-5 top-5 rounded-full bg-black/45 px-4 py-2 text-xs font-semibold text-white ring-1 ring-white/20">
                    Upcoming class • {nextClass.language} • {nextClass.level}
                  </div>
                </div>

                {/* Floating info card */}
                <div className="rounded-[24px] bg-white text-neutral-900 shadow-xl ring-1 ring-black/5">
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-sm text-neutral-600">Next class</div>
                        <div className="mt-1 text-xl font-semibold">{nextClass.title}</div>
                        <div className="mt-2 text-sm text-neutral-700">
                          <span className="font-semibold">Starts:</span>{" "}
                          {formatDatePretty(nextClass.startDate)}
                        </div>
                      </div>

                      {isTBA ? (
                        <span className="shrink-0 rounded-full bg-amber-200 px-3 py-1 text-xs font-semibold text-neutral-900 ring-1 ring-black/10">
                          TBA
                        </span>
                      ) : (
                        <span className="shrink-0 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-900 ring-1 ring-black/10">
                          Upcoming
                        </span>
                      )}
                    </div>

                    <div className="mt-3 rounded-2xl bg-neutral-50 p-4 ring-1 ring-black/5">
                      <div className="font-semibold">Meeting days</div>
                      <ul className="mt-2 space-y-1 text-sm text-neutral-700">
                        {nextClass.meetingDays.map((m) => (
                          <li key={m.day} className="flex items-center justify-between">
                            <span className="font-medium">{m.day}</span>
                            <span className="text-neutral-600">{m.time}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-2xl border border-black/10 bg-white p-4">
                        <div className="text-sm font-semibold">How to enroll</div>
                        <ol className="mt-2 space-y-1 text-sm text-neutral-700">
                          <li>1) Go to Falowen and Sign up</li>
                          <li>2) Open Upcoming Classes</li>
                          <li>3) Choose class and pay</li>
                        </ol>
                        <a
                          href={LINKS.register}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-3 inline-flex text-sm font-semibold text-brand-800 hover:underline"
                        >
                          register.falowen.app →
                        </a>
                      </div>

                      <div className="rounded-2xl border border-black/10 bg-white p-4">
                        <div className="text-sm font-semibold">Need help?</div>
                        <div className="mt-2 text-sm text-neutral-700">
                          Share your details and our team will reach out with guidance.
                        </div>
                        <Link
                          href="/lead-capture?intent=talk-to-us&source=homepage"
                          className="mt-3 inline-flex text-sm font-semibold text-brand-800 hover:underline"
                        >
                          Talk to us →
                        </Link>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-col sm:flex-row gap-2">
                      <a
                        href={LINKS.falowen}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center rounded-2xl bg-brand-950 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-900 w-full sm:w-auto"
                      >
                        Go to Falowen (Sign up)
                      </a>

                      <Link
                        href="/classes"
                        className="inline-flex items-center justify-center rounded-2xl border border-black/10 bg-white px-5 py-3 text-sm font-semibold hover:bg-neutral-50 w-full sm:w-auto"
                      >
                        View more classes
                      </Link>
                    </div>

                    <div className="mt-3 text-xs text-neutral-500">
                      Bonus: Free exam preparation + access to Falowen App
                    </div>
                  </div>
                </div>
              </div>
              {/* end right */}
            </div>
          </div>
        </Container>
      </section>

      {/* CONTENT SECTIONS */}
      <Container>
        {/* Reviews */}
        <section className="pb-12 sm:pb-16">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-2xl sm:text-3xl font-semibold">What our students say</h2>
            <Link className="text-sm font-semibold text-brand-800 hover:underline" href="/reviews">
              All reviews →
            </Link>
          </div>
          <div className="mt-6">
            <RandomReviews reviews={reviews} count={6} />
          </div>
        </section>

        {/* Blog */}
        <section className="pb-14 sm:pb-20">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-2xl sm:text-3xl font-semibold">Latest blog posts</h2>
            <Link className="text-sm font-semibold text-brand-800 hover:underline" href="/blog">
              All posts →
            </Link>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {posts.map((p, idx) => (
              <a
                key={idx}
                href={p.link}
                target="_blank"
                rel="noreferrer"
                className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm hover:bg-neutral-50"
              >
                <div className="font-semibold">{p.title}</div>
                {p.excerpt ? <div className="mt-2 text-sm text-neutral-700">{p.excerpt}…</div> : null}
                <div className="mt-4 text-sm font-semibold text-brand-800">Read →</div>
              </a>
            ))}
          </div>
        </section>
      </Container>
    </div>
  );
}
