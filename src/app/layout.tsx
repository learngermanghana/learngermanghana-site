import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SITE } from "@/lib/site";
import { ChatWidget } from "@/components/ChatWidget";

const baseUrl = new URL(`https://${SITE.primaryDomain}`);

export const metadata: Metadata = {
  metadataBase: baseUrl,
  title: {
    default: `${SITE.brand} | Learn German & French`,
    template: `%s | ${SITE.brand}`,
  },
  description:
    "Language school in Ghana offering German and French A1–C1. A1–B1 hybrid online/in-person with daily options or recorded lectures. B2–C1 self-paced with AI, no physical classes. Register via Falowen.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: baseUrl,
    siteName: SITE.brand,
    title: `${SITE.brand} | Learn German & French`,
    description:
      "Language school in Ghana offering German and French A1–C1. A1–B1 hybrid online/in-person with daily options or recorded lectures. B2–C1 self-paced with AI, no physical classes. Register via Falowen.",
    images: [
      {
        url: new URL("/hero/hero.jpg", baseUrl),
        alt: "Learn Language Education Academy students studying German and French",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: `${SITE.brand} | Learn German & French`,
    description:
      "Language school in Ghana offering German and French A1–C1. A1–B1 hybrid online/in-person with daily options or recorded lectures. B2–C1 self-paced with AI, no physical classes. Register via Falowen.",
    images: [new URL("/hero/hero.jpg", baseUrl)],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  keywords: [
    "Learn German",
    "Learn French",
    "German classes Ghana",
    "French classes Ghana",
    "German language school",
    "French language school",
    "Online German lessons",
    "Online French lessons",
    "In-person German classes",
    "In-person French classes",
    "Hybrid German classes",
    "Hybrid French classes",
    "Self-paced German",
    "Self-paced French",
    "AI German learning",
    "AI French learning",
    "A1 German",
    "B1 German",
    "B2 German",
    "C1 German",
    "A1 French",
    "B1 French",
    "B2 French",
    "C1 French",
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
        <ChatWidget />
      </body>
    </html>
  );
}
