import { reviews as fallbackReviews, type Review } from "@/data/content";

const SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ5Nm-MLJkw3TeOht5ROELvFumVS9X8-ke_npLoOuF3W-zrF0v9xjk_Upzv4umQCocD5xtFaMRJQh6Z/pub?output=csv";

function shuffle<T>(items: T[]) {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function normalizeHeader(value: string) {
  return value.replace(/"/g, "").replace(/\s+/g, "").trim().toLowerCase();
}

function parseCsvLine(line: string) {
  const values: string[] = [];
  let value = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        value += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === "," && !inQuotes) {
      values.push(value.trim());
      value = "";
      continue;
    }

    value += char;
  }

  values.push(value.trim());
  return values;
}

function parseReviewsFromCsv(csvText: string): Review[] {
  const lines = csvText
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length < 2) {
    return [];
  }

  const headers = parseCsvLine(lines[0]).map(normalizeHeader);

  const nameIndex = headers.findIndex((h) => h === "student_name" || h === "studentname" || h === "name");
  const ratingIndex = headers.findIndex((h) => h === "rating" || h === "level");
  const textIndex = headers.findIndex((h) => h === "review_text" || h === "reviewtext" || h === "text");

  if (textIndex === -1) {
    return [];
  }

  return lines
    .slice(1)
    .map(parseCsvLine)
    .map((row): Review | null => {
      const text = row[textIndex]?.trim();
      if (!text) return null;

      return {
        name: row[nameIndex]?.trim() || "Student",
        level: row[ratingIndex]?.trim() || "Student",
        text,
        source: "Student review",
      };
    })
    .filter((review): review is Review => Boolean(review));
}

export async function getReviews(): Promise<Review[]> {
  try {
    const response = await fetch(SHEET_CSV_URL, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return fallbackReviews;
    }

    const csvText = await response.text();
    const parsed = parseReviewsFromCsv(csvText);

    return parsed.length ? parsed : fallbackReviews;
  } catch {
    return fallbackReviews;
  }
}

export async function getRandomizedReviews(): Promise<Review[]> {
  const reviews = await getReviews();
  return shuffle(reviews);
}
