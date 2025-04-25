
import React, { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface SearchBarProps {
  variant?: 'compact' | 'expanded';
  defaultValue?: string;
  className?: string;
}

const SearchBar = ({ variant = 'compact', defaultValue = '', className }: SearchBarProps) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState(defaultValue);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      setIsPopoverOpen(false);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <form onSubmit={handleSearch} className="relative w-full flex items-center">
        <div className="relative w-full flex items-center">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="খুঁজুন"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-10 pr-12 py-2 border-none bg-background/80 backdrop-blur-sm rounded-xl hover:bg-background focus:bg-background transition-all duration-300 shadow-sm ${
              variant === 'expanded' ? 'h-12' : 'h-10'
            }`}
          />
          <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 hover:bg-transparent"
              >
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-60 p-0" align="end">
              <div className="p-2">
                <div className="font-medium text-sm mb-2 px-2 pt-2">অনুসন্ধান বিকল্পসমূহ</div>
                <div className="space-y-1">
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-sm" 
                    onClick={() => navigate('/services')}
                  >
                    সার্ভিস খুঁজুন
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-sm" 
                    onClick={() => navigate('/rentals')}
                  >
                    রেন্টাল খুঁজুন
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-sm" 
                    onClick={() => navigate('/shopping')}
                  >
                    প্রোডাক্ট খুঁজুন
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-sm" 
                    onClick={() => navigate('/stories')}
                  >
                    স্টোরি খুঁজুন
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
