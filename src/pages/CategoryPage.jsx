import { useParams } from "react-router-dom";
import ArticleGrid from "../components/news/ArticleGrid.jsx";
import PageTransition from "../components/ui/PageTransition.jsx";
import { CATEGORIES } from "../lib/constants.js";
import { titleCase } from "../lib/formatters.js";
import { useTopStories } from "../hooks/useNewsQuery.js";

export default function CategoryPage() {
  const { category = "world" } = useParams();
  const label = CATEGORIES.find((item) => item.value === category)?.label || titleCase(category);
  const { data: articles, loading, error } = useTopStories(category);

  return (
    <PageTransition>
      <section className="container-page py-10">
        <div className="mb-8">
          <p className="eyebrow">Category desk</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 dark:text-white">{label} News</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
            The latest {label.toLowerCase()} coverage, normalized into a consistent dashboard experience.
          </p>
        </div>
        <ArticleGrid articles={articles} loading={loading} error={error} />
      </section>
    </PageTransition>
  );
}
