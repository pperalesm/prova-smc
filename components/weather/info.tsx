import { fetchLocationByCode } from "@/lib/utils";
import { getDateStringAtTimeZone } from "@/lib/utils";
import { WeatherExtendedCard } from "./extended-card";

export async function WeatherInfo({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const todayDateString = getDateStringAtTimeZone(
    new Date(),
    "cat",
    "Europe/Madrid",
  );

  console.debug(
    `Rendering WeatherInfo for location ${code} at ${new Date().toISOString().split("T")[1]}`,
  );

  const selectedLocation = await fetchLocationByCode(code);

  return (
    <>
      <p className="text-sm text-muted-foreground w-full h-5">
        {todayDateString
          .split("/")
          .map((s) => s.padStart(2, "0"))
          .join(".")}
      </p>
      <WeatherExtendedCard
        dailyVariable={selectedLocation.dailyVariables[0]}
        title={"Avui"}
        todayDateString={todayDateString}
      />
      <WeatherExtendedCard
        dailyVariable={selectedLocation.dailyVariables[1]}
        title={"Demà"}
        todayDateString={todayDateString}
      />
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
