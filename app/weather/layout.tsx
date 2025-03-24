import { LocationCombobox } from "@/components/weather/combobox";
import { Suspense } from "react";
import { InfoSkeleton } from "@/components/weather/info-skeleton";
import { ComboboxSkeleton } from "@/components/weather/combobox-skeleton";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.debug("Rendering Weather Layout at " + new Date().toISOString());

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <Suspense fallback={<ComboboxSkeleton />}>
        <LocationCombobox></LocationCombobox>
      </Suspense>
      <Suspense fallback={<InfoSkeleton />}>{children}</Suspense>
    </div>
  );
}
