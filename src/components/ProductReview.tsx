
import { useState } from 'react';
import { Star, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface ProductReviewProps {
  productId: string;
}

export const ProductReview = ({ productId }: ProductReviewProps) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const { toast } = useToast();

  const handleSubmitReview = () => {
    if (rating === 0) {
      toast({
        title: "রেটিং দিন",
        description: "অনুগ্রহ করে একটি রেটিং নির্বাচন করুন",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "রিভিউ জমা হয়েছে",
      description: "আপনার মূল্যবান মতামতের জন্য ধন্যবাদ",
    });
    
    // Reset form
    setRating(0);
    setReview('');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-6 w-6 cursor-pointer ${
              star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
            }`}
            onClick={() => setRating(star)}
          />
        ))}
      </div>
      
      <Textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="আপনার অভিজ্ঞতা শেয়ার করুন..."
        className="min-h-[100px]"
      />
      
      <Button onClick={handleSubmitReview} className="w-full">
        <Send className="h-4 w-4 mr-2" />
        রিভিউ জমা দিন
      </Button>
    </div>
  );
};
