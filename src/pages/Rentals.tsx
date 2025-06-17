
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { SearchFilterSection } from '@/components/shared/SearchFilterSection';
import { 
  Building2, 
  Car, 
  Bike, 
  Home, 
  MapPin, 
  Star, 
  Heart, 
  Share2,
  Calendar,
  Users,
  Eye,
  TrendingUp,
  Package,
  Clock
} from 'lucide-react';

const Rentals = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const rentCategories = [
    {
      id: 'apartment',
      name: 'অ্যাপার্টমেন্ট',
      icon: <Building2 className="h-7 w-7" />,
      color: 'bg-blue-50',
      iconColor: 'text-blue-500',
      count: 342
    },
    {
      id: 'house',
      name: 'বাসা',
      icon: <Home className="h-7 w-7" />,
      color: 'bg-green-50',
      iconColor: 'text-green-500',
      count: 256
    },
    {
      id: 'car',
      name: 'গাড়ি',
      icon: <Car className="h-7 w-7" />,
      color: 'bg-red-50',
      iconColor: 'text-red-500',
      count: 145
    },
    {
      id: 'bike',
      name: 'বাইক',
      icon: <Bike className="h-7 w-7" />,
      color: 'bg-yellow-50',
      iconColor: 'text-yellow-600',
      count: 189
    },
    {
      id: 'office',
      name: 'অফিস স্পেস',
      icon: <Building2 className="h-7 w-7" />,
      color: 'bg-purple-50',
      iconColor: 'text-purple-500',
      count: 78
    },
    {
      id: 'shop',
      name: 'দোকান',
      icon: <Building2 className="h-7 w-7" />,
      color: 'bg-indigo-50',
      iconColor: 'text-indigo-500',
      count: 92
    },
    {
      id: 'hall',
      name: 'ইভেন্ট হল',
      icon: <Building2 className="h-7 w-7" />,
      color: 'bg-pink-50',
      iconColor: 'text-pink-500',
      count: 45
    },
    {
      id: 'equipment',
      name: 'যন্ত্রপাতি',
      icon: <Package className="h-7 w-7" />,
      color: 'bg-orange-50',
      iconColor: 'text-orange-500',
      count: 67
    }
  ];

  const featuredListings = [
    {
      id: 1,
      title: '৩ বেডরুমের অ্যাপার্টমেন্ট',
      location: 'গুলশান, ঢাকা',
      price: '৳ ৪৫,০০০/মাস',
      rating: 4.8,
      reviews: 24,
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
      category: 'অ্যাপার্টমেন্ট',
      verified: true
    },
    {
      id: 2,
      title: 'টয়োটা প্রিমিও',
      location: 'ধানমন্ডি, ঢাকা',
      price: '৳ ৩,৫০০/দিন',
      rating: 4.6,
      reviews: 18,
      image: 'https://images.unsplash.com/photo-1549924231-f129b911e442?w=400&h=300&fit=crop',
      category: 'গাড়ি',
      verified: true
    },
    {
      id: 3,
      title: 'আধুনিক অফিস স্পেস',
      location: 'বনানী, ঢাকা',
      price: '৳ ৮০,০০০/মাস',
      rating: 4.9,
      reviews: 12,
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop',
      category: 'অফিস',
      verified: false
    },
    {
      id: 4,
      title: 'Honda CB150R',
      location: 'মিরপুর, ঢাকা',
      price: '৳ ১,২০০/দিন',
      rating: 4.5,
      reviews: 31,
      image: 'https://images.unsplash.com/photo-1558618666-fd7c37c8ea71?w=400&h=300&fit=crop',
      category: 'বাইক',
      verified: true
    }
  ];

  const handleListingClick = (id: number) => {
    toast({
      title: "বিস্তারিত দেখুন",
      description: `আইটেম #${id} এর বিস্তারিত দেখা হচ্ছে`
    });
  };

  const handleBookmark = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    toast({
      title: "বুকমার্ক করা হয়েছে",
      description: `আইটেম #${id} বুকমার্ক তালিকায় যোগ করা হয়েছে`
    });
  };

  const handleShare = (e: React.MouseEvent, rental: any) => {
    e.stopPropagation();
    toast({
      title: "শেয়ার করুন",
      description: `${rental.title} শেয়ার করা হচ্ছে`
    });
  };

  return (
    <div className="container px-4 pt-20 pb-20">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">রেন্টাল সার্ভিস</h1>
        <p className="text-muted-foreground">আপনার প্রয়োজনীয় জিনিস ভাড়া নিন</p>
      </div>

      <SearchFilterSection
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        placeholder="রেন্টাল আইটেম খুঁজুন..."
      />

      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">ক্যাটাগরি সমূহ</h2>
        <div className="grid grid-cols-4 gap-4">
          {rentCategories.map((category) => (
            <div key={category.id} className="flex flex-col items-center text-center p-4 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
              <div className={`w-16 h-16 rounded-full ${category.color} flex items-center justify-center mb-3`}>
                <div className={category.iconColor}>
                  {category.icon}
                </div>
              </div>
              <h3 className="font-medium text-sm mb-2">{category.name}</h3>
              <Badge variant="success" className="text-xs">
                {category.count} আইটেম
              </Badge>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-6">
          <Button variant="outline" className="text-red-500 border-red-500 hover:bg-red-50">
            ∨ আরো দেখুন
          </Button>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">ফিচার্ড রেন্টাল</h2>
          <Button variant="outline" size="sm">
            সব দেখুন
          </Button>
        </div>
        <div className={viewMode === 'grid' ? 'grid grid-cols-2 md:grid-cols-4 gap-4' : 'space-y-4'}>
          {featuredListings.map((listing) => (
            <Card key={listing.id} className="overflow-hidden cursor-pointer hover:shadow-md transition-all hover:scale-105" onClick={() => handleListingClick(listing.id)}>
              {viewMode === 'grid' ? (
                <CardContent className="p-0">
                  <div className="relative">
                    <img 
                      src={listing.image} 
                      alt={listing.title} 
                      className="w-full h-48 object-cover"
                    />
                    <Badge className="absolute top-2 left-2">{listing.category}</Badge>
                    <div className="absolute top-2 right-2 flex flex-col gap-2">
                      <Button variant="outline" size="icon" className="bg-white h-8 w-8 rounded-full" onClick={(e) => handleBookmark(e, listing.id)}>
                        <Heart className="h-4 w-4 text-gray-600" />
                      </Button>
                      <Button variant="outline" size="icon" className="bg-white h-8 w-8 rounded-full" onClick={(e) => handleShare(e, listing)}>
                        <Share2 className="h-4 w-4 text-gray-600" />
                      </Button>
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-sm line-clamp-1">{listing.title}</h3>
                    <div className="flex items-center gap-1 mb-2">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{listing.location}</span>
                    </div>
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs">{listing.rating}</span>
                      <span className="text-xs text-muted-foreground">({listing.reviews})</span>
                    </div>
                    <p className="text-sm font-bold text-primary">{listing.price}</p>
                  </div>
                </CardContent>
              ) : (
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="relative w-24 h-24 flex-shrink-0">
                      <img 
                        src={listing.image} 
                        alt={listing.title} 
                        className="w-full h-full object-cover rounded"
                      />
                      <Badge className="absolute -top-1 -left-1 text-xs">{listing.category}</Badge>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium mb-1">{listing.title}</h3>
                      <div className="flex items-center gap-1 mb-1">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{listing.location}</span>
                      </div>
                      <div className="flex items-center gap-1 mb-2">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs">{listing.rating}</span>
                        <span className="text-xs text-muted-foreground">({listing.reviews})</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-primary">{listing.price}</span>
                        <div className="flex gap-1">
                          <Button variant="outline" size="icon" className="h-6 w-6" onClick={(e) => handleBookmark(e, listing.id)}>
                            <Heart className="h-3 w-3" />
                          </Button>
                          <Button variant="outline" size="icon" className="h-6 w-6" onClick={(e) => handleShare(e, listing)}>
                            <Share2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <Eye className="h-5 w-5 text-blue-500" />
              <span className="font-medium">মোট ভিজিটর</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">১,৮৫৬</span>
              <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                <TrendingUp className="h-3 w-3 mr-1" />
                +১২%
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="h-5 w-5 text-purple-500" />
              <span className="font-medium">আজকের বুকিং</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">৪২</span>
              <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50">
                <Clock className="h-3 w-3 mr-1" />
                সক্রিয়
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-5 w-5 text-orange-500" />
              <span className="font-medium">মোট ভাড়াদাতা</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">৬৭৮</span>
              <Badge variant="outline" className="text-purple-600 border-purple-200 bg-purple-50">
                <Users className="h-3 w-3 mr-1" />
                নিবন্ধিত
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Rentals;
