import { SITE } from "@/lib/site";

type LocationMapProps = {
  className?: string;
  title?: string;
  caption?: string;
};

export function LocationMap({
  className = "",
  title = "Find us in Awoshie, Accra",
  caption = `Use the map to view directions to ${SITE.location}.`,
}: LocationMapProps) {
  return (
    <section className={`rounded-3xl border border-black/10 bg-white p-6 shadow-sm ${className}`.trim()}>
      <h2 className="text-lg font-semibold text-neutral-900">{title}</h2>
      <p className="mt-2 text-sm text-neutral-700">{caption}</p>
      <div className="mt-4 h-72 overflow-hidden rounded-2xl border border-black/10">
        <iframe
          src="https://storage.googleapis.com/maps-solutions-n3szdbt68i/locator-plus/u4rm/locator-plus.html"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          title="Learn German Ghana location map"
        />
      </div>
    </section>
  );
}
