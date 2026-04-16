// Utility functions

import { formatDistanceToNowStrict } from "date-fns";

export function timeAgo(dateString: string): string {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "unknown";
    const distance = formatDistanceToNowStrict(date, { addSuffix: false });
    if (distance.includes("0 second")) return "just now";
    return `${distance} ago`;
  } catch {
    return "unknown";
  }
}

export function classNames(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function getERWaitColor(minutes: number | null): string {
  if (minutes === null) return "text-muted";
  if (minutes < 60) return "text-success";
  if (minutes <= 180) return "text-warning";
  return "text-danger";
}

export function getRoadSeverityColor(severity: string): string {
  switch (severity) {
    case "major": return "text-danger";
    case "moderate": return "text-warning";
    case "minor": return "text-success";
    default: return "text-muted";
  }
}

export function getAQHIRisk(value: number): { risk: string; color: string } {
  if (value <= 3) return { risk: "Low", color: "text-success" };
  if (value <= 6) return { risk: "Moderate", color: "text-warning" };
  if (value <= 10) return { risk: "High", color: "text-danger" };
  return { risk: "Very High", color: "text-danger" };
}

export function getUVCategory(value: number): { category: string; color: string } {
  if (value <= 2) return { category: "Low", color: "text-success" };
  if (value <= 5) return { category: "Moderate", color: "text-warning" };
  if (value <= 7) return { category: "High", color: "text-warning" };
  if (value <= 10) return { category: "Very High", color: "text-danger" };
  return { category: "Extreme", color: "text-danger" };
}
