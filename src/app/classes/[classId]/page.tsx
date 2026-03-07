import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Container } from "@/components/Container";
import { JsonLd } from "@/components/JsonLd";
import { upcomingClasses, tuitionFeesGHS, goetheExamFeesGHS } from "@/data/content";
import { getClassById, getClassPath, isScheduledClass } from "@/lib/classes";
import { formatDatePretty } from "@/lib/date";
import { SITE } from "@/lib/site";

type Props = {
  params: { classId: string };
};

const baseUrl = `https://${SITE.primaryDomain}`;
const classImage = `${baseUrl}/hero/hero.jpg`;

export function generateStaticParams() {
  return upcomingClasses.map((classItem) => ({ classId: classItem.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { classId } = params;
  const classInfo = getClassById(classId);

  if (!classInfo) {
    return {
      title: "Class not found",
      description: "The requested class could not be found.",
    };
  }

  const description = `${classInfo.title}. ${classInfo.language} ${classInfo.level} starts ${formatDatePretty(classInfo.startDate)} at ${classInfo.location}.`;

  return {
    title: classInfo.title,
    description,
    alternates: {
      canonical: getClassPath(classInfo.id),
    },
    openGraph: {
      title: `${classInfo.title} | Learn Language Education Academy`,
      description,
      url: getClassPath(classInfo.id),
      type: "website",
      images: [
        {
          url: classImage,
          alt: classInfo.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${classInfo.title} | Learn Language Education Academy`,
      description,
      images: [classImage],
    },
  };
}

export default async function ClassDetailPage({ params }: Props) {
  const { classId } = params;
  const classInfo = getClassById(classId);

  if (!classInfo) {
    notFound();
  }

  const tuition = classInfo.tuitionFee ?? tuitionFeesGHS[classInfo.level];
  const examFee = classInfo.examFee ?? goetheExamFeesGHS[classInfo.level];

  const classSchema = {
    "@context": "https://schema.org",
    "@type": isScheduledClass(classInfo) ? "CourseInstance" : "Course",
    name: classInfo.title,
    startDate: isScheduledClass(classInfo) ? classInfo.startDate : undefined,
    courseMode: classInfo.format,
    location: {
      "@type": "Place",
      name: classInfo.location,
    },
    offers: {
      "@type": "Offer",
      url: `${baseUrl}${getClassPath(classInfo.id)}`,
      priceCurrency: "GHS",
      price: tuition ?? undefined,
      availability: "https://schema.org/InStock",
    },
    provider: {
      "@type": "Organization",
      name: SITE.brand,
      url: baseUrl,
    },
  };

  return (
    <Container>
      <section className="py-10 sm:py-14">
        <JsonLd data={classSchema} />
        <div className="rounded-3xl border border-black/10 bg-white p-6 sm:p-8 shadow-sm">
          <p className="text-xs font-semibold uppercase text-neutral-500">Class details</p>
          <h1 className="mt-2 text-2xl font-semibold text-neutral-900">{classInfo.title}</h1>
          <p className="mt-2 text-sm text-neutral-700">{classInfo.language} {classInfo.level} • {classInfo.format}</p>

          <div className="mt-6 grid gap-3 text-sm text-neutral-700">
            <p><span className="font-semibold">Start date:</span> {formatDatePretty(classInfo.startDate)}</p>
            <p><span className="font-semibold">Location:</span> {classInfo.location}</p>
            <p><span className="font-semibold">Duration:</span> {classInfo.duration}</p>
            <p><span className="font-semibold">Schedule:</span> {classInfo.scheduleSummary}</p>
            <p><span className="font-semibold">Tuition:</span> {tuition ? `GHS ${tuition.toLocaleString("en-GH")}` : "Check in Falowen"}</p>
            {classInfo.language === "German" ? (
              <p><span className="font-semibold">Goethe exam fee:</span> {examFee ? `GHS ${examFee.toLocaleString("en-GH")}` : "Check Goethe-Institut"}</p>
            ) : null}
          </div>

          <div className="mt-6 rounded-2xl border border-black/10 bg-neutral-50 p-4">
            <p className="text-sm font-semibold text-neutral-900">Meeting days</p>
            <ul className="mt-2 space-y-1 text-sm text-neutral-700">
              {classInfo.meetingDays.map((item) => (
                <li key={item.day}>{item.day}: {item.time}</li>
              ))}
            </ul>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href="https://www.falowen.app"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-2xl border border-black/10 bg-white px-5 py-3 text-sm font-semibold hover:bg-neutral-50"
            >
              Enroll inside Falowen
            </a>
            <Link
              href="/classes"
              className="inline-flex items-center justify-center rounded-2xl border border-black/10 bg-white px-5 py-3 text-sm font-semibold hover:bg-neutral-50"
            >
              Back to classes
            </Link>
          </div>
        </div>
      </section>
    </Container>
  );
}
