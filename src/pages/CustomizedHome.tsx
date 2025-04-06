
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useApp } from '@/context/AppContext';
import { useToast } from '@/components/ui/use-toast';
import CustomizableHomeScreen from '@/components/CustomizableHomeScreen';
import SmartSearch from '@/components/SmartSearch';

const CustomizedHome = () => {
  const navigate = useNavigate();
  const { language } = useApp();
  const { toast } = useToast();
  
  const [settings, setSettings] = useState({
    showRecommendations: true,
    showTrending: true,
    enablePersonalization: true,
    showWeather: true,
    showCalendar: false,
    darkModeAuto: true,
    useFavoritesData: true,
  });
  
  const updateSettings = (key: keyof typeof settings, value: boolean) => {
    setSettings({ ...settings, [key]: value });
    
    toast({
      description: language === 'bn' 
        ? 'পারসোনালাইজেশন সেটিংস আপডেট করা হয়েছে' 
        : 'Personalization settings updated',
    });
  };
  
  return (
    <div className="container px-4 pt-16 pb-20">
      <div className="flex items-center gap-3 mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold">
          {language === 'bn' ? 'কাস্টম হোম স্ক্রিন' : 'Custom Home Screen'}
        </h1>
      </div>
      
      <Tabs defaultValue="preview" className="mb-8">
        <TabsList className="w-full mb-4">
          <TabsTrigger value="preview" className="flex-1">
            {language === 'bn' ? 'প্রিভিউ' : 'Preview'}
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex-1">
            {language === 'bn' ? 'সেটিংস' : 'Settings'}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="preview">
          <SmartSearch className="mb-6" />
          <CustomizableHomeScreen />
        </TabsContent>
        
        <TabsContent value="settings">
          <Card className="mb-6">
            <CardContent className="space-y-4 p-4">
              <h3 className="font-semibold mb-2 flex items-center">
                <Settings className="h-4 w-4 mr-2" />
                {language === 'bn' ? 'অ্যাপ পারসোনালাইজেশন' : 'App Personalization'}
              </h3>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="recommendations" className="font-medium">
                    {language === 'bn' ? 'রেকমেন্ডেশন দেখান' : 'Show Recommendations'}
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    {language === 'bn' ? 'আপনার পছন্দ অনুযায়ী সার্ভিস এবং প্রোডাক্ট' : 'Services and products based on your preferences'}
                  </p>
                </div>
                <Switch 
                  id="recommendations"
                  checked={settings.showRecommendations} 
                  onCheckedChange={(checked) => updateSettings('showRecommendations', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="trending" className="font-medium">
                    {language === 'bn' ? 'ট্রেন্ডিং আইটেম দেখান' : 'Show Trending Items'}
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    {language === 'bn' ? 'জনপ্রিয় আইটেম এবং সার্ভিস' : 'Popular items and services'}
                  </p>
                </div>
                <Switch 
                  id="trending"
                  checked={settings.showTrending} 
                  onCheckedChange={(checked) => updateSettings('showTrending', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="personalization" className="font-medium">
                    {language === 'bn' ? 'পারসোনালাইজেশন সক্রিয় করুন' : 'Enable Personalization'}
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    {language === 'bn' ? 'আপনার ব্যবহার অনুযায়ী কন্টেন্ট সাজান' : 'Content tailored to your usage'}
                  </p>
                </div>
                <Switch 
                  id="personalization"
                  checked={settings.enablePersonalization} 
                  onCheckedChange={(checked) => updateSettings('enablePersonalization', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="weather" className="font-medium">
                    {language === 'bn' ? 'আবহাওয়া দেখান' : 'Show Weather'}
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    {language === 'bn' ? 'আপনার লোকেশন অনুযায়ী আবহাওয়া আপডেট' : 'Weather updates based on your location'}
                  </p>
                </div>
                <Switch 
                  id="weather"
                  checked={settings.showWeather} 
                  onCheckedChange={(checked) => updateSettings('showWeather', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="calendar" className="font-medium">
                    {language === 'bn' ? 'ক্যালেন্ডার দেখান' : 'Show Calendar'}
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    {language === 'bn' ? 'আপনার আসন্ন ইভেন্ট এবং অ্যাপয়েন্টমেন্ট' : 'Your upcoming events and appointments'}
                  </p>
                </div>
                <Switch 
                  id="calendar"
                  checked={settings.showCalendar} 
                  onCheckedChange={(checked) => updateSettings('showCalendar', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="darkMode" className="font-medium">
                    {language === 'bn' ? 'অটো ডার্ক মোড' : 'Auto Dark Mode'}
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    {language === 'bn' ? 'সিস্টেম থিম অনুযায়ী ডার্ক মোড' : 'Dark mode based on system theme'}
                  </p>
                </div>
                <Switch 
                  id="darkMode"
                  checked={settings.darkModeAuto} 
                  onCheckedChange={(checked) => updateSettings('darkModeAuto', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="favorites" className="font-medium">
                    {language === 'bn' ? 'ব্যবহার করুন পছন্দের ডাটা' : 'Use Favorites Data'}
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    {language === 'bn' ? 'আপনার পছন্দগুলো রেকমেন্ডেশনে ব্যবহার করুন' : 'Use your favorites for recommendations'}
                  </p>
                </div>
                <Switch 
                  id="favorites"
                  checked={settings.useFavoritesData} 
                  onCheckedChange={(checked) => updateSettings('useFavoritesData', checked)}
                />
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-center mt-4">
            <Button onClick={() => navigate('/')}>
              {language === 'bn' ? 'হোম পেইজে ফিরে যান' : 'Go to Home Page'}
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CustomizedHome;
