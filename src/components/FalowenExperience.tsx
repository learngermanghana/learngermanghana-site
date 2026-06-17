import { LINKS } from "@/lib/site";

const features = [
  {
    title: "Study Buddy",
    description:
      "Plan your learning week, see what comes next and stay consistent with a clear study routine.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
        <path
          d="M7 3v3M17 3v3M4 9h16M6 5h12a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Falowen Radio",
    description:
      "Improve listening through level-based audio episodes built around real topics and useful language.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
        <path
          d="m5 7 13-3M6 10h12a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2Zm2 4h4m4 0h.01M8 17h4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Grammar Videos",
    description:
      "Turn difficult grammar into clear, visual explanations you can replay whenever you need them.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
        <path
          d="M5 4h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9l-4 3v-3a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm5 5 5 3-5 3V9Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Learning Hub",
    description:
      "Keep course books, assignments, submissions, feedback and progress in one organised place.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
        <path
          d="M4 5.5A2.5 2.5 0 0 1 6.5 3H11v16H6.5A2.5 2.5 0 0 0 4 21.5v-16Zm16 0A2.5 2.5 0 0 0 17.5 3H13v16h4.5a2.5 2.5 0 0 1 2.5 2.5v-16Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export function FalowenExperience() {
  return (
    <section className="pb-12 sm:pb-16" aria-labelledby="falowen-experience-heading">
      <div className="relative overflow-hidden rounded-[36px] bg-neutral-950 px-5 py-8 text-white shadow-xl sm:px-8 sm:py-10 lg:px-12 lg:py-12">
        <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute -bottom-32 right-0 h-72 w-72 rounded-full bg-emerald-400/15 blur-3xl" />

        <div className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-indigo-300">
              Learn beyond the classroom
            </div>
            <h2
              id="falowen-experience-heading"
              className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl"
            >
              Your classes continue inside Falowen
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">
              Falowen is not just another lesson library. It helps you organise your week, listen
              more often, understand grammar and keep every part of your course connected.
            </p>

            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-3xl bg-white/[0.07] p-5 ring-1 ring-white/10"
                >
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-400/15 text-indigo-200 ring-1 ring-indigo-300/20">
                    {feature.icon}
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/65">{feature.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href={LINKS.falowen}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-indigo-50"
              >
                Explore Falowen
              </a>
              <a
                href="https://www.falowen.app/classes"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-2xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                View German classes
              </a>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -inset-5 rounded-[40px] bg-gradient-to-br from-indigo-500/30 to-emerald-400/20 blur-2xl" />
            <div className="relative rounded-[32px] border border-white/15 bg-white/[0.08] p-4 shadow-2xl backdrop-blur">
              <div className="rounded-[24px] bg-neutral-900 p-4 ring-1 ring-white/10">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs uppercase tracking-[0.16em] text-white/45">
                      Falowen learning hub
                    </div>
                    <div className="mt-1 text-lg font-semibold">Good morning, learner</div>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500 text-sm font-bold">
                    F
                  </div>
                </div>

                <div className="mt-5 rounded-2xl bg-indigo-500/15 p-4 ring-1 ring-indigo-300/15">
                  <div className="flex items-center justify-between text-xs text-indigo-100/70">
                    <span>Study Buddy</span>
                    <span>Today</span>
                  </div>
                  <div className="mt-2 font-semibold">Continue your German learning week</div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-2/3 rounded-full bg-indigo-400" />
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-white/[0.06] p-4 ring-1 ring-white/10">
                    <div className="text-xs text-white/45">Listen now</div>
                    <div className="mt-2 text-sm font-semibold">Falowen Radio</div>
                    <div className="mt-4 flex items-end gap-1" aria-hidden="true">
                      {[10, 18, 13, 22, 15, 20, 11].map((height, index) => (
                        <span
                          key={`${height}-${index}`}
                          className="w-1 rounded-full bg-emerald-300"
                          style={{ height }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl bg-white/[0.06] p-4 ring-1 ring-white/10">
                    <div className="text-xs text-white/45">Watch next</div>
                    <div className="mt-2 text-sm font-semibold">Grammar Video</div>
                    <div className="mt-4 flex h-9 w-9 items-center justify-center rounded-full bg-red-500">
                      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                        <path fill="currentColor" d="M9 7.5v9l7-4.5-7-4.5Z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="mt-4 rounded-2xl bg-white/[0.06] p-4 ring-1 ring-white/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-white/45">Next assignment</div>
                      <div className="mt-1 text-sm font-semibold">Write and submit your response</div>
                    </div>
                    <span className="rounded-full bg-amber-300/15 px-3 py-1 text-xs font-semibold text-amber-200">
                      Ready
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
