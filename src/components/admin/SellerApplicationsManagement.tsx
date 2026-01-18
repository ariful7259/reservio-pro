import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
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
  RefreshCw
} from 'lucide-react';

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
      setApplications(data as SellerApplication[] || []);
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

      {/* Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>আবেদনের বিস্তারিত</DialogTitle>
          </DialogHeader>
          {selectedApplication && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">ব্যবসার নাম</p>
                  <p className="font-medium">{selectedApplication.business_name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">ব্যবসার ধরন</p>
                  <p className="font-medium">{selectedApplication.business_type}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">ইমেইল</p>
                  <p className="font-medium">{selectedApplication.email || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">ফোন</p>
                  <p className="font-medium">{selectedApplication.phone || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">বিভাগ</p>
                  <p className="font-medium">{selectedApplication.category || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">অভিজ্ঞতা</p>
                  <p className="font-medium">{selectedApplication.experience || '-'}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">ঠিকানা</p>
                <p className="font-medium">{selectedApplication.address || '-'}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">বিবরণ</p>
                <p className="font-medium">{selectedApplication.description || '-'}</p>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-sm text-muted-foreground">স্ট্যাটাস:</p>
                {getStatusBadge(selectedApplication.status)}
              </div>
              {selectedApplication.admin_notes && (
                <div className="bg-muted/50 p-3 rounded-lg">
                  <p className="text-sm text-muted-foreground">এডমিনের মন্তব্য</p>
                  <p className="font-medium">{selectedApplication.admin_notes}</p>
                </div>
              )}
            </div>
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
