import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/SectionTitle";
import { LINKS, SITE, WHATSAPP_LINK } from "@/lib/site";

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
          <FAQItem
            q="How do I enroll and get access to Falowen?"
            a={
              <>
                Go to <span className="font-semibold">www.falowen.app</span>, click <span className="font-semibold">Sign up</span> and create an account.
                Then open <span className="font-semibold">Upcoming Classes</span>, choose your class, and pay.
                After payment, you get automatic access and the school will contact you in the app.
              </>
            }
          />

          <FAQItem
            q="Do online, in-person, self-learning, or recorded lectures cost the same?"
            a={
              <>
                Yes. The fee is the same for all learning modes. For each session, you may join in person, online, or via recorded lecture — you decide each time.
                <div className="mt-3 rounded-2xl bg-neutral-50 p-4 ring-1 ring-black/5">
                  <div>• Class duration: <span className="font-semibold">10 weeks (~3 months)</span></div>
                  <div>• Contract access: <span className="font-semibold">6 months</span> total Falowen access from enrollment</div>
                  <div>• After 6 months: Extend at <span className="font-semibold">1,000 GHS/month</span> or enroll in a new 10-week class</div>
                </div>
              </>
            }
          />

          <FAQItem
            q="Do I receive a certificate upon completion?"
            a={
              <>
                Yes. Certificates are awarded when you successfully complete the course and submit all required assignments.
              </>
            }
          />

          <FAQItem
            q="Does the Falowen certificate replace a Goethe certificate?"
            a={
              <>
                No. Falowen issues a <span className="font-semibold">Certificate of Completion</span>. It is not an official Goethe-Institut certificate
                and does not replace embassy or university requirements.
              </>
            }
          />

          <FAQItem
            q="Where can I download my receipts, letter of enrollment, results, and attendance?"
            a={
              <>
                All official documents are available in your account under <span className="font-semibold">My Results & Resources</span>.
                Please download and keep your own copies.
              </>
            }
          />

          <FAQItem
            q="How will I receive my assignment results?"
            a={
              <>
                You will receive an email for each assignment. If you opt in, you will also receive Telegram notifications.
              </>
            }
          />

          <FAQItem
            q="Do I get weekly progress summaries?"
            a={
              <>
                Yes. We send weekly summaries that include your average score and learning streaks.
              </>
            }
          />

          <FAQItem
            q="What if I have payment or access issues?"
            a={
              <>
                Please check your email (including spam/junk) and your Falowen account. If the issue continues, contact{" "}
                <a className="font-semibold hover:underline" href={`mailto:${SITE.email}`}>{SITE.email}</a>{" "}
                or chat on WhatsApp using the link below.
              </>
            }
          />
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
