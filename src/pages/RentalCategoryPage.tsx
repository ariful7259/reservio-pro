import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  MapPin,
  Star,
  Filter,
  Share2,
  Heart,
  ArrowLeft,
  Calendar
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import SocialShareModal from '@/components/SocialShareModal';
import CategoryFilterForm from '@/components/rentals/CategoryFilterForm';
import { rentCategories } from '@/data/rentalCategoriesData';

const categoryData = {
  'electronics': {
    title: 'ইলেকট্রনিক্স',
    items: [
      {
        id: 1,
        title: 'ডিএসএলআর ক্যামেরা',
        location: 'ধানমন্ডি, ঢাকা',
        price: '৳১,০০০/দিন',
        image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop',
        category: 'ইলেকট্রনিক্স',
        rating: 4.8
      },
      {
        id: 2,
        title: '৪৩ ইঞ্চি স্মার্ট টিভি',
        location: 'গুলশান, ঢাকা',
        price: '৳১,২০০/দিন',
        image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=1000&auto=format&fit=crop',
        category: 'ইলেকট্রনিক্স',
        rating: 4.6
      },
      {
        id: 3,
        title: 'গেমিং ল্যাপটপ',
        location: 'মিরপুর, ঢাকা',
        price: '৳১,৫০০/দিন',
        image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=1000&auto=format&fit=crop',
        category: 'ইলেকট্রনিক্স',
        rating: 4.7
      }
    ]
  },
  'transport': {
    title: 'পরিবহন',
    items: [
      {
        id: 4,
        title: 'টয়োটা কোরোলা',
        location: 'মিরপুর, ঢাকা',
        price: '৳৫,০০০/দিন',
        image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=1000&auto=format&fit=crop',
        category: 'পরিবহন',
        rating: 4.6
      },
      {
        id: 5,
        title: 'হোন্ডা সিবিআর মোটরসাইকেল',
        location: 'উত্তরা, ঢাকা',
        price: '৳১,২০০/দিন',
        image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=1000&auto=format&fit=crop',
        category: 'পরিবহন',
        rating: 4.7
      }
    ]
  },
  'event': {
    title: 'ইভেন্ট সামগ্রী',
    items: [
      {
        id: 6,
        title: 'সাউন্ড সিস্টেম (পূর্ণ সেট)',
        location: 'মোহাম্মদপুর, ঢাকা',
        price: '৳১০,০০০/দিন',
        image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=1000&auto=format&fit=crop',
        category: 'ইভেন্ট সামগ্রী',
        rating: 4.9
      },
      {
        id: 7,
        title: 'ইভেন্ট টেন্ট (১০০ জন)',
        location: 'ধানমন্ডি, ঢাকা',
        price: '৳৮,০০০/দিন',
        image: 'https://images.unsplash.com/photo-1478827536114-da961b7f86d2?q=80&w=1000&auto=format&fit=crop',
        category: 'ইভেন্ট সামগ্রী',
        rating: 4.7
      }
    ]
  },
  'home': {
    title: 'ঘরোয়া সামগ্রী',
    items: [
      {
        id: 8,
        title: 'এসি (১.৫ টন)',
        location: 'গুলশান, ঢাকা',
        price: '৳৮০০/দিন',
        image: 'https://images.unsplash.com/photo-1493018772444-f6db32ea789e?q=80&w=1000&auto=format&fit=crop',
        category: 'ঘরোয়া সামগ্রী',
        rating: 4.5
      },
      {
        id: 9,
        title: 'সোফা সেট',
        location: 'মিরপুর, ঢাকা',
        price: '৳৫০০/দিন',
        image: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?q=80&w=1000&auto=format&fit=crop',
        category: 'ঘরোয়া সামগ্রী',
        rating: 4.4
      }
    ]
  },
  'education': {
    title: 'শিক্ষা সামগ্রী',
    items: [
      {
        id: 10,
        title: 'প্রজেক্টর (হাই ডেফিনিশন)',
        location: 'নিউমার্কেট, ঢাকা',
        price: '৳১,২০০/দিন',
        image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=1000&auto=format&fit=crop',
        category: 'শিক্ষা সামগ্রী',
        rating: 4.6
      },
      {
        id: 11,
        title: 'হোয়াইটবোর্ড (বড় সাইজ)',
        location: 'ফার্মগেট, ঢাকা',
        price: '৳৩০০/দিন',
        image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1000&auto=format&fit=crop',
        category: 'শিক্ষা সামগ্রী',
        rating: 4.3
      }
    ]
  },
  'agriculture': {
    title: 'কৃষি যন্ত্রপাতি',
    items: [
      {
        id: 12,
        title: 'পাওয়ার টিলার',
        location: 'সাভার, ঢাকা',
        price: '৳১,২০০/দিন',
        image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1000&auto=format&fit=crop',
        category: 'কৃষি যন্ত্রপাতি',
        rating: 4.5
      },
      {
        id: 13,
        title: 'হারভেস্টার মেশিন',
        location: 'গাজীপুর, ঢাকা',
        price: '৳২,৫০০/দিন',
        image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1000&auto=format&fit=crop',
        category: 'কৃষি যন্ত্রপাতি',
        rating: 4.7
      }
    ]
  },
  'business': {
    title: 'ব্যবসায়িক সামগ্রী',
    items: [
      {
        id: 14,
        title: 'প্রজেক্টর (বিজনেস গ্রেড)',
        location: 'মতিঝিল, ঢাকা',
        price: '৳১,০০০/দিন',
        image: 'https://images.unsplash.com/photo-1525913984309-0d4086099e69?q=80&w=1000&auto=format&fit=crop',
        category: 'ব্যবসায়িক সামগ্রী',
        rating: 4.8
      },
      {
        id: 15,
        title: 'পিওএস মেশিন',
        location: 'গুলশান, ঢাকা',
        price: '৳৫০০/দিন',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1000&auto=format&fit=crop',
        category: 'ব্যবসায়িক সামগ্রী',
        rating: 4.6
      }
    ]
  },
  'tools': {
    title: 'কারিগরি টুলস',
    items: [
      {
        id: 16,
        title: 'ড্রিল মেশিন',
        location: 'মিরপুর, ঢাকা',
        price: '৳৩০০/দিন',
        image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?q=80&w=1000&auto=format&fit=crop',
        category: 'কারিগরি টুলস',
        rating: 4.7
      },
      {
        id: 17,
        title: 'ওয়েল্ডিং মেশিন',
        location: 'তেজগাঁও, ঢাকা',
        price: '৳৮০০/দিন',
        image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1000&auto=format&fit=crop',
        category: 'কারিগরি টুলস',
        rating: 4.5
      }
    ]
  },
  'commercial': {
    title: 'কমার্শিয়াল স্পেস',
    items: [
      {
        id: 18,
        title: 'অফিস স্পেস',
        location: 'বনানী, ঢাকা',
        price: '৳৫০,০০০/মাস',
        image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1000&auto=format&fit=crop',
        category: 'কমার্শিয়াল স্পেস',
        rating: 4.7
      },
      {
        id: 19,
        title: 'দোকানের স্পেস',
        location: 'নিউমার্কেট, ঢাকা',
        price: '৳২৫,০০০/মাস',
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1000&auto=format&fit=crop',
        category: 'কমার্শিয়াল স্পেস',
        rating: 4.4
      }
    ]
  },
  'guesthouse': {
    title: 'গেস্ট হাউস/স্বল্পমেয়াদী',
    items: [
      {
        id: 20,
        title: 'গেস্ট হাউস (২ বেডরুম)',
        location: 'বারিধারা, ঢাকা',
        price: '৳২,৫০০/দিন',
        image: 'https://images.unsplash.com/photo-1586105251261-72a756497a11?q=80&w=1000&auto=format&fit=crop',
        category: 'গেস্ট হাউস/স্বল্পমেয়াদী',
        rating: 4.6
      },
      {
        id: 21,
        title: 'ফ্যামিলি গেস্ট হাউস',
        location: 'উত্তরা, ঢাকা',
        price: '৳৩,০০০/দিন',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000&auto=format&fit=crop',
        category: 'গেস্ট হাউস/স্বল্পমেয়াদী',
        rating: 4.8
      }
    ]
  },
  'rural': {
    title: 'গ্রামীণ বাসস্থান',
    items: [
      {
        id: 22,
        title: 'গ্রামীণ বাড়ি',
        location: 'কেরানীগঞ্জ, ঢাকা',
        price: '৳১৫,০০০/মাস',
        image: 'https://images.unsplash.com/photo-1572547736089-b3dd93c9ac2e?q=80&w=1000&auto=format&fit=crop',
        category: 'গ্রামীণ বাসস্থান',
        rating: 4.5
      },
      {
        id: 23,
        title: 'কুটির ঘর',
        location: 'টঙ্গী, গাজীপুর',
        price: '৳৮,০০০/মাস',
        image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=1000&auto=format&fit=crop',
        category: 'গ্রামীণ বাসস্থান',
        rating: 4.3
      }
    ]
  },
  'studio': {
    title: 'স্টুডিও/স্পেশাল স্পেস',
    items: [
      {
        id: 24,
        title: 'ফটোগ্রাফি স্টুডিও',
        location: 'গুলশান, ঢাকা',
        price: '৳১০,০০০/দিন',
        image: 'https://images.unsplash.com/photo-1558449028-b53a39d100fc?q=80&w=1000&auto=format&fit=crop',
        category: 'স্টুডিও/স্পেশাল স্পেস',
        rating: 4.8
      },
      {
        id: 25,
        title: 'ভিডিও শুটিং স্টুডিও',
        location: 'ধানমন্ডি, ঢাকা',
        price: '৳১৫,০০০/দিন',
        image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=1000&auto=format&fit=crop',
        category: 'স্টুডিও/স্পেশাল স্পেস',
        rating: 4.9
      }
    ]
  }
};

const RentalCategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [sortBy, setSortBy] = useState('recommended');
  const [shareItem, setShareItem] = useState<any | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter states
  const [selectedSubcategory, setSelectedSubcategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  // Find category from rentCategories data
  const rentCategory = rentCategories.find(cat => 
    cat.path.includes(categoryId || '') || cat.name.toLowerCase().includes(categoryId?.toLowerCase() || '')
  );
  
  const category = categoryId && categoryData[categoryId as keyof typeof categoryData];
  
  useEffect(() => {
    if (!categoryId) {
      toast({
        title: "ক্যাটাগরি আইডি পাওয়া যায়নি",
        description: "URL এ ক্যাটাগরি আইডি অনুপস্থিত। মূল পৃষ্ঠায় ফিরে যাচ্ছি।",
        variant: "destructive"
      });
      navigate('/rentals');
      return;
    }
    
    if (!category) {
      toast({
        title: "ক্যাটাগরি পাওয়া যায়নি",
        description: `দুঃখিত, "${categoryId}" ক্যাটাগরি পাওয়া যায়নি। মূল পৃষ্ঠায় ফিরে যাচ্ছি।`,
        variant: "destructive"
      });
      navigate('/rentals');
    }
  }, [category, categoryId, navigate, toast]);

  const handleGetCurrentLocation = () => {
    setIsGettingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setSelectedLocation('current');
          setIsGettingLocation(false);
          toast({
            title: "অবস্থান পাওয়া গেছে",
            description: "আপনার বর্তমান অবস্থান ব্যবহার করা হচ্ছে"
          });
        },
        () => {
          setIsGettingLocation(false);
          toast({
            title: "অবস্থান পাওয়া যায়নি",
            description: "অনুগ্রহ করে ম্যানুয়ালি এলাকা নির্বাচন করুন",
            variant: "destructive"
          });
        }
      );
    }
  };

  const handleApplyFilter = () => {
    toast({
      title: "ফিল্টার প্রয়োগ করা হয়েছে",
      description: `${category?.title} এর জন্য ফিল্টার আপডেট হয়েছে`
    });
  };

  if (!category) {
    return null;
  }

  const handleListingClick = (id: number) => {
    navigate(`/rent-details/${id}`);
  };

  const handleBookmark = (e: React.MouseEvent, rentalId: number) => {
    e.stopPropagation();
    toast({
      title: "সংরক্ষিত হয়েছে",
      description: "রেন্টাল আইটেমটি আপনার পছন্দের তালিকায় যোগ করা হয়েছে",
    });
  };

  const handleShare = (e: React.MouseEvent, rental: any) => {
    e.stopPropagation();
    setShareItem({
      ...rental,
      type: 'rental',
    });
    setShowShareModal(true);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
  };

  const handleBookNow = (e: React.MouseEvent, rentalId: number) => {
    e.stopPropagation();
    navigate(`/rent-details/${rentalId}`);
  };

  return (
    <div className="container px-4 pt-20 pb-20">
      <div className="flex items-center gap-2 mb-2">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate('/rentals')}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold">{category.title}</h1>
      </div>
      {rentCategory && (
        <p className="text-sm text-muted-foreground mb-6">
          {rentCategory.count} আইটেম উপলব্ধ • {rentCategory.subcategories?.length || 0} সাব-ক্যাটাগরি
        </p>
      )}

      {/* Category Info Card */}
      {rentCategory && (
        <Card className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 mb-6">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              {rentCategory.icon}
            </div>
            <div>
              <h3 className="text-lg font-semibold">{rentCategory.name}</h3>
              <p className="text-sm text-muted-foreground">
                {rentCategory.count} আইটেম উপলব্ধ
              </p>
            </div>
          </div>
          
          {rentCategory.subcategories && rentCategory.subcategories.length > 0 && (
            <div>
              <h4 className="font-medium mb-2 text-sm">সাব-ক্যাটাগরি সমূহ:</h4>
              <div className="flex flex-wrap gap-2">
                {rentCategory.subcategories.slice(0, 6).map((sub: any, index: number) => (
                  <Badge 
                    key={index} 
                    variant="outline"
                    className="cursor-pointer hover:bg-primary/10 text-xs"
                    onClick={() => setSelectedSubcategory(selectedSubcategory === sub.name ? 'all' : sub.name)}
                  >
                    {sub.name} ({sub.count || 0})
                  </Badge>
                ))}
                {rentCategory.subcategories.length > 6 && (
                  <Badge variant="secondary" className="text-xs">
                    +{rentCategory.subcategories.length - 6} আরও
                  </Badge>
                )}
              </div>
            </div>
          )}
        </Card>
      )}

      {/* Filter Section */}
      <div className="mb-6">
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="mb-4"
        >
          <Filter className="h-4 w-4 mr-2" />
          ফিল্টার {showFilters ? 'লুকান' : 'দেখান'}
        </Button>
        
        {showFilters && (
          <CategoryFilterForm
            category={{
              title: category.title,
              id: categoryId,
              subcategories: rentCategory?.subcategories || []
            }}
            selectedSubcategory={selectedSubcategory}
            selectedLocation={selectedLocation}
            priceRange={priceRange}
            isGettingLocation={isGettingLocation}
            onSubcategoryChange={setSelectedSubcategory}
            onLocationChange={setSelectedLocation}
            onPriceRangeChange={setPriceRange}
            onGetCurrentLocation={handleGetCurrentLocation}
            onApplyFilter={handleApplyFilter}
          />
        )}
      </div>
      
      <div className="flex items-center justify-between mb-6">
        <div className="text-sm text-muted-foreground">
          <span>{category.items.length} আইটেম পাওয়া গেছে</span>
        </div>
        <div className="flex gap-2">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="সর্ট করুন" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recommended">রেকমেন্ডেড</SelectItem>
              <SelectItem value="price_low">দাম (কম থেকে বেশি)</SelectItem>
              <SelectItem value="price_high">দাম (বেশি থেকে কম)</SelectItem>
              <SelectItem value="rating">রেটিং</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {category.items.map((listing) => (
          <Card 
            key={listing.id} 
            className="overflow-hidden cursor-pointer hover:shadow-md transition-all"
            onClick={() => handleListingClick(listing.id)}
          >
            <div className="relative aspect-square">
              <img 
                src={listing.image} 
                alt={listing.title} 
                className="w-full h-full object-cover"
              />
              <Badge className="absolute top-2 left-2">{listing.category}</Badge>
              <div className="absolute top-2 right-2 flex flex-col gap-2">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="bg-white h-8 w-8 rounded-full"
                  onClick={(e) => handleBookmark(e, listing.id)}
                >
                  <Heart className="h-4 w-4 text-gray-600" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="bg-white h-8 w-8 rounded-full"
                  onClick={(e) => handleShare(e, listing)}
                >
                  <Share2 className="h-4 w-4 text-gray-600" />
                </Button>
              </div>
            </div>
            
            <CardContent className="p-3">
              <h3 className="font-medium text-sm line-clamp-1">{listing.title}</h3>
              <div className="flex items-center text-xs text-muted-foreground my-1">
                <MapPin className="h-3 w-3 mr-1" /> 
                <span>{listing.location}</span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-primary">{listing.price}</p>
                <div className="flex items-center">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs ml-1">{listing.rating}</span>
                </div>
              </div>
              <Button 
                className="w-full mt-3"
                size="sm"
                onClick={(e) => handleBookNow(e, listing.id)}
              >
                <Calendar className="h-4 w-4 mr-2" /> বুকিং করুন
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {shareItem && (
        <SocialShareModal 
          open={showShareModal}
          onOpenChange={setShowShareModal}
          item={shareItem}
        />
      )}
    </div>
  );
};

export default RentalCategoryPage;
