import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/SectionTitle";
import Link from "next/link";
import { CTA, LINKS } from "@/lib/site";

const fullHourExamples = [
  { de: "Es ist ein Uhr.", en: "It is 1:00." },
  { de: "Es ist zwei Uhr.", en: "It is 2:00." },
  { de: "Es ist drei Uhr.", en: "It is 3:00." },
];

const corePatterns = [
  { pattern: "volle Stunde", de: "X Uhr", ex: "Es ist ein Uhr. (1:00)" },
  { pattern: "Viertel nach", de: "Viertel nach X", ex: "Es ist Viertel nach eins. (1:15)" },
  { pattern: "halb", de: "halb + nächste Stunde", ex: "Es ist halb zwei. (1:30)" },
  { pattern: "Viertel vor", de: "Viertel vor + nächste Stunde", ex: "Es ist Viertel vor zwei. (1:45)" },
];

const practiceItems = [
  { time: "3:00", answer: "Es ist drei Uhr." },
  { time: "3:15", answer: "Es ist Viertel nach drei." },
  { time: "3:30", answer: "Es ist halb vier." },
  { time: "3:45", answer: "Es ist Viertel vor vier." },
  { time: "4:30", answer: "Es ist halb fünf." },
  { time: "2:30", answer: "Es ist halb drei." },
];

export default function ResourcesPage() {
  return (
    <div className="bg-neutral-50">
      <Container>
        <section className="py-12 sm:py-16">
          <SectionTitle
            title="Learning Resources"
            subtitle="Use these tools to guide your study plan, practice daily, and prepare for exams."
          />

          <div className="grid gap-4 lg:grid-cols-3">
            <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
              <div className="text-base font-semibold text-neutral-900">Placement test</div>
              <p className="mt-3 text-sm text-neutral-700">
                Find your level and get a recommended learning path in minutes.
              </p>
              <Link
                href="/lead-capture?intent=placement-test&source=resources"
                className="mt-4 inline-flex text-sm font-semibold text-brand-950 hover:underline"
              >
                Take the placement test →
              </Link>
            </div>

            <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
              <div className="text-base font-semibold text-neutral-900">Falowen practice hub</div>
              <p className="mt-3 text-sm text-neutral-700">
                Access daily exercises, class recordings, and AI study support on Falowen.
              </p>
              <a
                href={LINKS.falowen}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex text-sm font-semibold text-brand-950 hover:underline"
              >
                Open Falowen →
              </a>
            </div>

            <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
              <div className="text-base font-semibold text-neutral-900">Exam prep checklist</div>
              <p className="mt-3 text-sm text-neutral-700">
                Focus on speaking, writing, and listening tasks that match Goethe exam expectations.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-neutral-700">
                <li>• Weekly mock speaking sessions.</li>
                <li>• Timed reading and listening practice.</li>
                <li>• Writing templates and feedback rounds.</li>
              </ul>
            </div>
          </div>

          <div className="mt-10 rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
            <div className="text-base font-semibold text-neutral-900">A1 mini-guide: Telling time with “Es ist …”</div>
            <p className="mt-2 text-sm text-neutral-700">
              Big idea: Start every time sentence with <span className="font-semibold">Es ist …</span>. Learn full hour first,
              then <span className="font-semibold">Viertel nach</span>, <span className="font-semibold">halb</span>, and
              <span className="font-semibold"> Viertel vor</span>.
            </p>

            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {fullHourExamples.map((item) => (
                <div key={item.de} className="rounded-2xl bg-neutral-50 p-4 text-sm text-neutral-800">
                  <div className="font-semibold">{item.de}</div>
                  <div className="mt-1 text-neutral-600">{item.en}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full text-left text-sm text-neutral-700">
                <thead>
                  <tr className="border-b border-black/10 text-neutral-900">
                    <th className="px-2 py-2 font-semibold">Pattern</th>
                    <th className="px-2 py-2 font-semibold">German</th>
                    <th className="px-2 py-2 font-semibold">Example</th>
                  </tr>
                </thead>
                <tbody>
                  {corePatterns.map((item) => (
                    <tr key={item.pattern} className="border-b border-black/5">
                      <td className="px-2 py-2">{item.pattern}</td>
                      <td className="px-2 py-2">{item.de}</td>
                      <td className="px-2 py-2">{item.ex}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 rounded-2xl bg-amber-50 p-4 text-sm text-amber-900">
              <div className="font-semibold">Important tip about “halb”</div>
              <p className="mt-1">
                In English, “half past four” = 4:30. In German, <span className="font-semibold">halb fünf</span> = 4:30
                because German points to the <span className="font-semibold">next hour</span>.
              </p>
              <p className="mt-2">Examples: halb zwei = 1:30, halb drei = 2:30, halb vier = 3:30, halb fünf = 4:30.</p>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-black/10 p-4">
                <div className="text-sm font-semibold text-neutral-900">AM vs PM (12-hour clock)</div>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-neutral-700">
                  <li>Use context words: morgens (AM), vormittags (AM), nachmittags (PM), abends (PM), nachts.</li>
                  <li>Example: Es ist zwei Uhr morgens. / Es ist zwei Uhr nachmittags.</li>
                  <li>24-hour format is also common in German (14:00 = zwei Uhr nachmittags).</li>
                </ul>
              </div>

              <div className="rounded-2xl border border-black/10 p-4">
                <div className="text-sm font-semibold text-neutral-900">Practice (with answers)</div>
                <ul className="mt-2 space-y-1 text-sm text-neutral-700">
                  {practiceItems.map((item) => (
                    <li key={item.time}>
                      {item.time} → <span className="font-medium">{item.answer}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-10 rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
            <div className="text-base font-semibold text-neutral-900">Need a full study plan?</div>
            <p className="mt-2 text-sm text-neutral-700">
              Register on Falowen to receive your study schedule and start your learning journey with tutor support.
            </p>
            <a
              href={CTA.primary.href}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center justify-center rounded-2xl bg-brand-950 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-900"
            >
              {CTA.primary.label}
            </a>
          </div>
        </section>
      </Container>
    </div>
  );
}
