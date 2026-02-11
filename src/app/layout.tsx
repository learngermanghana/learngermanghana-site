import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import FaqBotWidget from "@/components/FaqBotWidget";
import { SITE } from "@/lib/site";

const baseUrl = new URL(`https://${SITE.primaryDomain}`);

export const metadata: Metadata = {
  metadataBase: baseUrl,
  title: {
    default: `${SITE.brand} | Learn German & French`,
    template: `%s | ${SITE.brand}`,
  },
  description:
    "German and French language school in Ghana offering A1–C1 classes. Learn German in Ghana with hybrid online/in-person options (A1–B1), self-paced B2–C1 support, placement testing, and enrollment via Falowen.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: baseUrl,
    siteName: SITE.brand,
    locale: "en_GH",
    title: `${SITE.brand} | Learn German & French`,
    description:
      "German and French language school in Ghana offering A1–C1 classes. Learn German in Ghana with hybrid online/in-person options (A1–B1), self-paced B2–C1 support, placement testing, and enrollment via Falowen.",
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
      "German and French language school in Ghana offering A1–C1 classes. Learn German in Ghana with hybrid online/in-person options (A1–B1), self-paced B2–C1 support, placement testing, and enrollment via Falowen.",
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
    "Learn German language",
    "Learn German language in Ghana",
    "German classes in Ghana",
    "German language school in Ghana",
    "German school in Accra",
    "How to learn German language",
    "How to learn German language online",
    "Study German language",
    "Where to study German",
    "How to get B1 level in German",
    "Goethe exam preparation Ghana",
    "Goethe institute alternative Ghana",
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
  category: "education",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "LanguageSchool",
    name: SITE.brand,
    url: baseUrl.toString(),
    email: `mailto:${SITE.email}`,
    telephone: `+${SITE.phoneIntl}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address,
      addressLocality: "Accra",
      addressCountry: "GH",
    },
    areaServed: ["Ghana", "Accra"],
    availableLanguage: ["English", "German", "French"],
    sameAs: [
      "https://www.instagram.com/lleaghana/",
      "https://www.youtube.com/@LLEAGhana",
      "https://www.tiktok.com/@lleaghana",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.brand,
    url: baseUrl.toString(),
    inLanguage: "en",
    description:
      "German and French language school in Ghana with online and in-person options for A1 to C1 learners.",
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="min-h-screen bg-neutral-50 text-neutral-900 antialiased">
        <Navbar />
        <main className="min-h-[70vh]">{children}</main>
        <Footer />
        <FaqBotWidget />
      </body>
    </html>
  );
}
