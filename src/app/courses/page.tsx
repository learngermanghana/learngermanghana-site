import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/SectionTitle";
import { courses } from "@/data/content";
import { CTA } from "@/lib/site";

export default function CoursesPage() {
  return (
    <Container>
      <section className="py-12 sm:py-16">
        <SectionTitle title="Courses" subtitle="Choose your level and register via Falowen." />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {courses.map((c) => (
            <div key={c.level} className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
              <div className="text-sm text-neutral-600">{c.level}</div>
              <div className="mt-1 text-lg font-semibold">{c.title}</div>
              <p className="mt-3 text-sm text-neutral-700 leading-6">{c.desc}</p>
              <a href={CTA.primary.href} target="_blank" rel="noreferrer"
                 className="mt-4 inline-flex rounded-2xl bg-brand-950 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-900">
                Register
              </a>
            </div>
          ))}
        </div>
      </section>
    </Container>
  );
}
