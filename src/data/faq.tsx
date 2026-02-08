import { LINKS, SITE } from "@/lib/site";

export type FAQEntry = {
  category: string;
  question: string;
  answer: React.ReactNode;
  keywords: string[];
};

const CLASS_SCHEDULE_URL = `${LINKS.mainWebsite}/classes`;

export const FAQ_ENTRIES: FAQEntry[] = [
  {
    category: "Pricing",
    question: "How much are your fees?",
    answer: (
      <>
        <div className="space-y-1">
          <div>
            • A1: <span className="font-semibold">2,800 GHS</span>
          </div>
          <div>
            • A2–C1: <span className="font-semibold">3,000 GHS</span>
          </div>
        </div>
        <div className="mt-2">Online and physical classes cost the same.</div>
      </>
    ),
    keywords: [
      "fees",
      "fee",
      "a1 fee",
      "pricing",
      "price",
      "price pls",
      "tuition",
      "charges",
      "cost",
      "cost pls",
      "how much",
      "ghana",
      "ghs",
      "cedis",
      "2800",
      "3000",
      "a1",
      "a2",
      "b1",
      "b2",
      "c1",
    ],
  },
  {
    category: "Pricing",
    question: "How can students pay?",
    answer: (
      <>
        Pay inside your Falowen account after choosing a class. If you need help with payment, contact{" "}
        <a className="font-semibold hover:underline" href={`mailto:${SITE.email}`}>
          {SITE.email}
        </a>{" "}
        or chat on WhatsApp.
      </>
    ),
    keywords: ["payment", "pay", "falowen", "online payment", "tuition", "installment", "bank", "mobile money"],
  },
  {
    category: "Schedule",
    question: "When is the next intake or start date?",
    answer: (
      <>
        Start dates change by cohort. For the latest intakes, seats, and timing, view the{" "}
        <a className="font-semibold hover:underline" href={CLASS_SCHEDULE_URL}>
          class schedule
        </a>
        .
      </>
    ),
    keywords: [
      "intake",
      "start date",
      "when are you starting",
      "when start",
      "next batch",
      "feb 17",
      "cohort",
      "next class",
      "schedule",
      "upcoming",
    ],
  },
  {
    category: "Schedule",
    question: "What are your class days and hours per week?",
    answer: (
      <>
        Meeting days depend on the cohort. Current schedules include weekday sessions (Mon–Wed and Thu–Fri) and weekend
        options (Sat–Sun for French A1). Each live class is{" "}
        <span className="font-semibold">1 hour</span>, typically{" "}
        <span className="font-semibold">2–3 sessions per week</span>. See the live schedule at{" "}
        <a className="font-semibold hover:underline" href={CLASS_SCHEDULE_URL}>
          class schedule
        </a>
        .
      </>
    ),
    keywords: ["class days", "weekdays", "weekends", "hours", "per week", "schedule", "times"],
  },
  {
    category: "Classes & Format",
    question: "Where are your physical classes and do you offer online classes?",
    answer: (
      <>
        Physical classes are in <span className="font-semibold">Awoshie (Accra)</span>. Yes, we offer online classes via{" "}
        <span className="font-semibold">Zoom</span>, and A1–B1 classes are hybrid.
      </>
    ),
    keywords: [
      "location",
      "where are you",
      "direction",
      "map",
      "awoshie location",
      "accra",
      "awoshie",
      "online",
      "zoom",
      "hybrid",
      "in-person",
      "in person",
    ],
  },
  {
    category: "Enrollment",
    question: "How do I enroll and get access to Falowen?",
    answer: (
      <>
        No separate registration form is needed. Go to <span className="font-semibold">www.falowen.app</span>, sign up,
        choose a class, and pay to get access. After payment, you get automatic access and the school will contact you
        in the app.
      </>
    ),
    keywords: [
      "register",
      "registration",
      "sign up",
      "sign-up",
      "join",
      "admission",
      "create account",
      "enroll",
      "falowen",
      "account",
    ],
  },
  {
    category: "Exams & Certificates",
    question: "Do you offer completion certificates and prepare students for exams?",
    answer: (
      <>
        Yes. We issue a <span className="font-semibold">Certificate of Completion</span> when you finish the course and
        submit required assignments. We also prepare students for{" "}
        <span className="font-semibold">Goethe-Institut</span> exams and French exams from{" "}
        <span className="font-semibold">Alliance Française</span>. The completion certificate is not a Goethe
        certificate and does not replace official exam requirements.
      </>
    ),
    keywords: ["certificate", "goethe", "exam", "exams", "alliance francaise", "french exams", "preparation"],
  },
  {
    category: "Exams & Certificates",
    question: "Where can I see Goethe exam prices and how do I register?",
    answer: (
      <>
        Please visit the{" "}
        <a className="font-semibold hover:underline" href={CLASS_SCHEDULE_URL}>
          class schedule
        </a>
        . Goethe exam prices are listed there. After you complete your class, you register directly with{" "}
        <span className="font-semibold">Goethe-Institut</span> for the exam.
      </>
    ),
    keywords: ["goethe", "exam price", "exam prices", "pricing", "fees", "register", "registration", "goethe exam"],
  },
  {
    category: "Enrollment",
    question: "Can absolute beginners join and do you place students by level test?",
    answer: (
      <>
        Yes, absolute beginners can start at A1. If you are unsure about your level, we confirm the right class inside{" "}
        <span className="font-semibold">Falowen</span> before you pay.
      </>
    ),
    keywords: ["beginner", "absolute beginner", "level test", "placement", "a1", "start"],
  },
  {
    category: "Support",
    question: "Do you help with German study visa, Ausbildung, or embassy interview preparation?",
    answer: (
      <>
        We focus on language classes and exam preparation. If you need visa, Ausbildung, or embassy interview guidance,
        please contact us to discuss your situation.
      </>
    ),
    keywords: ["visa", "ausbildung", "embassy", "interview", "support", "help"],
  },
  {
    category: "Classes & Format",
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
    category: "Enrollment",
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
    category: "Support",
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
    category: "Support",
    question: "How will I receive my assignment results?",
    answer: <>You will receive an email for each assignment. If you opt in, you will also receive Telegram notifications.</>,
    keywords: ["assignment", "results", "telegram", "email", "notifications"],
  },
  {
    category: "Support",
    question: "Do I get weekly progress summaries?",
    answer: <>Yes. We send weekly summaries that include your average score and learning streaks.</>,
    keywords: ["weekly", "summary", "progress", "streak", "score"],
  },
  {
    category: "Support",
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
    category: "Schedule",
    question: "Where can I see class schedules and start dates?",
    answer: (
      <>
        View the latest cohorts, start dates, and seats on the{" "}
        <a className="font-semibold hover:underline" href={CLASS_SCHEDULE_URL}>
          class schedule
        </a>
        .
      </>
    ),
    keywords: ["upcoming", "class", "classes", "start date", "start dates", "schedule", "cohort", "seats"],
  },
  {
    category: "Classes & Format",
    question: "How long is each class level?",
    answer: <>Each level runs for about 10 weeks (roughly 3 months).</>,
    keywords: ["how long", "duration", "weeks", "months", "length", "class length", "course length"],
  },
  {
    category: "Classes & Format",
    question: "Do classes meet online or in person?",
    answer: (
      <>
        <div className="space-y-2">
          <div className="font-semibold">Class formats by level:</div>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              <span className="font-semibold">A1–B1:</span> Hybrid (join in person in Awoshie or online via Zoom).
            </li>
            <li>
              <span className="font-semibold">B2–C1:</span> Self-paced with AI support (no physical classes).
            </li>
          </ul>
        </div>
      </>
    ),
    keywords: ["online", "in person", "in-person", "hybrid", "self-paced", "format", "meet", "class format"],
  },
];
