import Link from "next/link";
import { WeatherWrapper } from "@/components/weather/wrapper";
import { useTranslations } from "next-intl";
import { APP } from "@/lib/routes";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const t = useTranslations("WeatherNotFound");

  return (
    <WeatherWrapper>
      <div className="flex flex-col items-center justify-center p-4 gap-4 h-fit">
        <h1 className="text-4xl font-bold">404</h1>
        <p className="text-center text-muted-foreground">{t("notFound")}</p>
        <Button variant={"outline"} asChild>
          <Link href={APP.ROUTES.ROOT} prefetch={true}>
            {t("goHome")}
          </Link>
        </Button>
      </div>
    </WeatherWrapper>
  );
}
