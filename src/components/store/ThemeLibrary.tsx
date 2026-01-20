
import React, { useEffect, useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  Palette, 
  Download, 
  Check, 
  Star,
  Eye,
  Sparkles,
  Crown,
  Heart,
  X
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

interface ThemeLibraryProps {
  selectedThemeId?: string;
  onSelectTheme?: (themeId: string) => void;
  initialCategory?: string;
}

const ThemeLibrary: React.FC<ThemeLibraryProps> = ({
  selectedThemeId,
  onSelectTheme,
  initialCategory,
}) => {
  const { toast } = useToast();
  const [installedThemes, setInstalledThemes] = useState<string[]>(['modern-minimal']);
  const [activeTheme, setActiveTheme] = useState('modern-minimal');
  const [previewTheme, setPreviewTheme] = useState<Theme | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'all');

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
    },
    {
      id: 'healthcare-clinic',
      name: 'হেলথকেয়ার ক্লিনিক',
      category: 'স্বাস্থ্য',
      preview: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&auto=format&fit=crop&q=60',
      colors: { primary: '#0891B2', secondary: '#64748B', accent: '#10B981' },
      features: ['অ্যাপয়েন্টমেন্ট বুকিং', 'ডাক্তার প্রোফাইল', 'সেবা তালিকা'],
      rating: 4.7,
      downloads: 7800,
      isPremium: false,
      isInstalled: false
    },
    {
      id: 'education-academy',
      name: 'এডুকেশন একাডেমি',
      category: 'শিক্ষা',
      preview: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&auto=format&fit=crop&q=60',
      colors: { primary: '#7C3AED', secondary: '#475569', accent: '#F59E0B' },
      features: ['কোর্স ক্যাটালগ', 'ইন্সট্রাক্টর প্রোফাইল', 'প্রগ্রেস ট্র্যাকিং'],
      rating: 4.8,
      downloads: 6500,
      isPremium: true,
      isInstalled: false
    },
    {
      id: 'real-estate-pro',
      name: 'রিয়েল এস্টেট প্রো',
      category: 'সম্পত্তি',
      preview: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&auto=format&fit=crop&q=60',
      colors: { primary: '#0F766E', secondary: '#334155', accent: '#EAB308' },
      features: ['প্রপার্টি লিস্টিং', 'ম্যাপ ভিউ', 'ভার্চুয়াল ট্যুর'],
      rating: 4.6,
      downloads: 5900,
      isPremium: false,
      isInstalled: false
    },
    {
      id: 'travel-explorer',
      name: 'ট্রাভেল এক্সপ্লোরার',
      category: 'ভ্রমণ',
      preview: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&auto=format&fit=crop&q=60',
      colors: { primary: '#0284C7', secondary: '#94A3B8', accent: '#F97316' },
      features: ['প্যাকেজ শোকেস', 'বুকিং সিস্টেম', 'গ্যালারি ভিউ'],
      rating: 4.7,
      downloads: 4300,
      isPremium: false,
      isInstalled: false
    },
    {
      id: 'fitness-gym',
      name: 'ফিটনেস জিম',
      category: 'ফিটনেস',
      preview: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&auto=format&fit=crop&q=60',
      colors: { primary: '#DC2626', secondary: '#1E293B', accent: '#FACC15' },
      features: ['ক্লাস শিডিউল', 'ট্রেনার প্রোফাইল', 'মেম্বারশিপ প্ল্যান'],
      rating: 4.5,
      downloads: 8100,
      isPremium: true,
      isInstalled: false
    },
    {
      id: 'restaurant-deluxe',
      name: 'রেস্টুরেন্ট ডিলাক্স',
      category: 'রেস্টুরেন্ট',
      preview: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&auto=format&fit=crop&q=60',
      colors: { primary: '#B91C1C', secondary: '#78350F', accent: '#FCD34D' },
      features: ['ডিজিটাল মেনু', 'টেবিল রিজার্ভেশন', 'অনলাইন অর্ডার'],
      rating: 4.8,
      downloads: 7200,
      isPremium: false,
      isInstalled: false
    },
    {
      id: 'photography-studio',
      name: 'ফটোগ্রাফি স্টুডিও',
      category: 'ফটোগ্রাফি',
      preview: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=400&auto=format&fit=crop&q=60',
      colors: { primary: '#1F2937', secondary: '#6B7280', accent: '#F59E0B' },
      features: ['পোর্টফোলিও গ্যালারি', 'লাইটবক্স ভিউ', 'বুকিং ফর্ম'],
      rating: 4.9,
      downloads: 3800,
      isPremium: true,
      isInstalled: false
    },
    {
      id: 'consulting-business',
      name: 'কনসালটিং বিজনেস',
      category: 'ব্যবসা',
      preview: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&auto=format&fit=crop&q=60',
      colors: { primary: '#1E40AF', secondary: '#475569', accent: '#06B6D4' },
      features: ['সার্ভিস পেজ', 'টেস্টিমোনিয়াল', 'কনট্যাক্ট ফর্ম'],
      rating: 4.6,
      downloads: 5600,
      isPremium: false,
      isInstalled: false
    },
    {
      id: 'beauty-salon',
      name: 'বিউটি সেলুন',
      category: 'সৌন্দর্য',
      preview: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&auto=format&fit=crop&q=60',
      colors: { primary: '#DB2777', secondary: '#A855F7', accent: '#FBBF24' },
      features: ['সার্ভিস মেনু', 'অনলাইন বুকিং', 'বিফোর-আফটার গ্যালারি'],
      rating: 4.7,
      downloads: 6900,
      isPremium: false,
      isInstalled: false
    },
    {
      id: 'automotive-parts',
      name: 'অটোমোটিভ পার্টস',
      category: 'গাড়ি',
      preview: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&auto=format&fit=crop&q=60',
      colors: { primary: '#0F172A', secondary: '#475569', accent: '#EF4444' },
      features: ['পার্টস ক্যাটালগ', 'ভেহিকেল সার্চ', 'ইনভেন্টরি ট্র্যাকিং'],
      rating: 4.5,
      downloads: 4700,
      isPremium: true,
      isInstalled: false
    },
    {
      id: 'organic-farming',
      name: 'অর্গানিক ফার্মিং',
      category: 'কৃষি',
      preview: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&auto=format&fit=crop&q=60',
      colors: { primary: '#15803D', secondary: '#A3E635', accent: '#FB923C' },
      features: ['প্রোডাক্ট শোকেস', 'ফার্ম স্টোরি', 'সাবস্ক্রিপশন বক্স'],
      rating: 4.8,
      downloads: 3500,
      isPremium: false,
      isInstalled: false
    },
    {
      id: 'event-management',
      name: 'ইভেন্ট ম্যানেজমেন্ট',
      category: 'ইভেন্ট',
      preview: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&auto=format&fit=crop&q=60',
      colors: { primary: '#7C3AED', secondary: '#EC4899', accent: '#FBBF24' },
      features: ['ইভেন্ট ক্যালেন্ডার', 'টিকেট বুকিং', 'গ্যালারি শোকেস'],
      rating: 4.9,
      downloads: 5200,
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

    setInstalledThemes(prev => (prev.includes(themeId) ? prev : [...prev, themeId]));
    setActiveTheme(themeId);
    onSelectTheme?.(themeId);
    toast({
      title: "থিম ইনস্টল সম্পন্ন",
      description: `${theme.name} থিম ইনস্টল ও অ্যাক্টিভ হয়েছে।`,
    });
  };

  const handleActivateTheme = (themeId: string) => {
    setActiveTheme(themeId);
    const theme = themes.find(t => t.id === themeId);
    toast({
      title: "থিম অ্যাক্টিভ",
      description: `${theme?.name} থিম এখন অ্যাক্টিভ।`,
    });

    onSelectTheme?.(themeId);
  };

  const categories = useMemo(() => [...new Set(themes.map(t => t.category))], [themes]);

  useEffect(() => {
    if (selectedThemeId) setActiveTheme(selectedThemeId);
  }, [selectedThemeId]);

  const filteredThemes = useMemo(() => {
    if (selectedCategory === 'all') return themes;
    return themes.filter(t => t.category === selectedCategory);
  }, [themes, selectedCategory]);

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
        <Button
          variant={selectedCategory === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedCategory('all')}
        >
          সব থিম
        </Button>
        {categories.map(category => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* থিম গ্রিড */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredThemes.map((theme) => (
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
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => setPreviewTheme(theme)}
                >
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

      {/* থিম প্রিভিউ মডাল */}
      <Dialog open={!!previewTheme} onOpenChange={() => setPreviewTheme(null)}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle className="text-2xl flex items-center gap-2">
                  {previewTheme?.name}
                  {previewTheme?.isPremium && (
                    <Badge className="bg-yellow-500 text-white">
                      <Crown className="h-3 w-3 mr-1" />
                      প্রিমিয়াম
                    </Badge>
                  )}
                </DialogTitle>
                <Badge variant="secondary" className="mt-2">
                  {previewTheme?.category}
                </Badge>
              </div>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setPreviewTheme(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>

          {previewTheme && (
            <div className="space-y-6 mt-4">
              {/* থিম প্রিভিউ ইমেজ */}
              <div className="rounded-lg overflow-hidden border">
                <img 
                  src={previewTheme.preview} 
                  alt={previewTheme.name}
                  className="w-full h-96 object-cover"
                />
              </div>

              {/* থিম ডিটেইলস */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">কালার প্যালেট</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">প্রাইমারি</span>
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-8 h-8 rounded border"
                            style={{ backgroundColor: previewTheme.colors.primary }}
                          />
                          <code className="text-xs">{previewTheme.colors.primary}</code>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">সেকেন্ডারি</span>
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-8 h-8 rounded border"
                            style={{ backgroundColor: previewTheme.colors.secondary }}
                          />
                          <code className="text-xs">{previewTheme.colors.secondary}</code>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">অ্যাকসেন্ট</span>
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-8 h-8 rounded border"
                            style={{ backgroundColor: previewTheme.colors.accent }}
                          />
                          <code className="text-xs">{previewTheme.colors.accent}</code>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">ফিচার সমূহ</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {previewTheme.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-500" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* থিম স্ট্যাটস */}
              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{previewTheme.rating}</span>
                    <span className="text-sm text-muted-foreground">রেটিং</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Download className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{previewTheme.downloads.toLocaleString()}</span>
                    <span className="text-sm text-muted-foreground">ডাউনলোড</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  {installedThemes.includes(previewTheme.id) ? (
                    <Button 
                      variant={activeTheme === previewTheme.id ? "secondary" : "default"}
                      onClick={() => {
                        handleActivateTheme(previewTheme.id);
                        setPreviewTheme(null);
                      }}
                      disabled={activeTheme === previewTheme.id}
                    >
                      {activeTheme === previewTheme.id ? (
                        <>
                          <Check className="h-4 w-4 mr-2" />
                          অ্যাক্টিভ
                        </>
                      ) : (
                        'অ্যাক্টিভ করুন'
                      )}
                    </Button>
                  ) : (
                    <Button 
                      onClick={() => {
                        handleInstallTheme(previewTheme.id);
                        setPreviewTheme(null);
                      }}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      ইনস্টল করুন
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ThemeLibrary;
