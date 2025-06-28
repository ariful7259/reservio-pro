
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MessageSquare, 
  Phone, 
  MapPin, 
  User, 
  Calendar, 
  Clock, 
  CheckCircle,
  Search,
  Filter,
  Eye,
  Heart,
  Star
} from 'lucide-react';

const ContactedPropertiesSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const mockContactedProperties = [
    {
      id: 'CP001',
      propertyName: 'লাক্সারি ৩ বেডরুম ফ্ল্যাট',
      ownerName: 'মোহাম্মদ করিম',
      phone: '০১৭১২-৩৪৫৬১১',
      email: 'karim@example.com',
      contactDate: '২৮ এপ্রিল, ২০২৫',
      lastContact: '২৮ এপ্রিল, ২০২৫ - ১০:৩০ AM',
      rent: '৳৩৫,০০০/মাস',
      location: 'ধানমন্ডি, ঢাকা',
      status: 'interested',
      responseStatus: 'responded',
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
      messages: 5
    },
    {
      id: 'CP002',
      propertyName: 'সাবলেট রুম - গুলশান',
      ownerName: 'ফাতিমা বেগম',
      phone: '০১৮৯৮-৭৬৫৪৩২',
      email: 'fatima@example.com',
      contactDate: '২৬ এপ্রিল, ২০২৫',
      lastContact: '২৭ এপ্রিল, ২০২৫ - ৩:১৫ PM',
      rent: '৳১৮,০০০/মাস',
      location: 'গুলশান-২, ঢাকা',
      status: 'visited',
      responseStatus: 'responded',
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop',
      messages: 12
    },
    {
      id: 'CP003',
      propertyName: 'মেস সিট - উত্তরা',
      ownerName: 'আব্দুল রহমান',
      phone: '০১৫৫৫-১২৩৪৫৬',
      email: 'rahman@example.com',
      contactDate: '২৪ এপ্রিল, ২০২৫',
      lastContact: '২৪ এপ্রিল, ২০২৫ - ৬:০০ PM',
      rent: '৳১০,০০০/মাস',
      location: 'উত্তরা সেক্টর-৭, ঢাকা',
      status: 'pending',
      responseStatus: 'no_response',
      image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&h=300&fit=crop',
      messages: 1
    },
    {
      id: 'CP004',
      propertyName: 'ব্যাচেলর ফ্ল্যাট - বনানী',
      ownerName: 'নাসির আহমেদ',
      phone: '০১৯৯৯-৮৮৭৭৬৬',
      email: 'nasir@example.com',
      contactDate: '২২ এপ্রিল, ২০২৫',
      lastContact: '২৩ এপ্রিল, ২০২৫ - ১১:০০ AM',
      rent: '৳২৫,০০০/মাস',
      location: 'বনানী, ঢাকা',
      status: 'not_interested',
      responseStatus: 'responded',
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop',
      messages: 3
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'interested': return 'bg-green-100 text-green-800';
      case 'visited': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'not_interested': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'interested': return 'আগ্রহী';
      case 'visited': return 'ভিজিট করেছি';
      case 'pending': return 'অপেক্ষমাণ';
      case 'not_interested': return 'আগ্রহী নই';
      default: return status;
    }
  };

  const getResponseStatusColor = (status: string) => {
    switch (status) {
      case 'responded': return 'text-green-600';
      case 'no_response': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getResponseStatusText = (status: string) => {
    switch (status) {
      case 'responded': return 'জবাব দিয়েছেন';
      case 'no_response': return 'জবাব দেননি';
      default: return status;
    }
  };

  const filteredProperties = mockContactedProperties.filter(property => {
    const matchesSearch = property.propertyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    switch (activeTab) {
      case 'responded':
        return matchesSearch && property.responseStatus === 'responded';
      case 'no_response':
        return matchesSearch && property.responseStatus === 'no_response';
      case 'interested':
        return matchesSearch && property.status === 'interested';
      default:
        return matchesSearch;
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">যোগাযোগকৃত প্রোপার্টি</h2>
          <p className="text-muted-foreground">আপনি যেসব প্রোপার্টির সাথে যোগাযোগ করেছেন তার তালিকা</p>
        </div>
        <Button>
          <MessageSquare className="h-4 w-4 mr-2" />
          নতুন যোগাযোগ
        </Button>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="প্রোপার্টি বা মালিকের নাম খুঁজুন..."
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
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">সব ({mockContactedProperties.length})</TabsTrigger>
          <TabsTrigger value="responded">জবাব পেয়েছি ({mockContactedProperties.filter(p => p.responseStatus === 'responded').length})</TabsTrigger>
          <TabsTrigger value="no_response">জবাব পাইনি ({mockContactedProperties.filter(p => p.responseStatus === 'no_response').length})</TabsTrigger>
          <TabsTrigger value="interested">আগ্রহী ({mockContactedProperties.filter(p => p.status === 'interested').length})</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {filteredProperties.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-4">কোন যোগাযোগকৃত প্রোপার্টি পাওয়া যায়নি</p>
                <Button>প্রোপার্টি খুঁজুন</Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filteredProperties.map((property) => (
                <Card key={property.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-0">
                    <div className="flex">
                      <div className="relative w-32 h-32 flex-shrink-0">
                        <img 
                          src={property.image} 
                          alt={property.propertyName}
                          className="w-full h-full object-cover rounded-l-lg"
                        />
                        <div className="absolute top-2 right-2">
                          <Badge className={`${getStatusColor(property.status)} text-xs`}>
                            {getStatusText(property.status)}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex-1 p-4 space-y-3">
                        <div>
                          <h3 className="font-semibold line-clamp-2">{property.propertyName}</h3>
                          <p className="text-lg font-bold text-primary">{property.rent}</p>
                        </div>

                        <div className="space-y-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            <span>{property.ownerName}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4" />
                            <span>{property.phone}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <span>{property.location}</span>
                          </div>
                        </div>

                        <div className="space-y-1 text-xs">
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">প্রথম যোগাযোগ:</span>
                            <span>{property.contactDate}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">শেষ যোগাযোগ:</span>
                            <span>{property.lastContact}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">স্ট্যাটাস:</span>
                            <span className={getResponseStatusColor(property.responseStatus)}>
                              {getResponseStatusText(property.responseStatus)}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MessageSquare className="h-4 w-4" />
                            <span>{property.messages} মেসেজ</span>
                          </div>
                          <div className="flex gap-1">
                            <Button variant="outline" size="sm">
                              <Phone className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <MessageSquare className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
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

export default ContactedPropertiesSection;
