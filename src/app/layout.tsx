import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import FaqBotWidget from "@/components/FaqBotWidget";
import { JsonLd } from "@/components/JsonLd";
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
    card: "summary_large_image",
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
  category: "education",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.brand,
    url: baseUrl.toString(),
    email: SITE.email,
    telephone: `+${SITE.phoneIntl}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address,
      addressLocality: "Accra",
      addressCountry: "GH",
    },
    sameAs: [
      "https://www.instagram.com/lleaghana/",
      "https://www.youtube.com/@LLEAGhana",
      "https://www.tiktok.com/@lleaghana",
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "German and French language classes",
    provider: {
      "@type": "Organization",
      name: SITE.brand,
      url: baseUrl.toString(),
    },
    areaServed: {
      "@type": "Country",
      name: "Ghana",
    },
    availableChannel: {
      "@type": "ServiceChannel",
      serviceLocation: {
        "@type": "Place",
        name: "Awoshie, Accra",
      },
      serviceUrl: baseUrl.toString(),
    },
  };

  return (
    <html lang="en">
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-11200479914" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'AW-11200479914');`,
          }}
        />
        <JsonLd data={organizationSchema} />
        <JsonLd data={serviceSchema} />
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
