import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  Star, 
  MessageSquare, 
  ThumbsUp, 
  Clock, 
  Filter,
  Reply
} from 'lucide-react';

const CreatorReviewsTab = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState('');

  const reviews = [
    {
      id: 1,
      client: 'আহমেদ হাসান',
      rating: 5,
      comment: 'অসাধারণ কাজ! সময়মতো ডেলিভারি এবং দুর্দান্ত ডিজাইন। আবারও কাজ করাব।',
      service: 'লোগো ডিজাইন',
      date: '২৫ ডিসেম্বর ২০২৪',
      status: 'published',
      helpful: 8,
      hasReply: false
    },
    {
      id: 2,
      client: 'ফাতিমা খাতুন',
      rating: 4,
      comment: 'ভালো কাজ করেছেন। তবে একটু দেরি হয়েছিল। সামগ্রিকভাবে সন্তুষ্ট।',
      service: 'ওয়েবসাইট ডিজাইন',
      date: '২০ ডিসেম্বর ২০২৪',
      status: 'pending_response',
      helpful: 3,
      hasReply: false
    },
    {
      id: 3,
      client: 'মো. রহিম',
      rating: 5,
      comment: 'চমৎকার সেবা! প্রফেশনাল এপ্রোচ এবং সুন্দর কাজ। রেকমেন্ড করব।',
      service: 'ব্র্যান্ডিং',
      date: '১৮ ডিসেম্বর ২০২৪',
      status: 'published',
      helpful: 12,
      hasReply: true,
      reply: 'ধন্যবাদ! আপনার সাথে কাজ করে আনন্দিত।'
    }
  ];

  const reviewStats = {
    total: 26,
    average: 4.8,
    distribution: [
      { stars: 5, count: 18, percentage: 69 },
      { stars: 4, count: 6, percentage: 23 },
      { stars: 3, count: 2, percentage: 8 },
      { stars: 2, count: 0, percentage: 0 },
      { stars: 1, count: 0, percentage: 0 }
    ]
  };

  const filteredReviews = reviews.filter(review => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'pending') return review.status === 'pending_response';
    if (selectedFilter === 'replied') return review.hasReply;
    return true;
  });

  const handleReply = (reviewId: number) => {
    console.log(`Reply to review ${reviewId}: ${replyText}`);
    setReplyingTo(null);
    setReplyText('');
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      {/* Review Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>রিভিউ সংক্ষিপ্ত</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <div>
                <div className="text-4xl font-bold">{reviewStats.average}</div>
                <div className="flex justify-center">
                  {renderStars(Math.round(reviewStats.average))}
                </div>
                <div className="text-sm text-muted-foreground">{reviewStats.total} রিভিউ</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>রেটিং বিতরণ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {reviewStats.distribution.map((item) => (
                <div key={item.stars} className="flex items-center gap-3">
                  <div className="flex items-center gap-1 w-12">
                    <span className="text-sm">{item.stars}</span>
                    <Star className="h-3 w-3 text-yellow-400 fill-current" />
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-yellow-400 h-2 rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                  <div className="text-sm text-muted-foreground w-12">
                    {item.count}টি
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Options */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedFilter === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedFilter('all')}
        >
          সব রিভিউ ({reviews.length})
        </Button>
        <Button
          variant={selectedFilter === 'pending' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedFilter('pending')}
        >
          <Clock className="h-4 w-4 mr-1" />
          উত্তরের জন্য অপেক্ষমাণ
        </Button>
        <Button
          variant={selectedFilter === 'replied' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedFilter('replied')}
        >
          <Reply className="h-4 w-4 mr-1" />
          উত্তর দেওয়া হয়েছে
        </Button>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Review Header */}
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="font-medium text-primary">
                          {review.client.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{review.client}</p>
                        <p className="text-sm text-muted-foreground">{review.service}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {renderStars(review.rating)}
                      </div>
                      <span className="text-sm text-muted-foreground">{review.date}</span>
                    </div>
                  </div>
                  <Badge variant={review.status === 'published' ? 'default' : 'secondary'}>
                    {review.status === 'published' ? 'প্রকাশিত' : 'উত্তর প্রয়োজন'}
                  </Badge>
                </div>

                {/* Review Content */}
                <div className="space-y-3">
                  <p className="text-gray-700">{review.comment}</p>
                  
                  {/* Existing Reply */}
                  {review.hasReply && review.reply && (
                    <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                      <div className="flex items-start gap-2">
                        <MessageSquare className="h-4 w-4 text-blue-600 mt-1" />
                        <div>
                          <p className="text-sm font-medium text-blue-800">আপনার উত্তর:</p>
                          <p className="text-sm text-blue-700">{review.reply}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Reply Form */}
                  {replyingTo === review.id && (
                    <div className="space-y-3">
                      <Textarea
                        placeholder="আপনার উত্তর লিখুন..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        rows={3}
                      />
                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => handleReply(review.id)}>
                          উত্তর পাঠান
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => setReplyingTo(null)}>
                          বাতিল
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <ThumbsUp className="h-4 w-4" />
                      <span>{review.helpful} জন সহায়ক মনে করেছেন</span>
                    </div>
                    {!review.hasReply && replyingTo !== review.id && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setReplyingTo(review.id)}
                      >
                        <Reply className="h-4 w-4 mr-1" />
                        উত্তর দিন
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <Button variant="outline">
          আরো রিভিউ দেখুন
        </Button>
      </div>
    </div>
  );
};

export default CreatorReviewsTab;
