import { memo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { ARTICLE_STORAGE_KEY } from "../../lib/constants.js";
import { formatDate } from "../../lib/formatters.js";

const MotionArticle = motion.article;

function ArticleCard({ article, featured = false, index = 0 }) {
  const handleClick = () => {
    sessionStorage.setItem(ARTICLE_STORAGE_KEY, JSON.stringify(article));
  };

  return (
    <MotionArticle
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.035, 0.28), duration: 0.28, ease: "easeOut" }}
      className={`group surface h-full overflow-hidden rounded-lg transition duration-300 hover:-translate-y-1 hover:shadow-2xl ${
        featured ? "grid md:grid-cols-[1.15fr_0.85fr]" : ""
      }`}
    >
      <Link
        to={`/news/details/${encodeURIComponent(article.title)}`}
        state={{ article }}
        onClick={handleClick}
        className="block h-full focus:outline-none"
        aria-label={`Read ${article.title}`}
      >
        <div className={featured ? "grid h-full md:grid-cols-[1.15fr_0.85fr]" : "flex h-full flex-col"}>
          <div className={featured ? "min-h-[300px] overflow-hidden" : "aspect-[16/10] overflow-hidden"}>
            <img
              src={article.image}
              alt={article.title}
              loading={featured ? "eager" : "lazy"}
              decoding="async"
              className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
            />
          </div>
          <div className="flex flex-1 flex-col p-5 sm:p-6">
            <div className="mb-4 flex flex-wrap items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400">
              <span className="rounded-full bg-blue-500/10 px-2.5 py-1 text-blue-700 dark:text-blue-300">{article.section}</span>
              <span>{formatDate(article.date)}</span>
              <span>{article.readTime ?? 1} min read</span>
            </div>
            <h2 className={`${featured ? "text-3xl" : "text-xl"} font-black leading-tight text-slate-950 dark:text-white`}>
              {article.title}
            </h2>
            <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600 dark:text-slate-400">{article.description}</p>
            <div className="mt-auto flex items-center justify-between pt-6 text-sm font-bold text-slate-700 dark:text-slate-200">
              <span>{article.source}</span>
              <span className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-300">
                Open <ArrowUpRight aria-hidden="true" size={16} />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </MotionArticle>
  );
}

export default memo(ArticleCard);
