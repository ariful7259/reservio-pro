import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  MapPin,
  Star,
  Filter,
  ChevronRight,
  Share2,
  Heart,
  ArrowLeft,
  Calendar
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import SocialShareModal from '@/components/SocialShareModal';
import RentalCategoryFilterForm from '@/components/rentals/RentalCategoryFilterForm';

// ক্যাটাগরি-ভিত্তিক ডেটা ম্যাপিং
const categoryData = {
  'electronics': {
    title: 'ইলেকট্রনিক্স',
    subcategories: [
      { id: 'camera', name: 'ক্যামেরা', count: 25 },
      { id: 'tv', name: 'টিভি', count: 18 },
      { id: 'laptop', name: 'ল্যাপটপ', count: 32 },
      { id: 'speaker', name: 'স্পিকার', count: 15 }
    ],
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
      },
      {
        id: 4,
        title: 'স্পিকার সিস্টেম',
        location: 'বনানী, ঢাকা',
        price: '৳৮০০/দিন',
        image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=1000&auto=format&fit=crop',
        category: 'ইলেকট্রনিক্স',
        rating: 4.5
      }
    ]
  },
  'transport': {
    title: 'পরিবহন',
    subcategories: [
      { id: 'car', name: 'গাড়ি', count: 45 },
      { id: 'bike', name: 'বাইক', count: 38 },
      { id: 'bus', name: 'বাস/মাইক্রো', count: 12 }
    ],
    items: [
      {
        id: 5,
        title: 'টয়োটা কোরোলা',
        location: 'মিরপুর, ঢাকা',
        price: '৳৫,০০০/দিন',
        image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=1000&auto=format&fit=crop',
        category: 'পরিবহন',
        rating: 4.6
      },
      {
        id: 6,
        title: 'হোন্ডা সিবিআর মোটরসাইকেল',
        location: 'উত্তরা, ঢাকা',
        price: '৳১,২০০/দিন',
        image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=1000&auto=format&fit=crop',
        category: 'পরিবহন',
        rating: 4.7
      },
      {
        id: 7,
        title: 'হিয়াচে মাইক্রোবাস',
        location: 'সাভার, ঢাকা',
        price: '৳৮,০০০/দিন',
        image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1000&auto=format&fit=crop',
        category: 'পরিবহন',
        rating: 4.4
      }
    ]
  },
  'event': {
    title: 'ইভেন্ট সামগ্রী',
    subcategories: [
      { id: 'sound', name: 'সাউন্ড সিস্টেম', count: 20 },
      { id: 'tent', name: 'টেন্ট', count: 15 },
      { id: 'lighting', name: 'লাইটিং', count: 18 }
    ],
    items: [
      {
        id: 8,
        title: 'সাউন্ড সিস্টেম (পূর্ণ সেট)',
        location: 'মোহাম্মদপুর, ঢাকা',
        price: '৳১০,০০০/দিন',
        image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=1000&auto=format&fit=crop',
        category: 'ইভেন্ট সামগ্রী',
        rating: 4.9
      },
      {
        id: 9,
        title: 'ওয়েডিং টেন্ট',
        location: 'উত্তরা, ঢাকা',
        price: '৳১৫,০০০/দিন',
        image: 'https://images.unsplash.com/photo-1519167758481-83f29c7c8dc3?q=80&w=1000&auto=format&fit=crop',
        category: 'ইভেন্ট সামগ্রী',
        rating: 4.6
      },
      {
        id: 32,
        title: 'LED লাইটিং সেট',
        location: 'ধানমন্ডি, ঢাকা',
        price: '৳৫,০০০/দিন',
        image: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?q=80&w=1000&auto=format&fit=crop',
        category: 'ইভেন্ট সামগ্রী',
        rating: 4.7
      }
    ]
  },
  'home': {
    title: 'ঘরোয়া সামগ্রী',
    subcategories: [
      { id: 'ac', name: 'এসি', count: 30 },
      { id: 'furniture', name: 'আসবাবপত্র', count: 25 },
      { id: 'appliances', name: 'যন্ত্রপাতি', count: 20 }
    ],
    items: [
      {
        id: 10,
        title: 'এসি (১.৫ টন)',
        location: 'গুলশান, ঢাকা',
        price: '৳৮০০/দিন',
        image: 'https://images.unsplash.com/photo-1493018772444-f6db32ea789e?q=80&w=1000&auto=format&fit=crop',
        category: 'ঘরোয়া সামগ্রী',
        rating: 4.5
      },
      {
        id: 11,
        title: 'সোফা সেট',
        location: 'মিরপুর, ঢাকা',
        price: '৳১,৫০০/সপ্তাহ',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1000&auto=format&fit=crop',
        category: 'ঘরোয়া সামগ্রী',
        rating: 4.3
      },
      {
        id: 33,
        title: 'ওয়াশিং মেশিন',
        location: 'বনানী, ঢাকা',
        price: '৳৬০০/দিন',
        image: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?q=80&w=1000&auto=format&fit=crop',
        category: 'ঘরোয়া সামগ্রী',
        rating: 4.4
      }
    ]
  },
  'education': {
    title: 'শিক্ষা সামগ্রী',
    subcategories: [
      { id: 'books', name: 'বই', count: 50 },
      { id: 'equipment', name: 'যন্ত্রপাতি', count: 15 },
      { id: 'stationary', name: 'স্টেশনারি', count: 25 }
    ],
    items: [
      {
        id: 12,
        title: 'টিউটোরিয়াল বইসমূহ',
        location: 'নিউমার্কেট, ঢাকা',
        price: '৳২০০/সপ্তাহ',
        image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=1000&auto=format&fit=crop',
        category: 'শিক্ষা সামগ্রী',
        rating: 4.6
      },
      {
        id: 13,
        title: 'প্রজেক্টর',
        location: 'ধানমন্ডি, ঢাকা',
        price: '৳১,০০০/দিন',
        image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=1000&auto=format&fit=crop',
        category: 'শিক্ষা সামগ্রী',
        rating: 4.8
      },
      {
        id: 34,
        title: 'হোয়াইটবোর্ড সেট',
        location: 'গুলশান, ঢাকা',
        price: '৳৩০০/দিন',
        image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=1000&auto=format&fit=crop',
        category: 'শিক্ষা সামগ্রী',
        rating: 4.2
      }
    ]
  },
  'agriculture': {
    title: 'কৃষি যন্ত্রপাতি',
    subcategories: [
      { id: 'tractor', name: 'ট্রাক্টর', count: 15 },
      { id: 'tools', name: 'কৃষি সরঞ্জাম', count: 30 },
      { id: 'harvester', name: 'হার্ভেস্টার', count: 8 }
    ],
    items: [
      {
        id: 14,
        title: 'ট্রাক্টর (৫০ এইচপি)',
        location: 'সাভার, ঢাকা',
        price: '৳৩,০০০/দিন',
        image: 'https://images.unsplash.com/photo-1544967082-d9759a4c0c50?q=80&w=1000&auto=format&fit=crop',
        category: 'কৃষি যন্ত্রপাতি',
        rating: 4.7
      },
      {
        id: 15,
        title: 'পাওয়ার টিলার',
        location: 'গাজীপুর, ঢাকা',
        price: '৳১,৫০০/দিন',
        image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=1000&auto=format&fit=crop',
        category: 'কৃষি যন্ত্রপাতি',
        rating: 4.5
      },
      {
        id: 35,
        title: 'ধান কাটার মেশিন',
        location: 'নারায়ণগঞ্জ, ঢাকা',
        price: '৳২,৫০০/দিন',
        image: 'https://images.unsplash.com/photo-1600298881974-6be191ceeda1?q=80&w=1000&auto=format&fit=crop',
        category: 'কৃষি যন্ত্রপাতি',
        rating: 4.6
      }
    ]
  },
  'business': {
    title: 'ব্যবসায়িক সামগ্রী',
    subcategories: [
      { id: 'office', name: 'অফিস সামগ্রী', count: 40 },
      { id: 'equipment', name: 'যন্ত্রপাতি', count: 25 },
      { id: 'furniture', name: 'আসবাবপত্র', count: 30 }
    ],
    items: [
      {
        id: 16,
        title: 'অফিস টেবিল ও চেয়ার সেট',
        location: 'মতিঝিল, ঢাকা',
        price: '৳৮০০/দিন',
        image: 'https://images.unsplash.com/photo-1541558869434-2840d308329a?q=80&w=1000&auto=format&fit=crop',
        category: 'ব্যবসায়িক সামগ্রী',
        rating: 4.4
      },
      {
        id: 17,
        title: 'ফটোকপি মেশিন',
        location: 'পুরান ঢাকা, ঢাকা',
        price: '৳১,২০০/দিন',
        image: 'https://images.unsplash.com/photo-1534237776793-b5d0ff3c5c86?q=80&w=1000&auto=format&fit=crop',
        category: 'ব্যবসায়িক সামগ্রী',
        rating: 4.3
      },
      {
        id: 36,
        title: 'কনফারেন্স টেবিল',
        location: 'বনানী, ঢাকা',
        price: '৳১,০০০/দিন',
        image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1000&auto=format&fit=crop',
        category: 'ব্যবসায়িক সামগ্রী',
        rating: 4.5
      }
    ]
  },
  'tools': {
    title: 'কারিগরি টুলস',
    subcategories: [
      { id: 'power-tools', name: 'পাওয়ার টুলস', count: 35 },
      { id: 'hand-tools', name: 'হ্যান্ড টুলস', count: 50 },
      { id: 'welding', name: 'ওয়েল্ডিং', count: 20 }
    ],
    items: [
      {
        id: 18,
        title: 'ড্রিল মেশিন সেট',
        location: 'তেজগাঁও, ঢাকা',
        price: '৳৫০০/দিন',
        image: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?q=80&w=1000&auto=format&fit=crop',
        category: 'কারিগরি টুলস',
        rating: 4.6
      },
      {
        id: 19,
        title: 'হ্যামার ও স্ক্রু ড্রাইভার সেট',
        location: 'মিরপুর, ঢাকা',
        price: '৳২০০/দিন',
        image: 'https://images.unsplash.com/photo-1609205148533-9b9de7d8c77c?q=80&w=1000&auto=format&fit=crop',
        category: 'কারিগরি টুলস',
        rating: 4.4
      },
      {
        id: 37,
        title: 'ওয়েল্ডিং মেশিন',
        location: 'কমলাপুর, ঢাকা',
        price: '৳১,৮০০/দিন',
        image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=1000&auto=format&fit=crop',
        category: 'কারিগরি টুলস',
        rating: 4.7
      }
    ]
  }
};

const RentalCategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [sortBy, setSortBy] = useState('recommended');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [shareItem, setShareItem] = useState<any | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);

  // ডিবাগিং তথ্য লগ করা
  useEffect(() => {
    console.log("Current categoryId from URL:", categoryId);
    console.log("Available categories:", Object.keys(categoryData));
    console.log("Category found:", categoryId && categoryData[categoryId as keyof typeof categoryData] ? "Yes" : "No");
  }, [categoryId]);

  // ক্যাটাগরি ডেটা লোড করা
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

  if (!category) {
    return null;
  }

  // Check if this is a housing category (বাসা বাড়ি related)
  const isHousingCategory = categoryId && ['apartment', 'house', 'hostel', 'room', 'commercial', 'guesthouse', 'rural', 'studio'].includes(categoryId);

  // Filter items based on selected subcategory
  const filteredItems = selectedSubcategory === 'all' 
    ? category.items 
    : category.items.filter(item => {
        const subcategoryName = category.subcategories.find(sub => sub.id === selectedSubcategory)?.name;
        return subcategoryName && item.title.includes(subcategoryName);
      });

  const handleListingClick = (id: number) => {
    console.log(`Navigating to rent details for item ID: ${id}`);
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
    console.log(`Booking now for item ID: ${rentalId}`);
    navigate(`/rent-details/${rentalId}`);
  };

  return (
    <div className="container px-4 pt-20 pb-20">
      <div className="flex items-center gap-2 mb-6">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate('/rentals')}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold">{category.title}</h1>
      </div>
      
      {/* Rental Category Filter Form - Only show for non-housing categories */}
      {!isHousingCategory && (
        <RentalCategoryFilterForm
          category={category}
          selectedSubcategory={selectedSubcategory}
          selectedLocation={selectedLocation}
          priceRange={priceRange}
          onSubcategoryChange={setSelectedSubcategory}
          onLocationChange={setSelectedLocation}
          onPriceRangeChange={setPriceRange}
        />
      )}
      
      {/* Subcategory Filter */}
      <div className="mb-6">
        <div className="flex gap-2 flex-wrap">
          <Button
            variant={selectedSubcategory === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedSubcategory('all')}
          >
            সব দেখুন
          </Button>
          {category.subcategories?.map((sub) => (
            <Button
              key={sub.id}
              variant={selectedSubcategory === sub.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedSubcategory(sub.id)}
            >
              {sub.name} ({sub.count})
            </Button>
          ))}
        </div>
      </div>
      
      <div className="flex items-center justify-between mb-6">
        <div className="text-sm text-muted-foreground">
          <span>{filteredItems.length} আইটেম পাওয়া গেছে</span>
        </div>
        <div className="flex gap-2">
          <Select value={sortBy} onValueChange={handleSortChange}>
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
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredItems.map((listing) => (
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
