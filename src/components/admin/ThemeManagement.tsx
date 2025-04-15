
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { adminTheme, applyAdminTheme } from '@/themes/adminTheme';
import { Palette, Sun, Moon, Brush, Grid3X3, ArrowRightLeft, RefreshCw, Save, CheckCircle2 } from 'lucide-react';
import { ColorPicker } from './ColorPicker';

interface ThemeState {
  colors: {
    primary: string;
    secondary: string; 
    accent: string;
    background: string;
    success: string;
    warning: string;
    error: string;
    info: string;
    text: {
      primary: string;
      secondary: string;
      muted: string;
    },
    dark: {
      background: string;
      surface: string;
      primary: string;
      text: {
        primary: string;
      }
    }
  };
  gradients: {
    primary: string;
    secondary: string;
    accent: string;
  };
  shadows: {
    card: string;
    button: string;
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
  };
  darkMode: boolean;
}

const ThemeManagement: React.FC = () => {
  const { toast } = useToast();
  const [previewTheme, setPreviewTheme] = useState<boolean>(false);
  const [theme, setTheme] = useState<ThemeState>({
    colors: {
      primary: adminTheme.colors.primary,
      secondary: adminTheme.colors.secondary,
      accent: adminTheme.colors.accent,
      background: adminTheme.colors.background,
      success: adminTheme.colors.success,
      warning: adminTheme.colors.warning,
      error: adminTheme.colors.error,
      info: adminTheme.colors.info,
      text: {
        primary: adminTheme.colors.text.primary,
        secondary: adminTheme.colors.text.secondary,
        muted: adminTheme.colors.text.muted,
      },
      dark: {
        background: adminTheme.colors.dark.background,
        surface: adminTheme.colors.dark.surface,
        primary: adminTheme.colors.dark.primary,
        text: {
          primary: adminTheme.colors.dark.text.primary,
        }
      }
    },
    gradients: {
      primary: adminTheme.gradients.primary,
      secondary: adminTheme.gradients.secondary,
      accent: adminTheme.gradients.accent,
    },
    shadows: {
      card: adminTheme.shadows.card,
      button: adminTheme.shadows.button,
    },
    borderRadius: {
      sm: adminTheme.borderRadius.sm,
      md: adminTheme.borderRadius.md,
      lg: adminTheme.borderRadius.lg,
    },
    darkMode: false
  });

  const [demoColors, setDemoColors] = useState([
    '#2262C6', // নীল
    '#6E59A5', // বেগুনি
    '#00A389', // সবুজ
    '#EF4444', // লাল
    '#F59E0B', // নারঙ্গী
    '#10B981', // সবুজ
    '#3B82F6', // হালকা নীল
    '#8B5CF6', // বেগুনি
    '#EC4899', // গোলাপি
    '#0369a1', // গাঢ় নীল
  ]);

  // থিম পরিবর্তনের ফাংশন
  const handleColorChange = (
    category: keyof ThemeState['colors'], 
    color: string
  ) => {
    setTheme({
      ...theme,
      colors: {
        ...theme.colors,
        [category]: color
      }
    });
  };

  // নেস্টেড প্রোপার্টি পরিবর্তনের ফাংশন
  const handleNestedColorChange = (
    parent: 'text' | 'dark', 
    child: string,
    color: string
  ) => {
    setTheme({
      ...theme,
      colors: {
        ...theme.colors,
        [parent]: {
          ...theme.colors[parent],
          [child]: color
        }
      }
    });
  };

  // নেস্টেড প্রোপার্টির আরও গভীর স্তরে পরিবর্তনের ফাংশন
  const handleDeepNestedColorChange = (
    parent: 'dark', 
    child: 'text',
    grandchild: string,
    color: string
  ) => {
    setTheme({
      ...theme,
      colors: {
        ...theme.colors,
        [parent]: {
          ...theme.colors[parent],
          [child]: {
            ...theme.colors[parent][child],
            [grandchild]: color
          }
        }
      }
    });
  };

  // অন্যান্য থিম প্রোপার্টি পরিবর্তনের ফাংশন
  const handlePropertyChange = (
    category: keyof Omit<ThemeState, 'colors' | 'darkMode'>,
    property: string,
    value: string
  ) => {
    setTheme({
      ...theme,
      [category]: {
        ...theme[category],
        [property]: value
      }
    });
  };

  // ডার্ক মোড টগল ফাংশন
  const handleDarkModeToggle = (enabled: boolean) => {
    setTheme({
      ...theme,
      darkMode: enabled
    });
  };

  // প্রিভিউ বাটন ক্লিক ফাংশন
  const handlePreviewTheme = () => {
    setPreviewTheme(true);
    // adminTheme পাবলিক অবজেক্টের ভ্যালু মডিফাই করি না, কেবল প্রিভিউ দেখাই
    const previewRoot = document.getElementById('theme-preview-container');
    if (previewRoot) {
      applyAdminTheme(previewRoot, theme.darkMode);
    }

    toast({
      title: "থিম প্রিভিউ দেখাচ্ছে",
      description: "পরিবর্তিত থিম সেটিংস প্রিভিউ হিসেবে দেখানো হচ্ছে।",
    });
  };

  // থিম রিসেট ফাংশন
  const handleResetTheme = () => {
    setTheme({
      colors: {
        primary: adminTheme.colors.primary,
        secondary: adminTheme.colors.secondary,
        accent: adminTheme.colors.accent,
        background: adminTheme.colors.background,
        success: adminTheme.colors.success,
        warning: adminTheme.colors.warning,
        error: adminTheme.colors.error,
        info: adminTheme.colors.info,
        text: {
          primary: adminTheme.colors.text.primary,
          secondary: adminTheme.colors.text.secondary,
          muted: adminTheme.colors.text.muted,
        },
        dark: {
          background: adminTheme.colors.dark.background,
          surface: adminTheme.colors.dark.surface,
          primary: adminTheme.colors.dark.primary,
          text: {
            primary: adminTheme.colors.dark.text.primary,
          }
        }
      },
      gradients: {
        primary: adminTheme.gradients.primary,
        secondary: adminTheme.gradients.secondary,
        accent: adminTheme.gradients.accent,
      },
      shadows: {
        card: adminTheme.shadows.card,
        button: adminTheme.shadows.button,
      },
      borderRadius: {
        sm: adminTheme.borderRadius.sm,
        md: adminTheme.borderRadius.md,
        lg: adminTheme.borderRadius.lg,
      },
      darkMode: false
    });
    setPreviewTheme(false);

    toast({
      title: "থিম রিসেট করা হয়েছে",
      description: "সব থিম সেটিংস ডিফল্ট অবস্থায় ফিরিয়ে আনা হয়েছে।",
    });
  };

  // থিম সেভ ফাংশন
  const handleSaveTheme = () => {
    console.log('Saving theme:', theme);
    // এখানে API কলের মাধ্যমে থিম সেভ করা হবে
    
    toast({
      title: "থিম সফলভাবে সেভ করা হয়েছে",
      description: "আপনার পরিবর্তিত থিম সেটিংস সেভ করা হয়েছে।",
      icon: <CheckCircle2 className="h-4 w-4 text-green-500" />
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            <span>থিম ম্যানেজমেন্ট</span>
          </CardTitle>
          <CardDescription>
            সাইটের জন্য কাস্টম থিম কনফিগার করুন, যেমন কালার, গ্র্যাডিয়েন্ট, শ্যাডো, এবং আরও অনেক কিছু।
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="colors">
            <TabsList className="mb-4">
              <TabsTrigger value="colors">কালার</TabsTrigger>
              <TabsTrigger value="dark-mode">ডার্ক মোড</TabsTrigger>
              <TabsTrigger value="gradients">গ্র্যাডিয়েন্ট</TabsTrigger>
              <TabsTrigger value="styles">স্টাইল</TabsTrigger>
            </TabsList>
            
            <TabsContent value="colors" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>প্রাইমারি কালার</Label>
                  <ColorPicker 
                    color={theme.colors.primary} 
                    onChange={(color) => handleColorChange('primary', color)} 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>সেকেন্ডারি কালার</Label>
                  <ColorPicker 
                    color={theme.colors.secondary} 
                    onChange={(color) => handleColorChange('secondary', color)} 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>অ্যাকসেন্ট কালার</Label>
                  <ColorPicker 
                    color={theme.colors.accent} 
                    onChange={(color) => handleColorChange('accent', color)} 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>ব্যাকগ্রাউন্ড কালার</Label>
                  <ColorPicker 
                    color={theme.colors.background} 
                    onChange={(color) => handleColorChange('background', color)} 
                  />
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <h3 className="text-base font-medium mb-3">স্ট্যাটাস কালার</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>সাকসেস কালার</Label>
                  <ColorPicker 
                    color={theme.colors.success} 
                    onChange={(color) => handleColorChange('success', color)} 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>ওয়ার্নিং কালার</Label>
                  <ColorPicker 
                    color={theme.colors.warning} 
                    onChange={(color) => handleColorChange('warning', color)} 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>এরর কালার</Label>
                  <ColorPicker 
                    color={theme.colors.error} 
                    onChange={(color) => handleColorChange('error', color)} 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>ইনফো কালার</Label>
                  <ColorPicker 
                    color={theme.colors.info} 
                    onChange={(color) => handleColorChange('info', color)} 
                  />
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <h3 className="text-base font-medium mb-3">টেক্সট কালার</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>প্রাইমারি টেক্সট</Label>
                  <ColorPicker 
                    color={theme.colors.text.primary} 
                    onChange={(color) => handleNestedColorChange('text', 'primary', color)} 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>সেকেন্ডারি টেক্সট</Label>
                  <ColorPicker 
                    color={theme.colors.text.secondary} 
                    onChange={(color) => handleNestedColorChange('text', 'secondary', color)} 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>মিউটেড টেক্সট</Label>
                  <ColorPicker 
                    color={theme.colors.text.muted} 
                    onChange={(color) => handleNestedColorChange('text', 'muted', color)} 
                  />
                </div>
              </div>
              
              <div className="mt-4">
                <h3 className="text-base font-medium mb-3">কালার প্যালেট</h3>
                <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
                  {demoColors.map((color, index) => (
                    <button
                      key={index}
                      className="h-10 w-full rounded-md border hover:scale-105 transition-transform"
                      style={{ backgroundColor: color }}
                      onClick={() => handleColorChange('primary', color)}
                      title={`কালার প্রাইমারি হিসেবে সেট করুন: ${color}`}
                    />
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="dark-mode" className="space-y-4">
              <div className="flex items-center justify-between border p-4 rounded-lg">
                <div className="flex items-center gap-2">
                  {theme.darkMode ? (
                    <Moon className="h-5 w-5" />
                  ) : (
                    <Sun className="h-5 w-5" />
                  )}
                  <div>
                    <h3 className="font-medium">ডার্ক মোড</h3>
                    <p className="text-sm text-muted-foreground">
                      ডার্ক মোড থিম সেটিংস কনফিগার করুন
                    </p>
                  </div>
                </div>
                <Switch
                  checked={theme.darkMode}
                  onCheckedChange={handleDarkModeToggle}
                />
              </div>
              
              <h3 className="text-base font-medium mt-4 mb-3">ডার্ক মোড কালার</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>ব্যাকগ্রাউন্ড</Label>
                  <ColorPicker 
                    color={theme.colors.dark.background} 
                    onChange={(color) => handleNestedColorChange('dark', 'background', color)} 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>সারফেস</Label>
                  <ColorPicker 
                    color={theme.colors.dark.surface} 
                    onChange={(color) => handleNestedColorChange('dark', 'surface', color)} 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>প্রাইমারি</Label>
                  <ColorPicker 
                    color={theme.colors.dark.primary} 
                    onChange={(color) => handleNestedColorChange('dark', 'primary', color)} 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>টেক্সট প্রাইমারি</Label>
                  <ColorPicker 
                    color={theme.colors.dark.text.primary} 
                    onChange={(color) => handleDeepNestedColorChange('dark', 'text', 'primary', color)} 
                  />
                </div>
              </div>
              
              <div className="mt-6 flex items-center">
                <div 
                  className="h-28 w-full rounded-lg p-4 flex items-center justify-center"
                  style={{ 
                    backgroundColor: theme.darkMode ? theme.colors.dark.background : theme.colors.background,
                    color: theme.darkMode ? theme.colors.dark.text.primary : theme.colors.text.primary
                  }}
                >
                  <div className="text-center">
                    <h3 className="font-medium">ডার্ক মোড প্রিভিউ</h3>
                    <p className="text-sm mt-1">
                      এভাবে দেখাবে বর্তমান থিম সেটিং অনুযায়ী
                    </p>
                    <Button 
                      className="mt-2"
                      size="sm"
                      style={{ 
                        backgroundColor: theme.darkMode ? theme.colors.dark.primary : theme.colors.primary,
                        color: 'white'
                      }}
                    >
                      বাটন উদাহরণ
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="gradients" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>প্রাইমারি গ্র্যাডিয়েন্ট</Label>
                  <Input
                    value={theme.gradients.primary}
                    onChange={(e) => handlePropertyChange('gradients', 'primary', e.target.value)}
                  />
                  <div
                    className="h-10 rounded-md mt-1"
                    style={{ backgroundImage: theme.gradients.primary }}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>সেকেন্ডারি গ্র্যাডিয়েন্ট</Label>
                  <Input
                    value={theme.gradients.secondary}
                    onChange={(e) => handlePropertyChange('gradients', 'secondary', e.target.value)}
                  />
                  <div
                    className="h-10 rounded-md mt-1"
                    style={{ backgroundImage: theme.gradients.secondary }}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>অ্যাকসেন্ট গ্র্যাডিয়েন্ট</Label>
                  <Input
                    value={theme.gradients.accent}
                    onChange={(e) => handlePropertyChange('gradients', 'accent', e.target.value)}
                  />
                  <div
                    className="h-10 rounded-md mt-1"
                    style={{ backgroundImage: theme.gradients.accent }}
                  />
                </div>
              </div>
              
              <div className="mt-4">
                <h3 className="text-base font-medium mb-2">গ্র্যাডিয়েন্ট প্রিসেট</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {[
                    {label: 'নীল থেকে হালকা নীল', value: 'linear-gradient(to right, #2262C6, #3C7DEF)'},
                    {label: 'বেগুনি থেকে হালকা বেগুনি', value: 'linear-gradient(to right, #6E59A5, #9B87F5)'},
                    {label: 'সবুজ থেকে টারকোয়াজ', value: 'linear-gradient(to right, #00A389, #00C9A7)'},
                    {label: 'লাল থেকে নারঙ্গী', value: 'linear-gradient(to right, #DC2626, #F59E0B)'},
                    {label: 'পিঙ্ক থেকে বেগুনি', value: 'linear-gradient(to right, #EC4899, #8B5CF6)'},
                    {label: 'গাঢ় নীল থেকে হালকা নীল', value: 'linear-gradient(120deg, #0369a1 0%, #3B82F6 100%)'},
                  ].map((gradient, index) => (
                    <button
                      key={index}
                      className="h-16 rounded-md border hover:scale-105 transition-transform overflow-hidden"
                      style={{ backgroundImage: gradient.value }}
                      onClick={() => handlePropertyChange('gradients', 'primary', gradient.value)}
                    >
                      <div className="h-full w-full flex items-end p-2">
                        <span className="text-xs text-white font-medium drop-shadow-md">{gradient.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="styles" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>কার্ড শ্যাডো</Label>
                  <Input
                    value={theme.shadows.card}
                    onChange={(e) => handlePropertyChange('shadows', 'card', e.target.value)}
                  />
                  <div 
                    className="h-16 rounded-md bg-white mt-1 p-3 flex items-center justify-center"
                    style={{ boxShadow: theme.shadows.card }}
                  >
                    <span>কার্ড শ্যাডো প্রিভিউ</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>বাটন শ্যাডো</Label>
                  <Input
                    value={theme.shadows.button}
                    onChange={(e) => handlePropertyChange('shadows', 'button', e.target.value)}
                  />
                  <div className="flex justify-center mt-1">
                    <Button 
                      style={{ 
                        boxShadow: theme.shadows.button,
                        backgroundColor: theme.colors.primary
                      }}
                    >
                      বাটন শ্যাডো প্রিভিউ
                    </Button>
                  </div>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <h3 className="text-base font-medium mb-3">বর্ডার রেডিয়াস</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>ছোট (sm)</Label>
                  <Input
                    value={theme.borderRadius.sm}
                    onChange={(e) => handlePropertyChange('borderRadius', 'sm', e.target.value)}
                  />
                  <div 
                    className="h-10 mt-1 bg-gray-100 flex items-center justify-center border"
                    style={{ borderRadius: theme.borderRadius.sm }}
                  >
                    <span className="text-xs">ছোট</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>মাঝারি (md)</Label>
                  <Input
                    value={theme.borderRadius.md}
                    onChange={(e) => handlePropertyChange('borderRadius', 'md', e.target.value)}
                  />
                  <div 
                    className="h-10 mt-1 bg-gray-100 flex items-center justify-center border"
                    style={{ borderRadius: theme.borderRadius.md }}
                  >
                    <span className="text-xs">মাঝারি</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>বড় (lg)</Label>
                  <Input
                    value={theme.borderRadius.lg}
                    onChange={(e) => handlePropertyChange('borderRadius', 'lg', e.target.value)}
                  />
                  <div 
                    className="h-10 mt-1 bg-gray-100 flex items-center justify-center border"
                    style={{ borderRadius: theme.borderRadius.lg }}
                  >
                    <span className="text-xs">বড়</span>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="mt-6 border rounded-lg p-4" id="theme-preview-container">
            <h3 className="font-medium mb-2">থিম প্রিভিউ</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div
                className="rounded-lg p-3"
                style={{ 
                  backgroundColor: previewTheme ? theme.colors.primary : adminTheme.colors.primary,
                  color: 'white'
                }}
              >
                <h4 className="font-medium">প্রাইমারি</h4>
                <p className="text-xs opacity-80 mt-1">প্রাইমারি কালার এলিমেন্ট</p>
              </div>
              
              <div
                className="rounded-lg p-3"
                style={{ 
                  backgroundColor: previewTheme ? theme.colors.secondary : adminTheme.colors.secondary,
                  color: 'white'
                }}
              >
                <h4 className="font-medium">সেকেন্ডারি</h4>
                <p className="text-xs opacity-80 mt-1">সেকেন্ডারি কালার এলিমেন্ট</p>
              </div>
              
              <div
                className="rounded-lg p-3"
                style={{ 
                  backgroundColor: previewTheme ? theme.colors.accent : adminTheme.colors.accent,
                  color: 'white'
                }}
              >
                <h4 className="font-medium">অ্যাকসেন্ট</h4>
                <p className="text-xs opacity-80 mt-1">অ্যাকসেন্ট কালার এলিমেন্ট</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
              <div
                className="rounded-lg p-3"
                style={{ 
                  backgroundImage: previewTheme ? theme.gradients.primary : adminTheme.gradients.primary,
                  color: 'white'
                }}
              >
                <h4 className="font-medium">প্রাইমারি গ্র্যাডিয়েন্ট</h4>
                <p className="text-xs opacity-80 mt-1">বাটন, হেডার ইত্যাদিতে ব্যবহার হবে</p>
              </div>
              
              <div
                className="rounded-lg p-3 h-24 md:h-auto"
                style={{ 
                  backgroundColor: previewTheme ? theme.colors.background : adminTheme.colors.background,
                  color: previewTheme ? theme.colors.text.primary : adminTheme.colors.text.primary,
                  boxShadow: previewTheme ? theme.shadows.card : adminTheme.shadows.card,
                }}
              >
                <h4 className="font-medium">ব্যাকগ্রাউন্ড এবং শ্যাডো</h4>
                <p 
                  className="text-xs mt-1"
                  style={{ 
                    color: previewTheme ? theme.colors.text.muted : adminTheme.colors.text.muted 
                  }}
                >
                  কার্ড এবং ব্যাকগ্রাউন্ড এলিমেন্ট
                </p>
              </div>
              
              <div
                className="rounded-lg overflow-hidden"
                style={{ 
                  borderRadius: previewTheme ? theme.borderRadius.lg : adminTheme.borderRadius.lg
                }}
              >
                <div 
                  className="h-full p-3"
                  style={{ 
                    backgroundColor: previewTheme ? (theme.darkMode ? theme.colors.dark.background : '#ffffff') : '#ffffff',
                    color: previewTheme ? (theme.darkMode ? theme.colors.dark.text.primary : theme.colors.text.primary) : theme.colors.text.primary
                  }}
                >
                  <h4 className="font-medium">বর্ডার রেডিয়াস</h4>
                  <p className="text-xs mt-1 opacity-80">এলিমেন্টের কর্নার রাউন্ডিং</p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center mt-3">
              <Button 
                style={{ 
                  boxShadow: previewTheme ? theme.shadows.button : adminTheme.shadows.button,
                  backgroundImage: previewTheme ? theme.gradients.accent : adminTheme.gradients.accent,
                  borderRadius: previewTheme ? theme.borderRadius.md : adminTheme.borderRadius.md
                }}
              >
                বাটন উদাহরণ
              </Button>
            </div>
          </div>
          
          <div className="flex justify-end gap-2 mt-6">
            <Button variant="outline" onClick={handleResetTheme}>
              <RefreshCw className="h-4 w-4 mr-2" />
              রিসেট
            </Button>
            
            <Button variant="outline" onClick={handlePreviewTheme}>
              <ArrowRightLeft className="h-4 w-4 mr-2" />
              প্রিভিউ
            </Button>
            
            <Button onClick={handleSaveTheme}>
              <Save className="h-4 w-4 mr-2" />
              থিম সেভ করুন
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ThemeManagement;
