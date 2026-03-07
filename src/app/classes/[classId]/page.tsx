import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Container } from "@/components/Container";
import { JsonLd } from "@/components/JsonLd";
import { upcomingClasses, tuitionFeesGHS, goetheExamFeesGHS } from "@/data/content";
import { getClassById, getClassPath, isScheduledClass } from "@/lib/classes";
import { formatDatePretty } from "@/lib/date";
import { SITE } from "@/lib/site";

type Props = {
  params: Promise<{ classId: string }>;
};

const baseUrl = `https://${SITE.primaryDomain}`;
const classImage = "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80";

export function generateStaticParams() {
  return upcomingClasses.map((classItem) => ({ classId: classItem.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { classId } = await params;
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
  const { classId } = await params;
  const classInfo = getClassById(classId);

  if (!classInfo) {
    notFound();
  }

  const tuition = classInfo.tuitionFee ?? tuitionFeesGHS[classInfo.level];
  const examFee = classInfo.examFee ?? goetheExamFeesGHS[classInfo.level];
  const agreementDate = new Intl.DateTimeFormat("en-GB", { dateStyle: "long" }).format(new Date());
  const firstInstallment = tuition ? Math.ceil(tuition / 2) : undefined;
  const remainingBalance = tuition && firstInstallment ? tuition - firstInstallment : undefined;

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

          <div className="mt-6 overflow-hidden rounded-2xl border border-black/10">
            <Image
              src={classImage}
              alt="Students in a language-learning class"
              width={1600}
              height={900}
              className="h-52 w-full object-cover sm:h-64"
              priority
            />
          </div>

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
            <a
              href="https://register.falowen.app/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-2xl border border-black/10 bg-white px-5 py-3 text-sm font-semibold hover:bg-neutral-50"
            >
              Payment agreement / contract
            </a>
            <Link
              href="/classes"
              className="inline-flex items-center justify-center rounded-2xl border border-black/10 bg-white px-5 py-3 text-sm font-semibold hover:bg-neutral-50"
            >
              Back to classes
            </Link>
          </div>

          <div className="mt-8 rounded-2xl border border-black/10 bg-neutral-50 p-5">
            <h2 className="text-base font-semibold text-neutral-900">Payment Agreement</h2>
            <p className="mt-2 text-sm text-neutral-700">
              This Payment Agreement is entered into on <span className="font-semibold">{agreementDate}</span> for
              <span className="font-semibold"> {classInfo.title}</span> students of Learn Language Education Academy and
              Felix Asadu (&ldquo;Teacher&rdquo;).
            </p>

            <h3 className="mt-4 text-sm font-semibold text-neutral-900">Terms of Payment</h3>
            <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-neutral-700">
              <li>
                <span className="font-semibold">Payment Amount:</span> The student agrees to pay a total of
                <span className="font-semibold"> {tuition ? `GHS ${tuition.toLocaleString("en-GH")}` : "the listed class fee in Falowen"}</span>.
                The fee is the same regardless of learning mode (online, in person, self-learning, or recorded lectures).
              </li>
              <li>
                <span className="font-semibold">Payment Schedule:</span> Payment may be made in full or in two installments:
                first installment of <span className="font-semibold">{firstInstallment ? `GHS ${firstInstallment.toLocaleString("en-GH")}` : "as shown in Falowen"}</span>,
                and the remaining balance of <span className="font-semibold">{remainingBalance ? `GHS ${remainingBalance.toLocaleString("en-GH")}` : "as shown in Falowen"}</span>
                due one month after the first payment.
              </li>
              <li>
                <span className="font-semibold">Learning Mode &amp; Attendance Rights:</span> For each scheduled class session,
                the student may join in person, online, or via recorded lecture, and is responsible for choosing and
                attending in their preferred way each time.
              </li>
              <li>
                <span className="font-semibold">Class Duration &amp; Contract Term:</span> Each class runs for 10 weeks
                (~3 months). The Service provides a 6-month contract period from enrollment, during which the student
                has access to Falowen, even after the 10-week class ends.
              </li>
              <li>
                <span className="font-semibold">Post-Contract Access:</span> After 6 months, continued access requires either
                an extension at <span className="font-semibold">1,000 GHS per month</span> or enrollment in a new 10-week class
                at the then-current fee.
              </li>
              <li>
                <span className="font-semibold">Attendance:</span> Attendance is recorded for each session in My Results &amp; Resources.
              </li>
              <li>
                <span className="font-semibold">Certification:</span> Certificates are issued upon successful completion and
                assignment submission. This is a Certificate of Completion (not a Goethe-Institut certificate).
                Where official language certification is required, the student must sit the exam at Goethe-Institut
                (or another recognized provider).
              </li>
              <li>
                <span className="font-semibold">Late Payments:</span> Late payment may lead to revoked access to learning
                platforms. No refund will be made.
              </li>
              <li>
                <span className="font-semibold">Refunds:</span> Once payment is confirmed and access is granted, no refunds
                will be provided (except where required by law).
              </li>
            </ul>

            <h3 className="mt-4 text-sm font-semibold text-neutral-900">How to Pay</h3>
            <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-neutral-700">
              <li>Primary method: Pay inside your Falowen account after choosing a class under Upcoming Classes.</li>
              <li>Support: If you have payment issues, contact {SITE.email} or use WhatsApp support on this page.</li>
            </ul>

            <h3 className="mt-4 text-sm font-semibold text-neutral-900">Class Level &amp; Start Date</h3>
            <p className="mt-2 text-sm text-neutral-700">
              Fees and dates vary by level and cohort. Confirm your level and start date in Falowen under Upcoming
              Classes before paying.
            </p>

            <p className="mt-3 text-sm font-medium text-neutral-800">
              By making any payment, you acknowledge and agree to the terms of this Payment Agreement.
            </p>
          </div>
        </div>
      </section>
    </Container>
  );
}
