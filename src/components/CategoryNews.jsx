import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import instance from '../utils/axios';
import Card from '../components/Card';
import temp from '/card.png';
import NewsSkeleton from '../components/NewsSkeleton';

const CategoryNews = () => {
  const { category } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategoryNews = async () => {
    try {
      setLoading(true);
      const res = await instance.get(`topstories/v2/${category}.json`, {
        params: {
          'api-key': import.meta.env.VITE_NYT_API_KEY,
        },
      });
      setArticles(res.data.results);
    } catch (err) {
      console.error("Error fetching category news:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryNews();
  }, [category]);

  return (
    <>
    
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-10 px-4 sm:px-8">
      {/* Title */}
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 dark:text-white tracking-tight capitalize">
          {category} News
        </h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400 text-sm sm:text-base">
          Latest top stories curated for you by category.
        </p>
      </div>

      {/* Grid of Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => <NewsSkeleton key={i} />)
          : articles.map((news, index) => (
              <Link
                key={index}
                to={`/news/details/${encodeURIComponent(news.title)}`}
                state={{ news }}
                className="group transition-transform transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-xl"
              >
                <Card
                  title={news.title}
                  description={news.abstract}
                  urlToImage={
                    news.multimedia?.[0]?.url ||
                    news.multimedia?.[1]?.url ||
                    temp
                  }
                  source={news.source}
                  date={news.published_date}
                />
              </Link>
            ))}
      </div>
    </div>
    </>
  );
};

export default CategoryNews;
