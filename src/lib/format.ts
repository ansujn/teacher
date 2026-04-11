import { format, parseISO } from "date-fns";

export function formatDate(date: Date | string, pattern = "d MMM yyyy") {
  const d = typeof date === "string" ? parseISO(date) : date;
  return format(d, pattern);
}

export function formatDateTime(date: Date | string) {
  return formatDate(date, "d MMM yyyy, HH:mm");
}

export function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64);
}
