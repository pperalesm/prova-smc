import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toCatalanDateString(date: Date) {
  return date
    .toLocaleDateString("cat", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      timeZone: "Europe/Madrid",
    })
    .replaceAll("/", ".");
}

export function generateRandomString(length: number = 8) {
  return Math.random()
    .toString(36)
    .slice(2, length + 2);
}
