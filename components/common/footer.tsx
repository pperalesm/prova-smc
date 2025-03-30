import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className="p-4">
      <p className="text-end text-sm text-muted-foreground">
        {t("developedBy")}
      </p>
    </footer>
  );
}
