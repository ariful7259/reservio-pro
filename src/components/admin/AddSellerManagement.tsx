import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { 
  UserPlus, 
  Store, 
  Search, 
  RefreshCw, 
  Trash2, 
  Edit, 
  Eye,
  Upload,
  FileSpreadsheet,
  BarChart3,
  TrendingUp,
  Star,
  ShoppingBag,
  Phone,
  Mail,
  MapPin,
  Download,
  AlertCircle,
  CheckCircle,
  Filter,
  Calendar,
  FileDown
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';

interface SellerProfile {
  id: string;
  seller_type: string;
  business_name: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  bio: string | null;
  created_at: string;
  updated_at: string;
}

interface SellerPerformance {
  sellerId: string;
  businessName: string;
  totalOrders: number;
  totalSales: number;
  avgRating: number;
  reviewCount: number;
}

interface MonthlySalesData {
  month: string;
  sales: number;
  orders: number;
}

interface NewSellerForm {
  userId: string;
  sellerType: 'marketplace' | 'rental' | 'service' | 'content';
  businessName: string;
  email: string;
  phone: string;
  address: string;
  bio: string;
}

interface BulkImportResult {
  success: number;
  failed: number;
  errors: string[];
}

interface FilterOptions {
  sellerType: string;
  dateFrom: string;
  dateTo: string;
}

const AddSellerManagement = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [sellers, setSellers] = useState<SellerProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isBulkImportDialogOpen, setIsBulkImportDialogOpen] = useState(false);
  const [selectedSeller, setSelectedSeller] = useState<SellerProfile | null>(null);
  const [availableUsers, setAvailableUsers] = useState<{ id: string; email: string; full_name: string }[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [activeTab, setActiveTab] = useState('sellers');
  
  // Filter options
  const [filters, setFilters] = useState<FilterOptions>({
    sellerType: 'all',
    dateFrom: '',
    dateTo: ''
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Performance data
  const [performanceData, setPerformanceData] = useState<SellerPerformance[]>([]);
  const [monthlySalesData, setMonthlySalesData] = useState<MonthlySalesData[]>([]);
  const [loadingPerformance, setLoadingPerformance] = useState(false);
  
  // Bulk import
  const [bulkImportData, setBulkImportData] = useState<any[]>([]);
  const [importProgress, setImportProgress] = useState(0);
  const [isImporting, setIsImporting] = useState(false);
  const [importResult, setImportResult] = useState<BulkImportResult | null>(null);
  
  // Edit form
  const [editForm, setEditForm] = useState<NewSellerForm>({
    userId: '',
    sellerType: 'marketplace',
    businessName: '',
    email: '',
    phone: '',
    address: '',
    bio: ''
  });
  
  const [newSeller, setNewSeller] = useState<NewSellerForm>({
    userId: '',
    sellerType: 'marketplace',
    businessName: '',
    email: '',
    phone: '',
    address: '',
    bio: ''
  });

  // Fetch all sellers
  const fetchSellers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('seller_profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSellers(data || []);
    } catch (error: any) {
      toast({
        title: "ত্রুটি",
        description: "সেলার লোড করতে সমস্যা হয়েছে।",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Fetch seller performance data with monthly trends
  const fetchPerformanceData = async () => {
    setLoadingPerformance(true);
    try {
      const { data: sellersData, error: sellersError } = await supabase
        .from('seller_profiles')
        .select('id, business_name');

      if (sellersError) throw sellersError;

      // Get all orders for monthly trend
      const { data: allOrders } = await supabase
        .from('reseller_orders')
        .select('total_amount, created_at, status')
        .order('created_at', { ascending: true });

      // Calculate monthly sales data (last 6 months)
      const monthlyData: Record<string, { sales: number; orders: number }> = {};
      const now = new Date();
      
      for (let i = 5; i >= 0; i--) {
        const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const monthKey = date.toLocaleDateString('bn-BD', { month: 'short', year: 'numeric' });
        monthlyData[monthKey] = { sales: 0, orders: 0 };
      }

      (allOrders || []).forEach(order => {
        const orderDate = new Date(order.created_at);
        const monthKey = orderDate.toLocaleDateString('bn-BD', { month: 'short', year: 'numeric' });
        
        if (monthlyData[monthKey]) {
          monthlyData[monthKey].orders++;
          if (order.status === 'delivered') {
            monthlyData[monthKey].sales += order.total_amount || 0;
          }
        }
      });

      const monthlySales: MonthlySalesData[] = Object.entries(monthlyData).map(([month, data]) => ({
        month,
        sales: data.sales,
        orders: data.orders
      }));

      setMonthlySalesData(monthlySales);

      // Calculate per-seller performance
      const performancePromises = (sellersData || []).map(async (seller) => {
        const { data: ordersData } = await supabase
          .from('reseller_orders')
          .select('total_amount, status')
          .eq('user_id', seller.id);

        const completedOrders = ordersData?.filter(o => o.status === 'delivered') || [];
        const totalSales = completedOrders.reduce((sum, o) => sum + (o.total_amount || 0), 0);

        const { data: reviewsData } = await supabase
          .from('reviews')
          .select('rating')
          .eq('product_id', seller.id);

        const avgRating = reviewsData?.length 
          ? reviewsData.reduce((sum, r) => sum + (r.rating || 0), 0) / reviewsData.length 
          : 0;

        return {
          sellerId: seller.id,
          businessName: seller.business_name || 'নাম নেই',
          totalOrders: ordersData?.length || 0,
          totalSales,
          avgRating: Math.round(avgRating * 10) / 10,
          reviewCount: reviewsData?.length || 0
        };
      });

      const results = await Promise.all(performancePromises);
      setPerformanceData(results.sort((a, b) => b.totalSales - a.totalSales));
    } catch (error: any) {
      toast({
        title: "ত্রুটি",
        description: "পারফরম্যান্স ডেটা লোড করতে সমস্যা হয়েছে।",
        variant: "destructive"
      });
    } finally {
      setLoadingPerformance(false);
    }
  };

  // Fetch users who are not sellers yet
  const fetchAvailableUsers = async () => {
    setLoadingUsers(true);
    try {
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id, email, full_name');

      if (profilesError) throw profilesError;

      const { data: existingSellers, error: sellersError } = await supabase
        .from('seller_profiles')
        .select('id');

      if (sellersError) throw sellersError;

      const existingSellerIds = new Set(existingSellers?.map(s => s.id) || []);
      const available = (profiles || []).filter(p => !existingSellerIds.has(p.id));
      setAvailableUsers(available);
    } catch (error: any) {
      toast({
        title: "ত্রুটি",
        description: "ব্যবহারকারী লোড করতে সমস্যা হয়েছে।",
        variant: "destructive"
      });
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    fetchSellers();
  }, []);

  useEffect(() => {
    if (activeTab === 'performance') {
      fetchPerformanceData();
    }
  }, [activeTab]);

  // Filtered sellers based on filters
  const filteredSellers = useMemo(() => {
    return sellers.filter(seller => {
      // Search filter
      const matchesSearch = 
        seller.business_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        seller.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        seller.phone?.includes(searchQuery);

      // Type filter
      const matchesType = filters.sellerType === 'all' || seller.seller_type === filters.sellerType;

      // Date filter
      let matchesDate = true;
      if (filters.dateFrom) {
        matchesDate = matchesDate && new Date(seller.created_at) >= new Date(filters.dateFrom);
      }
      if (filters.dateTo) {
        matchesDate = matchesDate && new Date(seller.created_at) <= new Date(filters.dateTo + 'T23:59:59');
      }

      return matchesSearch && matchesType && matchesDate;
    });
  }, [sellers, searchQuery, filters]);

  // Export sellers to CSV
  const exportToCSV = () => {
    const headers = ['ID', 'ব্যবসার নাম', 'টাইপ', 'ইমেইল', 'ফোন', 'ঠিকানা', 'বিবরণ', 'যোগ হয়েছে'];
    const csvRows = [
      headers.join(','),
      ...filteredSellers.map(seller => [
        seller.id,
        `"${seller.business_name || ''}"`,
        seller.seller_type,
        seller.email || '',
        seller.phone || '',
        `"${seller.address || ''}"`,
        `"${seller.bio || ''}"`,
        new Date(seller.created_at).toLocaleDateString('bn-BD')
      ].join(','))
    ];

    const csvContent = csvRows.join('\n');
    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `sellers_export_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();

    toast({
      title: "সফল",
      description: `${filteredSellers.length} সেলার এক্সপোর্ট হয়েছে।`
    });
  };

  // Export to Excel (XLSX-like format)
  const exportToExcel = () => {
    const headers = ['ID', 'ব্যবসার নাম', 'টাইপ', 'ইমেইল', 'ফোন', 'ঠিকানা', 'বিবরণ', 'যোগ হয়েছে'];
    
    // Create tab-separated content for Excel compatibility
    const excelRows = [
      headers.join('\t'),
      ...filteredSellers.map(seller => [
        seller.id,
        seller.business_name || '',
        seller.seller_type,
        seller.email || '',
        seller.phone || '',
        seller.address || '',
        seller.bio || '',
        new Date(seller.created_at).toLocaleDateString('bn-BD')
      ].join('\t'))
    ];

    const excelContent = excelRows.join('\n');
    const blob = new Blob(['\ufeff' + excelContent], { type: 'application/vnd.ms-excel;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `sellers_export_${new Date().toISOString().split('T')[0]}.xls`;
    link.click();

    toast({
      title: "সফল",
      description: `${filteredSellers.length} সেলার Excel এ এক্সপোর্ট হয়েছে।`
    });
  };

  // Clear filters
  const clearFilters = () => {
    setFilters({
      sellerType: 'all',
      dateFrom: '',
      dateTo: ''
    });
  };

  // Add new seller
  const handleAddSeller = async () => {
    if (!newSeller.userId || !newSeller.businessName) {
      toast({
        title: "ত্রুটি",
        description: "ব্যবহারকারী এবং ব্যবসার নাম আবশ্যক।",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('seller_profiles')
        .insert({
          id: newSeller.userId,
          seller_type: newSeller.sellerType,
          business_name: newSeller.businessName,
          email: newSeller.email || null,
          phone: newSeller.phone || null,
          address: newSeller.address || null,
          bio: newSeller.bio || null
        });

      if (error) throw error;

      toast({
        title: "সফল",
        description: "নতুন সেলার সফলভাবে যোগ করা হয়েছে।",
      });

      setIsAddDialogOpen(false);
      setNewSeller({
        userId: '',
        sellerType: 'marketplace',
        businessName: '',
        email: '',
        phone: '',
        address: '',
        bio: ''
      });
      fetchSellers();
    } catch (error: any) {
      toast({
        title: "ত্রুটি",
        description: error.message || "সেলার যোগ করতে সমস্যা হয়েছে।",
        variant: "destructive"
      });
    }
  };

  // Update seller
  const handleUpdateSeller = async () => {
    if (!selectedSeller || !editForm.businessName) {
      toast({
        title: "ত্রুটি",
        description: "ব্যবসার নাম আবশ্যক।",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('seller_profiles')
        .update({
          seller_type: editForm.sellerType,
          business_name: editForm.businessName,
          email: editForm.email || null,
          phone: editForm.phone || null,
          address: editForm.address || null,
          bio: editForm.bio || null,
          updated_at: new Date().toISOString()
        })
        .eq('id', selectedSeller.id);

      if (error) throw error;

      toast({
        title: "সফল",
        description: "সেলার তথ্য আপডেট করা হয়েছে।",
      });

      setIsEditDialogOpen(false);
      fetchSellers();
    } catch (error: any) {
      toast({
        title: "ত্রুটি",
        description: error.message || "সেলার আপডেট করতে সমস্যা হয়েছে।",
        variant: "destructive"
      });
    }
  };

  // Delete seller
  const handleDeleteSeller = async (sellerId: string) => {
    if (!confirm('আপনি কি নিশ্চিত এই সেলার মুছে ফেলতে চান?')) return;

    try {
      const { error } = await supabase
        .from('seller_profiles')
        .delete()
        .eq('id', sellerId);

      if (error) throw error;

      toast({
        title: "সফল",
        description: "সেলার সফলভাবে মুছে ফেলা হয়েছে।",
      });

      fetchSellers();
    } catch (error: any) {
      toast({
        title: "ত্রুটি",
        description: "সেলার মুছতে সমস্যা হয়েছে।",
        variant: "destructive"
      });
    }
  };

  // Open edit dialog
  const openEditDialog = (seller: SellerProfile) => {
    setSelectedSeller(seller);
    setEditForm({
      userId: seller.id,
      sellerType: seller.seller_type as any,
      businessName: seller.business_name || '',
      email: seller.email || '',
      phone: seller.phone || '',
      address: seller.address || '',
      bio: seller.bio || ''
    });
    setIsEditDialogOpen(true);
  };

  // Handle CSV file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const lines = text.split('\n');
      const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
      
      const data = [];
      for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue;
        
        const values = lines[i].split(',').map(v => v.trim());
        const row: any = {};
        
        headers.forEach((header, index) => {
          row[header] = values[index] || '';
        });
        
        data.push(row);
      }
      
      setBulkImportData(data);
      setImportResult(null);
    };
    reader.readAsText(file);
  };

  // Process bulk import
  const handleBulkImport = async () => {
    if (bulkImportData.length === 0) {
      toast({
        title: "ত্রুটি",
        description: "কোনো ডেটা পাওয়া যায়নি।",
        variant: "destructive"
      });
      return;
    }

    setIsImporting(true);
    setImportProgress(0);
    
    const result: BulkImportResult = { success: 0, failed: 0, errors: [] };
    const total = bulkImportData.length;

    for (let i = 0; i < bulkImportData.length; i++) {
      const row = bulkImportData[i];
      
      try {
        let userId = row.user_id;
        
        if (!userId && row.email) {
          const { data: existingProfile } = await supabase
            .from('profiles')
            .select('id')
            .eq('email', row.email)
            .single();
          
          userId = existingProfile?.id;
        }

        if (!userId) {
          throw new Error(`Row ${i + 1}: ব্যবহারকারী আইডি বা ইমেইল প্রয়োজন`);
        }

        const { data: existingSeller } = await supabase
          .from('seller_profiles')
          .select('id')
          .eq('id', userId)
          .single();

        if (existingSeller) {
          throw new Error(`Row ${i + 1}: ইতিমধ্যে সেলার হিসেবে নিবন্ধিত`);
        }

        const validTypes = ['marketplace', 'rental', 'service', 'content'];
        const sellerType = row.seller_type?.toLowerCase() || 'marketplace';
        
        if (!validTypes.includes(sellerType)) {
          throw new Error(`Row ${i + 1}: অবৈধ সেলার টাইপ`);
        }

        const { error } = await supabase
          .from('seller_profiles')
          .insert({
            id: userId,
            seller_type: sellerType,
            business_name: row.business_name || row.businessname || 'নতুন ব্যবসা',
            email: row.email || null,
            phone: row.phone || null,
            address: row.address || null,
            bio: row.bio || row.description || null
          });

        if (error) throw error;
        result.success++;
      } catch (error: any) {
        result.failed++;
        result.errors.push(error.message || `Row ${i + 1}: অজানা ত্রুটি`);
      }

      setImportProgress(Math.round(((i + 1) / total) * 100));
    }

    setImportResult(result);
    setIsImporting(false);
    
    if (result.success > 0) {
      fetchSellers();
    }

    toast({
      title: result.failed === 0 ? "সফল" : "আংশিক সফল",
      description: `${result.success} সেলার যোগ হয়েছে, ${result.failed} ব্যর্থ হয়েছে`,
      variant: result.failed > 0 ? "destructive" : "default"
    });
  };

  // Download sample CSV
  const downloadSampleCSV = () => {
    const csvContent = `user_id,email,business_name,seller_type,phone,address,bio
,seller1@example.com,ABC Store,marketplace,01712345678,Dhaka,Best electronics store
,seller2@example.com,XYZ Rentals,rental,01812345678,Chittagong,Premium rental services`;
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'seller_import_sample.csv';
    link.click();
  };

  const getSellerTypeBadge = (type: string) => {
    const types: Record<string, { label: string; color: string }> = {
      marketplace: { label: 'মার্কেটপ্লেস', color: 'bg-blue-100 text-blue-800' },
      rental: { label: 'রেন্টাল', color: 'bg-purple-100 text-purple-800' },
      service: { label: 'সার্ভিস', color: 'bg-green-100 text-green-800' },
      content: { label: 'কন্টেন্ট', color: 'bg-orange-100 text-orange-800' }
    };
    const typeInfo = types[type] || { label: type, color: 'bg-gray-100 text-gray-800' };
    return <Badge className={typeInfo.color}>{typeInfo.label}</Badge>;
  };

  const activeFiltersCount = [
    filters.sellerType !== 'all',
    filters.dateFrom,
    filters.dateTo
  ].filter(Boolean).length;

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="sellers" className="gap-2">
            <Store className="h-4 w-4" />
            সেলার তালিকা
          </TabsTrigger>
          <TabsTrigger value="performance" className="gap-2">
            <BarChart3 className="h-4 w-4" />
            পারফরম্যান্স
          </TabsTrigger>
          <TabsTrigger value="import" className="gap-2">
            <Upload className="h-4 w-4" />
            বাল্ক ইম্পোর্ট
          </TabsTrigger>
        </TabsList>

        {/* Sellers Tab */}
        <TabsContent value="sellers">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Store className="h-5 w-5" />
                    সেলার ম্যানেজমেন্ট
                  </CardTitle>
                  <CardDescription>
                    সরাসরি নতুন সেলার যোগ করুন বা বিদ্যমান সেলার পরিচালনা করুন
                  </CardDescription>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {/* Export Dropdown */}
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="gap-2">
                        <FileDown className="h-4 w-4" />
                        এক্সপোর্ট
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-48 p-2">
                      <div className="space-y-1">
                        <Button 
                          variant="ghost" 
                          className="w-full justify-start gap-2"
                          onClick={exportToCSV}
                        >
                          <FileSpreadsheet className="h-4 w-4" />
                          CSV ফাইল
                        </Button>
                        <Button 
                          variant="ghost" 
                          className="w-full justify-start gap-2"
                          onClick={exportToExcel}
                        >
                          <FileSpreadsheet className="h-4 w-4" />
                          Excel ফাইল
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>

                  <Dialog open={isAddDialogOpen} onOpenChange={(open) => {
                    setIsAddDialogOpen(open);
                    if (open) fetchAvailableUsers();
                  }}>
                    <DialogTrigger asChild>
                      <Button className="gap-2">
                        <UserPlus className="h-4 w-4" />
                        নতুন সেলার
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>নতুন সেলার যোগ করুন</DialogTitle>
                        <DialogDescription>
                          একজন বিদ্যমান ব্যবহারকারীকে সেলার হিসেবে যোগ করুন
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="userId">ব্যবহারকারী নির্বাচন করুন *</Label>
                          <Select
                            value={newSeller.userId}
                            onValueChange={(value) => {
                              const selectedUser = availableUsers.find(u => u.id === value);
                              setNewSeller({ 
                                ...newSeller, 
                                userId: value,
                                email: selectedUser?.email || ''
                              });
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder={loadingUsers ? "লোড হচ্ছে..." : "ব্যবহারকারী নির্বাচন করুন"} />
                            </SelectTrigger>
                            <SelectContent>
                              {availableUsers.map(user => (
                                <SelectItem key={user.id} value={user.id}>
                                  {user.full_name || user.email || user.id.substring(0, 8)}
                                </SelectItem>
                              ))}
                              {availableUsers.length === 0 && !loadingUsers && (
                                <SelectItem value="none" disabled>
                                  কোনো ব্যবহারকারী পাওয়া যায়নি
                                </SelectItem>
                              )}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="grid gap-2">
                          <Label htmlFor="sellerType">সেলার টাইপ *</Label>
                          <Select
                            value={newSeller.sellerType}
                            onValueChange={(value: 'marketplace' | 'rental' | 'service' | 'content') => 
                              setNewSeller({ ...newSeller, sellerType: value })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="টাইপ নির্বাচন করুন" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="marketplace">মার্কেটপ্লেস</SelectItem>
                              <SelectItem value="rental">রেন্টাল</SelectItem>
                              <SelectItem value="service">সার্ভিস</SelectItem>
                              <SelectItem value="content">কন্টেন্ট</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="grid gap-2">
                          <Label htmlFor="businessName">ব্যবসার নাম *</Label>
                          <Input
                            id="businessName"
                            value={newSeller.businessName}
                            onChange={(e) => setNewSeller({ ...newSeller, businessName: e.target.value })}
                            placeholder="ব্যবসার নাম লিখুন"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="email">ইমেইল</Label>
                            <Input
                              id="email"
                              type="email"
                              value={newSeller.email}
                              onChange={(e) => setNewSeller({ ...newSeller, email: e.target.value })}
                              placeholder="email@example.com"
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="phone">ফোন</Label>
                            <Input
                              id="phone"
                              value={newSeller.phone}
                              onChange={(e) => setNewSeller({ ...newSeller, phone: e.target.value })}
                              placeholder="01XXXXXXXXX"
                            />
                          </div>
                        </div>

                        <div className="grid gap-2">
                          <Label htmlFor="address">ঠিকানা</Label>
                          <Input
                            id="address"
                            value={newSeller.address}
                            onChange={(e) => setNewSeller({ ...newSeller, address: e.target.value })}
                            placeholder="ব্যবসার ঠিকানা"
                          />
                        </div>

                        <div className="grid gap-2">
                          <Label htmlFor="bio">বিবরণ</Label>
                          <Textarea
                            id="bio"
                            value={newSeller.bio}
                            onChange={(e) => setNewSeller({ ...newSeller, bio: e.target.value })}
                            placeholder="ব্যবসার সংক্ষিপ্ত বিবরণ"
                            rows={3}
                          />
                        </div>
                      </div>

                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                          বাতিল
                        </Button>
                        <Button onClick={handleAddSeller}>
                          <UserPlus className="h-4 w-4 mr-2" />
                          সেলার যোগ করুন
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Search and Filter Bar */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="সেলার খুঁজুন (নাম, ইমেইল, ফোন)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                {/* Filter Popover */}
                <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      <Filter className="h-4 w-4" />
                      ফিল্টার
                      {activeFiltersCount > 0 && (
                        <Badge variant="secondary" className="ml-1">
                          {activeFiltersCount}
                        </Badge>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-4">
                    <div className="space-y-4">
                      <h4 className="font-medium">ফিল্টার অপশন</h4>
                      
                      <div className="space-y-2">
                        <Label>সেলার টাইপ</Label>
                        <Select
                          value={filters.sellerType}
                          onValueChange={(value) => setFilters({ ...filters, sellerType: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="সব টাইপ" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">সব টাইপ</SelectItem>
                            <SelectItem value="marketplace">মার্কেটপ্লেস</SelectItem>
                            <SelectItem value="rental">রেন্টাল</SelectItem>
                            <SelectItem value="service">সার্ভিস</SelectItem>
                            <SelectItem value="content">কন্টেন্ট</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>যোগ হওয়ার তারিখ</Label>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <Label className="text-xs text-muted-foreground">থেকে</Label>
                            <Input
                              type="date"
                              value={filters.dateFrom}
                              onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label className="text-xs text-muted-foreground">পর্যন্ত</Label>
                            <Input
                              type="date"
                              value={filters.dateTo}
                              onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button variant="outline" size="sm" onClick={clearFilters} className="flex-1">
                          ক্লিয়ার
                        </Button>
                        <Button size="sm" onClick={() => setIsFilterOpen(false)} className="flex-1">
                          প্রয়োগ করুন
                        </Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>

                <Button variant="outline" onClick={fetchSellers}>
                  <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                  রিফ্রেশ
                </Button>
              </div>

              {/* Active Filters Display */}
              {activeFiltersCount > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {filters.sellerType !== 'all' && (
                    <Badge variant="secondary" className="gap-1">
                      টাইপ: {filters.sellerType}
                      <button onClick={() => setFilters({ ...filters, sellerType: 'all' })} className="ml-1 hover:text-destructive">×</button>
                    </Badge>
                  )}
                  {filters.dateFrom && (
                    <Badge variant="secondary" className="gap-1">
                      থেকে: {filters.dateFrom}
                      <button onClick={() => setFilters({ ...filters, dateFrom: '' })} className="ml-1 hover:text-destructive">×</button>
                    </Badge>
                  )}
                  {filters.dateTo && (
                    <Badge variant="secondary" className="gap-1">
                      পর্যন্ত: {filters.dateTo}
                      <button onClick={() => setFilters({ ...filters, dateTo: '' })} className="ml-1 hover:text-destructive">×</button>
                    </Badge>
                  )}
                  <Button variant="ghost" size="sm" onClick={clearFilters} className="h-6 px-2 text-xs">
                    সব ক্লিয়ার
                  </Button>
                </div>
              )}

              {/* Results Count */}
              <div className="text-sm text-muted-foreground mb-4">
                {filteredSellers.length} সেলার পাওয়া গেছে
              </div>

              {loading ? (
                <div className="text-center py-12">
                  <RefreshCw className="h-8 w-8 animate-spin mx-auto text-muted-foreground" />
                  <p className="mt-2 text-muted-foreground">লোড হচ্ছে...</p>
                </div>
              ) : filteredSellers.length === 0 ? (
                <div className="text-center py-12">
                  <Store className="h-12 w-12 mx-auto text-muted-foreground" />
                  <p className="mt-2 text-muted-foreground">কোনো সেলার পাওয়া যায়নি</p>
                </div>
              ) : (
                <div className="rounded-md border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ব্যবসার নাম</TableHead>
                        <TableHead>টাইপ</TableHead>
                        <TableHead>ইমেইল</TableHead>
                        <TableHead>ফোন</TableHead>
                        <TableHead>যোগ হয়েছে</TableHead>
                        <TableHead className="text-right">অ্যাকশন</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredSellers.map((seller) => (
                        <TableRow key={seller.id}>
                          <TableCell className="font-medium">
                            {seller.business_name || 'নাম নেই'}
                          </TableCell>
                          <TableCell>
                            {getSellerTypeBadge(seller.seller_type)}
                          </TableCell>
                          <TableCell>{seller.email || '-'}</TableCell>
                          <TableCell>{seller.phone || '-'}</TableCell>
                          <TableCell>
                            {new Date(seller.created_at).toLocaleDateString('bn-BD')}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setSelectedSeller(seller);
                                  setIsViewDialogOpen(true);
                                }}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => openEditDialog(seller)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-destructive hover:text-destructive"
                                onClick={() => handleDeleteSeller(seller.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance">
          <div className="space-y-6">
            {/* Monthly Sales Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  মাসিক বিক্রি ট্রেন্ড
                </CardTitle>
                <CardDescription>
                  গত ৬ মাসের বিক্রি এবং অর্ডার পরিসংখ্যান
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loadingPerformance ? (
                  <div className="h-64 flex items-center justify-center">
                    <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
                  </div>
                ) : (
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={monthlySalesData}>
                        <defs>
                          <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis dataKey="month" className="text-xs" />
                        <YAxis className="text-xs" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'hsl(var(--background))', 
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px'
                          }}
                          formatter={(value: number, name: string) => [
                            name === 'sales' ? `৳${value.toLocaleString('bn-BD')}` : value.toLocaleString('bn-BD'),
                            name === 'sales' ? 'বিক্রি' : 'অর্ডার'
                          ]}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="sales" 
                          stroke="hsl(var(--primary))" 
                          fillOpacity={1} 
                          fill="url(#colorSales)" 
                          name="sales"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Orders Bar Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5" />
                  মাসিক অর্ডার পরিসংখ্যান
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loadingPerformance ? (
                  <div className="h-48 flex items-center justify-center">
                    <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
                  </div>
                ) : (
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={monthlySalesData}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis dataKey="month" className="text-xs" />
                        <YAxis className="text-xs" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'hsl(var(--background))', 
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px'
                          }}
                        />
                        <Bar dataKey="orders" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="অর্ডার" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Performance Summary & Table */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  সেলার পারফরম্যান্স রিপোর্ট
                </CardTitle>
                <CardDescription>
                  প্রতিটি সেলারের বিক্রি, অর্ডার এবং রেটিং দেখুন
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loadingPerformance ? (
                  <div className="text-center py-12">
                    <RefreshCw className="h-8 w-8 animate-spin mx-auto text-muted-foreground" />
                    <p className="mt-2 text-muted-foreground">পারফরম্যান্স ডেটা লোড হচ্ছে...</p>
                  </div>
                ) : performanceData.length === 0 ? (
                  <div className="text-center py-12">
                    <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground" />
                    <p className="mt-2 text-muted-foreground">কোনো পারফরম্যান্স ডেটা নেই</p>
                  </div>
                ) : (
                  <>
                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary/10 rounded-lg">
                              <Store className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">মোট সেলার</p>
                              <p className="text-2xl font-bold">{performanceData.length}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-500/10 rounded-lg">
                              <TrendingUp className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">মোট বিক্রি</p>
                              <p className="text-2xl font-bold">
                                ৳{performanceData.reduce((sum, p) => sum + p.totalSales, 0).toLocaleString('bn-BD')}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-500/10 rounded-lg">
                              <ShoppingBag className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">মোট অর্ডার</p>
                              <p className="text-2xl font-bold">
                                {performanceData.reduce((sum, p) => sum + p.totalOrders, 0).toLocaleString('bn-BD')}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-yellow-500/10 rounded-lg">
                              <Star className="h-5 w-5 text-yellow-600" />
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">গড় রেটিং</p>
                              <p className="text-2xl font-bold">
                                {performanceData.length > 0
                                  ? (performanceData.reduce((sum, p) => sum + p.avgRating, 0) / performanceData.length).toFixed(1)
                                  : '0'}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Performance Table */}
                    <div className="rounded-md border overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>র‍্যাংক</TableHead>
                            <TableHead>ব্যবসার নাম</TableHead>
                            <TableHead className="text-right">মোট অর্ডার</TableHead>
                            <TableHead className="text-right">মোট বিক্রি</TableHead>
                            <TableHead className="text-right">গড় রেটিং</TableHead>
                            <TableHead className="text-right">রিভিউ</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {performanceData.map((seller, index) => (
                            <TableRow key={seller.sellerId}>
                              <TableCell>
                                <Badge variant={index < 3 ? "default" : "outline"}>
                                  #{index + 1}
                                </Badge>
                              </TableCell>
                              <TableCell className="font-medium">{seller.businessName}</TableCell>
                              <TableCell className="text-right">{seller.totalOrders.toLocaleString('bn-BD')}</TableCell>
                              <TableCell className="text-right">৳{seller.totalSales.toLocaleString('bn-BD')}</TableCell>
                              <TableCell className="text-right">
                                <div className="flex items-center justify-end gap-1">
                                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                                  {seller.avgRating}
                                </div>
                              </TableCell>
                              <TableCell className="text-right">{seller.reviewCount.toLocaleString('bn-BD')}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Bulk Import Tab */}
        <TabsContent value="import">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                বাল্ক সেলার ইম্পোর্ট
              </CardTitle>
              <CardDescription>
                CSV ফাইল থেকে একসাথে অনেক সেলার আপলোড করুন
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Instructions */}
              <div className="bg-muted/50 p-4 rounded-lg space-y-3">
                <h4 className="font-medium flex items-center gap-2">
                  <FileSpreadsheet className="h-4 w-4" />
                  CSV ফাইল ফরম্যাট
                </h4>
                <p className="text-sm text-muted-foreground">
                  আপনার CSV ফাইলে নিম্নলিখিত কলামগুলি থাকা উচিত:
                </p>
                <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                  <li><strong>user_id</strong> (ঐচ্ছিক) - ব্যবহারকারীর আইডি</li>
                  <li><strong>email</strong> - ব্যবহারকারীর ইমেইল (user_id না থাকলে এটি দিয়ে খোঁজা হবে)</li>
                  <li><strong>business_name</strong> - ব্যবসার নাম</li>
                  <li><strong>seller_type</strong> - marketplace, rental, service, বা content</li>
                  <li><strong>phone</strong> (ঐচ্ছিক) - ফোন নম্বর</li>
                  <li><strong>address</strong> (ঐচ্ছিক) - ঠিকানা</li>
                  <li><strong>bio</strong> (ঐচ্ছিক) - বিবরণ</li>
                </ul>
                <Button variant="outline" size="sm" onClick={downloadSampleCSV}>
                  <Download className="h-4 w-4 mr-2" />
                  নমুনা CSV ডাউনলোড করুন
                </Button>
              </div>

              {/* File Upload */}
              <div className="border-2 border-dashed rounded-lg p-8 text-center">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <FileSpreadsheet className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-4">CSV ফাইল আপলোড করতে ক্লিক করুন</p>
                <Button onClick={() => fileInputRef.current?.click()}>
                  <Upload className="h-4 w-4 mr-2" />
                  CSV ফাইল নির্বাচন করুন
                </Button>
              </div>

              {/* Preview Data */}
              {bulkImportData.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">প্রিভিউ ({bulkImportData.length} সেলার)</h4>
                    <Button 
                      onClick={handleBulkImport} 
                      disabled={isImporting}
                    >
                      {isImporting ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          ইম্পোর্ট হচ্ছে...
                        </>
                      ) : (
                        <>
                          <Upload className="h-4 w-4 mr-2" />
                          সব ইম্পোর্ট করুন
                        </>
                      )}
                    </Button>
                  </div>

                  {isImporting && (
                    <div className="space-y-2">
                      <Progress value={importProgress} />
                      <p className="text-sm text-muted-foreground text-center">{importProgress}% সম্পন্ন</p>
                    </div>
                  )}

                  <div className="rounded-md border overflow-x-auto max-h-64">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ইমেইল</TableHead>
                          <TableHead>ব্যবসার নাম</TableHead>
                          <TableHead>টাইপ</TableHead>
                          <TableHead>ফোন</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {bulkImportData.slice(0, 10).map((row, index) => (
                          <TableRow key={index}>
                            <TableCell>{row.email || '-'}</TableCell>
                            <TableCell>{row.business_name || row.businessname || '-'}</TableCell>
                            <TableCell>{row.seller_type || 'marketplace'}</TableCell>
                            <TableCell>{row.phone || '-'}</TableCell>
                          </TableRow>
                        ))}
                        {bulkImportData.length > 10 && (
                          <TableRow>
                            <TableCell colSpan={4} className="text-center text-muted-foreground">
                              ...এবং আরো {bulkImportData.length - 10} টি
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              )}

              {/* Import Result */}
              {importResult && (
                <div className={`p-4 rounded-lg ${importResult.failed > 0 ? 'bg-destructive/10' : 'bg-green-500/10'}`}>
                  <div className="flex items-start gap-3">
                    {importResult.failed > 0 ? (
                      <AlertCircle className="h-5 w-5 text-destructive mt-0.5" />
                    ) : (
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    )}
                    <div className="space-y-2">
                      <p className="font-medium">
                        ইম্পোর্ট ফলাফল: {importResult.success} সফল, {importResult.failed} ব্যর্থ
                      </p>
                      {importResult.errors.length > 0 && (
                        <ul className="text-sm text-destructive list-disc list-inside">
                          {importResult.errors.slice(0, 5).map((error, index) => (
                            <li key={index}>{error}</li>
                          ))}
                          {importResult.errors.length > 5 && (
                            <li>...এবং আরো {importResult.errors.length - 5} টি ত্রুটি</li>
                          )}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* View Seller Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>সেলার বিবরণ</DialogTitle>
          </DialogHeader>
          {selectedSeller && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Store className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">
                    {selectedSeller.business_name || 'নাম নেই'}
                  </h3>
                  {getSellerTypeBadge(selectedSeller.seller_type)}
                </div>
              </div>

              <div className="grid gap-3 pt-4 border-t">
                {selectedSeller.email && (
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedSeller.email}</span>
                  </div>
                )}
                {selectedSeller.phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedSeller.phone}</span>
                  </div>
                )}
                {selectedSeller.address && (
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedSeller.address}</span>
                  </div>
                )}
              </div>

              {selectedSeller.bio && (
                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground mb-1">বিবরণ</p>
                  <p>{selectedSeller.bio}</p>
                </div>
              )}

              <div className="pt-4 border-t text-sm text-muted-foreground">
                <p>যোগ হয়েছে: {new Date(selectedSeller.created_at).toLocaleDateString('bn-BD')}</p>
                <p>আপডেট: {new Date(selectedSeller.updated_at).toLocaleDateString('bn-BD')}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Seller Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>সেলার তথ্য সম্পাদনা করুন</DialogTitle>
            <DialogDescription>
              সেলারের ব্যবসার তথ্য আপডেট করুন
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="editSellerType">সেলার টাইপ *</Label>
              <Select
                value={editForm.sellerType}
                onValueChange={(value: 'marketplace' | 'rental' | 'service' | 'content') => 
                  setEditForm({ ...editForm, sellerType: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="টাইপ নির্বাচন করুন" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="marketplace">মার্কেটপ্লেস</SelectItem>
                  <SelectItem value="rental">রেন্টাল</SelectItem>
                  <SelectItem value="service">সার্ভিস</SelectItem>
                  <SelectItem value="content">কন্টেন্ট</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="editBusinessName">ব্যবসার নাম *</Label>
              <Input
                id="editBusinessName"
                value={editForm.businessName}
                onChange={(e) => setEditForm({ ...editForm, businessName: e.target.value })}
                placeholder="ব্যবসার নাম লিখুন"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="editEmail">ইমেইল</Label>
                <Input
                  id="editEmail"
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  placeholder="email@example.com"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="editPhone">ফোন</Label>
                <Input
                  id="editPhone"
                  value={editForm.phone}
                  onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                  placeholder="01XXXXXXXXX"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="editAddress">ঠিকানা</Label>
              <Input
                id="editAddress"
                value={editForm.address}
                onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                placeholder="ব্যবসার ঠিকানা"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="editBio">বিবরণ</Label>
              <Textarea
                id="editBio"
                value={editForm.bio}
                onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                placeholder="ব্যবসার সংক্ষিপ্ত বিবরণ"
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              বাতিল
            </Button>
            <Button onClick={handleUpdateSeller}>
              <Edit className="h-4 w-4 mr-2" />
              আপডেট করুন
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddSellerManagement;
