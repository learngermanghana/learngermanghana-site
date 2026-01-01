"use client";

import { useMemo } from "react";
import type { Review } from "@/data/content";

function shuffle<T>(arr: T[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function RandomReviews({ reviews, count = 6 }: { reviews: Review[]; count?: number }) {
  const picked = useMemo(() => shuffle(reviews).slice(0, count), [reviews, count]);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {picked.map((r, idx) => (
        <div key={idx} className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
          <div className="text-sm text-neutral-600">{r.level} student</div>
          <div className="mt-2 text-neutral-800 leading-7">“{r.text}”</div>
          <div className="mt-4 text-sm font-semibold">
            {r.name}{r.source ? <span className="text-neutral-500"> • {r.source}</span> : null}
          </div>
        </div>
      ))}
    </div>
  );
}
