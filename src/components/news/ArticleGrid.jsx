import ArticleCard from "./ArticleCard.jsx";
import SkeletonGrid from "../ui/SkeletonGrid.jsx";
import StateBlock from "../ui/StateBlock.jsx";

export default function ArticleGrid({ articles, loading, error }) {
  if (loading) return <SkeletonGrid count={6} />;

  if (error) {
    return <StateBlock type="error" title="Unable to load stories" message={error} />;
  }

  if (!articles.length) {
    return <StateBlock title="No stories found" message="Try a different category or search phrase." />;
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 content-visibility-auto">
      {articles.map((article, index) => (
        <ArticleCard key={article.id} article={article} index={index} />
      ))}
    </div>
  );
}
