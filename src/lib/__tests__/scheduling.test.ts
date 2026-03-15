import test from "node:test";
import assert from "node:assert/strict";

import { classTemplates, generateClassInstances, selectPublicClassInstances } from "@/data/classesCatalog";
import { addDays, calculatePublicVisibleUntil, formatIsoDate, generateMeetingDates, nextOccurrenceOnOrAfter, parseIsoDate, pickCityName } from "@/lib/scheduling";

test("A1 soft-start uses final two first-week meetings and resumes full pattern in week 2", () => {
  const meetings = generateMeetingDates({
    startDate: "2026-04-16",
    slots: [
      { weekday: "Thursday", startTime: "18:00", endTime: "19:00" },
      { weekday: "Friday", startTime: "18:00", endTime: "19:00" },
      { weekday: "Saturday", startTime: "08:00", endTime: "09:00" },
    ],
    totalSessions: 8,
    onboardingMode: "a1_soft_start",
  });

  const firstWeek = meetings.filter((item) => item.date >= "2026-04-16" && item.date <= "2026-04-22");
  assert.equal(firstWeek.length, 2);
  assert.deepEqual(
    firstWeek.map((item) => ({ weekday: item.weekday, label: item.label })),
    [
      { weekday: "Friday", label: "Orientation" },
      { weekday: "Saturday", label: "Lesson 1" },
    ],
  );

  const weekTwo = meetings.filter((item) => item.date >= "2026-04-23" && item.date <= "2026-04-29");
  assert.deepEqual(weekTwo.map((item) => item.weekday), ["Thursday", "Friday", "Saturday"]);
  assert.deepEqual(weekTwo.map((item) => item.label), ["Lesson", "Lesson", "Lesson"]);
});

test("public visibility ends 7 days after start", () => {
  assert.equal(calculatePublicVisibleUntil("2026-04-15"), "2026-04-22");
});

test("city selection avoids reuse in same level within 180 days", () => {
  const selected = pickCityName({
    cityPool: ["Berlin", "Hamburg", "Köln"],
    usedCities: [
      { cityName: "Berlin", startDate: "2026-01-01", level: "A1" },
      { cityName: "Hamburg", startDate: "2026-03-01", level: "A1" },
    ],
    level: "A1",
    newStartDate: "2026-05-01",
  });

  assert.equal(selected, "Köln");
});

test("public page selection returns 2 A1, 1 A2, 1 B1, and always-open B2/C1", () => {
  const instances = generateClassInstances("2026-04-01", 2);
  const selected = selectPublicClassInstances(instances, "2026-04-01");
  const counts = selected.reduce<Record<string, number>>((acc, item) => {
    acc[item.level] = (acc[item.level] ?? 0) + 1;
    return acc;
  }, {});

  assert.equal(counts.A1, 2);
  assert.equal(counts.A2, 1);
  assert.equal(counts.B1, 1);
  assert.equal(counts.B2, 1);
  assert.equal(counts.C1, 1);
});

test("next class respects 25-day minimum spacing and starts on first configured weekday", () => {
  const a2Template = classTemplates.find((item) => item.id === "a2-evening-mon-tue-wed");
  assert.ok(a2Template);
  const instances = generateClassInstances("2026-04-01", 1)
    .filter((item) => item.templateId === "a2-evening-mon-tue-wed" && item.deliveryMode === "live")
    .sort((a, b) => a.startDate.localeCompare(b.startDate));

  const previous = instances[instances.length - 2];
  const next = instances[instances.length - 1];
  const minGapStart = formatIsoDate(addDays(parseIsoDate(previous.startDate), 25));
  const anchorDate = previous.endDate && previous.endDate > minGapStart ? previous.endDate : minGapStart;
  const expectedStart = nextOccurrenceOnOrAfter(anchorDate, a2Template.meetingSlots[0].weekday);

  assert.equal(next.startDate, expectedStart);

  const previousStart = new Date(`${previous.startDate}T00:00:00Z`).getTime();
  const nextStart = new Date(`${next.startDate}T00:00:00Z`).getTime();
  assert.ok(nextStart - previousStart >= 25 * 24 * 60 * 60 * 1000);
});


test("template startWeekday override sets A1 Thu-Fri-Sat cohort to first Friday in April 2026", () => {
  const instances = generateClassInstances("2026-04-01", 2)
    .filter((item) => item.templateId === "a1-evening-thu-fri-sat" && item.deliveryMode === "live")
    .sort((a, b) => a.startDate.localeCompare(b.startDate));

  const aprilInstance = instances.find((item) => item.startDate.startsWith("2026-04"));
  assert.ok(aprilInstance);
  assert.equal(aprilInstance.startDate, "2026-04-03");
});
