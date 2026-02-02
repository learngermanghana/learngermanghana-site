export type ClassLevel = "A1" | "A2" | "B1" | "B2" | "C1";

export const courses: { level: ClassLevel; title: string; desc: string }[] = [
  { level: "A1", title: "A1 (Beginner)", desc: "Start from basics: greetings, daily life, simple conversations." },
  { level: "A2", title: "A2 (Elementary)", desc: "Build confidence: shopping, travel, work, short letters." },
  { level: "B1", title: "B1 (Intermediate)", desc: "Speak more freely: opinions, stories, exams preparation." },
  { level: "B2", title: "B2 (Upper-Intermediate)", desc: "Advanced conversation, writing, and exam readiness." },
  { level: "C1", title: "C1 (Advanced)", desc: "High-level fluency for academic, professional, and exam success." },
];

export const tuitionFeesGHS: Record<ClassLevel, number | null> = {
  A1: 2800,
  A2: 3000,
  B1: 3000,
  B2: 3000,
  C1: 3000,
};

export const feeNotes = [
  "Goethe exam fees are paid directly to Goethe-Institut.",
  "School tuition fee is separate from Goethe exam fees.",
];

export const goetheExamFeesGHS: Partial<Record<ClassLevel, number>> = {
  A1: 3000,
  A2: 2550,
  B1: 2900,
};

export const goetheExamLinks: Partial<Record<ClassLevel, { label: string; href: string }>> = {
  A1: {
    label: "Goethe A1 Exam (Start Deutsch 1)",
    href: "https://www.goethe.de/ins/gh/en/spr/prf/gzsd1.cfm?srsltid=AfmBOoqVG2AyqVfQvzf15jL663WXhee1NLZ5m3gUfQgbsMw9o_E4VZHH",
  },
  A2: {
    label: "Goethe A2 Exam (Start Deutsch 2)",
    href: "https://www.goethe.de/ins/gh/en/spr/prf/gzsd2.cfm?srsltid=AfmBOooS10gzCil6OW1NO9zPUI9q8PXn00WaK7OB9BucVYf35jPlR13_",
  },
  B1: {
    label: "Goethe B1 Exam",
    href: "https://www.goethe.de/ins/gh/en/spr/prf/gzb1.cfm?srsltid=AfmBOooXArPPndrn2-6OE0zKP_Dk78Z7yqiC3cgo4p8Sol8Ph95hW0cW",
  },
};

export type ClassItem = {
  id: string;
  title: string;
  language: "German" | "French";
  level: ClassLevel;
  location: string;
  startDate: string; // ISO date or "TBA"
  format: string;
  duration: string;
  scheduleSummary: string;
  meetingDays: { day: string; time: string }[];
  bonus: string[];
  tuitionFee?: number;
  examFee?: number;
  brochureUrl?: string;
  tutor?: string;
};

export const upcomingClasses: ClassItem[] = [
  {
    id: "A1-berlin-2026-02-17",
    title: "A1 Berlin Klasse – Hybrid Class 2026",
    language: "German",
    level: "A1",
    location: "Awoshie - Accra",
    startDate: "2026-02-17",
    format: "Hybrid: come to class or join online. Decide each day or watch the recordings.",
    duration: "10 weeks",
    scheduleSummary: "3x per week",
    meetingDays: [
      { day: "Monday", time: "11:00 am – 12:00 pm" },
      { day: "Tuesday", time: "11:00 am – 12:00 pm" },
      { day: "Wednesday", time: "2:00 pm – 3:00 pm" },
    ],
    bonus: ["Free exam preparation", "Access to the Falowen App"],
  },
  {
    id: "A1-dortmund-2026-02-25",
    title: "A1 Dortmund Klasse - Hybrid Class 2026",
    language: "German",
    level: "A1",
    location: "Awoshie - Accra",
    startDate: "2026-02-25",
    format: "Hybrid: come to class or join online. Decide each day or watch the recordings.",
    duration: "3 months",
    scheduleSummary: "3x per week",
    meetingDays: [
      { day: "Monday", time: "6:00 pm – 7:00 pm" },
      { day: "Tuesday", time: "6:00 pm – 7:00 pm" },
      { day: "Wednesday", time: "6:00 pm – 7:00 pm" },
    ],
    bonus: ["Free exam preparation", "Access to the Falowen App"],
  },
  {
    id: "A1-paris-2026-tba",
    title: "A1 Paris Class – Hybrid Class 2026",
    language: "French",
    level: "A1",
    location: "Paris",
    startDate: "TBA",
    format: "Hybrid: come to class or join online. Decide each day or watch the recordings.",
    duration: "14 weeks (28 chapters, 2 per week)",
    scheduleSummary: "2x per week",
    meetingDays: [
      { day: "Saturday", time: "6:00 pm – 7:00 pm" },
      { day: "Sunday", time: "6:00 pm – 7:00 pm" },
    ],
    bonus: ["Free exam preparation", "Access to the Falowen App"],
  },
  {
    id: "A2-stuttgart-2026-02-20",
    title: "A2 Stuttgart Klasse (Class name) – Hybrid Class 2026",
    language: "German",
    level: "A2",
    location: "Awoshie - Accra",
    startDate: "2026-02-20",
    format: "Hybrid: come to class or join online. Decide each day or watch the recordings.",
    duration: "3 months",
    scheduleSummary: "3x per week",
    meetingDays: [
      { day: "Monday", time: "7:30 pm – 9:00 pm" },
      { day: "Tuesday", time: "7:30 pm – 9:00 pm" },
      { day: "Wednesday", time: "7:30 pm – 9:00 pm" },
    ],
    bonus: ["Free exam preparation", "Access to the Falowen App"],
  },
  {
    id: "B1-stuttgart-2026-03-12",
    title: "B1 Stuttgart Klasse (Class name) – Hybrid Class 2026",
    language: "German",
    level: "B1",
    location: "Awoshie - Accra",
    startDate: "2026-03-12",
    format: "Hybrid: come to class or join online. Decide each day or watch the recordings.",
    duration: "3 months",
    scheduleSummary: "2x per week",
    meetingDays: [
      { day: "Thursday", time: "7:30 pm – 9:00 pm" },
      { day: "Friday", time: "7:30 pm – 9:00 pm" },
    ],
    bonus: ["Free exam preparation", "Access to the Falowen App"],
  },
  {
    id: "B2-self-learning-2026",
    title: "B2 Self-Learning (Falowen App) – AI + Email Tutor Support",
    language: "German",
    level: "B2",
    location: "Online",
    startDate: "Always open",
    format:
      "Self-learning with AI assistant + tutor support by email when needed. Students should be ready to use AI tools and the Falowen schedule. No in-person classes.",
    duration: "6 months contract access",
    scheduleSummary: "Self-paced",
    meetingDays: [{ day: "Self-learning", time: "Follow the Falowen schedule with AI tools" }],
    bonus: ["AI assistant in Falowen", "Email tutor support when needed", "Structured self-study plan"],
  },
  {
    id: "C1-self-learning-2026",
    title: "C1 Self-Learning (Falowen App) – AI + Email Tutor Support",
    language: "German",
    level: "C1",
    location: "Online",
    startDate: "Always open",
    format:
      "Self-learning with AI assistant + tutor support by email when needed. Students should be ready to use AI tools and the Falowen schedule. No in-person classes.",
    duration: "6 months contract access",
    scheduleSummary: "Self-paced",
    meetingDays: [{ day: "Self-learning", time: "Follow the Falowen schedule with AI tools" }],
    bonus: ["AI assistant in Falowen", "Email tutor support when needed", "Structured self-study plan"],
  },
];

export type Tutor = {
  name: string;
  role: string;
  specialties: string[];
  bio: string;
  photo?: string;
};

export const tutors: Tutor[] = [
  {
    name: "Felix Asadu",
    role: "German Tutor • Founder (Falowen & Learn Language Education Academy)",
    specialties: ["A1–B2", "Speaking & Writing", "Exam Preparation", "Practical learning methods"],
    photo: "https://raw.githubusercontent.com/learngermanghana/learngermanghana-site/master/photos/unnamed.jpg",
    bio:
      "I’m a multilingual tutor, software developer, and founder of Falowen App and Learn Language Education Academy—created to help students learn German independently and effectively. I’m a certified language trainer with a B.A. in International Management (IU, Germany), a TEFL certification, and a Goethe Institute diploma. I teach German using practical, engaging methods, and I’ve authored a German workbook and developed custom software tools used by my students. I’m passionate about business, technology, and languages, and I enjoy building solutions that empower learners and support cross-cultural growth.",
  },
  {
    name: "Sabine Michel",
    role: "German Tutor",
    specialties: ["A1–B1", "Conversation practice", "Pronunciation", "Student-friendly coaching"],
    photo: "https://raw.githubusercontent.com/learngermanghana/learngermanghana-site/master/photos/sab.jpg",
    bio:
      "I’m a multilingual German tutor focused on practical, engaging lessons that build confidence step-by-step. My goal is to help students speak naturally, improve pronunciation, and stay consistent with supportive guidance throughout the learning journey.",
  },
];

export type Review = {
  name: string;
  level: string;
  text: string;
  source?: string;
};

export const reviews: Review[] = [
  { name: "Student A", level: "A1", text: "The classes are clear and the practice helped me speak with confidence.", source: "WhatsApp" },
  { name: "Student B", level: "A2", text: "I love the exercises on Falowen and the tutor feedback is very helpful.", source: "Instagram" },
  { name: "Student C", level: "B1", text: "Great environment and consistent learning. I improved my writing a lot.", source: "WhatsApp" },
];
