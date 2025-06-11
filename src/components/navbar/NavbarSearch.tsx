
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const NavbarSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      console.log(`Searching for: ${searchTerm}`);
    }
  };

  return (
    <div className="w-full relative">
      <form onSubmit={handleSearch} className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 md:h-5 md:w-5 text-gray-400" />
        <input 
          type="text" 
          placeholder="খুঁজুন" 
          className="w-full pl-9 md:pl-10 pr-10 md:pr-12 py-2 md:py-2.5 text-sm md:text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" 
          value={searchTerm} 
          onChange={e => setSearchTerm(e.target.value)} 
        />
        <Button 
          type="submit" 
          variant="ghost" 
          size="icon" 
          className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 md:h-9 md:w-9"
        >
          <ChevronDown className="h-3 w-3 md:h-4 md:w-4" />
        </Button>
      </form>
    </div>
  );
};
