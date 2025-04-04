
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Filter,
  Search,
  ShoppingBag,
  Map,
  Newspaper,
  Store,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  X,
  Mic,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Slider
} from '@/components/ui/slider';

// Sample categories data
const categories = [
  { id: 'plumbing', name: 'প্লাম্বিং' },
  { id: 'electrical', name: 'ইলেকট্রিক্যাল' },
  { id: 'cleaning', name: 'ক্লিনিং' },
  { id: 'painting', name: 'পেইন্টিং' },
  { id: 'carpenter', name: 'কার্পেন্টার' },
  { id: 'ac_repair', name: 'এসি রিপেয়ার' },
  { id: 'laundry', name: 'লন্ড্রি' },
  { id: 'appliance', name: 'অ্যাপ্লায়েন্স' },
];

// Sample areas data
const areas = [
  { id: 'mirpur', name: 'মিরপুর' },
  { id: 'dhanmondi', name: 'ধানমন্ডি' },
  { id: 'gulshan', name: 'গুলশান' },
  { id: 'banani', name: 'বনানী' },
  { id: 'uttara', name: 'উত্তরা' },
  { id: 'mohammadpur', name: 'মোহাম্মদপুর' },
];

// Sample price ranges
const priceRanges = [
  { id: 'low', name: '৳১০০ - ৳৫০০' },
  { id: 'medium', name: '৳৫০০ - ৳১০০০' },
  { id: 'high', name: '৳১০০০ - ৳২০০০' },
  { id: 'premium', name: '৳২০০০+' },
];

// Sample result items
const searchResults = [
  { 
    id: '1', 
    title: 'এসি সার্ভিসিং', 
    category: 'ac_repair', 
    area: 'mirpur', 
    price: 800,
    rating: 4.8,
    image: 'https://source.unsplash.com/random/200x200/?ac',
    type: 'service'
  },
  { 
    id: '2', 
    title: 'ওয়াটার পাম্প রিপেয়ার', 
    category: 'plumbing', 
    area: 'dhanmondi', 
    price: 500,
    rating: 4.5,
    image: 'https://source.unsplash.com/random/200x200/?plumbing',
    type: 'service'
  },
  { 
    id: '3', 
    title: 'ইলেকট্রিক ওয়্যারিং', 
    category: 'electrical', 
    area: 'gulshan', 
    price: 1200,
    rating: 4.7,
    image: 'https://source.unsplash.com/random/200x200/?wiring',
    type: 'service'
  },
  { 
    id: '4', 
    title: 'ফ্রিজ রিপেয়ার', 
    category: 'appliance', 
    area: 'banani', 
    price: 700,
    rating: 4.6,
    image: 'https://source.unsplash.com/random/200x200/?fridge',
    type: 'service'
  },
  { 
    id: '5', 
    title: 'বাসা পরিষ্কার', 
    category: 'cleaning', 
    area: 'uttara', 
    price: 1500,
    rating: 4.9,
    image: 'https://source.unsplash.com/random/200x200/?cleaning',
    type: 'service'
  },
  { 
    id: '6', 
    title: 'ঘর রঙ করা', 
    category: 'painting', 
    area: 'mohammadpur', 
    price: 2500,
    rating: 4.4,
    image: 'https://source.unsplash.com/random/200x200/?painting',
    type: 'service'
  },
];

interface SearchBarProps {
  placeholder?: string;
  variant?: 'default' | 'expanded';
  onSearch?: (query: string, filters: any) => void;
}

interface SearchFilters {
  categories: string[];
  areas: string[];
  priceRange: number[];
  sortBy: string;
  rating: number | null;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  placeholder = "সার্ভিস, প্রোডাক্ট, বা লোকেশন খুঁজুন...",
  variant = "default",
  onSearch
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [searchTab, setSearchTab] = useState('all');
  const [filters, setFilters] = useState<SearchFilters>({
    categories: [],
    areas: [],
    priceRange: [0, 5000],
    sortBy: 'relevance',
    rating: null,
  });
  const [recentSearches] = useState([
    'এসি রিপেয়ার', 'প্লাম্বিং', 'ইলেকট্রিসিয়ান'
  ]);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Focus input when dialog opens
  useEffect(() => {
    if (dialogOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [dialogOpen]);

  const handleSearch = () => {
    console.log('Search query:', searchQuery);
    console.log('Filters:', filters);
    if (onSearch) {
      onSearch(searchQuery, filters);
    }
    setDialogOpen(false);
  };

  const toggleCategoryFilter = (categoryId: string) => {
    setFilters(prev => {
      if (prev.categories.includes(categoryId)) {
        return {
          ...prev,
          categories: prev.categories.filter(id => id !== categoryId)
        };
      } else {
        return {
          ...prev,
          categories: [...prev.categories, categoryId]
        };
      }
    });
  };

  const toggleAreaFilter = (areaId: string) => {
    setFilters(prev => {
      if (prev.areas.includes(areaId)) {
        return {
          ...prev,
          areas: prev.areas.filter(id => id !== areaId)
        };
      } else {
        return {
          ...prev,
          areas: [...prev.areas, areaId]
        };
      }
    });
  };

  const handleSetRating = (rating: number) => {
    setFilters(prev => ({
      ...prev,
      rating: prev.rating === rating ? null : rating
    }));
  };

  const clearFilters = () => {
    setFilters({
      categories: [],
      areas: [],
      priceRange: [0, 5000],
      sortBy: 'relevance',
      rating: null,
    });
  };
  
  const handlePriceRangeChange = (values: number[]) => {
    setFilters(prev => ({
      ...prev,
      priceRange: values
    }));
  };

  const handleResultClick = (result: any) => {
    console.log('Selected result:', result);
    navigate(`/services/${result.id}`);
    setDialogOpen(false);
  };

  const countActiveFilters = () => {
    let count = 0;
    if (filters.categories.length) count += 1;
    if (filters.areas.length) count += 1;
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 5000) count += 1;
    if (filters.rating !== null) count += 1;
    if (filters.sortBy !== 'relevance') count += 1;
    return count;
  };

  const filteredResults = searchResults
    .filter(result => {
      // Filter by search query
      if (searchQuery && !result.title.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      // Filter by category
      if (filters.categories.length > 0 && !filters.categories.includes(result.category)) {
        return false;
      }
      
      // Filter by area
      if (filters.areas.length > 0 && !filters.areas.includes(result.area)) {
        return false;
      }
      
      // Filter by price
      if (result.price < filters.priceRange[0] || result.price > filters.priceRange[1]) {
        return false;
      }
      
      // Filter by rating
      if (filters.rating !== null && result.rating < filters.rating) {
        return false;
      }
      
      // Filter by tab
      if (searchTab === 'services' && result.type !== 'service') {
        return false;
      } else if (searchTab === 'products' && result.type !== 'product') {
        return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      switch (filters.sortBy) {
        case 'price_low':
          return a.price - b.price;
        case 'price_high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

  // If variant is 'expanded', show the full search UI
  if (variant === 'expanded') {
    return (
      <div className="bg-white shadow-md rounded-lg p-4">
        <div className="flex flex-col space-y-4">
          <div className="flex space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder={placeholder} 
                className="pl-9 pr-12"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch();
                  }
                }}
              />
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                onClick={() => setSearchQuery('')}
              >
                {searchQuery ? <X className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>
            </div>
            <Popover open={filtersOpen} onOpenChange={setFiltersOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="flex gap-2 items-center">
                  <Filter className="h-4 w-4" />
                  <span>ফিল্টার</span>
                  {countActiveFilters() > 0 && (
                    <Badge variant="secondary" className="ml-1 h-5 min-w-4 px-1">
                      {countActiveFilters()}
                    </Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80" align="end">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">ফিল্টার অপশন</h3>
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    রিসেট
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="category">
                      <AccordionTrigger>ক্যাটাগরি</AccordionTrigger>
                      <AccordionContent>
                        <div className="grid grid-cols-2 gap-2">
                          {categories.map(category => (
                            <div key={category.id} className="flex items-center space-x-2">
                              <Checkbox 
                                id={`category-${category.id}`}
                                checked={filters.categories.includes(category.id)}
                                onCheckedChange={() => toggleCategoryFilter(category.id)}
                              />
                              <label 
                                htmlFor={`category-${category.id}`} 
                                className="text-sm cursor-pointer"
                              >
                                {category.name}
                              </label>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="area">
                      <AccordionTrigger>এরিয়া</AccordionTrigger>
                      <AccordionContent>
                        <div className="grid grid-cols-2 gap-2">
                          {areas.map(area => (
                            <div key={area.id} className="flex items-center space-x-2">
                              <Checkbox 
                                id={`area-${area.id}`}
                                checked={filters.areas.includes(area.id)}
                                onCheckedChange={() => toggleAreaFilter(area.id)}
                              />
                              <label 
                                htmlFor={`area-${area.id}`} 
                                className="text-sm cursor-pointer"
                              >
                                {area.name}
                              </label>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="price">
                      <AccordionTrigger>মূল্য</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4 px-2">
                          <Slider
                            onValueChange={handlePriceRangeChange}
                            value={filters.priceRange}
                            min={0}
                            max={5000}
                            step={100}
                          />
                          <div className="flex justify-between">
                            <span>৳{filters.priceRange[0]}</span>
                            <span>৳{filters.priceRange[1]}</span>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="rating">
                      <AccordionTrigger>রেটিং</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          {[5, 4, 3, 2, 1].map(rating => (
                            <div 
                              key={rating}
                              className={`flex items-center p-2 rounded cursor-pointer ${
                                filters.rating === rating ? 'bg-primary/10' : ''
                              }`}
                              onClick={() => handleSetRating(rating)}
                            >
                              <div className="flex-1 flex items-center gap-1">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <svg 
                                    key={i}
                                    xmlns="http://www.w3.org/2000/svg" 
                                    width="14" 
                                    height="14" 
                                    viewBox="0 0 24 24" 
                                    fill={i < rating ? "currentColor" : "none"} 
                                    stroke="currentColor" 
                                    strokeWidth="2" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    className={i < rating ? "text-amber-500" : "text-gray-300"}
                                  >
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                  </svg>
                                ))}
                                <span className="ml-2 text-sm">
                                  {rating}+ স্টার
                                </span>
                              </div>
                              {filters.rating === rating && (
                                <CheckCircle2 className="h-4 w-4 text-primary" />
                              )}
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="sort">
                      <AccordionTrigger>সর্ট করুন</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          <div 
                            className={`flex items-center p-2 rounded cursor-pointer ${
                              filters.sortBy === 'relevance' ? 'bg-primary/10' : ''
                            }`}
                            onClick={() => setFilters(prev => ({ ...prev, sortBy: 'relevance' }))}
                          >
                            <div className="flex-1">সর্বাধিক প্রাসঙ্গিক</div>
                            {filters.sortBy === 'relevance' && (
                              <CheckCircle2 className="h-4 w-4 text-primary" />
                            )}
                          </div>
                          <div 
                            className={`flex items-center p-2 rounded cursor-pointer ${
                              filters.sortBy === 'price_low' ? 'bg-primary/10' : ''
                            }`}
                            onClick={() => setFilters(prev => ({ ...prev, sortBy: 'price_low' }))}
                          >
                            <div className="flex-1">দাম (কম থেকে বেশি)</div>
                            {filters.sortBy === 'price_low' && (
                              <CheckCircle2 className="h-4 w-4 text-primary" />
                            )}
                          </div>
                          <div 
                            className={`flex items-center p-2 rounded cursor-pointer ${
                              filters.sortBy === 'price_high' ? 'bg-primary/10' : ''
                            }`}
                            onClick={() => setFilters(prev => ({ ...prev, sortBy: 'price_high' }))}
                          >
                            <div className="flex-1">দাম (বেশি থেকে কম)</div>
                            {filters.sortBy === 'price_high' && (
                              <CheckCircle2 className="h-4 w-4 text-primary" />
                            )}
                          </div>
                          <div 
                            className={`flex items-center p-2 rounded cursor-pointer ${
                              filters.sortBy === 'rating' ? 'bg-primary/10' : ''
                            }`}
                            onClick={() => setFilters(prev => ({ ...prev, sortBy: 'rating' }))}
                          >
                            <div className="flex-1">রেটিং (সেরা)</div>
                            {filters.sortBy === 'rating' && (
                              <CheckCircle2 className="h-4 w-4 text-primary" />
                            )}
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
                
                <div className="flex justify-end mt-4">
                  <Button className="w-full" onClick={() => setFiltersOpen(false)}>
                    ফিল্টার অ্যাপ্লাই করুন
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          
          {countActiveFilters() > 0 && (
            <div className="flex flex-wrap gap-2">
              {filters.categories.length > 0 && (
                <Badge variant="outline" className="flex items-center gap-1">
                  {filters.categories.length > 1 
                    ? `${filters.categories.length}টি ক্যাটাগরি` 
                    : categories.find(c => c.id === filters.categories[0])?.name
                  }
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-4 w-4 ml-1 p-0 hover:bg-transparent"
                    onClick={() => setFilters(prev => ({ ...prev, categories: [] }))}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
              
              {filters.areas.length > 0 && (
                <Badge variant="outline" className="flex items-center gap-1">
                  {filters.areas.length > 1 
                    ? `${filters.areas.length}টি এরিয়া` 
                    : areas.find(a => a.id === filters.areas[0])?.name
                  }
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-4 w-4 ml-1 p-0 hover:bg-transparent"
                    onClick={() => setFilters(prev => ({ ...prev, areas: [] }))}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
              
              {(filters.priceRange[0] > 0 || filters.priceRange[1] < 5000) && (
                <Badge variant="outline" className="flex items-center gap-1">
                  ৳{filters.priceRange[0]} - ৳{filters.priceRange[1]}
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-4 w-4 ml-1 p-0 hover:bg-transparent"
                    onClick={() => setFilters(prev => ({ ...prev, priceRange: [0, 5000] }))}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
              
              {filters.rating !== null && (
                <Badge variant="outline" className="flex items-center gap-1">
                  {filters.rating}+ স্টার
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-4 w-4 ml-1 p-0 hover:bg-transparent"
                    onClick={() => setFilters(prev => ({ ...prev, rating: null }))}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
              
              {filters.sortBy !== 'relevance' && (
                <Badge variant="outline" className="flex items-center gap-1">
                  {filters.sortBy === 'price_low' && 'দাম (কম থেকে বেশি)'}
                  {filters.sortBy === 'price_high' && 'দাম (বেশি থেকে কম)'}
                  {filters.sortBy === 'rating' && 'রেটিং (সেরা)'}
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-4 w-4 ml-1 p-0 hover:bg-transparent"
                    onClick={() => setFilters(prev => ({ ...prev, sortBy: 'relevance' }))}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-xs text-muted-foreground h-7"
                onClick={clearFilters}
              >
                সব ক্লিয়ার করুন
              </Button>
            </div>
          )}
          
          <Tabs value={searchTab} onValueChange={setSearchTab} className="w-full">
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="all">সব</TabsTrigger>
              <TabsTrigger value="services">সার্ভিস</TabsTrigger>
              <TabsTrigger value="products">প্রোডাক্ট</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Results list */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            {filteredResults.map(result => (
              <div 
                key={result.id}
                className="flex gap-3 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                onClick={() => handleResultClick(result)}
              >
                <div className="w-20 h-20 rounded-md overflow-hidden">
                  <img 
                    src={result.image} 
                    alt={result.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{result.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {areas.find(a => a.id === result.area)?.name}
                  </p>
                  <div className="mt-1 flex items-center gap-1">
                    <div className="flex items-center">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="12" 
                        height="12" 
                        viewBox="0 0 24 24" 
                        fill="currentColor"
                        className="text-amber-500"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                      <span className="text-xs ml-1">{result.rating}</span>
                    </div>
                    <span className="text-xs text-muted-foreground mx-1">•</span>
                    <span className="text-sm font-medium">৳{result.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredResults.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              কোন ফলাফল পাওয়া যায়নি। অন্য কিছু খুঁজে দেখুন।
            </div>
          )}
          
          <div className="flex justify-between items-center mt-2">
            <Button variant="outline" size="sm" disabled>
              <ArrowLeft className="h-4 w-4 mr-1" /> আগে
            </Button>
            <span className="text-xs text-muted-foreground">
              {filteredResults.length} এর মধ্যে {Math.min(filteredResults.length, 6)} দেখানো হচ্ছে
            </span>
            <Button variant="outline" size="sm" disabled={filteredResults.length <= 6}>
              পরে <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Default compact view
  return (
    <>
      <div 
        className="relative flex items-center cursor-text"
        onClick={() => setDialogOpen(true)}
      >
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder={placeholder} 
            className="pl-9 pr-12"
            readOnly
          />
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
            onClick={(e) => {
              e.stopPropagation();
              console.log('Toggle voice search');
            }}
          >
            <Mic className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[600px] p-0">
          <DialogHeader className="p-4 pb-0">
            <DialogTitle>সার্চ</DialogTitle>
          </DialogHeader>
          
          <div className="flex items-center p-4 pt-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                ref={searchInputRef}
                placeholder={placeholder} 
                className="pl-9 pr-12"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch();
                  }
                }}
              />
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                onClick={() => setSearchQuery('')}
              >
                {searchQuery ? <X className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>
            </div>
            <Button variant="ghost" onClick={handleSearch} className="ml-2">
              সার্চ
            </Button>
          </div>
          
          <Tabs defaultValue="all" className="px-4">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="all" className="text-xs">সকল</TabsTrigger>
              <TabsTrigger value="services" className="text-xs flex items-center gap-1">
                <ShoppingBag className="h-3 w-3" /> সার্ভিস
              </TabsTrigger>
              <TabsTrigger value="products" className="text-xs flex items-center gap-1">
                <Store className="h-3 w-3" /> প্রোডাক্ট
              </TabsTrigger>
              <TabsTrigger value="places" className="text-xs flex items-center gap-1">
                <Map className="h-3 w-3" /> স্থান
              </TabsTrigger>
            </TabsList>
          </Tabs>
          
          {!searchQuery && (
            <div className="p-4 pt-0">
              <h3 className="text-sm font-medium mb-2">সাম্প্রতিক সার্চ</h3>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((search, i) => (
                  <Badge 
                    key={i} 
                    variant="outline" 
                    className="cursor-pointer hover:bg-muted"
                    onClick={() => {
                      setSearchQuery(search);
                      handleSearch();
                    }}
                  >
                    {search}
                  </Badge>
                ))}
              </div>
              
              <h3 className="text-sm font-medium mt-4 mb-2">জনপ্রিয় ক্যাটাগরি</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {categories.slice(0, 6).map(category => (
                  <Badge 
                    key={category.id} 
                    variant="outline" 
                    className="cursor-pointer hover:bg-muted justify-start"
                    onClick={() => {
                      setSearchQuery(category.name);
                      handleSearch();
                    }}
                  >
                    {category.name}
                  </Badge>
                ))}
              </div>
              
              <h3 className="text-sm font-medium mt-4 mb-2">জনপ্রিয় এরিয়া</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {areas.slice(0, 6).map(area => (
                  <Badge 
                    key={area.id} 
                    variant="outline" 
                    className="cursor-pointer hover:bg-muted justify-start"
                    onClick={() => {
                      setSearchQuery(area.name);
                      handleSearch();
                    }}
                  >
                    {area.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          {searchQuery && (
            <div className="p-4 pt-0">
              <Command>
                <CommandList>
                  <CommandEmpty>কোন ফলাফল পাওয়া যায়নি। অন্য কিছু খুঁজে দেখুন।</CommandEmpty>
                  
                  {filteredResults.length > 0 && (
                    <CommandGroup heading="সার্ভিস">
                      {filteredResults.map(result => (
                        <CommandItem
                          key={result.id}
                          onSelect={() => handleResultClick(result)}
                        >
                          <div className="flex items-center gap-3 w-full">
                            <div className="w-10 h-10 rounded-md overflow-hidden bg-muted">
                              <img 
                                src={result.image} 
                                alt={result.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <h4 className="text-sm font-medium">{result.title}</h4>
                              <div className="flex items-center text-xs text-muted-foreground mt-0.5">
                                <span>{areas.find(a => a.id === result.area)?.name}</span>
                                <span className="mx-1">•</span>
                                <span>৳{result.price}</span>
                              </div>
                            </div>
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  )}
                </CommandList>
              </Command>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SearchBar;
