import type { ClassItem } from "@/data/content";
import { classCurriculumByLevel, type CurriculumAssignment } from "@/data/classCurriculum";

const dayMap: Record<string, number> = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
};

export type GeneratedScheduleItem = {
  date: string;
  day: string;
  time: string;
  assignment: CurriculumAssignment;
};

export type GeneratedClassSchedule = {
  sessions: GeneratedScheduleItem[];
  totalMeetingsBetweenDates: number;
  coveredAssignments: number;
  remainingAssignments: number;
};

function formatDateIso(date: Date): string {
  return date.toISOString().slice(0, 10);
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
    .map((meeting) => ({ ...meeting, dayIndex: dayMap[meeting.day] }))
    .filter((meeting) => meeting.dayIndex !== undefined);

  const dates: { date: string; day: string; time: string }[] = [];

  for (let cursor = new Date(start); cursor <= end; cursor.setDate(cursor.getDate() + 1)) {
    const dayIndex = cursor.getDay();
    for (const meeting of meetings) {
      if (meeting.dayIndex === dayIndex) {
        dates.push({ date: formatDateIso(cursor), day: meeting.day, time: meeting.time });
      }
    }
  }

  return dates;
}

export function buildClassSchedule(classInfo: ClassItem): GeneratedClassSchedule | null {
  if (classInfo.language !== "German") return null;

  const levelDictionary = classCurriculumByLevel[classInfo.level];
  if (!levelDictionary) return null;

  const meetingDates = getMeetingDatesBetweenRange(classInfo);
  if (!meetingDates.length) return null;

  const assignments = Object.values(levelDictionary);
  const sessionCount = Math.min(meetingDates.length, assignments.length);

  const sessions = Array.from({ length: sessionCount }, (_, index) => ({
    ...meetingDates[index],
    assignment: assignments[index],
  }));

  return {
    sessions,
    totalMeetingsBetweenDates: meetingDates.length,
    coveredAssignments: sessions.length,
    remainingAssignments: Math.max(assignments.length - sessions.length, 0),
  };
}
