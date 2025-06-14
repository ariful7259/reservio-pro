
import React, { useState } from "react";
import { Package, Wrench, Camera, Plus, Edit, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface RentItem {
  id: string;
  name: string;
  category: 'service' | 'product' | 'digital';
  price: number;
  duration: string;
  description: string;
  isActive: boolean;
  totalEarnings: number;
  rentCount: number;
}

export const ServiceProductRent: React.FC = () => {
  const [rentItems] = useState<RentItem[]>([
    {
      id: "1",
      name: "ক্যামেরা ভাড়া",
      category: 'product',
      price: 500,
      duration: "দিন",
      description: "DSLR ক্যামেরা ভাড়া দেওয়া হয়",
      isActive: true,
      totalEarnings: 3500,
      rentCount: 7
    },
    {
      id: "2",
      name: "গ্রাফিক ডিজাইন",
      category: 'service',
      price: 800,
      duration: "প্রজেক্ট",
      description: "লোগো ও পোস্টার ডিজাইন",
      isActive: true,
      totalEarnings: 5600,
      rentCount: 7
    },
    {
      id: "3",
      name: "প্রোগ্রামিং কোর্স",
      category: 'digital',
      price: 1200,
      duration: "মাস",
      description: "Python প্রোগ্রামিং শেখার কোর্স",
      isActive: false,
      totalEarnings: 2400,
      rentCount: 2
    }
  ]);

  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'service': return <Wrench className="h-4 w-4" />;
      case 'product': return <Package className="h-4 w-4" />;
      case 'digital': return <Camera className="h-4 w-4" />;
      default: return <Package className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'service': return 'text-amber-600 bg-amber-100';
      case 'product': return 'text-blue-600 bg-blue-100';
      case 'digital': return 'text-pink-600 bg-pink-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getCategoryText = (category: string) => {
    switch(category) {
      case 'service': return 'সার্ভিস';
      case 'product': return 'প্রোডাক্ট';
      case 'digital': return 'ডিজিটাল';
      default: return 'অন্যান্য';
    }
  };

  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center gap-2 mb-4">
        <Package className="h-6 w-6 text-purple-500" />
        <h2 className="text-xl font-bold text-purple-700">Service / Product Rent</h2>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-3 text-center">
            <div className="text-2xl font-bold text-green-700">৳{rentItems.reduce((sum, item) => sum + item.totalEarnings, 0).toLocaleString()}</div>
            <div className="text-sm text-green-600">মোট আয়</div>
          </CardContent>
        </Card>
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-3 text-center">
            <div className="text-2xl font-bold text-blue-700">{rentItems.filter(item => item.isActive).length}</div>
            <div className="text-sm text-blue-600">সক্রিয় আইটেম</div>
          </CardContent>
        </Card>
        <Card className="bg-orange-50 border-orange-200">
          <CardContent className="p-3 text-center">
            <div className="text-2xl font-bold text-orange-700">{rentItems.reduce((sum, item) => sum + item.rentCount, 0)}</div>
            <div className="text-sm text-orange-600">মোট রেন্ট</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="active">সক্রিয় আইটেম</TabsTrigger>
          <TabsTrigger value="all">সব আইটেম</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4 mt-4">
          <div className="grid gap-4">
            {rentItems
              .filter(item => item.isActive)
              .map(item => (
                <Card key={item.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <Badge className={getCategoryColor(item.category)}>
                          {getCategoryIcon(item.category)}
                          <span className="ml-1">{getCategoryText(item.category)}</span>
                        </Badge>
                        <CardTitle className="text-lg">{item.name}</CardTitle>
                      </div>
                      <Badge className="bg-green-100 text-green-700">
                        ৳{item.price}/{item.duration}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-3">{item.description}</p>
                    
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div className="bg-gray-50 rounded-lg p-2 text-center">
                        <div className="font-semibold text-gray-800">৳{item.totalEarnings.toLocaleString()}</div>
                        <div className="text-xs text-gray-600">মোট আয়</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-2 text-center">
                        <div className="font-semibold text-gray-800">{item.rentCount}বার</div>
                        <div className="text-xs text-gray-600">ভাড়া দেওয়া</div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Edit className="h-3 w-3 mr-1" />
                        এডিট
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Eye className="h-3 w-3 mr-1" />
                        ভিউ
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="all" className="space-y-4 mt-4">
          <div className="grid gap-4">
            {rentItems.map(item => (
              <Card key={item.id} className={`hover:shadow-md transition-shadow ${!item.isActive ? 'opacity-60' : ''}`}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <Badge className={getCategoryColor(item.category)}>
                        {getCategoryIcon(item.category)}
                        <span className="ml-1">{getCategoryText(item.category)}</span>
                      </Badge>
                      <CardTitle className="text-lg">{item.name}</CardTitle>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-100 text-green-700">
                        ৳{item.price}/{item.duration}
                      </Badge>
                      {!item.isActive && (
                        <Badge variant="secondary">নিষ্ক্রিয়</Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-3">{item.description}</p>
                  <div className="text-sm text-gray-500">
                    মোট আয়: ৳{item.totalEarnings.toLocaleString()} • {item.rentCount} বার ভাড়া
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Add New Item */}
      <Button className="w-full" variant="outline">
        <Plus className="h-4 w-4 mr-2" />
        নতুন Service/Product যোগ করুন
      </Button>
    </div>
  );
};
