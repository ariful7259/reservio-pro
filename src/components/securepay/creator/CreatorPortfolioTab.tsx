
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Plus, 
  Image, 
  Edit, 
  Trash2, 
  Star, 
  Eye,
  Filter,
  Search
} from 'lucide-react';

const CreatorPortfolioTab = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const portfolioItems = [
    {
      id: 1,
      title: 'ই-কমার্স ওয়েবসাইট ডিজাইন',
      category: 'Web Design',
      client: 'টেক কোম্পানি লিমিটেড',
      rating: 5.0,
      reviews: 8,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
      tags: ['React', 'Modern', 'Responsive'],
      date: '২৫ ডিসেম্বর ২০২৪',
      status: 'published'
    },
    {
      id: 2,
      title: 'মোবাইল অ্যাপ UI/UX',
      category: 'App Design',
      client: 'স্টার্টআপ ভেঞ্চার',
      rating: 4.8,
      reviews: 12,
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop',
      tags: ['Mobile', 'UI/UX', 'Modern'],
      date: '২০ ডিসেম্বর ২০২৪',
      status: 'published'
    },
    {
      id: 3,
      title: 'কর্পোরেট ব্র্যান্ডিং',
      category: 'Branding',
      client: 'বিজনেস সলিউশন',
      rating: 4.9,
      reviews: 6,
      image: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=400&h=300&fit=crop',
      tags: ['Logo', 'Branding', 'Corporate'],
      date: '১৮ ডিসেম্বর ২০২৪',
      status: 'draft'
    }
  ];

  const categories = ['all', 'Web Design', 'App Design', 'Branding', 'Graphics'];

  const filteredItems = portfolioItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">পোর্টফোলিও</h2>
          <p className="text-muted-foreground">আপনার কাজের নমুনা পরিচালনা করুন</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          নতুন প্রজেক্ট যোগ করুন
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="প্রজেক্ট বা ক্লায়েন্ট খুঁজুন..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border rounded-lg"
          >
            <option value="all">সব ক্যাটাগরি</option>
            {categories.filter(cat => cat !== 'all').map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Portfolio Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative aspect-video">
              <img 
                src={item.image} 
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2">
                <Badge variant={item.status === 'published' ? 'default' : 'secondary'}>
                  {item.status === 'published' ? 'প্রকাশিত' : 'খসড়া'}
                </Badge>
              </div>
            </div>
            
            <CardContent className="p-4">
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold line-clamp-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.client}</p>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm ml-1">{item.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">({item.reviews} রিভিউ)</span>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {item.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-muted-foreground">{item.date}</span>
                  <div className="flex gap-1">
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add New Project Card */}
      <Card className="border-dashed">
        <CardContent className="p-8">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
              <Image className="h-8 w-8 text-muted-foreground" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">নতুন প্রজেক্ট যোগ করুন</h3>
              <p className="text-muted-foreground text-sm mb-4">
                আপনার কাজের নমুনা আপলোড করুন এবং ক্লায়েন্টদের আকর্ষণ করুন
              </p>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                প্রজেক্ট যোগ করুন
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">১৫</div>
            <div className="text-sm text-muted-foreground">মোট প্রজেক্ট</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">৪.৯</div>
            <div className="text-sm text-muted-foreground">গড় রেটিং</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">২৬</div>
            <div className="text-sm text-muted-foreground">মোট রিভিউ</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">১.২K</div>
            <div className="text-sm text-muted-foreground">ভিউ</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreatorPortfolioTab;
