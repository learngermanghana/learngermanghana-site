import { upcomingClasses, type ClassItem } from "@/data/content";

export function isScheduledClass(item: ClassItem): boolean {
  if (!item.startDate || item.startDate === "TBA" || item.startDate === "Always open") {
    return false;
  }

  return Number.isFinite(new Date(item.startDate).getTime());
}

function getDateValue(item: ClassItem): number {
  if (!isScheduledClass(item)) {
    return Number.POSITIVE_INFINITY;
  }

  return new Date(item.startDate).getTime();
}

export function getUpcomingClassesSorted(): ClassItem[] {
  return [...upcomingClasses].sort((a, b) => getDateValue(a) - getDateValue(b));
}

export function getNextIntake(referenceDate = new Date()): ClassItem | null {
  const today = new Date(referenceDate);
  today.setHours(0, 0, 0, 0);

  const upcomingScheduled = getUpcomingClassesSorted().filter((item) => {
    if (!isScheduledClass(item)) return false;

    const start = new Date(item.startDate);
    start.setHours(0, 0, 0, 0);
    return start.getTime() >= today.getTime();
  });

  return upcomingScheduled[0] ?? getUpcomingClassesSorted()[0] ?? null;
}

export function getClassById(classId: string): ClassItem | undefined {
  return upcomingClasses.find((item) => item.id === classId);
}

export function getClassPath(classId: string): string {
  return `/classes/${classId}`;
}
