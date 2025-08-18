import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Newsdetails = () => {
  const { state } = useLocation();
  const news = state?.news;
  const navigate = useNavigate();
  console.log(news);

  if (!news) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white text-center px-6">
        <p className="text-2xl font-semibold mb-4">No news data found.</p>
        <button
          onClick={() => navigate(-1)}
          className="px-5 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full hover:scale-105 transition"
        >
          ← Go Back
        </button>
      </div>
    );
  }

  const mainImage = news.multimedia?.[0]?.url || news.multimedia.default.url || '/card.png';
  const imageCaption = news.multimedia?.[0]?.caption || news.multimedia.caption; 

  const published = new Date(news.published_date || news.pub_date).toLocaleString();
  const updated = news.updated_date && news.updated_date !== news.published_date
    ? new Date(news.updated_date).toLocaleString()
    : null;

  const tags = [...(news.des_facet || []), ...(news.geo_facet || []), ...(news.per_facet || [])];

  return (
    <div className="relative min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white transition-colors duration-300">
      
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 z-50 px-4 py-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-full shadow hover:scale-105 transition"
      >
        ← Back
      </button>

      {/* Hero Banner */}
      <div className="relative w-full h-96 overflow-hidden rounded-b-3xl shadow-md">
        <img
          src={mainImage}
          alt="news"
          className="w-full h-full object-cover brightness-75"
        />
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent text-white">
          <h1 className="text-4xl font-bold">{news.title || news.headline.main}</h1>
          {imageCaption && (
            <p className="mt-2 text-sm text-gray-300 italic">{imageCaption}</p>
          )}
        </div>
      </div>

      {/* Article Body */}
      {/* Article Body */}
<div className="max-w-4xl mx-auto p-6 mt-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl">
  
  {/* Section + Subsection */}
  <div className="flex gap-2 mb-4">
    {(news.section || news.section_name )&& (
      <span className="text-xs bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 px-2 py-1 rounded">
        {news.section || news.section_name}
      </span>
    )}
    {(news.subsection || news.subsection_name)&& (
      <span className="text-xs bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200 px-2 py-1 rounded">
        {news.subsection ||news.subsection_name}
      </span>
    )}
  </div>

  {/* Source + Published Date Row */}
  <div className="flex items-center justify-between mb-2">
    <span className="text-sm bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100 px-3 py-1 rounded-full">
      {news.source || 'NYTimes'}
    </span>
    <div className="text-xs text-gray-500 dark:text-gray-400">
      <p>
        {new Date(news.published_date || news.pub_date).toLocaleDateString()} •{' '}
        {new Date(news.published_date || news.pub_date).toLocaleTimeString()}
      </p>
    </div>
  </div>

  
  {/* Byline */}
  {(news.byline?.original || typeof news.byline === 'string') && (
  <p className="text-sm text-gray-500 dark:text-gray-400 italic mb-4">
    {typeof news.byline === 'string' ? news.byline : news.byline.original}
  </p>
  )}


  {/* Abstract */}
  <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-6">
    {news.abstract}
  </p>

  {/* Tags */}
  {tags.length > 0 && (
    <div className="flex flex-wrap gap-2 mb-6">
      {tags.map((tag, index) => (
        <span
          key={index}
          className="text-xs px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-full"
        >
          {tag}
        </span>
      ))}
    </div>
  )}

  {/* Read Full Article */}
  <a
    href={news.url}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition"
  >
    Read Full Article →
  </a>
</div>

    </div>
  );
};

export default Newsdetails;
