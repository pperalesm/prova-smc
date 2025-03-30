import { WeatherWrapper } from "@/components/weather/wrapper";

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ code: string }>;
}) {
  return <WeatherWrapper params={params}>{children}</WeatherWrapper>;
}
