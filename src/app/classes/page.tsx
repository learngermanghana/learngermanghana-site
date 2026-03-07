import type { Metadata } from "next";

import { JsonLd } from "@/components/JsonLd";
import { upcomingClasses, tuitionFeesGHS, goetheExamFeesGHS } from "@/data/content";
import { getClassPath, getNextIntake, getUpcomingClassesSorted, isScheduledClass } from "@/lib/classes";
import { formatDatePretty } from "@/lib/date";
import { SITE } from "@/lib/site";

import ClassesPageClient from "./ClassesPageClient";

const classesTitle = "German & French Classes in Ghana";
const baseUrl = `https://${SITE.primaryDomain}`;
const classesImage = `${baseUrl}/hero/hero.jpg`;

function buildClassesDescription() {
  const nextIntake = getNextIntake();

  if (!nextIntake) {
    return "Explore upcoming A1-C1 class dates, schedules, tuition, and enroll online via Falowen.";
  }

  return `${nextIntake.language} ${nextIntake.level} class starts ${formatDatePretty(nextIntake.startDate)} at ${nextIntake.location}. Explore upcoming A1-C1 class dates, schedules, tuition, and enroll online via Falowen.`;
}

const classesDescription = buildClassesDescription();

export const metadata: Metadata = {
  title: classesTitle,
  description: classesDescription,
  alternates: {
    canonical: "/classes",
  },
  openGraph: {
    title: `${classesTitle} | Learn Language Education Academy`,
    description: classesDescription,
    url: "/classes",
    type: "website",
    images: [
      {
        url: classesImage,
        alt: "Learn Language Education Academy classes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${classesTitle} | Learn Language Education Academy`,
    description: classesDescription,
    images: [classesImage],
  },
};

export default function ClassesPage() {
  const classesSchema = {
    "@context": "https://schema.org",
    "@graph": getUpcomingClassesSorted().map((item) => {
      const tuition = item.tuitionFee ?? tuitionFeesGHS[item.level];
      const examFee = item.examFee ?? goetheExamFeesGHS[item.level];
      const classUrl = `${baseUrl}${getClassPath(item.id)}`;
      const schedule = item.meetingDays.map((entry) => `${entry.day}: ${entry.time}`).join("; ");

      return {
        "@type": isScheduledClass(item) ? "CourseInstance" : "Course",
        "@id": `${classUrl}#course`,
        name: item.title,
        description: `${item.language} ${item.level} class in ${item.location}. Format: ${item.format}. Duration: ${item.duration}. Schedule: ${schedule}`,
        courseMode: item.format,
        startDate: isScheduledClass(item) ? item.startDate : undefined,
        location: {
          "@type": "Place",
          name: item.location,
          address: {
            "@type": "PostalAddress",
            addressLocality: "Accra",
            addressCountry: "GH",
          },
        },
        instructor: item.tutor
          ? {
              "@type": "Person",
              name: item.tutor,
            }
          : undefined,
        offers: {
          "@type": "Offer",
          url: classUrl,
          priceCurrency: "GHS",
          price: tuition ?? undefined,
          availability: "https://schema.org/InStock",
          category: `${item.language} ${item.level}`,
        },
        provider: {
          "@type": "Organization",
          name: SITE.brand,
          url: baseUrl,
        },
        additionalProperty: item.language === "German" && examFee
          ? [
              {
                "@type": "PropertyValue",
                name: "Goethe exam fee",
                value: `GHS ${examFee}`,
              },
            ]
          : undefined,
      };
    }),
  };

  return (
    <>
      <JsonLd data={classesSchema} />
      <ClassesPageClient />
    </>
  );
}
