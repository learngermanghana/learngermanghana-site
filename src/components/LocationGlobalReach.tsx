import { SITE } from "@/lib/site";

const MAP_DIRECTIONS_URL =
  "https://www.google.com/maps?hl=en&mat=CRW0DmOR7jIkElYBa0lj_6GMre8yjlvYlnOvLJhR5OtwjJ3smcOETneERUz8EZ7FxrMC1D7JhCE9p5o8AWnBgO0MZ7v_ef_6Z2QdI28STQpzu2dL4b709lKCtupbX-FxmQ&authuser=0&um=1&ie=UTF-8&fb=1&gl=gh&sa=X&geocode=KdFXf704mN8PMdogveq3Hy69&daddr=Kwamisa+Street+GA+5808547,+Awoshie";

export function LocationGlobalReach() {
  return (
    <section className="pb-12 sm:pb-16" aria-labelledby="location-global-reach-heading">
      <div className="overflow-hidden rounded-[32px] border border-black/10 bg-white shadow-sm">
        <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
          <div className="relative overflow-hidden bg-gradient-to-br from-brand-950 via-brand-900 to-emerald-950 p-6 text-white sm:p-8 lg:p-10">
            <div className="absolute -left-16 -top-16 h-48 w-48 rounded-full bg-amber-300/15 blur-3xl" />
            <div className="absolute -bottom-20 right-0 h-56 w-56 rounded-full bg-emerald-300/10 blur-3xl" />

            <div className="relative">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-200">
                Our location & global reach
              </div>
              <h2
                id="location-global-reach-heading"
                className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl"
              >
                Based in Awoshie, Accra. Teaching learners worldwide.
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-white/75 sm:text-base">
                Visit our classroom in Awoshie, Accra, Ghana, or join our live online German classes
                from anywhere in the world.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a
                  href={MAP_DIRECTIONS_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-2xl bg-amber-300 px-5 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-amber-200"
                >
                  Get directions
                </a>
                <a
                  href="https://www.falowen.app/classes"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
                >
                  Explore online classes
                </a>
              </div>
            </div>
          </div>

          <div className="grid gap-4 p-6 sm:grid-cols-2 sm:p-8 lg:p-10">
            <div className="rounded-3xl border border-black/10 bg-neutral-50 p-5">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-800">
                <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
                  <path
                    d="M12 21s6-5.3 6-11a6 6 0 1 0-12 0c0 5.7 6 11 6 11Zm0-8.5A2.5 2.5 0 1 0 12 7a2.5 2.5 0 0 0 0 5.5Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold">Physical classroom</h3>
              <p className="mt-2 text-sm leading-6 text-neutral-700">{SITE.address}</p>
              <p className="mt-3 text-sm text-neutral-500">Awoshie, Accra, Ghana</p>
            </div>

            <div className="rounded-3xl border border-black/10 bg-neutral-50 p-5">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-800">
                <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
                  <path
                    d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0c2.2-2.5 3.5-5.6 3.5-9S14.2 5.5 12 3m0 18c-2.2-2.5-3.5-5.6-3.5-9S9.8 5.5 12 3M3.5 9h17M3.5 15h17"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold">Online classes worldwide</h3>
              <p className="mt-2 text-sm leading-6 text-neutral-700">
                Join live lessons, receive teacher support and continue learning with Falowen wherever
                you are.
              </p>
              <p className="mt-3 text-sm text-neutral-500">Available across Ghana and internationally</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
