import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/SectionTitle";
import { tutors } from "@/data/content";

export default function TutorsPage() {
  return (
    <Container>
      <section className="py-12 sm:py-16">
        <SectionTitle title="Tutors" subtitle="Meet the team supporting your German journey." />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tutors.map((t) => (
            <div key={t.name} className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
              <div className="text-lg font-semibold">{t.name}</div>
              <div className="text-sm text-neutral-600">{t.role}</div>
              <p className="mt-3 text-sm text-neutral-700 leading-6">{t.bio}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {t.specialties.map((s) => (
                  <span key={s} className="rounded-full border border-black/10 bg-neutral-50 px-3 py-1 text-xs text-neutral-700">{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </Container>
  );
}
