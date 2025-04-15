
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ColorPicker } from '@/components/admin/ColorPicker';
import { useToast } from '@/hooks/use-toast';
import { Palette, Sparkles, Box, Move, Eye } from 'lucide-react';
import ServiceCard from '@/components/ServiceCard';

const DEFAULT_SERVICE = {
  id: 'preview-service',
  title: 'ফুল সার্ভিস প্রিভিউ',
  provider: 'সার্ভিস প্রোভাইডার',
  imageUrl: 'https://images.unsplash.com/photo-1526378722484-bd91ca387e72?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHNlcnZpY2V8ZW58MHx8MHx8fDA%3D',
  rating: 4.8,
  price: 1200,
  discount: 10,
  duration: '১ ঘন্টা',
  tags: ['পপুলার', 'ট্রেন্ডিং'],
  buttonLabel: 'বুক করুন',
  onClick: () => console.log('Preview service clicked')
};

interface CardStyleConfig {
  borderRadius: number;
  border: string;
  shadow: string;
  backgroundColor: string;
  imageHeight: number;
  textColor: string;
  titleSize: number;
}

interface AnimationConfig {
  hoverEffect: string;
  hoverScale: number;
  transitionSpeed: number;
  enableAnimation: boolean;
  animationType: string;
}

const ServiceCardCustomization = () => {
  const { toast } = useToast();

  const [styleConfig, setStyleConfig] = useState<CardStyleConfig>({
    borderRadius: 12,
    border: '1px solid #e5e7eb',
    shadow: 'md',
    backgroundColor: '#ffffff',
    imageHeight: 48,
    textColor: '#1f2937',
    titleSize: 18,
  });

  const [animationConfig, setAnimationConfig] = useState<AnimationConfig>({
    hoverEffect: 'shadow',
    hoverScale: 1.05,
    transitionSpeed: 300,
    enableAnimation: true,
    animationType: 'fade-in',
  });

  const [cardStyle, setCardStyle] = useState({});
  const [imageStyle, setImageStyle] = useState({});
  const [animationStyle, setAnimationStyle] = useState({});

  // Update applied styles when configs change
  useEffect(() => {
    setCardStyle({
      borderRadius: `${styleConfig.borderRadius}px`,
      border: styleConfig.border,
      boxShadow: getShadowValue(styleConfig.shadow),
      backgroundColor: styleConfig.backgroundColor,
    });

    setImageStyle({
      height: `${styleConfig.imageHeight}%`,
    });
  }, [styleConfig]);

  useEffect(() => {
    setAnimationStyle({
      transition: `all ${animationConfig.transitionSpeed}ms ease-in-out`,
      transform: animationConfig.hoverEffect === 'scale' ? `scale(${animationConfig.hoverScale})` : 'none',
      boxShadow: animationConfig.hoverEffect === 'shadow' ? getShadowValue('lg') : 'none',
    });
  }, [animationConfig]);

  const getShadowValue = (size: string) => {
    switch (size) {
      case 'none': return 'none';
      case 'sm': return '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
      case 'md': return '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
      case 'lg': return '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
      case 'xl': return '0 20px 25px -5px rgba(0, 0, 0, 0.1)';
      default: return '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    }
  };

  const handleSaveChanges = () => {
    // Here you would update your database or context with the new configurations
    const cssVariables = `
      --service-card-border-radius: ${styleConfig.borderRadius}px;
      --service-card-shadow: ${getShadowValue(styleConfig.shadow)};
      --service-card-background: ${styleConfig.backgroundColor};
      --service-card-image-height: ${styleConfig.imageHeight}%;
      --service-card-text-color: ${styleConfig.textColor};
      --service-card-title-size: ${styleConfig.titleSize}px;
      --service-card-transition-speed: ${animationConfig.transitionSpeed}ms;
      --service-card-hover-scale: ${animationConfig.hoverScale};
    `;
    
    // In a real implementation, you would store these preferences
    console.log('CSS Variables to save:', cssVariables);
    
    toast({
      title: "স্টাইল কনফিগারেশন সেভ করা হয়েছে",
      description: "সার্ভিস কার্ডের নতুন স্টাইল সফলভাবে সেভ করা হয়েছে।",
    });
  };

  const handleResetDefaults = () => {
    setStyleConfig({
      borderRadius: 12,
      border: '1px solid #e5e7eb',
      shadow: 'md',
      backgroundColor: '#ffffff',
      imageHeight: 48,
      textColor: '#1f2937',
      titleSize: 18,
    });
    
    setAnimationConfig({
      hoverEffect: 'shadow',
      hoverScale: 1.05,
      transitionSpeed: 300,
      enableAnimation: true,
      animationType: 'fade-in',
    });
    
    toast({
      title: "ডিফল্ট স্টাইল রিস্টোর করা হয়েছে",
      description: "সার্ভিস কার্ডের স্টাইল ডিফল্ট সেটিংসে রিসেট করা হয়েছে।",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>সার্ভিস কার্ড কাস্টমাইজেশন</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="col-span-2">
              <Tabs defaultValue="style">
                <TabsList className="grid grid-cols-2 mb-4">
                  <TabsTrigger value="style" className="flex items-center gap-2">
                    <Palette className="h-4 w-4" />
                    <span>স্টাইলিং</span>
                  </TabsTrigger>
                  <TabsTrigger value="animation" className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    <span>অ্যানিমেশন</span>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="style" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>বর্ডার রেডিয়াস</Label>
                        <Slider 
                          value={[styleConfig.borderRadius]} 
                          min={0} 
                          max={24} 
                          step={1}
                          onValueChange={(value) => setStyleConfig({...styleConfig, borderRadius: value[0]})}
                        />
                        <span className="text-xs text-muted-foreground">{styleConfig.borderRadius}px</span>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>শ্যাডো</Label>
                        <Select 
                          value={styleConfig.shadow}
                          onValueChange={(value) => setStyleConfig({...styleConfig, shadow: value})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="শ্যাডো নির্বাচন করুন" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">শ্যাডো নেই</SelectItem>
                            <SelectItem value="sm">হালকা শ্যাডো</SelectItem>
                            <SelectItem value="md">মাঝারি শ্যাডো</SelectItem>
                            <SelectItem value="lg">গাঢ় শ্যাডো</SelectItem>
                            <SelectItem value="xl">অতি গাঢ় শ্যাডো</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>ছবির উচ্চতা</Label>
                        <Slider 
                          value={[styleConfig.imageHeight]} 
                          min={30} 
                          max={70} 
                          step={1}
                          onValueChange={(value) => setStyleConfig({...styleConfig, imageHeight: value[0]})}
                        />
                        <span className="text-xs text-muted-foreground">{styleConfig.imageHeight}%</span>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>কার্ডের ব্যাকগ্রাউন্ড কালার</Label>
                        <ColorPicker 
                          color={styleConfig.backgroundColor}
                          onChange={(color) => setStyleConfig({...styleConfig, backgroundColor: color})}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>টেক্সট কালার</Label>
                        <ColorPicker 
                          color={styleConfig.textColor}
                          onChange={(color) => setStyleConfig({...styleConfig, textColor: color})}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>টাইটেল সাইজ</Label>
                        <Slider 
                          value={[styleConfig.titleSize]} 
                          min={14} 
                          max={24} 
                          step={1}
                          onValueChange={(value) => setStyleConfig({...styleConfig, titleSize: value[0]})}
                        />
                        <span className="text-xs text-muted-foreground">{styleConfig.titleSize}px</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="animation" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Switch 
                          id="enable-animation"
                          checked={animationConfig.enableAnimation}
                          onCheckedChange={(checked) => setAnimationConfig({...animationConfig, enableAnimation: checked})}
                        />
                        <Label htmlFor="enable-animation">অ্যানিমেশন এনাবল করুন</Label>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>হোভার ইফেক্ট</Label>
                        <Select 
                          value={animationConfig.hoverEffect}
                          onValueChange={(value) => setAnimationConfig({...animationConfig, hoverEffect: value})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="হোভার ইফেক্ট নির্বাচন করুন" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">কোনো ইফেক্ট নেই</SelectItem>
                            <SelectItem value="shadow">শ্যাডো</SelectItem>
                            <SelectItem value="scale">স্কেল</SelectItem>
                            <SelectItem value="both">উভয়</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      {(animationConfig.hoverEffect === 'scale' || animationConfig.hoverEffect === 'both') && (
                        <div className="space-y-2">
                          <Label>হোভার স্কেল</Label>
                          <Slider 
                            value={[animationConfig.hoverScale * 100]} 
                            min={100} 
                            max={115} 
                            step={1}
                            onValueChange={(value) => setAnimationConfig({...animationConfig, hoverScale: value[0] / 100})}
                          />
                          <span className="text-xs text-muted-foreground">{animationConfig.hoverScale.toFixed(2)}x</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>ট্রানজিশন স্পীড</Label>
                        <Slider 
                          value={[animationConfig.transitionSpeed]} 
                          min={100} 
                          max={1000} 
                          step={50}
                          onValueChange={(value) => setAnimationConfig({...animationConfig, transitionSpeed: value[0]})}
                        />
                        <span className="text-xs text-muted-foreground">{animationConfig.transitionSpeed}ms</span>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>অ্যানিমেশন টাইপ</Label>
                        <Select 
                          value={animationConfig.animationType}
                          onValueChange={(value) => setAnimationConfig({...animationConfig, animationType: value})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="অ্যানিমেশন টাইপ নির্বাচন করুন" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="fade-in">ফেড-ইন</SelectItem>
                            <SelectItem value="slide-in">স্লাইড-ইন</SelectItem>
                            <SelectItem value="scale-in">স্কেল-ইন</SelectItem>
                            <SelectItem value="bounce">বাউন্স</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="flex justify-end gap-2 mt-6">
                <Button variant="outline" onClick={handleResetDefaults}>
                  ডিফল্ট সেটিংস
                </Button>
                <Button onClick={handleSaveChanges}>
                  পরিবর্তন সেভ করুন
                </Button>
              </div>
            </div>
            
            <div className="p-4 border rounded-lg flex flex-col items-center">
              <h3 className="text-lg font-medium mb-4">প্রিভিউ</h3>
              
              <div className="w-full" 
                   style={{ 
                     transform: `scale(${animationConfig.enableAnimation ? 0.9 : 1})`,
                     transition: `transform ${animationConfig.transitionSpeed}ms ease-in-out`
                   }}>
                <ServiceCard {...DEFAULT_SERVICE} />
              </div>
              
              <div className="mt-4 text-center">
                <p className="text-sm text-muted-foreground">ইফেক্ট দেখতে কার্ডের উপর মাউস নিয়ে যান</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServiceCardCustomization;
