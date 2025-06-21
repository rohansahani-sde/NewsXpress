import React, { useEffect, useState } from 'react'
import Card from './Card';
import instance from '../utils/axios';

const Topheadline = () => {

    const [articles, setArticles] = useState([]);

  const fetchNews = async () => {
    try {
      const res = await instance.get("topstories/v2/home.json", {
        params: {
        //   'api-key': import.meta.env.VITE_NYT_API_KEY, // ✅ secure way (Vite example)
          'api-key': '7Q1So3Gn7ZYxGHeJB1E16dsu9xssb5CJ', // ✅ secure way (Vite example)
        },
      });
      setArticles(res.data.results);
    } catch (err) {
      console.error("Error fetching news:", err);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);
    
  return (
    <>

    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-4 overflow-x-hidden">
      {articles.map((news, index) => (
        <Card
          key={index}
          title={news.title}
          description={news.abstract}
          urlToImage={news.multimedia?.[0]?.url}
          source={news.source}
          date={news.published_date}
        />
      ))}
    </div>

    </>
  )
}

export default Topheadline