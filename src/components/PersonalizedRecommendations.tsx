
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';
import { useAuth } from '@/hooks/useAuth';

interface RecommendationItem {
  id: string;
  title: string;
  category: string;
  image: string;
  type: 'service' | 'product' | 'rental';
}

interface PersonalizedRecommendationsProps {
  maxItems?: number;
}

const PersonalizedRecommendations: React.FC<PersonalizedRecommendationsProps> = ({ maxItems = 6 }) => {
  const navigate = useNavigate();
  const { language } = useApp();
  const { user, isAuthenticated } = useAuth();
  
  // Mock recommendations based on user interests and behavior
  const mockRecommendations: RecommendationItem[] = [
    {
      id: '1',
      title: 'প্রফেশনাল হাউস ক্লিনিং',
      category: 'সার্ভিস',
      image: 'https://i.pravatar.cc/150?img=32',
      type: 'service'
    },
    {
      id: '2',
      title: 'স্মার্ট হোম ডিভাইস',
      category: 'প্রোডাক্ট',
      image: 'https://i.pravatar.cc/150?img=33',
      type: 'product'
    },
    {
      id: '3',
      title: 'কোয়ার্কিং স্পেস - গুলশান',
      category: 'রেন্টাল',
      image: 'https://i.pravatar.cc/150?img=34',
      type: 'rental'
    },
    {
      id: '4',
      title: 'মোবাইল রিপেয়ার',
      category: 'সার্ভিস',
      image: 'https://i.pravatar.cc/150?img=35',
      type: 'service'
    },
    {
      id: '5',
      title: 'প্রিমিয়াম লাইফস্টাইল প্রোডাক্ট',
      category: 'প্রোডাক্ট',
      image: 'https://i.pravatar.cc/150?img=36',
      type: 'product'
    },
    {
      id: '6',
      title: 'লাক্সারি কার রেন্টাল',
      category: 'রেন্টাল',
      image: 'https://i.pravatar.cc/150?img=37',
      type: 'rental'
    },
    {
      id: '7',
      title: 'ডিজিটাল মার্কেটিং সার্ভিস',
      category: 'সার্ভিস',
      image: 'https://i.pravatar.cc/150?img=38',
      type: 'service'
    },
    {
      id: '8',
      title: 'স্পোর্টস ইকুইপমেন্ট',
      category: 'প্রোডাক্ট',
      image: 'https://i.pravatar.cc/150?img=39',
      type: 'product'
    }
  ];
  
  // Filter to show limited items
  const recommendations = mockRecommendations.slice(0, maxItems);
  
  const handleItemClick = (item: RecommendationItem) => {
    switch(item.type) {
      case 'service':
        navigate(`/services/${item.id}`);
        break;
      case 'product':
        navigate(`/shopping/product/${item.id}`);
        break;
      case 'rental':
        navigate(`/rent-anything/?item=${item.id}`);
        break;
    }
  };
  
  if (!isAuthenticated) return null;
  
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">
            {language === 'bn' ? 'আপনার জন্য পারসোনালাইজড' : 'Personalized for You'}
          </h2>
        </div>
        <Button variant="ghost" size="sm" className="text-sm" onClick={() => navigate('/recommendations')}>
          {language === 'bn' ? 'সবগুলো দেখুন' : 'See All'} <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {recommendations.map((item) => (
          <Card 
            key={item.id} 
            className="cursor-pointer hover:bg-gray-50 transition-colors overflow-hidden"
            onClick={() => handleItemClick(item)}
          >
            <div className="h-24 bg-gray-200 relative">
              <div className="absolute inset-0 bg-center bg-cover" style={{ backgroundImage: `url(${item.image})` }}></div>
              <div className="absolute top-2 left-2">
                <span className="px-2 py-1 bg-black/60 text-white text-xs rounded-full">{item.category}</span>
              </div>
            </div>
            <CardContent className="p-3">
              <h3 className="font-medium text-sm line-clamp-2">{item.title}</h3>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PersonalizedRecommendations;
