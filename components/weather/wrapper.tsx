import { Suspense } from "react";
import { InfoSkeleton } from "@/components/weather/info-skeleton";
import { WeatherInfo } from "@/components/weather/info";

export async function WeatherWrapper({
  ...props
}: {
  searchParams: Promise<{
    location?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const location = searchParams?.location;

  console.debug("Rendering Weather Wrapper at " + new Date().toISOString());

  return (
    <div className="flex flex-wrap justify-center gap-4 w-40 sm:w-84 xl:w-258">
      <Suspense key={location} fallback={<InfoSkeleton />}>
        {location && <WeatherInfo location={location} />}
        {!location && (
          <p className="text-center text-muted-foreground">
            No s&apos;ha seleccionat cap municipi
          </p>
        )}
      </Suspense>
    </div>
  );
}
