import { WeatherInfo } from "@/components/weather/info";
import { InfoSkeleton } from "@/components/weather/info-skeleton";
import { Suspense } from "react";

export const dynamic = "force-static";
export const revalidate = 10;

export default function Page({
  params,
}: {
  params: Promise<{
    location: string;
  }>;
}) {
  return (
    <Suspense fallback={<InfoSkeleton />}>
      <WeatherInfo params={params} />
    </Suspense>
  );
}
