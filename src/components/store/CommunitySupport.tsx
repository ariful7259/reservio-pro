
import React from 'react';

const CommunitySupport = () => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
      <h3 className="font-medium mb-2 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
        </svg>
        কমিউনিটি সাপোর্ট
      </h3>
      <p className="text-sm text-gray-600 mb-3">
        আমাদের ফেসবুক কমিউনিটিতে যোগ দিয়ে অন্যান্য ই-কমার্স ব্যবসায়ীদের সাথে যোগাযোগ করুন এবং টিপস শিখুন।
      </p>
      <div className="flex gap-2">
        <button className="text-sm text-blue-600 px-3 py-1 bg-blue-50 rounded-md hover:bg-blue-100">
          <span className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
            </svg>
            ফেসবুক গ্রুপে যোগ দিন
          </span>
        </button>
        <button className="text-sm text-purple-600 px-3 py-1 bg-purple-50 rounded-md hover:bg-purple-100">
          <span className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 10h-2v2h2v6h3v-6h1.82l.18-2h-2v-.833c0-.478.096-.667.558-.667h1.442v-2.5h-2.404c-1.798 0-2.596.792-2.596 2.308v1.692z"/>
            </svg>
            হেল্পডেস্ক
          </span>
        </button>
      </div>
    </div>
  );
};

export default CommunitySupport;
