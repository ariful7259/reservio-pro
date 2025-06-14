
import React, { useState } from "react";
import { ListChecks, Clock, Target, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  targetDays: number;
  earnedAmount: number;
  isActive: boolean;
}

export const WishlistGoalSystem: React.FC = () => {
  const [wishlistItems] = useState<WishlistItem[]>([
    {
      id: "1",
      name: "নতুন মোবাইল ফোন",
      price: 25000,
      targetDays: 30,
      earnedAmount: 12500,
      isActive: true
    },
    {
      id: "2", 
      name: "ল্যাপটপ",
      price: 45000,
      targetDays: 60,
      earnedAmount: 8000,
      isActive: false
    }
  ]);

  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center gap-2 mb-4">
        <ListChecks className="h-6 w-6 text-blue-500" />
        <h2 className="text-xl font-bold text-blue-700">Wishlist Goal System</h2>
      </div>

      {/* Active Wishlist Item */}
      {wishlistItems.filter(item => item.isActive).map(item => (
        <Card key={item.id} className="border-blue-200 bg-gradient-to-r from-blue-50 to-white">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg text-blue-800">{item.name}</CardTitle>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                    <Target className="h-3 w-3 mr-1" />
                    ৳{item.price.toLocaleString()}
                  </Badge>
                  <Badge variant="outline" className="text-orange-600 border-orange-200">
                    <Clock className="h-3 w-3 mr-1" />
                    {item.targetDays} দিন
                  </Badge>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-700">Active</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>অর্জিত: ৳{item.earnedAmount.toLocaleString()}</span>
                  <span>বাকি: ৳{(item.price - item.earnedAmount).toLocaleString()}</span>
                </div>
                <Progress value={(item.earnedAmount / item.price) * 100} className="h-3" />
                <div className="text-center mt-1">
                  <span className="text-sm font-semibold text-blue-600">
                    {Math.round((item.earnedAmount / item.price) * 100)}% সম্পন্ন
                  </span>
                </div>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-3">
                <h4 className="font-semibold text-blue-800 mb-2">Task সুপারিশ:</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• ৩টি রেফারেল = ৳৫০০</li>
                  <li>• ভিডিও শেয়ার ১০টি = ৳২০০</li>
                  <li>• ডেলিভারি সার্ভিস = ৳৮০০</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Inactive Wishlist Items */}
      <div className="space-y-2">
        <h3 className="font-semibold text-gray-700">আপনার Wishlist:</h3>
        {wishlistItems.filter(item => !item.isActive).map(item => (
          <Card key={item.id} className="border-gray-200 bg-gray-50">
            <CardContent className="p-3">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium text-gray-800">{item.name}</h4>
                  <p className="text-sm text-gray-600">৳{item.price.toLocaleString()} • {item.targetDays} দিন</p>
                </div>
                <Button size="sm" variant="outline">
                  সক্রিয় করুন
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add New Wishlist Item */}
      <Button className="w-full" variant="outline">
        <Plus className="h-4 w-4 mr-2" />
        নতুন Wishlist যোগ করুন
      </Button>
    </div>
  );
};
