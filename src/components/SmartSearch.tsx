
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Mic, MicOff, History, Sparkles, X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { useApp } from '@/context/AppContext';
import VoiceSearch from '@/components/VoiceSearch';

interface SmartSearchProps {
  className?: string;
  placeholder?: string;
  showVoice?: boolean;
  showTrending?: boolean;
}

interface SearchResult {
  id: string;
  title: string;
  type: 'service' | 'product' | 'rental' | 'community';
  category?: string;
}

const SmartSearch: React.FC<SmartSearchProps> = ({
  className = '',
  placeholder,
  showVoice = true,
  showTrending = true
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { language, isOnline } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  
  // Mock search results based on search term
  const getSearchResults = (term: string): SearchResult[] => {
    if (!term) return [];
    
    // This would typically be an API call in a real application
    const mockResults: SearchResult[] = [
      { id: '1', title: 'হোম ক্লিনিং সার্ভিস', type: 'service', category: 'ক্লিনিং' },
      { id: '2', title: 'স্মার্ট হোম ডিভাইস', type: 'product', category: 'ইলেকট্রনিক্স' },
      { id: '3', title: 'লাক্সারি অ্যাপার্টমেন্ট রেন্টাল', type: 'rental', category: 'রিয়েল এস্টেট' },
      { id: '4', title: 'টেক কমিউনিটি মিটআপ', type: 'community', category: 'ইভেন্ট' },
    ];
    
    return mockResults.filter(result => 
      result.title.toLowerCase().includes(term.toLowerCase())
    );
  };
  
  const searchResults = getSearchResults(searchTerm);
  
  // Mock trending searches
  const trendingSearches = [
    'অ্যাপার্টমেন্ট রেন্টাল',
    'প্লাম্বিং সার্ভিস',
    'রেস্টুরেন্ট বুকিং',
    'লাইফ কোচিং',
    'ডিজিটাল মার্কেটিং'
  ];
  
  // Load recent searches from localStorage
  useEffect(() => {
    const savedSearches = localStorage.getItem('recentSearches');
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
  }, []);
  
  // Save recent searches to localStorage
  const saveSearch = (term: string) => {
    if (!term) return;
    
    const updatedSearches = [
      term,
      ...recentSearches.filter(s => s !== term)
    ].slice(0, 5);
    
    setRecentSearches(updatedSearches);
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
  };
  
  const handleSearch = (term: string) => {
    if (!term.trim()) return;
    
    saveSearch(term);
    navigate(`/search?q=${encodeURIComponent(term)}`);
    setShowResults(false);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchTerm);
  };
  
  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
    toast({
      description: language === 'bn' ? "সাম্প্রতিক অনুসন্ধান হিস্টোরি মুছে ফেলা হয়েছে" : "Recent search history cleared",
    });
  };
  
  const handleClickOutside = (event: MouseEvent) => {
    if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
      setShowResults(false);
    }
  };
  
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const handleResultClick = (result: SearchResult) => {
    saveSearch(result.title);
    
    switch(result.type) {
      case 'service':
        navigate(`/services/${result.id}`);
        break;
      case 'product':
        navigate(`/shopping/product/${result.id}`);
        break;
      case 'rental':
        navigate(`/rent-anything/?item=${result.id}`);
        break;
      case 'community':
        navigate(`/community/events?id=${result.id}`);
        break;
      default:
        navigate(`/search?q=${encodeURIComponent(result.title)}`);
    }
    
    setShowResults(false);
  };
  
  return (
    <div ref={searchContainerRef} className={`relative w-full ${className}`}>
      {showVoice ? (
        <VoiceSearch 
          onSearch={handleSearch}
          placeholder={placeholder || (language === 'bn' ? 'সার্চ করুন...' : 'Search...')}
        />
      ) : (
        <form onSubmit={handleSubmit} className="relative flex w-full items-center">
          <Input
            type="text"
            placeholder={placeholder || (language === 'bn' ? 'সার্চ করুন...' : 'Search...')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setShowResults(true)}
            className="w-full pr-12"
          />
          <Button type="submit" size="icon" variant="ghost" className="absolute right-1 h-8 w-8">
            <Search className="h-4 w-4" />
          </Button>
        </form>
      )}
      
      {showResults && (
        <Card className="absolute z-50 mt-1 w-full shadow-lg">
          <CardContent className="p-0">
            {searchTerm && searchResults.length > 0 ? (
              <div className="p-2">
                <div className="flex items-center justify-between px-2 py-1">
                  <span className="text-sm font-medium text-muted-foreground">
                    {language === 'bn' ? 'সার্চ রেজাল্ট' : 'Search Results'}
                  </span>
                  <Badge variant="outline" className="text-xs">
                    {searchResults.length}
                  </Badge>
                </div>
                <div className="space-y-1 mt-1">
                  {searchResults.map((result) => (
                    <div 
                      key={result.id}
                      className="flex items-center px-2 py-2 hover:bg-gray-100 rounded cursor-pointer"
                      onClick={() => handleResultClick(result)}
                    >
                      <div className="flex-1">
                        <div className="font-medium">{result.title}</div>
                        {result.category && (
                          <div className="text-xs text-muted-foreground">{result.category}</div>
                        )}
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {recentSearches.length > 0 && (
                  <div className="p-2">
                    <div className="flex items-center justify-between px-2 py-1">
                      <span className="text-sm font-medium text-muted-foreground">
                        {language === 'bn' ? 'সাম্প্রতিক অনুসন্ধান' : 'Recent Searches'}
                      </span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 text-xs"
                        onClick={clearRecentSearches}
                      >
                        {language === 'bn' ? 'মুছুন' : 'Clear'}
                      </Button>
                    </div>
                    <div className="space-y-1 mt-1">
                      {recentSearches.map((search, index) => (
                        <div 
                          key={index}
                          className="flex items-center px-2 py-2 hover:bg-gray-100 rounded cursor-pointer"
                          onClick={() => handleSearch(search)}
                        >
                          <History className="h-4 w-4 text-muted-foreground mr-2" />
                          <span className="flex-1">{search}</span>
                          <X 
                            className="h-4 w-4 text-muted-foreground hover:text-foreground" 
                            onClick={(e) => {
                              e.stopPropagation();
                              setRecentSearches(recentSearches.filter(s => s !== search));
                              localStorage.setItem('recentSearches', JSON.stringify(
                                recentSearches.filter(s => s !== search)
                              ));
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {showTrending && (
                  <div className="p-2">
                    {recentSearches.length > 0 && <Separator className="my-1" />}
                    <div className="flex items-center px-2 py-1">
                      <Sparkles className="h-4 w-4 text-primary mr-1" />
                      <span className="text-sm font-medium text-muted-foreground">
                        {language === 'bn' ? 'ট্রেন্ডিং সার্চ' : 'Trending Searches'}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 p-2">
                      {trendingSearches.map((search, index) => (
                        <Badge 
                          key={index} 
                          variant="secondary"
                          className="cursor-pointer hover:bg-secondary/80"
                          onClick={() => handleSearch(search)}
                        >
                          {search}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SmartSearch;
