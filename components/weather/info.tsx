import { toCatalanDateString } from "@/lib/utils";

export async function WeatherInfo({ location }: { location: string }) {
  const dateString = toCatalanDateString(new Date());

  await new Promise((resolve) => setTimeout(resolve, 1000));

  console.debug("Rendering Weather Info at " + new Date().toISOString());

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
