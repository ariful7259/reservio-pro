
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useApp } from '@/context/AppContext';
import AdvancedSearchFilters, { SearchFilters } from '@/components/search/AdvancedSearchFilters';
import ServiceCard from '@/components/ServiceCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const SearchPage = () => {
  const navigate = useNavigate();
  const { language } = useApp();
  const [activeTab, setActiveTab] = useState('all');
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    priceRange: [0, 10000],
    tags: []
  });
  const [isListening, setIsListening] = useState(false);

  // Mock categories for demonstration
  const serviceCategories = [
    language === 'bn' ? 'স্বাস্থ্যসেবা' : 'Healthcare',
    language === 'bn' ? 'ইলেকট্রিকাল' : 'Electrical',
    language === 'bn' ? 'পরিষ্কার-পরিচ্ছন্নতা' : 'Cleaning',
    language === 'bn' ? 'আইটি সেবা' : 'IT Services',
    language === 'bn' ? 'শিক্ষা' : 'Education',
  ];

  // Mock sort options
  const sortOptions = [
    language === 'bn' ? 'সর্বনিম্ন মূল্য' : 'Price: Low to High',
    language === 'bn' ? 'সর্বোচ্চ মূল্য' : 'Price: High to Low',
    language === 'bn' ? 'উচ্চ রেটিং' : 'Highest Rated',
    language === 'bn' ? 'জনপ্রিয়' : 'Most Popular',
  ];

  // Mock tags
  const availableTags = [
    language === 'bn' ? 'দ্রুত সেবা' : 'Fast Service',
    language === 'bn' ? 'প্রিমিয়াম' : 'Premium',
    language === 'bn' ? 'অফার' : 'Offers',
    language === 'bn' ? 'বেস্ট সেলার' : 'Best Seller',
    language === 'bn' ? 'নতুন' : 'New',
  ];

  // Mock search results based on category
  const generateMockResults = (category: string) => {
    // Base results
    const results = [
      {
        id: '1',
        title: language === 'bn' ? 'ডাক্তার অ্যাপয়েন্টমেন্ট' : 'Doctor Appointment',
        description: language === 'bn' ? 'বিশেষজ্ঞ ডাক্তারদের সাথে অ্যাপয়েন্টমেন্ট' : 'Appointment with specialist doctors',
        image: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=600&q=80',
        price: '৳৮০০',
        rating: 4.8,
        location: language === 'bn' ? 'ঢাকা' : 'Dhaka',
        category: 'healthcare',
      },
      {
        id: '2',
        title: language === 'bn' ? 'ইলেকট্রিশিয়ান' : 'Electrician',
        description: language === 'bn' ? 'ইলেকট্রিক্যাল সমস্যার সমাধান' : 'Fix electrical problems',
        image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80',
        price: '৳৫০০',
        rating: 4.7,
        location: language === 'bn' ? 'ঢাকা' : 'Dhaka',
        category: 'electrical',
      },
      {
        id: '3',
        title: language === 'bn' ? 'হোম ক্লিনিং' : 'Home Cleaning',
        description: language === 'bn' ? 'সম্পূর্ণ বাড়ি পরিষ্কার সেবা' : 'Complete house cleaning service',
        image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80',
        price: '৳১,৮০০',
        rating: 4.9,
        location: language === 'bn' ? 'ঢাকা' : 'Dhaka',
        category: 'cleaning',
      },
      {
        id: '4',
        title: language === 'bn' ? 'কম্পিউটার মেরামত' : 'Computer Repair',
        description: language === 'bn' ? 'কম্পিউটার ও ল্যাপটপ মেরামত' : 'Computer and laptop repair',
        image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=600&q=80',
        price: '৳৭৫০',
        rating: 4.6,
        location: language === 'bn' ? 'ঢাকা' : 'Dhaka',
        category: 'it',
      },
      {
        id: '5',
        title: language === 'bn' ? 'প্রাইভেট টিউটর' : 'Private Tutor',
        description: language === 'bn' ? 'বিষয়ভিত্তিক পড়ানোর সেবা' : 'Subject-based tutoring service',
        image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80',
        price: '৳১,২০০',
        rating: 4.7,
        location: language === 'bn' ? 'ঢাকা' : 'Dhaka',
        category: 'education',
      },
    ];

    if (category === 'all') return results;

    const categoryMap: Record<string, string> = {
      'services': 'all',
      'products': 'shopping',
      'rentals': 'rent',
    };
    
    if (categoryMap[category]) {
      return results;
    }

    return results.filter((item) => item.category === category.toLowerCase());
  };

  const [searchResults, setSearchResults] = useState(generateMockResults('all'));

  const handleSearch = (newFilters: SearchFilters) => {
    console.log('Search with filters:', newFilters);
    // In a real app, you would make an API call with these filters
    setFilters(newFilters);
    
    // Simulate filtering
    let filteredResults = generateMockResults(activeTab);
    
    // Apply query filter
    if (newFilters.query) {
      const query = newFilters.query.toLowerCase();
      filteredResults = filteredResults.filter(
        item => item.title.toLowerCase().includes(query) || 
                item.description.toLowerCase().includes(query)
      );
    }
    
    // Apply price range filter
    filteredResults = filteredResults.filter(
      item => {
        const numericPrice = parseInt(item.price.replace(/[^\d]/g, ''));
        return numericPrice >= newFilters.priceRange[0] && 
               numericPrice <= newFilters.priceRange[1];
      }
    );
    
    // Apply rating filter
    if (newFilters.rating) {
      filteredResults = filteredResults.filter(
        item => item.rating >= newFilters.rating!
      );
    }
    
    // Apply tags filter
    if (newFilters.tags && newFilters.tags.length > 0) {
      // This is a mock implementation since our items don't have tags
      // In a real app, you would filter by tags
    }
    
    setSearchResults(filteredResults);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    // Update search results based on new tab
    setSearchResults(generateMockResults(value));
  };

  const handleVoiceSearch = () => {
    // Toggle voice search state
    setIsListening(prev => !prev);
    
    // In a real implementation, you would integrate with the Web Speech API
    if (!isListening) {
      // Start listening
      setTimeout(() => {
        // Simulate voice recognition result
        const voiceQuery = language === 'bn' ? 'ডাক্তার' : 'doctor';
        setFilters({ ...filters, query: voiceQuery });
        handleSearch({ ...filters, query: voiceQuery });
        setIsListening(false);
      }, 3000);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">
        {language === 'bn' ? 'অনুসন্ধান করুন' : 'Search'}
      </h1>
      
      <AdvancedSearchFilters 
        onSearch={handleSearch}
        categories={serviceCategories}
        sortOptions={sortOptions}
        maxPrice={10000}
        showTags={true}
        availableTags={availableTags}
        initialFilters={filters}
        className="mb-6"
      />
      
      <div className="flex items-center justify-between mb-6">
        <div className="flex-1">
          <Tabs defaultValue="all" value={activeTab} onValueChange={handleTabChange}>
            <TabsList>
              <TabsTrigger value="all">
                {language === 'bn' ? 'সব' : 'All'}
              </TabsTrigger>
              <TabsTrigger value="services">
                {language === 'bn' ? 'সেবাসমূহ' : 'Services'}
              </TabsTrigger>
              <TabsTrigger value="products">
                {language === 'bn' ? 'পণ্যসমূহ' : 'Products'}
              </TabsTrigger>
              <TabsTrigger value="rentals">
                {language === 'bn' ? 'ভাড়া' : 'Rentals'}
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <Button 
          variant={isListening ? "destructive" : "outline"}
          size="icon"
          className="ml-2"
          onClick={handleVoiceSearch}
        >
          <Mic className={`h-4 w-4 ${isListening ? 'animate-pulse' : ''}`} />
        </Button>
      </div>
      
      {searchResults.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {searchResults.map((service) => (
            <ServiceCard
              key={service.id}
              id={service.id}
              title={service.title}
              description={service.description}
              image={service.image}
              price={service.price}
              rating={service.rating}
              location={service.location}
              onClick={() => navigate(`/services/${service.id}`)}
            />
          ))}
        </div>
      ) : (
        <Card className="p-8 text-center">
          <div className="text-muted-foreground mb-4">
            {language === 'bn' 
              ? 'কোন ফলাফল পাওয়া যায়নি!' 
              : 'No results found!'}
          </div>
          <Button variant="outline" onClick={() => {
            setFilters({ query: '', priceRange: [0, 10000], tags: [] });
            setSearchResults(generateMockResults(activeTab));
          }}>
            {language === 'bn' ? 'ফিল্টার রিসেট করুন' : 'Reset Filters'}
          </Button>
        </Card>
      )}
      
      {searchResults.length > 0 && (
        <div className="mt-6 text-center">
          <Button variant="outline" onClick={() => navigate(`/${activeTab === 'all' ? 'services' : activeTab}`)}>
            {language === 'bn' ? 'আরও দেখুন' : 'View more'}
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
