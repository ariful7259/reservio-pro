
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Share2, Check, Copy, Link as LinkIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/components/ui/use-toast';

const SocialSharing = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('products');
  const [copied, setCopied] = useState(false);

  const handleCopyLink = (link: string) => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    toast({
      title: "লিংক কপি করা হয়েছে",
      description: "লিংক সফলভাবে কপি করা হয়েছে, এটি শেয়ার করতে পারেন।"
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = (platform: string, item: string) => {
    toast({
      title: `${platform} এ শেয়ার করা হচ্ছে`,
      description: `আপনি ${item} ${platform} এ শেয়ার করছেন`
    });
    
    // Here you would implement actual social sharing
    // For now we just show a toast notification
  };

  const products = [
    {
      id: '1',
      name: 'স্মার্ট ওয়াচ প্রো',
      image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3',
      price: '৳6,500',
      link: 'https://example.com/products/smart-watch-pro'
    },
    {
      id: '2',
      name: 'ওয়্যারলেস নয়েজ ক্যান্সেলিং হেডফোন',
      image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=1968&auto=format&fit=crop&ixlib=rb-4.0.3',
      price: '৳8,200',
      link: 'https://example.com/products/wireless-headphones'
    },
    {
      id: '3',
      name: 'পোর্টেবল ব্লুটুথ স্পিকার',
      image: 'https://images.unsplash.com/photo-1589003511626-11bfa7d307e1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3',
      price: '৳3,400',
      link: 'https://example.com/products/bluetooth-speaker'
    }
  ];

  const services = [
    {
      id: '1',
      name: 'হোম ক্লিনিং সার্ভিস',
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
      price: '৳1,200/ঘণ্টা',
      link: 'https://example.com/services/home-cleaning'
    },
    {
      id: '2',
      name: 'ইলেকট্রিশিয়ান সার্ভিস',
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3',
      price: '৳800/ঘণ্টা',
      link: 'https://example.com/services/electrician'
    },
    {
      id: '3',
      name: 'প্লামিং সার্ভিস',
      image: 'https://images.unsplash.com/photo-1601999958058-bf960fca31de?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
      price: '৳700/ঘণ্টা',
      link: 'https://example.com/services/plumbing'
    }
  ];

  const stories = [
    {
      id: '1',
      name: 'ফুটবল খেলার নতুন অভিজ্ঞতা',
      image: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3',
      author: 'রাসেল হক',
      link: 'https://example.com/stories/football-experience'
    },
    {
      id: '2',
      name: 'আমার সেলাই শেখার যাত্রা',
      image: 'https://images.unsplash.com/photo-1605117882932-f9e32b03fea9?q=80&w=1969&auto=format&fit=crop&ixlib=rb-4.0.3',
      author: 'সুমাইয়া খান',
      link: 'https://example.com/stories/sewing-journey'
    },
    {
      id: '3',
      name: 'সাইক্লিং এ আমার অভিযান',
      image: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
      author: 'আরিফ হাসান',
      link: 'https://example.com/stories/cycling-adventure'
    }
  ];

  return (
    <div className="container px-4 pt-16 pb-20">
      <div className="flex items-center gap-3 mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold">সোশ্যাল শেয়ারিং</h1>
      </div>

      <Card className="mb-6 bg-gradient-to-r from-primary/10 to-primary/20">
        <CardContent className="pt-6">
          <div className="text-center">
            <Share2 className="h-12 w-12 mx-auto text-primary mb-3" />
            <h2 className="text-lg font-semibold mb-1">প্রোডাক্ট, সার্ভিস ও স্টোরি শেয়ার করুন</h2>
            <p className="text-sm text-muted-foreground">সোশ্যাল মিডিয়ায় শেয়ার করে আপনার অভিজ্ঞতা জানান অন্যদের সাথে</p>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="products">প্রোডাক্ট</TabsTrigger>
          <TabsTrigger value="services">সার্ভিস</TabsTrigger>
          <TabsTrigger value="stories">স্টোরি</TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="space-y-4">
          <ScrollArea className="h-[500px] pr-4">
            <div className="space-y-4">
              {products.map((product) => (
                <Card key={product.id} className="overflow-hidden">
                  <div className="h-48 w-full overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <CardDescription>{product.price}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex items-center justify-between border rounded-md p-2">
                      <div className="truncate text-sm flex-1">{product.link}</div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="ml-2"
                        onClick={() => handleCopyLink(product.link)}
                      >
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  </CardContent>
                  <CardFooter className="grid grid-cols-4 gap-2">
                    <Button variant="outline" className="w-full p-2" onClick={() => handleShare('Facebook', product.name)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-blue-600">
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                      </svg>
                    </Button>
                    <Button variant="outline" className="w-full p-2" onClick={() => handleShare('Twitter', product.name)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-blue-400">
                        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                      </svg>
                    </Button>
                    <Button variant="outline" className="w-full p-2" onClick={() => handleShare('WhatsApp', product.name)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-green-500">
                        <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.2.3-.767.966-.94 1.164-.173.199-.347.223-.647.075-.3-.15-1.269-.467-2.416-1.483-.893-.8-1.484-1.781-1.66-2.082-.174-.3-.018-.462.13-.61.134-.133.3-.347.45-.52.149-.174.2-.3.3-.498.099-.2.05-.374-.025-.524-.075-.15-.672-1.62-.922-2.206-.242-.579-.487-.5-.672-.51-.172-.008-.371-.01-.571-.01-.2 0-.523.074-.797.359-.273.283-1.045 1.022-1.045 2.5s1.07 2.916 1.22 3.115c.149.2 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path>
                      </svg>
                    </Button>
                    <Button variant="outline" className="w-full p-2" onClick={() => handleShare('Email', product.name)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-gray-500">
                        <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                      </svg>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="services" className="space-y-4">
          <ScrollArea className="h-[500px] pr-4">
            <div className="space-y-4">
              {services.map((service) => (
                <Card key={service.id} className="overflow-hidden">
                  <div className="h-48 w-full overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{service.name}</CardTitle>
                    <CardDescription>{service.price}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex items-center justify-between border rounded-md p-2">
                      <div className="truncate text-sm flex-1">{service.link}</div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="ml-2"
                        onClick={() => handleCopyLink(service.link)}
                      >
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  </CardContent>
                  <CardFooter className="grid grid-cols-4 gap-2">
                    <Button variant="outline" className="w-full p-2" onClick={() => handleShare('Facebook', service.name)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-blue-600">
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                      </svg>
                    </Button>
                    <Button variant="outline" className="w-full p-2" onClick={() => handleShare('Twitter', service.name)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-blue-400">
                        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                      </svg>
                    </Button>
                    <Button variant="outline" className="w-full p-2" onClick={() => handleShare('WhatsApp', service.name)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-green-500">
                        <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.2.3-.767.966-.94 1.164-.173.199-.347.223-.647.075-.3-.15-1.269-.467-2.416-1.483-.893-.8-1.484-1.781-1.66-2.082-.174-.3-.018-.462.13-.61.134-.133.3-.347.45-.52.149-.174.2-.3.3-.498.099-.2.05-.374-.025-.524-.075-.15-.672-1.62-.922-2.206-.242-.579-.487-.5-.672-.51-.172-.008-.371-.01-.571-.01-.2 0-.523.074-.797.359-.273.283-1.045 1.022-1.045 2.5s1.07 2.916 1.22 3.115c.149.2 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path>
                      </svg>
                    </Button>
                    <Button variant="outline" className="w-full p-2" onClick={() => handleShare('Email', service.name)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-gray-500">
                        <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                      </svg>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="stories" className="space-y-4">
          <ScrollArea className="h-[500px] pr-4">
            <div className="space-y-4">
              {stories.map((story) => (
                <Card key={story.id} className="overflow-hidden">
                  <div className="h-48 w-full overflow-hidden">
                    <img
                      src={story.image}
                      alt={story.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{story.name}</CardTitle>
                    <CardDescription>লেখক: {story.author}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex items-center justify-between border rounded-md p-2">
                      <div className="truncate text-sm flex-1">{story.link}</div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="ml-2"
                        onClick={() => handleCopyLink(story.link)}
                      >
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  </CardContent>
                  <CardFooter className="grid grid-cols-4 gap-2">
                    <Button variant="outline" className="w-full p-2" onClick={() => handleShare('Facebook', story.name)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-blue-600">
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                      </svg>
                    </Button>
                    <Button variant="outline" className="w-full p-2" onClick={() => handleShare('Twitter', story.name)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-blue-400">
                        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                      </svg>
                    </Button>
                    <Button variant="outline" className="w-full p-2" onClick={() => handleShare('WhatsApp', story.name)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-green-500">
                        <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.2.3-.767.966-.94 1.164-.173.199-.347.223-.647.075-.3-.15-1.269-.467-2.416-1.483-.893-.8-1.484-1.781-1.66-2.082-.174-.3-.018-.462.13-.61.134-.133.3-.347.45-.52.149-.174.2-.3.3-.498.099-.2.05-.374-.025-.524-.075-.15-.672-1.62-.922-2.206-.242-.579-.487-.5-.672-.51-.172-.008-.371-.01-.571-.01-.2 0-.523.074-.797.359-.273.283-1.045 1.022-1.045 2.5s1.07 2.916 1.22 3.115c.149.2 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path>
                      </svg>
                    </Button>
                    <Button variant="outline" className="w-full p-2" onClick={() => handleShare('Email', story.name)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-gray-500">
                        <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                      </svg>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SocialSharing;
