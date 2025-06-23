import React, { useEffect, useState } from 'react'
import instance from '../utils/axios';
import { Link, useLocation } from 'react-router-dom';
import Card from './Card';
import NewsSkeleton from './NewsSkeleton';
import temp from '/card.png';

const Search = () => {

    const { search } = useLocation();
    const [loading, setLoading] = useState(true);
    const[articles, setArticles] = useState([]);

    // get query from url
    const query = new URLSearchParams(search).get('q');

    // fetch data from api
    const fetchSearchNews = async () => {
        try {
            setLoading(true);
            const res = await instance.get(`/search/v2/articlesearch.json`, {
                params: {
                    'api-key': import.meta.env.VITE_NYT_API_KEY,
                    'q': query,
                },
            });
            setArticles(res.data.response.docs || []);
        } catch (err) {
            console.error("Error fetching category news:", err);
        } finally {
            setLoading(false);
        }
    };

  useEffect(() => {
    if(query) fetchSearchNews();
  }, [query]);
    
    
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 capitalize">Results for: <span className='text-[#fcd133]'>{query}</span>  </h1>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => <NewsSkeleton key={i} />)
          : articles.map((news, index) => (
              <Link
                // to={`/news/details/${news.title}`}
                to={`/news/details/${encodeURIComponent(news.headline.main)}`}

                key={index}
                state={{ news }}
                className="block"
              >
                <Card
                  title={news.headline.main}
                  description={news.snippet}
                  urlToImage={
                    news.multimedia?.default?.url || news.multimedia?.thumbnail?.url || temp
                  }
                  source={news.source}
                  date={news.pub_date}
                />
              </Link>
            ))}
      </div>
    </div>
  )
}

export default Search