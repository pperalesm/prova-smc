import { TriangleAlertIcon } from "lucide-react";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "../ui/hover-card";
import { IDailyVariable } from "@/lib/interfaces";

export function WeatherCardWarning({
  todayDateString,
  dailyVariable,
}: {
  todayDateString: string;
  dailyVariable: IDailyVariable;
}) {
  const mayContainOutdatedMaxTemperature =
    todayDateString !== dailyVariable.maxTemperatureDeliveryDate;
  const mayContainOutdatedMinTemperature =
    todayDateString !== dailyVariable.minTemperatureDeliveryDate;
  const mayContainOutdatedPrecipitationProbability =
    todayDateString !== dailyVariable.precipitationProbabilityDeliveryDate;

  if (
    !mayContainOutdatedMaxTemperature &&
    !mayContainOutdatedMinTemperature &&
    !mayContainOutdatedPrecipitationProbability
  ) {
    return null;
  }

  return (
    <HoverCard>
      <HoverCardTrigger>
        <TriangleAlertIcon className="size-4 shrink-0 opacity-50 text-warning-foreground" />
      </HoverCardTrigger>
      <HoverCardContent className="p-2 text-sm w-55">
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
