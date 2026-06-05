import SkeletonGrid from "./SkeletonGrid.jsx";

export default function RouteFallback() {
  return (
    <main className="container-page py-10">
      <div className="mb-8 h-28 animate-pulse rounded-lg bg-slate-200/70 dark:bg-slate-800/70" />
      <SkeletonGrid count={6} />
    </main>
  );
}
