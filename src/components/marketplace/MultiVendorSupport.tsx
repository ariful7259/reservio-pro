
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { 
  Store, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Package,
  Star,
  Eye,
  Settings,
  Plus,
  Search,
  Filter
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Vendor {
  id: string;
  name: string;
  email: string;
  storeName: string;
  status: 'active' | 'pending' | 'suspended';
  joinDate: string;
  totalProducts: number;
  totalSales: number;
  rating: number;
  commission: number;
}

const MultiVendorSupport = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const [vendors] = useState<Vendor[]>([
    {
      id: '1',
      name: 'রহিম আহমেদ',
      email: 'rahim@email.com',
      storeName: 'রহিমের ইলেকট্রনিক্স',
      status: 'active',
      joinDate: '২০২৪-০১-১৫',
      totalProducts: 45,
      totalSales: 125000,
      rating: 4.8,
      commission: 15
    },
    {
      id: '2',
      name: 'ফাতেমা খাতুন',
      email: 'fatema@email.com',
      storeName: 'ফ্যাশন হাউস',
      status: 'active',
      joinDate: '২০২৪-০২-১০',
      totalProducts: 78,
      totalSales: 89000,
      rating: 4.6,
      commission: 12
    },
    {
      id: '3',
      name: 'করিম উদ্দিন',
      email: 'karim@email.com',
      storeName: 'কৃষি পণ্য ভান্ডার',
      status: 'pending',
      joinDate: '২০২ৄ-০৩-০৫',
      totalProducts: 23,
      totalSales: 45000,
      rating: 4.2,
      commission: 18
    }
  ]);

  const [platformSettings, setPlatformSettings] = useState({
    defaultCommission: 15,
    autoApproveVendors: false,
    requireDocuments: true,
    multiCurrency: true,
    vendorAnalytics: true
  });

  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vendor.storeName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || vendor.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalStats = {
    totalVendors: vendors.length,
    activeVendors: vendors.filter(v => v.status === 'active').length,
    pendingVendors: vendors.filter(v => v.status === 'pending').length,
    totalRevenue: vendors.reduce((sum, v) => sum + v.totalSales, 0),
    totalProducts: vendors.reduce((sum, v) => sum + v.totalProducts, 0)
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">সক্রিয়</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">অপেক্ষমাণ</Badge>;
      case 'suspended':
        return <Badge className="bg-red-100 text-red-800">স্থগিত</Badge>;
      default:
        return <Badge variant="outline">অজানা</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">মাল্টি-ভেন্ডর মার্কেটপ্লেস</h2>
          <p className="text-muted-foreground">বিক্রেতাদের পরিচালনা ও নিয়ন্ত্রণ করুন</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          নতুন ভেন্ডর যোগ করুন
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="dashboard">ড্যাশবোর্ড</TabsTrigger>
          <TabsTrigger value="vendors">ভেন্ডরগণ</TabsTrigger>
          <TabsTrigger value="commissions">কমিশন</TabsTrigger>
          <TabsTrigger value="settings">সেটিংস</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          {/* সামগ্রিক পরিসংখ্যান */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">মোট ভেন্ডর</p>
                    <h3 className="text-2xl font-bold">{totalStats.totalVendors}</h3>
                  </div>
                  <Store className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">সক্রিয় ভেন্ডর</p>
                    <h3 className="text-2xl font-bold">{totalStats.activeVendors}</h3>
                  </div>
                  <Users className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">মোট পণ্য</p>
                    <h3 className="text-2xl font-bold">{totalStats.totalProducts}</h3>
                  </div>
                  <Package className="h-8 w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">মোট বিক্রয়</p>
                    <h3 className="text-2xl font-bold">৳{totalStats.totalRevenue.toLocaleString()}</h3>
                  </div>
                  <DollarSign className="h-8 w-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">অপেক্ষমাণ</p>
                    <h3 className="text-2xl font-bold">{totalStats.pendingVendors}</h3>
                  </div>
                  <Eye className="h-8 w-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* শীর্ষ পারফরমার */}
          <Card>
            <CardHeader>
              <CardTitle>শীর্ষ পারফরমিং ভেন্ডর</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {vendors
                  .filter(v => v.status === 'active')
                  .sort((a, b) => b.totalSales - a.totalSales)
                  .slice(0, 3)
                  .map((vendor, index) => (
                    <div key={vendor.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center font-bold text-primary">
                          #{index + 1}
                        </div>
                        <div>
                          <h4 className="font-medium">{vendor.storeName}</h4>
                          <p className="text-sm text-muted-foreground">{vendor.name}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">৳{vendor.totalSales.toLocaleString()}</p>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">{vendor.rating}</span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vendors" className="space-y-6">
          {/* সার্চ ও ফিল্টার */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="ভেন্ডর বা স্টোর নাম সার্চ করুন..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="স্ট্যাটাস ফিল্টার" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">সকল স্ট্যাটাস</SelectItem>
                <SelectItem value="active">সক্রিয়</SelectItem>
                <SelectItem value="pending">অপেক্ষমাণ</SelectItem>
                <SelectItem value="suspended">স্থগিত</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* ভেন্ডর তালিকা */}
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ভেন্ডর</TableHead>
                      <TableHead>স্টোর</TableHead>
                      <TableHead>স্ট্যাটাস</TableHead>
                      <TableHead>পণ্য</TableHead>
                      <TableHead>বিক্রয়</TableHead>
                      <TableHead>রেটিং</TableHead>
                      <TableHead>কমিশন</TableHead>
                      <TableHead>যোগদান</TableHead>
                      <TableHead>অ্যাকশন</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredVendors.map((vendor) => (
                      <TableRow key={vendor.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{vendor.name}</p>
                            <p className="text-sm text-muted-foreground">{vendor.email}</p>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{vendor.storeName}</TableCell>
                        <TableCell>{getStatusBadge(vendor.status)}</TableCell>
                        <TableCell>{vendor.totalProducts}</TableCell>
                        <TableCell>৳{vendor.totalSales.toLocaleString()}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span>{vendor.rating}</span>
                          </div>
                        </TableCell>
                        <TableCell>{vendor.commission}%</TableCell>
                        <TableCell>{vendor.joinDate}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Settings className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="commissions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>কমিশন ম্যানেজমেন্ট</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Label htmlFor="default-commission">ডিফল্ট কমিশন রেট (%)</Label>
                  <Input
                    id="default-commission"
                    type="number"
                    value={platformSettings.defaultCommission}
                    onChange={(e) => setPlatformSettings(prev => ({
                      ...prev,
                      defaultCommission: parseInt(e.target.value)
                    }))}
                  />
                </div>
                
                <div className="space-y-4">
                  <Label>কমিশন ক্যালকুলেশন</Label>
                  <Select defaultValue="percentage">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">শতাংশ ভিত্তিক</SelectItem>
                      <SelectItem value="fixed">নির্দিষ্ট অংক</SelectItem>
                      <SelectItem value="tiered">স্তরভিত্তিক</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="border-t pt-6">
                <h4 className="font-medium mb-4">ক্যাটাগরি ভিত্তিক কমিশন</h4>
                <div className="space-y-3">
                  {[
                    { category: 'ইলেকট্রনিক্স', commission: 12 },
                    { category: 'ফ্যাশন', commission: 15 },
                    { category: 'বই ও স্টেশনারি', commission: 10 },
                    { category: 'খাদ্য ও পানীয়', commission: 18 }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <span className="font-medium">{item.category}</span>
                      <Input
                        type="number"
                        value={item.commission}
                        className="w-20"
                        readOnly
                      />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>প্ল্যাটফর্ম সেটিংস</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="auto-approve">ভেন্ডর অটো অ্যাপ্রুভাল</Label>
                  <p className="text-sm text-muted-foreground">নতুন ভেন্ডরদের স্বয়ংক্রিয়ভাবে অনুমোদন করুন</p>
                </div>
                <Switch
                  id="auto-approve"
                  checked={platformSettings.autoApproveVendors}
                  onCheckedChange={(checked) => 
                    setPlatformSettings(prev => ({ ...prev, autoApproveVendors: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="require-docs">ডকুমেন্ট প্রয়োজন</Label>
                  <p className="text-sm text-muted-foreground">ভেন্ডর রেজিস্ট্রেশনের সময় ডকুমেন্ট আবশ্যক</p>
                </div>
                <Switch
                  id="require-docs"
                  checked={platformSettings.requireDocuments}
                  onCheckedChange={(checked) => 
                    setPlatformSettings(prev => ({ ...prev, requireDocuments: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="multi-currency">মাল্টি-কারেন্সি সাপোর্ট</Label>
                  <p className="text-sm text-muted-foreground">একাধিক মুদ্রায় লেনদেন সক্ষম করুন</p>
                </div>
                <Switch
                  id="multi-currency"
                  checked={platformSettings.multiCurrency}
                  onCheckedChange={(checked) => 
                    setPlatformSettings(prev => ({ ...prev, multiCurrency: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="vendor-analytics">ভেন্ডর অ্যানালিটিক্স</Label>
                  <p className="text-sm text-muted-foreground">ভেন্ডরদের বিস্তারিত অ্যানালিটিক্স প্রদান করুন</p>
                </div>
                <Switch
                  id="vendor-analytics"
                  checked={platformSettings.vendorAnalytics}
                  onCheckedChange={(checked) => 
                    setPlatformSettings(prev => ({ ...prev, vendorAnalytics: checked }))
                  }
                />
              </div>

              <div className="border-t pt-6">
                <Button className="w-full">
                  সেটিংস সংরক্ষণ করুন
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MultiVendorSupport;
