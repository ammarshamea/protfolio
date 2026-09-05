import { Skeleton } from "@/components/ui/skeleton";

export default function LocaleLoading() {
  return (
    <div className="mx-auto max-w-6xl space-y-6 px-6 pb-20 pt-16 sm:pt-20">
      <Skeleton className="h-10 w-2/3" />
      <Skeleton className="h-5 w-1/2" />
      <div className="grid gap-6 pt-10 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-64 w-full rounded-2xl" />
        ))}
      </div>
    </div>
  );
}
