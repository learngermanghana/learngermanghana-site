import type { Metadata } from "next";
import { SITE } from "@/lib/site";

type PageMetadataInput = {
  title: string;
  description: string;
  path: `/${string}` | "/";
};

export function buildPageMetadata({ title, description, path }: PageMetadataInput): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url: path,
      images: [{ url: "/hero/hero.jpg", alt: `${SITE.brand} students in class` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/hero/hero.jpg"],
    },
  };
}
