import { WeatherWrapper } from "@/components/weather/wrapper";

export default function Page() {
  return (
    <WeatherWrapper>
      <p className="text-center text-muted-foreground">
        No s&apos;ha seleccionat cap municipi
      </p>
    </WeatherWrapper>
  );
}
