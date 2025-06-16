
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Sparkles, 
  Zap, 
  ShoppingCart, 
  Globe, 
  CheckCircle2,
  ArrowRight,
  Gift,
  CreditCard,
  Truck,
  BarChart3,
  Palette,
  Shield,
  MessageSquare,
  Users,
  Smartphone,
  Package,
  Calculator,
  Upload,
  Megaphone,
  Settings,
  Clock,
  TrendingUp,
  RefreshCw,
  Search,
  Mail,
  Facebook,
  Camera,
  Phone,
  Headphones,
  MapPin,
  Instagram,
  ExternalLink
} from 'lucide-react';
import { StoreFeaturesList } from '@/components/store/StoreFeaturesList';
import EasyStoreSetup from '@/components/store/EasyStoreSetup';

const CreateStoreNew = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-3 sm:px-4 py-4 pt-20 max-w-7xl">
        
        {/* Hero Section */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <Zap className="h-8 w-8 text-primary animate-pulse" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            🚀 আপনার স্বপ্নের অনলাইন স্টোর তৈরি করুন
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto mb-6">
            সব ধরনের ফিচার একসাথে পাবেন। কোন কোডিং জ্ঞান ছাড়াই পেশাদার মানের স্টোর তৈরি করুন।
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <Badge className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-4 py-2">
              <CheckCircle2 className="h-3 w-3 mr-1" />
              ১০০% ফ্রি সেটআপ
            </Badge>
            <Badge className="bg-gradient-to-r from-purple-400 to-pink-500 text-white px-4 py-2">
              <Sparkles className="h-3 w-3 mr-1" />
              এআই পাওয়ার্ড
            </Badge>
            <Badge className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-4 py-2">
              <Zap className="h-3 w-3 mr-1" />
              ৩ মিনিটে লাইভ
            </Badge>
          </div>
        </div>

        {/* Quick Start Card */}
        <Card className="max-w-4xl mx-auto mb-8 shadow-xl border-0 bg-gradient-to-r from-primary/5 to-purple-100/50">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl sm:text-2xl font-bold flex items-center justify-center gap-2">
              <Zap className="h-6 w-6 text-primary" />
              এখনই শুরু করুন
            </CardTitle>
            <CardDescription className="text-sm sm:text-base">
              নিচের বাটনে ক্লিক করে আপনার স্টোর তৈরি করা শুরু করুন
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center pb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <Button 
                size="lg" 
                className="h-auto p-6 flex flex-col items-center gap-3 bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => navigate('/create-store')}
              >
                <ShoppingCart className="h-8 w-8" />
                <div>
                  <div className="font-bold text-lg">অনলাইন স্টোর</div>
                  <div className="text-sm opacity-90">পণ্য বিক্রয়ের জন্য</div>
                </div>
              </Button>
              
              <Button 
                size="lg" 
                className="h-auto p-6 flex flex-col items-center gap-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => navigate('/create-linkinbio')}
              >
                <Globe className="h-8 w-8" />
                <div>
                  <div className="font-bold text-lg">লিংক ইন বায়ো</div>
                  <div className="text-sm opacity-90">সোশ্যাল মিডিয়ার জন্য</div>
                </div>
              </Button>
            </div>
            
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-4">অথবা সহজ সেটআপ দিয়ে শুরু করুন</p>
              <Button 
                variant="outline" 
                size="lg"
                className="flex items-center gap-2 border-2 border-primary text-primary hover:bg-primary hover:text-white"
                onClick={() => {
                  const easySetupSection = document.getElementById('easy-setup-section');
                  easySetupSection?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <Sparkles className="h-4 w-4" />
                সহজ সেটআপ দেখুন
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Features Section */}
        <div className="mb-8">
          <StoreFeaturesList />
        </div>

        {/* Easy Setup Section */}
        <div id="easy-setup-section" className="mb-8">
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 border-b">
              <div className="text-center">
                <CardTitle className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center justify-center gap-2">
                  <Zap className="h-6 w-6 text-primary animate-pulse" />
                  সহজ ৩ ধাপে স্টোর তৈরি
                </CardTitle>
                <CardDescription className="text-sm sm:text-base mt-2">
                  কোন জটিলতা নেই। শুধু তথ্য দিন, আমরা বাকি সব করে দেব।
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <EasyStoreSetup />
            </CardContent>
          </Card>
        </div>

        {/* Success Stories */}
        <Card className="mb-8 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold mb-2 text-green-700">
                🎉 ৫০,০০০+ সফল ব্যবসায়ী আমাদের সাথে
              </h3>
              <p className="text-green-600">প্রতিদিন ১০০+ নতুন স্টোর তৈরি হচ্ছে</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="text-2xl font-bold text-primary">৯৮%</div>
                <div className="text-sm text-gray-600">সন্তুষ্ট গ্রাহক</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="text-2xl font-bold text-green-600">৫ মিনিট</div>
                <div className="text-sm text-gray-600">গড় সেটআপ টাইম</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="text-2xl font-bold text-purple-600">২৪/৭</div>
                <div className="text-sm text-gray-600">সাপোর্ট সেবা</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Help Section */}
        <Card className="bg-gradient-to-r from-slate-50 to-blue-50 border">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-green-100 rounded-full text-green-600 flex-shrink-0">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">💡 কোন সমস্যায় পড়েছেন?</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  আমাদের এক্সপার্ট টিম ২৪/৭ আপনাকে সাহায্য করতে প্রস্তুত। যেকোনো প্রশ্ন বা সমস্যার জন্য যোগাযোগ করুন।
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" className="text-xs">
                    <Headphones className="h-3 w-3 mr-1" />
                    লাইভ চ্যাট
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs">
                    <Phone className="h-3 w-3 mr-1" />
                    ফোন সাপোর্ট
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs">
                    <Mail className="h-3 w-3 mr-1" />
                    ইমেইল সাপোর্ট
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateStoreNew;
