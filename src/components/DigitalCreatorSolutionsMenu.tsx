
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
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Card, CardContent } from '@/components/ui/card';

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
      title: "আপনার নিজস্ব অনলাইন স্টোর / ওয়েবসাইট",
      description: "নিজের ব্র্যান্ড তৈরি করুন এবং নিজস্ব ডোমেইনে আপনার পণ্য বিক্রি করুন।",
      path: "/create-store"
    },
    { 
      icon: <Mail className="h-8 w-8 text-blue-500" />, 
      title: "ইমেইল অটোমেশন",
      description: "স্বযংক্রিয় ইমেইল মার্কেটিং ক্যাম্পেইন তৈরি করুন আপনার দর্শকদের সাথে যোগাযোগ রাখতে।",
      path: "/email-automation"
    },
    { 
      icon: <BookOpen className="h-8 w-8 text-amber-500" />, 
      title: "কোর্স বিল্ডার",
      description: "অনলাইন কোর্স তৈরি করুন এবং আপনার জ্ঞান বিক্রি করুন।",
      path: "/course-builder"
    },
    { 
      icon: <Calendar className="h-8 w-8 text-red-500" />, 
      title: "ইভেন্ট ও ওয়েবিনার হোস্টিং",
      description: "ইভেন্ট, ওয়েবিনার এবং লাইভ সেশন পরিচালনা করুন সহজেই।",
      path: "/event-hosting"
    },
    { 
      icon: <MessageSquare className="h-8 w-8 text-orange-500" />, 
      title: "১:১ সেশন অফার",
      description: "আপনার সময়ের জন্য পেমেন্ট গ্রহণ করুন এবং ১:১ কনসালটেশন প্রদান করুন।",
      path: "/one-on-one"
    },
    { 
      icon: <DollarSign className="h-8 w-8 text-green-500" />, 
      title: "ডিজিটাল প্রোডাক্ট বিক্রয়",
      description: "ই-বুক, টেমপ্লেট, সফটওয়্যার এবং অন্যান্য ডিজিটাল সামগ্রী বিক্রি করুন।",
      path: "/digital-products"
    },
    { 
      icon: <Users className="h-8 w-8 text-yellow-500" />, 
      title: "পেইড কমিউনিটি চালু করুন",
      description: "আপনার অনুসারীদের জন্য একটি এক্সক্লুসিভ মেম্বারশিপ কমিউনিটি তৈরি করুন।",
      path: "/paid-community"
    },
    { 
      icon: <BarChart className="h-8 w-8 text-purple-500" />, 
      title: "অডিয়েন্স অ্যানালিটিক্স",
      description: "আপনার দর্শকদের আচরণ বিশ্লেষণ করুন এবং মার্কেটিং কৌশল উন্নত করুন।",
      path: "/audience-analytics"
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
                  <CardContent className="p-3 flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      {solution.icon}
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">{solution.title}</h3>
                      <p className="text-xs text-muted-foreground line-clamp-2">{solution.description}</p>
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
