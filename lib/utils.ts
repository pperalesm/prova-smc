import { clsx, type ClassValue } from "clsx";
import { notFound } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { ILocation } from "./interfaces";

export async function fetcher(url: string) {
  return fetch(url).then((res) => res.json());
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function fetchLocationByCode(code: string): Promise<ILocation> {
  const res = await fetch(`http://localhost:5000/locations/${code}`);

  if (!res.ok) {
    if (res.status === 404) {
      notFound();
    }

    throw new Error("Internal Server Error.", { cause: await res.json() });
  }

  return await res.json();
}

export function getDateStringAtTimeZone(
  date: Date | string,
  locale: string,
  timeZone: string,
) {
  return new Date(date).toLocaleDateString(locale, { timeZone });
}
