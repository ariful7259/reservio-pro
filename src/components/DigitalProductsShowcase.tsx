
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  LucideIcon,
  Rocket,
  Mail,
  BookOpen,
  Calendar,
  MessageSquare,
  ShoppingBag,
  Users,
  ChartBar,
  Globe,
  Briefcase,
  FileText,
  CreditCard,
  Shield,
  Video,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from "@/components/ui/use-toast";

interface ProductCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  id: number;
  path: string;
}

const DigitalProductsShowcase = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // Digital product data with categories
  const digitalProducts: ProductCardProps[] = [
    { 
      id: 1,
      title: "অনলাইন স্টোর", 
      description: "নিজের ব্র্যান্ডের ওয়েবসাইট তৈরি করুন", 
      icon: Rocket, 
      color: "bg-blue-100 text-blue-600",
      path: "/create-store"
    },
    { 
      id: 2,
      title: "ইমেইল অটোমেশন", 
      description: "গ্রাহকদের সাথে অটোমেটিক যোগাযোগ", 
      icon: Mail, 
      color: "bg-indigo-100 text-indigo-600",
      path: "/email-automation"
    },
    { 
      id: 3,
      title: "কোর্স বিল্ডার", 
      description: "আয় করুন অনলাইন শিক্ষা দিয়ে", 
      icon: BookOpen, 
      color: "bg-amber-100 text-amber-600",
      path: "/course-builder"
    },
    { 
      id: 4,
      title: "ইভেন্ট হোস্টিং", 
      description: "অনলাইন ও অফলাইন ইভেন্ট ম্যানেজমেন্ট", 
      icon: Calendar, 
      color: "bg-red-100 text-red-600",
      path: "/event-hosting"
    },
    { 
      id: 5,
      title: "১:১ সেশন", 
      description: "পারসোনাল কনসালটেশন সেবা", 
      icon: MessageSquare, 
      color: "bg-orange-100 text-orange-600",
      path: "/one-on-one"
    },
    { 
      id: 6,
      title: "ডিজিটাল প্রোডাক্ট", 
      description: "ইবুক, টেমপ্লেট, সফটওয়্যার বিক্রয়", 
      icon: ShoppingBag, 
      color: "bg-green-100 text-green-600",
      path: "/digital-products"
    },
    { 
      id: 7,
      title: "পেইড কমিউনিটি", 
      description: "মেম্বারশিপ কমিউনিটি তৈরি করুন", 
      icon: Users, 
      color: "bg-purple-100 text-purple-600",
      path: "/paid-community"
    },
    { 
      id: 8,
      title: "অডিয়েন্স অ্যানালিটিক্স", 
      description: "গ্রাহক আচরণ ও বিক্রয় বিশ্লেষণ", 
      icon: ChartBar, 
      color: "bg-pink-100 text-pink-600",
      path: "/audience-analytics"
    }
  ];

  const handleProductClick = (product: ProductCardProps) => {
    if (product.path) {
      navigate(product.path);
    } else {
      // Handle product detail page click
      navigate(`/product/${product.id}`);
    }
  };

  return (
    <div className="py-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">ডিজিটাল ক্রিয়েটর সলিউশন</h2>
        <Button variant="ghost" size="sm" className="flex items-center gap-1" onClick={() => navigate('/create-store')}>
          সব দেখুন <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {digitalProducts.map((product) => (
          <Card 
            key={product.id} 
            className="hover:shadow-md transition-all cursor-pointer hover:scale-105 transform duration-200"
            onClick={() => handleProductClick(product)}
          >
            <CardContent className="p-4 flex flex-col items-center text-center">
              <div className={`p-3 rounded-lg ${product.color} mb-3`}>
                <product.icon className="h-6 w-6" />
              </div>
              <h3 className="font-medium">{product.title}</h3>
              <p className="text-xs text-muted-foreground mt-1">{product.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DigitalProductsShowcase;
