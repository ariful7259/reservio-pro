
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Wrench, X } from 'lucide-react';
import ServiceHeader from '@/components/service/ServiceHeader';
import ServiceSearch from '@/components/service/ServiceSearch';
import ServiceTabs from '@/components/service/ServiceTabs';
import ServiceTable from '@/components/service/ServiceTable';
import ServiceForm from '@/components/service/ServiceForm';
import { useToast } from '@/components/ui/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';

const ServiceManagement = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [isAddServiceOpen, setIsAddServiceOpen] = useState(false);

  const mockServices = [
    { 
      id: 'S1001', 
      name: 'ইলেকট্রিক্যাল রিপেয়ার', 
      category: 'রিপেয়ার', 
      price: '১,৫০০', 
      duration: '২ ঘন্টা',
      status: 'active',
      rating: '4.7',
      bookings: '৮৭'
    },
    { 
      id: 'S1002', 
      name: 'প্লাম্বিং সার্ভিস', 
      category: 'রিপেয়ার', 
      price: '১,২০০', 
      duration: '১.৫ ঘন্টা',
      status: 'active',
      rating: '4.5',
      bookings: '৬৫'
    },
    { 
      id: 'S1003', 
      name: 'হোম ক্লিনিং', 
      category: 'ক্লিনিং', 
      price: '২,৫০০', 
      duration: '৪ ঘন্টা',
      status: 'active',
      rating: '4.8',
      bookings: '১১০'
    },
    { 
      id: 'S1004', 
      name: 'এয়ার কন্ডিশনার সার্ভিসিং', 
      category: 'রিপেয়ার', 
      price: '১,৮০০', 
      duration: '২ ঘন্টা',
      status: 'paused',
      rating: '4.6',
      bookings: '৭৫'
    },
    { 
      id: 'S1005', 
      name: 'লন কেয়ার', 
      category: 'গার্ডেনিং', 
      price: '১,০০০', 
      duration: '৩ ঘন্টা',
      status: 'paused',
      rating: '4.3',
      bookings: '৪২'
    },
    { 
      id: 'S1006', 
      name: 'ফার্নিচার রিপেয়ার', 
      category: 'রিপেয়ার', 
      price: '২,২০০', 
      duration: '৩ ঘন্টা',
      status: 'draft',
      rating: '-',
      bookings: '০'
    }
  ];

  const filteredServices = mockServices.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         service.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'active') return matchesSearch && service.status === 'active';
    if (activeTab === 'paused') return matchesSearch && service.status === 'paused';
    if (activeTab === 'draft') return matchesSearch && service.status === 'draft';
    
    return false;
  });

  const handleAddService = () => {
    setIsAddServiceOpen(true);
  };

  const handleCloseDialog = () => {
    setIsAddServiceOpen(false);
  };

  const handleFormSubmit = (values: any) => {
    console.log(values);
    toast({
      title: "সার্ভিস যোগ করা হয়েছে",
      description: `${values.name} সার্ভিসটি সফলভাবে যোগ করা হয়েছে`,
    });
    setIsAddServiceOpen(false);
  };

  return (
    <div className="space-y-6">
      <ServiceHeader onAddService={handleAddService} />

      <div className="space-y-4">
        <ServiceSearch 
          searchTerm={searchTerm} 
          onSearchChange={setSearchTerm} 
        />

        <ServiceTabs
          activeTab={activeTab}
          onChange={setActiveTab}
          totalServices={mockServices.length}
          activeCount={mockServices.filter(p => p.status === 'active').length}
          pausedCount={mockServices.filter(p => p.status === 'paused').length}
          draftCount={mockServices.filter(p => p.status === 'draft').length}
        >
          <ServiceTable services={filteredServices} />
        </ServiceTabs>
      </div>

      <Dialog open={isAddServiceOpen} onOpenChange={setIsAddServiceOpen}>
        <DialogContent className={`sm:max-w-[500px] ${isMobile ? 'p-4' : ''}`}>
          <DialogHeader className="space-y-2">
            <DialogTitle>নতুন সার্ভিস যোগ করুন</DialogTitle>
            <DialogDescription>
              আপনার নতুন সেবার বিবরণ দিন। সবগুলো তথ্য পূরণ করুন।
            </DialogDescription>
          </DialogHeader>
          <ServiceForm onSubmit={handleFormSubmit} onCancel={handleCloseDialog} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ServiceManagement;
