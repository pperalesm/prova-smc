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
