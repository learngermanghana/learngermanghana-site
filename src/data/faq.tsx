import { SITE } from "@/lib/site";

export type FAQEntry = {
  question: string;
  answer: React.ReactNode;
  keywords: string[];
};

export const FAQ_ENTRIES: FAQEntry[] = [
  {
    question: "How do I enroll and get access to Falowen?",
    answer: (
      <>
        Go to <span className="font-semibold">www.falowen.app</span>, click{" "}
        <span className="font-semibold">Sign up</span> and create an account. Then open{" "}
        <span className="font-semibold">Upcoming Classes</span>, choose your class, and pay. After payment, you get
        automatic access and the school will contact you in the app.
      </>
    ),
    keywords: ["enroll", "enrol", "signup", "sign up", "register", "falowen", "access"],
  },
  {
    question: "Do online, in-person, self-learning, or recorded lectures cost the same?",
    answer: (
      <>
        Yes. The fee is the same for all learning modes. For each session, you may join in person, online, or via
        recorded lecture — you decide each time.
        <div className="mt-3 rounded-2xl bg-neutral-50 p-4 ring-1 ring-black/5">
          <div>
            • Class duration: <span className="font-semibold">10 weeks (~3 months)</span>
          </div>
          <div>
            • Contract access: <span className="font-semibold">6 months</span> total Falowen access from enrollment
          </div>
          <div>
            • After 6 months: Extend at <span className="font-semibold">1,000 GHS/month</span> or enroll in a new 10-week
            class
          </div>
        </div>
      </>
    ),
    keywords: ["price", "pricing", "fees", "cost", "same", "online", "in-person", "recorded", "self-learning"],
  },
  {
    question: "Can I enroll directly in B2, and do I pay for each level?",
    answer: (
      <>
        To reach B2, you must complete the full learning path: A1 → A2 → B1 → B2. Each level takes about 10 weeks and
        includes lessons and assessments. If your goal is B2, you do not need to write the A1 and A2 exams; we focus on
        building your skills until B1, and then you can attempt the official exams. Students pay per level. Please
        confirm the current fees when you are ready to enroll, and we will share the latest brochure and schedule.
      </>
    ),
    keywords: ["b2", "level", "levels", "pay", "per level", "path", "a1", "a2", "b1"],
  },
  {
    question: "Do I receive a certificate upon completion?",
    answer: <>Yes. Certificates are awarded when you successfully complete the course and submit all required assignments.</>,
    keywords: ["certificate", "completion", "finish", "award"],
  },
  {
    question: "Does the Falowen certificate replace a Goethe certificate?",
    answer: (
      <>
        No. Falowen issues a <span className="font-semibold">Certificate of Completion</span>. It is not an official
        Goethe-Institut certificate and does not replace embassy or university requirements.
      </>
    ),
    keywords: ["goethe", "certificate", "replace", "official"],
  },
  {
    question: "Where can I download my receipts, letter of enrollment, results, and attendance?",
    answer: (
      <>
        All official documents are available in your account under{" "}
        <span className="font-semibold">My Results & Resources</span>. Please download and keep your own copies.
      </>
    ),
    keywords: ["receipt", "receipts", "enrollment", "results", "attendance", "documents", "download"],
  },
  {
    question: "How will I receive my assignment results?",
    answer: <>You will receive an email for each assignment. If you opt in, you will also receive Telegram notifications.</>,
    keywords: ["assignment", "results", "telegram", "email", "notifications"],
  },
  {
    question: "Do I get weekly progress summaries?",
    answer: <>Yes. We send weekly summaries that include your average score and learning streaks.</>,
    keywords: ["weekly", "summary", "progress", "streak", "score"],
  },
  {
    question: "What if I have payment or access issues?",
    answer: (
      <>
        Please check your email (including spam/junk) and your Falowen account. If the issue continues, contact support
        by email at{" "}
        <a className="font-semibold hover:underline" href={`mailto:${SITE.email}`}>
          {SITE.email}
        </a>{" "}
        or chat on WhatsApp.
      </>
    ),
    keywords: ["payment", "access", "issues", "problem", "failed", "support"],
  },
  {
    question: "Where can I see upcoming classes and start dates?",
    answer: (
      <>
        Upcoming classes, start dates, and seats are listed in Falowen under{" "}
        <span className="font-semibold">Upcoming Classes</span>. You can also browse the public class schedule at{" "}
        <span className="font-semibold">www.learngermanghana.com/classes</span>.
      </>
    ),
    keywords: ["upcoming", "class", "classes", "start date", "start dates", "schedule", "cohort", "seats"],
  },
  {
    question: "How long is each class level?",
    answer: <>Each level runs for about 10 weeks (roughly 3 months).</>,
    keywords: ["how long", "duration", "weeks", "months", "length", "class length", "course length"],
  },
  {
    question: "Do classes meet online or in person?",
    answer: (
      <>
        A1–B1 classes are hybrid, so you can join in person or online. B2–C1 is self-paced with AI support and no
        physical classes.
      </>
    ),
    keywords: ["online", "in person", "in-person", "hybrid", "self-paced", "format", "meet", "class format"],
  },
];
