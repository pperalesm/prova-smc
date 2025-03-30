import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { APP } from "@/lib/routes";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("Home");

  return (
    <Button variant={"outline"} asChild>
      <Link href={APP.ROUTES.BARCELONA_WEATHER} prefetch={true}>
        {t("start")}
        <ArrowRight />
      </Link>
    </Button>
  );
}
