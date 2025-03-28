import { toCatalanDateString } from "@/lib/utils";

export async function WeatherInfo({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const dateString = toCatalanDateString(new Date());

  console.debug(
    `Rendering WeatherInfo for location ${code} at ${new Date().toISOString().split("T")[1]}`,
  );

  return (
    <>
      <p className="text-sm text-muted-foreground w-full h-5">{dateString}</p>
      <div className="flex items-center justify-center w-40 h-40 border-b">
        {code}
      </div>
      <div className="flex items-center justify-center w-40 h-40 border-b">
        {code}
      </div>
      <div className="flex items-center justify-center w-25 h-40 border-b">
        {code}
      </div>
      <div className="flex items-center justify-center w-25 h-40 border-b">
        {code}
      </div>
      <div className="flex items-center justify-center w-25 h-40 border-b">
        {code}
      </div>
      <div className="flex items-center justify-center w-25 h-40 border-b">
        {code}
      </div>
      <div className="flex items-center justify-center w-25 h-40 border-b">
        {code}
      </div>
      <div className="flex items-center justify-center w-25 h-40 border-b">
        {code}
      </div>
    </>
  );
}
