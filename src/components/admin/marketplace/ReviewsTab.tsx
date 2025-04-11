
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
import { Badge } from '@/components/ui/badge';
import { 
  Filter, 
  Search, 
  Check, 
  X, 
  Star,
  EyeIcon
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

// Mock reviews
const reviews = [
  { id: 1, product: 'স্মার্টফোন ১২৮জিবি', user: 'আব্দুল্লাহ খান', rating: 5, comment: 'খুবই ভালো প্রোডাক্ট, দ্রুত ডেলিভারি পেয়েছি', status: 'অনুমোদিত', date: '১১ মার্চ, ২০২৩' },
  { id: 2, product: 'ওয়্যারলেস হেডফোন', user: 'ফারিয়া রহমান', rating: 2, comment: 'সাউন্ড কোয়ালিটি ভালো না, ব্যাটারি লাইফও কম', status: 'পর্যালোচনা হচ্ছে', date: '১৬ মে, ২০২৩' },
  { id: 3, product: 'শিশুদের খেলনা সেট', user: 'রাকিব হাসান', rating: 4, comment: 'আমার বাচ্চা খুবই পছন্দ করেছে, ভালো প্রোডাক্ট', status: 'অনুমোদিত', date: '২১ জুন, ২০২৩' },
  { id: 4, product: 'আইরন ফ্রাইং প্যান', user: 'সাবরিনা আক্তার', rating: 1, comment: 'খুবই খারাপ প্রোডাক্ট, ২ দিন ব্যবহারের পরেই নষ্ট হয়ে গেছে', status: 'প্রত্যাখ্যাত', date: '১৩ আগস্ট, ২০২৩' },
];

const ReviewsTab = () => {
  const { toast } = useToast();
  const [selectedReview, setSelectedReview] = useState<any>(null);
  const [viewingReview, setViewingReview] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [ratingFilter, setRatingFilter] = useState('all');
  
  // Filter reviews based on search, status, and rating
  const filteredReviews = reviews.filter(review => {
    const matchesSearch = 
      review.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      statusFilter === 'all' || 
      (statusFilter === 'approved' && review.status === 'অনুমোদিত') ||
      (statusFilter === 'pending' && review.status === 'পর্যালোচনা হচ্ছে') ||
      (statusFilter === 'rejected' && review.status === 'প্রত্যাখ্যাত');
    
    const matchesRating = 
      ratingFilter === 'all' || 
      review.rating === parseInt(ratingFilter);
    
    return matchesSearch && matchesStatus && matchesRating;
  });

  const handleReviewAction = (action: string, reviewId: number) => {
    // Handle review actions (approve, reject)
    const review = reviews.find(r => r.id === reviewId);
    
    if (action === 'view') {
      setSelectedReview(review);
      setViewingReview(true);
    } else if (action === 'approve') {
      toast({
        title: "রিভিউ অনুমোদিত হয়েছে",
        description: `রিভিউটি সফলভাবে অনুমোদিত হয়েছে।`,
      });
    } else if (action === 'reject') {
      toast({
        title: "রিভিউ প্রত্যাখ্যাত হয়েছে",
        description: `রিভিউটি প্রত্যাখ্যাত করা হয়েছে।`,
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
                placeholder="রিভিউ খুঁজুন"
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
                  <SelectItem value="approved">অনুমোদিত</SelectItem>
                  <SelectItem value="pending">পর্যালোচনা হচ্ছে</SelectItem>
                  <SelectItem value="rejected">প্রত্যাখ্যাত</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={ratingFilter} onValueChange={setRatingFilter}>
                <SelectTrigger className="w-[180px] h-9">
                  <Filter className="h-3.5 w-3.5 mr-2" />
                  <SelectValue placeholder="রেটিং ফিল্টার" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">সকল রেটিং</SelectItem>
                  <SelectItem value="5">5 স্টার</SelectItem>
                  <SelectItem value="4">4 স্টার</SelectItem>
                  <SelectItem value="3">3 স্টার</SelectItem>
                  <SelectItem value="2">2 স্টার</SelectItem>
                  <SelectItem value="1">1 স্টার</SelectItem>
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
                  <TableHead>প্রোডাক্ট</TableHead>
                  <TableHead>ব্যবহারকারী</TableHead>
                  <TableHead>রেটিং</TableHead>
                  <TableHead>তারিখ</TableHead>
                  <TableHead>স্ট্যাটাস</TableHead>
                  <TableHead className="text-right">অ্যাকশন</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReviews.map((review) => (
                  <TableRow key={review.id}>
                    <TableCell className="font-medium">{review.product}</TableCell>
                    <TableCell>{review.user}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Star className="fill-yellow-500 text-yellow-500 h-4 w-4 mr-1" />
                        <span>{review.rating}</span>
                      </div>
                    </TableCell>
                    <TableCell>{review.date}</TableCell>
                    <TableCell>
                      <Badge variant={
                        review.status === 'অনুমোদিত' ? 'default' : 
                        review.status === 'পর্যালোচনা হচ্ছে' ? 'warning' : 
                        'destructive'
                      }>
                        {review.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleReviewAction('view', review.id)}
                        >
                          <EyeIcon className="h-4 w-4" />
                        </Button>
                        
                        {review.status === 'পর্যালোচনা হচ্ছে' && (
                          <>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleReviewAction('approve', review.id)}
                              className="text-green-600"
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleReviewAction('reject', review.id)}
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
      
      {/* রিভিউ বিস্তারিত মোডাল */}
      <Dialog open={viewingReview} onOpenChange={setViewingReview}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>রিভিউ বিস্তারিত</DialogTitle>
            <DialogDescription>
              {selectedReview?.product} প্রোডাক্টের রিভিউ।
            </DialogDescription>
          </DialogHeader>
          {selectedReview && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">{selectedReview.user}</h3>
                  <p className="text-sm text-muted-foreground">{selectedReview.date}</p>
                </div>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < selectedReview.rating
                          ? "fill-yellow-500 text-yellow-500"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
              
              <div className="p-4 border rounded-md bg-gray-50">
                <p>{selectedReview.comment}</p>
              </div>
              
              <div className="flex items-center gap-2">
                <Badge variant={
                  selectedReview.status === 'অনুমোদিত' ? 'default' : 
                  selectedReview.status === 'পর্যালোচনা হচ্ছে' ? 'warning' : 
                  'destructive'
                }>
                  {selectedReview.status}
                </Badge>
                
                {selectedReview.status === 'প্রত্যাখ্যাত' && (
                  <p className="text-sm text-muted-foreground">অশালীন ভাষা ব্যবহারের কারণে প্রত্যাখ্যাত</p>
                )}
              </div>
            </div>
          )}
          <DialogFooter className="gap-2 sm:gap-0">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                বন্ধ করুন
              </Button>
            </DialogClose>
            {selectedReview?.status === 'পর্যালোচনা হচ্ছে' && (
              <>
                <Button
                  variant="destructive"
                  onClick={() => {
                    handleReviewAction('reject', selectedReview.id);
                    setViewingReview(false);
                  }}
                >
                  প্রত্যাখ্যান করুন
                </Button>
                <Button
                  onClick={() => {
                    handleReviewAction('approve', selectedReview.id);
                    setViewingReview(false);
                  }}
                >
                  অনুমোদন করুন
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ReviewsTab;
