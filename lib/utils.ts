import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getDateStringAtTimeZone(
  date: Date | string,
  locale: string,
  timeZone: string,
) {
  return new Date(date).toLocaleDateString(locale, { timeZone });
}

export function getDayOfWeekFromDate(date: Date | string, locale: string) {
  const dayOfWeek = new Date(date).toLocaleDateString(locale, {
    weekday: "short",
  });

  return dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1);
}
