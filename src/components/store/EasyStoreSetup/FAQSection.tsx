
import React, { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const faqs = [
  {
    q: "কিভাবে নতুন পণ্য যোগ করবো?",
    a: "স্টোর সেটআপ ফর্মে 'নতুন পণ্য যোগ করুন' বাটন ক্লিক করুন এবং প্রয়োজনীয় তথ্য দিন।",
    icon: "🛍️"
  },
  {
    q: "একাধিক ছবি কিভাবে দিবো?",
    a: "প্রোডাক্ট এডিট অপশনে গ্যালারিতে ছবি আপলোড করুন। একসাথে ৫টি পর্যন্ত ছবি যোগ করতে পারবেন।",
    icon: "📸"
  },
  {
    q: "Wishlist কিভাবে কাজ করে?",
    a: "হার্ট আইকনে ক্লিক করলেই প্রোডাক্ট wishlist-এ যোগ/বাদ হবে। কাস্টমাররা সহজেই পছন্দের পণ্য সেভ করতে পারবেন।",
    icon: "❤️"
  },
  {
    q: "পেমেন্ট কিভাবে সেটআপ করবো?",
    a: "সেটিংস থেকে পেমেন্ট গেটওয়ে কনেক্ট করুন। বিকাশ, নগদ, রকেট সহ সকল পেমেন্ট মেথড সাপোর্ট করে।",
    icon: "💳"
  },
  {
    q: "অর্ডার ট্র্যাকিং কিভাবে কাজ করে?",
    a: "প্রতিটি অর্ডারের জন্য অটোমেটিক ট্র্যাকিং নাম্বার তৈরি হয়। কাস্টমার রিয়েল টাইমে অর্ডার স্ট্যাটাস দেখতে পারবেন।",
    icon: "📦"
  },
  {
    q: "কাস্টমার সাপোর্ট কেমন?",
    a: "২৪/৭ লাইভ চ্যাট সাপোর্ট এবং ফোন সাপোর্ট পাবেন। যেকোনো সমস্যার সমাধান পেতে আমাদের টিম সবসময় প্রস্তুত।",
    icon: "🎧"
  }
];

const FAQSection: React.FC = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <section className="mt-8 mb-6" aria-labelledby="faq-heading">
      <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <CardContent className="p-4 sm:p-6">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <HelpCircle className="h-6 w-6 text-primary" />
              <h2 id="faq-heading" className="text-lg sm:text-xl font-bold text-gray-800">
                সাধারণ জিজ্ঞাসা
              </h2>
            </div>
            <p className="text-sm text-gray-600">
              সবচেয়ে বেশি জিজ্ঞাসিত প্রশ্নের উত্তর
            </p>
          </div>

          {/* Mobile: 2 columns grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {faqs.map((item, index) => (
              <Collapsible
                key={index}
                open={openItems.includes(index)}
                onOpenChange={() => toggleItem(index)}
              >
                <Card className="overflow-hidden border border-gray-200 hover:border-primary/30 transition-all duration-200 hover:shadow-md">
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full p-3 sm:p-4 h-auto text-left hover:bg-gray-50/80 focus:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start gap-3 w-full">
                        <span className="text-lg sm:text-xl flex-shrink-0 mt-0.5">
                          {item.icon}
                        </span>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm sm:text-base text-gray-800 leading-tight text-left">
                            {item.q}
                          </h3>
                        </div>
                        <div className="flex-shrink-0 ml-2">
                          {openItems.includes(index) ? (
                            <ChevronUp className="h-4 w-4 text-gray-500" />
                          ) : (
                            <ChevronDown className="h-4 w-4 text-gray-500" />
                          )}
                        </div>
                      </div>
                    </Button>
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-up-2 data-[state=open]:slide-down-2">
                    <div className="px-3 sm:px-4 pb-3 sm:pb-4">
                      <div className="pl-8 sm:pl-10">
                        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                          {item.a}
                        </p>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Card>
              </Collapsible>
            ))}
          </div>

          {/* Call to action */}
          <div className="mt-6 text-center">
            <div className="bg-gradient-to-r from-primary/10 to-purple-100 rounded-lg p-4">
              <p className="text-sm text-gray-700 mb-3">
                আরো কোনো প্রশ্ন আছে? আমাদের সাথে যোগাযোগ করুন
              </p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <Button variant="outline" size="sm" className="text-xs">
                  লাইভ চ্যাট করুন
                </Button>
                <Button variant="outline" size="sm" className="text-xs">
                  ইমেইল পাঠান
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default FAQSection;
