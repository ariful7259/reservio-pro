
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ShoppingBag, 
  Calendar, 
  Bookmark, 
  MessageSquare, 
  ListCheck, 
  Store, 
  BookmarkCheck,
  UserPlus
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';

const MyServices = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('bookings');
  const navigate = useNavigate();
  const { isAuthenticated, user, isSeller } = useAuth();
  
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) {
      setActiveTab(tab);
    }
    
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location.pathname } });
    }
    
    // Redirect sellers to their dashboard based on their type
    if (isAuthenticated && isSeller && user?.sellerType) {
      // Show toast notification
      toast({
        title: "বিক্রেতা ড্যাশবোর্ডে স্বাগতম",
        description: "আপনি একজন বিক্রেতা, আপনার ড্যাশবোর্ডে রিডাইরেক্ট করা হচ্ছে।",
      });
      
      // Redirect to the appropriate dashboard based on seller type
      setTimeout(() => {
        switch(user.sellerType) {
          case 'marketplace':
            navigate('/dashboard/marketplace');
            break;
          case 'rental':
            navigate('/dashboard/rental');
            break;
          case 'service':
            navigate('/dashboard/service');
            break;
          case 'content':
            navigate('/dashboard/content');
            break;
          default:
            navigate('/seller-dashboard');
        }
      }, 1500);
    }
  }, [searchParams, isAuthenticated, navigate, isSeller, user]);

  if (!isAuthenticated) {
    return (
      <div className="container px-4 pt-20 pb-20 flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-xl mb-4">আপনার সার্ভিস দেখতে লগইন করুন</h2>
        <Button onClick={() => navigate('/login', { state: { from: location.pathname } })}>
          <UserPlus className="h-4 w-4 mr-2" />
          লগইন করুন
        </Button>
      </div>
    );
  }

  const emptyStates = {
    bookings: {
      icon: <Calendar className="h-10 w-10 text-muted-foreground" />,
      message: "আপনি এখনো কোন বুকিং করেননি",
      action: "বুকিং করুন",
      path: "/rentals"
    },
    appointments: {
      icon: <Calendar className="h-10 w-10 text-muted-foreground" />,
      message: "আপনি এখনো কোন অ্যাপয়েন্টমেন্ট নিন নি",
      action: "অ্যাপয়েন্টমেন্ট নিন",
      path: "/services"
    },
    shortlists: {
      icon: <Bookmark className="h-10 w-10 text-muted-foreground" />,
      message: "আপনি এখনো কোন শর্টলিস্ট করেননি",
      action: "সার্ভিস খুঁজুন",
      path: "/services"
    },
    contactedProperties: {
      icon: <MessageSquare className="h-10 w-10 text-muted-foreground" />,
      message: "আপনি এখনো কোন প্রোপার্টির সাথে যোগাযোগ করেননি",
      action: "প্রোপার্টি খুঁজুন",
      path: "/rentals"
    },
    listings: {
      icon: <ListCheck className="h-10 w-10 text-muted-foreground" />,
      message: "আপনি এখনো কোন লিস্টিং করেননি",
      action: "লিস্টিং করুন",
      path: "/create-post"
    },
    shop: {
      icon: <Store className="h-10 w-10 text-muted-foreground" />,
      message: "আপনি এখনো কোন প্রোডাক্ট কিনেননি",
      action: "শপিং করুন",
      path: "/shopping"
    },
    recommendations: {
      icon: <BookmarkCheck className="h-10 w-10 text-muted-foreground" />,
      message: "আপনার জন্য এখনও কোন রেকমেন্ডেশন নেই",
      action: "সার্ভিস ব্রাউজ করুন",
      path: "/services"
    },
    sellerDashboard: {
      icon: <Store className="h-10 w-10 text-muted-foreground" />,
      message: isSeller 
        ? "আপনার বিক্রেতা ড্যাশবোর্ডে যান"
        : "আপনি এখনো কোন বিক্রেতা অ্যাকাউন্ট তৈরি করেননি",
      action: isSeller 
        ? "ড্যাশবোর্ডে যান" 
        : "বিক্রেতা অ্যাকাউন্ট তৈরি করুন",
      path: isSeller 
        ? (user?.sellerType 
            ? `/dashboard/${user.sellerType}` 
            : "/seller-dashboard")
        : "/create-store"
    }
  };

  return (
    <div className="container px-4 pt-20 pb-20">
      <h1 className="text-2xl font-bold mb-6">আমার সার্ভিস</h1>
      
      <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="overflow-x-auto pb-2">
          <TabsList className="mb-6 w-max">
            <TabsTrigger value="bookings">আমার বুকিংস</TabsTrigger>
            <TabsTrigger value="appointments">আমার অ্যাপয়েন্টমেন্টস</TabsTrigger>
            <TabsTrigger value="shortlists">আমার শর্টলিস্ট</TabsTrigger>
            <TabsTrigger value="contactedProperties">যোগাযোগকৃত প্রোপার্টি</TabsTrigger>
            <TabsTrigger value="listings">আমার লিস্টিংস</TabsTrigger>
            <TabsTrigger value="shop">আমার শপ</TabsTrigger>
            <TabsTrigger value="recommendations">স্মার্ট রেকমেন্ডেশন</TabsTrigger>
            <TabsTrigger value="sellerDashboard">বিক্রেতা ড্যাশবোর্ড</TabsTrigger>
          </TabsList>
        </div>

        {Object.entries(emptyStates).map(([key, state]) => (
          <TabsContent key={key} value={key} className="mt-0">
            <div className="text-center py-10 flex flex-col items-center gap-4">
              <div className="h-20 w-20 rounded-full bg-gray-100 flex items-center justify-center">
                {state.icon}
              </div>
              <p className="text-muted-foreground">{state.message}</p>
              <Button onClick={() => navigate(state.path)}>{state.action}</Button>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default MyServices;
