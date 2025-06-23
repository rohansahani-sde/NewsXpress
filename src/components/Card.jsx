import React from 'react';
import { data, Link } from 'react-router-dom';

const Card = ({ title, description, urlToImage, source, date }) => {
  return (
    <>
    {/* <Link to={`/news/${data.title}`} 
    state={{data}}
    > */}
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300 dark:bg-gray-800">
      {urlToImage && (
        <img
          className="h-48 w-full object-cover"
          src={urlToImage}
          alt="news"
        />
      )}
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{title}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
          {description ? description.slice(0, 100) + '...' : 'No description available.'}
        </p>
        <div className="text-xs text-gray-500 dark:text-gray-400 flex justify-between items-center">
          <span>{source}</span>
          <span>{new Date(date).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
    {/* </Link> */}
    
    </>
  );
};

export default Card;
