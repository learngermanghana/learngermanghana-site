import { internalClassInstances, publicUpcomingClasses, toClassItem } from "@/data/classesCatalog";
import type { ClassItem } from "@/data/content";

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
  return [...publicUpcomingClasses].sort((a, b) => getDateValue(a) - getDateValue(b));
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
  return internalClassInstances.map(toClassItem).find((item) => item.id === classId);
}

export function getClassPath(classId: string): string {
  return `/classes/${classId}`;
}

export function getDurationWithProgramWeeks(item: ClassItem): string {
  const tenWeekLevels = new Set(["A1", "A2", "B1"]);
  const shouldShowTenWeeks = item.language === "German" && tenWeekLevels.has(item.level);

  if (!shouldShowTenWeeks) {
    return item.duration;
  }

  return `${item.duration} • 10 weeks`;
}
