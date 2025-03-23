import { Skeleton } from "@/components/ui/skeleton";

export function WeatherSkeleton() {
  return (
    <>
      <Skeleton className="rounded-md w-40 h-40" />
      <Skeleton className="rounded-md w-40 h-40" />
      <Skeleton className="rounded-md w-25 h-40" />
      <Skeleton className="rounded-md w-25 h-40" />
      <Skeleton className="rounded-md w-25 h-40" />
      <Skeleton className="rounded-md w-25 h-40" />
      <Skeleton className="rounded-md w-25 h-40" />
      <Skeleton className="rounded-md w-25 h-40" />
    </>
  );
}
