
import React from "react";
import PostDigitalProduct from "@/components/product/PostDigitalProduct";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const SellTabContent: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-1 lg:grid-cols-7 gap-3 sm:gap-4 md:gap-6">
      <div className="lg:col-span-5">
        <PostDigitalProduct />
      </div>
      <div className="lg:col-span-2">
        <Card className="p-3 sm:p-4">
          <h3 className="font-medium mb-3 text-sm sm:text-base">সেলার টিপস</h3>
          <ul className="space-y-2 text-xs sm:text-sm">
            <li className="flex items-start gap-2">
              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-[10px] sm:text-xs flex-shrink-0 mt-0.5">1</div>
              <span className="leading-tight">মানসম্পন্ন ছবি এবং বিবরণ ব্যবহার করুন</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-[10px] sm:text-xs flex-shrink-0 mt-0.5">2</div>
              <span className="leading-tight">সঠিক ক্যাটাগরি নির্বাচন করুন</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-[10px] sm:text-xs flex-shrink-0 mt-0.5">3</div>
              <span className="leading-tight">প্রতিযোগিতামূলক মূল্য নির্ধারণ করুন</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-[10px] sm:text-xs flex-shrink-0 mt-0.5">4</div>
              <span className="leading-tight">গ্রাহক রিভিউ এর জন্য উৎসাহিত করুন</span>
            </li>
          </ul>
          <Button 
            variant="outline" 
            className="w-full mt-4 text-xs sm:text-sm"
            onClick={() => navigate('/seller-dashboard')}
          >
            সেলার ড্যাশবোর্ড
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default SellTabContent;
