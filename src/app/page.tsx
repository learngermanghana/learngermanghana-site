import type { Metadata } from "next";
import Link from "next/link";
import { AcademyHero } from "@/components/AcademyHero";
import { Container } from "@/components/Container";
import { EcosystemPaths } from "@/components/EcosystemPaths";
import { FalowenExperience } from "@/components/FalowenExperience";
import { HeroSlides } from "@/components/HeroSlides";
import { LatestFreeLessons } from "@/components/LatestFreeLessons";
import { RandomReviews } from "@/components/RandomReviews";
import { getBlogPosts } from "@/lib/blog";
import { getReviews } from "@/lib/reviews";
import { getSedifexHeroSlides } from "@/lib/sedifexHero";
import { SITE } from "@/lib/site";

export const revalidate = 21600;

export const metadata: Metadata = {
  title: "Learn German in Ghana | Live Classes, German Books & Goethe Sample Tests",
  description:
    "Join German classes in Accra or online with Learn Language Education Academy. Shop Falowen German books, practise Goethe-style sample tests and take a free German placement test.",
  keywords: [
    "learn german in ghana",
    "german classes in accra",
    "online german classes in ghana",
    "german language school ghana",
    "german course books ghana",
    "buy german books online",
    "goethe sample test online",
    "goethe exam practice ghana",
    "free german placement test",
    "falowen german classes",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Learn German in Ghana | Classes, Books, Exam Practice & Placement Test",
    description:
      "Learn German with real tutors in Accra or online. Explore Falowen German books, Goethe-style sample tests and a free German placement test.",
    url: "/",
    type: "website",
    images: [{ url: "/hero/hero.jpg", alt: "Learn Language Education Academy" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Learn German in Ghana | Learn Language Education Academy",
    description: "Live German classes, German books, Goethe-style practice and a free placement test.",
    images: ["/hero/hero.jpg"],
  },
};

export default async function HomePage() {
  const [posts, reviews, heroSlides] = await Promise.all([
    getBlogPosts(4),
    getReviews(),
    getSedifexHeroSlides(),
  ]);

  return (
    <div>
      <AcademyHero />
      <Container>
        <EcosystemPaths />

        <section aria-labelledby="trust-heading" className="pb-7 sm:pb-12">
          <div className="grid items-center gap-5 rounded-3xl border border-emerald-950/10 bg-white p-5 shadow-sm sm:p-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-emerald-800">Your academy in Accra</p>
              <h2 id="trust-heading" className="mt-2 text-2xl font-semibold leading-snug text-slate-950 sm:text-3xl">
                Real tutors. Real classrooms. Support beyond lessons.
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
                {SITE.brand} teaches German in Awoshie, Accra and online. Meet our team,
                explore class schedules and continue practising with Falowen.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link className="rounded-xl bg-emerald-950 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-900" href="/tutors">
                  Meet Our Tutors
                </Link>
                <Link className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-900 hover:bg-slate-50" href="/contact">
                  Find Us in Accra
                </Link>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              <p className="rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-950">Classes in Awoshie, Accra</p>
              <p className="rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-950">Live online learning options</p>
              <p className="rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-950">Workbook and exam practice support</p>
            </div>
          </div>
        </section>

        {reviews.length > 0 ? (
          <section aria-labelledby="reviews-heading" className="pb-10 sm:pb-14">
            <div className="flex items-end justify-between gap-4">
              <h2 id="reviews-heading" className="text-2xl font-semibold sm:text-3xl">What our students say</h2>
              <Link className="text-sm font-semibold text-brand-800 hover:underline" href="/reviews">
                All reviews →
              </Link>
            </div>
            <div className="mt-5"><RandomReviews reviews={reviews} count={3} /></div>
          </section>
        ) : null}

        <FalowenExperience />
        <LatestFreeLessons />

        <section aria-labelledby="blog-heading" className="pb-12 sm:pb-16">
          <div className="flex items-end justify-between gap-4">
            <h2 id="blog-heading" className="text-2xl font-semibold sm:text-3xl">Latest German learning articles</h2>
            <a className="text-sm font-semibold text-brand-800 hover:underline" href="https://blog.falowen.app/" target="_blank" rel="noopener noreferrer">
              All posts →
            </a>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {posts.map((post, index) => (
              <a key={index} href={post.link} target="_blank" rel="noopener noreferrer"
                className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm hover:bg-neutral-50">
                <div className="font-semibold">{post.title}</div>
                {post.excerpt ? <div className="mt-2 text-sm text-neutral-700">{post.excerpt}…</div> : null}
                <div className="mt-4 text-sm font-semibold text-brand-800">Read →</div>
              </a>
            ))}
          </div>
        </section>

        {heroSlides.length > 0 ? (
          <section aria-labelledby="academy-updates-heading" className="pb-12 sm:pb-16">
            <h2 id="academy-updates-heading" className="mb-5 text-2xl font-semibold sm:text-3xl">Academy updates</h2>
            <HeroSlides slides={heroSlides} compact />
          </section>
        ) : null}
      </Container>
    </div>
  );
}
