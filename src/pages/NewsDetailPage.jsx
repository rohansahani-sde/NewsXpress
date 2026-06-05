import { useEffect, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Clock, Tag } from "lucide-react";
import PageTransition from "../components/ui/PageTransition.jsx";
import StateBlock from "../components/ui/StateBlock.jsx";
import { ARTICLE_STORAGE_KEY } from "../lib/constants.js";
import { formatDateTime } from "../lib/formatters.js";

function getStoredArticle() {
  try {
    const stored = sessionStorage.getItem(ARTICLE_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export default function NewsDetailPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const article = useMemo(() => state?.article || getStoredArticle(), [state]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  if (!article) {
    return (
      <PageTransition>
        <section className="container-page py-16">
          <StateBlock
            title="Story context expired"
            message="Open a story from a headline card so the article detail page has the full NYTimes payload."
            action={
              <Link className="rounded-lg bg-slate-950 px-5 py-3 text-sm font-black text-white dark:bg-white dark:text-slate-950" to="/">
                Back to headlines
              </Link>
            }
          />
        </section>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <article>
        <section className="relative min-h-[62vh] overflow-hidden">
          <img src={article.image} alt={article.title} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/58 to-slate-950/10" />
          <div className="container-page relative flex min-h-[62vh] flex-col justify-end pb-10 pt-24 text-white">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="mb-auto inline-flex w-fit items-center gap-2 rounded-lg bg-white/12 px-4 py-2 text-sm font-bold backdrop-blur transition hover:bg-white/20"
            >
              <ArrowLeft aria-hidden="true" size={16} /> Back
            </button>
            <div className="max-w-4xl">
              <div className="mb-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-black uppercase backdrop-blur">{article.section}</span>
                {article.subsection ? <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-black uppercase backdrop-blur">{article.subsection}</span> : null}
              </div>
              <h1 className="text-4xl font-black leading-tight sm:text-6xl">{article.title}</h1>
              {article.imageCaption ? <p className="mt-4 max-w-2xl text-sm text-slate-300">{article.imageCaption}</p> : null}
            </div>
          </div>
        </section>

        <section className="container-page py-10">
          <div className="grid gap-6 lg:grid-cols-[0.72fr_0.28fr]">
            <div className="surface rounded-lg p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-3 text-sm font-bold text-slate-500 dark:text-slate-400">
                <span>{article.source}</span>
                <span>{formatDateTime(article.date)}</span>
                <span className="inline-flex items-center gap-1">
                  <Clock aria-hidden="true" size={16} /> {article.readTime ?? 1} min read
                </span>
              </div>
              {article.byline ? <p className="mt-4 text-sm font-bold text-slate-700 dark:text-slate-300">{article.byline}</p> : null}
              <p className="mt-6 text-lg leading-8 text-slate-700 dark:text-slate-300">{article.description}</p>
              {article.url ? (
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center gap-2 rounded-lg bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-blue-700 dark:bg-white dark:text-slate-950 dark:hover:bg-blue-200"
                >
                  Read full article <ArrowUpRight aria-hidden="true" size={18} />
                </a>
              ) : null}
            </div>

            <aside className="surface h-fit rounded-lg p-6">
              <h2 className="flex items-center gap-2 text-sm font-black uppercase text-slate-950 dark:text-white">
                <Tag aria-hidden="true" size={16} /> Signals
              </h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {article.tags?.length ? (
                  article.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600 dark:bg-white/10 dark:text-slate-300">
                      {tag}
                    </span>
                  ))
                ) : (
                  <p className="text-sm text-slate-500 dark:text-slate-400">No extra tags were provided for this story.</p>
                )}
              </div>
            </aside>
          </div>
        </section>
      </article>
    </PageTransition>
  );
}
