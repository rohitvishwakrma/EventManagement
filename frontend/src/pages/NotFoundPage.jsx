import React from 'react';
import { Link } from 'react-router-dom';
import { FiAlertCircle, FiHome } from 'react-icons/fi';

const NotFoundPage = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block p-4 bg-red-100 rounded-full mb-6">
          <FiAlertCircle className="h-12 w-12 text-red-600" />
        </div>
        
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
        
        <p className="text-gray-600 mb-8 max-w-md">
          The page you're looking for doesn't exist or has been moved. Please check the URL or navigate back to home.
        </p>
        
        <Link
          to="/"
          className="inline-flex items-center btn-primary"
        >
          <FiHome className="mr-2" />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;