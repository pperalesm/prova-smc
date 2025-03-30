import { getDateStringAtTimeZone } from "@/lib/utils";
import { WeatherExtendedCard } from "@/components/weather/extended-card";
import { WeatherCompressedCard } from "@/components/weather/compressed-card";
import { fetchLocationByCode } from "@/lib/api";
import { CATALAN_LOCALE, SPAIN_TIMEZONE } from "@/lib/constants";
import { getTranslations } from "next-intl/server";

export interface IWeatherInfoProps {
  params: Promise<{ code: string }>;
}

export async function WeatherInfo({ params }: IWeatherInfoProps) {
  const { code } = await params;
  const t = await getTranslations("WeatherInfo");

  console.debug(
    `Rendering WeatherInfo for location ${code} at ${new Date().toISOString().split("T")[1]}`,
  );

  const todayDateString = getDateStringAtTimeZone(
    new Date(),
    CATALAN_LOCALE,
    SPAIN_TIMEZONE,
  );

  const selectedLocation = await fetchLocationByCode(code);

  return (
    <>
      <p className="text-sm text-muted-foreground w-full h-5">
        {todayDateString
          .split("/")
          .map((s) => s.padStart(2, "0"))
          .join(".")}
      </p>
      <WeatherExtendedCard
        dailyVariable={selectedLocation.dailyVariables[0]}
        title={t("today")}
        todayDateString={todayDateString}
        key={selectedLocation.dailyVariables[0].dateString}
      />
      <WeatherExtendedCard
        dailyVariable={selectedLocation.dailyVariables[1]}
        title={t("tomorrow")}
        todayDateString={todayDateString}
        key={selectedLocation.dailyVariables[1].dateString}
      />
      {selectedLocation.dailyVariables.slice(2).map((dailyVariable) => (
        <WeatherCompressedCard
          dailyVariable={dailyVariable}
          todayDateString={todayDateString}
          key={dailyVariable.dateString}
        />
      ))}
    </>
  );
}
