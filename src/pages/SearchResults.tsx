
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, MapPin, Star } from 'lucide-react';

const SearchResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const category = searchParams.get('category') || '';
  
  const [results, setResults] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('all');
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate search results loading
    setLoading(true);
    
    // Mock search results
    setTimeout(() => {
      const mockResults = [
        {
          id: 1,
          title: 'প্রফেশনাল ওয়েব ডেভেলপমেন্ট সেবা',
          type: 'service',
          location: 'ঢাকা',
          rating: 4.7,
          price: 5000,
          image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        },
        {
          id: 2,
          title: 'আইফোন 14 প্রো ম্যাক্স',
          type: 'product',
          location: 'চট্টগ্রাম',
          rating: 4.9,
          price: 150000,
          image: 'https://images.unsplash.com/photo-1537589376225-5405c60a5bd8?q=80&w=2064&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        },
        {
          id: 3,
          title: 'ল্যাপটপ রেন্টাল, ম্যাকবুক প্রো',
          type: 'rental',
          location: 'ঢাকা',
          rating: 4.5,
          price: 1000,
          image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=2026&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        },
        {
          id: 4,
          title: 'ডিজিটাল মার্কেটিং সেবা',
          type: 'service',
          location: 'খুলনা',
          rating: 4.3,
          price: 3500,
          image: 'https://images.unsplash.com/photo-1562577309-4932fdd64cd1?q=80&w=1774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        },
        {
          id: 5,
          title: 'নতুন স্যামসাং গ্যালাক্সি S23',
          type: 'product',
          location: 'সিলেট',
          rating: 4.8,
          price: 120000,
          image: 'https://images.unsplash.com/photo-1610664921890-ebad05086414?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        },
        {
          id: 6,
          title: 'ইভেন্টের জন্য সাউন্ড সিস্টেম ভাড়া',
          type: 'rental',
          location: 'রাজশাহী',
          rating: 4.6,
          price: 8000,
          image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        },
      ];
      
      setResults(mockResults);
      setLoading(false);
    }, 1000);
  }, [query, category]);
  
  const filteredResults = activeTab === 'all' 
    ? results 
    : results.filter(item => item.type === activeTab);
  
  return (
    <div className="container px-4 pt-20 pb-20">
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold">
            "{query}" এর জন্য সার্চ ফলাফল
          </h1>
          <div className="flex items-center gap-2">
            <Input 
              placeholder="আবার সার্চ করুন..." 
              className="max-w-xs" 
              defaultValue={query}
            />
            <Button size="icon">
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="all">সব ({results.length})</TabsTrigger>
              <TabsTrigger value="service">সেবা ({results.filter(i => i.type === 'service').length})</TabsTrigger>
              <TabsTrigger value="product">পণ্য ({results.filter(i => i.type === 'product').length})</TabsTrigger>
              <TabsTrigger value="rental">রেন্টাল ({results.filter(i => i.type === 'rental').length})</TabsTrigger>
            </TabsList>
            
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" /> ফিল্টার
            </Button>
          </div>
          
          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? (
                Array(6).fill(0).map((_, idx) => (
                  <Card key={idx} className="animate-pulse">
                    <div className="h-48 bg-gray-200" />
                    <CardContent className="p-4">
                      <div className="h-4 bg-gray-200 rounded mb-4" />
                      <div className="h-4 bg-gray-200 rounded w-3/4" />
                    </CardContent>
                  </Card>
                ))
              ) : filteredResults.length > 0 ? (
                filteredResults.map(item => (
                  <Card key={item.id} className="overflow-hidden">
                    <div className="h-48 relative">
                      <img 
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      <Badge 
                        className={`absolute top-2 right-2 ${
                          item.type === 'service' ? 'bg-blue-500' : 
                          item.type === 'product' ? 'bg-green-500' : 'bg-purple-500'
                        }`}>
                        {item.type === 'service' ? 'সেবা' : 
                        item.type === 'product' ? 'পণ্য' : 'রেন্টাল'}
                      </Badge>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2 line-clamp-2">{item.title}</h3>
                      <div className="flex items-center gap-1 text-sm mb-2">
                        <MapPin className="h-3.5 w-3.5" />
                        {item.location}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="font-bold">৳{item.price}{item.type === 'rental' ? '/দিন' : ''}</div>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="ml-1">{item.rating}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-3 py-12 text-center">
                  <p>কোন ফলাফল পাওয়া যায়নি</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="service" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? (
                Array(3).fill(0).map((_, idx) => (
                  <Card key={idx} className="animate-pulse">
                    <div className="h-48 bg-gray-200" />
                    <CardContent className="p-4">
                      <div className="h-4 bg-gray-200 rounded mb-4" />
                      <div className="h-4 bg-gray-200 rounded w-3/4" />
                    </CardContent>
                  </Card>
                ))
              ) : filteredResults.length > 0 ? (
                filteredResults.map(item => (
                  <Card key={item.id} className="overflow-hidden">
                    <div className="h-48 relative">
                      <img 
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      <Badge className="absolute top-2 right-2 bg-blue-500">সেবা</Badge>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2">{item.title}</h3>
                      <div className="flex items-center gap-1 text-sm mb-2">
                        <MapPin className="h-3.5 w-3.5" />
                        {item.location}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="font-bold">৳{item.price}</div>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="ml-1">{item.rating}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-3 py-12 text-center">
                  <p>কোন সেবা পাওয়া যায়নি</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="product" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? (
                Array(2).fill(0).map((_, idx) => (
                  <Card key={idx} className="animate-pulse">
                    <div className="h-48 bg-gray-200" />
                    <CardContent className="p-4">
                      <div className="h-4 bg-gray-200 rounded mb-4" />
                      <div className="h-4 bg-gray-200 rounded w-3/4" />
                    </CardContent>
                  </Card>
                ))
              ) : filteredResults.length > 0 ? (
                filteredResults.map(item => (
                  <Card key={item.id} className="overflow-hidden">
                    <div className="h-48 relative">
                      <img 
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      <Badge className="absolute top-2 right-2 bg-green-500">পণ্য</Badge>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2">{item.title}</h3>
                      <div className="flex items-center gap-1 text-sm mb-2">
                        <MapPin className="h-3.5 w-3.5" />
                        {item.location}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="font-bold">৳{item.price}</div>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="ml-1">{item.rating}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-3 py-12 text-center">
                  <p>কোন পণ্য পাওয়া যায়নি</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="rental" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? (
                Array(2).fill(0).map((_, idx) => (
                  <Card key={idx} className="animate-pulse">
                    <div className="h-48 bg-gray-200" />
                    <CardContent className="p-4">
                      <div className="h-4 bg-gray-200 rounded mb-4" />
                      <div className="h-4 bg-gray-200 rounded w-3/4" />
                    </CardContent>
                  </Card>
                ))
              ) : filteredResults.length > 0 ? (
                filteredResults.map(item => (
                  <Card key={item.id} className="overflow-hidden">
                    <div className="h-48 relative">
                      <img 
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      <Badge className="absolute top-2 right-2 bg-purple-500">রেন্টাল</Badge>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2">{item.title}</h3>
                      <div className="flex items-center gap-1 text-sm mb-2">
                        <MapPin className="h-3.5 w-3.5" />
                        {item.location}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="font-bold">৳{item.price}/দিন</div>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="ml-1">{item.rating}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-3 py-12 text-center">
                  <p>কোন রেন্টাল পাওয়া যায়নি</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SearchResults;
