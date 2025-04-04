
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, MessageCircle, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useApp } from '@/context/AppContext';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from '@/components/ui/use-toast';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Reviews = () => {
  const navigate = useNavigate();
  const { reviews, language, t } = useApp();
  const [selectedTab, setSelectedTab] = useState<string>('my');

  return (
    <div className="container pt-16 pb-20 px-4">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">
          {language === 'bn' ? 'রিভিউ এবং রেটিং' : 'Reviews & Ratings'}
        </h1>
      </div>

      <Tabs defaultValue="my" onValueChange={setSelectedTab}>
        <TabsList className="w-full mb-6">
          <TabsTrigger value="my" className="flex-1">
            {language === 'bn' ? 'আমার রিভিউ' : 'My Reviews'}
          </TabsTrigger>
          <TabsTrigger value="pending" className="flex-1">
            {language === 'bn' ? 'রিভিউ দিন' : 'Pending Reviews'}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="my" className="mt-0">
          <MyReviews />
        </TabsContent>

        <TabsContent value="pending" className="mt-0">
          <PendingReviews />
        </TabsContent>
      </Tabs>
    </div>
  );
};

const MyReviews = () => {
  const { reviews, getUserReviews, language } = useApp();
  // Mock user ID - in a real app you would get this from authentication
  const mockUserId = "user-1";
  
  const myReviews = getUserReviews(mockUserId);
  
  if (myReviews.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <MessageCircle className="h-16 w-16 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium mb-2">
          {language === 'bn' ? 'কোন রিভিউ নেই' : 'No reviews yet'}
        </h3>
        <p className="text-muted-foreground mb-4">
          {language === 'bn'
            ? 'আপনি যে সকল আইটেম বা সেবা রিভিউ করেছেন সেগুলি এখানে দেখা যাবে'
            : 'Reviews you\'ve left will appear here'}
        </p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {myReviews.map((review) => (
        <Card key={review.id}>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <div className="mb-1">
                  <Badge variant="outline">
                    {review.itemType === 'service'
                      ? language === 'bn' ? 'সেবা' : 'Service'
                      : review.itemType === 'product'
                      ? language === 'bn' ? 'পণ্য' : 'Product'
                      : review.itemType === 'rental'
                      ? language === 'bn' ? 'ভাড়া' : 'Rental'
                      : language === 'bn' ? 'আবাসন' : 'Housing'}
                  </Badge>
                </div>
                <h3 className="font-medium">Product/Service Title</h3>
                <div className="flex items-center mt-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < review.rating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
            
            <p className="text-gray-600 text-sm">{review.comment}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

const PendingReviews = () => {
  const { language, addReview } = useApp();
  const { toast } = useToast();
  
  // Mock data - in a real app, this would come from your booking/purchase history
  const pendingItems = [
    {
      id: 'item-1',
      title: 'ফ্যামিলি হোম উত্তরা সেক্টর-১১',
      type: 'housing',
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
      date: '২০/০৩/২০২৫',
    },
    {
      id: 'item-2',
      title: 'ডাক্তার কনসাল্টেশন',
      type: 'service',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80',
      date: '১৫/০৩/২০২৫',
    }
  ];
  
  const [openDialogs, setOpenDialogs] = useState<Record<string, boolean>>({});
  const [reviewData, setReviewData] = useState<Record<string, { rating: number; comment: string }>>({});
  
  const handleOpenChange = (id: string, isOpen: boolean) => {
    setOpenDialogs(prev => ({ ...prev, [id]: isOpen }));
  };
  
  const handleRatingChange = (id: string, rating: number) => {
    setReviewData(prev => ({
      ...prev,
      [id]: { ...prev[id], rating }
    }));
  };
  
  const handleCommentChange = (id: string, comment: string) => {
    setReviewData(prev => ({
      ...prev,
      [id]: { ...prev[id], comment }
    }));
  };
  
  const handleSubmitReview = (item: any) => {
    const data = reviewData[item.id];
    
    if (!data || !data.rating || !data.comment?.trim()) {
      toast({
        title: language === 'bn' ? "অসম্পূর্ণ ফর্ম" : "Incomplete form",
        description: language === 'bn' ? "দয়া করে রেটিং দিন এবং মন্তব্য লিখুন" : "Please provide both rating and comment",
        variant: "destructive"
      });
      return;
    }
    
    // Submit the review
    addReview({
      userId: "user-1", // Mock user ID
      itemId: item.id,
      itemType: item.type,
      rating: data.rating,
      comment: data.comment
    });
    
    // Close the dialog
    handleOpenChange(item.id, false);
  };
  
  if (pendingItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <Star className="h-16 w-16 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium mb-2">
          {language === 'bn' ? 'কোন পেন্ডিং রিভিউ নেই' : 'No pending reviews'}
        </h3>
        <p className="text-muted-foreground mb-4">
          {language === 'bn'
            ? 'আপনি সমস্ত আইটেম রিভিউ করেছেন'
            : 'You\'ve reviewed all your items'}
        </p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {pendingItems.map((item) => (
        <Card key={item.id} className="overflow-hidden">
          <div className="flex">
            <div className="w-1/3">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover aspect-square"
              />
            </div>
            <CardContent className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">
                    {item.type === 'service'
                      ? language === 'bn' ? 'সেবা' : 'Service'
                      : item.type === 'product'
                      ? language === 'bn' ? 'পণ্য' : 'Product'
                      : item.type === 'rental'
                      ? language === 'bn' ? 'ভাড়া' : 'Rental'
                      : language === 'bn' ? 'আবাসন' : 'Housing'}
                  </Badge>
                </div>
                <h3 className="font-medium text-lg mt-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {language === 'bn' ? 'তারিখ:' : 'Date:'} {item.date}
                </p>
              </div>
              
              <Dialog open={openDialogs[item.id]} onOpenChange={(open) => handleOpenChange(item.id, open)}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="mt-4">
                    {language === 'bn' ? 'রিভিউ দিন' : 'Write Review'}
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>
                      {language === 'bn' ? 'আপনার মতামত দিন' : 'Leave your review'}
                    </DialogTitle>
                    <DialogDescription>
                      {language === 'bn'
                        ? 'আপনার অভিজ্ঞতা শেয়ার করুন এবং অন্যদের সিদ্ধান্ত নিতে সাহায্য করুন'
                        : 'Share your experience to help others make better decisions'}
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="py-4">
                    <h4 className="text-sm font-medium mb-2">
                      {language === 'bn' ? 'রেটিং' : 'Rating'}
                    </h4>
                    <Select onValueChange={(val) => handleRatingChange(item.id, parseInt(val))}>
                      <SelectTrigger>
                        <SelectValue placeholder={language === 'bn' ? 'রেটিং নির্বাচন করুন' : 'Select rating'} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">★★★★★ (5)</SelectItem>
                        <SelectItem value="4">★★★★☆ (4)</SelectItem>
                        <SelectItem value="3">★★★☆☆ (3)</SelectItem>
                        <SelectItem value="2">★★☆☆☆ (2)</SelectItem>
                        <SelectItem value="1">★☆☆☆☆ (1)</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <h4 className="text-sm font-medium mb-2 mt-4">
                      {language === 'bn' ? 'মন্তব্য' : 'Comment'}
                    </h4>
                    <Textarea 
                      placeholder={language === 'bn' ? 'আপনার মতামত লিখুন...' : 'Write your review...'}
                      onChange={(e) => handleCommentChange(item.id, e.target.value)}
                    />
                  </div>
                  
                  <DialogFooter>
                    <Button type="submit" onClick={() => handleSubmitReview(item)}>
                      {language === 'bn' ? 'জমা দিন' : 'Submit'}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default Reviews;
