import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

const baseUrl = `https://${SITE.primaryDomain}`;

const staticRoutes = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "about", changeFrequency: "monthly", priority: 0.7 },
  { path: "classes", changeFrequency: "weekly", priority: 0.85 },
  { path: "schedule", changeFrequency: "weekly", priority: 0.8 },
  { path: "courses", changeFrequency: "weekly", priority: 0.8 },
  { path: "pricing", changeFrequency: "monthly", priority: 0.75 },
  { path: "placement-test", changeFrequency: "monthly", priority: 0.7 },
  { path: "resources", changeFrequency: "monthly", priority: 0.65 },
  { path: "success-stories", changeFrequency: "monthly", priority: 0.65 },
  { path: "falowen", changeFrequency: "monthly", priority: 0.7 },
  { path: "reviews", changeFrequency: "monthly", priority: 0.65 },
  { path: "tutors", changeFrequency: "monthly", priority: 0.65 },
  { path: "travel", changeFrequency: "monthly", priority: 0.6 },
  { path: "travel-checklist", changeFrequency: "monthly", priority: 0.6 },
  { path: "faq", changeFrequency: "monthly", priority: 0.6 },
  { path: "contact", changeFrequency: "monthly", priority: 0.6 },
  { path: "blog", changeFrequency: "weekly", priority: 0.6 },
] satisfies Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}>;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return staticRoutes.map((route) => ({
    url: `${baseUrl}/${route.path}`.replace(/\/$/, ""),
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
