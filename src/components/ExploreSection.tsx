
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  LucideIcon,
  Compass,
  MapPin,
  Building,
  Search,
  ShoppingBag,
  Clock,
  Star,
  Calendar,
  Zap,
  Heart,
  TrendingUp,
  Users,
  MessageSquare,
  UserPlus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from "@/components/ui/use-toast";

interface ExploreCategoryProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  id: number;
  path: string;
}

const ExploreSection = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const exploreCategories: ExploreCategoryProps[] = [
    { 
      id: 1,
      title: "জনপ্রিয় স্থান", 
      description: "আপনার আশেপাশের জনপ্রিয় স্থানগুলি খুঁজুন", 
      icon: Compass, 
      color: "bg-blue-100 text-blue-600",
      path: "/explore/popular"
    },
    { 
      id: 2,
      title: "নতুন লিস্টিং", 
      description: "সাম্প্রতিক যোগ করা সেবা এবং পণ্যসমূহ", 
      icon: Zap, 
      color: "bg-indigo-100 text-indigo-600",
      path: "/explore/new-listings"
    },
    { 
      id: 3,
      title: "ট্রেন্ডিং", 
      description: "সবচেয়ে জনপ্রিয় সেবা এবং পণ্যসমূহ", 
      icon: TrendingUp, 
      color: "bg-amber-100 text-amber-600",
      path: "/explore/trending"
    },
    { 
      id: 4,
      title: "আপকামিং ইভেন্ট", 
      description: "আসন্ন ইভেন্ট এবং অফারসমূহ", 
      icon: Calendar, 
      color: "bg-red-100 text-red-600",
      path: "/events"
    },
    { 
      id: 5,
      title: "নিকটবর্তী", 
      description: "আপনার কাছাকাছি সুবিধাসমূহ", 
      icon: MapPin, 
      color: "bg-orange-100 text-orange-600",
      path: "/explore/nearby"
    },
    { 
      id: 6,
      title: "টপ রেটেড", 
      description: "সেরা রিভিউ পাওয়া সার্ভিস এবং পণ্যসমূহ", 
      icon: Star, 
      color: "bg-green-100 text-green-600",
      path: "/explore/top-rated"
    },
    { 
      id: 7,
      title: "কমিউনিটি স্টোরি", 
      description: "ব্যবহারকারীদের অভিজ্ঞতা এবং মতামত", 
      icon: Heart, 
      color: "bg-purple-100 text-purple-600",
      path: "/stories"
    },
    { 
      id: 8,
      title: "ফোরাম আলোচনা", 
      description: "কমিউনিটি প্রশ্ন ও উত্তর", 
      icon: MessageSquare, 
      color: "bg-pink-100 text-pink-600",
      path: "/forums"
    }
  ];

  const handleCategoryClick = (category: ExploreCategoryProps) => {
    if (category.path) {
      navigate(category.path);
    } else {
      // Handle category detail page click
      navigate(`/explore/${category.id}`);
    }
  };

  return (
    <div className="py-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">এক্সপ্লোর করুন</h2>
        <Button variant="ghost" size="sm" className="flex items-center gap-1" onClick={() => navigate('/explore')}>
          সব দেখুন <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {exploreCategories.map((category) => (
          <Card 
            key={category.id} 
            className="hover:shadow-md transition-all cursor-pointer hover:scale-105 transform duration-200"
            onClick={() => handleCategoryClick(category)}
          >
            <CardContent className="p-4 flex flex-col items-center text-center">
              <div className={`p-3 rounded-lg ${category.color} mb-3`}>
                <category.icon className="h-6 w-6" />
              </div>
              <h3 className="font-medium">{category.title}</h3>
              <p className="text-xs text-muted-foreground mt-1">{category.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* New community section */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">কমিউনিটি ফিচারস</h2>
          <Button variant="ghost" size="sm" className="flex items-center gap-1">
            সব দেখুন <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Card 
            className="hover:shadow-md transition-all cursor-pointer"
            onClick={() => navigate('/stories')}
          >
            <CardContent className="p-4 flex flex-col items-center text-center">
              <div className="p-3 rounded-lg bg-rose-100 text-rose-600 mb-3">
                <Heart className="h-6 w-6" />
              </div>
              <h3 className="font-medium">স্টোরি শেয়ারিং</h3>
              <p className="text-xs text-muted-foreground mt-1">নিজের অভিজ্ঞতা শেয়ার করুন, অন্যদের অভিজ্ঞতা পড়ুন</p>
            </CardContent>
          </Card>
          
          <Card 
            className="hover:shadow-md transition-all cursor-pointer"
            onClick={() => navigate('/events')}
          >
            <CardContent className="p-4 flex flex-col items-center text-center">
              <div className="p-3 rounded-lg bg-blue-100 text-blue-600 mb-3">
                <Calendar className="h-6 w-6" />
              </div>
              <h3 className="font-medium">ইভেন্ট ক্যালেন্ডার</h3>
              <p className="text-xs text-muted-foreground mt-1">কমিউনিটি ইভেন্টস দেখুন ও জয়েন করুন</p>
            </CardContent>
          </Card>
          
          <Card 
            className="hover:shadow-md transition-all cursor-pointer"
            onClick={() => navigate('/forums')}
          >
            <CardContent className="p-4 flex flex-col items-center text-center">
              <div className="p-3 rounded-lg bg-emerald-100 text-emerald-600 mb-3">
                <MessageSquare className="h-6 w-6" />
              </div>
              <h3 className="font-medium">ফোরাম আলোচনা</h3>
              <p className="text-xs text-muted-foreground mt-1">প্রশ্ন জিজ্ঞাসা করুন, উত্তর দিন</p>
            </CardContent>
          </Card>
          
          <Card 
            className="hover:shadow-md transition-all cursor-pointer"
            onClick={() => navigate('/group-booking')}
          >
            <CardContent className="p-4 flex flex-col items-center text-center">
              <div className="p-3 rounded-lg bg-purple-100 text-purple-600 mb-3">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="font-medium">গ্রুপ বুকিং</h3>
              <p className="text-xs text-muted-foreground mt-1">একসাথে সার্ভিস বুক করে ডিসকাউন্ট পান</p>
            </CardContent>
          </Card>
          
          <Card 
            className="hover:shadow-md transition-all cursor-pointer"
            onClick={() => navigate('/referral')}
          >
            <CardContent className="p-4 flex flex-col items-center text-center">
              <div className="p-3 rounded-lg bg-amber-100 text-amber-600 mb-3">
                <UserPlus className="h-6 w-6" />
              </div>
              <h3 className="font-medium">রেফারেল প্রোগ্রাম</h3>
              <p className="text-xs text-muted-foreground mt-1">বন্ধুদের রেফার করে পুরস্কার পান</p>
            </CardContent>
          </Card>
          
          <Card 
            className="hover:shadow-md transition-all cursor-pointer"
            onClick={() => navigate('/reviews')}
          >
            <CardContent className="p-4 flex flex-col items-center text-center">
              <div className="p-3 rounded-lg bg-teal-100 text-teal-600 mb-3">
                <Star className="h-6 w-6" />
              </div>
              <h3 className="font-medium">রিভিউ সিস্টেম</h3>
              <p className="text-xs text-muted-foreground mt-1">সার্ভিস রিভিউ দিন ও দেখুন</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ExploreSection;
