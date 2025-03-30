import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";

export default getRequestConfig(async ({ locale }) => {
  locale =
    locale && hasLocale(routing.locales, locale)
      ? locale
      : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`@/messages/${locale}.json`)).default,
  };
});
