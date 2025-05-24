
import React, { useState, createContext, useContext } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  Globe, 
  DollarSign, 
  Languages,
  Settings,
  Plus,
  Edit,
  Download,
  Upload
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import CurrencySelector from '@/components/CurrencySelector';
import { Currency } from '@/utils/currencyUtils';

// ভাষা ডাটা
const languages = [
  { code: 'bn', name: 'বাংলা', nativeName: 'বাংলা', flag: '🇧🇩', isDefault: true },
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸', isDefault: false },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳', isDefault: false },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', flag: '🇵🇰', isDefault: false },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', isDefault: false }
];

// ভাষা কনটেক্সট
interface LanguageContextType {
  currentLanguage: string;
  currentCurrency: Currency;
  changeLanguage: (lang: string) => void;
  changeCurrency: (currency: Currency) => void;
  translate: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// ট্রান্সলেশন ডাটা (স্যাম্পল)
const translations = {
  bn: {
    'welcome': 'স্বাগতম',
    'products': 'পণ্য',
    'cart': 'কার্ট',
    'checkout': 'চেকআউট',
    'total': 'মোট',
    'add_to_cart': 'কার্টে যোগ করুন',
    'buy_now': 'এখনই কিনুন'
  },
  en: {
    'welcome': 'Welcome',
    'products': 'Products',
    'cart': 'Cart',
    'checkout': 'Checkout',
    'total': 'Total',
    'add_to_cart': 'Add to Cart',
    'buy_now': 'Buy Now'
  },
  hi: {
    'welcome': 'स्वागत',
    'products': 'उत्पाद',
    'cart': 'कार्ट',
    'checkout': 'चेकआउट',
    'total': 'कुल',
    'add_to_cart': 'कार्ट में जोड़ें',
    'buy_now': 'अभी खरीदें'
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('bn');
  const [currentCurrency, setCurrentCurrency] = useState<Currency>('BDT');

  const changeLanguage = (lang: string) => {
    setCurrentLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const changeCurrency = (currency: Currency) => {
    setCurrentCurrency(currency);
    localStorage.setItem('currency', currency);
  };

  const translate = (key: string): string => {
    return translations[currentLanguage as keyof typeof translations]?.[key as keyof typeof translations.bn] || key;
  };

  return (
    <LanguageContext.Provider 
      value={{ 
        currentLanguage, 
        currentCurrency, 
        changeLanguage, 
        changeCurrency, 
        translate 
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

const MultiLanguageCurrency = () => {
  const [activeTab, setActiveTab] = useState('languages');
  const [languageSettings, setLanguageSettings] = useState({
    autoDetect: true,
    rtlSupport: true,
    enableTranslation: true,
    showFlags: true
  });

  const [currencySettings, setCurrencySettings] = useState({
    autoDetect: false,
    showSymbol: true,
    showCode: false,
    decimalPlaces: 2
  });

  const { currentLanguage, currentCurrency, changeLanguage, changeCurrency, translate } = useLanguage();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">মাল্টি-ল্যাঙ্গুয়েজ ও কারেন্সি</h2>
          <p className="text-muted-foreground">আন্তর্জাতিক কাস্টমারদের জন্য ভাষা ও মুদ্রা সাপোর্ট</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            <Select value={currentLanguage} onValueChange={changeLanguage}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    <div className="flex items-center gap-2">
                      <span>{lang.flag}</span>
                      <span>{lang.nativeName}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <CurrencySelector 
            selectedCurrency={currentCurrency}
            onCurrencyChange={changeCurrency}
          />
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="languages">ভাষা</TabsTrigger>
          <TabsTrigger value="currencies">কারেন্সি</TabsTrigger>
          <TabsTrigger value="translations">অনুবাদ</TabsTrigger>
          <TabsTrigger value="settings">সেটিংস</TabsTrigger>
        </TabsList>

        <TabsContent value="languages" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Languages className="h-5 w-5" />
                সাপোর্টেড ভাষাসমূহ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {languages.map((lang) => (
                  <Card key={lang.code} className={`cursor-pointer transition-all ${
                    currentLanguage === lang.code ? 'ring-2 ring-primary' : ''
                  }`}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{lang.flag}</span>
                          <div>
                            <h4 className="font-medium">{lang.nativeName}</h4>
                            <p className="text-sm text-muted-foreground">{lang.name}</p>
                          </div>
                        </div>
                        {lang.isDefault && (
                          <Badge variant="outline">ডিফল্ট</Badge>
                        )}
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          variant={currentLanguage === lang.code ? "default" : "outline"}
                          size="sm"
                          className="flex-1"
                          onClick={() => changeLanguage(lang.code)}
                        >
                          {currentLanguage === lang.code ? 'নির্বাচিত' : 'নির্বাচন করুন'}
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-6">
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  নতুন ভাষা যোগ করুন
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* লাইভ প্রিভিউ */}
          <Card>
            <CardHeader>
              <CardTitle>লাইভ প্রিভিউ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-muted rounded-lg space-y-3">
                <h3 className="text-lg font-bold">{translate('welcome')}</h3>
                <div className="flex gap-4">
                  <Button size="sm">{translate('products')}</Button>
                  <Button size="sm" variant="outline">{translate('cart')}</Button>
                  <Button size="sm" variant="outline">{translate('checkout')}</Button>
                </div>
                <div className="flex items-center gap-2">
                  <span>{translate('total')}:</span>
                  <span className="font-bold">৳১,৫০০</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="currencies" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                সাপোর্টেড কারেন্সি
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { code: 'BDT', name: 'বাংলাদেশী টাকা', symbol: '৳', rate: 1, flag: '🇧🇩' },
                  { code: 'USD', name: 'মার্কিন ডলার', symbol: '$', rate: 0.009, flag: '🇺🇸' },
                  { code: 'EUR', name: 'ইউরো', symbol: '€', rate: 0.0083, flag: '🇪🇺' },
                  { code: 'INR', name: 'ভারতীয় রুপি', symbol: '₹', rate: 0.75, flag: '🇮🇳' },
                  { code: 'GBP', name: 'ব্রিটিশ পাউন্ড', symbol: '£', rate: 0.0072, flag: '🇬🇧' },
                  { code: 'SAR', name: 'সৌদি রিয়াল', symbol: 'ر.س', rate: 0.034, flag: '🇸🇦' }
                ].map((currency) => (
                  <Card key={currency.code} className={`cursor-pointer transition-all ${
                    currentCurrency === currency.code ? 'ring-2 ring-primary' : ''
                  }`}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{currency.flag}</span>
                          <div>
                            <h4 className="font-medium">{currency.symbol} {currency.code}</h4>
                            <p className="text-sm text-muted-foreground">{currency.name}</p>
                          </div>
                        </div>
                        {currency.code === 'BDT' && (
                          <Badge variant="outline">বেস</Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-muted-foreground">এক্সচেঞ্জ রেট:</span>
                        <span className="font-mono">1 BDT = {currency.rate} {currency.code}</span>
                      </div>
                      
                      <Button 
                        variant={currentCurrency === currency.code ? "default" : "outline"}
                        size="sm"
                        className="w-full"
                        onClick={() => changeCurrency(currency.code as Currency)}
                      >
                        {currentCurrency === currency.code ? 'নির্বাচিত' : 'নির্বাচন করুন'}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-6">
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  নতুন কারেন্সি যোগ করুন
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="translations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>অনুবাদ ম্যানেজমেন্ট</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex gap-4">
                <Button className="gap-2">
                  <Upload className="h-4 w-4" />
                  অনুবাদ ফাইল আপলোড
                </Button>
                <Button variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
                  অনুবাদ ফাইল ডাউনলোড
                </Button>
              </div>

              <div className="border-t pt-6">
                <h4 className="font-medium mb-4">কমন ট্রান্সলেশন কী</h4>
                <div className="space-y-3">
                  {Object.keys(translations.bn).map((key) => (
                    <div key={key} className="p-3 bg-muted rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                        <div>
                          <span className="font-mono text-sm bg-background px-2 py-1 rounded">{key}</span>
                        </div>
                        <div>
                          <span className="text-sm">🇧🇩 {translations.bn[key as keyof typeof translations.bn]}</span>
                        </div>
                        <div>
                          <span className="text-sm">🇺🇸 {translations.en[key as keyof typeof translations.en]}</span>
                        </div>
                        <div>
                          <span className="text-sm">🇮🇳 {translations.hi[key as keyof typeof translations.hi] || 'N/A'}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>ভাষা সেটিংস</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>অটো ডিটেক্ট ভাষা</Label>
                    <p className="text-sm text-muted-foreground">ব্রাউজার ভাষা অনুযায়ী স্বয়ংক্রিয় নির্বাচন</p>
                  </div>
                  <Switch
                    checked={languageSettings.autoDetect}
                    onCheckedChange={(checked) => 
                      setLanguageSettings(prev => ({ ...prev, autoDetect: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>RTL সাপোর্ট</Label>
                    <p className="text-sm text-muted-foreground">ডান থেকে বামে লেখার ভাষা সাপোর্ট</p>
                  </div>
                  <Switch
                    checked={languageSettings.rtlSupport}
                    onCheckedChange={(checked) => 
                      setLanguageSettings(prev => ({ ...prev, rtlSupport: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>ফ্ল্যাগ দেখান</Label>
                    <p className="text-sm text-muted-foreground">ভাষা নির্বাচনে দেশের পতাকা দেখান</p>
                  </div>
                  <Switch
                    checked={languageSettings.showFlags}
                    onCheckedChange={(checked) => 
                      setLanguageSettings(prev => ({ ...prev, showFlags: checked }))
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>কারেন্সি সেটিংস</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>অটো ডিটেক্ট কারেন্সি</Label>
                    <p className="text-sm text-muted-foreground">অবস্থান অনুযায়ী স্বয়ংক্রিয় নির্বাচন</p>
                  </div>
                  <Switch
                    checked={currencySettings.autoDetect}
                    onCheckedChange={(checked) => 
                      setCurrencySettings(prev => ({ ...prev, autoDetect: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>কারেন্সি সিম্বল দেখান</Label>
                    <p className="text-sm text-muted-foreground">দামের সাথে মুদ্রার চিহ্ন দেখান</p>
                  </div>
                  <Switch
                    checked={currencySettings.showSymbol}
                    onCheckedChange={(checked) => 
                      setCurrencySettings(prev => ({ ...prev, showSymbol: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>কারেন্সি কোড দেখান</Label>
                    <p className="text-sm text-muted-foreground">দামের সাথে মুদ্রার কোড দেখান</p>
                  </div>
                  <Switch
                    checked={currencySettings.showCode}
                    onCheckedChange={(checked) => 
                      setCurrencySettings(prev => ({ ...prev, showCode: checked }))
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-end">
            <Button>সেটিংস সংরক্ষণ করুন</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MultiLanguageCurrency;
