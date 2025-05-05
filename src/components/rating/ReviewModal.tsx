
import React, { useState } from 'react';
import { Star, MessageSquare, Send, User, ShieldCheck } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface ReviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  transaction: {
    id: string;
    counterparty: string;
    date: string;
    description: string;
    amount: number;
  };
  onReviewSubmit?: (review: ReviewData) => void;
}

export interface ReviewData {
  transactionId: string;
  rating: number;
  comment: string;
  targetUser: string;
}

const ReviewModal: React.FC<ReviewModalProps> = ({
  open,
  onOpenChange,
  transaction,
  onReviewSubmit
}) => {
  const { toast } = useToast();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    if (rating === 0) {
      toast({
        title: "রেটিং প্রয়োজন",
        description: "দয়া করে স্টার রেটিং দিন",
        variant: "destructive"
      });
      return;
    }
    
    if (!comment.trim()) {
      toast({
        title: "রিভিউ প্রয়োজন",
        description: "দয়া করে একটি সংক্ষিপ্ত রিভিউ লিখুন",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // রিভিউ ডাটা তৈরি
    const reviewData: ReviewData = {
      transactionId: transaction.id,
      rating,
      comment,
      targetUser: transaction.counterparty
    };
    
    // সিমুলেট API কল
    setTimeout(() => {
      setIsSubmitting(false);
      
      if (onReviewSubmit) {
        onReviewSubmit(reviewData);
      }
      
      toast({
        title: "রিভিউ সাবমিট করা হয়েছে",
        description: "আপনার রিভিউ সফলভাবে জমা হয়েছে।",
      });
      
      // রিসেট ও বন্ধ
      setRating(0);
      setComment('');
      onOpenChange(false);
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>রিভিউ এবং রেটিং দিন</DialogTitle>
          <DialogDescription>
            আপনার অভিজ্ঞতা শেয়ার করুন এবং অন্যদের সিদ্ধান্ত নিতে সাহায্য করুন
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="bg-muted rounded-lg p-3 mb-4 text-sm">
            <div className="flex items-start gap-3">
              <User className="h-10 w-10 rounded-full bg-primary/10 p-2 text-primary" />
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">{transaction.counterparty}</h4>
                  <Badge variant="outline" className="text-xs">বিক্রেতা</Badge>
                </div>
                <p className="text-muted-foreground mt-1">{transaction.description}</p>
                <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                  <span>ট্রানজেকশন: {transaction.id}</span>
                  <span>•</span>
                  <span>৳{transaction.amount}</span>
                  <span>•</span>
                  <span>{transaction.date}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {/* স্টার রেটিং */}
            <div>
              <label className="text-sm font-medium mb-1.5 block">স্টার রেটিং দিন</label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`h-8 w-8 ${
                        star <= (hoveredRating || rating)
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-300'
                      } transition-colors`}
                    />
                  </button>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {rating === 1 && "খুব খারাপ অভিজ্ঞতা"}
                {rating === 2 && "মোটামুটি"}
                {rating === 3 && "ভালো"}
                {rating === 4 && "খুব ভালো"}
                {rating === 5 && "চমৎকার অভিজ্ঞতা"}
              </p>
            </div>

            {/* রিভিউ টেক্সট */}
            <div>
              <label className="text-sm font-medium mb-1.5 block">আপনার অভিজ্ঞতা শেয়ার করুন</label>
              <Textarea
                placeholder="আপনার অভিজ্ঞতা সম্পর্কে লিখুন..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="min-h-[100px]"
              />
              <p className="text-xs text-muted-foreground mt-1">
                <ShieldCheck className="h-3 w-3 inline mr-1" />
                আপনার রিভিউ সবার সামনে প্রকাশিত হবে
              </p>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            বাতিল
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                সাবমিট হচ্ছে...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                রিভিউ সাবমিট করুন
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewModal;
