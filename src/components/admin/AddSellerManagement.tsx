import React, { useState, useEffect } from 'react';
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
  CheckCircle,
  XCircle,
  Building,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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

interface NewSellerForm {
  userId: string;
  sellerType: 'marketplace' | 'rental' | 'service' | 'content';
  businessName: string;
  email: string;
  phone: string;
  address: string;
  bio: string;
}

const AddSellerManagement = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [sellers, setSellers] = useState<SellerProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedSeller, setSelectedSeller] = useState<SellerProfile | null>(null);
  const [availableUsers, setAvailableUsers] = useState<{ id: string; email: string; full_name: string }[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  
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

  // Fetch users who are not sellers yet
  const fetchAvailableUsers = async () => {
    setLoadingUsers(true);
    try {
      // Get all profiles
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id, email, full_name');

      if (profilesError) throw profilesError;

      // Get existing seller IDs
      const { data: existingSellers, error: sellersError } = await supabase
        .from('seller_profiles')
        .select('id');

      if (sellersError) throw sellersError;

      const existingSellerIds = new Set(existingSellers?.map(s => s.id) || []);
      
      // Filter out users who are already sellers
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

  // Filter sellers by search query
  const filteredSellers = sellers.filter(seller => 
    seller.business_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    seller.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    seller.phone?.includes(searchQuery)
  );

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

  return (
    <div className="space-y-6">
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
            <Dialog open={isAddDialogOpen} onOpenChange={(open) => {
              setIsAddDialogOpen(open);
              if (open) fetchAvailableUsers();
            }}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <UserPlus className="h-4 w-4" />
                  নতুন সেলার যোগ করুন
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
        </CardHeader>
        <CardContent>
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
            <Button variant="outline" onClick={fetchSellers}>
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              রিফ্রেশ
            </Button>
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
    </div>
  );
};

export default AddSellerManagement;
