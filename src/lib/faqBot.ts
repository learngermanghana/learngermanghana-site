import { FAQ_ENTRIES } from "@/data/faq";

export function findFaqAnswer(userMessage: string) {
  const text = userMessage.toLowerCase().trim();
  if (!text) {
    return null;
  }

  let best: { score: number; entry: (typeof FAQ_ENTRIES)[number] | null } = {
    score: 0,
    entry: null,
  };

  for (const entry of FAQ_ENTRIES) {
    let score = 0;
    for (const keyword of entry.keywords) {
      const normalized = keyword.toLowerCase().trim();
      if (!normalized) {
        continue;
      }

      if (text.includes(normalized)) {
        score += 1;
      }
    }

    if (score > best.score) {
      best = { score, entry };
    }
  }

  return best.score >= 1 ? best.entry : null;
}
