import { Sparkles } from "lucide-react";
import ArticleCard from "../components/news/ArticleCard.jsx";
import ArticleGrid from "../components/news/ArticleGrid.jsx";
import PageTransition from "../components/ui/PageTransition.jsx";
import SkeletonGrid from "../components/ui/SkeletonGrid.jsx";
import StateBlock from "../components/ui/StateBlock.jsx";
import { useTopStories } from "../hooks/useNewsQuery.js";

export default function HomePage() {
  const { data: articles, loading, error } = useTopStories("home");
  const featured = articles[0];
  const remaining = articles.slice(1);

  return (
    <PageTransition>
      <section className="container-page py-8 sm:py-12">
        <div className="glass-panel overflow-hidden rounded-lg px-5 py-8 sm:px-8 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <span className="eyebrow">
                <Sparkles aria-hidden="true" size={14} /> Live briefing
              </span>
              <h1 className="mt-5 max-w-3xl text-4xl font-black leading-[1.05] tracking-tight text-slate-950 dark:text-white sm:text-6xl">
                Signal-first news for fast-moving readers.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
                Curated top stories with clean summaries, category intelligence, and a calmer reading flow.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3 rounded-lg border border-slate-200 bg-white/70 p-3 dark:border-slate-800 dark:bg-slate-950/40">
              {["World", "Markets", "Policy"].map((label, index) => (
                <div key={label} className="rounded-lg bg-slate-100 p-4 dark:bg-white/5">
                  <p className="text-xs font-bold uppercase text-slate-500">{label}</p>
                  <p className="mt-3 text-2xl font-black text-slate-950 dark:text-white">{index + 1}0+</p>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">fresh signals</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container-page">
        {loading ? <SkeletonGrid count={1} /> : null}
        {!loading && error ? <StateBlock type="error" title="Unable to load headlines" message={error} /> : null}
        {!loading && !error && featured ? <ArticleCard article={featured} featured /> : null}
      </section>

      <section className="container-page mt-8">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="eyebrow">Top headlines</p>
            <h2 className="mt-3 text-2xl font-black text-slate-950 dark:text-white">Latest from the newsroom</h2>
          </div>
        </div>
        <ArticleGrid articles={remaining} loading={loading} error={error} />
      </section>
    </PageTransition>
  );
}
