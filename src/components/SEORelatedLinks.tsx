import Link from "next/link";

const seoLinks = [
  {
    href: "/placement-test",
    title: "Placement Assessment",
    description: "Find your CEFR level and pick the right class format before you enroll.",
  },
  {
    href: "/resources",
    title: "Learning Tools",
    description: "Use study tools and checklists to improve exam readiness and daily practice.",
  },
  {
    href: "/blog",
    title: "Language Learning Blog",
    description: "Read practical guides and updates from the Falowen language learning blog.",
  },
];

export function SEORelatedLinks() {
  return (
    <aside className="mt-10 rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
      <h2 className="text-base font-semibold text-neutral-900">Explore related guides</h2>
      <p className="mt-2 text-sm text-neutral-700">Jump between our assessment, tools, and blog resources.</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {seoLinks.map((item) => (
          <Link key={item.href} href={item.href} className="rounded-2xl border border-black/10 bg-neutral-50 p-4 hover:bg-white">
            <div className="text-sm font-semibold text-neutral-900">{item.title}</div>
            <div className="mt-1 text-xs leading-5 text-neutral-600">{item.description}</div>
          </Link>
        ))}
      </div>
    </aside>
  );
}
