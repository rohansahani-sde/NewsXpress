import React, { useEffect, useState } from 'react';
import instance from '../utils/axios';
import { Link, useLocation } from 'react-router-dom';
import Card from './Card';
import NewsSkeleton from './NewsSkeleton';
import temp from '/card.png';

const Search = () => {
  const { search } = useLocation();
  const [loading, setLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(0);

  const query = new URLSearchParams(search).get('q');

  const fetchSearchNews = async () => {
    try {
      if (page === 0) setLoading(true);
      else setIsLoadingMore(true);

      const res = await instance.get(`/search/v2/articlesearch.json`, {
        params: {
          'api-key': import.meta.env.VITE_NYT_API_KEY,
          'page': page,
          'q': query,
        },
      });

      setArticles(prev => [...prev, ...(res.data.response.docs || [])]);
    } catch (err) {
      console.error("Error fetching search results:", err);
    } finally {
      setLoading(false);
      setIsLoadingMore(false);
    }
  };

  useEffect(() => {
    if (query) {
      setArticles([]);
      setPage(0);
    }
  }, [query]);

  useEffect(() => {
    if (query) fetchSearchNews();
  }, [page, query]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-10 px-4 sm:px-8">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800 dark:text-white tracking-tight">
          Search Results for: <span className="text-yellow-400">{query}</span>
        </h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400 text-sm sm:text-base">
          News articles related to your search query.
        </p>
      </div>

      {/* Grid of Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => <NewsSkeleton key={i} />)
          : articles.map((news, index) => (
              <Link
                to={`/news/details/${encodeURIComponent(news.headline.main)}`}
                key={index}
                state={{ news }}
                className="group transition-transform transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-xl"
              >
                <Card
                  title={news.headline.main}
                  description={news.snippet}
                  urlToImage={
                    news.multimedia?.default?.url ||
                    news.multimedia?.thumbnail?.url ||
                    temp
                  }
                  source={news.source}
                  date={news.pub_date}
                />
              </Link>
            ))}
      </div>

      {/* Load More Button */}
      {articles.length > 0 && (
        <div className="flex justify-center my-10">
          <button
            onClick={() => setPage(page + 1)}
            disabled={isLoadingMore}
            className={`px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-semibold rounded-full shadow-md transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 active:scale-95 ${
              isLoadingMore ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 hover:shadow-lg'
            }`}
          >
            {isLoadingMore ? 'Loading...' : 'Load More →'}
          </button>
        </div>
      )}
    </div>
  );
};

export default Search;
