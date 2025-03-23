import { toCatalanDateString } from "@/lib/utils";

export function WeatherWrapper({ children }: { children: React.ReactNode }) {
  const dateString = toCatalanDateString(new Date());

  return (
    <div className="flex flex-wrap justify-center gap-4 w-40 h-357 sm:w-84 sm:h-137 xl:w-258 xl:h-49">
      <p className="text-sm text-muted-foreground w-40 h-5 sm:w-84 xl:w-258">
        {dateString}
      </p>
      {children}
      {!children && (
        <p className="h-348 sm:h-128 xl:h-40 text-center text-muted-foreground">
          No s&apos;ha seleccionat cap municipi
        </p>
      )}
    </div>
  );
}
