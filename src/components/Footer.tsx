import { Container } from "@/components/Container";
import { LINKS, SITE, WHATSAPP_LINK } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-black/10 py-10">
      <Container>
        <div className="grid gap-6">
          {/* Soft cross-promo */}
          <div className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm">
            <div className="text-xs text-neutral-500">Built by the team behind</div>

            <div className="mt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="text-sm text-neutral-700">
                <span className="font-semibold">{SITE.name}</span> • trusted learning tools + community software
              </div>

              <div className="flex flex-wrap gap-2">
                <a
                  href={LINKS.falowen}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-black/10 bg-neutral-50 px-3 py-1 text-xs font-semibold hover:bg-neutral-100"
                >
                  Falowen (German Learning)
                </a>
                <a
                  href="https://sedifex.com"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-black/10 bg-neutral-50 px-3 py-1 text-xs font-semibold hover:bg-neutral-100"
                >
                  Sedifex (Inventory & POS)
                </a>
                <a
                  href="https://apzla.com"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-black/10 bg-neutral-50 px-3 py-1 text-xs font-semibold hover:bg-neutral-100"
                >
                  Apzla (Church Management)
                </a>
              </div>
            </div>
          </div>

          {/* Normal footer */}
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between text-sm text-neutral-600">
            <div>
              © {new Date().getFullYear()} {SITE.name} • {SITE.location}
            </div>

            <div className="flex flex-wrap gap-4">
              <a className="hover:underline" href={`tel:+${SITE.phoneIntl}`}>Call</a>
              <a className="hover:underline" href={`mailto:${SITE.email}`}>Email</a>
              <a className="hover:underline" href={WHATSAPP_LINK} target="_blank" rel="noreferrer">WhatsApp</a>
              <a className="hover:underline" href={LINKS.blog} target="_blank" rel="noreferrer">Blog</a>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
