import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/SectionTitle";

export const metadata: Metadata = {
  title: "Services | Learn German in Ghana & Nigeria",
  description:
    "Explore the wellness and beauty services available, from skin therapy and facial treatments to massages and body care.",
};

const serviceGroups = [
  {
    title: "Skin Therapy",
    items: [
      "Skin booster injection",
      "Skin whitening infusion",
      "Skin lightening infusion",
      "Anti aging drip infusion",
      "Vitamin C IV infusion",
      "Odough whitening IV",
      "Weight gain infusion",
      "Teeth whitening",
    ],
  },
  {
    title: "Breast & Butt Enlargement",
    items: [
      "Per session",
      "Two (2) sessions",
      "Three (3) sessions",
      "Four (4) sessions",
      "Five (5) sessions",
    ],
  },
  {
    title: "Waxing",
    items: [
      "Eyebrow",
      "Chin",
      "Armpit",
      "Full arm",
      "Full leg",
      "Bikini",
      "Chest",
      "Nose",
      "Brazilian wax",
    ],
  },
  {
    title: "Facial Treatment",
    items: [
      "Mini facial",
      "Deep cleansing",
      "Gentleman facial",
      "Acne facial",
      "Micro needling",
      "Signature facial",
      "Anti-aging facial",
      "Derma planing",
      "Vajacial",
    ],
  },
  {
    title: "Massage",
    items: [
      "Bamboo",
      "Deep tissue",
      "Hot stone",
      "Back massage",
      "Swedish",
      "Couple massage",
      "Head & neck massage",
    ],
  },
  {
    title: "Body Scrub",
    items: [
      "Organic body scrub",
      "Coffee body scrub",
      "Whitening body scrub",
      "Fruit body scrub",
    ],
  },
  {
    title: "Weight Loss",
    items: [
      "Fat dissolving inj.",
      "General body weight loss inj.",
      "Slimming pen",
      "Cavitation + wood therapy",
      "Wood therapy",
    ],
  },
  {
    title: "Body Treatment",
    items: [
      "Skin tag removal",
      "Keloid removal",
      "Body polish",
      "Body wrap",
      "Sauna",
      "POD thread (Face lift)",
    ],
  },
  {
    title: "BBL Injections",
    items: ["60ml", "120ml", "180ml", "240ml", "300ml", "400ml", "500ml"],
  },
];

export default function ServicesPage() {
  return (
    <Container>
      <section className="py-12 sm:py-16">
        <SectionTitle
          title="Services"
          subtitle="Explore our wellness, beauty, and body care offerings."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {serviceGroups.map((group) => (
            <div
              key={group.title}
              className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm"
            >
              <h2 className="text-lg font-semibold text-neutral-900">{group.title}</h2>
              <ul className="mt-4 space-y-2 text-sm text-neutral-700">
                {group.items.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-2 h-2 w-2 rounded-full bg-brand-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </Container>
  );
}
