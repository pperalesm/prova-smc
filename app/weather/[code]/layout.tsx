import { WeatherWrapper } from "@/components/weather/wrapper";
import { fetchLocationByCode } from "@/lib/api";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{
    code: string;
  }>;
}) {
  const { code } = await params;

  const defaultSelectedLocation = await fetchLocationByCode(code);

  return (
    <WeatherWrapper defaultSelectedLocation={defaultSelectedLocation}>
      {children}
    </WeatherWrapper>
  );
}
