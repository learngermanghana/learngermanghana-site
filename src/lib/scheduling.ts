export type Weekday = "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday";

export type MeetingSlot = {
  weekday: Weekday;
  startTime: string; // HH:mm
  endTime: string; // HH:mm
};

export type SessionLabel = "Orientation" | "Lesson 1" | "Lesson";

export type MeetingDate = {
  date: string; // YYYY-MM-DD
  weekday: Weekday;
  startTime: string;
  endTime: string;
  label?: SessionLabel;
};

const weekdayIndex: Record<Weekday, number> = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
};

const DAY_MS = 24 * 60 * 60 * 1000;

export function parseIsoDate(dateIso: string): Date {
  const [year, month, day] = dateIso.split("-").map((item) => Number(item));
  return new Date(Date.UTC(year, month - 1, day));
}

export function formatIsoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function addDays(date: Date, days: number): Date {
  return new Date(date.getTime() + days * DAY_MS);
}

export function isValidIsoDate(dateIso: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(dateIso) && Number.isFinite(parseIsoDate(dateIso).getTime());
}

function toSortedSlots(slots: MeetingSlot[]): MeetingSlot[] {
  return [...slots].sort((a, b) => {
    const dayDiff = weekdayIndex[a.weekday] - weekdayIndex[b.weekday];
    if (dayDiff !== 0) return dayDiff;
    return a.startTime.localeCompare(b.startTime);
  });
}

export function nextOccurrenceAfter(dateIso: string, weekday: Weekday): string {
  const start = parseIsoDate(dateIso);
  const startDay = start.getUTCDay();
  const target = weekdayIndex[weekday];
  const delta = (target - startDay + 7) % 7;
  const next = addDays(start, delta === 0 ? 7 : delta);
  return formatIsoDate(next);
}

export function calculatePublicVisibleUntil(startDateIso: string): string {
  return formatIsoDate(addDays(parseIsoDate(startDateIso), 7));
}

export function generateMeetingDates(options: {
  startDate: string;
  slots: MeetingSlot[];
  totalSessions: number;
  onboardingMode: "normal" | "a1_soft_start";
}): MeetingDate[] {
  const { startDate, slots, totalSessions, onboardingMode } = options;
  if (!isValidIsoDate(startDate) || totalSessions <= 0 || slots.length === 0) return [];

  const sortedSlots = toSortedSlots(slots);
  const firstWeekStart = parseIsoDate(startDate);
  const firstWeekEnd = addDays(firstWeekStart, 6);

  const output: MeetingDate[] = [];
  let cursor = firstWeekStart;
  let lessonCount = 0;

  while (output.length < totalSessions) {
    const day = cursor.getUTCDay();

    for (const slot of sortedSlots) {
      if (weekdayIndex[slot.weekday] !== day) continue;

      if (onboardingMode === "a1_soft_start" && cursor >= firstWeekStart && cursor <= firstWeekEnd) {
        if (output.length >= 2) {
          continue;
        }

        const label: SessionLabel = output.length === 0 ? "Orientation" : "Lesson 1";
        output.push({
          date: formatIsoDate(cursor),
          weekday: slot.weekday,
          startTime: slot.startTime,
          endTime: slot.endTime,
          label,
        });
        if (output.length >= totalSessions) break;
        continue;
      }

      lessonCount += 1;
      output.push({
        date: formatIsoDate(cursor),
        weekday: slot.weekday,
        startTime: slot.startTime,
        endTime: slot.endTime,
        label: "Lesson",
      });
      if (output.length >= totalSessions) break;
    }

    cursor = addDays(cursor, 1);
  }

  return output;
}

export function pickCityName(options: {
  cityPool: string[];
  usedCities: Array<{ cityName: string; startDate: string; level: string }>;
  level: string;
  newStartDate: string;
  lookbackDays?: number;
}): string {
  const { cityPool, usedCities, level, newStartDate, lookbackDays = 180 } = options;
  const newStart = parseIsoDate(newStartDate).getTime();

  const recentlyUsed = new Set(
    usedCities
      .filter((item) => item.level === level)
      .filter((item) => Math.abs(newStart - parseIsoDate(item.startDate).getTime()) <= lookbackDays * DAY_MS)
      .map((item) => item.cityName.toLowerCase()),
  );

  const available = cityPool.find((city) => !recentlyUsed.has(city.toLowerCase()));
  return available ?? cityPool[0];
}

export function toDisplayTime(time24: string): string {
  const [h, m] = time24.split(":").map(Number);
  const suffix = h >= 12 ? "pm" : "am";
  const hour = h % 12 || 12;
  return `${hour}:${String(m).padStart(2, "0")} ${suffix}`;
}

export function summarizeDuration(startDate: string, endDate: string): string {
  const fmt = new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "long", year: "numeric", timeZone: "UTC" });
  return `${fmt.format(parseIsoDate(startDate))} – ${fmt.format(parseIsoDate(endDate))}`;
}
