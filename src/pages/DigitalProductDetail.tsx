
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Star, 
  Heart, 
  ShoppingCart, 
  Share2, 
  Download, 
  Play,
  FileText,
  Shield,
  ArrowLeft,
  MessageCircle,
  ThumbsUp,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/components/ui/use-toast';
import { useShoppingState } from '@/hooks/useShoppingState';

const DigitalProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addToCart, toggleWishlist, isInWishlist } = useShoppingState();
  
  const [showPreview, setShowPreview] = useState(false);
  
  // In a real app, you'd fetch this data from an API based on the productId
  const product = {
    id: productId || '1',
    title: 'ডিজিটাল মার্কেটিং মাস্টার কোর্স',
    description: 'আধুনিক ডিজিটাল মার্কেটিং কৌশল সম্পর্কে সম্পূর্ণ জ্ঞান অর্জন করুন। এই কোর্সে আপনি সোশ্যাল মিডিয়া মার্কেটিং, এসইও, কনটেন্ট মার্কেটিং, ইমেইল মার্কেটিং এবং পেইড মার্কেটিং টেকনিক শিখবেন।',
    longDescription: `এই কোর্স আপনাকে ডিজিটাল মার্কেটিং এর সকল দিক সম্পর্কে শেখাবে:

- **সোশ্যাল মিডিয়া স্ট্র্যাটেজি**: ফেসবুক, ইনস্টাগ্রাম, লিংকডইন সহ বিভিন্ন প্ল্যাটফর্মের জন্য কার্যকরী কৌশল
- **এসইও মাস্টারি**: সার্চ ইঞ্জিন র‍্যাঙ্কিং বাড়ানোর সেরা পদ্ধতি
- **কনটেন্ট ক্রিয়েশন**: দর্শক আকর্ষণ করার জন্য উন্নত কনটেন্ট তৈরির টেকনিক
- **ইমেইল মার্কেটিং**: কনভার্সন রেট বাড়ানোর উপায়
- **এনালিটিক্স**: ডাটা ব্যবহার করে মার্কেটিং কৌশল উন্নত করা

কোর্স সম্পূর্ণ করার পর আপনি একটি সার্টিফিকেট পাবেন যা আপনার সিভিতে যোগ করতে পারবেন।

শিক্ষক: মোঃ কামাল হোসেন (ডিজিটাল মার্কেটিং স্পেশালিস্ট, ৮ বছরের অভিজ্ঞতা)`,
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
    price: '৳৫,৯৯৯',
    rawPrice: 5999,
    discountPrice: '৳৪,৯৯৯',
    discountRawPrice: 4999,
    category: 'কোর্স',
    rating: 4.8,
    reviewCount: 256,
    author: {
      name: 'মোঃ কামাল হোসেন',
      avatar: 'https://i.pravatar.cc/150?img=12',
      bio: 'ডিজিটাল মার্কেটিং স্পেশালিস্ট | ৮+ বছরের অভিজ্ঞতা',
      totalStudents: 4500
    },
    features: [
      '১৫টি মডিউল',
      '৫০+ ভিডিও লেসন',
      'লাইফটাইম অ্যাকসেস',
      'প্রজেক্ট ওয়ার্ক',
      'সার্টিফিকেট',
      'কমিউনিটি সাপোর্ট'
    ],
    previewVideo: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    relatedProducts: [
      {
        id: '2',
        title: 'ফেসবুক মার্কেটিং স্পেশালাইজেশন',
        image: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868',
        price: '৳২,৯৯৯',
        rating: 4.6
      },
      {
        id: '3',
        title: 'কনটেন্ট রাইটিং মাস্টারক্লাস',
        image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a',
        price: '৳১,৯৯৯',
        rating: 4.7
      },
      {
        id: '4',
        title: 'এসইও ফান্ডামেন্টালস',
        image: 'https://images.unsplash.com/photo-1562577309-4932fdd64cd1',
        price: '৳২,৪৯৯',
        rating: 4.5
      }
    ],
    reviews: [
      {
        id: '1',
        userName: 'রাকিব হাসান',
        userAvatar: 'https://i.pravatar.cc/150?img=59',
        rating: 5,
        date: '১০ মে, ২০২৫',
        comment: 'অত্যন্ত চমৎকার কোর্স! আমি এই কোর্স থেকে অনেক কিছু শিখেছি এবং এখন বেশ কয়েকটি ক্লায়েন্টের সাথে কাজ করছি।',
        helpful: 24
      },
      {
        id: '2',
        userName: 'সাদিয়া আক্তার',
        userAvatar: 'https://i.pravatar.cc/150?img=44',
        rating: 4,
        date: '২৫ এপ্রিল, ২০২৫',
        comment: 'ভালো কোর্স, তবে আরও বেশি প্র্যাকটিক্যাল উদাহরণ থাকলে ভালো হতো। যাইহোক, কন্টেন্ট গুণমান উচ্চমানের।',
        helpful: 12
      },
      {
        id: '3',
        userName: 'আরিফ হোসেন',
        userAvatar: 'https://i.pravatar.cc/150?img=68',
        rating: 5,
        date: '১৫ এপ্রিল, ২০২৫',
        comment: 'এই কোর্সের মাধ্যমে আমি আমার নিজের ব্যবসার সোশ্যাল মিডিয়া প্রেজেন্স অনেক উন্নত করতে পেরেছি। ইনস্ট্রাক্টর খুব ভালভাবে সবকিছু বুঝিয়েছেন।',
        helpful: 18
      }
    ]
  };

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.discountPrice || product.price,
      quantity: 1,
      image: product.image
    });
    
    toast({
      title: "কার্টে যোগ করা হয়েছে",
      description: `${product.title} কার্টে যোগ করা হয়েছে।`,
    });
  };

  const handleToggleWishlist = () => {
    toggleWishlist({
      id: product.id,
      title: product.title,
      price: product.discountPrice || product.price,
      image: product.image
    });
    
    toast({
      title: isInWishlist(product.id) ? "উইশলিস্ট থেকে সরানো হয়েছে" : "উইশলিস্টে যোগ করা হয়েছে",
      description: isInWishlist(product.id) 
        ? `${product.title} উইশলিস্ট থেকে সরানো হয়েছে।` 
        : `${product.title} উইশলিস্টে যোগ করা হয়েছে।`,
    });
  };

  return (
    <div className="container pt-20 pb-16">
      {/* Back Button */}
      <Button 
        variant="ghost" 
        size="sm" 
        className="mb-4" 
        onClick={() => navigate('/digital-products')}
      >
        <ArrowLeft className="h-4 w-4 mr-1" /> ফিরে যান
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Product Image & Preview */}
        <div className="lg:col-span-2">
          <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
            {showPreview ? (
              <iframe 
                src={product.previewVideo} 
                className="w-full h-full" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen 
              />
            ) : (
              <>
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="w-full h-full object-cover" 
                />
                <Button 
                  variant="default" 
                  size="lg"
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  onClick={() => setShowPreview(true)}
                >
                  <Play className="h-5 w-5 mr-2" /> প্রিভিউ দেখুন
                </Button>
              </>
            )}
          </div>
          
          {/* Product Description and Tabs */}
          <div className="mt-6">
            <Tabs defaultValue="description">
              <TabsList className="mb-4">
                <TabsTrigger value="description">বিবরণ</TabsTrigger>
                <TabsTrigger value="curriculum">কারিকুলাম</TabsTrigger>
                <TabsTrigger value="reviews">রিভিউ</TabsTrigger>
                <TabsTrigger value="author">প্রশিক্ষক</TabsTrigger>
              </TabsList>
              
              <TabsContent value="description" className="text-gray-700 space-y-4">
                <div dangerouslySetInnerHTML={{ __html: product.longDescription.replace(/\n/g, '<br/>') }} />
              </TabsContent>
              
              <TabsContent value="curriculum">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">কোর্স কারিকুলাম</h3>
                  <div className="space-y-2">
                    {[
                      "মডিউল ১: ডিজিটাল মার্কেটিং ফান্ডামেন্টালস",
                      "মডিউল ২: সোশ্যাল মিডিয়া মার্কেটিং - ফেসবুক",
                      "মডিউল ৩: সোশ্যাল মিডিয়া মার্কেটিং - ইনস্টাগ্রাম",
                      "মডিউল ৪: সোশ্যাল মিডিয়া মার্কেটিং - লিংকডইন",
                      "মডিউল ৫: সার্চ ইঞ্জিন অপটিমাইজেশন (SEO)",
                      "মডিউল ৬: কনটেন্ট মার্কেটিং স্ট্র্যাটেজি"
                    ].map((module, index) => (
                      <div key={index} className="p-3 border rounded-md flex justify-between items-center">
                        <span>{module}</span>
                        <Badge variant="outline">৩-৫ ঘন্টা</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="reviews">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold">{product.rating}</div>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-4 w-4 ${
                              star <= Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">{product.reviewCount} রিভিউ</div>
                    </div>
                    <Separator orientation="vertical" className="h-12" />
                    <div className="space-y-1">
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <div key={rating} className="flex items-center gap-2">
                          <span className="text-xs">{rating}</span>
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <div className="w-40 h-2 bg-gray-200 rounded-full">
                            <div 
                              className="h-2 bg-yellow-400 rounded-full" 
                              style={{ 
                                width: `${
                                  rating === 5 ? '70%' : 
                                  rating === 4 ? '20%' : 
                                  rating === 3 ? '7%' : 
                                  rating === 2 ? '2%' : '1%'
                                }` 
                              }} 
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-6">
                    {product.reviews.map((review) => (
                      <div key={review.id} className="space-y-2">
                        <div className="flex items-start">
                          <Avatar className="h-10 w-10 mr-3">
                            <AvatarImage src={review.userAvatar} alt={review.userName} />
                            <AvatarFallback>{review.userName.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{review.userName}</div>
                            <div className="flex items-center gap-2">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`h-3 w-3 ${
                                    star <= review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                                  }`}
                                />
                              ))}
                              <span className="text-muted-foreground text-sm">{review.date}</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" className="text-xs">
                            <ThumbsUp className="h-3 w-3 mr-1" />
                            উপকারী ({review.helpful})
                          </Button>
                        </div>
                        <Separator className="mt-4" />
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="author">
                <div className="flex items-start gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={product.author.avatar} alt={product.author.name} />
                    <AvatarFallback>{product.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-medium">{product.author.name}</h3>
                    <p className="text-muted-foreground">{product.author.bio}</p>
                    <div className="mt-3 flex gap-4">
                      <div>
                        <span className="text-lg font-medium">{product.author.totalStudents.toLocaleString()}</span>
                        <p className="text-xs text-muted-foreground">শিক্ষার্থী</p>
                      </div>
                      <div>
                        <span className="text-lg font-medium">{product.reviewCount}</span>
                        <p className="text-xs text-muted-foreground">রিভিউ</p>
                      </div>
                      <div>
                        <span className="text-lg font-medium">{product.rating}</span>
                        <p className="text-xs text-muted-foreground">গড় রেটিং</p>
                      </div>
                    </div>
                    <Button variant="outline" className="mt-4">
                      <User className="h-4 w-4 mr-2" />
                      প্রোফাইল দেখুন
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Right Column - Product Details and Purchase */}
        <div>
          <Card>
            <CardContent className="p-6 space-y-4">
              <Badge className="mb-2">{product.category}</Badge>
              <h1 className="text-2xl font-bold">{product.title}</h1>
              
              <div className="flex items-center gap-1">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${
                        star <= Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm">({product.rating}) • {product.reviewCount} রিভিউ</span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-primary">{product.discountPrice || product.price}</span>
                {product.discountPrice && (
                  <span className="text-muted-foreground line-through">{product.price}</span>
                )}
                {product.discountPrice && (
                  <Badge variant="secondary" className="ml-auto">
                    {Math.round((1 - product.discountRawPrice / product.rawPrice) * 100)}% ছাড়
                  </Badge>
                )}
              </div>
              
              <div className="space-y-2 mt-4">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              
              <div className="space-y-3 pt-4">
                <Button className="w-full" size="lg" onClick={handleAddToCart}>
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  কার্টে যোগ করুন
                </Button>
                
                <Button variant="outline" className="w-full" size="lg" onClick={handleToggleWishlist}>
                  <Heart className={`h-4 w-4 mr-2 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
                  {isInWishlist(product.id) ? 'উইশলিস্ট থেকে সরান' : 'উইশলিস্টে যোগ করুন'}
                </Button>
                
                <Button variant="ghost" className="w-full" size="lg">
                  <Share2 className="h-4 w-4 mr-2" />
                  শেয়ার করুন
                </Button>
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4" />
                <span>৩০ দিনের মানি-ব্যাক গ্যারান্টি</span>
              </div>
            </CardContent>
          </Card>
          
          {/* Related Products */}
          <div className="mt-6">
            <h3 className="font-medium mb-3">আরও আকর্ষণীয় কোর্স</h3>
            <div className="space-y-3">
              {product.relatedProducts.map((item) => (
                <div 
                  key={item.id} 
                  className="flex gap-3 p-2 border rounded-lg cursor-pointer hover:bg-gray-50"
                  onClick={() => navigate(`/digital-products/${item.id}`)}
                >
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="h-16 w-16 object-cover rounded" 
                  />
                  <div className="flex-1">
                    <h4 className="font-medium line-clamp-2">{item.title}</h4>
                    <div className="flex justify-between items-center mt-1">
                      <div className="flex items-center">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs ml-1">{item.rating}</span>
                      </div>
                      <span className="font-semibold text-primary">{item.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigitalProductDetail;
