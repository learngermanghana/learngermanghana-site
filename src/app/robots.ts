import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = `https://${SITE.primaryDomain}`;

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/lead-capture", "/lead-capture/thanks"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/lead-capture", "/lead-capture/thanks"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
