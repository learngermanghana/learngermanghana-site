import type { Metadata } from "next";
import { AcademyHero } from "@/components/AcademyHero";
import { Container } from "@/components/Container";

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

export default function HomePage() {
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
        <p className="pb-8 text-center text-xs text-[#6a788d]">Falowen provides independent Goethe-style exam preparation and is not affiliated with or endorsed by Goethe-Institut.</p>
      </Container>
    </>
  );
}
