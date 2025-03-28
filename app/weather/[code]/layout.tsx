import { WeatherWrapper } from "@/components/weather/wrapper";
import { ILocation } from "@/lib/interfaces";
import { notFound } from "next/navigation";

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

  const res = await fetch(`http://localhost:5000/locations/${code}`);

  if (!res.ok) {
    if (res.status === 404) {
      notFound();
    }

    throw new Error("Internal Server Error.", { cause: await res.json() });
  }

  const selectedLocation: ILocation = await res.json();

  return (
    <WeatherWrapper selectedLocation={selectedLocation}>
      {children}
    </WeatherWrapper>
  );
}
