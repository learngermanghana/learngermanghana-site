export function formatDatePretty(dateStr: string): string {
  if (!dateStr || dateStr === "TBA") return "To be announced";

  // Supports ISO like 2026-01-08
  const d = new Date(dateStr);

  if (!Number.isFinite(d.getTime())) return dateStr;

  // Example: 8 Jan 2026
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(d);
}

export function getDaysUntilStart(dateStr: string): number | null {
  if (!dateStr || dateStr === "TBA" || dateStr === "Always open") return null;

  const startDate = new Date(dateStr);
  if (!Number.isFinite(startDate.getTime())) return null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  startDate.setHours(0, 0, 0, 0);

  const diffMs = startDate.getTime() - today.getTime();
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}
