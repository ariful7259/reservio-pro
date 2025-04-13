
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ChevronRight, 
  Star, 
  ShoppingBag, 
  Truck, 
  Shield, 
  RefreshCcw, 
  Share2, 
  Heart, 
  MessageSquare, 
  Check, 
  X, 
  Plus, 
  Minus,
  MapPin,
  ChevronLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { useToast } from '@/components/ui/use-toast';
import SocialShareModal from '@/components/SocialShareModal';

// মক ডেটা - একে সার্ভারে নিয়ে যাওয়া উচিত
const products = [
  {
    id: "1",
    title: "স্মার্ট ব্লাড প্রেশার মনিটর",
    location: "ধানমন্ডি, ঢাকা",
    price: "৳২,৫০০",
    discount: "৳৩,২০০",
    discountPercent: "২২%",
    images: [
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80",
      "https://images.unsplash.com/photo-1555487505-8603a1a69755?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80",
      "https://images.unsplash.com/photo-1624727828489-a1e03b79bba8?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80"
    ],
    category: "হেলথকেয়ার",
    description: "এই আধুনিক ব্লাড প্রেশার মনিটরটি ব্লুটুথের মাধ্যমে আপনার স্মার্টফোনের সাথে সংযোগ করে আপনার স্বাস্থ্যের তথ্য সহজেই ট্র্যাক করতে সাহায্য করে। এটি সিস্টোলিক এবং ডায়াস্টোলিক রক্তচাপ পরিমাপ করে এবং আপনার হৃদস্পন্দন রেকর্ড করে। এর সাথে একটি মোবাইল অ্যাপ আছে যা আপনার পরিমাপগুলি সময়ের সাথে ট্র্যাক করতে সাহায্য করে।",
    features: [
      "ব্লুটুথ কানেক্টিভিটি", 
      "রেকর্ড সংরক্ষণ ক্ষমতা (৬০ রেকর্ড)", 
      "স্মার্টফোন অ্যাপ সপোর্ট", 
      "বড় LCD ডিসপ্লে", 
      "৩ বছরের ওয়ারেন্টি",
      "রিচার্জেবল ব্যাটারি",
      "অটোমেটিক পাওয়ার অফ"
    ],
    seller: {
      name: "হেলথকেয়ার সলিউশনস",
      rating: 4.8,
      reviews: 156,
      verified: true
    },
    stock: 15,
    createdAt: "২০২৫-০৩-২৫",
    viewCount: 1250,
    shipping: "৳১২০",
    warranty: "৩ বছর"
  },
  {
    id: "2",
    title: "ডিজিটাল গ্লুকোমিটার কিট",
    location: "উত্তরা, ঢাকা",
    price: "৳৩,৫০০",
    discount: "৳৪,০০০",
    discountPercent: "১২%",
    images: [
      "https://images.unsplash.com/photo-1587854680352-936b22b91030?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80",
      "https://images.unsplash.com/photo-1579154204601-01588f351e67?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80",
      "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80"
    ],
    category: "হেলথকেয়ার",
    description: "এই আধুনিক ডিজিটাল গ্লুকোমিটার কিটটি বাড়িতে নিজেই রক্তে শর্করার মাত্রা পরিমাপের জন্য নির্ভরযোগ্য সমাধান। এটিতে রয়েছে একটি ডিজিটাল মিটার, টেস্ট স্ট্রিপস, ল্যান্সেট, এবং কেরিং কেস। অ্যাকুরেট রিডিং, দ্রুত ফলাফল (৫ সেকেন্ডে), এবং মেমোরি ফাংশন সহ।",
    features: [
      "আধুনিক অ্যালগরিদম দ্বারা নির্ভুল রিডিং", 
      "৫ সেকেন্ডে ফলাফল", 
      "২৫০ টেস্ট মেমরি", 
      "অটো পাওয়ার অফ", 
      "কম রক্তের প্রয়োজন (০.৬ μL)",
      "বড় ডিজিটাল ডিসপ্লে",
      "ব্যাটারি ইন্ডিকেটর"
    ],
    seller: {
      name: "মেডিকেয়ার প্লাস",
      rating: 4.6,
      reviews: 87,
      verified: true
    },
    stock: 8,
    createdAt: "২০২৫-০৪-০১",
    viewCount: 780,
    shipping: "৳১৫০",
    warranty: "১ বছর"
  }
];

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [showShareModal, setShowShareModal] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  // ডেটা লোড করা
  useEffect(() => {
    // আসল অ্যাপে এখানে API কল থাকবে
    const fetchProduct = () => {
      setLoading(true);
      try {
        const foundProduct = products.find(item => item.id === id);
        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          toast({
            title: "প্রোডাক্ট পাওয়া যায়নি",
            description: "আপনার অনুরোধকৃত প্রোডাক্ট খুঁজে পাওয়া যায়নি।",
            variant: "destructive"
          });
          navigate('/shopping');
        }
      } catch (error) {
        toast({
          title: "একটি সমস্যা হয়েছে",
          description: "ডেটা লোড করতে সমস্যা হয়েছে। দয়া করে পরে আবার চেষ্টা করুন।",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id, toast, navigate]);

  const incrementQuantity = () => {
    if (product && quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    toast({
      title: "কার্টে যোগ করা হয়েছে",
      description: `${product.title} কার্টে যোগ করা হয়েছে।`,
    });
  };

  const handleBuyNow = () => {
    toast({
      title: "এখনই কিনুন",
      description: "আপনাকে চেকআউট পেজে নিয়ে যাওয়া হচ্ছে।",
    });
    // navigate('/checkout');
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
    toast({
      title: bookmarked ? "পছন্দ তালিকা থেকে সরানো হয়েছে" : "পছন্দ তালিকায় যোগ করা হয়েছে",
      description: bookmarked 
        ? "প্রোডাক্টটি আপনার পছন্দ তালিকা থেকে সরানো হয়েছে।" 
        : "প্রোডাক্টটি আপনার পছন্দ তালিকায় যোগ করা হয়েছে।",
    });
  };

  const handleShare = () => {
    setShowShareModal(true);
  };

  if (loading) {
    return (
      <div className="container pt-20 pb-10">
        <div className="flex items-center justify-center h-96">
          <div className="flex flex-col items-center gap-2">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            <p>লোড হচ্ছে...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container pt-20 pb-10">
        <div className="flex flex-col items-center justify-center h-96 gap-4">
          <X className="h-16 w-16 text-destructive" />
          <h2 className="text-2xl font-bold">প্রোডাক্ট পাওয়া যায়নি</h2>
          <p className="text-muted-foreground">আপনার অনুরোধকৃত প্রোডাক্ট খুঁজে পাওয়া যায়নি।</p>
          <Button onClick={() => navigate('/shopping')}>শপিং পেজে ফিরে যান</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container pt-20 pb-10">
      {/* ব্রেডক্রাম্ব */}
      <div className="flex items-center gap-1 text-sm mb-4">
        <Button 
          variant="link" 
          className="p-0 h-auto"
          onClick={() => navigate('/')}
        >
          হোম
        </Button>
        <ChevronRight className="h-3 w-3" />
        <Button 
          variant="link" 
          className="p-0 h-auto"
          onClick={() => navigate('/shopping')}
        >
          শপিং
        </Button>
        <ChevronRight className="h-3 w-3" />
        <Button 
          variant="link" 
          className="p-0 h-auto font-medium"
          onClick={() => navigate(`/shopping/category/${product.category}`)}
        >
          {product.category}
        </Button>
        <ChevronRight className="h-3 w-3" />
        <span className="text-muted-foreground">{product.title}</span>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* বাম অংশ - ছবি */}
        <div className="w-full md:w-2/5">
          <Carousel className="w-full">
            <CarouselContent>
              {product.images.map((image: string, index: number) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <div className="overflow-hidden rounded-lg aspect-square w-full">
                      <img 
                        src={image} 
                        alt={`${product.title} ছবি ${index + 1}`} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
          
          <div className="flex gap-2 mt-4">
            {product.images.slice(0, 3).map((image: string, index: number) => (
              <div 
                key={index} 
                className="border rounded-md overflow-hidden w-20 h-20 cursor-pointer"
              >
                <img 
                  src={image} 
                  alt={`${product.title} থাম্বনেইল ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
            {product.images.length > 3 && (
              <div className="border rounded-md overflow-hidden w-20 h-20 flex items-center justify-center bg-gray-50">
                <span>+{product.images.length - 3}</span>
              </div>
            )}
          </div>
        </div>
        
        {/* ডান অংশ - প্রোডাক্ট তথ্য */}
        <div className="w-full md:w-3/5">
          <div className="flex justify-between items-start">
            <h1 className="text-2xl font-bold">{product.title}</h1>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="icon"
                onClick={handleBookmark}
                className={bookmarked ? "text-red-500" : ""}
              >
                <Heart className={`h-4 w-4 ${bookmarked ? "fill-red-500" : ""}`} />
              </Button>
              <Button 
                variant="outline" 
                size="icon"
                onClick={handleShare}
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex items-center gap-2 mt-1 mb-4">
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm ml-1">{product.seller.rating}</span>
            </div>
            <span className="text-sm text-muted-foreground">({product.seller.reviews} রিভিউ)</span>
            <span className="text-sm text-muted-foreground">•</span>
            <span className="text-sm text-green-600">স্টকে আছে</span>
          </div>
          
          <div className="flex items-end gap-2 mb-4">
            <span className="text-2xl font-bold text-primary">{product.price}</span>
            {product.discount && (
              <>
                <span className="text-sm line-through text-muted-foreground">{product.discount}</span>
                <Badge className="bg-red-100 text-red-800 hover:bg-red-100">{product.discountPercent} ছাড়</Badge>
              </>
            )}
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <MapPin className="h-4 w-4" />
            <span>{product.location}</span>
          </div>
          
          <Separator className="my-4" />
          
          <div className="mb-4">
            <h3 className="text-sm font-medium mb-2">পরিমাণ</h3>
            <div className="flex items-center w-36">
              <Button 
                variant="outline" 
                size="icon"
                onClick={decrementQuantity}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <div className="flex-1 text-center">{quantity}</div>
              <Button 
                variant="outline" 
                size="icon"
                onClick={incrementQuantity}
                disabled={product.stock && quantity >= product.stock}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-1">{product.stock} পিস উপলব্ধ</p>
          </div>
          
          <div className="flex gap-3 mb-6">
            <Button 
              variant="outline" 
              className="flex-1 gap-2"
              onClick={handleAddToCart}
            >
              <ShoppingBag className="h-4 w-4" />
              কার্টে যোগ করুন
            </Button>
            <Button 
              className="flex-1 gap-2"
              onClick={handleBuyNow}
            >
              এখনই কিনুন
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-start gap-2">
              <Truck className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium">ডেলিভারি</p>
                <p className="text-xs text-muted-foreground">শিপিং: {product.shipping}</p>
                <p className="text-xs text-muted-foreground">ঢাকার ভিতরে ১-২ দিনে ডেলিভারি</p>
              </div>
            </div>
            
            <div className="flex items-start gap-2">
              <Shield className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium">ওয়ারেন্টি</p>
                <p className="text-xs text-muted-foreground">{product.warranty} ওয়ারেন্টি</p>
                <p className="text-xs text-muted-foreground">৭ দিনের মধ্যে রিটার্ন</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 mb-2">
            <p className="text-sm">বিক্রেতা:</p>
            <p className="text-sm font-medium">{product.seller.name}</p>
            {product.seller.verified && (
              <Badge variant="outline" className="h-5 text-xs border-green-500 text-green-600">
                <Check className="h-3 w-3 mr-1" /> যাচাইকৃত
              </Badge>
            )}
          </div>
        </div>
      </div>
      
      <div className="mt-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="description">বিবরণ</TabsTrigger>
            <TabsTrigger value="features">বৈশিষ্ট্য</TabsTrigger>
            <TabsTrigger value="reviews">রিভিউসমূহ</TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="mt-4">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-4">প্রোডাক্ট বিবরণ</h3>
                <p className="text-muted-foreground">{product.description}</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="features" className="mt-4">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-4">বৈশিষ্ট্য</h3>
                <ul className="space-y-2">
                  {product.features.map((feature: string, index: number) => (
                    <li key={index} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reviews" className="mt-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">রিভিউসমূহ</h3>
                  <Badge variant="outline">{product.seller.reviews} রিভিউ</Badge>
                </div>
                
                <div className="flex items-center gap-6 p-4 bg-gray-50 rounded-lg mb-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold">{product.seller.rating}</div>
                    <div className="flex items-center justify-center mt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          className={`h-4 w-4 ${star <= Math.floor(product.seller.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} 
                        />
                      ))}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">{product.seller.reviews} রিভিউ</div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="space-y-1">
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <div key={rating} className="flex items-center gap-2">
                          <div className="text-xs w-2">{rating}</div>
                          <Star className="h-3 w-3 text-yellow-400" />
                          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-yellow-400 rounded-full"
                              style={{ 
                                width: `${rating === 5 ? 70 : rating === 4 ? 20 : rating === 3 ? 5 : rating === 2 ? 3 : 2}%` 
                              }}
                            ></div>
                          </div>
                          <div className="text-xs text-muted-foreground w-8">
                            {rating === 5 ? '70%' : rating === 4 ? '20%' : rating === 3 ? '5%' : rating === 2 ? '3%' : '2%'}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="text-center p-6">
                  <MessageSquare className="h-12 w-12 mx-auto text-gray-300 mb-2" />
                  <p className="text-muted-foreground">প্রোডাক্টটি কেনার পর এখানে আপনার রিভিউ দিতে পারবেন।</p>
                  <Button className="mt-4">রিভিউ দেখুন</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* সোশ্যাল শেয়ার মোডাল */}
      {product && (
        <SocialShareModal 
          open={showShareModal}
          onOpenChange={setShowShareModal}
          item={{
            ...product,
            type: 'product',
          }}
        />
      )}
    </div>
  );
};

export default ProductDetail;
