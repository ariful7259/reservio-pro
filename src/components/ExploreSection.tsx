
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
  TrendingUp
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

const ExploreSection: React.FC = () => {
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
      path: "/explore/events"
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
      title: "সাম্প্রতিক", 
      description: "আপনার সাম্প্রতিক ব্রাউজ করা আইটেমসমূহ", 
      icon: Clock, 
      color: "bg-purple-100 text-purple-600",
      path: "/explore/recent"
    },
    { 
      id: 8,
      title: "সংরক্ষিত", 
      description: "আপনার পছন্দের তালিকা", 
      icon: Heart, 
      color: "bg-pink-100 text-pink-600",
      path: "/explore/saved"
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
                {React.createElement(category.icon, { className: "h-6 w-6" })}
              </div>
              <h3 className="font-medium">{category.title}</h3>
              <p className="text-xs text-muted-foreground mt-1">{category.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ExploreSection;
