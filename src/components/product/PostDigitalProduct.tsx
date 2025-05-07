
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen,
  FileText,
  Code,
  Headphones,
  Video,
  Layout,
  Upload
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const PostDigitalProduct = () => {
  const navigate = useNavigate();

  const productTypes = [
    {
      icon: <BookOpen className="h-8 w-8 text-blue-500" />,
      title: 'কোর্স',
      description: 'অনলাইন কোর্স ও টিউটরিয়াল',
      onClick: () => navigate('/create-digital-product?type=course')
    },
    {
      icon: <FileText className="h-8 w-8 text-green-500" />,
      title: 'ইবুক',
      description: 'ডিজিটাল বই ও পিডিএফ গাইড',
      onClick: () => navigate('/create-digital-product?type=ebook')
    },
    {
      icon: <Layout className="h-8 w-8 text-amber-500" />,
      title: 'টেমপ্লেট',
      description: 'ওয়েবসাইট, গ্রাফিক্স, প্রেজেন্টেশন',
      onClick: () => navigate('/create-digital-product?type=template')
    },
    {
      icon: <Code className="h-8 w-8 text-purple-500" />,
      title: 'সফটওয়্যার',
      description: 'অ্যাপ, প্লাগইন, এক্সটেনশন',
      onClick: () => navigate('/create-digital-product?type=software')
    },
    {
      icon: <Headphones className="h-8 w-8 text-red-500" />,
      title: 'অডিও',
      description: 'মিউজিক, সাউন্ড, পডকাস্ট',
      onClick: () => navigate('/create-digital-product?type=audio')
    },
    {
      icon: <Video className="h-8 w-8 text-cyan-500" />,
      title: 'ভিডিও',
      description: 'ভিডিও কন্টেন্ট, স্টক ফুটেজ',
      onClick: () => navigate('/create-digital-product?type=video')
    }
  ];

  return (
    <div>
      <div className="mb-4">
        <h3 className="text-lg font-medium">ডিজিটাল প্রোডাক্ট আপলোড করুন</h3>
        <p className="text-sm text-muted-foreground">
          আপনার ডিজিটাল প্রোডাক্ট আপলোড করে বিক্রি করুন
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {productTypes.map((type, index) => (
          <Card 
            key={index} 
            className="cursor-pointer hover:border-primary transition-colors"
            onClick={type.onClick}
          >
            <CardContent className="p-4 flex flex-col items-center text-center">
              {type.icon}
              <h4 className="font-medium mt-2">{type.title}</h4>
              <p className="text-xs text-muted-foreground mt-1">{type.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="mt-6 flex justify-center">
        <Button 
          variant="outline" 
          className="w-full flex gap-2"
          onClick={() => navigate('/seller-dashboard')}
        >
          <Upload className="h-4 w-4" />
          সেলার ড্যাশবোর্ড দেখুন
        </Button>
      </div>
    </div>
  );
};

export default PostDigitalProduct;
