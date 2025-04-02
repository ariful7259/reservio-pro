
import React from 'react';
import { User, ShieldCheck, CreditCard, Bell, LogOut, Users, Settings, Fingerprint } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { useNavigate } from 'react-router-dom';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Profile = () => {
  const navigate = useNavigate();

  // Mock user data
  const user = {
    name: 'আব্দুল্লাহ আল মামুন',
    email: 'abdullah@example.com',
    phone: '+৮৮০১৭১২৩৪৫৬৭৮',
    image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80',
  };

  const menuItems = [
    { icon: <User className="h-5 w-5" />, label: 'ব্যক্তিগত তথ্য', action: () => {} },
    { icon: <ShieldCheck className="h-5 w-5" />, label: 'সিকিউরিটি', action: () => navigate('/security') },
    { icon: <Fingerprint className="h-5 w-5" />, label: 'KYC ভেরিফিকেশন', action: () => navigate('/kyc-verification') },
    { icon: <CreditCard className="h-5 w-5" />, label: 'পেমেন্ট মেথড', action: () => {} },
    { icon: <Bell className="h-5 w-5" />, label: 'নোটিফিকেশন', action: () => navigate('/notifications') },
    { icon: <Users className="h-5 w-5" />, label: 'রেফার ফ্রেন্ড', action: () => {} },
    { icon: <Settings className="h-5 w-5" />, label: 'সেটিংস', action: () => {} },
  ];

  return (
    <div className="container px-4 pt-20 pb-20">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">প্রোফাইল</h1>
      </div>

      <Card className="border mb-6">
        <CardContent className="p-5">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full overflow-hidden">
              <img
                src={user.image}
                alt={user.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h2 className="font-semibold text-lg">{user.name}</h2>
              <p className="text-sm text-muted-foreground">{user.phone}</p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border mb-6">
        <CardContent className="p-5">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">KYC স্ট্যাটাস</h3>
            <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">পেন্ডিং</Badge>
          </div>
          <Progress value={50} className="h-2 mb-2" />
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">৫০% সম্পূর্ণ</span>
            <span className="text-amber-600">পেন্ডিং</span>
          </div>
          <p className="text-sm text-muted-foreground mt-3 mb-4">আপনার KYC প্রক্রিয়া সম্পূর্ণ করতে বাকি স্টেপগুলো শেষ করুন</p>
          <Button variant="outline" className="w-full" onClick={() => navigate('/kyc-verification')}>
            KYC সম্পূর্ণ করুন
          </Button>
        </CardContent>
      </Card>

      <Card className="border mb-6">
        <CardContent className="p-5">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">সিকিউরিটি স্কোর</h3>
            <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">যাচাই করুন</Badge>
          </div>
          <Progress value={70} className="h-2 mb-2" />
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">৭০% সুরক্ষিত</span>
            <span className="text-amber-600">সুপারিশ</span>
          </div>
          <p className="text-sm text-muted-foreground mt-3 mb-4">উন্নত নিরাপত্তার জন্য ২FA সক্রিয় করুন</p>
          <Button variant="outline" className="w-full" onClick={() => navigate('/security')}>
            নিরাপত্তা বাড়ান
          </Button>
        </CardContent>
      </Card>

      <h2 className="font-semibold text-lg mb-4">অ্যাকাউন্ট সেটিংস</h2>
      
      <div className="space-y-1 mb-6">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
            onClick={item.action}
          >
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                {item.icon}
              </div>
              <span>{item.label}</span>
            </div>
            <div className="text-muted-foreground">
              {index === 3 ? (
                <Switch />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              )}
            </div>
          </button>
        ))}
      </div>

      <Separator className="my-6" />

      <Button 
        variant="outline" 
        className="w-full border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600"
      >
        <LogOut className="h-4 w-4 mr-2" />
        লগ আউট
      </Button>
    </div>
  );
};

export default Profile;
