import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export async function fetcher(url: string) {
  return fetch(url).then((res) => res.json());
}

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
