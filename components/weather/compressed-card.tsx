import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  IWeatherCardWarningProps,
  WeatherCardWarning,
} from "@/components/weather/card-warning";
import { getDayOfWeekFromDate } from "@/lib/utils";
import { IDailyVariable } from "@/lib/api";

export interface IWeatherCompressedCardProps extends IWeatherCardWarningProps {
  dailyVariable: IDailyVariable;
}

export function WeatherCompressedCard({
  dailyVariable,
  todayDateString,
}: IWeatherCompressedCardProps) {
  const title = getDayOfWeekFromDate(
    dailyVariable.dateString.split("/").reverse().join("-"),
  );

  return (
    <Card className="flex flex-col p-4 gap-4 w-25 h-40 overflow-hidden">
      <CardHeader className="flex justify-between items-center p-0">
        <CardTitle className="text-lg">{title}</CardTitle>
        <WeatherCardWarning
          todayDateString={todayDateString}
          dailyVariable={dailyVariable}
        />
      </CardHeader>
      <CardContent className="flex flex-col gap-2 p-0 items-center justify-center h-full text-sm">
        <span className="text-red-500">
          {dailyVariable.maxTemperature !== undefined
            ? Math.round(dailyVariable.maxTemperature) + "°C"
            : "s/d"}
        </span>
        <span className="text-blue-500">
          {dailyVariable.minTemperature !== undefined
            ? Math.round(dailyVariable.minTemperature) + "°C"
            : "s/d"}
        </span>
        <span>
          {dailyVariable.precipitationProbability !== undefined
            ? Math.abs(Math.round(dailyVariable.precipitationProbability)) + "%"
            : "s/d"}
        </span>
      </CardContent>
    </Card>
  );
}
