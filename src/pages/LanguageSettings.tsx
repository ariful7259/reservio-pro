
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Globe, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useApp } from '@/context/AppContext';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from '@/components/ui/separator';

const LanguageSettings = () => {
  const navigate = useNavigate();
  const { language, setLanguage, t } = useApp();

  const handleLanguageChange = (value: string) => {
    setLanguage(value as 'bn' | 'en');
  };

  const appSections = [
    { id: 'nav', title: { en: 'Navigation', bn: 'নেভিগেশন' } },
    { id: 'services', title: { en: 'Services', bn: 'সেবাসমূহ' } },
    { id: 'housing', title: { en: 'Housing', bn: 'আবাসন' } },
    { id: 'shopping', title: { en: 'Shopping', bn: 'শপিং' } },
    { id: 'wallet', title: { en: 'Wallet', bn: 'ওয়ালেট' } },
    { id: 'profile', title: { en: 'Profile', bn: 'প্রোফাইল' } },
    { id: 'settings', title: { en: 'Settings', bn: 'সেটিংস' } },
  ];

  return (
    <div className="container pt-16 pb-20 px-4">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">{t('language_settings')}</h1>
      </div>

      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex items-center gap-3 mb-4">
            <Globe className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-medium">
              {t('select_language')}
            </h2>
          </div>

          <RadioGroup 
            value={language} 
            onValueChange={handleLanguageChange}
            className="space-y-3"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="bn" id="bn" />
              <Label htmlFor="bn" className="flex items-center justify-between flex-1">
                <div>
                  <span className="font-medium">{t('bengali')}</span>
                  <p className="text-sm text-muted-foreground">
                    {language === 'bn' ? 'বাংলা ভাষায় অ্যাপ দেখুন' : 'View app in Bengali language'}
                  </p>
                </div>
                {language === 'bn' && <Check className="h-4 w-4 text-primary" />}
              </Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="en" id="en" />
              <Label htmlFor="en" className="flex items-center justify-between flex-1">
                <div>
                  <span className="font-medium">{t('english')}</span>
                  <p className="text-sm text-muted-foreground">
                    {language === 'bn' ? 'ইংরেজি ভাষায় অ্যাপ দেখুন' : 'View app in English language'}
                  </p>
                </div>
                {language === 'en' && <Check className="h-4 w-4 text-primary" />}
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      <h2 className="text-lg font-semibold mb-4">
        {t('translation_status')}
      </h2>
      
      <Card>
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground mb-4">
            {language === 'bn' 
              ? 'নীচে অ্যাপের বিভিন্ন অংশের জন্য অনুবাদের সম্পূর্ণতা দেখানো হচ্ছে'
              : 'Below shows the translation completeness for different parts of the app'}
          </p>
          
          <div className="space-y-4">
            {appSections.map((section) => (
              <div key={section.id}>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">
                    {language === 'bn' ? section.title.bn : section.title.en}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {section.id === 'shopping' || section.id === 'wallet' ? '90%' : '100%'}
                  </span>
                </div>
                <div className="w-full bg-secondary h-2 rounded-full">
                  <div 
                    className="bg-primary h-2 rounded-full"
                    style={{ 
                      width: section.id === 'shopping' || section.id === 'wallet' ? '90%' : '100%' 
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          
          <Separator className="my-4" />
          
          <div className="flex justify-between items-center">
            <span className="font-medium">
              {t('overall_completeness')}
            </span>
            <span>98%</span>
          </div>
          <div className="w-full bg-secondary h-2 rounded-full mt-2">
            <div 
              className="bg-green-500 h-2 rounded-full"
              style={{ width: '98%' }}
            ></div>
          </div>
          
          <div className="mt-6">
            <Button variant="outline" className="w-full">
              {t('give_translation_feedback')}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LanguageSettings;
