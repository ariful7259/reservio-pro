import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, MapPin, ArrowRight, LogIn, Store, User, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import FeaturedDigitalProducts from '@/components/FeaturedDigitalProducts';
import { usePostStore, Post, PostType } from '@/store/usePostStore';
import { useAuth } from '@/hooks/useAuth';
import CategoryTabs from "@/components/CategoryTabs";
import { Skeleton } from "@/components/ui/skeleton";

const Index = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const {
    posts,
    getPostsByType
  } = usePostStore();
  const {
    isAuthenticated,
    user,
    isSeller,
    isAdmin
  } = useAuth();
  const bannerImages = ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop", "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop", "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop", "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1000&auto=format&fit=crop", "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=1000&auto=format&fit=crop", "https://images.unsplash.com/photo-1511385348-a52b4a160dc2?q=80&w=1000&auto=format&fit=crop", "https://images.unsplash.com/photo-1618359057154-e21ae64350b6?q=80&w=1000&auto=format&fit=crop"];
  const defaultFeaturedListings = [{
    id: "1",
    title: "৩ বেডরুম অ্যাপার্টমেন্ট",
    location: "গুলশান, ঢাকা",
    price: "৳২৫,০০০/মাস",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1000&auto=format&fit=crop",
    category: "রেন্ট",
    path: "/rent-details/1"
  }, {
    id: "2",
    title: "অফিস স্পেস",
    location: "বনানী, ঢাকা",
    price: "৳৫০,০০০/মাস",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1000&auto=format&fit=crop",
    category: "রেন্ট",
    path: "/rent-details/2"
  }, {
    id: "1",
    title: "ডাক্তার কনসাল্টেশন",
    location: "মেডিকেল সেন্টার, ঢাকা",
    price: "৳১,৫০০",
    image: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80",
    category: "সার্ভিস",
    path: "/services/1"
  }, {
    id: "2",
    title: "ডেন্টাল চেকআপ",
    location: "শাইন ডেন্টাল, ঢাকা",
    price: "৳২,০০০",
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80",
    category: "সার্ভিস",
    path: "/services/2"
  }, {
    id: "1",
    title: "স্মার্ট ব্লাড প্রেশার মনিটর",
    location: "ধানমন্ডি, ঢাকা",
    price: "৳২,৫০০",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80",
    category: "মার্কেটপ্লেস",
    path: "/product/1"
  }, {
    id: "2",
    title: "ডিজিটাল গ্লুকোমিটার কিট",
    location: "উত্তরা, ঢাকা",
    price: "৳৩,৫০০",
    image: "https://images.unsplash.com/photo-1587854680352-936b22b91030?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80",
    category: "মার্কেটপ্লেস",
    path: "/product/2"
  }];
  const postToFeaturedListing = (post: Post) => {
    const defaultImage = post.type === 'rent' ? "https://placehold.co/400x400?text=Rent" : post.type === 'service' ? "https://placehold.co/400x400?text=Service" : "https://placehold.co/400x400?text=Product";
    const displayImage = post.images && post.images.length > 0 && post.images[0] !== "" ? post.images[0] : defaultImage;
    if (post.type === 'rent') {
      return {
        id: post.id,
        title: post.title,
        location: post.location || '',
        price: `৳${post.price || '---'}/${post.period === 'month' ? 'মাস' : post.period === 'day' ? 'দিন' : 'ঘন্টা'}`,
        image: displayImage,
        category: "রেন্ট",
        path: `/rent-details/${post.id}`
      };
    }
    if (post.type === 'service') {
      return {
        id: post.id,
        title: post.title,
        location: post.location || '',
        price: `৳${post.price || '---'}`,
        image: displayImage,
        category: "সার্ভিস",
        path: `/services/${post.id}`
      };
    }
    if (post.type === 'marketplace') {
      return {
        id: post.id,
        title: post.title,
        location: post.location || '',
        price: `৳${post.price || '---'}`,
        image: displayImage,
        category: "মার্কেটপ্লেস",
        path: `/product/${post.id}`
      };
    }
    return null;
  };
  const userPosts = posts.map(postToFeaturedListing).filter(Boolean);
  const allListings = [...userPosts, ...defaultFeaturedListings];
  const getListings = (cat: string) => {
    return allListings.filter(item => {
      if (cat === "all") return true;
      if (cat === "rent") return item.category === "রেন্ট";
      if (cat === "services") return item.category === "সার্ভিস";
      if (cat === "marketplace") return item.category === "মার্কেটপ্লেস";
      return false;
    });
  };
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };
  const handleListingClick = (path: string) => {
    navigate(path);
  };

  // Add local state for active tab
  const [activeTab, setActiveTab] = useState("all");
  // Add local state for loading simulation (demo)
  const [loading, setLoading] = useState<boolean>(false);

  // Simulate loading for demonstration (2s)
  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timeout);
  }, [activeTab]);

  return (
    <div className="container px-4 pt-20 pb-20">
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {!isAuthenticated ? <Button onClick={() => navigate('/login')} variant="outline" className="flex items-center gap-1">
            <LogIn className="h-4 w-4" /> লগইন
          </Button> : <>
            
            {isSeller}
            {isAdmin && <Button onClick={() => navigate('/admin-dashboard')} variant="outline" className="flex items-center gap-1">
                <Briefcase className="h-4 w-4" /> অ্যাডমিন প্যানেল
              </Button>}
          </>}
      </div>

      <div className="overflow-hidden px-4 py-3 mb-6">
        <Carousel className="w-full">
          <CarouselContent>
            {bannerImages.map((image, index) => <CarouselItem key={index}>
                <div className="p-1">
                  <div className="overflow-hidden rounded-lg aspect-[16/6] w-full">
                    <img src={image} alt={`Banner ${index + 1}`} className="w-full h-full object-cover" />
                  </div>
                </div>
              </CarouselItem>)}
          </CarouselContent>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </Carousel>
      </div>
      
      <div className="mb-10">
        <FeaturedDigitalProducts />
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">ফিচার্ড লিস্টিং</h2>
        </div>

        {/* Category Tabs: Replace old TabsList with new UX */}
        <CategoryTabs active={activeTab} setActive={setActiveTab} />

        {/* Feature Listings: skeleton show on loading */}
        <div className="mt-4">
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({length: 4}).map((_,i) => (
                <div key={i} className="rounded-lg overflow-hidden bg-gray-100">
                  <Skeleton className="h-40 w-full mb-3" />
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {getListings(activeTab).map(listing => (
                <Card
                  key={`${activeTab}-${listing.id}-${listing.category}`}
                  className="overflow-hidden cursor-pointer hover:shadow-lg transition-all hover:scale-105 hover:border-primary 
                  active:scale-100 duration-200 card-hover-effect"
                  onClick={() => handleListingClick(listing.path)}
                >
                  <div className="relative aspect-square">
                    <img src={listing.image} alt={listing.title} className="w-full h-full object-cover" />
                    <Badge className="absolute top-2 right-2">{listing.category}</Badge>
                  </div>
                  <CardContent className="p-3">
                    <h3 className="font-medium text-sm line-clamp-1">{listing.title}</h3>
                    <div className="flex items-center text-xs text-muted-foreground mt-1">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span>{listing.location}</span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-sm font-bold text-primary">{listing.price}</p>
                      <div className="flex items-center text-xs">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                        <span>4.8</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
        <div className="flex justify-center mt-4">
          <Button 
            variant="outline" 
            className="flex items-center gap-1 animate-pulse-soft shadow-button button-pop"
            onClick={() => {
              // user তুলে দেখার মতো রুট
              if(activeTab==="all") navigate('/shopping');
              else if(activeTab==="rent") navigate('/rentals');
              else if(activeTab==="services") navigate('/services');
              else if(activeTab==="marketplace") navigate('/marketplace');
            }}>
            {activeTab==="all" ? "সব দেখুন" : "আরও দেখুন"}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Index;
