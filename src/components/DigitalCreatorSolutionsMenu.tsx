
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Rocket, 
  BookOpen, 
  Mail, 
  Calendar, 
  Users, 
  BarChart, 
  DollarSign,
  MessageSquare,
  ChevronDown,
  Globe,
  Repeat,
  FileText,
  CreditCard,
  Shield,
  Video,
  ShoppingBag,
  Share,
  Settings,
  Code,
  Award,
  Monitor,
  Smartphone,
  ShoppingCart,
  Tag,
  CreditCard as CardIcon,
  Search,
  Percent,
  BarChart2,
  Package,
  Truck,
  MessageCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface DigitalCreatorSolutionsMenuProps {
  isExpanded?: boolean;
  onToggle?: () => void;
}

const DigitalCreatorSolutionsMenu: React.FC<DigitalCreatorSolutionsMenuProps> = ({
  isExpanded = false,
  onToggle = () => {},
}) => {
  const creatorSolutions = [
    { 
      icon: <Rocket className="h-8 w-8 text-primary" />, 
      title: "অনলাইন স্টোর / ওয়েবসাইট",
      description: "নিজের ব্র্যান্ড তৈরি করুন এবং নিজস্ব ডোমেইনে আপনার পণ্য বিক্রি করুন",
      path: "/create-store",
      features: [
        "সহজ টেমপ্লেট সিলেকশন",
        "ড্র্যাগ-এন্ড-ড্রপ বিল্ডার",
        "মোবাইল-অপটিমাইজড ডিজাইন",
        "সহজ প্রোডাক্ট ম্যানেজমেন্ট",
        "একাধিক পেমেন্ট অপশন",
        "বেসিক SEO টুলস",
        "ডিস্কাউন্ট এবং প্রোমোশন টুলস",
        "বেসিক অ্যানালিটিক্স ড্যাশবোর্ড",
        "স্টক ম্যানেজমেন্ট",
        "অর্ডার ম্যানেজমেন্ট সিস্টেম",
        "সহজ শিপিং সেটিংস",
        "সোশ্যাল মিডিয়া ইন্টিগ্রেশন",
        "মোবাইল অ্যাপ ভিউ",
        "কাস্টমার রিভিউ সিস্টেম",
        "লাইভ চ্যাট সাপোর্ট"
      ],
      badge: "বেস্টসেলার",
      pricing: "৳১০,০০০/বছর",
      resellable: true
    },
    { 
      icon: <BookOpen className="h-8 w-8 text-amber-500" />, 
      title: "কোর্স বিল্ডার",
      description: "অনলাইন কোর্স তৈরি করুন এবং আপনার জ্ঞান বিক্রি করুন",
      path: "/course-builder",
      features: [
        "ভিডিও, অডিও, পিডিএফ কনটেন্ট",
        "কুইজ এবং অ্যাসাইনমেন্ট সিস্টেম",
        "স্টুডেন্ট প্রোগ্রেস ট্র্যাকিং",
        "সার্টিফিকেট জেনারেশন",
        "ড্রিপ কনটেন্ট রিলিজ"
      ],
      badge: "নতুন",
      pricing: "৳৮,০০০/বছর",
      resellable: true
    },
    { 
      icon: <Calendar className="h-8 w-8 text-red-500" />, 
      title: "ইভেন্ট ম্যানেজমেন্ট",
      description: "ইভেন্ট, ওয়েবিনার এবং লাইভ সেশন পরিচালনা করুন",
      path: "/event-hosting",
      features: [
        "টিকেট সেলস ম্যানেজমেন্ট",
        "লাইভ স্ট্রিমিং ইন্টিগ্রেশন",
        "অ্যাটেন্ডি ম্যানেজমেন্ট",
        "ইভেন্ট রেমাইন্ডার",
        "ফিডব্যাক কালেকশন"
      ],
      pricing: "৳৭,০০০/বছর",
      resellable: true
    },
    { 
      icon: <MessageSquare className="h-8 w-8 text-orange-500" />, 
      title: "১:১ সেশন বুকিং",
      description: "আপনার সময়ের জন্য পেমেন্ট গ্রহণ করুন এবং ১:১ কনসালটেশন প্রদান করুন",
      path: "/one-on-one",
      features: [
        "স্মার্ট ক্যালেন্ডার ইন্টিগ্রেশন",
        "পেমেন্ট প্রসেসিং",
        "অটোমেটেড রিমাইন্ডার",
        "ভিডিও কল ইন্টিগ্রেশন",
        "সেশন নোট ট্র্যাকিং"
      ],
      pricing: "৳৬,০০০/বছর",
      resellable: true
    },
    { 
      icon: <DollarSign className="h-8 w-8 text-green-500" />, 
      title: "ডিজিটাল প্রোডাক্ট মার্কেটপ্লেস",
      description: "ই-বুক, টেমপ্লেট, সফটওয়্যার এবং অন্যান্য ডিজিটাল সামগ্রী বিক্রি করুন",
      path: "/digital-products",
      features: [
        "ডিজিটাল ডেলিভারি সিস্টেম",
        "আপসেল/ক্রস-সেল ফিচার",
        "প্রোডাক্ট বান্ডলিং",
        "কুপন এবং ডিসকাউন্ট"
      ],
      badge: "হট",
      pricing: "৳৯,০০০/বছর",
      resellable: true
    },
    { 
      icon: <Users className="h-8 w-8 text-yellow-500" />, 
      title: "মেম্বারশিপ কমিউনিটি",
      description: "আপনার অনুসারীদের জন্য একটি এক্সক্লুসিভ মেম্বারশিপ কমিউনিটি তৈরি করুন",
      path: "/paid-community",
      features: [
        "মাল্টিপল মেম্বারশিপ টায়ার",
        "কমিউনিটি ফোরাম",
        "এক্সক্লুসিভ কনটেন্ট শেয়ারিং",
        "সাবস্ক্রিপশন ম্যানেজমেন্ট",
        "মেম্বার-অনলি লাইভ সেশন"
      ],
      pricing: "৳৭,৫০০/বছর",
      resellable: true
    },
    { 
      icon: <Globe className="h-8 w-8 text-cyan-500" />, 
      title: "মাল্টি-চ্যানেল মার্কেটিং",
      description: "সোশ্যাল মিডিয়া, ইমেইল এবং অন্যান্য চ্যানেলে আপনার কনটেন্ট প্রমোট করুন",
      path: "/multi-channel",
      features: [
        "সোশ্যাল মিডিয়া অটোমেশন",
        "কনটেন্ট ক্যালেন্ডার",
        "ক্রস-প্ল্যাটফর্ম এনালিটিক্স",
        "হ্যাশট্যাগ অপটিমাইজেশন",
        "অডিয়েন্স টার্গেটিং"
      ],
      badge: "নতুন",
      pricing: "৳৭,০০০/বছর",
      resellable: true
    },
    { 
      icon: <Repeat className="h-8 w-8 text-indigo-500" />, 
      title: "রিসেলার প্রোগ্রাম",
      description: "আমাদের প্রোডাক্ট রিসেল করে কমিশন আয় করুন",
      path: "/reseller-program",
      features: [
        "৩০-৫০% রিসেল কমিশন",
        "রিসেলার ড্যাশবোর্ড",
        "মার্কেটিং রিসোর্স",
        "সেলস ট্র্যাকিং",
        "অটোমেটিক কমিশন পেমেন্ট"
      ],
      badge: "আয় করুন",
      pricing: "ফ্রি জয়েন",
      resellable: false
    },
    { 
      icon: <FileText className="h-8 w-8 text-emerald-500" />, 
      title: "কনটেন্ট প্ল্যানার",
      description: "আপনার ব্লগ, সোশ্যাল মিডিয়া এবং ইমেইল কনটেন্ট প্ল্যান করুন",
      path: "/content-planner",
      features: [
        "কনটেন্ট ক্যালেন্ডার",
        "আইডিয়া জেনারেটর",
        "কি-ওয়ার্ড রিসার্চ টুল",
        "এডিটোরিয়াল ওয়ার্কফ্লো",
        "AI কনটেন্ট সাজেশন"
      ],
      pricing: "৳৪,৫০০/বছর",
      resellable: true
    },
    { 
      icon: <CreditCard className="h-8 w-8 text-pink-500" />, 
      title: "পেমেন্ট গেটওয়ে",
      description: "মাল্টিপল পেমেন্ট মেথড গ্রহণ করুন এবং ট্রানজ্যাকশন ম্যানেজ করুন",
      path: "/payment-gateway",
      features: [
        "স্থানীয় এবং আন্তর্জাতিক পেমেন্ট",
        "সাবস্ক্রিপশন ম্যানেজমেন্ট",
        "বিল কালেকশন",
        "রিফান্ড প্রসেসিং",
        "সিকিউরিটি কমপ্লায়েন্স"
      ],
      pricing: "৩% + ৳২ প্রতি ট্রানজ্যাকশন",
      resellable: false
    },
    { 
      icon: <Video className="h-8 w-8 text-red-600" />, 
      title: "ভিডিও হোস্টিং প্ল্যাটফর্ম",
      description: "আপনার ভিডিও কনটেন্ট হোস্ট করুন এবং মনেটাইজ করুন",
      path: "/video-hosting",
      features: [
        "হাই-কোয়ালিটি স্ট্রিমিং",
        "ভিউয়ার এনগেজমেন্ট ট্র্যাকিং",
        "পেইড ভিডিও সাবস্ক্রিপশন",
        "কাস্টম ভিডিও প্লেয়ার",
        "অডিয়েন্স রিটেনশন এনালিটিক্স"
      ],
      badge: "হট",
      pricing: "৳৯,৫০০/বছর",
      resellable: true
    },
  ];

  return (
    <div className="w-full">
      <Collapsible open={isExpanded} onOpenChange={onToggle}>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-full flex items-center justify-between p-3">
            <div className="flex items-center gap-2">
              <Rocket className="h-5 w-5 text-primary" />
              <span className="font-medium">ডিজিটাল ক্রিয়েটর সলিউশন</span>
            </div>
            <ChevronDown className={`h-5 w-5 transition-transform ${isExpanded ? 'transform rotate-180' : ''}`} />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="px-2 py-3">
          <div className="grid grid-cols-1 gap-3">
            {creatorSolutions.map((solution, index) => (
              <Card 
                key={index} 
                className="border cursor-pointer hover:shadow-sm transition-all hover:bg-gray-50"
              >
                <Link to={solution.path}>
                  <CardContent className="p-3">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        {solution.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-sm">{solution.title}</h3>
                          {solution.badge && (
                            <Badge className="text-xs bg-primary">{solution.badge}</Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{solution.description}</p>
                        
                        <div className="flex flex-wrap gap-1 mb-2">
                          {solution.features?.slice(0, 3).map((feature, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs font-normal">
                              {feature}
                            </Badge>
                          ))}
                          {solution.features?.length > 3 && (
                            <Badge variant="outline" className="text-xs font-normal">
                              +{solution.features.length - 3}
                            </Badge>
                          )}
                        </div>
                        
                        <div className="flex items-center justify-between mt-2 pt-2 border-t">
                          <div className="flex items-center">
                            <span className="text-xs font-semibold text-primary">{solution.pricing}</span>
                          </div>
                          {solution.resellable && (
                            <Badge variant="outline" className="text-xs bg-amber-50 text-amber-700 border-amber-200">
                              <Repeat className="h-3 w-3 mr-1" /> রিসেল যোগ্য
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default DigitalCreatorSolutionsMenu;
