import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SITE } from "@/lib/site";

const baseUrl = new URL(`https://${SITE.primaryDomain}`);

export const metadata: Metadata = {
  metadataBase: baseUrl,
  title: {
    default: `${SITE.brand} | Learn German`,
    template: `%s | ${SITE.brand}`,
  },
  description:
    "German school in Ghana offering A1–C1. A1–B1 hybrid online/in-person with daily options or recorded lectures. B2–C1 self-paced with AI, no physical classes. Register via Falowen.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: baseUrl,
    siteName: SITE.brand,
    title: `${SITE.brand} | Learn German`,
    description:
      "German school in Ghana offering A1–C1. A1–B1 hybrid online/in-person with daily options or recorded lectures. B2–C1 self-paced with AI, no physical classes. Register via Falowen.",
  },
  twitter: {
    card: "summary",
    title: `${SITE.brand} | Learn German`,
    description:
      "German school in Ghana offering A1–C1. A1–B1 hybrid online/in-person with daily options or recorded lectures. B2–C1 self-paced with AI, no physical classes. Register via Falowen.",
  },
  robots: {
    index: true,
    follow: true,
  },
  keywords: [
    "Learn German",
    "German classes Ghana",
    "German language school",
    "Online German lessons",
    "In-person German classes",
    "Hybrid German classes",
    "Self-paced German",
    "AI German learning",
    "A1 German",
    "B1 German",
    "B2 German",
    "C1 German",
    "Falowen registration",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-neutral-50 text-neutral-900 antialiased">
        <Navbar />
        <main className="min-h-[70vh]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
