import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/SectionTitle";
import { LINKS, SITE, WHATSAPP_LINK } from "@/lib/site";

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
      {children}
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Container>
      <section className="py-12 sm:py-16">
        <SectionTitle
          title="Enroll on Falowen"
          subtitle="No registration form needed. Create an account in Falowen, choose a class, review the price, and pay to get access."
        />

        {/* Primary CTA */}
        <div className="rounded-[28px] bg-gradient-to-br from-brand-950 via-brand-900 to-emerald-900 p-7 sm:p-10 text-white shadow-sm ring-1 ring-black/10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <div className="text-white/80 text-sm">Enrollment portal</div>
              <div className="mt-1 text-2xl sm:text-3xl font-semibold">Go to Falowen (Sign up)</div>
              <div className="mt-3 text-white/85 max-w-2xl text-sm sm:text-base leading-7">
                Enrollment happens inside Falowen. You will see the class price and start dates before you pay, and access is granted after payment confirmation.
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={LINKS.falowen}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-brand-950 hover:bg-white/90"
              >
                Open Falowen (Sign up)
              </a>

              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white hover:bg-white/15"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>

          <div className="mt-6 text-xs text-white/70">
            Tip: View available cohorts and start dates in your Falowen account under <span className="font-semibold">Upcoming Classes</span>.
          </div>
        </div>

        {/* How to enroll */}
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          <Card>
            <div className="text-sm font-semibold">How to enroll (No registration form)</div>
            <div className="mt-2 text-sm text-neutral-600 leading-6">
              This is the fastest way on mobile—everything happens inside Falowen.
            </div>
            <ol className="mt-3 space-y-3 text-sm text-neutral-700 leading-6">
              <li>
                <span className="font-semibold">1) Create your account:</span>{" "}
                Visit <span className="font-semibold">www.falowen.app</span> and tap <span className="font-semibold">Sign up</span>.
              </li>
              <li>
                <span className="font-semibold">2) Choose a class:</span>{" "}
                Open <span className="font-semibold">Upcoming Classes</span> to see dates and prices, then select your class.
              </li>
              <li>
                <span className="font-semibold">3) Make payment:</span>{" "}
                Pay online for the selected class.
              </li>
              <li>
                <span className="font-semibold">4) Get automatic access:</span>{" "}
                Access is granted immediately (or once payment confirms).
              </li>
              <li>
                <span className="font-semibold">5) We contact you:</span>{" "}
                The Academy will contact you in the app (and by email if needed).
              </li>
            </ol>

            <div className="mt-4 flex flex-col gap-2">
              <a
                href={LINKS.falowen}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-2xl bg-brand-950 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-900"
              >
                Go to Falowen (Sign up)
              </a>
              <a
                href="/faq"
                className="inline-flex items-center justify-center rounded-2xl border border-black/10 bg-white px-5 py-3 text-sm font-semibold hover:bg-neutral-50"
              >
                Read FAQ
              </a>
            </div>
          </Card>

          <Card>
            <div className="text-sm font-semibold">Need help?</div>
            <div className="mt-3 text-sm text-neutral-700 leading-6">
              Contact <a className="font-semibold hover:underline" href={`mailto:${SITE.email}`}>{SITE.email}</a>{" "}
              or click <span className="font-semibold">Chat on WhatsApp</span> above.
            </div>

            <div className="mt-4 rounded-2xl border border-black/10 bg-neutral-50 p-4 text-sm text-neutral-700">
              <div className="font-semibold">Common quick fixes</div>
              <ul className="mt-2 space-y-1">
                <li>• Check spam/junk for verification emails</li>
                <li>• Ensure your email/phone is correct in your Falowen profile</li>
                <li>• If payment is pending, wait for confirmation and refresh your account</li>
              </ul>
            </div>

            <div className="mt-4 flex flex-col gap-2">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-2xl bg-brand-950 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-900"
              >
                WhatsApp Support
              </a>
              <a
                href={`mailto:${SITE.email}`}
                className="inline-flex items-center justify-center rounded-2xl border border-black/10 bg-white px-5 py-3 text-sm font-semibold hover:bg-neutral-50"
              >
                Email Support
              </a>
            </div>
          </Card>

          <Card>
            <div className="text-sm font-semibold">Agreement notice</div>
            <p className="mt-3 text-sm text-neutral-700 leading-6">
              By enrolling and making payment, you agree to our <span className="font-semibold">Privacy Policy</span>,{" "}
              <span className="font-semibold">Terms of Service</span>, and the <span className="font-semibold">Payment Agreement</span> below.
            </p>

            <div className="mt-4 rounded-2xl border border-black/10 bg-neutral-50 p-4 text-sm text-neutral-700">
              Learn Language Education Academy (“we”, “us”, or “our”) operates the Falowen website and app (the “Service”).
              This page includes enrollment guidance plus our Payment Agreement.
            </div>

            <div className="mt-4 text-xs text-neutral-500">
              (Policy pages can also be displayed inside Falowen where applicable.)
            </div>
          </Card>
        </div>

        {/* Payment Agreement */}
        <div className="mt-10 rounded-3xl border border-black/10 bg-white p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-semibold">Payment Agreement</h2>
          <p className="mt-2 text-sm text-neutral-700 leading-6">
            This Payment Agreement is entered into on <span className="font-semibold">[DATE]</span> for{" "}
            <span className="font-semibold">[CLASS]</span> students of Learn Language Education Academy and Felix Asadu (“Teacher”).
          </p>

          <h3 className="mt-6 text-sm font-semibold">Terms of Payment</h3>
          <ul className="mt-3 space-y-2 text-sm text-neutral-700 leading-6">
            <li><span className="font-semibold">Payment Amount:</span> Total course fee is <span className="font-semibold">[AMOUNT] GHS</span>. Fee is the same regardless of learning mode (online, in person, self-learning, or recorded lectures).</li>
            <li><span className="font-semibold">Payment Schedule:</span> Pay in full or in two installments: first installment <span className="font-semibold">[FIRST_INSTALLMENT] GHS</span>, remaining balance due one month after first payment.</li>
            <li><span className="font-semibold">Learning Mode & Attendance Rights:</span> For each session, you may join in person, online, or via recorded lecture. You choose each time.</li>
            <li><span className="font-semibold">Class Duration & Contract Term:</span> Each class runs for 10 weeks (~3 months). Contract access to Falowen is 6 months from enrollment.</li>
            <li><span className="font-semibold">Post-Contract Access:</span> After 6 months, continue by (a) extension at <span className="font-semibold">1,000 GHS/month</span>, or (b) enroll in a new 10-week class at the then-current fee.</li>
            <li><span className="font-semibold">Attendance:</span> Attendance is recorded for official records in <span className="font-semibold">My Results & Resources</span>.</li>
            <li><span className="font-semibold">Certification:</span> Certificate of Completion issued when assignments are submitted and course is completed. Not a Goethe-Institut certificate.</li>
            <li><span className="font-semibold">Late Payments:</span> Access may be revoked if payment is late. No refund will be made.</li>
            <li><span className="font-semibold">Refunds:</span> Once payment is confirmed and access is granted, no refunds (except where required by law).</li>
          </ul>

          <h3 className="mt-6 text-sm font-semibold">How to Pay</h3>
          <ul className="mt-3 space-y-2 text-sm text-neutral-700 leading-6">
            <li><span className="font-semibold">Primary method:</span> Pay inside your Falowen account after choosing a class under <span className="font-semibold">Upcoming Classes</span>.</li>
            <li><span className="font-semibold">Support:</span> If you have payment issues, contact <a className="font-semibold hover:underline" href={`mailto:${SITE.email}`}>{SITE.email}</a> or use WhatsApp support above.</li>
          </ul>

          <h3 className="mt-6 text-sm font-semibold">Class Level & Start Date</h3>
          <p className="mt-2 text-sm text-neutral-700 leading-6">
            Fees and dates vary by level and cohort. Confirm your level and start date in Falowen under <span className="font-semibold">Upcoming Classes</span> before paying.
          </p>

          <p className="mt-6 text-sm text-neutral-700 leading-6">
            By making any payment, you acknowledge and agree to the terms of this Payment Agreement.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <a
              href={LINKS.falowen}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-2xl bg-brand-950 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-900"
            >
              Go to Falowen (Sign up)
            </a>
            <a
              href="/faq"
              className="inline-flex items-center justify-center rounded-2xl border border-black/10 bg-white px-6 py-3 text-sm font-semibold hover:bg-neutral-50"
            >
              Read FAQ
            </a>
          </div>
        </div>
      </section>
    </Container>
  );
}
