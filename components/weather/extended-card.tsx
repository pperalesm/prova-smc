import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IDailyVariable } from "@/lib/interfaces";
import { WeatherCardWarning } from "./card-warning";

export function WeatherExtendedCard({
  dailyVariable,
  title,
  todayDateString,
}: {
  dailyVariable: IDailyVariable;
  title: string;
  todayDateString: string;
}) {
  return (
    <Card className="flex flex-col p-4 gap-4 w-40 h-40 overflow-hidden">
      <CardHeader className="flex justify-between p-0">
        <CardTitle>{title}</CardTitle>
        <WeatherCardWarning
          todayDateString={todayDateString}
          dailyVariable={dailyVariable}
        />
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5"></div>
            <div className="flex flex-col space-y-1.5"></div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
