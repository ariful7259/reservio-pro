import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';
import { 
  Palette, Layout, Type, Grid3X3, Grid2X2, 
  Rows3, Check, Sparkles, Moon, Sun,
  LayoutGrid, LayoutList, Wand2, RotateCcw
} from 'lucide-react';

// Pre-defined color schemes
const colorSchemes = [
  {
    id: 'ocean',
    name: 'ওশান',
    primary: '#0ea5e9',
    secondary: '#06b6d4',
    accent: '#22d3ee',
    background: '#f0f9ff'
  },
  {
    id: 'forest',
    name: 'ফরেস্ট',
    primary: '#22c55e',
    secondary: '#16a34a',
    accent: '#4ade80',
    background: '#f0fdf4'
  },
  {
    id: 'sunset',
    name: 'সানসেট',
    primary: '#f97316',
    secondary: '#ea580c',
    accent: '#fb923c',
    background: '#fff7ed'
  },
  {
    id: 'lavender',
    name: 'ল্যাভেন্ডার',
    primary: '#a855f7',
    secondary: '#9333ea',
    accent: '#c084fc',
    background: '#faf5ff'
  },
  {
    id: 'rose',
    name: 'রোজ',
    primary: '#f43f5e',
    secondary: '#e11d48',
    accent: '#fb7185',
    background: '#fff1f2'
  },
  {
    id: 'midnight',
    name: 'মিডনাইট',
    primary: '#6366f1',
    secondary: '#4f46e5',
    accent: '#818cf8',
    background: '#eef2ff'
  },
  {
    id: 'earth',
    name: 'আর্থ',
    primary: '#78716c',
    secondary: '#57534e',
    accent: '#a8a29e',
    background: '#fafaf9'
  },
  {
    id: 'royal',
    name: 'রয়্যাল',
    primary: '#7c3aed',
    secondary: '#6d28d9',
    accent: '#8b5cf6',
    background: '#f5f3ff'
  }
];

// Pre-defined themes with full styling
const themes = [
  {
    id: 'modern',
    name: 'মডার্ন',
    description: 'ক্লিন, মিনিমাল ডিজাইন',
    preview: 'bg-gradient-to-br from-blue-500 to-indigo-600',
    borderRadius: 'rounded-xl',
    shadow: 'shadow-lg',
    font: 'font-sans'
  },
  {
    id: 'classic',
    name: 'ক্লাসিক',
    description: 'এলিগ্যান্ট ও প্রফেশনাল',
    preview: 'bg-gradient-to-br from-gray-700 to-gray-900',
    borderRadius: 'rounded-md',
    shadow: 'shadow-md',
    font: 'font-serif'
  },
  {
    id: 'playful',
    name: 'প্লেফুল',
    description: 'উজ্জ্বল ও আকর্ষণীয়',
    preview: 'bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500',
    borderRadius: 'rounded-2xl',
    shadow: 'shadow-xl',
    font: 'font-sans'
  },
  {
    id: 'minimal',
    name: 'মিনিমাল',
    description: 'সাদামাটা ও সহজ',
    preview: 'bg-gradient-to-br from-slate-100 to-slate-200',
    borderRadius: 'rounded-lg',
    shadow: 'shadow-sm',
    font: 'font-sans'
  },
  {
    id: 'bold',
    name: 'বোল্ড',
    description: 'স্ট্রং ও ইম্প্যাক্টফুল',
    preview: 'bg-gradient-to-br from-red-600 to-orange-500',
    borderRadius: 'rounded-none',
    shadow: 'shadow-2xl',
    font: 'font-bold'
  },
  {
    id: 'nature',
    name: 'নেচার',
    description: 'প্রাকৃতিক ও শান্ত',
    preview: 'bg-gradient-to-br from-green-500 to-teal-500',
    borderRadius: 'rounded-xl',
    shadow: 'shadow-lg',
    font: 'font-sans'
  }
];

// Layout options
const layoutOptions = [
  { id: 'grid-4', name: '৪ কলাম', icon: Grid3X3, columns: 4 },
  { id: 'grid-3', name: '৩ কলাম', icon: LayoutGrid, columns: 3 },
  { id: 'grid-2', name: '২ কলাম', icon: Grid2X2, columns: 2 },
  { id: 'list', name: 'লিস্ট ভিউ', icon: LayoutList, columns: 1 }
];

export interface ThemeSettings {
  themeId: string;
  colorSchemeId: string;
  customColors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  };
  layout: {
    productColumns: number;
    showBanner: boolean;
    compactMode: boolean;
    cardStyle: 'rounded' | 'square' | 'soft';
  };
  typography: {
    headingSize: 'small' | 'medium' | 'large';
    bodySize: 'small' | 'medium' | 'large';
  };
  darkMode: boolean;
}

const defaultSettings: ThemeSettings = {
  themeId: 'modern',
  colorSchemeId: 'ocean',
  customColors: {
    primary: '#0ea5e9',
    secondary: '#06b6d4',
    accent: '#22d3ee',
    background: '#f0f9ff'
  },
  layout: {
    productColumns: 3,
    showBanner: true,
    compactMode: false,
    cardStyle: 'rounded'
  },
  typography: {
    headingSize: 'medium',
    bodySize: 'medium'
  },
  darkMode: false
};

interface StoreThemeCustomizerProps {
  settings?: ThemeSettings;
  onSettingsChange: (settings: ThemeSettings) => void;
  storeName?: string;
}

interface SavedPreset {
  id: string;
  name: string;
  settings: ThemeSettings;
  createdAt: string;
}

const SAVED_PRESETS_KEY = 'store_theme_presets';

const StoreThemeCustomizer: React.FC<StoreThemeCustomizerProps> = ({
  settings = defaultSettings,
  onSettingsChange,
  storeName = 'আমার স্টোর'
}) => {
  const { toast } = useToast();
  const [currentSettings, setCurrentSettings] = useState<ThemeSettings>(settings);
  const [useCustomColors, setUseCustomColors] = useState(false);
  const [savedPresets, setSavedPresets] = useState<SavedPreset[]>([]);
  const [presetName, setPresetName] = useState('');
  const [showSaveDialog, setShowSaveDialog] = useState(false);

  // Load saved presets from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(SAVED_PRESETS_KEY);
      if (saved) {
        setSavedPresets(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Failed to load saved presets:', error);
    }
  }, []);

  useEffect(() => {
    setCurrentSettings(settings);
  }, [settings]);

  const updateSettings = (updates: Partial<ThemeSettings>) => {
    const newSettings = { ...currentSettings, ...updates };
    setCurrentSettings(newSettings);
    onSettingsChange(newSettings);
  };

  const handleColorSchemeSelect = (scheme: typeof colorSchemes[0]) => {
    updateSettings({
      colorSchemeId: scheme.id,
      customColors: {
        primary: scheme.primary,
        secondary: scheme.secondary,
        accent: scheme.accent,
        background: scheme.background
      }
    });
    setUseCustomColors(false);
  };

  const handleCustomColorChange = (colorKey: keyof ThemeSettings['customColors'], value: string) => {
    updateSettings({
      customColors: {
        ...currentSettings.customColors,
        [colorKey]: value
      }
    });
    setUseCustomColors(true);
  };

  const handleLayoutChange = (key: keyof ThemeSettings['layout'], value: any) => {
    updateSettings({
      layout: {
        ...currentSettings.layout,
        [key]: value
      }
    });
  };

  const handleReset = () => {
    setCurrentSettings(defaultSettings);
    onSettingsChange(defaultSettings);
    setUseCustomColors(false);
    toast({ title: "সেটিংস রিসেট হয়েছে" });
  };

  // Save current settings as a preset
  const savePreset = () => {
    if (!presetName.trim()) {
      toast({ title: "প্রিসেট নাম দিন", variant: "destructive" });
      return;
    }

    const newPreset: SavedPreset = {
      id: `preset_${Date.now()}`,
      name: presetName.trim(),
      settings: { ...currentSettings },
      createdAt: new Date().toISOString()
    };

    const updatedPresets = [...savedPresets, newPreset];
    setSavedPresets(updatedPresets);
    localStorage.setItem(SAVED_PRESETS_KEY, JSON.stringify(updatedPresets));
    
    setPresetName('');
    setShowSaveDialog(false);
    toast({ title: "প্রিসেট সেভ হয়েছে!" });
  };

  // Apply a saved preset
  const applyPreset = (preset: SavedPreset) => {
    setCurrentSettings(preset.settings);
    onSettingsChange(preset.settings);
    toast({ title: `"${preset.name}" প্রিসেট প্রয়োগ হয়েছে` });
  };

  // Delete a saved preset
  const deletePreset = (presetId: string) => {
    const updatedPresets = savedPresets.filter(p => p.id !== presetId);
    setSavedPresets(updatedPresets);
    localStorage.setItem(SAVED_PRESETS_KEY, JSON.stringify(updatedPresets));
    toast({ title: "প্রিসেট মুছে ফেলা হয়েছে" });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Palette className="h-5 w-5 text-primary" />
            থিম কাস্টমাইজেশন
          </h2>
          <p className="text-sm text-muted-foreground">
            আপনার স্টোরের রঙ, লেআউট ও স্টাইল পরিবর্তন করুন
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={handleReset}>
          <RotateCcw className="h-4 w-4 mr-1" />
          রিসেট
        </Button>
      </div>

      <Tabs defaultValue="themes" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="themes" className="text-xs sm:text-sm">
            <Layout className="h-4 w-4 mr-1 hidden sm:inline" />
            থিম
          </TabsTrigger>
          <TabsTrigger value="colors" className="text-xs sm:text-sm">
            <Palette className="h-4 w-4 mr-1 hidden sm:inline" />
            রঙ
          </TabsTrigger>
          <TabsTrigger value="layout" className="text-xs sm:text-sm">
            <Grid3X3 className="h-4 w-4 mr-1 hidden sm:inline" />
            লেআউট
          </TabsTrigger>
          <TabsTrigger value="myThemes" className="text-xs sm:text-sm">
            <Sparkles className="h-4 w-4 mr-1 hidden sm:inline" />
            আমার থিম
          </TabsTrigger>
          <TabsTrigger value="preview" className="text-xs sm:text-sm">
            <Type className="h-4 w-4 mr-1 hidden sm:inline" />
            প্রিভিউ
          </TabsTrigger>
        </TabsList>

        {/* Themes Tab */}
        <TabsContent value="themes" className="space-y-4 mt-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {themes.map((theme) => (
              <Card
                key={theme.id}
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  currentSettings.themeId === theme.id 
                    ? 'ring-2 ring-primary ring-offset-2' 
                    : ''
                }`}
                onClick={() => updateSettings({ themeId: theme.id })}
              >
                <CardContent className="p-3">
                  <div className={`w-full h-16 ${theme.preview} ${theme.borderRadius} mb-2`} />
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-sm">{theme.name}</h4>
                      <p className="text-xs text-muted-foreground">{theme.description}</p>
                    </div>
                    {currentSettings.themeId === theme.id && (
                      <Check className="h-4 w-4 text-primary" />
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Dark Mode Toggle */}
          <Card className="mt-4">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {currentSettings.darkMode ? (
                  <Moon className="h-5 w-5 text-primary" />
                ) : (
                  <Sun className="h-5 w-5 text-yellow-500" />
                )}
                <div>
                  <Label className="font-medium">ডার্ক মোড</Label>
                  <p className="text-xs text-muted-foreground">রাতের জন্য অন্ধকার থিম</p>
                </div>
              </div>
              <Switch
                checked={currentSettings.darkMode}
                onCheckedChange={(checked) => updateSettings({ darkMode: checked })}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Colors Tab */}
        <TabsContent value="colors" className="space-y-4 mt-4">
          <div>
            <Label className="text-sm font-medium mb-3 block">প্রিসেট কালার স্কিম</Label>
            <div className="grid grid-cols-4 gap-2">
              {colorSchemes.map((scheme) => (
                <button
                  key={scheme.id}
                  onClick={() => handleColorSchemeSelect(scheme)}
                  className={`relative p-2 rounded-lg border-2 transition-all ${
                    currentSettings.colorSchemeId === scheme.id && !useCustomColors
                      ? 'border-primary'
                      : 'border-transparent hover:border-muted'
                  }`}
                >
                  <div className="flex gap-1 mb-1">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: scheme.primary }}
                    />
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: scheme.secondary }}
                    />
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: scheme.accent }}
                    />
                  </div>
                  <span className="text-xs font-medium">{scheme.name}</span>
                  {currentSettings.colorSchemeId === scheme.id && !useCustomColors && (
                    <Check className="absolute top-1 right-1 h-3 w-3 text-primary" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Colors */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Wand2 className="h-4 w-4" />
                কাস্টম রঙ
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs">প্রাইমারি</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Input
                      type="color"
                      value={currentSettings.customColors.primary}
                      onChange={(e) => handleCustomColorChange('primary', e.target.value)}
                      className="w-10 h-8 p-1"
                    />
                    <Input
                      value={currentSettings.customColors.primary}
                      onChange={(e) => handleCustomColorChange('primary', e.target.value)}
                      className="flex-1 h-8 text-xs"
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-xs">সেকেন্ডারি</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Input
                      type="color"
                      value={currentSettings.customColors.secondary}
                      onChange={(e) => handleCustomColorChange('secondary', e.target.value)}
                      className="w-10 h-8 p-1"
                    />
                    <Input
                      value={currentSettings.customColors.secondary}
                      onChange={(e) => handleCustomColorChange('secondary', e.target.value)}
                      className="flex-1 h-8 text-xs"
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-xs">অ্যাক্সেন্ট</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Input
                      type="color"
                      value={currentSettings.customColors.accent}
                      onChange={(e) => handleCustomColorChange('accent', e.target.value)}
                      className="w-10 h-8 p-1"
                    />
                    <Input
                      value={currentSettings.customColors.accent}
                      onChange={(e) => handleCustomColorChange('accent', e.target.value)}
                      className="flex-1 h-8 text-xs"
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-xs">ব্যাকগ্রাউন্ড</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Input
                      type="color"
                      value={currentSettings.customColors.background}
                      onChange={(e) => handleCustomColorChange('background', e.target.value)}
                      className="w-10 h-8 p-1"
                    />
                    <Input
                      value={currentSettings.customColors.background}
                      onChange={(e) => handleCustomColorChange('background', e.target.value)}
                      className="flex-1 h-8 text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Color Preview */}
              <div className="p-3 rounded-lg border">
                <Label className="text-xs mb-2 block">প্রিভিউ</Label>
                <div 
                  className="h-16 rounded-lg flex items-center justify-center"
                  style={{ 
                    background: `linear-gradient(135deg, ${currentSettings.customColors.primary}, ${currentSettings.customColors.secondary})` 
                  }}
                >
                  <span className="text-white font-medium text-sm">{storeName}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Layout Tab */}
        <TabsContent value="layout" className="space-y-4 mt-4">
          {/* Product Grid */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">প্রোডাক্ট গ্রিড</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-4 gap-2">
                {layoutOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleLayoutChange('productColumns', option.columns)}
                    className={`p-3 rounded-lg border-2 transition-all flex flex-col items-center gap-1 ${
                      currentSettings.layout.productColumns === option.columns
                        ? 'border-primary bg-primary/5'
                        : 'border-muted hover:border-primary/50'
                    }`}
                  >
                    <option.icon className="h-5 w-5" />
                    <span className="text-xs">{option.name}</span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Card Style */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">কার্ড স্টাইল</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'rounded', name: 'রাউন্ডেড', preview: 'rounded-xl' },
                  { id: 'square', name: 'স্কয়ার', preview: 'rounded-none' },
                  { id: 'soft', name: 'সফট', preview: 'rounded-2xl' }
                ].map((style) => (
                  <button
                    key={style.id}
                    onClick={() => handleLayoutChange('cardStyle', style.id)}
                    className={`p-3 border-2 transition-all ${style.preview} ${
                      currentSettings.layout.cardStyle === style.id
                        ? 'border-primary bg-primary/5'
                        : 'border-muted hover:border-primary/50'
                    }`}
                  >
                    <div className={`w-full h-8 bg-muted ${style.preview} mb-1`} />
                    <span className="text-xs">{style.name}</span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Additional Options */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">অতিরিক্ত অপশন</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-medium">ব্যানার দেখান</Label>
                  <p className="text-xs text-muted-foreground">স্টোরের উপরে হিরো ব্যানার</p>
                </div>
                <Switch
                  checked={currentSettings.layout.showBanner}
                  onCheckedChange={(checked) => handleLayoutChange('showBanner', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-medium">কম্প্যাক্ট মোড</Label>
                  <p className="text-xs text-muted-foreground">কম স্পেস ব্যবহার করুন</p>
                </div>
                <Switch
                  checked={currentSettings.layout.compactMode}
                  onCheckedChange={(checked) => handleLayoutChange('compactMode', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* My Themes Tab */}
        <TabsContent value="myThemes" className="space-y-4 mt-4">
          {/* Save Current Theme */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                বর্তমান থিম সেভ করুন
              </CardTitle>
            </CardHeader>
            <CardContent>
              {showSaveDialog ? (
                <div className="space-y-3">
                  <div>
                    <Label className="text-xs">প্রিসেট নাম</Label>
                    <Input
                      placeholder="যেমন: আমার ফ্যাশন থিম"
                      value={presetName}
                      onChange={(e) => setPresetName(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={savePreset} className="flex-1">
                      <Check className="h-4 w-4 mr-1" />
                      সেভ
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setShowSaveDialog(false)}>
                      বাতিল
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm">বর্তমান সেটিংস প্রিসেট হিসেবে সংরক্ষণ করুন</p>
                    <p className="text-xs text-muted-foreground">পরে দ্রুত প্রয়োগ করতে পারবেন</p>
                  </div>
                  <Button size="sm" onClick={() => setShowSaveDialog(true)}>
                    সেভ করুন
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Saved Presets List */}
          <div>
            <Label className="text-sm font-medium mb-3 block">সংরক্ষিত প্রিসেট ({savedPresets.length})</Label>
            {savedPresets.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {savedPresets.map((preset) => (
                  <Card key={preset.id} className="overflow-hidden">
                    <div 
                      className="h-12"
                      style={{ 
                        background: `linear-gradient(135deg, ${preset.settings.customColors.primary}, ${preset.settings.customColors.secondary})` 
                      }}
                    />
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-sm">{preset.name}</h4>
                          <p className="text-xs text-muted-foreground">
                            {new Date(preset.createdAt).toLocaleDateString('bn-BD')}
                          </p>
                        </div>
                        <div className="flex gap-1">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => applyPreset(preset)}
                          >
                            প্রয়োগ
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost"
                            className="text-destructive hover:text-destructive"
                            onClick={() => deletePreset(preset.id)}
                          >
                            ×
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <Sparkles className="h-10 w-10 mx-auto text-muted-foreground/30 mb-3" />
                  <p className="text-sm text-muted-foreground">এখনো কোনো প্রিসেট সেভ হয়নি</p>
                  <p className="text-xs text-muted-foreground mt-1">থিম কাস্টমাইজ করে সেভ করুন</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* Preview Tab */}
        <TabsContent value="preview" className="mt-4">
          <Card className="overflow-hidden">
            <div 
              className="p-6"
              style={{ backgroundColor: currentSettings.customColors.background }}
            >
              {/* Header Preview */}
              <div 
                className="rounded-t-lg p-4 text-white"
                style={{ 
                  background: `linear-gradient(135deg, ${currentSettings.customColors.primary}, ${currentSettings.customColors.secondary})` 
                }}
              >
                <h3 className="font-bold text-lg">{storeName}</h3>
                <p className="text-sm opacity-80">আপনার বিশ্বস্ত শপিং ডেস্টিনেশন</p>
              </div>

              {/* Products Preview */}
              <div className="bg-white dark:bg-gray-800 p-4 rounded-b-lg">
                <h4 className="font-medium mb-3">আমাদের পণ্য</h4>
                <div 
                  className="grid gap-3"
                  style={{ 
                    gridTemplateColumns: `repeat(${Math.min(currentSettings.layout.productColumns, 4)}, 1fr)` 
                  }}
                >
                  {[1, 2, 3, 4].slice(0, currentSettings.layout.productColumns).map((i) => (
                    <div 
                      key={i}
                      className={`border p-2 ${
                        currentSettings.layout.cardStyle === 'rounded' ? 'rounded-xl' :
                        currentSettings.layout.cardStyle === 'square' ? 'rounded-none' : 'rounded-2xl'
                      }`}
                    >
                      <div 
                        className={`aspect-square bg-muted mb-2 ${
                          currentSettings.layout.cardStyle === 'rounded' ? 'rounded-lg' :
                          currentSettings.layout.cardStyle === 'square' ? 'rounded-none' : 'rounded-xl'
                        }`} 
                      />
                      <div className="h-3 bg-muted rounded w-3/4 mb-1" />
                      <div 
                        className="h-4 rounded w-1/2"
                        style={{ backgroundColor: currentSettings.customColors.primary }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          <div className="flex items-center justify-center gap-2 mt-4 text-sm text-muted-foreground">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>লাইভ প্রিভিউ - পরিবর্তন সাথে সাথে দেখুন</span>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StoreThemeCustomizer;
