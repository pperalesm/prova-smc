import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { CATALAN_LOCALE } from "@/lib/constants";

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

export function getDayOfWeekFromDate(date: Date | string) {
  const dayOfWeek = new Date(date).toLocaleDateString(CATALAN_LOCALE, {
    weekday: "short",
  });

  return dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1);
}
