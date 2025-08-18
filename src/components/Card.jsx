import React from 'react';

const Card = ({ title, description, urlToImage, source, date }) => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-200 dark:border-gray-700">
      {/* Image */}
      {urlToImage && (
        <img
          src={urlToImage}
          alt="news"
          className="w-full h-52 object-cover object-center transition-transform duration-300 hover:scale-105"
        />
      )}

      {/* Content */}
      <div className="p-5 flex flex-col justify-between h-full">
        {/* Title */}
        <h2 className="text-xl font-bold text-gray-800 dark:text-white leading-tight mb-2 line-clamp-2">
          {title}
        </h2>

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {description ? description : 'No description available.'}
        </p>

        {/* Meta Info */}
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-auto">
          <span>{source || 'The New York Times'}</span>
          <span>{new Date(date).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
