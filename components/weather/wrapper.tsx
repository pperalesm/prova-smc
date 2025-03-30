import { LocationCombobox } from "@/components/weather/combobox";
import { NextIntlClientProvider } from "next-intl";
import { pick } from "lodash";
import { getMessages } from "next-intl/server";
import { fetchLocationByCode, ILocation } from "@/lib/api";

export interface IWeatherWrapperProps {
  children: React.ReactNode;
  params?: Promise<{
    code: string;
  }>;
}

export async function WeatherWrapper({
  children,
  params,
}: IWeatherWrapperProps) {
  const { code } = (await params) ?? {};

  const messages = await getMessages();

  let defaultSelectedLocation: ILocation | undefined;

  if (code) {
    defaultSelectedLocation = await fetchLocationByCode(code);
  }

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
