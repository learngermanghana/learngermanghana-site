import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/SectionTitle";
import { CTA, SITE, WHATSAPP_LINK } from "@/lib/site";

export default function ContactPage() {
  return (
    <Container>
      <section className="py-12 sm:py-16">
        <SectionTitle title="Contact" subtitle="Questions? Register via Falowen or message us on WhatsApp." />

        <div className="grid gap-4 lg:grid-cols-3">
          <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm lg:col-span-2">
            <div className="text-lg font-semibold">Register</div>
            <p className="mt-2 text-sm text-neutral-700 leading-6">
              All registrations happen on Falowen. Click below to sign up and choose your class.
            </p>
            <div className="mt-4 flex flex-col sm:flex-row gap-3">
              <a href={CTA.primary.href} target="_blank" rel="noreferrer"
                className="inline-flex items-center justify-center rounded-2xl bg-brand-950 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-900">
                {CTA.primary.label}
              </a>
              <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer"
                className="inline-flex items-center justify-center rounded-2xl border border-black/10 bg-white px-5 py-3 text-sm font-semibold hover:bg-neutral-50">
                WhatsApp us
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
            <div className="text-lg font-semibold">Contact details</div>
            <div className="mt-4 space-y-3 text-sm text-neutral-700">
              <div><span className="text-neutral-500">Email:</span> {SITE.email}</div>
              <div><span className="text-neutral-500">WhatsApp:</span> +{SITE.whatsapp}</div>
              <div><span className="text-neutral-500">Location:</span> {SITE.location}</div>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
}
