
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { 
  Languages, 
  Plus, 
  Save, 
  Search, 
  Check, 
  X, 
  Edit, 
  Trash2, 
  RefreshCw,
  Home,
  ShoppingBag,
  Calendar,
  User,
  CreditCard,
  Lightbulb,
  Settings,
  HelpCircle
} from 'lucide-react';

interface LanguageText {
  key: string;
  category: string;
  bn: string;
  en: string;
}

interface LanguageConfig {
  defaultLanguage: string;
  supportedLanguages: {
    code: string;
    name: string;
    enabled: boolean;
  }[];
  autoDetect: boolean;
  allowUserSelect: boolean;
  rtlLanguages: string[];
  saveUserPreference: boolean;
}

// মক ট্রানস্লেশন ডাটা
const MOCK_TRANSLATIONS: LanguageText[] = [
  { key: 'nav.home', category: 'navigation', bn: 'হোম', en: 'Home' },
  { key: 'nav.services', category: 'navigation', bn: 'সার্ভিস', en: 'Services' },
  { key: 'nav.rentals', category: 'navigation', bn: 'রেন্টাল', en: 'Rentals' },
  { key: 'nav.marketplace', category: 'navigation', bn: 'মার্কেটপ্লেস', en: 'Marketplace' },
  { key: 'nav.appointments', category: 'navigation', bn: 'অ্যাপয়েন্টমেন্ট', en: 'Appointments' },
  { key: 'nav.wallet', category: 'navigation', bn: 'ওয়ালেট', en: 'Wallet' },
  { key: 'nav.profile', category: 'navigation', bn: 'প্রোফাইল', en: 'Profile' },
  
  { key: 'services.book', category: 'services', bn: 'বুক করুন', en: 'Book Now' },
  { key: 'services.popular', category: 'services', bn: 'জনপ্রিয়', en: 'Popular' },
  { key: 'services.trending', category: 'services', bn: 'ট্রেন্ডিং', en: 'Trending' },
  { key: 'services.duration', category: 'services', bn: 'সময়কাল', en: 'Duration' },
  { key: 'services.price', category: 'services', bn: 'মূল্য', en: 'Price' },
  
  { key: 'booking.confirm', category: 'booking', bn: 'বুকিং নিশ্চিত করুন', en: 'Confirm Booking' },
  { key: 'booking.cancel', category: 'booking', bn: 'বাতিল করুন', en: 'Cancel' },
  { key: 'booking.reschedule', category: 'booking', bn: 'রিশিডিউল করুন', en: 'Reschedule' },
  { key: 'booking.date', category: 'booking', bn: 'তারিখ', en: 'Date' },
  { key: 'booking.time', category: 'booking', bn: 'সময়', en: 'Time' },
  
  { key: 'profile.edit', category: 'profile', bn: 'প্রোফাইল এডিট করুন', en: 'Edit Profile' },
  { key: 'profile.settings', category: 'profile', bn: 'সেটিংস', en: 'Settings' },
  { key: 'profile.logout', category: 'profile', bn: 'লগআউট', en: 'Logout' },
  { key: 'profile.security', category: 'profile', bn: 'সিকিউরিটি', en: 'Security' },
  
  { key: 'error.offline', category: 'errors', bn: 'আপনি অফলাইন আছেন', en: 'You are offline' },
  { key: 'error.notFound', category: 'errors', bn: 'পাওয়া যায়নি', en: 'Not Found' },
  { key: 'error.tryAgain', category: 'errors', bn: 'আবার চেষ্টা করুন', en: 'Try Again' },
];

// সাপোর্টেড ল্যাঙ্গুয়েজ
const SUPPORTED_LANGUAGES = [
  { code: 'bn', name: 'বাংলা', enabled: true },
  { code: 'en', name: 'English', enabled: true },
  { code: 'hi', name: 'हिन्दी', enabled: false },
  { code: 'ar', name: 'العربية', enabled: false },
  { code: 'ur', name: 'اردو', enabled: false },
];

const CATEGORIES = [
  { value: 'all', label: 'সব ক্যাটাগরি', icon: <Check className="h-4 w-4" /> },
  { value: 'navigation', label: 'নেভিগেশন', icon: <Home className="h-4 w-4" /> },
  { value: 'services', label: 'সার্ভিস', icon: <ShoppingBag className="h-4 w-4" /> },
  { value: 'booking', label: 'বুকিং', icon: <Calendar className="h-4 w-4" /> },
  { value: 'profile', label: 'প্রোফাইল', icon: <User className="h-4 w-4" /> },
  { value: 'payment', label: 'পেমেন্ট', icon: <CreditCard className="h-4 w-4" /> },
  { value: 'tips', label: 'টিপস', icon: <Lightbulb className="h-4 w-4" /> },
  { value: 'settings', label: 'সেটিংস', icon: <Settings className="h-4 w-4" /> },
  { value: 'errors', label: 'এরর মেসেজ', icon: <X className="h-4 w-4" /> },
  { value: 'help', label: 'হেল্প', icon: <HelpCircle className="h-4 w-4" /> },
];

const LanguageManager = () => {
  const { toast } = useToast();
  
  const [translations, setTranslations] = useState<LanguageText[]>(MOCK_TRANSLATIONS);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [newTranslation, setNewTranslation] = useState<LanguageText>({
    key: '',
    category: 'navigation',
    bn: '',
    en: ''
  });
  const [showAddForm, setShowAddForm] = useState(false);
  
  const [config, setConfig] = useState<LanguageConfig>({
    defaultLanguage: 'bn',
    supportedLanguages: SUPPORTED_LANGUAGES,
    autoDetect: true,
    allowUserSelect: true,
    rtlLanguages: ['ar', 'ur'],
    saveUserPreference: true
  });
  
  const [editedTranslation, setEditedTranslation] = useState<LanguageText | null>(null);
  
  // ফিল্টার করা ট্রানস্লেশন
  const filteredTranslations = translations.filter(t => {
    const matchesSearch = search === '' || 
                         t.key.toLowerCase().includes(search.toLowerCase()) || 
                         t.bn.toLowerCase().includes(search.toLowerCase()) || 
                         t.en.toLowerCase().includes(search.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || t.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  const handleLanguageToggle = (langCode: string, enabled: boolean) => {
    setConfig(prev => ({
      ...prev,
      supportedLanguages: prev.supportedLanguages.map(lang => 
        lang.code === langCode ? { ...lang, enabled } : lang
      )
    }));
  };
  
  const handleConfigChange = (field: keyof LanguageConfig, value: any) => {
    setConfig(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleEditTranslation = (translation: LanguageText) => {
    setEditingKey(translation.key);
    setEditedTranslation({ ...translation });
  };
  
  const handleSaveEdit = () => {
    if (!editedTranslation) return;
    
    setTranslations(prev => 
      prev.map(t => t.key === editingKey ? editedTranslation : t)
    );
    
    setEditingKey(null);
    setEditedTranslation(null);
    
    toast({
      title: "ট্রানস্লেশন আপডেট করা হয়েছে",
      description: `${editingKey} আপডেট করা হয়েছে।`,
    });
  };
  
  const handleCancelEdit = () => {
    setEditingKey(null);
    setEditedTranslation(null);
  };
  
  const handleDeleteTranslation = (key: string) => {
    setTranslations(prev => prev.filter(t => t.key !== key));
    
    toast({
      title: "ট্রানস্লেশন মুছে ফেলা হয়েছে",
      description: `${key} মুছে ফেলা হয়েছে।`,
      variant: "destructive"
    });
  };
  
  const handleAddTranslation = () => {
    // কী ভ্যালিডেশন
    if (!newTranslation.key || !newTranslation.bn || !newTranslation.en) {
      toast({
        title: "অসম্পূর্ণ ফর্ম",
        description: "সব ফিল্ড পূরণ করুন।",
        variant: "destructive"
      });
      return;
    }
    
    // কী আগে থেকেই আছে কিনা চেক
    if (translations.some(t => t.key === newTranslation.key)) {
      toast({
        title: "ডুপ্লিকেট কী",
        description: "এই কী ইতিমধ্যেই বিদ্যমান আছে।",
        variant: "destructive"
      });
      return;
    }
    
    setTranslations(prev => [...prev, newTranslation]);
    
    // ফর্ম রিসেট
    setNewTranslation({
      key: '',
      category: 'navigation',
      bn: '',
      en: ''
    });
    
    setShowAddForm(false);
    
    toast({
      title: "নতুন ট্রানস্লেশন যোগ করা হয়েছে",
      description: `${newTranslation.key} যোগ করা হয়েছে।`,
    });
  };
  
  const handleSaveConfig = () => {
    // ডাটাবেসে কনফিগ সেভ করার কোড
    console.log('Saving language configuration:', config);
    
    toast({
      title: "ভাষা কনফিগারেশন সেভ করা হয়েছে",
      description: "ভাষার সেটিংস সফলভাবে আপডেট করা হয়েছে।",
    });
  };
  
  const handleExportTranslations = () => {
    // ট্রানস্লেশন এক্সপোর্ট করার কোড
    const exportData = {
      translations,
      config
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    
    const exportFileDefaultName = `language_translations_${new Date().toISOString().slice(0,10)}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    toast({
      title: "ট্রানস্লেশন এক্সপোর্ট করা হয়েছে",
      description: "ল্যাঙ্গুয়েজ ডাটা JSON ফাইল হিসেবে ডাউনলোড করা হয়েছে।",
    });
  };
  
  const handleImportTranslations = () => {
    // ইম্পোর্ট ফাইল সিলেক্টর
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (!file) return;
      
      const reader = new FileReader();
      reader.onload = (event: any) => {
        try {
          const importedData = JSON.parse(event.target.result);
          
          if (importedData.translations && Array.isArray(importedData.translations)) {
            setTranslations(importedData.translations);
          }
          
          if (importedData.config) {
            setConfig(importedData.config);
          }
          
          toast({
            title: "ট্রানস্লেশন ইম্পোর্ট করা হয়েছে",
            description: `${importedData.translations.length} ট্রানস্লেশন আইটেম লোড করা হয়েছে।`,
          });
        } catch (error) {
          toast({
            title: "ইম্পোর্ট ব্যর্থ হয়েছে",
            description: "অবৈধ JSON ফাইল। আবার চেষ্টা করুন।",
            variant: "destructive"
          });
        }
      };
      
      reader.readAsText(file);
    };
    
    input.click();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Languages className="h-5 w-5" />
            <span>ভাষা ম্যানেজমেন্ট</span>
          </CardTitle>
          <CardDescription>
            অ্যাপের জন্য বিভিন্ন ভাষার টেক্সট কনফিগার করুন এবং ম্যানেজ করুন।
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs defaultValue="translations">
            <TabsList className="w-full rounded-none p-0 border-b">
              <TabsTrigger value="translations" className="flex-1 rounded-none">
                ট্রানস্লেশন
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex-1 rounded-none">
                ভাষা সেটিংস
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="translations" className="p-6 space-y-6">
              <div className="flex flex-wrap gap-3 items-center justify-between">
                <div className="flex-1 flex gap-2 items-center min-w-[200px]">
                  <div className="relative flex-1">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="ট্রানস্লেশন সার্চ করুন..."
                      className="pl-8"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                  
                  <Select
                    value={selectedCategory}
                    onValueChange={setSelectedCategory}
                  >
                    <SelectTrigger className="w-auto min-w-[140px]">
                      <SelectValue placeholder="ক্যাটাগরি" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map(category => (
                        <SelectItem key={category.value} value={category.value}>
                          <div className="flex items-center gap-2">
                            {category.icon}
                            <span>{category.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex gap-2 flex-wrap">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleExportTranslations}
                  >
                    এক্সপোর্ট
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleImportTranslations}
                  >
                    ইম্পোর্ট
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => setShowAddForm(true)}
                    className="flex items-center gap-1"
                  >
                    <Plus className="h-4 w-4" />
                    <span>নতুন ট্রানস্লেশন</span>
                  </Button>
                </div>
              </div>
              
              {showAddForm && (
                <Card className="bg-muted/40 border">
                  <CardContent className="p-4 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>ট্রানস্লেশন কী</Label>
                        <Input 
                          placeholder="e.g., nav.home" 
                          value={newTranslation.key}
                          onChange={(e) => setNewTranslation({...newTranslation, key: e.target.value})}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>ক্যাটাগরি</Label>
                        <Select
                          value={newTranslation.category}
                          onValueChange={(value) => setNewTranslation({...newTranslation, category: value})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="ক্যাটাগরি নির্বাচন করুন" />
                          </SelectTrigger>
                          <SelectContent>
                            {CATEGORIES.filter(c => c.value !== 'all').map(category => (
                              <SelectItem key={category.value} value={category.value}>
                                <div className="flex items-center gap-2">
                                  {category.icon}
                                  <span>{category.label}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>বাংলা (BN)</Label>
                          <Input 
                            placeholder="বাংলা টেক্সট..." 
                            value={newTranslation.bn}
                            onChange={(e) => setNewTranslation({...newTranslation, bn: e.target.value})}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label>ইংরেজি (EN)</Label>
                          <Input 
                            placeholder="English text..." 
                            value={newTranslation.en}
                            onChange={(e) => setNewTranslation({...newTranslation, en: e.target.value})}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end gap-2 pt-2">
                      <Button 
                        variant="outline" 
                        onClick={() => setShowAddForm(false)}
                      >
                        বাতিল
                      </Button>
                      <Button onClick={handleAddTranslation}>
                        যোগ করুন
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              <div className="border rounded-md">
                <ScrollArea className="h-[400px]">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[30%]">কী</TableHead>
                        <TableHead className="w-[10%]">ক্যাটাগরি</TableHead>
                        <TableHead className="w-[25%]">বাংলা (BN)</TableHead>
                        <TableHead className="w-[25%]">ইংরেজি (EN)</TableHead>
                        <TableHead className="w-[10%] text-right">অ্যাকশন</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTranslations.length > 0 ? (
                        filteredTranslations.map((translation) => (
                          <TableRow key={translation.key}>
                            <TableCell className="font-mono text-sm">
                              {editingKey === translation.key ? (
                                <Input 
                                  value={editedTranslation?.key || ''} 
                                  onChange={(e) => setEditedTranslation({...editedTranslation!, key: e.target.value})}
                                  className="h-8"
                                />
                              ) : (
                                translation.key
                              )}
                            </TableCell>
                            <TableCell>
                              {editingKey === translation.key ? (
                                <Select
                                  value={editedTranslation?.category || ''}
                                  onValueChange={(value) => setEditedTranslation({...editedTranslation!, category: value})}
                                >
                                  <SelectTrigger className="h-8">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {CATEGORIES.filter(c => c.value !== 'all').map(category => (
                                      <SelectItem key={category.value} value={category.value}>
                                        {category.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              ) : (
                                <Badge variant="outline" className="capitalize">
                                  {translation.category}
                                </Badge>
                              )}
                            </TableCell>
                            <TableCell>
                              {editingKey === translation.key ? (
                                <Input 
                                  value={editedTranslation?.bn || ''} 
                                  onChange={(e) => setEditedTranslation({...editedTranslation!, bn: e.target.value})}
                                  className="h-8"
                                />
                              ) : (
                                translation.bn
                              )}
                            </TableCell>
                            <TableCell>
                              {editingKey === translation.key ? (
                                <Input 
                                  value={editedTranslation?.en || ''} 
                                  onChange={(e) => setEditedTranslation({...editedTranslation!, en: e.target.value})}
                                  className="h-8"
                                />
                              ) : (
                                translation.en
                              )}
                            </TableCell>
                            <TableCell className="text-right">
                              {editingKey === translation.key ? (
                                <div className="flex justify-end gap-1">
                                  <Button 
                                    variant="ghost" 
                                    size="icon"
                                    onClick={handleSaveEdit}
                                    className="h-8 w-8"
                                  >
                                    <Check className="h-4 w-4" />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="icon"
                                    onClick={handleCancelEdit}
                                    className="h-8 w-8"
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                </div>
                              ) : (
                                <div className="flex justify-end gap-1">
                                  <Button 
                                    variant="ghost" 
                                    size="icon"
                                    onClick={() => handleEditTranslation(translation)}
                                    className="h-8 w-8"
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="icon"
                                    onClick={() => handleDeleteTranslation(translation.key)}
                                    className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              )}
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} className="h-24 text-center">
                            কোন ট্রানস্লেশন পাওয়া যায়নি।
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </div>
              
              <div className="flex justify-between items-center text-sm text-muted-foreground">
                <div>
                  মোট {filteredTranslations.length} আইটেম প্রদর্শিত (সর্বমোট {translations.length})
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-1"
                  onClick={() => {
                    setSearch('');
                    setSelectedCategory('all');
                  }}
                >
                  <RefreshCw className="h-3 w-3" />
                  <span>রিসেট ফিল্টার</span>
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="settings" className="p-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">ভাষা কনফিগারেশন</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>ডিফল্ট ভাষা</Label>
                      <Select
                        value={config.defaultLanguage}
                        onValueChange={(value) => handleConfigChange('defaultLanguage', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="ডিফল্ট ভাষা নির্বাচন করুন" />
                        </SelectTrigger>
                        <SelectContent>
                          {config.supportedLanguages.filter(lang => lang.enabled).map(lang => (
                            <SelectItem key={lang.code} value={lang.code}>
                              {lang.name} ({lang.code.toUpperCase()})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>সাপোর্টেড ভাষাসমূহ</Label>
                      <div className="space-y-2 border rounded-md p-4">
                        {config.supportedLanguages.map(lang => (
                          <div key={lang.code} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Badge 
                                variant="outline" 
                                className="uppercase w-8 flex justify-center"
                              >
                                {lang.code}
                              </Badge>
                              <span>{lang.name}</span>
                              {config.rtlLanguages.includes(lang.code) && (
                                <Badge variant="secondary" className="text-xs">RTL</Badge>
                              )}
                            </div>
                            <Switch 
                              checked={lang.enabled}
                              onCheckedChange={(value) => handleLanguageToggle(lang.code, value)}
                              disabled={lang.code === 'bn' || lang.code === 'en'} // মূল ভাষাগুলি ডিজেবল করা যাবে না
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Switch 
                            id="auto-detect"
                            checked={config.autoDetect}
                            onCheckedChange={(value) => handleConfigChange('autoDetect', value)}
                          />
                          <Label htmlFor="auto-detect">অটো-ডিটেক্ট ব্রাউজার ভাষা</Label>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Switch 
                            id="allow-select"
                            checked={config.allowUserSelect}
                            onCheckedChange={(value) => handleConfigChange('allowUserSelect', value)}
                          />
                          <Label htmlFor="allow-select">ব্যবহারকারীকে ভাষা নির্বাচন করতে দিন</Label>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Switch 
                            id="save-preference"
                            checked={config.saveUserPreference}
                            onCheckedChange={(value) => handleConfigChange('saveUserPreference', value)}
                          />
                          <Label htmlFor="save-preference">ব্যবহারকারীর ভাষা পছন্দ সেভ করুন</Label>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 flex justify-end">
                    <Button onClick={handleSaveConfig} className="flex items-center gap-2">
                      <Save className="h-4 w-4" />
                      <span>সেটিংস সেভ করুন</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default LanguageManager;
