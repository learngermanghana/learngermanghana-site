import test from "node:test";
import assert from "node:assert/strict";

import { classTemplates, generateClassInstances, selectPublicClassInstances } from "@/data/classesCatalog";
import { calculatePublicVisibleUntil, generateMeetingDates, nextOccurrenceAfter, pickCityName } from "@/lib/scheduling";

test("A1 soft-start creates only two meetings in first week with orientation labels", () => {
  const meetings = generateMeetingDates({
    startDate: "2026-04-15",
    slots: [
      { weekday: "Monday", startTime: "11:00", endTime: "12:00" },
      { weekday: "Tuesday", startTime: "11:00", endTime: "12:00" },
      { weekday: "Wednesday", startTime: "14:00", endTime: "15:00" },
    ],
    totalSessions: 8,
    onboardingMode: "a1_soft_start",
  });

  const firstWeek = meetings.filter((item) => item.date >= "2026-04-15" && item.date <= "2026-04-21");
  assert.equal(firstWeek.length, 2);
  assert.equal(firstWeek[0]?.label, "Orientation");
  assert.equal(firstWeek[1]?.label, "Lesson 1");
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

test("next class starts on first configured weekday after previous class ends", () => {
  const a2Template = classTemplates.find((item) => item.id === "a2-evening-mon-tue-wed");
  assert.ok(a2Template);
  const instances = generateClassInstances("2026-04-01", 1)
    .filter((item) => item.templateId === "a2-evening-mon-tue-wed" && item.deliveryMode === "live")
    .sort((a, b) => a.startDate.localeCompare(b.startDate));

  const previous = instances[instances.length - 2];
  const next = instances[instances.length - 1];
  const expectedStart = nextOccurrenceAfter(previous.endDate!, a2Template.meetingSlots[0].weekday);
  assert.equal(next.startDate, expectedStart);
});
