
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

interface SubcategorySelectorProps {
  category: any;
  selectedSubcategory: string;
  onSubcategoryChange: (value: string) => void;
}

const SubcategorySelector: React.FC<SubcategorySelectorProps> = ({
  category,
  selectedSubcategory,
  onSubcategoryChange
}) => {
  // Sample subcategories for different rental categories
  const getSubcategories = (categoryId: string) => {
    const subcategoryData: { [key: string]: any[] } = {
      'electronics': [
        { name: 'ক্যামেরা', count: 15 },
        { name: 'ল্যাপটপ', count: 12 },
        { name: 'টিভি', count: 8 },
        { name: 'গেমিং', count: 6 }
      ],
      'transport': [
        { name: 'গাড়ি', count: 25 },
        { name: 'মোটরসাইকেল', count: 18 },
        { name: 'সাইকেল', count: 10 },
        { name: 'ট্রাক', count: 5 }
      ],
      'event': [
        { name: 'সাউন্ড সিস্টেম', count: 12 },
        { name: 'টেন্ট', count: 8 },
        { name: 'চেয়ার-টেবিল', count: 15 },
        { name: 'ডেকোরেশন', count: 6 }
      ],
      'home': [
        { name: 'এসি', count: 20 },
        { name: 'ফার্নিচার', count: 35 },
        { name: 'রান্নার সামগ্রী', count: 12 },
        { name: 'ইলেকট্রিক্যাল', count: 8 }
      ],
      'education': [
        { name: 'প্রজেক্টর', count: 10 },
        { name: 'হোয়াইটবোর্ড', count: 8 },
        { name: 'বই', count: 25 },
        { name: 'ল্যাব সামগ্রী', count: 5 }
      ],
      'agriculture': [
        { name: 'ট্রাক্টর', count: 15 },
        { name: 'হারভেস্টার', count: 8 },
        { name: 'পাম্প', count: 12 },
        { name: 'স্প্রে মেশিন', count: 6 }
      ],
      'business': [
        { name: 'অফিস সামগ্রী', count: 20 },
        { name: 'প্রেজেন্টেশন', count: 15 },
        { name: 'POS সিস্টেম', count: 8 },
        { name: 'নেটওয়ার্ক', count: 5 }
      ],
      'tools': [
        { name: 'ড্রিল মেশিন', count: 18 },
        { name: 'ওয়েল্ডিং', count: 12 },
        { name: 'মেজারিং টুলস', count: 15 },
        { name: 'সেফটি ইকুইপমেন্ট', count: 8 }
      ],
      'commercial': [
        { name: 'অফিস স্পেস', count: 45 },
        { name: 'শপ স্পেস', count: 30 },
        { name: 'ওয়্যারহাউস', count: 15 },
        { name: 'মিটিং রুম', count: 12 }
      ],
      'guesthouse': [
        { name: 'ব্যাচেলর', count: 25 },
        { name: 'ফ্যামিলি', count: 18 },
        { name: 'সিঙ্গেল রুম', count: 35 },
        { name: 'ডাবল রুম', count: 20 }
      ],
      'rural': [
        { name: 'গ্রামীণ বাড়ি', count: 15 },
        { name: 'কুটির', count: 8 },
        { name: 'খামার বাড়ি', count: 12 },
        { name: 'ঐতিহাসিক বাড়ি', count: 5 }
      ],
      'studio': [
        { name: 'ফটো স্টুডিও', count: 12 },
        { name: 'ভিডিও স্টুডিও', count: 8 },
        { name: 'মিউজিক স্টুডিও', count: 6 },
        { name: 'ড্যান্স স্টুডিও', count: 4 }
      ]
    };

    return subcategoryData[categoryId] || [];
  };

  const subcategories = getSubcategories(category?.id);

  return (
    <div>
      <label className="text-sm font-medium mb-2 block">
        সাব-ক্যাটাগরি নির্বাচন করুন
      </label>
      <Select value={selectedSubcategory} onValueChange={onSubcategoryChange}>
        <SelectTrigger>
          <SelectValue placeholder="সাব-ক্যাটাগরি নির্বাচন করুন" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">সব সাব-ক্যাটাগরি</SelectItem>
          {subcategories.map((subcategory: any, index: number) => (
            <SelectItem key={index} value={subcategory.name}>
              <div className="flex items-center gap-2">
                <span>{subcategory.name}</span>
                <Badge variant="outline" className="ml-auto">{subcategory.count}টি</Badge>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SubcategorySelector;
