import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { 
  Search, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Eye,
  UserCheck,
  UserX,
  Loader2,
  RefreshCw,
  FileText,
  Download,
  ExternalLink,
  IdCard,
  CreditCard,
  Building,
  Globe,
  Users,
  Video,
  Image as ImageIcon,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  MessageCircle
} from 'lucide-react';

interface ProductSample {
  name: string;
  description: string;
  image?: string;
}

interface Reference {
  name: string;
  phone: string;
  relationship: string;
}

interface SellerApplication {
  id: string;
  user_id: string;
  business_name: string;
  business_type: string;
  phone: string | null;
  email: string | null;
  address: string | null;
  description: string | null;
  category: string | null;
  experience: string | null;
  status: 'pending' | 'approved' | 'rejected';
  admin_notes: string | null;
  created_at: string;
  documents: string[] | null;
  // New fields
  nid_number: string | null;
  nid_type: string | null;
  nid_front_image: string | null;
  nid_back_image: string | null;
  bank_name: string | null;
  bank_account_number: string | null;
  bank_account_holder: string | null;
  bank_branch: string | null;
  mobile_banking_provider: string | null;
  mobile_banking_number: string | null;
  trade_license_number: string | null;
  trade_license_image: string | null;
  trade_license_expiry: string | null;
  facebook_url: string | null;
  instagram_url: string | null;
  whatsapp_number: string | null;
  website_url: string | null;
  product_samples: ProductSample[] | null;
  seller_references: Reference[] | null;
  video_introduction_url: string | null;
}

const SellerApplicationsManagement = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [applications, setApplications] = useState<SellerApplication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedApplication, setSelectedApplication] = useState<SellerApplication | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showActionDialog, setShowActionDialog] = useState(false);
  const [actionType, setActionType] = useState<'approve' | 'reject'>('approve');
  const [adminNotes, setAdminNotes] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const fetchApplications = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('seller_applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setApplications((data as any[])?.map(app => ({
        ...app,
        product_samples: app.product_samples || [],
        seller_references: app.seller_references || []
      })) || []);
    } catch (error: any) {
      toast({
        title: "ডাটা লোড করতে ব্যর্থ",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const filteredApplications = applications.filter(app =>
    app.business_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.phone?.includes(searchTerm)
  );

  const pendingCount = applications.filter(a => a.status === 'pending').length;
  const approvedCount = applications.filter(a => a.status === 'approved').length;
  const rejectedCount = applications.filter(a => a.status === 'rejected').length;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800"><Clock className="h-3 w-3 mr-1" /> অপেক্ষমান</Badge>;
      case 'approved':
        return <Badge variant="secondary" className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" /> অনুমোদিত</Badge>;
      case 'rejected':
        return <Badge variant="secondary" className="bg-red-100 text-red-800"><XCircle className="h-3 w-3 mr-1" /> প্রত্যাখ্যাত</Badge>;
      default:
        return null;
    }
  };

  const handleAction = async () => {
    if (!selectedApplication || !user?.id) return;

    setIsProcessing(true);
    try {
      const functionName = actionType === 'approve' ? 'approve_seller_application' : 'reject_seller_application';
      
      const { data, error } = await supabase.rpc(functionName, {
        application_id: selectedApplication.id,
        admin_user_id: user.id,
        notes: adminNotes || null
      });

      if (error) throw error;

      toast({
        title: actionType === 'approve' ? "আবেদন অনুমোদিত হয়েছে" : "আবেদন প্রত্যাখ্যাত হয়েছে",
        description: actionType === 'approve' 
          ? "বিক্রেতার প্রোফাইল তৈরি করা হয়েছে।"
          : "আবেদনকারীকে জানানো হবে।"
      });

      setShowActionDialog(false);
      setAdminNotes('');
      fetchApplications();
    } catch (error: any) {
      toast({
        title: "অ্যাকশন ব্যর্থ",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const openActionDialog = (app: SellerApplication, type: 'approve' | 'reject') => {
    setSelectedApplication(app);
    setActionType(type);
    setAdminNotes('');
    setShowActionDialog(true);
  };

  const getMobileBankingName = (provider: string | null) => {
    const names: Record<string, string> = {
      'bkash': 'বিকাশ',
      'nagad': 'নগদ',
      'rocket': 'রকেট',
      'upay': 'উপায়'
    };
    return provider ? names[provider] || provider : '-';
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 rounded-full bg-yellow-100">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">অপেক্ষমান আবেদন</p>
              <p className="text-2xl font-bold">{pendingCount}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 rounded-full bg-green-100">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">অনুমোদিত</p>
              <p className="text-2xl font-bold">{approvedCount}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 rounded-full bg-red-100">
              <XCircle className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">প্রত্যাখ্যাত</p>
              <p className="text-2xl font-bold">{rejectedCount}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search & Refresh */}
      <Card>
        <CardHeader>
          <CardTitle>বিক্রেতা আবেদন সমূহ</CardTitle>
          <CardDescription>নতুন বিক্রেতাদের আবেদন অনুমোদন বা প্রত্যাখ্যান করুন</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="নাম, ইমেইল বা ফোন দিয়ে খুঁজুন..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" onClick={fetchApplications} disabled={isLoading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              রিফ্রেশ
            </Button>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : filteredApplications.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              কোনো আবেদন পাওয়া যায়নি
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ব্যবসার নাম</TableHead>
                    <TableHead>যোগাযোগ</TableHead>
                    <TableHead>বিভাগ</TableHead>
                    <TableHead>NID</TableHead>
                    <TableHead>তারিখ</TableHead>
                    <TableHead>স্ট্যাটাস</TableHead>
                    <TableHead className="text-right">অ্যাকশন</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredApplications.map((app) => (
                    <TableRow key={app.id}>
                      <TableCell className="font-medium">{app.business_name}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {app.email && <p>{app.email}</p>}
                          {app.phone && <p className="text-muted-foreground">{app.phone}</p>}
                        </div>
                      </TableCell>
                      <TableCell>{app.category || '-'}</TableCell>
                      <TableCell>
                        {app.nid_number ? (
                          <Badge variant="outline" className="text-xs">
                            <IdCard className="h-3 w-3 mr-1" />
                            {app.nid_type === 'passport' ? 'পাসপোর্ট' : 'NID'}
                          </Badge>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell>{new Date(app.created_at).toLocaleDateString('bn-BD')}</TableCell>
                      <TableCell>{getStatusBadge(app.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setSelectedApplication(app);
                              setShowDetailsDialog(true);
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {app.status === 'pending' && (
                            <>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-green-600 hover:text-green-700 hover:bg-green-50"
                                onClick={() => openActionDialog(app, 'approve')}
                              >
                                <UserCheck className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                onClick={() => openActionDialog(app, 'reject')}
                              >
                                <UserX className="h-4 w-4" />
                              </Button>
                            </>
                          )}
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

      {/* Enhanced Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              আবেদনের বিস্তারিত
            </DialogTitle>
            <DialogDescription>
              {selectedApplication?.business_name} - {getStatusBadge(selectedApplication?.status || '')}
            </DialogDescription>
          </DialogHeader>
          
          {selectedApplication && (
            <ScrollArea className="h-[60vh]">
              <Tabs defaultValue="business" className="w-full">
                <TabsList className="grid grid-cols-6 w-full">
                  <TabsTrigger value="business" className="text-xs">ব্যবসা</TabsTrigger>
                  <TabsTrigger value="identity" className="text-xs">পরিচয়</TabsTrigger>
                  <TabsTrigger value="payment" className="text-xs">পেমেন্ট</TabsTrigger>
                  <TabsTrigger value="social" className="text-xs">সোশ্যাল</TabsTrigger>
                  <TabsTrigger value="products" className="text-xs">পণ্য</TabsTrigger>
                  <TabsTrigger value="documents" className="text-xs">ডকুমেন্ট</TabsTrigger>
                </TabsList>

                {/* Business Info Tab */}
                <TabsContent value="business" className="mt-4 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">ব্যবসার নাম</p>
                      <p className="font-medium">{selectedApplication.business_name}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">ব্যবসার ধরন</p>
                      <p className="font-medium">{selectedApplication.business_type}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Mail className="h-3 w-3" /> ইমেইল
                      </p>
                      <p className="font-medium">{selectedApplication.email || '-'}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Phone className="h-3 w-3" /> ফোন
                      </p>
                      <p className="font-medium">{selectedApplication.phone || '-'}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">বিভাগ</p>
                      <p className="font-medium">{selectedApplication.category || '-'}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">অভিজ্ঞতা</p>
                      <p className="font-medium">{selectedApplication.experience || '-'}</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> ঠিকানা
                    </p>
                    <p className="font-medium">{selectedApplication.address || '-'}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">বিবরণ</p>
                    <p className="font-medium">{selectedApplication.description || '-'}</p>
                  </div>
                  {selectedApplication.admin_notes && (
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <p className="text-xs text-muted-foreground">এডমিনের মন্তব্য</p>
                      <p className="font-medium">{selectedApplication.admin_notes}</p>
                    </div>
                  )}
                </TabsContent>

                {/* Identity Tab */}
                <TabsContent value="identity" className="mt-4 space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-800 flex items-center gap-2 mb-3">
                      <IdCard className="h-4 w-4" />
                      {selectedApplication.nid_type === 'passport' ? 'পাসপোর্ট তথ্য' : 'জাতীয় পরিচয়পত্র (NID)'}
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-blue-600">নম্বর</p>
                        <p className="font-medium">{selectedApplication.nid_number || 'প্রদান করা হয়নি'}</p>
                      </div>
                    </div>
                    
                    {(selectedApplication.nid_front_image || selectedApplication.nid_back_image) && (
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        {selectedApplication.nid_front_image && (
                          <div>
                            <p className="text-xs text-blue-600 mb-2">সামনের ছবি</p>
                            <div className="relative group">
                              <img 
                                src={selectedApplication.nid_front_image} 
                                alt="NID Front" 
                                className="w-full h-32 object-cover rounded-lg border"
                              />
                              <Button
                                variant="secondary"
                                size="sm"
                                className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => window.open(selectedApplication.nid_front_image!, '_blank')}
                              >
                                <ExternalLink className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        )}
                        {selectedApplication.nid_back_image && (
                          <div>
                            <p className="text-xs text-blue-600 mb-2">পেছনের ছবি</p>
                            <div className="relative group">
                              <img 
                                src={selectedApplication.nid_back_image} 
                                alt="NID Back" 
                                className="w-full h-32 object-cover rounded-lg border"
                              />
                              <Button
                                variant="secondary"
                                size="sm"
                                className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => window.open(selectedApplication.nid_back_image!, '_blank')}
                              >
                                <ExternalLink className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Trade License */}
                  <div className="bg-amber-50 p-4 rounded-lg">
                    <h4 className="font-medium text-amber-800 flex items-center gap-2 mb-3">
                      <FileText className="h-4 w-4" />
                      ট্রেড লাইসেন্স
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-amber-600">নম্বর</p>
                        <p className="font-medium">{selectedApplication.trade_license_number || 'প্রদান করা হয়নি'}</p>
                      </div>
                      <div>
                        <p className="text-xs text-amber-600">মেয়াদ উত্তীর্ণ</p>
                        <p className="font-medium">
                          {selectedApplication.trade_license_expiry 
                            ? new Date(selectedApplication.trade_license_expiry).toLocaleDateString('bn-BD')
                            : '-'
                          }
                        </p>
                      </div>
                    </div>
                    {selectedApplication.trade_license_image && (
                      <div className="mt-4">
                        <p className="text-xs text-amber-600 mb-2">ট্রেড লাইসেন্সের ছবি</p>
                        <div className="relative group inline-block">
                          <img 
                            src={selectedApplication.trade_license_image} 
                            alt="Trade License" 
                            className="max-h-40 rounded-lg border"
                          />
                          <Button
                            variant="secondary"
                            size="sm"
                            className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => window.open(selectedApplication.trade_license_image!, '_blank')}
                          >
                            <ExternalLink className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>

                {/* Payment Tab */}
                <TabsContent value="payment" className="mt-4 space-y-4">
                  {selectedApplication.bank_name ? (
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-medium text-green-800 flex items-center gap-2 mb-3">
                        <CreditCard className="h-4 w-4" />
                        ব্যাংক অ্যাকাউন্ট
                      </h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-green-600">ব্যাংকের নাম</p>
                          <p className="font-medium">{selectedApplication.bank_name}</p>
                        </div>
                        <div>
                          <p className="text-xs text-green-600">অ্যাকাউন্ট নম্বর</p>
                          <p className="font-medium">{selectedApplication.bank_account_number || '-'}</p>
                        </div>
                        <div>
                          <p className="text-xs text-green-600">অ্যাকাউন্ট হোল্ডার</p>
                          <p className="font-medium">{selectedApplication.bank_account_holder || '-'}</p>
                        </div>
                        <div>
                          <p className="text-xs text-green-600">ব্রাঞ্চ</p>
                          <p className="font-medium">{selectedApplication.bank_branch || '-'}</p>
                        </div>
                      </div>
                    </div>
                  ) : selectedApplication.mobile_banking_provider ? (
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h4 className="font-medium text-purple-800 flex items-center gap-2 mb-3">
                        <Phone className="h-4 w-4" />
                        মোবাইল ব্যাংকিং
                      </h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-purple-600">প্রোভাইডার</p>
                          <p className="font-medium">{getMobileBankingName(selectedApplication.mobile_banking_provider)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-purple-600">নম্বর</p>
                          <p className="font-medium">{selectedApplication.mobile_banking_number || '-'}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      পেমেন্ট তথ্য প্রদান করা হয়নি
                    </div>
                  )}
                </TabsContent>

                {/* Social Tab */}
                <TabsContent value="social" className="mt-4 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    {selectedApplication.facebook_url && (
                      <a 
                        href={selectedApplication.facebook_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 p-3 border rounded-lg hover:bg-muted transition-colors"
                      >
                        <Facebook className="h-5 w-5 text-blue-600" />
                        <span className="text-sm truncate">{selectedApplication.facebook_url}</span>
                        <ExternalLink className="h-3 w-3 ml-auto" />
                      </a>
                    )}
                    {selectedApplication.instagram_url && (
                      <a 
                        href={selectedApplication.instagram_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 p-3 border rounded-lg hover:bg-muted transition-colors"
                      >
                        <Instagram className="h-5 w-5 text-pink-600" />
                        <span className="text-sm truncate">{selectedApplication.instagram_url}</span>
                        <ExternalLink className="h-3 w-3 ml-auto" />
                      </a>
                    )}
                    {selectedApplication.whatsapp_number && (
                      <div className="flex items-center gap-2 p-3 border rounded-lg">
                        <MessageCircle className="h-5 w-5 text-green-600" />
                        <span className="text-sm">{selectedApplication.whatsapp_number}</span>
                      </div>
                    )}
                    {selectedApplication.website_url && (
                      <a 
                        href={selectedApplication.website_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 p-3 border rounded-lg hover:bg-muted transition-colors"
                      >
                        <Globe className="h-5 w-5" />
                        <span className="text-sm truncate">{selectedApplication.website_url}</span>
                        <ExternalLink className="h-3 w-3 ml-auto" />
                      </a>
                    )}
                  </div>

                  {/* References */}
                  {selectedApplication.seller_references && selectedApplication.seller_references.length > 0 && (
                    <div className="border-t pt-4">
                      <h4 className="font-medium flex items-center gap-2 mb-3">
                        <Users className="h-4 w-4" />
                        রেফারেন্স ({selectedApplication.seller_references.length})
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {selectedApplication.seller_references.map((ref, index) => (
                          <div key={index} className="p-3 bg-muted/50 rounded-lg">
                            <p className="font-medium">{ref.name}</p>
                            <p className="text-sm text-muted-foreground">{ref.phone}</p>
                            <p className="text-xs text-muted-foreground">{ref.relationship}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {!selectedApplication.facebook_url && !selectedApplication.instagram_url && 
                   !selectedApplication.whatsapp_number && !selectedApplication.website_url && 
                   (!selectedApplication.seller_references || selectedApplication.seller_references.length === 0) && (
                    <div className="text-center py-8 text-muted-foreground">
                      সোশ্যাল মিডিয়া বা রেফারেন্স প্রদান করা হয়নি
                    </div>
                  )}
                </TabsContent>

                {/* Products Tab */}
                <TabsContent value="products" className="mt-4 space-y-4">
                  {selectedApplication.product_samples && selectedApplication.product_samples.length > 0 ? (
                    <div>
                      <h4 className="font-medium flex items-center gap-2 mb-3">
                        <ImageIcon className="h-4 w-4" />
                        পণ্যের নমুনা ({selectedApplication.product_samples.length})
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {selectedApplication.product_samples.map((sample, index) => (
                          <div key={index} className="border rounded-lg overflow-hidden">
                            {sample.image ? (
                              <div className="relative group">
                                <img 
                                  src={sample.image} 
                                  alt={sample.name} 
                                  className="w-full h-32 object-cover"
                                />
                                <Button
                                  variant="secondary"
                                  size="sm"
                                  className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                  onClick={() => window.open(sample.image!, '_blank')}
                                >
                                  <ExternalLink className="h-3 w-3" />
                                </Button>
                              </div>
                            ) : (
                              <div className="h-32 bg-muted flex items-center justify-center">
                                <ImageIcon className="h-8 w-8 text-muted-foreground" />
                              </div>
                            )}
                            <div className="p-3">
                              <p className="font-medium text-sm">{sample.name || `পণ্য #${index + 1}`}</p>
                              {sample.description && (
                                <p className="text-xs text-muted-foreground line-clamp-2">{sample.description}</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      পণ্যের নমুনা প্রদান করা হয়নি
                    </div>
                  )}

                  {/* Video Introduction */}
                  {selectedApplication.video_introduction_url && (
                    <div className="border-t pt-4">
                      <h4 className="font-medium flex items-center gap-2 mb-3">
                        <Video className="h-4 w-4" />
                        ভিডিও ইন্ট্রোডাকশন
                      </h4>
                      {selectedApplication.video_introduction_url.includes('youtube') ? (
                        <div className="aspect-video rounded-lg overflow-hidden">
                          <iframe
                            width="100%"
                            height="100%"
                            src={selectedApplication.video_introduction_url.replace('watch?v=', 'embed/')}
                            title="Video Introduction"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                      ) : (
                        <a 
                          href={selectedApplication.video_introduction_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 p-3 border rounded-lg hover:bg-muted"
                        >
                          <Video className="h-5 w-5" />
                          <span className="truncate">{selectedApplication.video_introduction_url}</span>
                          <ExternalLink className="h-4 w-4 ml-auto" />
                        </a>
                      )}
                    </div>
                  )}
                </TabsContent>

                {/* Documents Tab */}
                <TabsContent value="documents" className="mt-4">
                  {selectedApplication.documents && selectedApplication.documents.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {selectedApplication.documents.map((doc, index) => {
                        const fileName = doc.split('/').pop()?.split('-').slice(1).join('-') || `Document ${index + 1}`;
                        const isImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(doc);
                        
                        return (
                          <div key={index} className="relative group border rounded-lg overflow-hidden">
                            <div className="aspect-square bg-muted flex items-center justify-center overflow-hidden">
                              {isImage ? (
                                <img 
                                  src={doc} 
                                  alt={fileName}
                                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                  onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                                  }}
                                />
                              ) : null}
                              <div className={`flex flex-col items-center justify-center p-4 ${isImage ? 'hidden' : ''}`}>
                                <FileText className="h-12 w-12 text-muted-foreground mb-2" />
                                <span className="text-xs text-muted-foreground text-center truncate w-full px-2">
                                  {fileName.split('.').pop()?.toUpperCase() || 'FILE'}
                                </span>
                              </div>
                            </div>
                            
                            <div className="p-2 bg-background">
                              <p className="text-xs truncate" title={fileName}>{fileName}</p>
                            </div>
                            
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                              <Button
                                variant="secondary"
                                size="sm"
                                onClick={() => window.open(doc, '_blank')}
                                title="প্রিভিউ"
                              >
                                <ExternalLink className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="secondary"
                                size="sm"
                                onClick={() => {
                                  const link = document.createElement('a');
                                  link.href = doc;
                                  link.download = fileName;
                                  link.target = '_blank';
                                  document.body.appendChild(link);
                                  link.click();
                                  document.body.removeChild(link);
                                }}
                                title="ডাউনলোড"
                              >
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      কোনো ডকুমেন্ট আপলোড করা হয়নি
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </ScrollArea>
          )}
          
          <DialogFooter>
            {selectedApplication?.status === 'pending' && (
              <>
                <Button
                  variant="outline"
                  className="text-red-600 border-red-200 hover:bg-red-50"
                  onClick={() => {
                    setShowDetailsDialog(false);
                    openActionDialog(selectedApplication, 'reject');
                  }}
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  প্রত্যাখ্যান
                </Button>
                <Button
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => {
                    setShowDetailsDialog(false);
                    openActionDialog(selectedApplication, 'approve');
                  }}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  অনুমোদন
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Action Dialog */}
      <Dialog open={showActionDialog} onOpenChange={setShowActionDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {actionType === 'approve' ? 'আবেদন অনুমোদন করুন' : 'আবেদন প্রত্যাখ্যান করুন'}
            </DialogTitle>
            <DialogDescription>
              {actionType === 'approve' 
                ? 'এই আবেদন অনুমোদন করলে বিক্রেতার প্রোফাইল তৈরি হবে এবং তারা সেলার ড্যাশবোর্ড অ্যাক্সেস পাবে।'
                : 'এই আবেদন প্রত্যাখ্যান করলে আবেদনকারী জানতে পারবেন।'
              }
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <p className="text-sm font-medium mb-2">ব্যবসার নাম</p>
              <p className="text-muted-foreground">{selectedApplication?.business_name}</p>
            </div>
            <div>
              <p className="text-sm font-medium mb-2">মন্তব্য (ঐচ্ছিক)</p>
              <Textarea
                placeholder={actionType === 'approve' ? 'অভিনন্দন বার্তা লিখুন...' : 'প্রত্যাখ্যানের কারণ লিখুন...'}
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowActionDialog(false)} disabled={isProcessing}>
              বাতিল
            </Button>
            <Button
              onClick={handleAction}
              disabled={isProcessing}
              className={actionType === 'approve' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}
            >
              {isProcessing ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : actionType === 'approve' ? (
                <CheckCircle className="h-4 w-4 mr-2" />
              ) : (
                <XCircle className="h-4 w-4 mr-2" />
              )}
              {actionType === 'approve' ? 'অনুমোদন করুন' : 'প্রত্যাখ্যান করুন'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SellerApplicationsManagement;
