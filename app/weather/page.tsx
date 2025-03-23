import { LocationCombobox } from "@/components/weather/combobox";
import { Suspense } from "react";
import { WeatherSkeleton } from "@/components/weather/skeleton";
import { WeatherInfo } from "@/components/weather/info";
import { WeatherWrapper } from "@/components/weather/wrapper";

export default async function Weather(props: {
  searchParams?: Promise<{
    location?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const location = searchParams?.location;

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <LocationCombobox></LocationCombobox>
      <WeatherWrapper>
        {location && (
          <Suspense key={location} fallback={<WeatherSkeleton />}>
            <WeatherInfo location={location} />
          </Suspense>
        )}
      </WeatherWrapper>
    </div>
  );
}
