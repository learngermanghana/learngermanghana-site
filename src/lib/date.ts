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
