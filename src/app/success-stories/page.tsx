import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/SectionTitle";
import { reviews } from "@/data/content";
import { WHATSAPP_LINK } from "@/lib/site";

export default function SuccessStoriesPage() {
  return (
    <div className="bg-neutral-50">
      <Container>
        <section className="py-12 sm:py-16">
          <SectionTitle
            title="Student Success Stories"
            subtitle="Real feedback from learners who improved their German or French with our classes."
          />

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review) => (
              <div key={`${review.name}-${review.level}`} className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
                <div className="text-sm text-neutral-500">{review.level}</div>
                <div className="mt-2 text-lg font-semibold text-neutral-900">{review.name}</div>
                <p className="mt-3 text-sm text-neutral-700">“{review.text}”</p>
                {review.source ? (
                  <div className="mt-4 text-xs font-semibold text-brand-950">{review.source}</div>
                ) : null}
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-3xl border border-black/10 bg-white p-6 text-sm text-neutral-700 shadow-sm">
            <div className="text-base font-semibold text-neutral-900">Share your story</div>
            <p className="mt-2">
              Did you pass a Goethe exam or reach a new level? We would love to feature your progress.
            </p>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center justify-center rounded-2xl bg-brand-950 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-900"
            >
              Send your feedback on WhatsApp
            </a>
          </div>
        </section>
      </Container>
    </div>
  );
}
