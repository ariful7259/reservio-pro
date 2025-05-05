
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
  UserPlus,
  File,
  Gavel,
  UserCheck,
  Building,
  Home,
  DollarSign,
  Calculator,
  FileText,
  Share2,
  HelpCircle,
  MessageCircle,
  Info
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';
import MyServicesDropdown from '@/components/MyServicesDropdown';

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

  // লিগ্যাল অ্যাসিস্ট্যান্স এন্ড লোন সার্ভিস আইটেম
  const legalAssistanceMenuItems = [
    {
      icon: <File className="h-10 w-10 text-red-500" />,
      name: "রেন্টাল এগ্রিমেন্ট",
      path: "/services/rental-agreement",
      description: "রেন্টাল চুক্তি তৈরি করুন"
    },
    {
      icon: <Gavel className="h-10 w-10 text-red-500" />,
      name: "পুলিশ ইনটিমেশন",
      path: "/services/police-intimation",
      description: "পুলিশ স্টেশনে নোটিফিকেশন দিন"
    },
    {
      icon: <UserCheck className="h-10 w-10 text-red-500" />,
      name: "টেনান্ট ভেরিফিকেশন",
      path: "/services/tenant-verification",
      description: "ভাড়াটিয়া যাচাই করুন"
    },
    {
      icon: <Building className="h-10 w-10 text-red-500" />,
      name: "প্রপার্টি লিগাল অ্যাসিস্ট্যান্স",
      path: "/services/property-legal-assistance",
      description: "আইনি সহায়তা পেতে"
    },
    {
      icon: <Home className="h-10 w-10 text-red-500" />,
      name: "হোম লোন",
      path: "/services/home-loan",
      description: "সহজ শর্তে ঋণ নিন"
    },
    {
      icon: <DollarSign className="h-10 w-10 text-red-500" />,
      name: "হোম ডিপোজিট লোন",
      path: "/services/home-deposit-loan",
      description: "জামানত জমার জন্য ঋণ নিন"
    }
  ];

  // ইউটিলিটিস সার্ভিস আইটেম
  const utilitiesMenuItems = [
    {
      icon: <Calculator className="h-10 w-10 text-red-500" />,
      name: "নো ইয়োর রেন্ট",
      path: "/utilities/know-your-rent",
      description: "উচিত ভাড়া নির্ধারণ করুন"
    },
    {
      icon: <FileText className="h-10 w-10 text-red-500" />,
      name: "ক্রিয়েট রেন্ট রিসিপ্টস",
      path: "/utilities/create-rent-receipts",
      description: "ভাড়ার রশিদ তৈরি করুন"
    },
    {
      icon: <Share2 className="h-10 w-10 text-red-500" />,
      name: "ক্লিক এন্ড আর্ন",
      path: "/utilities/click-and-earn",
      description: "শেয়ার করে আয় করুন"
    }
  ];

  // হেল্প এন্ড সাপোর্ট সার্ভিস আইটেম
  const helpAndSupportMenuItems = [
    {
      icon: <HelpCircle className="h-10 w-10 text-red-500" />,
      name: "সাপোর্ট টপিকস",
      path: "/help/support-topics",
      description: "সাধারণ সমস্যার সমাধান"
    },
    {
      icon: <FileText className="h-10 w-10 text-red-500" />,
      name: "ব্লগ",
      path: "/help/blog",
      description: "নিয়মিত আপডেট পান"
    },
    {
      icon: <MessageCircle className="h-10 w-10 text-red-500" />,
      name: "ফিডব্যাক",
      path: "/help/feedback",
      description: "আপনার মতামত জানান"
    },
    {
      icon: <Info className="h-10 w-10 text-red-500" />,
      name: "অ্যাবাউট আস",
      path: "/help/about-us",
      description: "আমাদের সম্পর্কে জানুন"
    }
  ];

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
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">আমার সার্ভিস</h1>
        <MyServicesDropdown />
      </div>
      
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

      <div className="mt-12 space-y-8">
        {/* লিগ্যাল অ্যাসিস্ট্যান্স এন্ড লোন সেকশন */}
        <div>
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Briefcase className="h-5 w-5 mr-2 text-red-500" />
            লিগ্যাল অ্যাসিস্ট্যান্স ও লোন
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {legalAssistanceMenuItems.map((item, index) => (
              <Card key={`legal-${index}`} className="hover:shadow-md transition-shadow cursor-pointer" 
                    onClick={() => navigate(item.path)}>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="mb-4 text-red-500">
                    {item.icon}
                  </div>
                  <h3 className="font-medium text-lg mb-2">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* ইউটিলিটিস সেকশন */}
        <div>
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Wrench className="h-5 w-5 mr-2 text-red-500" />
            ইউটিলিটিস
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {utilitiesMenuItems.map((item, index) => (
              <Card key={`utility-${index}`} className="hover:shadow-md transition-shadow cursor-pointer" 
                   onClick={() => navigate(item.path)}>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="mb-4 text-red-500">
                    {item.icon}
                  </div>
                  <h3 className="font-medium text-lg mb-2">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* হেল্প এন্ড সাপোর্ট সেকশন */}
        <div>
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <HelpCircle className="h-5 w-5 mr-2 text-red-500" />
            হেল্প এন্ড সাপোর্ট
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {helpAndSupportMenuItems.map((item, index) => (
              <Card key={`help-${index}`} className="hover:shadow-md transition-shadow cursor-pointer" 
                   onClick={() => navigate(item.path)}>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="mb-4 text-red-500">
                    {item.icon}
                  </div>
                  <h3 className="font-medium text-lg mb-2">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyServices;
