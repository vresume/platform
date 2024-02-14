import { Skeleton } from "~/common/components/ui/skeleton"

export function LoadingSkeleton() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
    </div>
  );
}