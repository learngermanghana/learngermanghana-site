import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/SectionTitle";
import { LINKS, WHATSAPP_LINK } from "@/lib/site";
import { FAQ_ENTRIES } from "@/data/faq";

function FAQItem({ q, a }: { q: string; a: React.ReactNode }) {
  return (
    <details className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
      <summary className="cursor-pointer font-semibold text-neutral-900">{q}</summary>
      <div className="mt-3 text-sm text-neutral-700 leading-6">{a}</div>
    </details>
  );
}

export default function FAQPage() {
  return (
    <Container>
      <section className="py-12 sm:py-16">
        <SectionTitle
          title="FAQ"
          subtitle="Quick answers about enrollment, access, payments, certificates, and results."
        />

        <div className="grid gap-3">
          {FAQ_ENTRIES.map((entry) => (
            <FAQItem key={entry.question} q={entry.question} a={entry.answer} />
          ))}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <a
            href={LINKS.falowen}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-2xl bg-brand-950 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-900"
          >
            Go to Falowen (Sign up)
          </a>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-2xl border border-black/10 bg-white px-6 py-3 text-sm font-semibold hover:bg-neutral-50"
          >
            Chat on WhatsApp
          </a>
        </div>
      </section>
    </Container>
  );
}
