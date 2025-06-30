
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Home, 
  ShoppingBag, 
  Car, 
  Wrench,
  Building,
  Laptop,
  ArrowRight
} from 'lucide-react';

const categories = [
  { id: 'housing', name: 'বাসা বাড়ি', icon: Home, count: '৮৯২+', color: 'bg-blue-500' },
  { id: 'electronics', name: 'ইলেকট্রনিক্স', icon: Laptop, count: '৩২৪+', color: 'bg-green-500' },
  { id: 'transport', name: 'পরিবহন', icon: Car, count: '১৭৮+', color: 'bg-red-500' },
  { id: 'tools', name: 'কারিগরি টুলস', icon: Wrench, count: '৯৬+', color: 'bg-yellow-500' },
  { id: 'business', name: 'ব্যবসায়িক', icon: Building, count: '৮৬+', color: 'bg-purple-500' },
  { id: 'shopping', name: 'শপিং', icon: ShoppingBag, count: '২৫০+', color: 'bg-pink-500' }
];

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            স্বাগতম আমাদের রেন্ট প্ল্যাটফর্মে
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            যা প্রয়োজন তা ভাড়া নিন। বাসা থেকে গাড়ি, ইলেকট্রনিক্স থেকে বিজনেস ইকুইপমেন্ট - সব কিছুই।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {categories.map((category) => (
            <Card 
              key={category.id}
              className="hover:shadow-lg transition-all cursor-pointer group"
              onClick={() => navigate('/rentals')}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-lg ${category.color} text-white`}>
                    <category.icon className="h-6 w-6" />
                  </div>
                  <Badge variant="secondary">{category.count}</Badge>
                </div>
                <CardTitle className="text-xl">{category.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <Button className="w-full group-hover:bg-primary/90" onClick={(e) => {
                  e.stopPropagation();
                  navigate('/rentals');
                }}>
                  ব্রাউজ করুন
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button 
            size="lg" 
            className="text-lg px-8 py-3"
            onClick={() => navigate('/rental-categories')}
          >
            সকল ক্যাটাগরি দেখুন
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
