import Link from "next/link";
import { Container } from "@/components/Container";
import { LINKS, SITE, WHATSAPP_LINK } from "@/lib/site";

const external = { target: "_blank", rel: "noopener noreferrer" } as const;

export function Footer() {
  return (
    <footer className="border-t border-emerald-950/10 bg-[#0c302a] py-12 text-white sm:py-16">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-200">Learn Language Education Academy</p>
            <h2 className="mt-4 max-w-sm text-2xl font-semibold leading-snug">German learning, in class and beyond.</h2>
            <p className="mt-3 max-w-md text-sm leading-7 text-white/65">
              Learn with our team in Accra or online. Continue with Falowen German books, Goethe-style sample tests and free placement testing.
            </p>
            <a href={LINKS.visitorGuide} {...external} className="mt-6 inline-flex rounded-xl bg-emerald-200 px-5 py-3 text-sm font-semibold text-emerald-950 transition hover:bg-white">
              Explore the Falowen visitor guide ↗
            </a>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <h3 className="text-sm font-semibold text-emerald-200">Learn German</h3>
              <div className="mt-4 flex flex-col gap-3 text-sm text-white/75">
                <a href={LINKS.classes} {...external} className="hover:text-white">Live classes ↗</a>
                <a href={LINKS.placementTest} {...external} className="hover:text-white">Free placement test ↗</a>
                <Link href="/about" className="hover:text-white">About the academy</Link>
                <Link href="/tutors" className="hover:text-white">Meet our team</Link>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-emerald-200">Falowen tools</h3>
              <div className="mt-4 flex flex-col gap-3 text-sm text-white/75">
                <a href={LINKS.exams} {...external} className="hover:text-white">Goethe sample tests ↗</a>
                <a href={LINKS.books} {...external} className="hover:text-white">Buy German books ↗</a>
                <a href={LINKS.visitorGuide} {...external} className="hover:text-white">Visitor guide ↗</a>
                <a href={LINKS.falowen} {...external} className="hover:text-white">Falowen learning app ↗</a>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-emerald-200">Discover more</h3>
              <div className="mt-4 flex flex-col gap-3 text-sm text-white/75">
                <a href={LINKS.youtubeSubscribe} {...external} className="hover:text-white">Free video lessons ↗</a>
                <a href="https://blog.falowen.app/" {...external} className="hover:text-white">German learning blog ↗</a>
                <Link href="/reviews" className="hover:text-white">Student reviews</Link>
                <Link href="/contact" className="hover:text-white">Contact us</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/15 pt-6 text-xs leading-6 text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} {SITE.name} · {SITE.location}. Falowen is independent of Goethe-Institut.</span>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <a href={`tel:+${SITE.phoneIntl}`} className="hover:text-white">Call</a>
            <a href={`mailto:${SITE.email}`} className="hover:text-white">Email</a>
            <a href={WHATSAPP_LINK} {...external} className="hover:text-white">WhatsApp</a>
            <a href="https://sedifex.com" {...external} className="hover:text-white">Sedifex</a>
            <a href="https://apzla.com" {...external} className="hover:text-white">Apzla</a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
