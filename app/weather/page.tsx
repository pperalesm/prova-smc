import { WeatherWrapper } from "@/components/weather/wrapper";

export const revalidate = 60;

export default function Page({
  searchParams,
}: {
  searchParams: Promise<{
    location?: string;
  }>;
}) {
  console.debug("Rendering Weather Page at " + new Date().toISOString());

  return <WeatherWrapper searchParams={searchParams} />;
}
