
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Heart, 
  Star, 
  MapPin, 
  Search, 
  Filter, 
  Share2, 
  MessageSquare,
  Home,
  Wrench,
  ShoppingBag,
  Eye
} from 'lucide-react';

const ShortlistSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const mockShortlists = [
    {
      id: 'SL001',
      title: 'সুন্দর ২ বেডরুম ফ্ল্যাট',
      type: 'property',
      category: 'রেন্টাল',
      price: '৳২০,০০০/মাস',
      rating: 4.8,
      reviews: 24,
      location: 'ধানমন্ডি, ঢাকা',
      savedDate: '২৮ এপ্রিল, ২০২৫',
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
      provider: 'আলী প্রপার্টিজ',
      isAvailable: true
    },
    {
      id: 'SL002',
      title: 'AC সার্ভিসিং সেবা',
      type: 'service',
      category: 'হোম সার্ভিস',
      price: '৳১,৫০০',
      rating: 4.9,
      reviews: 156,
      location: 'ঢাকা সিটি এরিয়া',
      savedDate: '২৬ এপ্রিল, ২০২৫',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop',
      provider: 'টেক সার্ভিস প্রো',
      isAvailable: true
    },
    {
      id: 'SL003',
      title: 'স্মার্ট ওয়াচ',
      type: 'product',
      category: 'ইলেকট্রনিক্স',
      price: '৳৫,৫০০',
      originalPrice: '৳৭,০০০',
      rating: 4.5,
      reviews: 89,
      location: 'অনলাইন স্টোর',
      savedDate: '২২ এপ্রিল, ২০২৫',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
      provider: 'টেক স্টোর',
      isAvailable: true,
      discount: 21
    },
    {
      id: 'SL004',
      title: 'মেস সিট - উত্তরা',
      type: 'property',
      category: 'মেস',
      price: '৳৮,০০০/মাস',
      rating: 4.2,
      reviews: 32,
      location: 'উত্তরা, ঢাকা',
      savedDate: '২০ এপ্রিল, ২০২৫',
      image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&h=300&fit=crop',
      provider: 'স্টুডেন্ট মেস',
      isAvailable: false
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'property': return <Home className="h-4 w-4" />;
      case 'service': return <Wrench className="h-4 w-4" />;
      case 'product': return <ShoppingBag className="h-4 w-4" />;
      default: return <Heart className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'property': return 'bg-blue-100 text-blue-800';
      case 'service': return 'bg-green-100 text-green-800';
      case 'product': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredShortlists = mockShortlists.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.provider.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' || item.type === activeTab;
    return matchesSearch && matchesTab;
  });

  const handleRemoveFromShortlist = (id: string) => {
    // In real app, implement removal logic
    console.log('Remove from shortlist:', id);
  };

  const handleShare = (item: any) => {
    // In real app, implement sharing logic
    console.log('Share item:', item);
  };

  const handleContact = (item: any) => {
    // In real app, implement contact logic
    console.log('Contact provider:', item);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">আমার শর্টলিস্ট</h2>
          <p className="text-muted-foreground">আপনার পছন্দের আইটেম সংরক্ষণ করুন ও সহজে খুঁজে নিন</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Share2 className="h-4 w-4 mr-2" />
            সব শেয়ার করুন
          </Button>
          <Button>
            <Heart className="h-4 w-4 mr-2" />
            নতুন যোগ করুন
          </Button>
        </div>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="শর্টলিস্ট খুঁজুন..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              ফিল্টার
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">সব ({mockShortlists.length})</TabsTrigger>
          <TabsTrigger value="property">প্রপার্টি ({mockShortlists.filter(s => s.type === 'property').length})</TabsTrigger>
          <TabsTrigger value="service">সার্ভিস ({mockShortlists.filter(s => s.type === 'service').length})</TabsTrigger>
          <TabsTrigger value="product">প্রোডাক্ট ({mockShortlists.filter(s => s.type === 'product').length})</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {filteredShortlists.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-4">কোন শর্টলিস্ট পাওয়া যায়নি</p>
                <Button>নতুন আইটেম যোগ করুন</Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredShortlists.map((item) => (
                <Card key={item.id} className="hover:shadow-md transition-shadow overflow-hidden">
                  <div className="relative">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-2 left-2 flex gap-2">
                      <Badge className={`${getTypeColor(item.type)} text-xs`}>
                        <span className="flex items-center gap-1">
                          {getTypeIcon(item.type)}
                          {item.category}
                        </span>
                      </Badge>
                      {item.discount && (
                        <Badge variant="destructive" className="text-xs">
                          -{item.discount}%
                        </Badge>
                      )}
                    </div>
                    <div className="absolute top-2 right-2">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="bg-white h-8 w-8 rounded-full"
                        onClick={() => handleRemoveFromShortlist(item.id)}
                      >
                        <Heart className="h-4 w-4 text-red-500 fill-red-500" />
                      </Button>
                    </div>
                    {!item.isAvailable && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <Badge variant="destructive">বর্তমানে উপলব্ধ নয়</Badge>
                      </div>
                    )}
                  </div>
                  
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-semibold line-clamp-2">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.provider}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                          <span className="text-sm font-medium">{item.rating}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">({item.reviews})</span>
                      </div>

                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{item.location}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-lg font-bold text-primary">{item.price}</span>
                          {item.originalPrice && (
                            <span className="text-sm text-muted-foreground line-through ml-2">
                              {item.originalPrice}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">সেভ: {item.savedDate}</p>
                      </div>

                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => handleContact(item)}
                          disabled={!item.isAvailable}
                        >
                          <MessageSquare className="h-4 w-4 mr-2" />
                          যোগাযোগ
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleShare(item)}
                        >
                          <Share2 className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ShortlistSection;
