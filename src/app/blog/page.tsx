import type { Metadata } from "next";
import Image from "next/image";
import { getBlogPosts } from "@/lib/blog";
import { LINKS, SITE } from "@/lib/site";
import { buildPageMetadata } from "@/lib/seo";
import { SEORelatedLinks } from "@/components/SEORelatedLinks";

export const metadata: Metadata = buildPageMetadata({
  title: "German Learning Blog & Guides",
  description:
    "Read the latest language learning tips, student stories, and exam guidance from our partner blog.",
  path: "/blog",
});

export default async function BlogPage() {
  const posts = await getBlogPosts(12);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: posts.slice(0, 5).map((post, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Article",
        headline: post.title,
        url: post.link,
        description: post.excerpt,
      },
    })),
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Blog</h1>
          <p className="mt-2 text-neutral-700">Latest posts from blog.falowen.app</p>
        </div>
        <a
          href={LINKS.blog}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center rounded-2xl bg-neutral-900 px-5 py-3 text-sm font-semibold text-white hover:bg-neutral-800"
        >
          Open full blog →
        </a>
      </div>

      {posts.length === 0 ? (
        <div className="mt-8 rounded-3xl border border-black/10 bg-white p-6 text-sm text-neutral-700">
          Blog posts could not load right now.
        </div>
      ) : (
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <a
              key={p.link}
              href={p.link}
              target="_blank"
              rel="noreferrer"
              className="group overflow-hidden rounded-3xl border border-black/10 bg-white shadow-sm hover:shadow-md transition"
            >
              <div className="relative h-44 w-full bg-neutral-100">
                {p.image ? (
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    className="object-cover group-hover:scale-[1.02] transition"
                  />
                ) : (
                  <div className="h-full w-full bg-gradient-to-br from-neutral-200 to-neutral-100" />
                )}
              </div>

              <div className="p-6">
                <div className="text-lg font-semibold leading-snug">{p.title}</div>
                {p.date ? <div className="mt-2 text-xs text-neutral-500">{p.date}</div> : null}
                {p.excerpt ? (
                  <div className="mt-2 text-sm text-neutral-700 leading-6">{p.excerpt}…</div>
                ) : null}
                <div className="mt-4 text-sm font-semibold text-neutral-900">Read →</div>
              </div>
            </a>
          ))}
        </div>
      )}

      <SEORelatedLinks />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: `${SITE.brand} Blog Roundup`,
            url: `https://${SITE.primaryDomain}/blog`,
          }),
        }}
      />
    </div>
  );
}
