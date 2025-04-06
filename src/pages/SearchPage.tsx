
import React from 'react';
import SearchBar from '@/components/SearchBar';

const SearchPage = () => {
  return (
    <div className="container px-4 pt-24 pb-24">
      <h1 className="text-2xl font-bold mb-6">অনুসন্ধান করুন</h1>
      
      <SearchBar variant="expanded" />
    </div>
  );
};

export default SearchPage;
