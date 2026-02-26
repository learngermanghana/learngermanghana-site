"use client";

import { useMemo, useState } from "react";
import type { Review } from "@/data/content";

function shuffle<T>(arr: T[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function formatReviewType(level: string) {
  const clean = level.trim();
  if (!clean) return "Student review";

  if (/^\d+(\.\d+)?$/.test(clean)) {
    return `${clean}-star review`;
  }

  if (/\d/.test(clean) && /star/i.test(clean)) {
    return clean;
  }

  return `${clean} student review`;
}

export function RandomReviews({ reviews, count = 6 }: { reviews: Review[]; count?: number }) {
  const [page, setPage] = useState(0);
  const shuffledReviews = useMemo(() => shuffle(reviews), [reviews]);
  const total = shuffledReviews.length;
  const totalPages = Math.max(1, Math.ceil(total / count));
  const start = page * count;
  const end = start + count;
  const picked = shuffledReviews.slice(start, end);

  function goNext() {
    setPage((current) => (current + 1) % totalPages);
  }

  function goPrevious() {
    setPage((current) => (current - 1 + totalPages) % totalPages);
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="text-sm text-neutral-600">100+ reviews from satisfied students</div>
        {total > count ? (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={goPrevious}
              className="rounded-xl border border-black/10 bg-white px-3 py-1.5 text-sm font-semibold text-neutral-700 hover:bg-neutral-50"
            >
              ← Previous
            </button>
            <button
              type="button"
              onClick={goNext}
              className="rounded-xl border border-black/10 bg-white px-3 py-1.5 text-sm font-semibold text-neutral-700 hover:bg-neutral-50"
            >
              Next →
            </button>
          </div>
        ) : null}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {picked.map((r, idx) => (
          <div key={`${r.name}-${start + idx}`} className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
            <div className="text-sm text-neutral-600">{formatReviewType(r.level)}</div>
            <div className="mt-2 text-neutral-800 leading-7">“{r.text}”</div>
            <div className="mt-4 text-sm font-semibold">
              {r.name}
              {r.source ? <span className="text-neutral-500"> • {r.source}</span> : null}
            </div>
          </div>
        ))}
      </div>

      {total > count ? (
        <div className="mt-4 text-sm text-neutral-500">
          Showing {start + 1}–{Math.min(end, total)} of {total} reviews
        </div>
      ) : null}
    </div>
  );
}
