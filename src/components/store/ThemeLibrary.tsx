
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { 
  Palette, 
  Download, 
  Check, 
  Star,
  Eye,
  Sparkles,
  Crown,
  Heart
} from 'lucide-react';

interface Theme {
  id: string;
  name: string;
  category: string;
  preview: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  features: string[];
  rating: number;
  downloads: number;
  isPremium: boolean;
  isInstalled: boolean;
}

const ThemeLibrary = () => {
  const { toast } = useToast();
  const [installedThemes, setInstalledThemes] = useState<string[]>(['modern-minimal']);
  const [activeTheme, setActiveTheme] = useState('modern-minimal');

  const themes: Theme[] = [
    {
      id: 'modern-minimal',
      name: 'মডার্ন মিনিমাল',
      category: 'মিনিমাল',
      preview: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&auto=format&fit=crop&q=60',
      colors: { primary: '#3B82F6', secondary: '#64748B', accent: '#F59E0B' },
      features: ['ক্লিন ডিজাইন', 'ফাস্ট লোডিং', 'মোবাইল অপটিমাইজড'],
      rating: 4.8,
      downloads: 12500,
      isPremium: false,
      isInstalled: true
    },
    {
      id: 'ecommerce-pro',
      name: 'ই-কমার্স প্রো',
      category: 'ই-কমার্স',
      preview: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&auto=format&fit=crop&q=60',
      colors: { primary: '#059669', secondary: '#374151', accent: '#EF4444' },
      features: ['প্রোডাক্ট শোকেস', 'কার্ট অ্যানিমেশন', 'অ্যাডভান্সড ফিল্টার'],
      rating: 4.9,
      downloads: 8900,
      isPremium: true,
      isInstalled: false
    },
    {
      id: 'fashion-boutique',
      name: 'ফ্যাশন বুটিক',
      category: 'ফ্যাশন',
      preview: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400&auto=format&fit=crop&q=60',
      colors: { primary: '#EC4899', secondary: '#9333EA', accent: '#F97316' },
      features: ['ইমেজ গ্যালারি', 'কালার সুইচার', 'সাইজ গাইড'],
      rating: 4.7,
      downloads: 6750,
      isPremium: false,
      isInstalled: false
    },
    {
      id: 'tech-store',
      name: 'টেক স্টোর',
      category: 'ইলেকট্রনিক্স',
      preview: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=400&auto=format&fit=crop&q=60',
      colors: { primary: '#1E293B', secondary: '#475569', accent: '#06B6D4' },
      features: ['স্পেক কম্পেয়ার', 'প্রোডাক্ট ৩৬০°', 'ভিডিও ডেমো'],
      rating: 4.6,
      downloads: 9200,
      isPremium: true,
      isInstalled: false
    },
    {
      id: 'food-delivery',
      name: 'ফুড ডেলিভারি',
      category: 'খাবার',
      preview: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&auto=format&fit=crop&q=60',
      colors: { primary: '#DC2626', secondary: '#FBBF24', accent: '#10B981' },
      features: ['মেনু ক্যাটাগরি', 'অর্ডার ট্র্যাকিং', 'রেটিং সিস্টেম'],
      rating: 4.5,
      downloads: 5400,
      isPremium: false,
      isInstalled: false
    },
    {
      id: 'luxury-brand',
      name: 'লাক্সারি ব্র্যান্ড',
      category: 'লাক্সারি',
      preview: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&auto=format&fit=crop&q=60',
      colors: { primary: '#92400E', secondary: '#1F2937', accent: '#F59E0B' },
      features: ['প্রিমিয়াম ডিজাইন', 'অ্যানিমেশন ইফেক্ট', 'কাস্টম ফন্ট'],
      rating: 4.9,
      downloads: 3200,
      isPremium: true,
      isInstalled: false
    }
  ];

  const handleInstallTheme = (themeId: string) => {
    const theme = themes.find(t => t.id === themeId);
    if (!theme) return;

    if (theme.isPremium) {
      toast({
        title: "প্রিমিয়াম থিম",
        description: "এই থিম ব্যবহারের জন্য প্রিমিয়াম সাবস্ক্রিপশন প্রয়োজন।",
        variant: "destructive"
      });
      return;
    }

    setInstalledThemes(prev => [...prev, themeId]);
    toast({
      title: "থিম ইনস্টল সম্পন্ন",
      description: `${theme.name} থিম সফলভাবে ইনস্টল হয়েছে।`,
    });
  };

  const handleActivateTheme = (themeId: string) => {
    setActiveTheme(themeId);
    const theme = themes.find(t => t.id === themeId);
    toast({
      title: "থিম অ্যাক্টিভ",
      description: `${theme?.name} থিম এখন অ্যাক্টিভ।`,
    });
  };

  const categories = [...new Set(themes.map(t => t.category))];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Palette className="h-6 w-6 text-primary" />
            থিম লাইব্রেরি
          </h2>
          <p className="text-muted-foreground">
            আপনার স্টোরের জন্য নিখুঁত থিম খুঁজে নিন এবং এক ক্লিকে ইনস্টল করুন
          </p>
        </div>
        <Badge variant="outline" className="bg-gradient-to-r from-primary/10 to-accent/10">
          <Sparkles className="h-3 w-3 mr-1" />
          {themes.length}টি থিম উপলব্ধ
        </Badge>
      </div>

      {/* ক্যাটাগরি ফিল্টার */}
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm" className="bg-primary text-white">
          সব থিম
        </Button>
        {categories.map(category => (
          <Button key={category} variant="outline" size="sm">
            {category}
          </Button>
        ))}
      </div>

      {/* থিম গ্রিড */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {themes.map((theme) => (
          <Card key={theme.id} className={`overflow-hidden transition-all hover:shadow-lg ${
            activeTheme === theme.id ? 'ring-2 ring-primary' : ''
          }`}>
            <div className="relative">
              <img 
                src={theme.preview} 
                alt={theme.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 right-2 flex gap-1">
                {theme.isPremium && (
                  <Badge className="bg-yellow-500 text-white">
                    <Crown className="h-3 w-3 mr-1" />
                    প্রিমিয়াম
                  </Badge>
                )}
                {activeTheme === theme.id && (
                  <Badge className="bg-green-500 text-white">
                    <Check className="h-3 w-3 mr-1" />
                    অ্যাক্টিভ
                  </Badge>
                )}
              </div>
            </div>

            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{theme.name}</CardTitle>
                  <Badge variant="secondary" className="text-xs mt-1">
                    {theme.category}
                  </Badge>
                </div>
                <Button variant="ghost" size="icon" className="shrink-0">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* কালার প্যালেট */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">রং:</span>
                <div className="flex gap-1">
                  <div 
                    className="w-4 h-4 rounded-full border"
                    style={{ backgroundColor: theme.colors.primary }}
                  ></div>
                  <div 
                    className="w-4 h-4 rounded-full border"
                    style={{ backgroundColor: theme.colors.secondary }}
                  ></div>
                  <div 
                    className="w-4 h-4 rounded-full border"
                    style={{ backgroundColor: theme.colors.accent }}
                  ></div>
                </div>
              </div>

              {/* ফিচার লিস্ট */}
              <div className="space-y-1">
                {theme.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="w-1 h-1 rounded-full bg-primary"></span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              {/* রেটিং ও ডাউনলোড */}
              <div className="flex justify-between items-center text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span>{theme.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Download className="h-3 w-3" />
                  <span>{theme.downloads.toLocaleString()}</span>
                </div>
              </div>

              {/* অ্যাকশন বাটন */}
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="h-3 w-3 mr-1" />
                  প্রিভিউ
                </Button>
                
                {installedThemes.includes(theme.id) ? (
                  <Button 
                    size="sm" 
                    className="flex-1"
                    variant={activeTheme === theme.id ? "secondary" : "default"}
                    onClick={() => handleActivateTheme(theme.id)}
                    disabled={activeTheme === theme.id}
                  >
                    {activeTheme === theme.id ? (
                      <>
                        <Check className="h-3 w-3 mr-1" />
                        অ্যাক্টিভ
                      </>
                    ) : (
                      'অ্যাক্টিভ করুন'
                    )}
                  </Button>
                ) : (
                  <Button 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleInstallTheme(theme.id)}
                  >
                    <Download className="h-3 w-3 mr-1" />
                    ইনস্টল
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* কাস্টম থিম আপলোড */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            নিজের থিম আপলোড করুন
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
            <Palette className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="font-medium mb-2">কাস্টম থিম আপলোড</h3>
            <p className="text-sm text-muted-foreground mb-4">
              আপনার নিজস্ব ডিজাইন করা থিম আপলোড করুন (.zip ফরম্যাটে)
            </p>
            <Button variant="outline">
              থিম ফাইল সিলেক্ট করুন
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ThemeLibrary;
