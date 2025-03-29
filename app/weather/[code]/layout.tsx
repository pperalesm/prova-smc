import { WeatherWrapper } from "@/components/weather/wrapper";
import { fetchLocationByCode } from "@/lib/utils";

export default async function Layout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{
    code: string;
  }>;
}>) {
  const { code } = await params;

  const selectedLocation = await fetchLocationByCode(code);

  return (
    <WeatherWrapper selectedLocation={selectedLocation}>
      {children}
    </WeatherWrapper>
  );
}
