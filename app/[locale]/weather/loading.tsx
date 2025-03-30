import { InfoSkeleton } from "@/components/weather/info-skeleton";
import { WeatherWrapper } from "@/components/weather/wrapper";

export default function Loading() {
  return (
    <WeatherWrapper>
      <InfoSkeleton />
    </WeatherWrapper>
  );
}
