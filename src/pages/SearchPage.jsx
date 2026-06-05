import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";
import ArticleGrid from "../components/news/ArticleGrid.jsx";
import PageTransition from "../components/ui/PageTransition.jsx";
import StateBlock from "../components/ui/StateBlock.jsx";
import { useSearchNews } from "../hooks/useNewsQuery.js";

export default function SearchPage() {
  const { search } = useLocation();
  const query = useMemo(() => new URLSearchParams(search).get("q")?.trim() || "", [search]);
  const { articles, loading, loadingMore, error, loadMore } = useSearchNews(query);

  return (
    <PageTransition>
      <section className="container-page py-10">
        <div className="mb-8">
          <p className="eyebrow">Search</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 dark:text-white">
            {query ? `Results for "${query}"` : "Search the archive"}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
            Explore NYTimes articles with cached results and progressive loading.
          </p>
        </div>

        {!query ? (
          <StateBlock title="Start with the search bar" message="Enter a topic in the navigation search field to find related stories." />
        ) : (
          <>
            <ArticleGrid articles={articles} loading={loading} error={error} />
            {articles.length ? (
              <div className="mt-10 flex justify-center">
                <button
                  type="button"
                  onClick={loadMore}
                  disabled={loadingMore}
                  className="inline-flex items-center gap-2 rounded-lg bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-slate-950 dark:hover:bg-blue-200"
                >
                  {loadingMore ? <Loader2 aria-hidden="true" className="animate-spin" size={18} /> : null}
                  {loadingMore ? "Loading" : "Load more"}
                </button>
              </div>
            ) : null}
          </>
        )}
      </section>
    </PageTransition>
  );
}
