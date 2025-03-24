import { Skeleton } from "@/components/ui/skeleton";

export function InfoSkeleton() {
  return (
    <>
      <div className="w-full">
        <Skeleton className="rounded-md w-40 h-5"></Skeleton>
      </div>
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
