
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  List, 
  Eye, 
  Edit, 
  Trash2, 
  Search, 
  Filter, 
  Plus,
  MapPin,
  Calendar,
  Star,
  Share2,
  MoreVertical
} from 'lucide-react';

const ListingsSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const mockListings = [
    {
      id: 'L001',
      title: 'সুন্দর ৩ বেডরুম ফ্ল্যাট - ধানমন্ডি',
      type: 'rental',
      price: '৳৩৫,০০০/মাস',
      location: 'ধানমন্ডি, ঢাকা',
      status: 'active',
      views: 156,
      inquiries: 12,
      postedDate: '১৫ এপ্রিল, ২০২৫',
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
      rating: 4.5,
      verified: true
    },
    {
      id: 'L002',
      title: 'AC সার্ভিসিং সেবা',
      type: 'service',
      price: '৳১,৫০০',
      location: 'ঢাকা সিটি',
      status: 'paused',
      views: 89,
      inquiries: 5,
      postedDate: '১০ এপ্রিল, ২০২৫',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop',
      rating: 4.8,
      verified: true
    },
    {
      id: 'L003',
      title: 'স্মার্ট ওয়াচ বিক্রয়',
      type: 'product',
      price: '৳৫,৫০০',
      location: 'অনলাইন',
      status: 'sold',
      views: 234,
      inquiries: 18,
      postedDate: '৫ এপ্রিল, ২০২৫',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
      rating: 4.2,
      verified: false
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'sold': return 'bg-blue-100 text-blue-800';
      case 'expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'সক্রিয়';
      case 'paused': return 'বিরতি';
      case 'sold': return 'বিক্রিত';
      case 'expired': return 'মেয়াদ শেষ';
      default: return status;
    }
  };

  const filteredListings = mockListings.filter(listing => {
    const matchesSearch = listing.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' || listing.status === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">আমার লিস্টিংস</h2>
          <p className="text-muted-foreground">আপনার পোস্ট করা সকল লিস্টিং দেখুন ও ম্যানেজ করুন</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          নতুন লিস্টিং
        </Button>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="লিস্টিং খুঁজুন..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              ফিল্টার
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">সব ({mockListings.length})</TabsTrigger>
          <TabsTrigger value="active">সক্রিয় ({mockListings.filter(l => l.status === 'active').length})</TabsTrigger>
          <TabsTrigger value="paused">বিরতি ({mockListings.filter(l => l.status === 'paused').length})</TabsTrigger>
          <TabsTrigger value="sold">বিক্রিত ({mockListings.filter(l => l.status === 'sold').length})</TabsTrigger>
          <TabsTrigger value="expired">মেয়াদ শেষ ({mockListings.filter(l => l.status === 'expired').length})</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {filteredListings.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <List className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-4">কোন লিস্টিং পাওয়া যায়নি</p>
                <Button>নতুন লিস্টিং করুন</Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filteredListings.map((listing) => (
                <Card key={listing.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-0">
                    <div className="flex">
                      <div className="relative w-32 h-32 flex-shrink-0">
                        <img 
                          src={listing.image} 
                          alt={listing.title}
                          className="w-full h-full object-cover rounded-l-lg"
                        />
                        <div className="absolute top-2 left-2">
                          <Badge className={`${getStatusColor(listing.status)} text-xs`}>
                            {getStatusText(listing.status)}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex-1 p-4 space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold line-clamp-2 mb-1">{listing.title}</h3>
                            <p className="text-lg font-bold text-primary">{listing.price}</p>
                          </div>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="space-y-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <span>{listing.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>পোস্ট: {listing.postedDate}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                              <Eye className="h-4 w-4" />
                              {listing.views} ভিউ
                            </span>
                            <span>{listing.inquiries} অনুসন্ধান</span>
                            {listing.rating && (
                              <span className="flex items-center gap-1">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                {listing.rating}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex gap-2 pt-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            <Eye className="h-4 w-4 mr-2" />
                            দেখুন
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1">
                            <Edit className="h-4 w-4 mr-2" />
                            এডিট
                          </Button>
                          <Button variant="outline" size="sm">
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ListingsSection;
