import { WeatherWrapper } from "@/components/weather/wrapper";
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations("WeatherPage");

  return (
    <WeatherWrapper>
      <p className="text-center text-muted-foreground">
        {t("noLocationSelected")}
      </p>
    </WeatherWrapper>
  );
}
