import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import StorePreview from '@/components/store/StorePreview';
import ProductCatalogTemplate from '@/components/store/ProductCatalogTemplate';
import PaymentDemo from '@/components/store/PaymentDemo';
import MarketingTools from '@/components/store/MarketingTools';
import CommunitySupport from '@/components/store/CommunitySupport';

const CreateStore = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [storeInfo, setStoreInfo] = useState({
    name: '',
    description: '',
    category: '',
    logo: '',
    phone: '',
    email: '',
    address: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setStoreInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setStoreInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    setCurrentStep(prev => Math.min(prev + 1, 5));
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  return (
    <div className="container mx-auto py-10">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">আপনার অনলাইন স্টোর তৈরি করুন</h1>
        <p className="text-lg text-muted-foreground mt-2">
          কয়েকটি সহজ ধাপে আপনার নিজস্ব অনলাইন স্টোর তৈরি করুন
        </p>
      </div>

      {/* Progress Steps */}
      <div className="flex justify-between mb-8 relative">
        <div className="absolute left-0 right-0 top-1/2 h-1 bg-gray-200 -z-10"></div>
        {[1, 2, 3, 4, 5].map((step) => (
          <div 
            key={step} 
            className={`flex flex-col items-center gap-2 ${currentStep >= step ? 'text-primary' : 'text-muted-foreground'}`}
          >
            <div 
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                currentStep > step 
                  ? 'bg-primary text-white' 
                  : currentStep === step 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-100 text-muted-foreground'
              }`}
            >
              {step}
            </div>
            <span className="text-sm hidden md:block">
              {step === 1 && 'স্টোরের তথ্য'}
              {step === 2 && 'টেমপ্লেট নির্বাচন'}
              {step === 3 && 'প্রোডাক্ট যোগ করুন'}
              {step === 4 && 'পেমেন্ট সেটআপ'}
              {step === 5 && 'রিভিউ এবং লাইভ'}
            </span>
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Form */}
        <div>
          {currentStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>স্টোরের মৌলিক তথ্য</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">স্টোরের নাম</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    placeholder="আপনার স্টোরের নাম লিখুন" 
                    value={storeInfo.name} 
                    onChange={handleChange} 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">স্টোরের বর্ণনা</Label>
                  <Textarea 
                    id="description" 
                    name="description" 
                    placeholder="আপনার স্টোর সম্পর্কে একটি সংক্ষিপ্ত বর্ণনা দিন" 
                    value={storeInfo.description} 
                    onChange={handleChange}
                    rows={4}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">ব্যবসার ধরন</Label>
                  <Select
                    value={storeInfo.category}
                    onValueChange={(value) => handleSelectChange('category', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="ব্যবসার ধরন নির্বাচন করুন" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="electronics">ইলেকট্রনিক্স</SelectItem>
                      <SelectItem value="fashion">ফ্যাশন</SelectItem>
                      <SelectItem value="grocery">গ্রোসারি</SelectItem>
                      <SelectItem value="furniture">আসবাবপত্র</SelectItem>
                      <SelectItem value="health">স্বাস্থ্য ও সৌন্দর্য</SelectItem>
                      <SelectItem value="digital">ডিজিটাল প্রোডাক্ট</SelectItem>
                      <SelectItem value="service">সার্ভিস বিজনেস</SelectItem>
                      <SelectItem value="other">অন্যান্য</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">ফোন নম্বর</Label>
                  <Input 
                    id="phone" 
                    name="phone" 
                    placeholder="ব্যবসার যোগাযোগের ফোন নম্বর" 
                    value={storeInfo.phone} 
                    onChange={handleChange} 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">ইমেইল</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    placeholder="ব্যবসার ইমেইল" 
                    value={storeInfo.email} 
                    onChange={handleChange} 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">ঠিকানা (ঐচ্ছিক)</Label>
                  <Textarea 
                    id="address" 
                    name="address" 
                    placeholder="ব্যবসার ঠিকানা" 
                    value={storeInfo.address} 
                    onChange={handleChange}
                    rows={2}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => window.history.back()}>
                  ফিরে যান
                </Button>
                <Button onClick={handleNext}>পরবর্তী ধাপ</Button>
              </CardFooter>
            </Card>
          )}

          {currentStep === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>স্টোরের টেমপ্লেট নির্বাচন করুন</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { id: 'minimal', name: 'মিনিমাল', imgSrc: 'https://i.imgur.com/sZVqRWu.png' },
                    { id: 'modern', name: 'মডার্ন', imgSrc: 'https://i.imgur.com/JsQCsz3.png' },
                    { id: 'classic', name: 'ক্লাসিক', imgSrc: 'https://i.imgur.com/NWKGnlK.png' },
                    { id: 'bold', name: 'বোল্ড', imgSrc: 'https://i.imgur.com/2X9ORzE.png' }
                  ].map((template) => (
                    <div key={template.id} className="border rounded-lg overflow-hidden hover:border-primary cursor-pointer transition-all">
                      <div className="aspect-[4/3] bg-gray-100">
                        <img 
                          src={template.imgSrc} 
                          alt={template.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-3 flex items-center justify-between">
                        <span>{template.name}</span>
                        <Checkbox id={`template-${template.id}`} />
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="pt-4">
                  <h3 className="font-medium mb-2">অতিরিক্ত বিকল্পসমূহ</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="custom-domain" />
                      <Label htmlFor="custom-domain">কাস্টম ডোমেইন ব্যবহার করুন</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="mobile-app" />
                      <Label htmlFor="mobile-app">মোবাইল অ্যাপ সাপোর্ট</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="seo-tools" />
                      <Label htmlFor="seo-tools">এসইও টুলস অ্যাকটিভেট করুন</Label>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={handlePrevious}>
                  আগের ধাপ
                </Button>
                <Button onClick={handleNext}>পরবর্তী ধাপ</Button>
              </CardFooter>
            </Card>
          )}

          {currentStep === 3 && (
            <Card>
              <CardHeader>
                <CardTitle>প্রোডাক্ট যোগ করুন</CardTitle>
              </CardHeader>
              <CardContent>
                <ProductCatalogTemplate />
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={handlePrevious}>
                  আগের ধাপ
                </Button>
                <Button onClick={handleNext}>পরবর্তী ধাপ</Button>
              </CardFooter>
            </Card>
          )}

          {currentStep === 4 && (
            <Card>
              <CardHeader>
                <CardTitle>পেমেন্ট সেটআপ</CardTitle>
              </CardHeader>
              <CardContent>
                <PaymentDemo />
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={handlePrevious}>
                  আগের ধাপ
                </Button>
                <Button onClick={handleNext}>পরবর্তী ধাপ</Button>
              </CardFooter>
            </Card>
          )}

          {currentStep === 5 && (
            <Card>
              <CardHeader>
                <CardTitle>রিভিউ এবং লাইভ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                  <h3 className="font-medium text-green-800 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    সবকিছু প্রস্তুত!
                  </h3>
                  <p className="text-green-700 mt-1">
                    আপনার অনলাইন স্টোর লাইভ করতে প্রস্তুত। "স্টোর লাইভ করুন" বাটনে ক্লিক করুন।
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">আপনার স্টোরের তথ্য</h3>
                  <div className="space-y-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <p className="text-sm text-muted-foreground">স্টোরের নাম</p>
                        <p>{storeInfo.name || 'টেকনো শপ'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">ব্যবসার ধরন</p>
                        <p>{storeInfo.category || 'ইলেকট্রনিক্স'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">যোগাযোগ</p>
                        <p>{storeInfo.phone || '01712345678'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">ইমেইল</p>
                        <p>{storeInfo.email || 'info@technoshop.com'}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <CommunitySupport />
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={handlePrevious}>
                  আগের ধাপ
                </Button>
                <Button>স্টোর লাইভ করুন</Button>
              </CardFooter>
            </Card>
          )}
        </div>
        
        {/* Right Column - Preview */}
        <div className="order-first lg:order-last mb-8 lg:mb-0">
          <div className="sticky top-24">
            <StorePreview currentStep={currentStep} storeName={storeInfo.name || "টেকনো শপ"} />
            
            {currentStep >= 3 && <MarketingTools />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateStore;
