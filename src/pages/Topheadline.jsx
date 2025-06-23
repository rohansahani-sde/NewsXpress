import React, { useEffect, useState } from 'react'
import Card from '../components/Card';
import instance from '../utils/axios';
import NewsSkeleton from '../components/NewsSkeleton';
import temp from '/card.png'
import { Link } from 'react-router-dom';

const Topheadline = () => {

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    try {
        setLoading(true);
        const res = await instance.get("topstories/v2/home.json", {
        // const res = await instance.get("news/v3/content/nyt/all.json", {
        params: {
          'api-key': import.meta.env.VITE_NYT_API_KEY, // ✅ secure way (Vite example)
        //   'api-key': '7Q1So3Gn7ZYxGHeJB1E16dsu9xssb5CJ', // ✅ secure way (Vite example)
        },
      });
      setArticles(res.data.results);
    } catch (err) {
      console.error("Error fetching news:", err);
    }finally {
    setLoading(false);
  }
  
  };

  useEffect(() => {
    fetchNews();
  }, []);
    
  return (
    <>
    
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-4 overflow-x-hidden">
        {loading 
        ? Array.from({ length: 6 }).map((_, i) => <NewsSkeleton key={i} />)  : 

        articles.map((news, index) => (
          
          <Link 
          to={`/news/details/${news.title}`}
  key={index}
  state={{ news }}
  className="block" >
    
              
          
        <Card
          key={index}
          title={news.title}
          description={news.abstract}
          urlToImage={news.multimedia?.[0]?.url || news.multimedia?.[1]?.url || temp}
          source={news.source}
          date={news.published_date}
        />
        </Link>

      ))}
        
    </div>

    </>
  )
}

export default Topheadline