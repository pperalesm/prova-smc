import {
  ILocationComboboxProps,
  LocationCombobox,
} from "@/components/weather/combobox";

export interface IWeatherWrapperProps extends ILocationComboboxProps {
  children: React.ReactNode;
}

export function WeatherWrapper({
  children,
  defaultSelectedLocation,
}: IWeatherWrapperProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <LocationCombobox defaultSelectedLocation={defaultSelectedLocation} />
      <div className="flex flex-wrap justify-center gap-4 w-40 sm:w-84 xl:w-258 h-357 sm:h-137 xl:h-49">
        {children}
      </div>
    </div>
  );
}
