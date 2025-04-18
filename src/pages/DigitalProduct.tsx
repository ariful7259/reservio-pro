import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  Star, 
  Download, 
  Share2, 
  Heart, 
  ShoppingCart, 
  Globe, 
  Shield, 
  MessageSquare,
  Award,
  Clock,
  Users,
  FileText,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from "@/components/ui/use-toast";

const DigitalProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [wishlist, setWishlist] = useState(false);

  const product = {
    id: id,
    title: "প্রিমিয়াম UI ডিজাইন টেমপ্লেট কালেকশন",
    description: "১০০+ পেজ টেমপ্লেট সহ কমপ্লিট UI/UX ডিজাইন কিট। ফিগমা, স্কেচ এবং XD ফরম্যাটে উপলব্ধ। সকল টেমপ্লেট রেসপনসিভ এবং কমার্শিয়াল অ্যাপ্লিকেশনে ব্যবহার করা যাবে।",
    price: "৳৪,৫০০",
    discountPrice: "৳২,৯৯৯",
    rating: 4.8,
    reviewCount: 56,
    sales: 235,
    createdAt: "জানুয়ারি ১০, ২০২৩",
    updatedAt: "মার্চ ০৫, ২০২৩",
    category: "UI/UX টেমপ্লেট",
    images: [
      "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560807707-8cc77767d783?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=1000&auto=format&fit=crop"
    ],
    fileType: "ZIP (Figma, Sketch, XD)",
    fileSize: "1.2GB",
    creator: {
      name: "ডিজাইন স্টুডিও",
      avatar: "https://i.pravatar.cc/150?img=30",
      bio: "প্রফেশনাল UI/UX ডিজাইন টিম",
      products: 25,
      followers: 1240
    },
    features: [
      "১০০+ পেজ টেমপ্লেট",
      "রেসপনসিভ ডিজাইন",
      "আনলিমিটেড কালার ভেরিয়েশন",
      "কমার্শিয়াল লাইসেন্স",
      "লাইফটাইম আপডেট",
      "২৪/৭ সাপোর্ট"
    ],
    reviews: [
      {
        name: "আকাশ রায়",
        avatar: "https://i.pravatar.cc/150?img=33",
        rating: 5,
        date: "ফেব্রুয়ারি ১২, ২০২৩",
        comment: "দারুন টেমপ্লেট! আমার অনেক সময় বাঁচাতে সাহায্য করেছে। সব ডিভাইসে পারফেক্ট!"
      },
      {
        name: "সাদিয়া আহমেদ",
        avatar: "https://i.pravatar.cc/150?img=44",
        rating: 4,
        date: "জানুয়ারি ২২, ২০২৩",
        comment: "গুড কোয়ালিটি টেমপ্লেট, ডকুমেন্টেশন আরও ভালো হতে পারত।"
      },
      {
        name: "রাহুল চৌধুরী",
        avatar: "https://i.pravatar.cc/150?img=12",
        rating: 5,
        date: "ডিসেম্বর ০৫, ২০২২",
        comment: "অসাধারণ টেমপ্লেট এবং অসাধারণ সাপোর্ট। যে কোনো প্রশ্নের উত্তর দ্রুত দেন।"
      }
    ]
  };

  const handleAddToCart = () => {
    toast({
      title: "কার্টে যোগ করা হয়েছে",
      description: `${product.title} কার্টে যোগ করা হয়েছে।`,
    });
    
    setTimeout(() => {
      navigate('/digital-products/cart');
    }, 1000);
  };

  const handleBuyNow = () => {
    toast({
      title: "চেকআউট প্রক্রিয়া শুরু হচ্ছে",
      description: "আপনাকে পেমেন্ট পেজে নিয়ে যাওয়া হচ্ছে...",
    });
    
    setTimeout(() => {
      navigate('/checkout');
    }, 500);
  };

  const handleToggleWishlist = () => {
    setWishlist(!wishlist);
    toast({
      title: wishlist ? "উইশলিস্ট থেকে সরানো হয়েছে" : "উইশলিস্টে যোগ করা হয়েছে",
      description: wishlist 
        ? `${product.title} উইশলিস্ট থেকে সরানো হয়েছে।` 
        : `${product.title} উইশলিস্টে যোগ করা হয়েছে।`,
    });
  };

  return (
    <div className="container px-4 pt-20 pb-20">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold">ডিজিটাল প্রোডাক্ট</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="overflow-hidden rounded-lg aspect-video mb-4">
            <img 
              src={product.images[0]} 
              alt={product.title} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {product.images.map((image, index) => (
              <div key={index} className="overflow-hidden rounded-lg aspect-video">
                <img 
                  src={image}
                  alt={`${product.title} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-4">
            <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="ml-1 text-sm font-medium">{product.rating}</span>
              </div>
              <span className="text-sm text-muted-foreground">({product.reviewCount} রিভিউ)</span>
              <span className="text-sm text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">{product.sales} বিক্রয়</span>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-bold text-primary">{product.discountPrice}</span>
              {product.discountPrice && (
                <span className="text-lg text-muted-foreground line-through">{product.price}</span>
              )}
            </div>
            <p className="text-muted-foreground mb-4">{product.description}</p>
            
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary" className="gap-1">
                <FileText className="h-3 w-3" />
                {product.fileType}
              </Badge>
              <Badge variant="secondary" className="gap-1">
                <Download className="h-3 w-3" />
                {product.fileSize}
              </Badge>
              <Badge variant="secondary" className="gap-1">
                <Clock className="h-3 w-3" />
                লাস্ট আপডেট: {product.updatedAt}
              </Badge>
            </div>

            <div className="flex gap-2 mb-6">
              <Button onClick={handleBuyNow} className="flex-1">এখনই কিনুন</Button>
              <Button variant="outline" onClick={handleAddToCart} className="flex-1">
                <ShoppingCart className="h-4 w-4 mr-2" />
                কার্টে যোগ করুন
              </Button>
              <Button 
                variant="outline" 
                size="icon"
                onClick={handleToggleWishlist}
                className={wishlist ? "text-red-500" : ""}
              >
                <Heart className={`h-4 w-4 ${wishlist ? "fill-red-500" : ""}`} />
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>

            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={product.creator.avatar} alt={product.creator.name} />
                    <AvatarFallback>{product.creator.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{product.creator.name}</h3>
                    <p className="text-sm text-muted-foreground">{product.creator.bio}</p>
                  </div>
                  <Button variant="outline" size="sm" className="ml-auto">ফলো করুন</Button>
                </div>
                <div className="flex justify-between mt-4 text-center">
                  <div>
                    <p className="font-bold">{product.creator.products}</p>
                    <p className="text-xs text-muted-foreground">প্রোডাক্ট</p>
                  </div>
                  <div>
                    <p className="font-bold">{product.creator.followers}</p>
                    <p className="text-xs text-muted-foreground">ফলোয়ার</p>
                  </div>
                  <div>
                    <p className="font-bold">4.9</p>
                    <p className="text-xs text-muted-foreground">গড় রেটিং</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <Tabs defaultValue="features">
          <TabsList className="w-full grid grid-cols-4 mb-6">
            <TabsTrigger value="features">ফিচার</TabsTrigger>
            <TabsTrigger value="reviews">রিভিউ</TabsTrigger>
            <TabsTrigger value="support">সাপোর্ট</TabsTrigger>
            <TabsTrigger value="faq">প্রশ্নোত্তর</TabsTrigger>
          </TabsList>
          
          <TabsContent value="features" className="space-y-4">
            <h3 className="text-lg font-medium mb-4">প্রোডাক্ট ফিচার</h3>
            <ul className="space-y-2">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            
            <Separator className="my-6" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <Globe className="h-8 w-8 text-blue-500 mb-2" />
                  <h3 className="font-medium">যেকোনো ডিভাইসে</h3>
                  <p className="text-sm text-muted-foreground">ডেস্কটপ, মোবাইল, ট্যাব সব ডিভাইসে কাজ করবে</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <Shield className="h-8 w-8 text-green-500 mb-2" />
                  <h3 className="font-medium">সিকিউর ডাউনলোড</h3>
                  <p className="text-sm text-muted-foreground">১০০% ভাইরাস ফ্রি এবং সিকিউর ডাউনলোড</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <MessageSquare className="h-8 w-8 text-purple-500 mb-2" />
                  <h3 className="font-medium">২৪/৭ সাপোর্ট</h3>
                  <p className="text-sm text-muted-foreground">যেকোনো সমস্যা হলে আমাদের সাপোর্ট টিম সাহায্য করবে</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="reviews">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-4xl font-bold">{product.rating}</div>
                  <div className="flex items-center justify-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star} 
                        className={`h-4 w-4 ${star <= Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} 
                      />
                    ))}
                  </div>
                  <div className="text-sm text-muted-foreground">{product.reviewCount} রিভিউ</div>
                </div>
                
                <div className="flex-1">
                  {[5, 4, 3, 2, 1].map((star) => (
                    <div key={star} className="flex items-center gap-2 mb-1">
                      <div className="text-sm font-medium w-10 text-right">{star} ★</div>
                      <div className="flex-1 bg-gray-200 h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-yellow-400 h-full" 
                          style={{ width: star === 5 ? '70%' : star === 4 ? '20%' : star === 3 ? '7%' : star === 2 ? '2%' : '1%' }}
                        ></div>
                      </div>
                      <div className="text-sm text-muted-foreground w-10">
                        {star === 5 ? '70%' : star === 4 ? '20%' : star === 3 ? '7%' : star === 2 ? '2%' : '1%'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                {product.reviews.map((review, index) => (
                  <div key={index} className="border-b pb-4 last:border-0">
                    <div className="flex items-center gap-2 mb-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={review.avatar} alt={review.name} />
                        <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{review.name}</div>
                        <div className="text-xs text-muted-foreground">{review.date}</div>
                      </div>
                      <div className="ml-auto flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star 
                            key={star} 
                            className={`h-3 w-3 ${star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} 
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="support">
            <div className="space-y-4">
              <Card>
                <CardContent className="p-4">
                  <h3 className="text-lg font-medium mb-2">লাইফটাইম সাপোর্ট</h3>
                  <p>এই প্রোডাক্টের জন্য লাইফটাইম সাপোর্ট পাবেন। কোনো সমস্যা হলে আমাদের সাপোর্ট টিম সাহায্য করবে।</p>
                  <div className="mt-4">
                    <Button variant="outline">সাপোর্ট টিকেট ওপেন করুন</Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <h3 className="text-lg font-medium mb-2">সাপোর্ট চ্যানেল</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5 text-blue-500" />
                      <span>লাইভ চ্যাট সাপোর্ট (সকাল ৯টা - রাত ১০টা)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5 text-green-500" />
                      <span>ইমেইল সাপোর্ট (২৪ ঘন্টার মধ্যে রিপ্লাই)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5 text-purple-500" />
                      <span>ফোন সাপোর্ট (প্রিমিয়াম ইউজার)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="faq">
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">প্রোডাক্ট কি আপডেট পাবে?</h3>
                <p className="text-sm text-muted-foreground">হ্যাঁ, এই প্রোডাক্ট নিয়মিত আপডেট পাবে। আপনি লাইফটাইম আপডেট পাবেন।</p>
              </div>
              <Separator />
              
              <div className="space-y-2">
                <h3 className="font-medium">লাইসেন্স কি রিনিউ করতে হবে?</h3>
                <p className="text-sm text-muted-foreground">না, এটি একটি লাইফটাইম লাইসেন্স। আপনাকে কোনো অতিরিক্ত ফি দিতে হবে না।</p>
              </div>
              <Separator />
              
              <div className="space-y-2">
                <h3 className="font-medium">রিফান্ড পলিসি কি?</h3>
                <p className="text-sm text-muted-foreground">প্রোডাক্ট পারচেজ করার ১৪ দিনের মধ্যে রিফান্ড চাইতে পারেন যদি প্রোডাক্ট আপনার প্রয়োজন পূরণ না করে।</p>
              </div>
              <Separator />
              
              <div className="space-y-2">
                <h3 className="font-medium">একাধিক প্রজেক্টে ব্যবহার করা যাবে?</h3>
                <p className="text-sm text-muted-foreground">হ্যাঁ, লাইসেন্স অনুযায়ী আপনি একাধিক প্রজেক্টে এই প্রোডাক্ট ব্যবহার করতে পারবেন।</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="mt-12">
        <h2 className="text-xl font-bold mb-4">সম্পর্কিত প্রোডাক্ট</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((item) => (
            <Card key={item} className="overflow-hidden cursor-pointer hover:shadow-md transition-all">
              <div className="aspect-video overflow-hidden">
                <img 
                  src={`https://images.unsplash.com/photo-155${item}774698-0b77e0d5fac6?q=80&w=300&auto=format&fit=crop`}
                  alt={`Related product ${item}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-3">
                <Badge className="mb-2">UI/UX টেমপ্লেট</Badge>
                <h3 className="font-medium text-sm line-clamp-1">ওয়েব অ্যাপ UI টেমপ্লেট কিট {item}</h3>
                <div className="flex items-center text-xs text-muted-foreground mt-1 mb-1">
                  <div className="flex items-center">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1">4.{item + 4}</span>
                  </div>
                  <span className="mx-1">•</span>
                  <span>{item * 10 + 12} রিভিউ</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="font-bold text-primary">৳{item * 1000 + 999}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DigitalProduct;
