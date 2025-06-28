
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
  Video,
  Wrench
} from 'lucide-react';

const AppointmentsSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('upcoming');

  const mockAppointments = [
    {
      id: 'APT001',
      serviceName: 'AC সার্ভিসিং',
      providerName: 'টেক সার্ভিস প্রো',
      date: '৩০ এপ্রিল, ২০২৫',
      time: '১০:০০ AM - ১২:০০ PM',
      duration: '২ ঘন্টা',
      amount: '৳১,৫০০',
      status: 'confirmed',
      location: 'আপনার ঠিকানায়',
      phone: '০১৭১২-৩৪৫৬৭৮',
      type: 'home-service',
      appointmentType: 'on-site'
    },
    {
      id: 'APT002', 
      serviceName: 'ওয়েব ডিজাইন কনসালটেশন',
      providerName: 'ডিজিটাল এক্সপার্ট',
      date: '২৯ এপ্রিল, ২০২৫',
      time: '২:০০ PM - ৩:০০ PM',
      duration: '১ ঘন্টা',
      amount: '৳২,০০০',
      status: 'pending',
      location: 'অনলাইন মিটিং',
      phone: '০১৮৯৮-৭৬৫৪৩২',
      type: 'consultation',
      appointmentType: 'online'
    },
    {
      id: 'APT003',
      serviceName: 'কার মেরামত',
      providerName: 'অটো কেয়ার সেন্টার',
      date: '২৫ এপ্রিল, ২০২৫',
      time: '৯:০০ AM - ১১:০০ AM',
      duration: '২ ঘন্টা',
      amount: '৳৩,৫০০',
      status: 'completed',
      location: 'সার্ভিস সেন্টার',
      phone: '০১৫৫৫-১২৩৪৫৬',
      type: 'repair',
      appointmentType: 'center'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed': return 'কনফার্মড';
      case 'pending': return 'অপেক্ষমাণ';
      case 'completed': return 'সম্পন্ন';
      case 'cancelled': return 'বাতিল';
      default: return status;
    }
  };

  const getAppointmentIcon = (type: string) => {
    switch (type) {
      case 'online': return <Video className="h-4 w-4" />;
      case 'on-site': return <MapPin className="h-4 w-4" />;
      case 'center': return <Wrench className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };

  const filterAppointments = () => {
    const filtered = mockAppointments.filter(appointment => {
      const matchesSearch = appointment.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           appointment.providerName.toLowerCase().includes(searchTerm.toLowerCase());
      
      const now = new Date();
      const appointmentDate = new Date(); // In real app, parse appointment.date
      
      switch (activeTab) {
        case 'upcoming':
          return matchesSearch && appointment.status !== 'completed' && appointment.status !== 'cancelled';
        case 'completed':
          return matchesSearch && appointment.status === 'completed';
        case 'cancelled':
          return matchesSearch && appointment.status === 'cancelled';
        default:
          return matchesSearch;
      }
    });
    return filtered;
  };

  const filteredAppointments = filterAppointments();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">আমার অ্যাপয়েন্টমেন্টস</h2>
          <p className="text-muted-foreground">আপনার সকল সার্ভিস অ্যাপয়েন্টমেন্ট দেখুন ও ম্যানেজ করুন</p>
        </div>
        <Button>
          <Calendar className="h-4 w-4 mr-2" />
          নতুন অ্যাপয়েন্টমেন্ট
        </Button>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="সার্ভিস বা প্রোভাইডার খুঁজুন..."
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
          <TabsTrigger value="all">সব ({mockAppointments.length})</TabsTrigger>
          <TabsTrigger value="upcoming">আসন্ন ({mockAppointments.filter(a => a.status !== 'completed' && a.status !== 'cancelled').length})</TabsTrigger>
          <TabsTrigger value="completed">সম্পন্ন ({mockAppointments.filter(a => a.status === 'completed').length})</TabsTrigger>
          <TabsTrigger value="cancelled">বাতিল ({mockAppointments.filter(a => a.status === 'cancelled').length})</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {filteredAppointments.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-4">কোন অ্যাপয়েন্টমেন্ট পাওয়া যায়নি</p>
                <Button>নতুন অ্যাপয়েন্টমেন্ট বুক করুন</Button>
              </CardContent>
            </Card>
          ) : (
            filteredAppointments.map((appointment) => (
              <Card key={appointment.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                        <h3 className="font-semibold text-lg">{appointment.serviceName}</h3>
                        <Badge className={`${getStatusColor(appointment.status)} w-fit`}>
                          {getStatusText(appointment.status)}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          <span>প্রোভাইডার: {appointment.providerName}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          <span>{appointment.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {getAppointmentIcon(appointment.appointmentType)}
                          <span>{appointment.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>সময়কাল: {appointment.duration}</span>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2 text-sm">
                        <div className="flex items-center gap-2 font-medium">
                          <Calendar className="h-4 w-4" />
                          <span>{appointment.date} - {appointment.time}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col lg:items-end gap-3">
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">{appointment.amount}</p>
                        <p className="text-sm text-muted-foreground">সার্ভিস ফি</p>
                      </div>
                      <div className="flex flex-row lg:flex-col gap-2">
                        {appointment.appointmentType === 'online' && appointment.status === 'confirmed' && (
                          <Button size="sm" className="flex-1 lg:flex-none">
                            <Video className="h-4 w-4 mr-2" />
                            জয়েন মিটিং
                          </Button>
                        )}
                        <Button variant="outline" size="sm" className="flex-1 lg:flex-none">
                          বিস্তারিত
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

export default AppointmentsSection;
