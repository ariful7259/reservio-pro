
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import { CheckCheck, Upload, Palette, PenLine, SquareArrowDown, CircleCheck } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProductOption {
  id: string;
  name: string;
  type: 'select' | 'radio' | 'checkbox' | 'color' | 'text' | 'file';
  required: boolean;
  values: { id: string; name: string; price?: number; image?: string; color?: string }[];
  defaultValue?: string;
}

const ProductCustomizationWidget = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('preview');
  
  // প্রোডাক্ট অপশন ডেটা
  const [productOptions, setProductOptions] = useState<ProductOption[]>([
    {
      id: '1',
      name: 'সাইজ',
      type: 'radio',
      required: true,
      values: [
        { id: '1-1', name: 'S', price: 0 },
        { id: '1-2', name: 'M', price: 0 },
        { id: '1-3', name: 'L', price: 20 },
        { id: '1-4', name: 'XL', price: 30 }
      ],
      defaultValue: '1-2'
    },
    {
      id: '2',
      name: 'রঙ',
      type: 'color',
      required: true,
      values: [
        { id: '2-1', name: 'লাল', color: '#FF0000' },
        { id: '2-2', name: 'নীল', color: '#0000FF' },
        { id: '2-3', name: 'সবুজ', color: '#00FF00' },
        { id: '2-4', name: 'কালো', color: '#000000' }
      ],
      defaultValue: '2-1'
    },
    {
      id: '3',
      name: 'অতিরিক্ত অপশন',
      type: 'checkbox',
      required: false,
      values: [
        { id: '3-1', name: 'গিফট র‍্যাপিং', price: 50 },
        { id: '3-2', name: 'স্পেশাল প্যাকেজিং', price: 100 }
      ]
    },
    {
      id: '4',
      name: 'কাস্টম টেক্সট (নাম/মেসেজ)',
      type: 'text',
      required: false,
      values: []
    },
    {
      id: '5',
      name: 'ছবি আপলোড',
      type: 'file',
      required: false,
      values: []
    }
  ]);

  // উদাহরণ প্রোডাক্ট ডেটা
  const product = {
    name: 'কাস্টম টি-শার্ট',
    basePrice: 850,
    currency: '৳',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=500&auto=format&fit=crop'
  };

  // যে অপশন সিলেক্ট করা হয়েছে
  const [selectedOptions, setSelectedOptions] = useState({
    '1': '1-2',  // সাইজ
    '2': '2-1',  // রঙ
    '3': [],     // অতিরিক্ত অপশন
    '4': '',     // কাস্টম টেক্সট
    '5': null    // আপলোড ফাইল
  });

  // মোট মূল্য গণনা
  const calculateTotalPrice = () => {
    let totalPrice = product.basePrice;
    
    // সাইজের জন্য অতিরিক্ত মূল্য
    if (selectedOptions['1']) {
      const sizeOption = productOptions[0].values.find(v => v.id === selectedOptions['1']);
      totalPrice += sizeOption?.price || 0;
    }
    
    // অতিরিক্ত অপশনের জন্য মূল্য
    if (selectedOptions['3'] && Array.isArray(selectedOptions['3'])) {
      selectedOptions['3'].forEach(optionId => {
        const extraOption = productOptions[2].values.find(v => v.id === optionId);
        totalPrice += extraOption?.price || 0;
      });
    }
    
    return totalPrice;
  };

  // অপশন পরিবর্তন হ্যান্ডেল করা
  const handleOptionChange = (optionId: string, value: string | string[]) => {
    setSelectedOptions({
      ...selectedOptions,
      [optionId]: value
    });
  };

  // ফাইল আপলোড হ্যান্ডেল করা
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // কোনো ইমেজ সিলেক্ট হলে এটি রিয়েল প্রোজেক্টে ঠিকমতো প্রসেস করতে হবে
      // এখানে শুধু টোস্ট মেসেজ দেখানো হচ্ছে
      toast({
        title: "ফাইল আপলোড করা হয়েছে",
        description: `${e.target.files[0].name} (${Math.round(e.target.files[0].size / 1024)} KB) সফলভাবে আপলোড হয়েছে`,
      });
      
      setSelectedOptions({
        ...selectedOptions,
        '5': e.target.files[0].name
      });
    }
  };

  // প্রোডাক্ট কার্টে যোগ করা
  const handleAddToCart = () => {
    toast({
      title: "কার্টে যোগ করা হয়েছে",
      description: "কাস্টমাইজড প্রোডাক্ট সফলভাবে কার্টে যোগ করা হয়েছে",
    });
  };

  const handleAddOption = () => {
    const newOption: ProductOption = {
      id: `${productOptions.length + 1}`,
      name: 'নতুন অপশন',
      type: 'select',
      required: false,
      values: [
        { id: `new-1`, name: 'অপশন ১' },
        { id: `new-2`, name: 'অপশন ২' }
      ]
    };
    
    setProductOptions([...productOptions, newOption]);
    
    toast({
      title: "নতুন অপশন যোগ করা হয়েছে",
      description: "প্রোডাক্টে নতুন কাস্টমাইজেশন অপশন যোগ করা হয়েছে।",
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-md p-4 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <Palette className="h-6 w-6 text-primary shrink-0" />
        <div className="flex-grow">
          <h3 className="font-medium">প্রোডাক্ট কাস্টমাইজেশন উইজেট</h3>
          <p className="text-sm text-muted-foreground">
            গ্রাহকদের পণ্য কাস্টমাইজ করার সুযোগ দিন। রঙ, সাইজ, অপশন নির্বাচন এবং টেক্সট যোগ করার সুবিধা দিন।
          </p>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full mb-4 grid grid-cols-2">
          <TabsTrigger value="preview" className="flex items-center gap-2">
            <CheckCheck className="h-4 w-4" />
            প্রিভিউ
          </TabsTrigger>
          <TabsTrigger value="options" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            অপশন সেটিংস
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="preview" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* প্রোডাক্ট প্রিভিউ সেকশন */}
            <div className="space-y-4">
              <div className="relative rounded-lg overflow-hidden aspect-square border">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                
                {/* রঙ অনুযায়ী ওভারলে */}
                {selectedOptions['2'] && (
                  <div 
                    className="absolute inset-0 opacity-20"
                    style={{ 
                      backgroundColor: productOptions[1].values.find(
                        v => v.id === selectedOptions['2']
                      )?.color 
                    }}
                  ></div>
                )}
                
                {/* টেক্সট অনুযায়ী ওভারলে */}
                {selectedOptions['4'] && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/80 px-4 py-2 rounded-md text-lg font-bold">
                      {selectedOptions['4']}
                    </div>
                  </div>
                )}
                
                {/* আপলোড করা ফাইল দেখানো */}
                {selectedOptions['5'] && (
                  <div className="absolute top-2 right-2 bg-white/80 rounded-md px-2 py-1 text-xs flex items-center">
                    <Upload className="h-3 w-3 mr-1" />
                    ছবি আপলোড করা হয়েছে
                  </div>
                )}
              </div>
              
              <div>
                <h2 className="text-xl font-bold">{product.name}</h2>
                <div className="flex items-baseline mt-1">
                  <span className="text-2xl font-bold">
                    {product.currency}{calculateTotalPrice()}
                  </span>
                  <span className="text-sm text-muted-foreground ml-2">
                    (বেস প্রাইস {product.currency}{product.basePrice})
                  </span>
                </div>
                
                <div className="bg-primary/10 text-primary px-3 py-1.5 rounded-md text-sm mt-3 inline-flex items-center">
                  <CircleCheck className="h-4 w-4 mr-1.5" />
                  <span>কাস্টমাইজেশন অপশন উপলব্ধ</span>
                </div>
              </div>
              
              <div className="space-y-1 text-sm">
                {selectedOptions['1'] && (
                  <div className="flex gap-2">
                    <span className="text-muted-foreground">সাইজ:</span>
                    <span className="font-medium">{productOptions[0].values.find(v => v.id === selectedOptions['1'])?.name}</span>
                  </div>
                )}
                {selectedOptions['2'] && (
                  <div className="flex gap-2 items-center">
                    <span className="text-muted-foreground">রঙ:</span>
                    <div className="flex items-center gap-1">
                      <div 
                        className="h-3 w-3 rounded-full" 
                        style={{ backgroundColor: productOptions[1].values.find(v => v.id === selectedOptions['2'])?.color }}
                      ></div>
                      <span className="font-medium">{productOptions[1].values.find(v => v.id === selectedOptions['2'])?.name}</span>
                    </div>
                  </div>
                )}
                {selectedOptions['3'] && Array.isArray(selectedOptions['3']) && selectedOptions['3'].length > 0 && (
                  <div className="flex gap-2 items-center">
                    <span className="text-muted-foreground">অতিরিক্ত অপশন:</span>
                    <div>
                      {selectedOptions['3'].map((optionId) => (
                        <span key={optionId} className="font-medium inline-block mr-2">
                          {productOptions[2].values.find(v => v.id === optionId)?.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {selectedOptions['4'] && (
                  <div className="flex gap-2">
                    <span className="text-muted-foreground">কাস্টম টেক্সট:</span>
                    <span className="font-medium italic">"{selectedOptions['4']}"</span>
                  </div>
                )}
              </div>
              
              <Button 
                onClick={handleAddToCart}
                className="w-full py-6"
                size="lg"
              >
                কার্টে যোগ করুন
              </Button>
            </div>
            
            {/* কাস্টমাইজেশন ফর্ম */}
            <div className="space-y-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">পণ্য কাস্টমাইজ করুন</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* সাইজ সিলেক্ট */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>
                        {productOptions[0].name}
                        {productOptions[0].required && <span className="text-red-500 ml-1">*</span>}
                      </Label>
                    </div>
                    <RadioGroup
                      value={selectedOptions['1'] as string}
                      onValueChange={value => handleOptionChange('1', value)}
                      className="flex flex-wrap gap-2"
                    >
                      {productOptions[0].values.map(value => (
                        <div key={value.id} className="flex items-center">
                          <RadioGroupItem 
                            value={value.id} 
                            id={`size-${value.id}`}
                            className="peer hidden"
                          />
                          <Label
                            htmlFor={`size-${value.id}`}
                            className="min-w-[40px] h-10 flex items-center justify-center border rounded-md peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-white peer-data-[state=checked]:border-primary cursor-pointer hover:bg-accent/10"
                          >
                            {value.name}
                            {value.price > 0 && (
                              <span className="text-xs ml-1">+{product.currency}{value.price}</span>
                            )}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                  
                  {/* রঙ সিলেক্ট */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>
                        {productOptions[1].name}
                        {productOptions[1].required && <span className="text-red-500 ml-1">*</span>}
                      </Label>
                    </div>
                    <RadioGroup
                      value={selectedOptions['2'] as string}
                      onValueChange={value => handleOptionChange('2', value)}
                      className="flex flex-wrap gap-3"
                    >
                      {productOptions[1].values.map(value => (
                        <div key={value.id} className="flex items-center space-x-2">
                          <RadioGroupItem 
                            value={value.id} 
                            id={`color-${value.id}`} 
                            className="peer hidden"
                          />
                          <Label
                            htmlFor={`color-${value.id}`}
                            className="flex flex-col items-center cursor-pointer"
                          >
                            <div 
                              className="h-8 w-8 rounded-full border-2 peer-data-[state=checked]:border-primary"
                              style={{ backgroundColor: value.color }}
                            ></div>
                            <span className="text-xs mt-1">{value.name}</span>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  {/* অতিরিক্ত অপশন */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>{productOptions[2].name}</Label>
                    </div>
                    <div className="space-y-2">
                      {productOptions[2].values.map(value => (
                        <div key={value.id} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`extra-${value.id}`}
                            checked={Array.isArray(selectedOptions['3']) && selectedOptions['3'].includes(value.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                handleOptionChange('3', [...(selectedOptions['3'] as string[] || []), value.id]);
                              } else {
                                handleOptionChange('3', (selectedOptions['3'] as string[] || []).filter(id => id !== value.id));
                              }
                            }}
                          />
                          <Label htmlFor={`extra-${value.id}`} className="cursor-pointer">
                            {value.name}
                            {value.price > 0 && (
                              <span className="text-xs ml-1 text-muted-foreground">
                                (+ {product.currency}{value.price})
                              </span>
                            )}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* কাস্টম টেক্সট */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="custom-text">
                        {productOptions[3].name}
                      </Label>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <PenLine className="h-4 w-4 mr-2 text-muted-foreground" />
                        <Input 
                          id="custom-text"
                          placeholder="আপনার নাম বা মেসেজ লিখুন"
                          value={selectedOptions['4'] as string}
                          onChange={(e) => handleOptionChange('4', e.target.value)}
                          maxLength={20}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        সর্বোচ্চ ২০ অক্ষর লিখতে পারবেন
                      </p>
                    </div>
                  </div>

                  {/* ইমেজ আপলোড */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>{productOptions[4].name}</Label>
                    </div>
                    <div className="border-2 border-dashed rounded-md p-4 text-center">
                      <div className="space-y-2">
                        <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                        <div>
                          <p className="text-sm">
                            ড্র্যাগ করে ছাড়ুন অথবা <span className="text-primary cursor-pointer">ব্রাউজ করুন</span>
                          </p>
                          <p className="text-xs text-muted-foreground">
                            JPG, PNG, GIF (২MB পর্যন্ত)
                          </p>
                          <input 
                            type="file" 
                            className="hidden" 
                            id="image-upload"
                            accept="image/*"
                            onChange={handleFileUpload}
                          />
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="mt-2"
                            onClick={() => document.getElementById('image-upload')?.click()}
                          >
                            <Upload className="h-4 w-4 mr-2" /> ছবি আপলোড করুন
                          </Button>
                        </div>
                      </div>
                      
                      {selectedOptions['5'] && (
                        <div className="mt-3 p-2 bg-primary/10 rounded-md text-sm flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <CircleCheck className="h-4 w-4 text-primary" />
                            <span>{selectedOptions['5']}</span>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => setSelectedOptions({...selectedOptions, '5': null})}
                          >
                            ✕
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <p className="text-sm text-muted-foreground">
                      * চিহ্নিত ফিল্ডগুলো অবশ্যই পূরণ করতে হবে
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="options" className="mt-0">
          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">কাস্টমাইজেশন অপশন সেটিং</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {productOptions.map((option, index) => (
                    <div 
                      key={option.id} 
                      className="border rounded-md p-4 space-y-4"
                    >
                      <div className="flex justify-between items-center">
                        <div className="font-medium">
                          {option.name}
                          {option.required && <span className="text-red-500 ml-1">*</span>}
                        </div>
                        <div className="flex items-center gap-2">
                          <Select defaultValue={option.type}>
                            <SelectTrigger className="w-[140px]">
                              <SelectValue placeholder="টাইপ সিলেক্ট করুন" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="select">ড্রপডাউন</SelectItem>
                              <SelectItem value="radio">রেডিও বাটন</SelectItem>
                              <SelectItem value="checkbox">চেকবক্স</SelectItem>
                              <SelectItem value="color">কালার পিকার</SelectItem>
                              <SelectItem value="text">টেক্সট ফিল্ড</SelectItem>
                              <SelectItem value="file">ফাইল আপলোড</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Label htmlFor={`option-name-${option.id}`}>অপশনের নাম</Label>
                        <Input 
                          id={`option-name-${option.id}`} 
                          value={option.name}
                          className="max-w-xs"
                        />
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id={`required-${option.id}`}
                            checked={option.required}
                          />
                          <Label htmlFor={`required-${option.id}`}>বাধ্যতামূলক</Label>
                        </div>
                      </div>
                      
                      {(option.type !== 'text' && option.type !== 'file') && (
                        <div className="space-y-2">
                          <Label>অপশন ভ্যালুস</Label>
                          <div className="space-y-2">
                            {option.values.map((value) => (
                              <div key={value.id} className="flex items-center gap-2">
                                <Input 
                                  value={value.name}
                                  className="max-w-[200px]"
                                  placeholder="অপশনের নাম"
                                />
                                {option.type === 'color' ? (
                                  <input 
                                    type="color" 
                                    value={value.color || '#000000'}
                                    className="w-10 h-10"
                                  />
                                ) : (
                                  <Input 
                                    type="number"
                                    placeholder="অতিরিক্ত মূল্য"
                                    value={value.price?.toString() || '0'}
                                    className="max-w-[120px]"
                                  />
                                )}
                                <Button variant="ghost" size="sm">✕</Button>
                              </div>
                            ))}
                            <Button variant="outline" size="sm">
                              + নতুন ভ্যালু যোগ করুন
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                  
                  <Button onClick={handleAddOption}>
                    + নতুন অপশন যোগ করুন
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <div className="p-4 bg-blue-50 border border-blue-100 rounded-md flex gap-3">
              <SquareArrowDown className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-blue-700">
                  কাস্টমাইজেশন অপশন আপডেট করলে প্রিভিউ ট্যাবে গিয়ে পরিবর্তন দেখতে পারবেন।
                  প্রোডাক্ট ম্যানেজমেন্টে যান বিস্তারিত সেটিংস করতে এবং বিদ্যমান প্রোডাক্টে এই কাস্টমাইজেশন অপশন যুক্ত করতে।
                </p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductCustomizationWidget;
