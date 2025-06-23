import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import instance from '../utils/axios';
import Card from '../components/Card';
import temp from '/card.png';
import NewsSkeleton from '../components/NewsSkeleton';
import { Link } from 'react-router-dom';

const CategoryNews = () => {
  const { category } = useParams(); // 🧠 dynamic category from URL
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
  }, [category]); // Refetch when category changes

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 capitalize">{category} News</h1>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => <NewsSkeleton key={i} />)
          : articles.map((news, index) => (
              <Link
                // to={`/news/details/${news.title}`}
                to={`/news/details/${encodeURIComponent(news.title)}`}

                key={index}
                state={{ news }}
                className="block"
              >
                <Card
                  title={news.title}
                  description={news.abstract}
                  urlToImage={
                    news.multimedia?.[0]?.url || news.multimedia?.[1]?.url || temp
                  }
                  source={news.source}
                  date={news.published_date}
                />
              </Link>
            ))}
      </div>
    </div>
  );
};

export default CategoryNews;
