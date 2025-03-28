import { ILocation, LocationCombobox } from "./combobox";

export function WeatherWrapper({
  children,
  code,
  selectedLocation,
}: {
  children: React.ReactNode;
  code?: string;
  selectedLocation?: ILocation;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <LocationCombobox
        code={code}
        defaultSelectedLocation={selectedLocation}
      />
      <div className="flex flex-wrap justify-center gap-4 w-40 sm:w-84 xl:w-258 h-357 sm:h-137 xl:h-49">
        {children}
      </div>
    </div>
  );
}
