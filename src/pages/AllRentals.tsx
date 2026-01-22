
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Search, Grid, List, Filter } from 'lucide-react';
import { featuredListings } from '@/data/rentalMockData';
import { usePostStore } from '@/store/usePostStore';
import RentalCard from '@/components/rentals/RentalCard';
import { useToast } from '@/hooks/use-toast';

const AllRentals = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { getPostsByType } = usePostStore();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<string>('newest');

  // Get user-created rental posts
  const userRentalPosts = getPostsByType('rent');

  // Combine mock data with user posts
  const allRentals = useMemo(() => {
    const mockRentals = featuredListings.map(listing => ({
      ...listing,
      source: 'mock' as const
    }));

    const userRentals = userRentalPosts.map(post => ({
      id: post.id,
      title: post.title,
      location: post.location,
      price: post.price,
      image: post.images[0] || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400',
      category: post.category,
      rating: 4.5,
      reviews: 0,
      featured: false,
      availability: true,
      source: 'user' as const
    }));

    return [...userRentals, ...mockRentals];
  }, [userRentalPosts]);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set(allRentals.map(r => r.category).filter(Boolean));
    return ['all', ...Array.from(cats)];
  }, [allRentals]);

  // Filter and sort rentals
  const filteredRentals = useMemo(() => {
    let result = allRentals;

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(r => 
        r.title.toLowerCase().includes(query) ||
        r.location.toLowerCase().includes(query) ||
        (r.category && r.category.toLowerCase().includes(query))
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(r => r.category === selectedCategory);
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        result = [...result].sort((a, b) => {
          const priceA = parseInt(a.price.replace(/[^\d]/g, '')) || 0;
          const priceB = parseInt(b.price.replace(/[^\d]/g, '')) || 0;
          return priceA - priceB;
        });
        break;
      case 'price-high':
        result = [...result].sort((a, b) => {
          const priceA = parseInt(a.price.replace(/[^\d]/g, '')) || 0;
          const priceB = parseInt(b.price.replace(/[^\d]/g, '')) || 0;
          return priceB - priceA;
        });
        break;
      case 'rating':
        result = [...result].sort((a, b) => {
          const ratingA = 'rating' in a ? (a.rating || 0) : 0;
          const ratingB = 'rating' in b ? (b.rating || 0) : 0;
          return ratingB - ratingA;
        });
        break;
      case 'newest':
      default:
        // User posts first (newest)
        result = [...result].sort((a, b) => {
          if (a.source === 'user' && b.source !== 'user') return -1;
          if (a.source !== 'user' && b.source === 'user') return 1;
          return 0;
        });
        break;
    }

    return result;
  }, [allRentals, searchQuery, selectedCategory, sortBy]);

  const handleBookmark = (e: React.MouseEvent, id: number | string) => {
    e.stopPropagation();
    toast({
      title: "সংরক্ষিত হয়েছে",
      description: "রেন্টাল আইটেমটি আপনার পছন্দের তালিকায় যোগ করা হয়েছে"
    });
  };

  const handleShare = (e: React.MouseEvent, rental: any) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: rental.title,
        text: `${rental.title} - ${rental.price}`,
        url: window.location.href
      });
    } else {
      toast({
        title: "লিংক কপি হয়েছে",
        description: "শেয়ার লিংক কপি করা হয়েছে"
      });
    }
  };

  return (
    <div className="container px-4 pt-20 pb-20">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-xl font-bold">সব রেন্টাল</h1>
          <p className="text-sm text-muted-foreground">
            {filteredRentals.length}টি রেন্টাল আইটেম পাওয়া গেছে
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="রেন্টাল খুঁজুন..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[140px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="ক্যাটাগরি" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(cat => (
                <SelectItem key={cat} value={cat}>
                  {cat === 'all' ? 'সব ক্যাটাগরি' : cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="সর্ট করুন" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">নতুন</SelectItem>
              <SelectItem value="price-low">কম দাম</SelectItem>
              <SelectItem value="price-high">বেশি দাম</SelectItem>
              <SelectItem value="rating">রেটিং</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex gap-1 ml-auto">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="icon"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="icon"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Results */}
      {filteredRentals.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">কোন রেন্টাল আইটেম পাওয়া যায়নি</p>
          <Button variant="outline" onClick={() => {
            setSearchQuery('');
            setSelectedCategory('all');
          }}>
            ফিল্টার রিসেট করুন
          </Button>
        </div>
      ) : (
        <div className={viewMode === 'grid' 
          ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          : "space-y-4"
        }>
          {filteredRentals.map((rental, index) => (
            <RentalCard
              key={`${rental.source}-${rental.id}-${index}`}
              listing={rental}
              variant="compact"
              onBookmark={handleBookmark}
              onShare={handleShare}
              onClick={() => navigate(`/rent-details/${rental.id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllRentals;
