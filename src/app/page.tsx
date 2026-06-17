import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/Container";
import { FalowenExperience } from "@/components/FalowenExperience";
import { HeroSlides } from "@/components/HeroSlides";
import { LatestFreeLessons } from "@/components/LatestFreeLessons";
import { RandomReviews } from "@/components/RandomReviews";
import { YouTubeSubscribeButton } from "@/components/YouTubeSubscribeButton";
import { getBlogPosts } from "@/lib/blog";
import { getReviews } from "@/lib/reviews";
import { getSedifexHeroSlides } from "@/lib/sedifexHero";
import { LINKS, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Hybrid German Classes in Ghana | Learn German & French Online or In Person",
  description:
    "Location is not a problem—join hybrid German classes in Ghana and choose each day to attend in person, online, or catch up with recorded lectures on Falowen. Prepare for Goethe exams from A1 to C1 with guided support.",
  keywords: [
    "german classes in ghana",
    "hybrid german classes in ghana",
    "online german classes in accra",
    "recorded german lectures",
    "falowen german classes",
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

function FallbackHero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-950 via-brand-900 to-emerald-950" />
      <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-amber-300/20 blur-3xl sm:h-96 sm:w-96" />
      <div className="absolute -right-40 top-10 h-80 w-80 rounded-full bg-emerald-300/15 blur-3xl sm:h-96 sm:w-96" />
      <div className="absolute inset-0 bg-black/45 sm:bg-black/35" />

      <Container>
        <div className="relative py-12 text-white sm:py-20">
          <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
            <Badge>Language School • Ghana</Badge>
            <Badge>A1–C1 Programs</Badge>
            <Badge>Powered by Falowen</Badge>
          </div>

          <div className="mt-6 grid gap-8 sm:mt-8 lg:grid-cols-2 lg:items-center">
            <div>
              <h1 className="text-3xl font-semibold leading-[1.12] text-white sm:text-6xl sm:leading-[1.05]">
                Learn German & French in Ghana the smart way —
                <span className="text-amber-200"> class + app practice</span>.
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-7 text-white/85 sm:text-lg">
                {SITE.brand} combines guided classes with Falowen so you can keep learning,
                practising and tracking your progress between lessons.
              </p>

              <div className="mt-5 max-w-xl rounded-3xl bg-black/25 p-4 ring-1 ring-white/15">
                <div className="text-sm font-semibold text-white">Levels & study modes</div>
                <ul className="mt-2 space-y-2 text-sm text-white/85">
                  <li>
                    <span className="font-semibold text-white">A1–B1:</span> Hybrid learning with
                    online and in-person attendance options.
                  </li>
                  <li>
                    <span className="font-semibold text-white">B2–C1:</span> Flexible self-paced
                    learning supported by Falowen tools and guided practice.
                  </li>
                </ul>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row">
                <a
                  href="https://www.falowen.app/classes"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full items-center justify-center rounded-2xl bg-amber-300 px-7 py-3.5 text-sm font-semibold text-neutral-900 shadow-lg ring-1 ring-black/10 hover:bg-amber-200 sm:w-auto"
                >
                  View German Classes
                </a>

                <a
                  href={LINKS.falowen}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full items-center justify-center rounded-2xl border border-white/40 bg-black/25 px-7 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-black/35 sm:w-auto"
                >
                  Explore Falowen
                </a>

                <YouTubeSubscribeButton className="w-full border-red-300 px-7 py-3.5 sm:w-auto" />
              </div>

              <div className="mt-6 grid max-w-xl gap-3 sm:grid-cols-3">
                <div className="rounded-2xl bg-white/10 p-3 ring-1 ring-white/20">
                  <div className="text-xs text-white/70">Join your way</div>
                  <div className="mt-1 text-sm font-semibold text-white">In class or online</div>
                </div>
                <div className="rounded-2xl bg-white/10 p-3 ring-1 ring-white/20">
                  <div className="text-xs text-white/70">Keep progressing</div>
                  <div className="mt-1 text-sm font-semibold text-white">Learn with Falowen</div>
                </div>
                <div className="rounded-2xl bg-white/10 p-3 ring-1 ring-white/20">
                  <div className="text-xs text-white/70">Find your level</div>
                  <div className="mt-1 text-sm font-semibold text-white">Placement guidance</div>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <div className="rounded-3xl bg-white/10 p-5 text-white ring-1 ring-white/20">
                <h2 className="text-sm font-semibold">Location is never a problem</h2>
                <p className="mt-2 text-sm text-white/85">
                  Learn from anywhere and choose the study mode that works best for your schedule.
                </p>
              </div>

              <div className="rounded-3xl bg-white/10 p-5 text-white ring-1 ring-white/20">
                <h2 className="text-sm font-semibold">Not sure of your level?</h2>
                <p className="mt-2 text-sm text-white/85">
                  Take our placement test and receive a recommendation based on your current skills.
                </p>
                <Link
                  href={LINKS.placementTest}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex text-sm font-semibold text-amber-200 hover:underline"
                >
                  Start placement test →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default async function HomePage() {
  const posts = await getBlogPosts(4);
  const reviews = await getReviews();
  const heroSlides = await getSedifexHeroSlides();

  return (
    <div>
      {heroSlides.length > 0 ? <HeroSlides slides={heroSlides} /> : <FallbackHero />}

      <Container>
        <section className="py-10 sm:py-14">
          <div className="rounded-3xl border border-black/10 bg-white p-4 shadow-sm sm:p-6">
            <h2 className="text-2xl font-semibold sm:text-3xl">Inside our classroom</h2>
            <p className="mt-2 max-w-3xl text-sm text-neutral-700 sm:text-base">
              A look at our students actively learning together in class.
            </p>
            <div className="mt-4 overflow-hidden rounded-2xl ring-1 ring-black/10">
              <Image
                src="https://raw.githubusercontent.com/learngermanghana/learngermanghana-site/master/photos/2025-07-02.jpg"
                alt="Classroom session with students learning"
                width={1600}
                height={900}
                className="h-auto w-full object-cover"
              />
            </div>
          </div>
        </section>

        <LatestFreeLessons />

        <FalowenExperience />

        <section className="pb-12 sm:pb-16">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-2xl font-semibold sm:text-3xl">What our students say</h2>
            <Link className="text-sm font-semibold text-brand-800 hover:underline" href="/reviews">
              All reviews →
            </Link>
          </div>
          <div className="mt-6">
            <RandomReviews reviews={reviews} count={6} />
          </div>
        </section>

        <section className="pb-14 sm:pb-20">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-2xl font-semibold sm:text-3xl">Latest blog posts</h2>
            <a
              className="text-sm font-semibold text-brand-800 hover:underline"
              href="https://blog.falowen.app/"
              target="_blank"
              rel="noreferrer"
            >
              All posts →
            </a>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {posts.map((post, index) => (
              <a
                key={index}
                href={post.link}
                target="_blank"
                rel="noreferrer"
                className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm hover:bg-neutral-50"
              >
                <div className="font-semibold">{post.title}</div>
                {post.excerpt ? (
                  <div className="mt-2 text-sm text-neutral-700">{post.excerpt}…</div>
                ) : null}
                <div className="mt-4 text-sm font-semibold text-brand-800">Read →</div>
              </a>
            ))}
          </div>
        </section>
      </Container>
    </div>
  );
}
