import { notFound } from "next/navigation";

export const API = {
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  ENDPOINTS: {
    LOCATIONS: "/locations",
    LOCATION_BY_CODE: (code: string) => `/locations/${code}`,
  },
  PARAMS: {
    TAKE: (take?: number) => (take ? `take=${take}` : ""),
    PAGE: (page?: number) => (page ? `page=${page}` : ""),
    NAME: (name?: string) => (name ? `name=${name}` : ""),
  },
};

export async function fetchLocationByCode(code: string): Promise<ILocation> {
  let res: Response;

  try {
    res = await fetch(`${API.BASE_URL}${API.ENDPOINTS.LOCATION_BY_CODE(code)}`);
  } catch {
    notFound();
  }

  if (!res.ok) {
    notFound();
  }

  return await res.json();
}

export async function fetcher(url: string) {
  return fetch(url).then((res) => res.json());
}

export interface IDailyVariable {
  dateString: string;
  maxTemperature?: number;
  maxTemperatureDeliveryDate?: string;
  minTemperature?: number;
  minTemperatureDeliveryDate?: string;
  precipitationProbability?: number;
  precipitationProbabilityDeliveryDate?: string;
}

export interface ILocation {
  code: string;
  name: string;
  dailyVariables: IDailyVariable[];
}

export interface IShortLocation {
  code: string;
  name: string;
}

export interface PageMetaDto {
  page: number;
  take: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface PageDto<T> {
  data: T[];
  meta: PageMetaDto;
}
