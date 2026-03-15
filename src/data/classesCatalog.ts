import type { ClassItem, ClassLevel } from "@/data/content";
import {
  addDays,
  calculatePublicVisibleUntil,
  formatIsoDate,
  generateMeetingDates,
  nextOccurrenceOnOrAfter,
  parseIsoDate,
  pickCityName,
  summarizeDuration,
  toDisplayTime,
  type MeetingDate,
  type MeetingSlot,
  type Weekday,
} from "@/lib/scheduling";

export type DeliveryMode = "live" | "self-learning";
export type OnboardingMode = "normal" | "a1_soft_start";

export type ClassTemplate = {
  id: string;
  language: "German";
  level: ClassLevel;
  deliveryMode: DeliveryMode;
  meetingSlots: MeetingSlot[];
  totalSessions: number;
  cityPool: string[];
  active: boolean;
  onboardingMode: OnboardingMode;
  defaultLocation: string;
  photo?: string;
  startWeekday?: Weekday;
};

export type ClassInstance = {
  id: string;
  templateId: string;
  language: "German";
  level: ClassLevel;
  name: string;
  cityName?: string;
  location: string;
  startDate: string;
  endDate?: string;
  meetingSlots: MeetingSlot[];
  meetingDates: MeetingDate[];
  publicVisibleUntil: string;
  status: "draft" | "public" | "hidden" | "ended";
  deliveryMode: DeliveryMode;
  format: string;
  scheduleSummary: string;
  duration: string;
  photo?: string;
  bonus: string[];
};

const DEFAULT_LOCATION = "Awoshie, Ghana";
const LIVE_FORMAT = "Hybrid: come to class or join online. Decide each day or watch the recordings.";
const LIVE_BONUS = ["Free exam preparation", "Access to the Falowen App"];

const photoByLevel: Record<ClassLevel, string> = {
  A1: "https://raw.githubusercontent.com/learngermanghana/learngermanghana-site/master/photos/classes/pexels-norma-mortenson-8457612.jpg",
  A2: "https://raw.githubusercontent.com/learngermanghana/learngermanghana-site/master/photos/classes/pexels-katerina-holmes-5905554.jpg",
  B1: "https://raw.githubusercontent.com/learngermanghana/learngermanghana-site/master/photos/classes/pexels-keira-burton-6147369.jpg",
  B2: "https://raw.githubusercontent.com/learngermanghana/learngermanghana-site/master/photos/classes/pexels-keira-burton-6147219.jpg",
  C1: "https://raw.githubusercontent.com/learngermanghana/learngermanghana-site/master/photos/classes/pexels-cottonbro-6209589.jpg",
};

export const classTemplates: ClassTemplate[] = [
  {
    id: "a1-day-wed-thu-fri",
    language: "German",
    level: "A1",
    deliveryMode: "live",
    meetingSlots: [
      { weekday: "Wednesday", startTime: "14:00", endTime: "15:00" },
      { weekday: "Thursday", startTime: "11:00", endTime: "12:00" },
      { weekday: "Friday", startTime: "11:00", endTime: "12:00" },
    ],
    totalSessions: 24,
    cityPool: ["Berlin", "Hamburg", "Stuttgart", "Köln", "Dortmund", "Freiburg", "Heidelberg"],
    active: true,
    onboardingMode: "a1_soft_start",
    defaultLocation: DEFAULT_LOCATION,
    photo: photoByLevel.A1,
  },
  {
    id: "a1-day-mon-tue-wed",
    language: "German",
    level: "A1",
    deliveryMode: "live",
    meetingSlots: [
      { weekday: "Monday", startTime: "11:00", endTime: "12:00" },
      { weekday: "Tuesday", startTime: "11:00", endTime: "12:00" },
      { weekday: "Wednesday", startTime: "14:00", endTime: "15:00" },
    ],
    totalSessions: 24,
    cityPool: ["Köln", "Berlin", "Hamburg", "Stuttgart", "Dortmund", "Freiburg", "Heidelberg"],
    active: true,
    onboardingMode: "a1_soft_start",
    defaultLocation: DEFAULT_LOCATION,
    photo: photoByLevel.A1,
  },
  {
    id: "a1-evening-thu-fri-sat",
    language: "German",
    level: "A1",
    deliveryMode: "live",
    meetingSlots: [
      { weekday: "Thursday", startTime: "18:00", endTime: "19:00" },
      { weekday: "Friday", startTime: "18:00", endTime: "19:00" },
      { weekday: "Saturday", startTime: "08:00", endTime: "09:00" },
    ],
    totalSessions: 24,
    cityPool: ["Hamburg", "Berlin", "Köln", "Stuttgart", "Dortmund", "Freiburg", "Heidelberg"],
    active: true,
    onboardingMode: "a1_soft_start",
    startWeekday: "Friday",
    defaultLocation: DEFAULT_LOCATION,
    photo: photoByLevel.A1,
  },
  {
    id: "a1-evening-mon-tue-wed",
    language: "German",
    level: "A1",
    deliveryMode: "live",
    meetingSlots: [
      { weekday: "Monday", startTime: "18:00", endTime: "19:00" },
      { weekday: "Tuesday", startTime: "18:00", endTime: "19:00" },
      { weekday: "Wednesday", startTime: "18:00", endTime: "19:00" },
    ],
    totalSessions: 24,
    cityPool: ["Dortmund", "Berlin", "Köln", "Hamburg", "Stuttgart", "Freiburg", "Heidelberg"],
    active: true,
    onboardingMode: "a1_soft_start",
    defaultLocation: DEFAULT_LOCATION,
    photo: photoByLevel.A1,
  },
  {
    id: "a2-evening-mon-tue-wed",
    language: "German",
    level: "A2",
    deliveryMode: "live",
    meetingSlots: [
      { weekday: "Monday", startTime: "17:30", endTime: "19:00" },
      { weekday: "Tuesday", startTime: "17:30", endTime: "19:00" },
      { weekday: "Wednesday", startTime: "17:30", endTime: "19:00" },
    ],
    totalSessions: 27,
    cityPool: ["Freiburg", "Stuttgart", "Heidelberg", "Berlin", "Hamburg", "Köln"],
    active: true,
    onboardingMode: "normal",
    defaultLocation: DEFAULT_LOCATION,
    photo: photoByLevel.A2,
  },
  {
    id: "b1-evening-thu-fri",
    language: "German",
    level: "B1",
    deliveryMode: "live",
    meetingSlots: [
      { weekday: "Thursday", startTime: "19:30", endTime: "21:00" },
      { weekday: "Friday", startTime: "19:30", endTime: "21:00" },
    ],
    totalSessions: 28,
    cityPool: ["Heidelberg", "Stuttgart", "Freiburg", "Berlin", "Hamburg", "Köln"],
    active: true,
    onboardingMode: "normal",
    defaultLocation: DEFAULT_LOCATION,
    photo: photoByLevel.B1,
  },
  {
    id: "b2-self-learning",
    language: "German",
    level: "B2",
    deliveryMode: "self-learning",
    meetingSlots: [],
    totalSessions: 0,
    cityPool: [],
    active: true,
    onboardingMode: "normal",
    defaultLocation: "Online",
    photo: photoByLevel.B2,
  },
  {
    id: "c1-self-learning",
    language: "German",
    level: "C1",
    deliveryMode: "self-learning",
    meetingSlots: [],
    totalSessions: 0,
    cityPool: [],
    active: true,
    onboardingMode: "normal",
    defaultLocation: "Online",
    photo: photoByLevel.C1,
  },
];

type SeedInstance = { templateId: string; startDate: string; cityName: string };

const historicalSeeds: SeedInstance[] = [
  { templateId: "a1-day-wed-thu-fri", startDate: "2026-01-14", cityName: "Stuttgart" },
  { templateId: "a1-day-mon-tue-wed", startDate: "2026-02-18", cityName: "Berlin" },
  { templateId: "a1-evening-thu-fri-sat", startDate: "2026-01-30", cityName: "Hamburg" },
  { templateId: "a1-evening-mon-tue-wed", startDate: "2026-03-09", cityName: "Dortmund" },
  { templateId: "a1-day-mon-tue-wed", startDate: "2026-04-28", cityName: "Köln" },
  { templateId: "a2-evening-mon-tue-wed", startDate: "2026-03-02", cityName: "Stuttgart" },
  { templateId: "b1-evening-thu-fri", startDate: "2026-03-12", cityName: "Stuttgart" },
];

function toClassId(level: string, cityName: string, startDate: string): string {
  const citySlug = cityName
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return `${level.toLowerCase()}-german-${citySlug}-${startDate}`;
}

function toClassName(level: ClassLevel, cityName: string): string {
  return `${level} ${cityName} Klasse`;
}

function createLiveInstance(template: ClassTemplate, startDate: string, cityName: string, status: ClassInstance["status"] = "public"): ClassInstance {
  const meetingDates = generateMeetingDates({
    startDate,
    slots: template.meetingSlots,
    totalSessions: template.totalSessions,
    onboardingMode: template.onboardingMode,
  });
  const endDate = meetingDates.at(-1)?.date;

  return {
    id: toClassId(template.level, cityName, startDate),
    templateId: template.id,
    language: template.language,
    level: template.level,
    name: toClassName(template.level, cityName),
    cityName,
    location: template.defaultLocation,
    startDate,
    endDate,
    meetingSlots: template.meetingSlots,
    meetingDates,
    publicVisibleUntil: calculatePublicVisibleUntil(startDate),
    status,
    deliveryMode: "live",
    format: LIVE_FORMAT,
    scheduleSummary: `${template.meetingSlots.length}x per week`,
    duration: endDate ? summarizeDuration(startDate, endDate) : "TBA",
    photo: template.photo,
    bonus: LIVE_BONUS,
  };
}

function createSelfLearningInstance(template: ClassTemplate): ClassInstance {
  return {
    id: `${template.level.toLowerCase()}-german-online-self-learning`,
    templateId: template.id,
    language: template.language,
    level: template.level,
    name: `${template.level} Self-Learning`,
    location: template.defaultLocation,
    startDate: "TBA",
    meetingSlots: [],
    meetingDates: [],
    publicVisibleUntil: "Always open",
    status: "public",
    deliveryMode: "self-learning",
    format: "Self-learning with AI assistant + tutor support by email when needed.",
    scheduleSummary: "Self-paced",
    duration: "Always open",
    photo: template.photo,
    bonus: ["AI assistant in Falowen", "Email tutor support when needed", "Structured self-study plan"],
  };
}

export function generateClassInstances(referenceDate = "2026-04-01", forwardCycles = 2): ClassInstance[] {
  const allInstances: ClassInstance[] = [];
  const liveTemplates = classTemplates.filter((template) => template.active && template.deliveryMode === "live");

  for (const seed of historicalSeeds) {
    const template = liveTemplates.find((item) => item.id === seed.templateId);
    if (!template) continue;
    allInstances.push(createLiveInstance(template, seed.startDate, seed.cityName, "ended"));
  }

  for (const template of liveTemplates) {
    const templateInstances = allInstances
      .filter((item) => item.templateId === template.id)
      .sort((a, b) => a.startDate.localeCompare(b.startDate));

    let lastInstance = templateInstances.at(-1);
    if (!lastInstance) continue;

    for (let cycle = 0; cycle < forwardCycles; cycle += 1) {
      const minGapStart = formatIsoDate(addDays(parseIsoDate(lastInstance.startDate), 25));
      const anchorDate = lastInstance.endDate && lastInstance.endDate > minGapStart ? lastInstance.endDate : minGapStart;
      const nextStart = nextOccurrenceOnOrAfter(anchorDate, template.startWeekday ?? template.meetingSlots[0].weekday);
      const cityName = pickCityName({
        cityPool: template.cityPool,
        usedCities: allInstances
          .filter((item) => item.deliveryMode === "live" && item.cityName)
          .map((item) => ({ cityName: item.cityName as string, startDate: item.startDate, level: item.level })),
        level: template.level,
        newStartDate: nextStart,
        lookbackDays: 180,
      });
      const instance = createLiveInstance(template, nextStart, cityName);
      allInstances.push(instance);
      lastInstance = instance;
    }
  }

  const selfLearning = classTemplates
    .filter((template) => template.active && template.deliveryMode === "self-learning")
    .map((template) => createSelfLearningInstance(template));

  const now = new Date(`${referenceDate}T00:00:00Z`).toISOString().slice(0, 10);
  const liveWithStatus = allInstances.map((instance) => {
    if (instance.deliveryMode !== "live") return instance;
    if (instance.endDate && instance.endDate < now) return { ...instance, status: "ended" as const };
    if (instance.publicVisibleUntil < now) return { ...instance, status: "hidden" as const };
    if (instance.startDate > now) return { ...instance, status: "public" as const };
    return { ...instance, status: "public" as const };
  });

  return [...liveWithStatus, ...selfLearning].sort((a, b) => {
    if (a.startDate === "TBA") return 1;
    if (b.startDate === "TBA") return -1;
    return a.startDate.localeCompare(b.startDate);
  });
}

export function selectPublicClassInstances(instances: ClassInstance[], referenceDate = formatIsoDate(new Date())): ClassInstance[] {
  const livePublic = instances
    .filter((item) => item.deliveryMode === "live")
    .filter((item) => item.startDate >= referenceDate)
    .filter((item) => item.publicVisibleUntil >= referenceDate)
    .sort((a, b) => a.startDate.localeCompare(b.startDate));

  const liveCurrentOrUpcoming = instances
    .filter((item) => item.deliveryMode === "live")
    .filter((item) => (item.endDate ?? item.startDate) >= referenceDate)
    .sort((a, b) => a.startDate.localeCompare(b.startDate));

  const pickByLevel = (level: ClassLevel, count: number) => livePublic.filter((item) => item.level === level).slice(0, count);
  const pickA1Priority = (count: number) => {
    const a1CurrentOrUpcoming = liveCurrentOrUpcoming.filter((item) => item.level === "A1");
    const a1Upcoming = livePublic.filter((item) => item.level === "A1");

    if (!a1CurrentOrUpcoming.length && !a1Upcoming.length) return [];

    const anchorMonth = a1Upcoming[0]?.startDate.slice(0, 7) ?? a1CurrentOrUpcoming[0].startDate.slice(0, 7);
    const sameMonthClasses = a1CurrentOrUpcoming.filter((item) => item.startDate.slice(0, 7) === anchorMonth);

    if (sameMonthClasses.length >= count) {
      return sameMonthClasses.slice(0, count);
    }

    const alreadySelectedIds = new Set(sameMonthClasses.map((item) => item.id));
    const remaining = a1Upcoming.filter((item) => !alreadySelectedIds.has(item.id));

    return [...sameMonthClasses, ...remaining].slice(0, count);
  };

  const selectedLive = [
    ...pickA1Priority(2),
    ...pickByLevel("A2", 1),
    ...pickByLevel("B1", 1),
  ];

  const selfLearning = instances.filter((item) => item.deliveryMode === "self-learning" && (item.level === "B2" || item.level === "C1"));

  return [...selectedLive, ...selfLearning];
}

function toMeetingDay(slots: MeetingSlot[]): { day: string; time: string }[] {
  return slots.map((slot) => ({ day: slot.weekday, time: `${toDisplayTime(slot.startTime)} – ${toDisplayTime(slot.endTime)}` }));
}

export function toClassItem(instance: ClassInstance): ClassItem {
  return {
    id: instance.id,
    title: instance.name,
    photo: instance.photo,
    language: instance.language,
    level: instance.level,
    location: instance.location,
    startDate: instance.startDate,
    endDate: instance.endDate,
    format: instance.format,
    duration: instance.duration,
    scheduleSummary: instance.scheduleSummary,
    meetingDays: instance.deliveryMode === "self-learning"
      ? [{ day: "Self-learning", time: "Follow the Falowen schedule with AI tools" }]
      : toMeetingDay(instance.meetingSlots),
    bonus: instance.bonus,
  };
}

const allClassInstances = generateClassInstances();

export const internalClassInstances = allClassInstances;
export const publicClassInstances = selectPublicClassInstances(allClassInstances, "2026-04-01");
export const publicUpcomingClasses: ClassItem[] = publicClassInstances.map(toClassItem);
