import { LINKS, SITE, SOCIAL_LINKS } from "@/lib/site";

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
        <div className="mt-2">
          Tuition covers classes only. Exam fees are paid directly to the exam provider when you are ready to sit the
          exam.
        </div>
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
        <span className="font-semibold">Zoom</span>, and A1–B1 classes are hybrid. Hybrid means you can come to class or
        join online—decide each day or watch the recordings.
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
    category: "Classes & Format",
    question: "Do you have a branch in Kumasi?",
    answer: (
      <>
        We currently operate in <span className="font-semibold">Awoshie (Accra)</span>, but we also support remote
        learning. We built the <span className="font-semibold">Falowen</span> app to help you study online with
        recorded lectures that work the same way as in-person classes. You can check it out at{" "}
        <span className="font-semibold">www.falowen.app</span>.
      </>
    ),
    keywords: ["kumasi", "branch", "location", "accra", "awoshie", "remote", "online", "falowen", "recorded lectures"],
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
        <span className="font-semibold">Alliance Française</span>. The course includes targeted practice in official
        exam format, including mock exam-style tasks, and is designed to prepare you for both Goethe exams and daily
        life communication in German. The completion certificate is not a Goethe certificate and does not replace
        official exam requirements.
      </>
    ),
    keywords: [
      "certificate",
      "goethe",
      "exam",
      "exams",
      "mock exam",
      "exam format",
      "alliance francaise",
      "french exams",
      "preparation",
    ],
  },
  {
    category: "Exams & Certificates",
    question: "Do I need to write exams for each stage?",
    answer: (
      <>
        No. You do not have to write exams at every stage. We focus on building your skills through each level, and you
        only sit the official exam when you are ready for the target level (for example, B1 or B2). Earlier exams are
        optional.
      </>
    ),
    keywords: ["exams", "exam", "each stage", "every stage", "must write exam", "a1 exam", "a2 exam", "b1 exam", "b2 exam"],
  },
  {
    category: "Exams & Certificates",
    question: "How much are registration and exam fees?",
    answer: (
      <>
        There is no separate school registration fee. Tuition is paid per class level.
        <div className="mt-2">Official exam fees are separate from tuition and paid directly to the exam provider.</div>
        <div className="mt-2">
          For the latest exam fee by level (A1, A2, B1, B2, C1) and registration steps, please check the{" "}
          <a className="font-semibold hover:underline" href={CLASS_SCHEDULE_URL}>
            class schedule
          </a>
          .
        </div>
      </>
    ),
    keywords: [
      "registration fee",
      "exam fee",
      "exam fees",
      "registration and exam",
      "how much exam",
      "goethe exam",
      "goethe fees",
      "a1 exam fee",
      "a2 exam fee",
      "b1 exam fee",
      "b2 exam fee",
      "c1 exam fee",
    ],
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
        . Goethe exam prices are listed there by level. After you complete your class, you register directly with{" "}
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
        We focus on language classes and exam preparation. For visa, Ausbildung, or embassy interview guidance, please
        visit our{" "}
        <a className="font-semibold hover:underline" href="/travel">
          travel page
        </a>{" "}
        for the latest support options.
      </>
    ),
    keywords: ["visa", "ausbildung", "embassy", "interview", "support", "help"],
  },
  {
    category: "Support",
    question: "Do you have social media pages?",
    answer: (
      <>
        Yes! Follow us on{" "}
        <a className="font-semibold hover:underline" href={SOCIAL_LINKS.instagram}>
          Instagram
        </a>
        ,{" "}
        <a className="font-semibold hover:underline" href={SOCIAL_LINKS.youtube}>
          YouTube
        </a>
        , and{" "}
        <a className="font-semibold hover:underline" href={SOCIAL_LINKS.tiktok}>
          TikTok
        </a>
        .
      </>
    ),
    keywords: ["social", "social media", "instagram", "youtube", "tiktok", "ig", "tik tok", "yt", "socials"],
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
            • Contract term: <span className="font-semibold">6 months</span> from enrollment
          </div>
          <div>
            • Platform access: Your 10-week class ends first, but your contract keeps Falowen open during the full
            6-month term
          </div>
          <div>
            • Payment effect: <span className="font-semibold">Full payment</span> gives 6-month Falowen access,
            while <span className="font-semibold">installment payment</span> gives 1-month access at a time
          </div>
          <div>
            • After 6 months: Extend at <span className="font-semibold">1,000 GHS/month</span> or enroll in a new
            10-week class
          </div>
        </div>
      </>
    ),
    keywords: [
      "price",
      "pricing",
      "fees",
      "cost",
      "same",
      "online",
      "in-person",
      "recorded",
      "self-learning",
      "contract",
      "contract term",
      "what's the contract",
      "whats the contract",
      "6 months",
      "6 month",
      "installment",
      "full payment",
      "access period",
    ],
  },
  {
    category: "Enrollment",
    question: "Please, I would like to make enquiries about learning German B2.",
    answer: (
      <>
        <div className="space-y-3">
          <p>Thank you for your message.</p>
          <p>
            To enroll in the B2 course, you must first go through the full learning path: A1 → A2 → B1 → B2. Each level
            takes approximately 10 weeks and includes both lessons and assessments.
          </p>
          <div>
            <div className="font-semibold">Please note:</div>
            <ul className="mt-2 list-disc space-y-2 pl-5">
              <li>
                If your goal is to reach B2, you won’t need to write the A1 and A2 exams. Instead, we focus on building
                your skills continuously until B1, after which you can attempt the official exams.
              </li>
              <li>
                You will begin with A1, which costs <span className="font-semibold">2,800 Ghana cedis</span>.
              </li>
              <li>
                The estimated cost for the later stages (A2, B1, B2) is around{" "}
                <span className="font-semibold">3,000 cedis each</span>, but we do not collect fees for these stages
                right away.
              </li>
            </ul>
          </div>
          <p>
            If you’re ready to start with A1, kindly confirm, and I’ll send you the brochure and schedule for the next
            class.
          </p>
          <p>Feel free to ask any questions if anything is unclear. Thank you.</p>
        </div>
      </>
    ),
    keywords: [
      "b2",
      "learn german b2",
      "enquiry",
      "enquiries",
      "inquiry",
      "inquiries",
      "level",
      "levels",
      "pay",
      "per level",
      "path",
      "a1",
      "a2",
      "b1",
    ],
  },
  {
    category: "Enrollment",
    question: "Can I enroll directly in B1, and do I need to complete A1 and A2 first?",
    answer: (
      <>
        <div className="space-y-3">
          <p>Thank you for your message.</p>
          <p>
            To join the B1 course, you must first complete the earlier levels: A1 → A2 → B1. Each level takes
            approximately 10 weeks and includes both lessons and assessments.
          </p>
          <div>
            <div className="font-semibold">Please note:</div>
            <ul className="mt-2 list-disc space-y-2 pl-5">
              <li>
                If your goal is to reach B1, you will not be required to write the A1 and A2 exams. Instead, we will
                focus on helping you build your skills gradually until you are ready for the B1 exam.
              </li>
              <li>
                You will begin with A1, which costs <span className="font-semibold">2,800 Ghana cedis</span>.
              </li>
              <li>
                The estimated cost for the following stages (A2 and B1) is around{" "}
                <span className="font-semibold">3,000 cedis each</span>, but we do not collect fees for those stages
                immediately.
              </li>
            </ul>
          </div>
          <p>
            If you’re ready to begin with A1, kindly confirm, and I will send you the brochure and class schedule.
          </p>
          <p>If you have any questions, feel free to ask. Thank you.</p>
        </div>
      </>
    ),
    keywords: ["b1", "level", "levels", "pay", "per level", "path", "a1", "a2"],
  },
  {
    category: "Enrollment",
    question: "Can I enroll directly in A2, and do I need to complete A1 first?",
    answer: (
      <>
        <div className="space-y-3">
          <p>Thank you for your message.</p>
          <p>
            To join the A2 course, you need to start from A1 and continue to A2. Each level takes approximately 10
            weeks and includes both lessons and assessments.
          </p>
          <div>
            <div className="font-semibold">Please note:</div>
            <ul className="mt-2 list-disc space-y-2 pl-5">
              <li>
                You have the option to write the A1 exam if you prefer, or you can save your money and continue
                learning directly to A2 without taking the A1 exam.
              </li>
              <li>
                The course begins with A1, which costs <span className="font-semibold">2,800 Ghana cedis</span>.
              </li>
              <li>
                The estimated cost for A2 is around <span className="font-semibold">3,000 cedis</span>, but we do not
                collect fees for the next stage right away.
              </li>
            </ul>
          </div>
          <p>
            If you’re ready to begin with A1, kindly confirm, and I will send you the brochure and class schedule.
          </p>
          <p>Feel free to ask if anything is unclear. Thank you.</p>
        </div>
      </>
    ),
    keywords: ["a2", "level", "levels", "pay", "per level", "path", "a1"],
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
