import { WeatherInfo } from "@/components/weather/info";

export default function Page({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  return <WeatherInfo params={params} />;
}
