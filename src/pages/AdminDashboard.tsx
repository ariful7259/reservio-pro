import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import UserManagement from '@/components/admin/UserManagement';
import MarketplaceManagement from '@/components/admin/MarketplaceManagement';
import RentalManagement from '@/components/admin/RentalManagement';
import CategoryManagement from '@/components/admin/CategoryManagement';
import AdvancedFeatures from '@/components/admin/AdvancedFeatures';
import ServiceManagement from '@/components/admin/ServiceManagement';
import DigitalContentManagement from '@/components/admin/DigitalContentManagement';
import PaymentManagement from '@/components/admin/PaymentManagement';
import ReportManagement from '@/components/admin/ReportManagement';
import Analytics from '@/components/admin/Analytics';
import SupportTicket from '@/components/admin/SupportTicket';
import Settings from '@/components/admin/Settings';
import MonetizationTab from '@/components/admin/MonetizationTab';
import { 
  BarChart3, 
  Users, 
  ShoppingBag, 
  Layers, 
  Settings as SettingsIcon, 
  Bell, 
  Package, 
  FileText, 
  UserCog, 
  Building,
  Banknote,
  ShieldCheck,
  Tag,
  BarChart,
  MessageSquare,
  HelpCircle,
  Truck,
  Palette,
  BookOpen,
  LogOut,
  DollarSign
} from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { section } = useParams();
  const { toast } = useToast();
  const [activeModule, setActiveModule] = useState(section || 'dashboard');
  
  // মোট সাধারণ পরিসংখ্যান
  const stats = {
    totalUsers: 2458,
    totalOrders: 1247,
    totalRevenue: "৳ 12,45,890",
    activeListings: 845
  };
  
  // আজকের পরিসংখ্যান
  const todayStats = {
    newUsers: 24,
    newOrders: 47,
    todayRevenue: "৳ 35,780",
    newListings: 18
  };
  
  // সাম্প্রতিক ট্রানজেকশন
  const recentTransactions = [
    { id: 'TX-5872', amount: '৳ 2,450', type: 'বিক্রয়', user: 'রহিম আহমেদ', status: 'সম্পন্ন', time: '15 মিনিট আগে' },
    { id: 'TX-5871', amount: '৳ 1,200', type: 'রেন্টাল', user: 'করিম খান', status: 'প্রক্রিয়াধীন', time: '32 মিনিট আগে' },
    { id: 'TX-5870', amount: '৳ 3,500', type: 'সার্ভিস', user: 'নাদিয়া ইসলাম', status: 'সম্পন্ন', time: '1 ঘন্টা আগে' },
    { id: 'TX-5869', amount: '৳ 850', type: 'ডিজিটাল', user: 'সাকিব হাসান', status: 'সম্পন্ন', time: '2 ঘন্টা আগে' },
  ];
  
  // পেন্ডিং অ্যাপ্রুভাল
  const pendingItems = {
    products: 12,
    services: 8,
    rentalListings: 5,
    contentCreators: 3
  };

  // সাইডবার মেনু আইটেম - মনিটাইজেশন ট্যাব যোগ করলাম
  const sidebarItems = [
    { id: 'dashboard', name: 'ড্যাশবোর্ড', icon: <BarChart3 size={18} /> },
    { id: 'users', name: 'ব্যবহারকারী', icon: <Users size={18} /> },
    { id: 'marketplace', name: 'মার্কেটপ্লেস', icon: <ShoppingBag size={18} /> },
    { id: 'rentals', name: 'রেন্টাল', icon: <Building size={18} /> },
    { id: 'services', name: 'সার্ভিস', icon: <Truck size={18} /> },
    { id: 'digital', name: 'ডিজিটাল কন্টেন্ট', icon: <BookOpen size={18} /> },
    { id: 'categories', name: 'ক্যাটাগরি ম্যানেজমেন্ট', icon: <Layers size={18} /> },
    { id: 'payments', name: 'পেমেন্ট ম্যানেজমেন্ট', icon: <Banknote size={18} /> },
    { id: 'monetization', name: 'মানিটাইজেশন', icon: <DollarSign size={18} /> },
    { id: 'reports', name: 'রিপোর্ট', icon: <FileText size={18} /> },
    { id: 'analytics', name: 'অ্যানালিটিক্স', icon: <BarChart size={18} /> },
    { id: 'support', name: 'সাপোর্ট টিকেট', icon: <MessageSquare size={18} /> },
    { id: 'settings', name: 'সেটিংস', icon: <SettingsIcon size={18} /> },
    { id: 'advanced', name: 'অ্যাডভান্স ফিচার', icon: <ShieldCheck size={18} /> },
  ];
  
  const handleModuleChange = (moduleId: string) => {
    setActiveModule(moduleId);
    toast({
      title: `${sidebarItems.find(item => item.id === moduleId)?.name} সিলেক্ট করা হয়েছে`,
      description: "আপনি এখন মডিউলে কাজ করতে পারেন।",
    });
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* সাইডবার */}
      <div className="w-64 bg-white shadow-lg overflow-y-auto">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold flex items-center">
            <ShieldCheck className="mr-2 text-primary" /> অ্যাডমিন প্যানেল
          </h2>
        </div>
        
        <div className="p-4">
          <div className="space-y-1">
            {sidebarItems.map((item) => (
              <Button
                key={item.id}
                variant={activeModule === item.id ? 'default' : 'ghost'}
                className={`w-full justify-start ${activeModule === item.id ? '' : 'text-gray-600'}`}
                onClick={() => handleModuleChange(item.id)}
              >
                {item.icon}
                <span className="ml-2">{item.name}</span>
              </Button>
            ))}
            
            <Separator className="my-4" />
            
            <Button variant="ghost" className="w-full justify-start text-red-500" onClick={() => navigate('/')}>
              <LogOut size={18} />
              <span className="ml-2">লগআউট</span>
            </Button>
          </div>
        </div>
      </div>
      
      {/* মূল কন্টেন্ট এরিয়া */}
      <div className="flex-1 overflow-y-auto">
        {/* টপবার */}
        <div className="bg-white shadow-sm border-b px-6 py-3 flex justify-between items-center">
          <div>
            <Button variant="outline" size="sm" onClick={() => navigate('/')}>
              <LogOut className="h-4 w-4 mr-1" /> বাহিরে ফিরুন
            </Button>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">8</span>
            </Button>
            
            <div className="flex items-center">
              <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center">
                A
              </div>
              <span className="ml-2 font-medium">অ্যাডমিন</span>
            </div>
          </div>
        </div>
        
        {/* কন্টেন্ট */}
        <div className="p-6">
          {activeModule === 'dashboard' && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold">ড্যাশবোর্ড</h1>
              
              {/* স্ট্যাটিসটিক্স কার্ড */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-6 flex justify-between items-center">
                    <div>
                      <p className="text-sm text-muted-foreground">মোট ব্যবহারকারী</p>
                      <p className="text-2xl font-bold">{stats.totalUsers}</p>
                      <p className="text-xs text-green-600">+{todayStats.newUsers} আজ</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Users className="text-blue-600" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6 flex justify-between items-center">
                    <div>
                      <p className="text-sm text-muted-foreground">মোট অর্ডার</p>
                      <p className="text-2xl font-bold">{stats.totalOrders}</p>
                      <p className="text-xs text-green-600">+{todayStats.newOrders} আজ</p>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <Package className="text-purple-600" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6 flex justify-between items-center">
                    <div>
                      <p className="text-sm text-muted-foreground">মোট আয়</p>
                      <p className="text-2xl font-bold">{stats.totalRevenue}</p>
                      <p className="text-xs text-green-600">+{todayStats.todayRevenue} আজ</p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Banknote className="text-green-600" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6 flex justify-between items-center">
                    <div>
                      <p className="text-sm text-muted-foreground">সক্রিয় লিস্টিং</p>
                      <p className="text-2xl font-bold">{stats.activeListings}</p>
                      <p className="text-xs text-green-600">+{todayStats.newListings} আজ</p>
                    </div>
                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                      <Tag className="text-amber-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* রেভেনিউ চার্ট এবং পেন্ডিং অ্যাপ্রুভাল */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">আয়ের ট্রেন্ড</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="h-80 flex items-center justify-center bg-slate-50 rounded-md">
                      <BarChart3 className="h-16 w-16 text-muted-foreground" />
                      <p className="ml-4 text-muted-foreground">এখানে রেভেনিউ চার্ট দেখানো হবে</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">অনুমোদন প্রয়োজন</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-blue-50 rounded-md">
                        <div className="flex items-center">
                          <ShoppingBag className="h-5 w-5 text-blue-600 mr-2" />
                          <span>প্রোডাক্ট</span>
                        </div>
                        <div>
                          <span className="bg-blue-200 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                            {pendingItems.products}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 bg-purple-50 rounded-md">
                        <div className="flex items-center">
                          <Truck className="h-5 w-5 text-purple-600 mr-2" />
                          <span>সার্ভিস</span>
                        </div>
                        <div>
                          <span className="bg-purple-200 text-purple-700 px-2 py-1 rounded-full text-xs font-medium">
                            {pendingItems.services}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 bg-green-50 rounded-md">
                        <div className="flex items-center">
                          <Building className="h-5 w-5 text-green-600 mr-2" />
                          <span>রেন্টাল</span>
                        </div>
                        <div>
                          <span className="bg-green-200 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                            {pendingItems.rentalListings}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 bg-amber-50 rounded-md">
                        <div className="flex items-center">
                          <BookOpen className="h-5 w-5 text-amber-600 mr-2" />
                          <span>কন্টেন্ট ক্রিয়েটর</span>
                        </div>
                        <div>
                          <span className="bg-amber-200 text-amber-700 px-2 py-1 rounded-full text-xs font-medium">
                            {pendingItems.contentCreators}
                          </span>
                        </div>
                      </div>
                      
                      <Button className="w-full mt-2">
                        সবগুলো দেখুন
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* সাম্প্রতিক ট্রানজেকশন */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">সাম্প্রতিক ট্রানজেকশন</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4">আইডি</th>
                          <th className="text-left py-3 px-4">পরিমাণ</th>
                          <th className="text-left py-3 px-4">ধরন</th>
                          <th className="text-left py-3 px-4">ব্যবহারকারী</th>
                          <th className="text-left py-3 px-4">স্ট্যাটাস</th>
                          <th className="text-right py-3 px-4">সময়</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentTransactions.map((tx, index) => (
                          <tr key={tx.id} className={index < recentTransactions.length - 1 ? "border-b" : ""}>
                            <td className="py-3 px-4">{tx.id}</td>
                            <td className="py-3 px-4 font-medium">{tx.amount}</td>
                            <td className="py-3 px-4">{tx.type}</td>
                            <td className="py-3 px-4">{tx.user}</td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                tx.status === 'সম্পন্ন' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                              }`}>
                                {tx.status}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-right text-muted-foreground">{tx.time}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="mt-4 flex justify-center">
                    <Button variant="outline">সব ট্রানজেকশন দেখুন</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          
          {activeModule === 'users' && <UserManagement />}
          
          {activeModule === 'marketplace' && <MarketplaceManagement />}
          
          {activeModule === 'rentals' && <RentalManagement />}
          
          {activeModule === 'services' && <ServiceManagement />}
          
          {activeModule === 'digital' && <DigitalContentManagement />}
          
          {activeModule === 'categories' && <CategoryManagement />}
          
          {activeModule === 'payments' && <PaymentManagement />}
          
          {activeModule === 'monetization' && <MonetizationTab />}
          
          {activeModule === 'reports' && <ReportManagement />}
          
          {activeModule === 'analytics' && <Analytics />}
          
          {activeModule === 'support' && <SupportTicket />}
          
          {activeModule === 'settings' && <Settings />}
          
          {activeModule === 'advanced' && <AdvancedFeatures />}
          
          {!['dashboard', 'users', 'marketplace', 'rentals', 'services', 'digital', 'categories', 
             'payments', 'reports', 'analytics', 'support', 'settings', 'advanced', 'monetization'].includes(activeModule) && (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="h-24 w-24 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                {sidebarItems.find(item => item.id === activeModule)?.icon || <HelpCircle size={32} className="text-primary" />}
              </div>
              <h2 className="text-2xl font-bold">{sidebarItems.find(item => item.id === activeModule)?.name} মডিউল</h2>
              <p className="mt-2 text-muted-foreground text-center max-w-md">
                এই মডিউলটি বর্তমানে বিকাশাধীন আছে। শীঘ্রই এটি ব্যবহার করতে পারবেন।
              </p>
              <Button className="mt-6" onClick={() => setActiveModule('dashboard')}>
                ড্যাশবোর্ডে ফিরে যান
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
