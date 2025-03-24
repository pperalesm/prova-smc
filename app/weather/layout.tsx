import { LocationCombobox } from "@/components/weather/combobox";
import { Suspense } from "react";
import { ComboboxSkeleton } from "@/components/weather/combobox-skeleton";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <Suspense fallback={<ComboboxSkeleton />}>
        <LocationCombobox></LocationCombobox>
      </Suspense>
      <div className="flex flex-wrap justify-center gap-4 w-40 sm:w-84 xl:w-258 h-357 sm:h-137 xl:h-49">
        {children}
      </div>
    </div>
  );
}
