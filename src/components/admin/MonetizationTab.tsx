
import React, { useState } from 'react';
import MonetizationDashboard from './MonetizationDashboard';
import { adminTheme } from '@/themes/adminTheme';
import { Card, CardContent } from '@/components/ui/card';
import { useTheme } from '@/components/ThemeProvider';
import MapView from '@/components/MapView';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Map, Navigation, Package, ShoppingCart, Clock, Truck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// সিমুলেটেড ডেলিভারি ডাটা (আসল অ্যাপে এটি API থেকে আসবে)
const mockActiveDeliveries = [
  {
    id: 'del-001',
    orderId: 'ORD-2024-001',
    type: 'marketplace',
    title: 'সাইক্লোন ব্লেন্ডার',
    providerName: 'টপটেক ইলেকট্রনিক্স',
    providerLocation: 'মিরপুর ১০, ঢাকা',
    customerLocation: 'উত্তরা, সেক্টর ৭, ঢাকা',
    status: 'প্রসেসিং',
    estimatedDelivery: '৪৫ মিনিট',
    providerLatitude: 23.8103,
    providerLongitude: 90.3650,
    customerLatitude: 23.8728,
    customerLongitude: 90.3905,
    currentLatitude: 23.8400,
    currentLongitude: 90.3750,
  },
  {
    id: 'del-002',
    orderId: 'ORD-2024-002',
    type: 'service',
    title: 'প্লাম্বিং সার্ভিস',
    providerName: 'রাকিব প্লাম্বার',
    providerLocation: 'মোহাম্মদপুর, ঢাকা',
    customerLocation: 'ধানমন্ডি, ঢাকা',
    status: 'অন দ্য ওয়ে',
    estimatedDelivery: '১৫ মিনিট',
    providerLatitude: 23.7660,
    providerLongitude: 90.3600,
    customerLatitude: 23.7461,
    customerLongitude: 90.3742,
    currentLatitude: 23.7560,
    currentLongitude: 90.3680,
  },
  {
    id: 'del-003',
    orderId: 'ORD-2024-003',
    type: 'rental',
    title: 'ডিএসএলআর ক্যামেরা',
    providerName: 'ক্যামেরা ওয়ার্ল্ড',
    providerLocation: 'গুলশান ২, ঢাকা',
    customerLocation: 'বনানী, ঢাকা',
    status: 'প্রস্তুতিমূলক',
    estimatedDelivery: '১ ঘন্টা ১০ মিনিট',
    providerLatitude: 23.7935,
    providerLongitude: 90.4125,
    customerLatitude: 23.7937,
    customerLongitude: 90.4065,
    currentLatitude: 23.7935,
    currentLongitude: 90.4125,
  }
];

// Container component for the monetization tab in the admin dashboard
const MonetizationTab = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const { toast } = useToast();
  const [activeDeliveryTab, setActiveDeliveryTab] = useState('marketplace');
  const [selectedDelivery, setSelectedDelivery] = useState(mockActiveDeliveries[0]);
  const [showDeliveryMap, setShowDeliveryMap] = useState(false);
  
  // ডেলিভারিটি ম্যাপে দেখানোর জন্য হ্যান্ডলার
  const handleTrackDelivery = (delivery) => {
    setSelectedDelivery(delivery);
    setShowDeliveryMap(true);
    toast({
      title: "ডেলিভারি ট্র্যাকিং শুরু হয়েছে",
      description: `${delivery.title} - ${delivery.status}`,
    });
  };
  
  // ফিল্টার করা ডেলিভারি লিস্ট
  const filteredDeliveries = mockActiveDeliveries.filter(
    delivery => activeDeliveryTab === 'all' || delivery.type === activeDeliveryTab
  );
  
  // ম্যাপ বন্ধ করার জন্য হ্যান্ডলার
  const handleCloseMap = () => {
    setShowDeliveryMap(false);
  };

  return (
    <div 
      className="p-6 rounded-lg transform transition-all duration-300 animate-fade-in"
      style={{ 
        backgroundColor: isDarkMode ? adminTheme.colors.dark.background : adminTheme.colors.background,
        boxShadow: 'inset 0 0 0 1px rgba(0, 0, 0, 0.05)',
      }}
    >
      <Card 
        className="overflow-hidden transition-all duration-300 card-hover-effect card-shimmer"
        style={{
          background: isDarkMode 
            ? `linear-gradient(135deg, ${adminTheme.colors.dark.surface} 0%, rgba(55, 65, 81, 0.8) 100%)` 
            : adminTheme.gradients.card.light,
          boxShadow: adminTheme.shadows.card,
          borderRadius: adminTheme.borderRadius.xl,
          border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.05)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = adminTheme.shadows.hover;
          e.currentTarget.style.transform = 'translateY(-3px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = adminTheme.shadows.card;
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        <div className="absolute top-0 left-0 w-full h-2" style={{ 
          background: adminTheme.gradients.primary,
          borderTopLeftRadius: adminTheme.borderRadius.xl,
          borderTopRightRadius: adminTheme.borderRadius.xl,
        }}></div>
        <CardContent className="p-0">
          {showDeliveryMap ? (
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium flex items-center">
                  <Map className="w-5 h-5 mr-2" />
                  ডেলিভারি ট্র্যাকিং
                </h3>
                <Button variant="outline" size="sm" onClick={handleCloseMap}>
                  ড্যাশবোর্ডে ফিরে যান
                </Button>
              </div>
              
              <div className="bg-card p-4 rounded-lg mb-4 border">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{selectedDelivery.title}</h4>
                    <p className="text-sm text-muted-foreground">অর্ডার আইডি: {selectedDelivery.orderId}</p>
                  </div>
                  <div className="flex items-center">
                    <div className={`px-3 py-1 rounded-full text-sm ${
                      selectedDelivery.status === 'অন দ্য ওয়ে' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                        : 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300'
                    }`}>
                      {selectedDelivery.status}
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">প্রভাইডার</p>
                    <p className="text-sm font-medium">{selectedDelivery.providerName}</p>
                    <p className="text-xs">{selectedDelivery.providerLocation}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">গ্রাহকের ঠিকানা</p>
                    <p className="text-sm">{selectedDelivery.customerLocation}</p>
                  </div>
                </div>
                
                <div className="mt-4 flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1 text-muted-foreground" />
                    <span>আনুমানিক সময়: {selectedDelivery.estimatedDelivery}</span>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs ${
                    selectedDelivery.type === 'marketplace' 
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                      : selectedDelivery.type === 'service'
                      ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
                      : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300'
                  }`}>
                    {selectedDelivery.type === 'marketplace' 
                      ? 'মার্কেটপ্লেস' 
                      : selectedDelivery.type === 'service' 
                      ? 'সার্ভিস' 
                      : 'রেন্টাল'}
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg overflow-hidden border">
                <MapView 
                  listings={[
                    {
                      id: 'provider',
                      title: selectedDelivery.providerName,
                      location: selectedDelivery.providerLocation,
                      latitude: selectedDelivery.providerLatitude,
                      longitude: selectedDelivery.providerLongitude,
                      type: 'provider'
                    },
                    {
                      id: 'customer',
                      title: 'গ্রাহকের অবস্থান',
                      location: selectedDelivery.customerLocation,
                      latitude: selectedDelivery.customerLatitude,
                      longitude: selectedDelivery.customerLongitude,
                      type: 'customer'
                    },
                    {
                      id: 'current',
                      title: 'বর্তমান অবস্থান',
                      location: 'পথে আছে',
                      latitude: selectedDelivery.currentLatitude,
                      longitude: selectedDelivery.currentLongitude,
                      type: 'delivery'
                    }
                  ]}
                  filterTypes={['customer', 'provider', 'delivery']}
                />
              </div>
            </div>
          ) : (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-medium">অ্যাডমিন ড্যাশবোর্ড</h3>
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2"
                  onClick={() => setShowDeliveryMap(true)}
                >
                  <Map className="h-4 w-4" />
                  <span>ডেলিভারি ট্র্যাকিং</span>
                </Button>
              </div>
              
              <Tabs defaultValue="dashboard" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="dashboard">ড্যাশবোর্ড</TabsTrigger>
                  <TabsTrigger value="deliveries">অ্যাক্টিভ ডেলিভারি</TabsTrigger>
                </TabsList>
                
                <TabsContent value="dashboard">
                  <div className="mt-4">
                    <MonetizationDashboard />
                  </div>
                </TabsContent>
                
                <TabsContent value="deliveries">
                  <div className="mt-4">
                    <div className="flex items-center gap-2 mb-4">
                      <Button 
                        variant={activeDeliveryTab === 'all' ? 'default' : 'outline'} 
                        size="sm"
                        onClick={() => setActiveDeliveryTab('all')}
                      >
                        সব
                      </Button>
                      <Button 
                        variant={activeDeliveryTab === 'marketplace' ? 'default' : 'outline'} 
                        size="sm"
                        onClick={() => setActiveDeliveryTab('marketplace')}
                      >
                        <ShoppingCart className="h-4 w-4 mr-1" />
                        মার্কেটপ্লেস
                      </Button>
                      <Button 
                        variant={activeDeliveryTab === 'service' ? 'default' : 'outline'} 
                        size="sm"
                        onClick={() => setActiveDeliveryTab('service')}
                      >
                        <Package className="h-4 w-4 mr-1" />
                        সার্ভিস
                      </Button>
                      <Button 
                        variant={activeDeliveryTab === 'rental' ? 'default' : 'outline'} 
                        size="sm"
                        onClick={() => setActiveDeliveryTab('rental')}
                      >
                        <Navigation className="h-4 w-4 mr-1" />
                        রেন্টাল
                      </Button>
                    </div>
                    
                    <div className="space-y-3">
                      {filteredDeliveries.length > 0 ? (
                        filteredDeliveries.map((delivery) => (
                          <div 
                            key={delivery.id} 
                            className="p-4 border rounded-lg bg-card hover:shadow-md transition-shadow flex justify-between items-center"
                          >
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-full ${
                                delivery.type === 'marketplace' 
                                  ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300' 
                                  : delivery.type === 'service'
                                  ? 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300'
                                  : 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900 dark:text-emerald-300'
                              }`}>
                                {delivery.type === 'marketplace' && <ShoppingCart className="h-5 w-5" />}
                                {delivery.type === 'service' && <Package className="h-5 w-5" />}
                                {delivery.type === 'rental' && <Navigation className="h-5 w-5" />}
                              </div>
                              <div>
                                <h4 className="font-medium">{delivery.title}</h4>
                                <div className="flex items-center gap-2">
                                  <p className="text-sm text-muted-foreground">{delivery.providerName}</p>
                                  <span className="text-xs text-muted-foreground">•</span>
                                  <p className="text-sm text-muted-foreground">{delivery.orderId}</p>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className={`px-3 py-1 rounded-full text-xs ${
                                delivery.status === 'অন দ্য ওয়ে' 
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                                  : 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300'
                              }`}>
                                {delivery.status}
                              </div>
                              <Button 
                                size="sm" 
                                variant="outline"
                                className="flex items-center gap-1"
                                onClick={() => handleTrackDelivery(delivery)}
                              >
                                <Truck className="h-3 w-3" />
                                <span>ট্র্যাক</span>
                              </Button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-6 text-muted-foreground">
                          <Truck className="w-12 h-12 mx-auto mb-2 opacity-20" />
                          <p>কোন অ্যাক্টিভ ডেলিভারি নেই</p>
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MonetizationTab;

