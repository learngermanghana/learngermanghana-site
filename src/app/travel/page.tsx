import type { Metadata } from "next";

import { TravelPageClient } from "./TravelPageClient";

export const metadata: Metadata = {
  title: "Visa Assessment & Travel Guidance | Learn German Ghana",
  description:
    "Get Germany-focused education and travel guidance. Complete the visa assessment form and connect with Hana, a global mobility specialist and education advisor based in Germany.",
  keywords: [
    "visa assessment",
    "travel guidance Germany",
    "education advisor Germany",
    "global mobility specialist",
    "Ausbildung guidance",
    "study in Germany support",
  ],
  alternates: {
    canonical: "/travel",
  },
  openGraph: {
    title: "Visa Assessment & Travel Guidance",
    description:
      "Planning Ausbildung, university admission, or travel to Germany? Fill the visa assessment form and get practical next-step guidance.",
    url: "/travel",
    type: "website",
  },
};

export default function TravelPage() {
  return <TravelPageClient />;
}
