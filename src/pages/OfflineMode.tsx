
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, WifiOff, Download, Clock, Star, Heart, CheckCircle, AlertCircle, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useApp } from '@/context/AppContext';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/components/ui/use-toast';

const OfflineMode = () => {
  const navigate = useNavigate();
  const { isOnline, language } = useApp();
  const { toast } = useToast();
  
  const [offlineFavorites, setOfflineFavorites] = React.useState(true);
  const [offlineReviews, setOfflineReviews] = React.useState(true);
  const [maxStorageSize, setMaxStorageSize] = React.useState(100);
  const [currentStorageUse, setCurrentStorageUse] = React.useState(23); // Mock data
  
  const handleClearCache = () => {
    toast({
      title: language === 'bn' ? 'ক্যাশ পরিষ্কার করা হয়েছে' : 'Cache cleared',
      description: language === 'bn' 
        ? 'সমস্ত অফলাইন ডাটা মুছে ফেলা হয়েছে'
        : 'All offline data has been cleared'
    });
    
    setCurrentStorageUse(0);
  };
  
  return (
    <div className="container pt-16 pb-20 px-4">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">{language === 'bn' ? 'অফলাইন মোড' : 'Offline Mode'}</h1>
      </div>

      <Card className={`mb-6 ${!isOnline ? 'bg-yellow-50 border-yellow-200' : ''}`}>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            {isOnline ? (
              <CheckCircle className="h-6 w-6 text-green-500" />
            ) : (
              <WifiOff className="h-6 w-6 text-yellow-500" />
            )}
            <div>
              <h2 className="text-lg font-medium">
                {isOnline
                  ? language === 'bn' ? 'আপনি অনলাইন আছেন' : 'You are online'
                  : language === 'bn' ? 'আপনি অফলাইন আছেন' : 'You are offline'}
              </h2>
              <p className="text-sm text-muted-foreground">
                {isOnline
                  ? language === 'bn'
                    ? 'সমস্ত ফিচার ব্যবহার করতে পারবেন'
                    : 'You can use all features'
                  : language === 'bn'
                    ? 'কিছু ফিচার সীমিত হতে পারে'
                    : 'Some features may be limited'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <h2 className="text-lg font-semibold mb-4">{language === 'bn' ? 'অফলাইন সেটিংস' : 'Offline Settings'}</h2>
      
      <Card className="mb-6">
        <CardContent className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-500" />
              <Label htmlFor="offline-favorites">
                {language === 'bn' ? 'পছন্দগুলি অফলাইনে সংরক্ষণ করুন' : 'Save favorites offline'}
              </Label>
            </div>
            <Switch 
              id="offline-favorites" 
              checked={offlineFavorites} 
              onCheckedChange={setOfflineFavorites} 
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <Label htmlFor="offline-reviews">
                {language === 'bn' ? 'রিভিউগুলি অফলাইনে সংরক্ষণ করুন' : 'Save reviews offline'}
              </Label>
            </div>
            <Switch 
              id="offline-reviews" 
              checked={offlineReviews} 
              onCheckedChange={setOfflineReviews} 
            />
          </div>
        </CardContent>
      </Card>

      <h2 className="text-lg font-semibold mb-4">{language === 'bn' ? 'স্টোরেজ ম্যানেজমেন্ট' : 'Storage Management'}</h2>
      
      <Card className="mb-6">
        <CardContent className="p-4 space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <Label htmlFor="storage-size">
                {language === 'bn' ? 'সর্বাধিক স্টোরেজ সাইজ' : 'Maximum storage size'}
              </Label>
              <span>{maxStorageSize} MB</span>
            </div>
            <Slider
              id="storage-size"
              min={50}
              max={500}
              step={10}
              value={[maxStorageSize]}
              onValueChange={(value) => setMaxStorageSize(value[0])}
            />
          </div>
          
          <Separator />
          
          <div>
            <div className="flex justify-between mb-2">
              <span>{language === 'bn' ? 'বর্তমান ব্যবহার' : 'Current usage'}</span>
              <span>{currentStorageUse} MB / {maxStorageSize} MB</span>
            </div>
            <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
              <div 
                className="bg-primary h-2 rounded-full"
                style={{ width: `${(currentStorageUse / maxStorageSize) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <Button variant="outline" className="w-full" onClick={handleClearCache}>
            {language === 'bn' ? 'অফলাইন ডাটা মুছুন' : 'Clear offline data'}
          </Button>
        </CardContent>
      </Card>

      <h2 className="text-lg font-semibold mb-4">{language === 'bn' ? 'অফলাইনে উপলব্ধ' : 'Available Offline'}</h2>
      
      <Card>
        <CardContent className="p-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>{language === 'bn' ? 'আপনার পছন্দের আইটেম' : 'Your favorite items'}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>{language === 'bn' ? 'সংরক্ষিত লোকেশন' : 'Saved locations'}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>{language === 'bn' ? 'আপনার রিভিউ' : 'Your reviews'}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>{language === 'bn' ? 'লয়ালটি পয়েন্ট এবং রিওয়ার্ড' : 'Loyalty points and rewards'}</span>
            </div>
            <Separator />
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-yellow-500" />
              <span>{language === 'bn' ? 'নতুন আইটেম সার্চ করা সম্ভব নয়' : 'New item searches unavailable'}</span>
            </div>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-yellow-500" />
              <span>{language === 'bn' ? 'অনলাইন পেমেন্ট সম্ভব নয়' : 'Online payments unavailable'}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OfflineMode;
