export default function SkeletonGrid({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="surface overflow-hidden rounded-lg">
          <div className="h-48 animate-pulse bg-slate-200 dark:bg-slate-800" />
          <div className="space-y-3 p-5">
            <div className="h-4 w-24 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
            <div className="h-6 w-full animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
            <div className="h-6 w-4/5 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
            <div className="h-4 w-full animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
            <div className="h-4 w-3/5 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
          </div>
        </div>
      ))}
    </div>
  );
}
