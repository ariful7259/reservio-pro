
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  BookOpen, 
  FileText, 
  Code, 
  Headphones, 
  Video,
  Tag,
  SlidersHorizontal,
  ChevronDown,
  LayoutGrid,
  LayoutList,
  Star,
  Heart,
  ShoppingCart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Product {
  id: string;
  title: string;
  description: string;
  type: 'course' | 'ebook' | 'template' | 'software' | 'audio' | 'video';
  price: string;
  rating: number;
  author: string;
  image: string;
  sales: number;
}

const DigitalProductsMarketplace = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  
  const productTypes = [
    { name: 'কোর্স', icon: <BookOpen className="h-4 w-4" />, value: 'course' },
    { name: 'ইবুক', icon: <FileText className="h-4 w-4" />, value: 'ebook' },
    { name: 'টেমপ্লেট', icon: <FileText className="h-4 w-4" />, value: 'template' },
    { name: 'সফটওয়্যার', icon: <Code className="h-4 w-4" />, value: 'software' },
    { name: 'অডিও', icon: <Headphones className="h-4 w-4" />, value: 'audio' },
    { name: 'ভিডিও', icon: <Video className="h-4 w-4" />, value: 'video' },
  ];

  const demoProducts: Product[] = [
    {
      id: '1',
      title: 'ফ্রিল্যান্সিং কোর্স - ওয়েব ডেভেলপমেন্ট',
      description: 'ওয়েব ডেভেলপমেন্ট শেখার মাধ্যমে ঘরে বসে আয় করুন',
      type: 'course',
      price: '৳৫,৯৯৯',
      rating: 4.8,
      author: 'মোঃ আমিনুল ইসলাম',
      image: 'https://images.unsplash.com/photo-1593642702909-dec73df255d7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      sales: 2450
    },
    {
      id: '2',
      title: 'ডিজিটাল মার্কেটিং - পূর্ণাঙ্গ গাইডবুক',
      description: 'আপনার ব্যবসা বা ফ্রিল্যান্সিং স্কিল বাড়ানোর জন্য সম্পূর্ণ গাইড',
      type: 'ebook',
      price: '৳৯৯৯',
      rating: 4.5,
      author: 'তানিয়া আক্তার',
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      sales: 1835
    },
    {
      id: '3',
      title: 'প্রিমিয়াম ওয়েবসাইট টেমপ্লেট কালেকশন',
      description: 'আধুনিক ডিজাইনের সাথে ১০০+ প্রফেশনাল টেমপ্লেট',
      type: 'template',
      price: '৳১,৮৯৯',
      rating: 4.7,
      author: 'ইনোভেট সলিউশন',
      image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      sales: 740
    },
    {
      id: '4',
      title: 'সোশ্যাল মিডিয়া অটোমেশন সফটওয়্যার',
      description: 'ফেসবুক, ইনস্টাগ্রাম, ইউটিউবের কন্টেন্ট অটোমেটিক পোস্ট করুন',
      type: 'software',
      price: '৳২,৪৯৯',
      rating: 4.3,
      author: 'টেকজেন লিমিটেড',
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      sales: 328
    },
    {
      id: '5',
      title: 'মেডিটেশন অডিও সিরিজ - শান্তির পথে',
      description: 'প্রতিদিনের চাপ থেকে মুক্তির জন্য গাইডেড মেডিটেশন সিরিজ',
      type: 'audio',
      price: '৳৮৯৯',
      rating: 4.9,
      author: 'ড. নাসরিন জাহান',
      image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      sales: 1256
    },
    {
      id: '6',
      title: 'ফাইনান্সিয়াল প্ল্যানিং মাস্টার কোর্স',
      description: 'আর্থিক স্বাধীনতার পথে - সম্পদ বৃদ্ধির কৌশল',
      type: 'course',
      price: '৳৪,৪৯৯',
      rating: 4.6,
      author: 'সাদিয়া সুলতানা, সিএফএ',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      sales: 872
    },
    {
      id: '7',
      title: 'গ্রাফিক ডিজাইন রিসোর্স প্যাক',
      description: '১০০০+ ফন্ট, আইকন, টেমপ্লেট, মকআপ এবং স্টক ফটো',
      type: 'template',
      price: '৳১,২৯৯',
      rating: 4.7,
      author: 'ক্রিয়েটিভ মাইন্ডস',
      image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      sales: 2103
    },
    {
      id: '8',
      title: 'ই-কমার্স বিজনেস গাইড - সম্পূর্ণ প্যাকেজ',
      description: 'অনলাইন ব্যবসা শুরু থেকে স্কেল করার সম্পূর্ণ রোডম্যাপ',
      type: 'ebook',
      price: '৳১,৪৯৯',
      rating: 4.8,
      author: 'তামিম চৌধুরী',
      image: 'https://images.unsplash.com/photo-1661956602868-6ae368943878?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      sales: 1765
    }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for:', searchTerm);
  };

  return (
    <div className="container pt-20 pb-16">
      <div className="space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-2xl font-bold">ডিজিটাল প্রোডাক্ট মার্কেটপ্লেস</h1>
          <p className="text-muted-foreground">
            কোর্স, ইবুক, টেমপ্লেট, সফটওয়্যার, অডিও এবং আরও অনেক কিছু খুঁজুন এবং ডাউনলোড করুন
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4">
          <form onSubmit={handleSearch} className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="প্রোডাক্ট খুঁজুন..." 
              className="pl-9 pr-4"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>
          <div className="flex gap-2">
            <Select defaultValue="latest">
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="সর্টিং" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latest">সর্বশেষ</SelectItem>
                <SelectItem value="popular">জনপ্রিয়</SelectItem>
                <SelectItem value="price-high">দাম (সর্বোচ্চ থেকে)</SelectItem>
                <SelectItem value="price-low">দাম (সর্বনিম্ন থেকে)</SelectItem>
                <SelectItem value="rating">রেটিং</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon" onClick={() => setViewMode('grid')} className={viewMode === 'grid' ? 'bg-primary/10' : ''}>
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => setViewMode('list')} className={viewMode === 'list' ? 'bg-primary/10' : ''}>
              <LayoutList className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">ফিল্টার</span>
            </Button>
          </div>
        </div>

        {/* Categories */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full overflow-x-auto flex flex-nowrap justify-start whitespace-nowrap">
            <TabsTrigger value="all">সব</TabsTrigger>
            {productTypes.map((type) => (
              <TabsTrigger key={type.value} value={type.value} className="flex items-center gap-1">
                {type.icon} {type.name}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="all" className="mt-4">
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {demoProducts.map((product) => (
                  <Card key={product.id} className="overflow-hidden hover:shadow-md transition-all cursor-pointer">
                    <div className="relative aspect-[4/3]">
                      <img 
                        src={product.image} 
                        alt={product.title}
                        className="w-full h-full object-cover"
                      />
                      <Badge 
                        className="absolute top-2 right-2"
                        variant="secondary"
                      >
                        {productTypes.find(t => t.value === product.type)?.name}
                      </Badge>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium line-clamp-1">{product.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{product.description}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm text-muted-foreground">{product.author}</span>
                        <div className="flex items-center">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs ml-1">{product.rating}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex justify-between items-center">
                      <span className="font-bold text-primary">{product.price}</span>
                      <div className="flex gap-2">
                        <Button size="icon" variant="ghost">
                          <Heart className="h-4 w-4" />
                        </Button>
                        <Button size="sm">
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          কিনুন
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {demoProducts.map((product) => (
                  <Card key={product.id} className="overflow-hidden hover:shadow-md transition-all cursor-pointer">
                    <div className="flex flex-col sm:flex-row">
                      <div className="relative w-full sm:w-48 h-48">
                        <img 
                          src={product.image} 
                          alt={product.title}
                          className="w-full h-full object-cover"
                        />
                        <Badge 
                          className="absolute top-2 right-2"
                          variant="secondary"
                        >
                          {productTypes.find(t => t.value === product.type)?.name}
                        </Badge>
                      </div>
                      <div className="flex-1 p-4">
                        <div className="flex flex-col h-full justify-between">
                          <div>
                            <h3 className="font-medium">{product.title}</h3>
                            <p className="text-sm text-muted-foreground mt-1">{product.description}</p>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-sm text-muted-foreground">{product.author}</span>
                              <div className="flex items-center">
                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                <span className="text-xs ml-1">{product.rating}</span>
                                <span className="text-xs text-muted-foreground ml-2">({product.sales} বিক্রি)</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-between items-center mt-4">
                            <span className="font-bold text-primary">{product.price}</span>
                            <div className="flex gap-2">
                              <Button size="icon" variant="ghost">
                                <Heart className="h-4 w-4" />
                              </Button>
                              <Button size="sm">
                                <ShoppingCart className="h-4 w-4 mr-2" />
                                কিনুন
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {productTypes.map((type) => (
            <TabsContent key={type.value} value={type.value} className="mt-4">
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {demoProducts.filter(product => product.type === type.value).map((product) => (
                    <Card key={product.id} className="overflow-hidden hover:shadow-md transition-all cursor-pointer">
                      <div className="relative aspect-[4/3]">
                        <img 
                          src={product.image} 
                          alt={product.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-medium line-clamp-1">{product.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{product.description}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm text-muted-foreground">{product.author}</span>
                          <div className="flex items-center">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs ml-1">{product.rating}</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="p-4 pt-0 flex justify-between items-center">
                        <span className="font-bold text-primary">{product.price}</span>
                        <div className="flex gap-2">
                          <Button size="icon" variant="ghost">
                            <Heart className="h-4 w-4" />
                          </Button>
                          <Button size="sm">
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            কিনুন
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {demoProducts.filter(product => product.type === type.value).map((product) => (
                    <Card key={product.id} className="overflow-hidden hover:shadow-md transition-all cursor-pointer">
                      <div className="flex flex-col sm:flex-row">
                        <div className="relative w-full sm:w-48 h-48">
                          <img 
                            src={product.image} 
                            alt={product.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 p-4">
                          <div className="flex flex-col h-full justify-between">
                            <div>
                              <h3 className="font-medium">{product.title}</h3>
                              <p className="text-sm text-muted-foreground mt-1">{product.description}</p>
                              <div className="flex items-center justify-between mt-2">
                                <span className="text-sm text-muted-foreground">{product.author}</span>
                                <div className="flex items-center">
                                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                  <span className="text-xs ml-1">{product.rating}</span>
                                  <span className="text-xs text-muted-foreground ml-2">({product.sales} বিক্রি)</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex justify-between items-center mt-4">
                              <span className="font-bold text-primary">{product.price}</span>
                              <div className="flex gap-2">
                                <Button size="icon" variant="ghost">
                                  <Heart className="h-4 w-4" />
                                </Button>
                                <Button size="sm">
                                  <ShoppingCart className="h-4 w-4 mr-2" />
                                  কিনুন
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
              {demoProducts.filter(product => product.type === type.value).length === 0 && (
                <div className="text-center py-16">
                  <p className="text-muted-foreground">এই ক্যাটেগরিতে কোন প্রোডাক্ট নেই</p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default DigitalProductsMarketplace;
