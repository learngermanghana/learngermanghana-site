import type { ClassItem, ClassPacingStrategy } from "@/data/content";
import { classCurriculumByLanguageLevel, type CurriculumAssignment } from "@/data/classCurriculum";

const dayAliasMap: Record<string, number> = {
  sun: 0,
  sunday: 0,
  mon: 1,
  monday: 1,
  tue: 2,
  tues: 2,
  tuesday: 2,
  wed: 3,
  wednesday: 3,
  thu: 4,
  thur: 4,
  thurs: 4,
  thursday: 4,
  fri: 5,
  friday: 5,
  sat: 6,
  saturday: 6,
};

export type GeneratedScheduleItem = {
  date: string;
  day: string;
  time: string;
  kind: "lesson" | "revision";
  assignments: CurriculumAssignment[];
  note?: string;
};

export type GeneratedClassSchedule = {
  sessions: GeneratedScheduleItem[];
  totalMeetingsBetweenDates: number;
  coveredAssignments: number;
  remainingAssignments: number;
  revisionSessions: number;
};

function formatDateIsoLocal(date: Date): string {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function parseChapter(chapter: string): number[] {
  return chapter.split(".").map((part) => Number.parseInt(part, 10)).map((n) => (Number.isFinite(n) ? n : 0));
}

function compareAssignments(a: CurriculumAssignment, b: CurriculumAssignment): number {
  const chapterA = parseChapter(a.chapter);
  const chapterB = parseChapter(b.chapter);
  const max = Math.max(chapterA.length, chapterB.length);

  for (let index = 0; index < max; index += 1) {
    const currentA = chapterA[index] ?? 0;
    const currentB = chapterB[index] ?? 0;
    if (currentA !== currentB) return currentA - currentB;
  }

  return a.assignment_id.localeCompare(b.assignment_id);
}

function getPacingConfig(strategy?: ClassPacingStrategy): { assignmentsPerSession: number; revisionEvery: number | null } {
  if (strategy === "twoPerSession") return { assignmentsPerSession: 2, revisionEvery: null };
  if (strategy === "revisionEvery4") return { assignmentsPerSession: 1, revisionEvery: 4 };
  return { assignmentsPerSession: 1, revisionEvery: null };
}

function normalizeDayLabel(day: string): number | null {
  const normalized = day.trim().toLowerCase();
  if (normalized in dayAliasMap) {
    return dayAliasMap[normalized];
  }

  const short = normalized.slice(0, 3);
  if (short in dayAliasMap) {
    return dayAliasMap[short];
  }

  return null;
}

function getMeetingDatesBetweenRange(classInfo: ClassItem): { date: string; day: string; time: string }[] {
  if (!classInfo.startDate || !classInfo.endDate || classInfo.startDate === "TBA" || classInfo.endDate === "TBA") {
    return [];
  }

  const start = new Date(classInfo.startDate);
  const end = new Date(classInfo.endDate);

  if (!Number.isFinite(start.getTime()) || !Number.isFinite(end.getTime()) || start > end) {
    return [];
  }

  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);

  const meetings = classInfo.meetingDays
    .map((meeting) => ({ ...meeting, dayIndex: normalizeDayLabel(meeting.day) }))
    .filter((meeting) => meeting.dayIndex !== null);

  const dates: { date: string; day: string; time: string }[] = [];

  for (let cursor = new Date(start); cursor <= end; cursor.setDate(cursor.getDate() + 1)) {
    const dayIndex = cursor.getDay();
    for (const meeting of meetings) {
      if (meeting.dayIndex === dayIndex) {
        dates.push({ date: formatDateIsoLocal(cursor), day: meeting.day, time: meeting.time });
      }
    }
  }

  return dates;
}

export function buildClassSchedule(classInfo: ClassItem): GeneratedClassSchedule | null {
  const levelDictionary = classCurriculumByLanguageLevel[classInfo.language]?.[classInfo.level];
  if (!levelDictionary) return null;

  const meetingDates = getMeetingDatesBetweenRange(classInfo);
  if (!meetingDates.length) return null;

  const assignments = Object.values(levelDictionary).sort(compareAssignments);
  const { assignmentsPerSession, revisionEvery } = getPacingConfig(classInfo.pacingStrategy);

  const sessions: GeneratedScheduleItem[] = [];
  let assignmentCursor = 0;

  for (let sessionIndex = 0; sessionIndex < meetingDates.length; sessionIndex += 1) {
    const meeting = meetingDates[sessionIndex];
    const isScheduledRevision = revisionEvery ? (sessionIndex + 1) % revisionEvery === 0 : false;

    if (isScheduledRevision) {
      sessions.push({
        ...meeting,
        kind: "revision",
        assignments: [],
        note: "Revision and speaking drills",
      });
      continue;
    }

    if (assignmentCursor >= assignments.length) {
      sessions.push({
        ...meeting,
        kind: "revision",
        assignments: [],
        note: "Overflow session: mock test and exam preparation",
      });
      continue;
    }

    const nextAssignments = assignments.slice(assignmentCursor, assignmentCursor + assignmentsPerSession);
    assignmentCursor += nextAssignments.length;

    sessions.push({
      ...meeting,
      kind: "lesson",
      assignments: nextAssignments,
    });
  }

  const revisionSessions = sessions.filter((session) => session.kind === "revision").length;

  return {
    sessions,
    totalMeetingsBetweenDates: meetingDates.length,
    coveredAssignments: assignmentCursor,
    remainingAssignments: Math.max(assignments.length - assignmentCursor, 0),
    revisionSessions,
  };
}
