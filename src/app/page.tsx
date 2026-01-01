import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { RandomReviews } from "@/components/RandomReviews";
import { CTA, LINKS, SITE, WHATSAPP_LINK } from "@/lib/site";
import { upcomingClasses, tutors, reviews } from "@/data/content";
import { getBlogPosts } from "@/lib/blog";
import { formatDatePretty } from "@/lib/date";

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs text-white ring-1 ring-white/20">
      <span className="h-2 w-2 rounded-full bg-gold-400" />
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
        <div className="absolute inset-0 bg-gradient-to-br from-brand-950 via-brand-900 to-emerald-900" />
        <div className="absolute -left-40 -top-40 h-80 w-80 sm:h-96 sm:w-96 rounded-full bg-gold-400/20 blur-3xl" />
        <div className="absolute -right-40 top-10 h-80 w-80 sm:h-96 sm:w-96 rounded-full bg-emerald-400/15 blur-3xl" />

        <Container>
          <div className="relative py-12 sm:py-20 text-white">
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
              <Badge>German School • Ghana</Badge>
              <Badge>Online & In-Person</Badge>
              <Badge>Powered by Falowen</Badge>
            </div>

            <div className="mt-6 sm:mt-8 grid gap-8 lg:grid-cols-2 lg:items-center">
              {/* Left text */}
              <div>
                <h1 className="text-2xl sm:text-6xl font-semibold leading-tight sm:leading-[1.05]">
                  Learn German the smart way —
                  <span className="text-gold-200"> class + app practice</span>.
                </h1>

                <p className="mt-4 max-w-lg text-white/85 text-sm sm:text-lg leading-6 sm:leading-7">
                  {SITE.brand} helps you build speaking confidence, writing skills, and exam readiness.
                  Registration is done on our official portal:
                  <span className="font-semibold"> register.falowen.app</span>.
                </p>

                <div className="mt-6 sm:mt-7 flex flex-col sm:flex-row gap-3">
  <a
    href="https://register.falowen.app"
    target="_blank"
    rel="noreferrer"
    className="inline-flex w-full sm:w-auto items-center justify-center rounded-2xl bg-amber-300 px-6 py-3 text-[13px] sm:text-sm font-semibold text-neutral-900 shadow-lg hover:bg-amber-200 ring-1 ring-black/10"
  >
    Register / Contract
  </a>

  <a
    href="/register"
    className="inline-flex w-full sm:w-auto items-center justify-center rounded-2xl border border-white/50 bg-black/20 px-6 py-3 text-[13px] sm:text-sm font-semibold text-white shadow-sm hover:bg-black/30"
  >
    How to register (steps)
  </a>
</div>

                <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl">
                  <div className="rounded-3xl bg-white/10 ring-1 ring-white/15 p-4">
                    <div className="text-xs text-white/70">Next start date</div>
                    <div className="mt-1 font-semibold">{formatDatePretty(nextClass.startDate)}</div>
                  </div>
                  <div className="rounded-3xl bg-white/10 ring-1 ring-white/15 p-4">
                    <div className="text-xs text-white/70">Schedule</div>
                    <div className="mt-1 font-semibold">{nextClass.scheduleSummary}</div>
                  </div>
                </div>

                {/* Quick help */}
                <div className="mt-6 rounded-3xl bg-white/10 ring-1 ring-white/15 p-4">
                  <div className="text-sm font-semibold">Need help?</div>
                  <div className="mt-1 text-sm text-white/85">
                    If you have any questions, chat our team on WhatsApp.
                  </div>
                  <div className="mt-3">
                    <a
                      href={WHATSAPP_LINK}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center rounded-2xl bg-black/30 px-4 py-2 text-sm font-semibold text-white hover:bg-black/40 ring-1 ring-white/15"
                    >
                      Chat on WhatsApp
                    </a>
                  </div>
                </div>
              </div>

              {/* Right: hero image + upcoming class card */}  <div className="flex flex-col gap-6">
                <div className="relative overflow-hidden rounded-[28px] ring-1 ring-white/20 shadow-2xl">
                  <Image
                    src="/hero/hero.jpg"
                    alt="Learn German Ghana class"
                    width={1200}
                    height={900}
                    priority
                    className="h-[260px] sm:h-[420px] w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

                  {/* Small label on image */}
                  <div className="absolute left-5 top-5 rounded-full bg-white/15 px-4 py-2 text-xs font-semibold text-white ring-1 ring-white/20">
                    Upcoming class • {nextClass.level}
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
                          <span className="font-semibold">Starts:</span> {formatDatePretty(nextClass.startDate)}
                        </div>
                      </div>

                      {isTBA ? (
                        <span className="shrink-0 rounded-full bg-gold-200 px-3 py-1 text-xs font-semibold text-neutral-900 ring-1 ring-black/10">
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
                        <div className="text-sm font-semibold">How to register</div>
                        <ol className="mt-2 space-y-1 text-sm text-neutral-700">
                          <li>1) Open portal</li>
                          <li>2) Create account + verify email</li>
                          <li>3) Accept contract + submit</li>
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
                          Chat our team on WhatsApp for support.
                        </div>
                        <a
                          href={WHATSAPP_LINK}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-3 inline-flex text-sm font-semibold text-brand-800 hover:underline"
                        >
                          WhatsApp support →
                        </a>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-col sm:flex-row gap-2">
  <a
    href="https://register.falowen.app"
    target="_blank"
    rel="noreferrer"
    className="inline-flex items-center justify-center rounded-2xl bg-brand-950 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-900 w-full sm:w-auto"
  >
    Register / Contract
  </a>

  <a
    href="/register"
    className="inline-flex items-center justify-center rounded-2xl border border-black/10 bg-white px-5 py-3 text-sm font-semibold hover:bg-neutral-50 w-full sm:w-auto"
  >
    Full instructions
  </a>
</div>

<div className="mt-3 text-xs text-neutral-500">
                      Bonus: Free exam preparation + access to Falowen App
                    </div>
                  </div>
                </div>
</div>
            </div>
          </div>
        </Container>
      </section>

      {/* CONTENT SECTIONS */}
      <Container>
        {/* Tutors */}
        <section className="py-12 sm:py-16">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-2xl sm:text-3xl font-semibold">Meet our tutors</h2>
            <Link className="text-sm font-semibold text-brand-800 hover:underline" href="/tutors">
              All tutors →
            </Link>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {tutors.map((t) => (
              <div
                key={t.name}
                className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm hover:shadow-md transition"
              >
                <div className="text-lg font-semibold">{t.name}</div>
                <div className="text-sm text-neutral-600">{t.role}</div>
                <p className="mt-3 text-sm text-neutral-700 leading-6">{t.bio}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {t.specialties.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-black/10 bg-neutral-50 px-3 py-1 text-xs text-neutral-700"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

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




