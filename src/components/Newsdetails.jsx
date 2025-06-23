import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Home from './Home';

const Newsdetails = () => {
  const { state } = useLocation();
  const news = state?.news;
  const navigate = useNavigate();

  if (!news) {
    return (
      <div className="text-center p-4">
        <p>No news data found.</p>
        <button onClick={() => navigate(-1)} className="text-blue-500 underline mt-2">Go Back</button>
      </div>
    );
  }

  return (
    <>
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{news.title}</h1>
      <img
        src={news.multimedia?.[0]?.url || news.multimedia?.[1]?.url || '/card.png'}
        alt="news"
        className="w-full h-96 object-cover rounded-lg mb-4"
      />
      <p className="text-gray-700 mb-2">{news.abstract}</p>
      <p className="text-sm text-gray-500">Source: {news.source}</p>
      <p className="text-sm text-gray-500">Published: {new Date(news.published_date).toLocaleDateString()}</p>
      <p className="text-sm text-gray-500">Time: {new Date(news.published_date).toLocaleTimeString()}</p>
      <a href={news.url} target="_blank" className="text-blue-600 underline mt-4 inline-block">
        Read Full Article on NYT
      </a>
    </div>
    {/* <Home /> */}
    </>
  );
};

export default Newsdetails;
