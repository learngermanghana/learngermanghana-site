import { XMLParser } from "fast-xml-parser";
import { BLOG_RSS_URL } from "@/lib/site";

export type BlogPost = {
  title: string;
  link: string;
  date?: string;
  excerpt?: string;
  image?: string | null;
};

function stripHtml(html: string) {
  return (html || "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function firstImageFromHtml(html?: string) {
  if (!html) return null;
  const m = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return m?.[1] ?? null;
}

function pickLink(entry: any): string {
  const link = entry?.link;
  if (!link) return "";
  if (typeof link === "string") return link;

  // Atom: link can be array of { @href, @rel }
  if (Array.isArray(link)) {
    const alt = link.find((l) => l?.["@_rel"] === "alternate" && l?.["@_href"]);
    if (alt?.["@_href"]) return alt["@_href"];
    const first = link.find((l) => l?.["@_href"]);
    if (first?.["@_href"]) return first["@_href"];
  }

  if (link?.["@_href"]) return link["@_href"];
  return "";
}

async function fetchImageFromPost(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const html = await res.text();

    // Prefer og:image / twitter:image
    const og = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i)?.[1];
    if (og) return og;

    const tw = html.match(/<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i)?.[1];
    if (tw) return tw;

    return firstImageFromHtml(html);
  } catch {
    return null;
  }
}

export async function getBlogPosts(limit = 12): Promise<BlogPost[]> {
  try {
    const res = await fetch(BLOG_RSS_URL, { next: { revalidate: 900 } });
    if (!res.ok) return [];
    const xml = await res.text();

    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "@_",
      textNodeName: "#text",
    });

    const data = parser.parse(xml);

    // Atom (Jekyll): feed.entry
    let entries: any[] = [];
    if (data?.feed?.entry) {
      entries = Array.isArray(data.feed.entry) ? data.feed.entry : [data.feed.entry];
    }
    // RSS fallback: rss.channel.item
    else if (data?.rss?.channel?.item) {
      entries = Array.isArray(data.rss.channel.item) ? data.rss.channel.item : [data.rss.channel.item];
    }

    const rawPosts: BlogPost[] = entries.map((e) => {
      const title = e?.title?.["#text"] ?? e?.title ?? "Blog post";
      const link = pickLink(e) || e?.guid || "";
      const date = e?.updated ?? e?.published ?? e?.pubDate ?? "";
      const html =
        e?.content?.["#text"] ??
        e?.summary?.["#text"] ??
        e?.summary ??
        e?.description ??
        e?.["content:encoded"] ??
        "";

      const excerpt = stripHtml(html).slice(0, 170);
      const image = firstImageFromHtml(html);

      return { title: stripHtml(title), link, date: stripHtml(date), excerpt, image };
    });

    // Filter out junk / feed links
    const posts = rawPosts
      .filter((p) => p.link.startsWith("http"))
      .filter((p) => !p.link.endsWith(".xml"))
      .slice(0, limit);

    // Enrich missing images by fetching post page (kept small limit)
    for (let i = 0; i < posts.length; i++) {
      if (!posts[i].image) {
        posts[i].image = await fetchImageFromPost(posts[i].link);
      }
    }

    return posts;
  } catch {
    return [];
  }
}
