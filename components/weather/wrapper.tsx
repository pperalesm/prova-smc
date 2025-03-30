import {
  ILocationComboboxProps,
  LocationCombobox,
} from "@/components/weather/combobox";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { pick } from "lodash";

export interface IWeatherWrapperProps extends ILocationComboboxProps {
  children: React.ReactNode;
}

export function WeatherWrapper({
  children,
  defaultSelectedLocation,
}: IWeatherWrapperProps) {
  const messages = useMessages();

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <NextIntlClientProvider messages={pick(messages, "LocationCombobox")}>
        <LocationCombobox defaultSelectedLocation={defaultSelectedLocation} />
      </NextIntlClientProvider>
      <div className="flex flex-wrap justify-center gap-4 w-40 sm:w-84 xl:w-258 h-357 sm:h-137 xl:h-49">
        {children}
      </div>
    </div>
  );
}
