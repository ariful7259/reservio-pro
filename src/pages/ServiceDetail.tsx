
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Clock, 
  MapPin, 
  Calendar, 
  User, 
  Star, 
  Check, 
  Heart,
  MessageCircle,
  Share2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TimeSlotPicker from '@/components/TimeSlotPicker';
import { useToast } from '@/components/ui/use-toast';
import { useApp } from '@/context/AppContext';
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const ServiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { language, favorites, addToFavorites, removeFromFavorites, isFavorite, addReview, getItemReviews, addPoints } = useApp();
  
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<{
    date: Date;
    slotId: string;
  } | null>(null);
  
  const [reviews, setReviews] = useState<any[]>([]);
  const [showReviewDialog, setShowReviewDialog] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  
  useEffect(() => {
    // Fetch item reviews
    if (id) {
      const itemReviews = getItemReviews(id);
      setReviews(itemReviews);
    }
  }, [id, getItemReviews]);

  // Mock service data (in a real app, fetch this based on the ID)
  const service = {
    id: id || '1',
    title: 'ডাক্তার কনসাল্টেশন',
    provider: 'মেডিকেল সেন্টার',
    providerImage: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80',
    imageUrl: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80',
    rating: 4.8,
    reviewCount: 127,
    price: 1500,
    discount: 10,
    duration: '৩০ মিনিট',
    location: 'মেডিকেল সেন্টার, ঢাকা',
    description: 'অভিজ্ঞ বিশেষজ্ঞ ডাক্তারদের পরামর্শ পান আপনার সুবিধা অনুযায়ী সময়ে। অ্যাপয়েন্টমেন্ট নিয়ে বিশেষজ্ঞ ডাক্তারের সাথে কথা বলুন এবং আপনার সমস্যার সমাধান পান। সরাসরি ডাক্তারের সাথে কথা বলতে পারবেন, প্রেসক্রিপশন পাবেন এবং ফলোআপ পরামর্শও পাবেন।',
    features: [
      'বিশেষজ্ঞ ডাক্তারের পরামর্শ',
      'ডিজিটাল প্রেসক্রিপশন',
      'ফলোআপ কনসাল্টেশন',
      'মেডিকেল টেস্ট রিপোর্ট রিভিউ',
    ],
    tags: ['মেডিকেল', 'অনলাইন'],
  };

  const discountedPrice = service.discount 
    ? service.price - (service.price * service.discount) / 100 
    : service.price;

  const handleSelectTimeSlot = (date: Date, slotId: string) => {
    setSelectedTimeSlot({ date, slotId });
  };

  const handleBookNow = () => {
    if (!selectedTimeSlot) {
      toast({
        title: language === 'bn' ? "সময় নির্বাচন করুন" : "Select a time slot",
        description: language === 'bn' ? "অ্যাপয়েন্টমেন্ট বুক করতে একটি সময় নির্বাচন করুন" : "Please select a time to book your appointment",
        variant: "destructive",
      });
      return;
    }

    // In a real app, you would make an API call to book the appointment
    toast({
      title: language === 'bn' ? "অ্যাপয়েন্টমেন্ট বুক করা হয়েছে!" : "Appointment booked!",
      description: language === 'bn' ? "আপনার অ্যাপয়েন্টমেন্ট সফলভাবে বুক করা হয়েছে।" : "Your appointment has been successfully booked.",
      variant: "default",
    });
    
    // Add points for booking
    addPoints(20);
    
    navigate('/appointments');
  };
  
  const handleToggleFavorite = () => {
    if (isFavorite(service.id)) {
      removeFromFavorites(service.id);
    } else {
      addToFavorites({
        id: service.id,
        type: 'service',
        title: service.title,
        image: service.imageUrl,
        price: discountedPrice,
        location: service.location
      });
    }
  };
  
  const handleShare = () => {
    // In a real app, you would implement sharing functionality
    toast({
      title: language === 'bn' ? "শেয়ার করা হয়েছে" : "Shared",
      description: language === 'bn' ? "লিংক কপি করা হয়েছে" : "Link copied to clipboard",
    });
  };
  
  const handleSubmitReview = () => {
    if (!reviewComment.trim()) {
      toast({
        title: language === 'bn' ? "অসম্পূর্ণ ফর্ম" : "Incomplete form",
        description: language === 'bn' ? "দয়া করে একটি মন্তব্য লিখুন" : "Please write a comment",
        variant: "destructive",
      });
      return;
    }
    
    // Submit the review
    addReview({
      userId: "user-1", // Mock user ID - in a real app this would come from auth
      itemId: service.id,
      itemType: 'service',
      rating: reviewRating,
      comment: reviewComment
    });
    
    // Reset form and close dialog
    setReviewComment('');
    setReviewRating(5);
    setShowReviewDialog(false);
  };

  return (
    <div className="container px-4 pt-16 pb-20">
      <div className="flex items-center gap-3 mb-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold">{language === 'bn' ? 'সার্ভিস বিবরণ' : 'Service Details'}</h1>
      </div>

      <div className="mb-6 rounded-lg overflow-hidden relative">
        <img
          src={service.imageUrl}
          alt={service.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2 flex flex-col gap-2">
          <Button 
            variant="outline" 
            size="icon" 
            className="bg-white/80 backdrop-blur-sm h-10 w-10 rounded-full"
            onClick={handleToggleFavorite}
          >
            <Heart 
              className={`h-5 w-5 ${isFavorite(service.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
            />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            className="bg-white/80 backdrop-blur-sm h-10 w-10 rounded-full"
            onClick={handleShare}
          >
            <Share2 className="h-5 w-5 text-gray-600" />
          </Button>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold">{service.title}</h2>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                <span className="text-sm">{service.rating.toFixed(1)}</span>
              </div>
              <span className="text-sm text-muted-foreground">
                ({service.reviewCount} {language === 'bn' ? 'রিভিউস' : 'reviews'})
              </span>
              <Button variant="ghost" size="sm" className="text-primary text-sm px-2 h-6" onClick={() => setShowReviewDialog(true)}>
                <MessageCircle className="h-3 w-3 mr-1" />
                {language === 'bn' ? 'রিভিউ লিখুন' : 'Write a review'}
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-lg font-bold text-primary">
              ৳{discountedPrice}
            </span>
            {service.discount && (
              <span className="text-sm line-through text-muted-foreground">
                ৳{service.price}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 mt-4">
          <div className="h-10 w-10 rounded-full overflow-hidden">
            <img
              src={service.providerImage}
              alt={service.provider}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-medium">{service.provider}</h3>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{service.duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{service.location}</span>
          </div>
        </div>
      </div>

      <Tabs defaultValue="details" className="mb-6">
        <TabsList className="w-full">
          <TabsTrigger value="details" className="flex-1">{language === 'bn' ? 'বিবরণ' : 'Details'}</TabsTrigger>
          <TabsTrigger value="reviews" className="flex-1">{language === 'bn' ? 'রিভিউ' : 'Reviews'}</TabsTrigger>
          <TabsTrigger value="booking" className="flex-1">{language === 'bn' ? 'বুকিং' : 'Booking'}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="details" className="mt-4">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">{language === 'bn' ? 'বিবরণ' : 'Description'}</h3>
              <p className="text-sm text-muted-foreground">{service.description}</p>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="font-semibold mb-2">{language === 'bn' ? 'বৈশিষ্ট্য' : 'Features'}</h3>
              <ul className="space-y-2">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="font-semibold mb-2">{language === 'bn' ? 'ট্যাগস' : 'Tags'}</h3>
              <div className="flex flex-wrap gap-2">
                {service.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="reviews" className="mt-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">{language === 'bn' ? 'রিভিউ ও রেটিং' : 'Reviews & Ratings'}</h3>
              <Button variant="outline" size="sm" onClick={() => setShowReviewDialog(true)}>
                {language === 'bn' ? 'রিভিউ লিখুন' : 'Write a review'}
              </Button>
            </div>
            
            {reviews.length === 0 ? (
              <div className="text-center py-8 border rounded-lg bg-muted/10">
                <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                <h3 className="text-lg font-medium mb-1">
                  {language === 'bn' ? 'কোন রিভিউ নেই' : 'No reviews yet'}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {language === 'bn'
                    ? 'এই সেবার জন্য প্রথম রিভিউ দিন'
                    : 'Be the first to review this service'}
                </p>
                <Button variant="outline" onClick={() => setShowReviewDialog(true)}>
                  {language === 'bn' ? 'রিভিউ লিখুন' : 'Write a review'}
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {reviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between">
                        <div className="flex items-center gap-3">
                          <div className="bg-primary/10 h-10 w-10 rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium">
                              {language === 'bn' ? 'ব্যবহারকারী' : 'User'}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {new Date(review.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        <div className="flex">
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
                        </div>
                      </div>
                      <p className="text-sm mt-3">{review.comment}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="booking" className="mt-4">
          <div className="space-y-4">
            <TimeSlotPicker onSelectTimeSlot={handleSelectTimeSlot} />
            
            <Card className="border shadow-sm">
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-3">
                  {language === 'bn' ? 'বুকিং সারাংশ' : 'Booking Summary'}
                </h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      {language === 'bn' ? 'সার্ভিস' : 'Service'}
                    </span>
                    <span>{service.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      {language === 'bn' ? 'সময়কাল' : 'Duration'}
                    </span>
                    <span>{service.duration}</span>
                  </div>
                  {selectedTimeSlot && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        {language === 'bn' ? 'সময়' : 'Time'}
                      </span>
                      <span>{selectedTimeSlot.date.toLocaleDateString()}</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span>{language === 'bn' ? 'মোট' : 'Total'}</span>
                    <span>৳{discountedPrice}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Button
              onClick={handleBookNow}
              className="w-full"
            >
              {language === 'bn' ? 'এখনই বুক করুন' : 'Book Now'}
            </Button>
          </div>
        </TabsContent>
      </Tabs>
      
      <Dialog open={showReviewDialog} onOpenChange={setShowReviewDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {language === 'bn' ? 'রিভিউ লিখুন' : 'Write a Review'}
            </DialogTitle>
            <DialogDescription>
              {language === 'bn'
                ? 'আপনার অভিজ্ঞতা অন্যদের সাথে শেয়ার করুন'
                : 'Share your experience with others'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <h4 className="text-sm font-medium mb-2">
              {language === 'bn' ? 'রেটিং' : 'Rating'}
            </h4>
            <Select value={reviewRating.toString()} onValueChange={(value) => setReviewRating(parseInt(value))}>
              <SelectTrigger>
                <SelectValue />
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
              placeholder={language === 'bn' ? 'আপনার অভিজ্ঞতা সম্পর্কে লিখুন...' : 'Write about your experience...'}
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
              rows={4}
            />
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowReviewDialog(false)}>
              {language === 'bn' ? 'বাতিল' : 'Cancel'}
            </Button>
            <Button onClick={handleSubmitReview}>
              {language === 'bn' ? 'জমা দিন' : 'Submit'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ServiceDetail;
