import { TriangleAlertIcon } from "lucide-react";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";
import { IDailyVariable } from "@/lib/api";

export interface IWeatherCardWarningProps {
  todayDateString: string;
  dailyVariable: IDailyVariable;
}

export function WeatherCardWarning({
  todayDateString,
  dailyVariable,
}: IWeatherCardWarningProps) {
  const mayContainOutdatedMaxTemperature =
    dailyVariable.maxTemperature !== undefined &&
    todayDateString !== dailyVariable.maxTemperatureDeliveryDate;
  const mayContainOutdatedMinTemperature =
    dailyVariable.minTemperature !== undefined &&
    todayDateString !== dailyVariable.minTemperatureDeliveryDate;
  const mayContainOutdatedPrecipitationProbability =
    dailyVariable.precipitationProbability !== undefined &&
    todayDateString !== dailyVariable.precipitationProbabilityDeliveryDate;

  if (
    !mayContainOutdatedMaxTemperature &&
    !mayContainOutdatedMinTemperature &&
    !mayContainOutdatedPrecipitationProbability
  ) {
    return null;
  }

  return (
    <HoverCard openDelay={0} closeDelay={300}>
      <HoverCardTrigger>
        <TriangleAlertIcon className="size-4 shrink-0 opacity-50 text-warning-foreground" />
      </HoverCardTrigger>
      <HoverCardContent side="top" className="p-4 text-sm w-60">
        <p>Les següents dades poden estar desactualitzades:</p>
        <br />
        <ul className="list-disc list-inside ml-3">
          {mayContainOutdatedMaxTemperature && <li>Temperatura màxima</li>}
          {mayContainOutdatedMinTemperature && <li>Temperatura mínima</li>}
          {mayContainOutdatedPrecipitationProbability && (
            <li>Probabilitat de precipitació</li>
          )}
        </ul>
      </HoverCardContent>
    </HoverCard>
  );
}
