export const APP = {
  ROUTES: {
    ROOT: "/",
    WEATHER: "/weather",
    WEATHER_BY_CODE: (code: string) => `/weather/${code}`,
    BARCELONA_WEATHER: "/weather/080193",
  },
};
