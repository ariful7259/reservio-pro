
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Phone, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Search,
  Filter,
  Eye,
  MessageSquare
} from 'lucide-react';

const BookingsSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const mockBookings = [
    {
      id: 'BK001',
      propertyName: 'দ্বিতল বাসা - ধানমন্ডি',
      ownerName: 'মোহাম্মদ আলী',
      bookingDate: '২৮ এপ্রিল, ২০২৫',
      checkIn: '১ মে, ২০২৫',
      checkOut: '৩১ মে, ২০২৫',
      amount: '৳২৫,০০০',
      status: 'confirmed',
      location: 'ধানমন্ডি, ঢাকা',
      phone: '০১৭১২-৩৪৫৬৭৮',
      type: 'rental'
    },
    {
      id: 'BK002',
      propertyName: 'ব্যাচেলর রুম - গুলশান',
      ownerName: 'ফাতিমা খাতুন',
      bookingDate: '২৫ এপ্রিল, ২০২৫',
      checkIn: '১৫ মে, ২০২৫',
      checkOut: '১৫ জুন, ২০২৫',
      amount: '৳১৫,০০০',
      status: 'pending',
      location: 'গুলশান, ঢাকা',
      phone: '০১৮৯৮-৭৬৫৪৩২',
      type: 'rental'
    },
    {
      id: 'BK003',
      propertyName: 'মেস সিট - উত্তরা',
      ownerName: 'রহিম উদ্দিন',
      bookingDate: '২০ এপ্রিল, ২০২৫',
      checkIn: '১ মে, ২০২৫',
      checkOut: '৩১ জুলাই, ২০২৫',
      amount: '৳৯,০০০',
      status: 'cancelled',
      location: 'উত্তরা, ঢাকা',
      phone: '০১৫৫৫-১২৩৪৫৬',
      type: 'mess'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'cancelled': return <XCircle className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed': return 'কনফার্মড';
      case 'pending': return 'অপেক্ষমাণ';
      case 'cancelled': return 'বাতিল';
      default: return status;
    }
  };

  const filteredBookings = mockBookings.filter(booking => {
    const matchesSearch = booking.propertyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.ownerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' || booking.status === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">আমার বুকিংস</h2>
          <p className="text-muted-foreground">আপনার সকল প্রপার্টি বুকিং দেখুন ও ম্যানেজ করুন</p>
        </div>
        <Button>
          <Calendar className="h-4 w-4 mr-2" />
          নতুন বুকিং
        </Button>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="প্রপার্টি বা মালিকের নাম খুঁজুন..."
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
          <TabsTrigger value="all">সব ({mockBookings.length})</TabsTrigger>
          <TabsTrigger value="confirmed">কনফার্মড ({mockBookings.filter(b => b.status === 'confirmed').length})</TabsTrigger>
          <TabsTrigger value="pending">অপেক্ষমাণ ({mockBookings.filter(b => b.status === 'pending').length})</TabsTrigger>
          <TabsTrigger value="cancelled">বাতিল ({mockBookings.filter(b => b.status === 'cancelled').length})</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {filteredBookings.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-4">কোন বুকিং পাওয়া যায়নি</p>
                <Button>নতুন বুকিং করুন</Button>
              </CardContent>
            </Card>
          ) : (
            filteredBookings.map((booking) => (
              <Card key={booking.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                        <h3 className="font-semibold text-lg">{booking.propertyName}</h3>
                        <Badge className={`${getStatusColor(booking.status)} w-fit`}>
                          <span className="flex items-center gap-1">
                            {getStatusIcon(booking.status)}
                            {getStatusText(booking.status)}
                          </span>
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          <span>মালিক: {booking.ownerName}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          <span>{booking.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span>{booking.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>বুকিং: {booking.bookingDate}</span>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2 text-sm">
                        <div className="flex items-center gap-2 text-green-600">
                          <span>চেক-ইন: {booking.checkIn}</span>
                        </div>
                        <div className="flex items-center gap-2 text-red-600">
                          <span>চেক-আউট: {booking.checkOut}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col lg:items-end gap-3">
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">{booking.amount}</p>
                        <p className="text-sm text-muted-foreground">মোট খরচ</p>
                      </div>
                      <div className="flex flex-row lg:flex-col gap-2">
                        <Button variant="outline" size="sm" className="flex-1 lg:flex-none">
                          <Eye className="h-4 w-4 mr-2" />
                          বিস্তারিত
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1 lg:flex-none">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          মেসেজ
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BookingsSection;
