import { YouTubeLessonThumbnail } from "@/components/YouTubeLessonThumbnail";
import { LINKS } from "@/lib/site";
import { getLatestYouTubeLessons } from "@/lib/youtube";

const fallbackLessons = [
  {
    label: "Falowen Radio",
    title: "German listening practice for everyday situations",
    description:
      "Train your ear with learner-friendly radio episodes built around useful German topics.",
  },
  {
    label: "Grammar Videos",
    title: "Clear explanations for difficult grammar",
    description:
      "Understand how German works through focused video explanations and practical examples.",
  },
  {
    label: "Study Planning",
    title: "Build a German learning routine that lasts",
    description:
      "Learn how to organise your week and stay consistent between lessons.",
  },
];

function getLevel(title: string) {
  const match = title.match(/\b(A1|A2|B1|B2|C1)\b/i);
  return match ? match[1].toUpperCase() : "Free lesson";
}

function formatPublishedDate(value: string | null) {
  if (!value) return null;

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export async function LatestFreeLessons() {
  const lessons = await getLatestYouTubeLessons(6);
  const hasLiveLessons = lessons.length > 0;

  return (
    <section className="py-12 sm:py-16" aria-labelledby="free-lessons-heading">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-red-600">
            Learn for free
          </div>
          <h2
            id="free-lessons-heading"
            className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            {hasLiveLessons ? "Latest free German lessons" : "Free German lessons on YouTube"}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-neutral-700 sm:text-base">
            Watch practical lessons, Falowen Radio episodes and clear grammar videos before or
            between your classes.
          </p>
        </div>

        <a
          href={LINKS.youtubeSubscribe}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center rounded-2xl bg-red-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700"
        >
          Subscribe for free lessons
        </a>
      </div>

      {hasLiveLessons ? (
        <div className="mt-7 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {lessons.map((lesson) => {
            const publishedDate = formatPublishedDate(lesson.publishedAt);

            return (
              <a
                key={lesson.id}
                href={lesson.url}
                target="_blank"
                rel="noreferrer"
                className="group overflow-hidden rounded-3xl border border-black/10 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative aspect-video overflow-hidden bg-neutral-900">
                  <YouTubeLessonThumbnail
                    videoId={lesson.id}
                    title={lesson.title}
                    thumbnail={lesson.thumbnail}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-3 inline-flex h-11 w-11 items-center justify-center rounded-full bg-red-600 text-white shadow-lg">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                      <path fill="currentColor" d="M9 7.5v9l7-4.5-7-4.5Z" />
                    </svg>
                  </span>
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-wide text-neutral-500">
                    <span>{getLevel(lesson.title)}</span>
                    {publishedDate ? (
                      <time dateTime={lesson.publishedAt ?? undefined}>{publishedDate}</time>
                    ) : null}
                  </div>
                  <h3 className="mt-3 line-clamp-2 text-lg font-semibold leading-6 text-neutral-950">
                    {lesson.title}
                  </h3>
                  <div className="mt-4 text-sm font-semibold text-red-600">Watch lesson →</div>
                </div>
              </a>
            );
          })}
        </div>
      ) : (
        <div className="mt-7 grid gap-5 md:grid-cols-3">
          {fallbackLessons.map((lesson, index) => (
            <a
              key={lesson.title}
              href={LINKS.youtubeSubscribe}
              target="_blank"
              rel="noreferrer"
              className="group relative overflow-hidden rounded-3xl border border-black/10 bg-neutral-950 p-6 text-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-red-500/20 blur-2xl" />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold ring-1 ring-white/15">
                    {lesson.label}
                  </span>
                  <span className="text-sm font-semibold text-white/50">0{index + 1}</span>
                </div>
                <h3 className="mt-8 text-xl font-semibold leading-7">{lesson.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/70">{lesson.description}</p>
                <div className="mt-6 text-sm font-semibold text-red-300">Explore on YouTube →</div>
              </div>
            </a>
          ))}
        </div>
      )}
    </section>
  );
}
