import type { Metadata } from "next";

import ClassesPageClient from "./ClassesPageClient";

const classesTitle = "German & French Classes in Ghana";
const classesDescription =
  "German A1 class starts 4 Mar 2026 at Awoshie - Accra. Explore upcoming A1-C1 class dates, schedules, tuition, and enroll online via Falowen.";

export const metadata: Metadata = {
  title: classesTitle,
  description: classesDescription,
  openGraph: {
    title: `${classesTitle} | Learn Language Education Academy`,
    description: classesDescription,
    url: "/classes",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${classesTitle} | Learn Language Education Academy`,
    description: classesDescription,
  },
};

export default function ClassesPage() {
  return <ClassesPageClient />;
}
