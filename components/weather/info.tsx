import { toCatalanDateString } from "@/lib/utils";

export async function WeatherInfo({
  params,
}: {
  params: Promise<{ location: string }>;
}) {
  const { location } = await params;
  const dateString = toCatalanDateString(new Date());

  await new Promise((resolve) => setTimeout(resolve, 1000));

  console.debug("Rendering " + location + " at " + new Date().toISOString());

  return (
    <>
      <p className="text-sm text-muted-foreground w-full h-5">{dateString}</p>
      <div className="flex items-center justify-center w-40 h-40 border-b">
        {location}
      </div>
      <div className="flex items-center justify-center w-40 h-40 border-b">
        {location}
      </div>
      <div className="flex items-center justify-center w-25 h-40 border-b">
        {location}
      </div>
      <div className="flex items-center justify-center w-25 h-40 border-b">
        {location}
      </div>
      <div className="flex items-center justify-center w-25 h-40 border-b">
        {location}
      </div>
      <div className="flex items-center justify-center w-25 h-40 border-b">
        {location}
      </div>
      <div className="flex items-center justify-center w-25 h-40 border-b">
        {location}
      </div>
      <div className="flex items-center justify-center w-25 h-40 border-b">
        {location}
      </div>
    </>
  );
}
