import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IDailyVariable } from "@/lib/api";
import {
  IWeatherCardWarningProps,
  WeatherCardWarning,
} from "@/components/weather/card-warning";
import { CloudRainWindIcon } from "lucide-react";
import { useTranslations } from "next-intl";

export interface IWeatherExtendedCardProps extends IWeatherCardWarningProps {
  title: string;
  dailyVariable: IDailyVariable;
}

export function WeatherExtendedCard({
  dailyVariable,
  title,
  todayDateString,
}: IWeatherExtendedCardProps) {
  const t = useTranslations("WeatherExtendedCard");

  return (
    <Card className="flex flex-col p-4 gap-4 w-40 h-40 overflow-hidden">
      <CardHeader className="flex justify-between items-center p-0">
        <CardTitle className="text-lg">{title}</CardTitle>
        <WeatherCardWarning
          todayDateString={todayDateString}
          dailyVariable={dailyVariable}
        />
      </CardHeader>
      <CardContent className="flex flex-col gap-3 p-0 items-center justify-center h-full">
        <div className="flex gap-4 justify-center items-center">
          <span className="w-12 text-center bg-red-500 rounded-md">
            {dailyVariable.maxTemperature !== undefined
              ? Math.round(dailyVariable.maxTemperature) + "°C"
              : t("noData")}
          </span>
          <span className="w-12 text-center bg-blue-500 rounded-md">
            {dailyVariable.minTemperature !== undefined
              ? Math.round(dailyVariable.minTemperature) + "°C"
              : t("noData")}
          </span>
        </div>
        <div className="flex gap-1 justify-center items-center">
          <CloudRainWindIcon className="size-6 shrink-0" />
          <span>
            {dailyVariable.precipitationProbability !== undefined
              ? Math.abs(Math.round(dailyVariable.precipitationProbability)) +
                "%"
              : t("noData")}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
