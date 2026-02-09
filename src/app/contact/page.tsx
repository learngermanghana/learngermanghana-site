import Link from "next/link";
import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/SectionTitle";
import { CTA, SITE } from "@/lib/site";

export default function ContactPage() {
  return (
    <Container>
      <section className="py-12 sm:py-16">
        <SectionTitle
          title="Contact"
          subtitle="Share your details and we will reach out with the best registration or placement guidance."
        />

        <div className="grid gap-4 lg:grid-cols-3">
          <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm lg:col-span-2">
            <div className="text-lg font-semibold">Register</div>
            <p className="mt-2 text-sm text-neutral-700 leading-6">
              Use our lead form so we can confirm your level and recommend the right class before you register.
            </p>
            <div className="mt-4 flex flex-col sm:flex-row gap-3">
              <Link
                href={CTA.primary.href}
                className="inline-flex items-center justify-center rounded-2xl bg-brand-950 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-900"
              >
                Submit your details
              </Link>
              <Link
                href={CTA.help.href}
                className="inline-flex items-center justify-center rounded-2xl border border-black/10 bg-white px-5 py-3 text-sm font-semibold hover:bg-neutral-50"
              >
                Talk to us
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
            <div className="text-lg font-semibold">Contact details</div>
            <div className="mt-4 space-y-3 text-sm text-neutral-700">
              <div><span className="text-neutral-500">Email:</span> {SITE.email}</div>
              <div><span className="text-neutral-500">WhatsApp:</span> +{SITE.phoneIntl}</div>
              <div><span className="text-neutral-500">Location:</span> {SITE.location}</div>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
}
