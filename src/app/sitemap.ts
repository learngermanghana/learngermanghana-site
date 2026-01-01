import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

const baseUrl = `https://${SITE.primaryDomain}`;

const staticRoutes = [
  "",
  "about",
  "blog",
  "classes",
  "contact",
  "courses",
  "faq",
  "register",
  "reviews",
  "tutors",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return staticRoutes.map((route) => ({
    url: `${baseUrl}/${route}`.replace(/\/$/, ""),
    lastModified: now,
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.7,
  }));
}
