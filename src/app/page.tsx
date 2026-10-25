import type { Metadata } from "next";
import Link from "next/link";
import { AcademyHero } from "@/components/AcademyHero";
import { Container } from "@/components/Container";
import { RandomReviews } from "@/components/RandomReviews";
import { getReviews } from "@/lib/reviews";
import { LINKS } from "@/lib/site";

export const revalidate = 21600;
export const metadata: Metadata = {
  title: "Learn German Online | Classes, Free Placement Test, Goethe Practice & Books",
  description: "Learn German from anywhere with Learn Language Education Academy, based in Ghana. Join live online classes, take a free A1–B1 placement test, practise Goethe-style exams and shop Falowen German books.",
  keywords: ["learn German online", "German classes Ghana", "online German classes worldwide", "German language school Ghana", "Goethe sample test", "Goethe exam practice", "German placement test", "German course books", "Falowen"],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Learn German from Anywhere | Learn Language Education Academy",
    description: "German classes online and in Accra, free placement testing, independent Goethe-style exam practice and Falowen books.",
    url: "/",
    type: "website",
    images: [{ url: "/hero/hero.jpg", alt: "Learn Language Education Academy classroom" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Learn German from Anywhere | Learn Language Education Academy",
    description: "Classes, placement tests, Goethe-style exam practice and German books powered by Falowen.",
    images: ["/hero/hero.jpg"],
  },
};

export default async function HomePage() {
  const reviews = await getReviews();
  return (
    <>
      <AcademyHero />
      <Container>
        <section className="mt-4 grid gap-3 md:grid-cols-3" aria-label="Why study with us">
          <div className="flex gap-3 rounded-2xl border border-[#e4eaf3] bg-white p-4">
            <span aria-hidden="true" className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#eaf2ff] text-lg text-[#075cf1]">⌂</span>
            <div><h3 className="text-sm font-extrabold text-[#10254a]">Learn German from anywhere</h3><p className="mt-1 text-xs text-[#61718a]">Based in Ghana · Online classes open worldwide</p></div>
          </div>
          <div className="flex gap-3 rounded-2xl border border-[#e4eaf3] bg-white p-4">
            <span aria-hidden="true" className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#eaf2ff] text-lg text-[#075cf1]">▤</span>
            <div><h3 className="text-sm font-extrabold text-[#10254a]">Clear learning materials</h3><p className="mt-1 text-xs text-[#61718a]">Structured workbooks and recorded lessons</p></div>
          </div>
          <div className="flex gap-3 rounded-2xl border border-[#e4eaf3] bg-white p-4">
            <span aria-hidden="true" className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#eaf2ff] text-lg text-[#075cf1]">✦</span>
            <div><h3 className="text-sm font-extrabold text-[#10254a]">Falowen learning support</h3><p className="mt-1 text-xs text-[#61718a]">AI practice with real tutor guidance</p></div>
          </div>
        </section>
        <section className="mt-4 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#dceafc] bg-[#ebf5ff] px-5 py-5 sm:px-7">
          <div><h2 className="text-lg font-extrabold tracking-tight text-[#10254a] sm:text-xl">Practise with AI. Improve with a tutor.</h2><p className="mt-1 text-xs text-[#526784] sm:text-sm">Discover how Falowen supports your learning between classes.</p></div>
          <a href={LINKS.visitorGuide} className="text-sm font-bold text-[#0755cb] underline-offset-4 hover:underline">See how Falowen works →</a>
        </section>
        {reviews.length > 0 ? (
          <section className="pb-7 pt-7 sm:pb-10" aria-labelledby="reviews-heading">
            <div className="flex items-end justify-between gap-3">
              <div><h2 id="reviews-heading" className="text-xl font-extrabold text-[#10254a] sm:text-2xl">What our students say</h2><p className="mt-1 text-xs text-[#61718a]">Feedback from Learn Language Education Academy students.</p></div>
              <Link href="/reviews" className="shrink-0 text-xs font-bold text-[#0755cb] hover:underline sm:text-sm">All reviews →</Link>
            </div>
            <div className="mt-3"><RandomReviews reviews={reviews} count={2} /></div>
          </section>
        ) : null}
        <p className="pb-8 text-center text-xs text-[#6a788d]">Falowen provides independent Goethe-style exam preparation and is not affiliated with or endorsed by Goethe-Institut.</p>
      </Container>
    </>
  );
}
