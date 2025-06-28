
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Star, 
  Sparkles, 
  TrendingUp, 
  Heart, 
  MapPin, 
  Clock, 
  Search,
  Filter,
  Eye,
  Share2,
  Bookmark,
  User,
  Tag,
  Calendar
} from 'lucide-react';

const RecommendationsSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('for-you');

  const mockRecommendations = [
    {
      id: 'R001',
      title: 'আপনার জন্য পারফেক্ট ২ বেডরুম ফ্ল্যাট',
      type: 'property',
      category: 'রেন্টাল',
      price: '৳২২,০০০/মাস',
      originalPrice: '৳২৫,০০০/মাস',
      discount: 12,
      location: 'মিরপুর, ঢাকা',
      rating: 4.7,
      reviews: 34,
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
      aiReason: 'আপনার পছন্দের এলাকা ও বাজেটের সাথে মিলে',
      provider: 'হোম রেন্টাল',
      verified: true,
      recommendedDate: '২৮ এপ্রিল, ২০২৫',
      priority: 'high'
    },
    {
      id: 'R002',
      title: 'প্রিমিয়াম AC সার্ভিসিং অফার',
      type: 'service',
      category: 'হোম সার্ভিস',
      price: '৳১,২০০',
      originalPrice: '৳১,৫০০',
      discount: 20,
      location: 'ঢাকা সিটি এরিয়া',
      rating: 4.9,
      reviews: 128,
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop',
      aiReason: 'গ্রীষ্মকাল আসছে, AC সার্ভিসিং প্রয়োজন',
      provider: 'কুল সার্ভিস',
      verified: true,
      recommendedDate: '২৭ এপ্রিল, ২০২৫',
      priority: 'high'
    },
    {
      id: 'R003',
      title: 'ট্রেন্ডিং স্মার্ট ওয়াচ',
      type: 'product',
      category: 'ইলেকট্রনিক্স',
      price: '৳৪,৮০০',
      originalPrice: '৳৬,০০০',
      discount: 20,
      location: 'অনলাইন স্টোর',
      rating: 4.4,
      reviews: 67,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
      aiReason: 'আপনার সাম্প্রতিক সার্চ হিস্ট্রি অনুযায়ী',
      provider: 'গ্যাজেট হাব',
      verified: false,
      recommendedDate: '২৬ এপ্রিল, ২০২৫',
      priority: 'medium'
    },
    {
      id: 'R004',
      title: 'এক্সক্লুসিভ ডিজিটাল মার্কেটিং কোর্স',
      type: 'course',
      category: 'শিক্ষা',
      price: '৳৮,৫০০',
      originalPrice: '৳১২,০০০',
      discount: 29,
      location: 'অনলাইন',
      rating: 4.8,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop',
      aiReason: 'আপনার প্রোফাইল ও ইন্টারেস্ট অনুযায়ী',
      provider: 'স্কিল একাডেমি',
      verified: true,
      recommendedDate: '২৫ এপ্রিল, ২০২৫',
      priority: 'medium'
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'property': return 'bg-blue-100 text-blue-800';
      case 'service': return 'bg-green-100 text-green-800';
      case 'product': return 'bg-purple-100 text-purple-800';
      case 'course': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />;
      case 'medium': return <TrendingUp className="h-4 w-4 text-blue-500" />;
      default: return <Sparkles className="h-4 w-4 text-gray-500" />;
    }
  };

  const filteredRecommendations = mockRecommendations.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.provider.toLowerCase().includes(searchTerm.toLowerCase());
    
    switch (activeTab) {
      case 'trending':
        return matchesSearch && item.priority === 'high';
      case 'recent':
        return matchesSearch;
      default:
        return matchesSearch;
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            স্মার্ট রেকমেন্ডেশন
          </h2>
          <p className="text-muted-foreground">AI দ্বারা আপনার জন্য বিশেষভাবে নির্বাচিত সুপারিশ</p>
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          কাস্টমাইজ করুন
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="রেকমেন্ডেশন খুঁজুন..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="for-you">আপনার জন্য ({mockRecommendations.length})</TabsTrigger>
          <TabsTrigger value="trending">ট্রেন্ডিং ({mockRecommendations.filter(r => r.priority === 'high').length})</TabsTrigger>
          <TabsTrigger value="recent">সাম্প্রতিক ({mockRecommendations.length})</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {filteredRecommendations.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Sparkles className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-4">কোন রেকমেন্ডেশন পাওয়া যায়নি</p>
                <Button>নতুন রেকমেন্ডেশন পেতে প্রোফাইল আপডেট করুন</Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredRecommendations.map((item) => (
                <Card key={item.id} className="hover:shadow-md transition-shadow overflow-hidden">
                  <div className="relative">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-2 left-2 flex gap-2">
                      <Badge className={`${getTypeColor(item.type)} text-xs`}>
                        {item.category}
                      </Badge>
                      {item.discount && (
                        <Badge variant="destructive" className="text-xs">
                          -{item.discount}% ছাড়
                        </Badge>
                      )}
                    </div>
                    <div className="absolute top-2 right-2 flex gap-2">
                      {getPriorityIcon(item.priority)}
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="bg-white h-8 w-8 rounded-full"
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                    {item.verified && (
                      <div className="absolute bottom-2 left-2">
                        <Badge className="bg-green-500 text-white text-xs">
                          ভেরিফাইড
                        </Badge>
                      </div>
                    )}
                  </div>
                  
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-semibold line-clamp-2">{item.title}</h3>
                        <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                          <User className="h-4 w-4" />
                          {item.provider}
                        </p>
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

                      <div className="bg-blue-50 p-3 rounded-lg">
                        <div className="flex items-start gap-2">
                          <Sparkles className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-blue-700">{item.aiReason}</p>
                        </div>
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
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>{item.recommendedDate}</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button className="flex-1">
                          <Eye className="h-4 w-4 mr-2" />
                          দেখুন
                        </Button>
                        <Button variant="outline" size="sm">
                          <Bookmark className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Share2 className="h-4 w-4" />
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

export default RecommendationsSection;
