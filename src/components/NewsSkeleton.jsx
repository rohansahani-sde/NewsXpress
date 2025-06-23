import React from 'react'

const NewsSkeleton = () => {
  return (
    <div className="max-w-sm w-full bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 animate-pulse">
      <div className="h-40 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
    </div>
  );
};


export default NewsSkeleton