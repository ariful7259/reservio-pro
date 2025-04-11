
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader
} from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogClose
} from '@/components/ui/dialog';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  Filter, 
  Search, 
  Check, 
  X, 
  Star,
  EyeIcon,
  FileText
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

// Mock sellers
const sellers = [
  { id: 1, name: 'টেক স্টোর', products: 45, rating: 4.8, status: 'যাচাইকৃত', since: '১০ জানুয়ারি, ২০২৩' },
  { id: 2, name: 'ফ্যাশন হাউস', products: 68, rating: 4.5, status: 'যাচাইকৃত', since: '১৫ ফেব্রুয়ারি, ২০২৩' },
  { id: 3, name: 'কিডস জোন', products: 32, rating: 4.7, status: 'পর্যালোচনা হচ্ছে', since: '৫ মার্চ, ২০২৩' },
  { id: 4, name: 'হোম সেন্টার', products: 25, rating: 4.2, status: 'যাচাইকৃত', since: '২০ এপ্রিল, ২০২৩' },
  { id: 5, name: 'সাউন্ড হাব', products: 15, rating: 4.0, status: 'প্রত্যাখ্যাত', since: '১২ মে, ২০২৩' },
];

// Verification documents
const verificationDocs = {
  nidFront: "https://example.com/nid-front.jpg",
  nidBack: "https://example.com/nid-back.jpg",
  tradeLicense: "https://example.com/trade-license.jpg",
  storePhoto: "https://example.com/store.jpg",
  ownerInfo: {
    name: "রহিম উদ্দিন",
    nidNumber: "12345678901",
    address: "বাড়ি #৫, রোড #৭, মোহাম্মদপুর, ঢাকা",
    phone: "01712345678",
    email: "rahim@example.com"
  }
};

const SellersTab = () => {
  const { toast } = useToast();
  const [selectedSeller, setSelectedSeller] = useState<any>(null);
  const [viewingSeller, setViewingSeller] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter sellers based on search and status
  const filteredSellers = sellers.filter(seller => {
    const matchesSearch = seller.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = 
      statusFilter === 'all' || 
      (statusFilter === 'verified' && seller.status === 'যাচাইকৃত') ||
      (statusFilter === 'pending' && seller.status === 'পর্যালোচনা হচ্ছে') ||
      (statusFilter === 'rejected' && seller.status === 'প্রত্যাখ্যাত');
    
    return matchesSearch && matchesStatus;
  });

  const handleSellerAction = (action: string, sellerId: number) => {
    // Handle seller actions (view, verify, reject)
    const seller = sellers.find(s => s.id === sellerId);
    
    if (action === 'view') {
      setSelectedSeller(seller);
      setViewingSeller(true);
    } else if (action === 'verify') {
      toast({
        title: "বিক্রেতা যাচাই করা হয়েছে",
        description: `${seller?.name} বিক্রেতা সফলভাবে যাচাই করা হয়েছে।`,
      });
    } else if (action === 'reject') {
      toast({
        title: "বিক্রেতা প্রত্যাখ্যাত হয়েছে",
        description: `${seller?.name} বিক্রেতা প্রত্যাখ্যাত করা হয়েছে।`,
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Card>
        <CardHeader className="pb-2">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="বিক্রেতা খুঁজুন"
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px] h-9">
                  <Filter className="h-3.5 w-3.5 mr-2" />
                  <SelectValue placeholder="স্ট্যাটাস ফিল্টার" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">সকল স্ট্যাটাস</SelectItem>
                  <SelectItem value="verified">যাচাইকৃত</SelectItem>
                  <SelectItem value="pending">পর্যালোচনা হচ্ছে</SelectItem>
                  <SelectItem value="rejected">প্রত্যাখ্যাত</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>বিক্রেতা</TableHead>
                  <TableHead>যোগদানের তারিখ</TableHead>
                  <TableHead>মোট প্রোডাক্ট</TableHead>
                  <TableHead>রেটিং</TableHead>
                  <TableHead>স্ট্যাটাস</TableHead>
                  <TableHead className="text-right">অ্যাকশন</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSellers.map((seller) => (
                  <TableRow key={seller.id}>
                    <TableCell className="font-medium">{seller.name}</TableCell>
                    <TableCell>{seller.since}</TableCell>
                    <TableCell>{seller.products}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Star className="fill-yellow-500 text-yellow-500 h-4 w-4 mr-1" />
                        <span>{seller.rating}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={
                        seller.status === 'যাচাইকৃত' ? 'default' : 
                        seller.status === 'পর্যালোচনা হচ্ছে' ? 'warning' : 
                        'destructive'
                      }>
                        {seller.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleSellerAction('view', seller.id)}
                        >
                          <EyeIcon className="h-4 w-4" />
                        </Button>
                        
                        {seller.status === 'পর্যালোচনা হচ্ছে' && (
                          <>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleSellerAction('verify', seller.id)}
                              className="text-green-600"
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleSellerAction('reject', seller.id)}
                              className="text-red-600"
                            >
                              <X className="h-4 w-4" />
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
        </CardContent>
      </Card>
      
      {/* বিক্রেতা ভেরিফিকেশন মোডাল */}
      <Dialog open={viewingSeller} onOpenChange={setViewingSeller}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>বিক্রেতা ভেরিফিকেশন</DialogTitle>
            <DialogDescription>
              {selectedSeller?.name} এর ভেরিফিকেশন তথ্য পর্যালোচনা করুন।
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-md p-2">
                <Label>এনআইডি (সামনে)</Label>
                <div className="mt-1 bg-slate-100 h-48 flex items-center justify-center">
                  <FileText size={48} className="text-slate-400" />
                </div>
              </div>
              <div className="border rounded-md p-2">
                <Label>এনআইডি (পিছনে)</Label>
                <div className="mt-1 bg-slate-100 h-48 flex items-center justify-center">
                  <FileText size={48} className="text-slate-400" />
                </div>
              </div>
            </div>
            
            <div className="border rounded-md p-2">
              <Label>ট্রেড লাইসেন্স</Label>
              <div className="mt-1 bg-slate-100 h-32 flex items-center justify-center">
                <FileText size={48} className="text-slate-400" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="space-y-1">
                  <Label>মালিকের নাম</Label>
                  <Input value={verificationDocs.ownerInfo.name} readOnly />
                </div>
                <div className="space-y-1">
                  <Label>এনআইডি নম্বর</Label>
                  <Input value={verificationDocs.ownerInfo.nidNumber} readOnly />
                </div>
                <div className="space-y-1">
                  <Label>ফোন নম্বর</Label>
                  <Input value={verificationDocs.ownerInfo.phone} readOnly />
                </div>
              </div>
              <div className="space-y-2">
                <div className="space-y-1">
                  <Label>ইমেইল</Label>
                  <Input value={verificationDocs.ownerInfo.email} readOnly />
                </div>
                <div className="space-y-1">
                  <Label>ঠিকানা</Label>
                  <Textarea value={verificationDocs.ownerInfo.address} readOnly />
                </div>
              </div>
            </div>
          </div>
          <DialogFooter className="gap-2 sm:gap-0">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                বন্ধ করুন
              </Button>
            </DialogClose>
            {selectedSeller?.status === 'পর্যালোচনা হচ্ছে' && (
              <>
                <Button
                  variant="destructive"
                  onClick={() => {
                    handleSellerAction('reject', selectedSeller.id);
                    setViewingSeller(false);
                  }}
                >
                  প্রত্যাখ্যান করুন
                </Button>
                <Button
                  onClick={() => {
                    handleSellerAction('verify', selectedSeller.id);
                    setViewingSeller(false);
                  }}
                >
                  যাচাই করুন
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SellersTab;
