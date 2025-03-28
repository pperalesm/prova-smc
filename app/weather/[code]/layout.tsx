import { ILocation } from "@/components/weather/combobox";
import { WeatherWrapper } from "@/components/weather/wrapper";

export default async function Layout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{
    code?: string;
  }>;
}>) {
  const { code } = await params;

  let selectedLocation: ILocation | undefined;

  if (code) {
    const data = await fetch(`http://localhost:5000/locations/${code}`);

    selectedLocation = await data.json();
  }

  return (
    <WeatherWrapper code={code} selectedLocation={selectedLocation}>
      {children}
    </WeatherWrapper>
  );
}
