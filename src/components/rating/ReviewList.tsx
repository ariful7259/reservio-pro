
import React from 'react';
import { Star, User, ThumbsUp, Shield, Calendar, MessageSquare, Flag } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface Review {
  id: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  createdAt: string;
  isVerifiedPurchase: boolean;
  helpful: number;
  replies?: {
    id: string;
    userName: string;
    userAvatar?: string;
    comment: string;
    createdAt: string;
    isOwner: boolean;
  }[];
}

interface ReviewListProps {
  reviews: Review[];
  entityType: 'product' | 'service' | 'seller';
  onReviewHelpful?: (reviewId: string) => void;
  onReportReview?: (reviewId: string) => void;
}

const ReviewList: React.FC<ReviewListProps> = ({
  reviews,
  entityType,
  onReviewHelpful,
  onReportReview
}) => {
  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {reviews.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">কোন রিভিউ নেই</h3>
            <p className="text-muted-foreground">এখনো কোন রিভিউ দেওয়া হয়নি</p>
          </CardContent>
        </Card>
      ) : (
        <>
          {reviews.map((review) => (
            <Card key={review.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Avatar>
                    {review.userAvatar ? (
                      <AvatarImage src={review.userAvatar} alt={review.userName} />
                    ) : (
                      <AvatarFallback>{review.userName.charAt(0)}</AvatarFallback>
                    )}
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <div className="font-medium">{review.userName}</div>
                        <div className="flex items-center flex-wrap gap-2 mt-1">
                          {renderStars(review.rating)}
                          
                          <span className="text-sm text-muted-foreground flex items-center">
                            <Calendar className="h-3.5 w-3.5 mr-1" />
                            {review.createdAt}
                          </span>
                          
                          {review.isVerifiedPurchase && (
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs">
                              <Shield className="h-3 w-3 mr-1" />
                              ভেরিফাইড {entityType === 'product' ? 'ক্রেতা' : 'ব্যবহারকারী'}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <p>{review.comment}</p>
                      
                      <div className="flex items-center gap-4 mt-3">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 text-xs"
                          onClick={() => onReviewHelpful && onReviewHelpful(review.id)}
                        >
                          <ThumbsUp className="h-3.5 w-3.5 mr-1.5" />
                          উপকারী ({review.helpful})
                        </Button>
                        
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="h-8 text-xs"
                          onClick={() => onReportReview && onReportReview(review.id)}
                        >
                          <Flag className="h-3.5 w-3.5 mr-1.5" />
                          রিপোর্ট
                        </Button>
                      </div>
                      
                      {/* রিভিউয়ের উত্তর */}
                      {review.replies && review.replies.length > 0 && (
                        <div className="mt-4 pl-4 border-l-2 border-muted space-y-3">
                          {review.replies.map((reply) => (
                            <div key={reply.id} className="bg-muted/50 rounded-md p-3">
                              <div className="flex items-start gap-2">
                                <Avatar className="h-6 w-6">
                                  {reply.userAvatar ? (
                                    <AvatarImage src={reply.userAvatar} alt={reply.userName} />
                                  ) : (
                                    <AvatarFallback className="text-xs">{reply.userName.charAt(0)}</AvatarFallback>
                                  )}
                                </Avatar>
                                
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="font-medium text-sm">{reply.userName}</span>
                                    {reply.isOwner && (
                                      <Badge variant="outline" className="text-xs">বিক্রেতা</Badge>
                                    )}
                                  </div>
                                  <p className="text-sm mt-1">{reply.comment}</p>
                                  <span className="text-xs text-muted-foreground mt-1 block">
                                    {reply.createdAt}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </>
      )}
    </div>
  );
};

export default ReviewList;
