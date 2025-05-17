
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
    <div className="w-full max-w-md mx-4 relative">
      <form onSubmit={handleSearch} className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input 
          type="text" 
          placeholder="খুঁজুন" 
          className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" 
          value={searchTerm} 
          onChange={e => setSearchTerm(e.target.value)} 
        />
        <Button 
          type="submit" 
          variant="ghost" 
          size="icon" 
          className="absolute right-1 top-1/2 transform -translate-y-1/2"
        >
          <ChevronDown className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};
