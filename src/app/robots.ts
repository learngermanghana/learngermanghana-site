import type { MetadataRoute } from "next";

// Static export builds these metadata routes once instead of invoking a function.
export const dynamic = "force-static";
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
