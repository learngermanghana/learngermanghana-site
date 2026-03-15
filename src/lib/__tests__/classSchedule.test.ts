import test from "node:test";
import assert from "node:assert/strict";

import { buildClassSchedule } from "@/lib/classSchedule";
import type { ClassItem } from "@/data/content";

const baseClass: ClassItem = {
  id: "test-class",
  title: "Test Class",
  language: "German",
  level: "A1",
  location: "Accra",
  startDate: "2026-04-01",
  endDate: "2026-04-14",
  format: "Hybrid",
  duration: "2 weeks",
  scheduleSummary: "3x per week",
  meetingDays: [
    { day: "Mon", time: "10:00" },
    { day: "Tuesday", time: "10:00" },
    { day: "WEDNESDAY", time: "10:00" },
  ],
  bonus: [],
};

test("buildClassSchedule creates sessions for normalized meeting-day labels", () => {
  const result = buildClassSchedule(baseClass);
  assert.ok(result);
  assert.equal(result.totalMeetingsBetweenDates > 0, true);
});

test("buildClassSchedule returns null when endDate is missing", () => {
  const result = buildClassSchedule({ ...baseClass, endDate: undefined });
  assert.equal(result, null);
});

test("buildClassSchedule returns null for unsupported language/level track", () => {
  const result = buildClassSchedule({ ...baseClass, language: "French" });
  assert.equal(result, null);
});

test("buildClassSchedule supports duplicate weekly meeting entries", () => {
  const result = buildClassSchedule({
    ...baseClass,
    meetingDays: [
      { day: "Monday", time: "10:00" },
      { day: "Monday", time: "18:00" },
      { day: "Tuesday", time: "10:00" },
    ],
  });

  assert.ok(result);
  const mondaySessions = result.sessions.filter((session) => session.day.toLowerCase().startsWith("mon"));
  assert.equal(mondaySessions.length > 0, true);
});


test("buildClassSchedule starts A1 curriculum on the first lesson after orientation", () => {
  const result = buildClassSchedule({
    ...baseClass,
    startDate: "2026-04-03",
    endDate: "2026-04-12",
    meetingDays: [
      { day: "Friday", time: "6:00 pm – 7:00 pm" },
      { day: "Saturday", time: "8:00 am – 9:00 am" },
      { day: "Thursday", time: "6:00 pm – 7:00 pm" },
    ],
  });

  assert.ok(result);
  assert.equal(result.sessions[0]?.date, "2026-04-04");
  assert.equal(result.sessions[0]?.day, "Saturday");
  assert.equal(result.sessions[0]?.assignment.assignment_id, "A1-0.1");
  assert.equal(result.sessions[0]?.assignment.chapter, "0.1");
  assert.equal(result.sessions[0]?.assignment.de, "Begrüßungen und Wohlbefinden");
  assert.equal(result.sessions[0]?.assignment.en, "Greetings and Asking About Well-being");
});
