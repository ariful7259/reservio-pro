import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePostStore, Post } from '@/store/usePostStore';
import { useAuth } from '@/hooks/useAuth';
import HeroCarousel from '@/components/HeroCarousel';
import DigitalProductsSection from '@/components/DigitalProductsSection';
import FeaturedListings from '@/components/FeaturedListings';

const bannerImages = [
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1511385348-a52b4a160dc2?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1618359057154-e21ae64350b6?q=80&w=1000&auto=format&fit=crop"
];

const defaultFeaturedListings = [
  { id: "1", title: "৩ বেডরুম অ্যাপার্টমেন্ট", location: "গুলশান, ঢাকা", price: "৳২৫,০০০/মাস", image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1000&auto=format&fit=crop", category: "রেন্ট", path: "/rent-details/1" },
  { id: "2", title: "অফিস স্পেস", location: "বনানী, ঢাকা", price: "৳৫০,০০০/মাস", image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1000&auto=format&fit=crop", category: "রেন্ট", path: "/rent-details/2" },
  { id: "1", title: "ডাক্তার কনসাল্টেশন", location: "মেডিকেল সেন্টার, ঢাকা", price: "৳১,৫০০", image: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80", category: "সার্ভিস", path: "/services/1" },
  { id: "2", title: "ডেন্টাল চেকআপ", location: "শাইন ডেন্টাল, ঢাকা", price: "৳২,০০০", image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80", category: "সার্ভিস", path: "/services/2" },
  { id: "1", title: "স্মার্ট ব্লাড প্রেশার মনিটর", location: "ধানমন্ডি, ঢাকা", price: "৳২,৫০০", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80", category: "মার্কেটপ্লেস", path: "/product/1" },
  { id: "2", title: "ডিজিটাল গ্লুকোমিটার কিট", location: "উত্তরা, ঢাকা", price: "৳৩,৫০০", image: "https://images.unsplash.com/photo-1587854680352-936b22b91030?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80", category: "মার্কেটপ্লেস", path: "/product/2" }
];

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
      description: post.description,
      latitude: post.latitude,
      longitude: post.longitude,
      period: post.period,
      createdAt: post.createdAt,
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
      description: post.description,
      latitude: post.latitude,
      longitude: post.longitude,
      createdAt: post.createdAt,
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
      description: post.description,
      createdAt: post.createdAt,
      tags: post.tags,
      path: `/product/${post.id}`
    };
  }
  return null;
};

const Index = () => {
  const navigate = useNavigate();
  const { posts } = usePostStore();
  const { isAuthenticated, isSeller, isAdmin } = useAuth();

  // Feature listings data construction
  const userPosts = useMemo(() => posts.map(postToFeaturedListing).filter(Boolean), [posts]);
  const allListings = useMemo(() => [...userPosts, ...defaultFeaturedListings], [userPosts]);

  return (
    <div className="container px-4 pt-20 pb-20">
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {!isAuthenticated ? (
          <Button onClick={() => navigate('/login')} variant="outline" className="flex items-center gap-1">
            <LogIn className="h-4 w-4" /> লগইন
          </Button>
        ) : (
          <>
            {isAdmin && (
              <Button onClick={() => navigate('/admin-dashboard')} variant="outline" className="flex items-center gap-1">
                <Briefcase className="h-4 w-4" /> অ্যাডমিন প্যানেল
              </Button>
            )}
          </>
        )}
      </div>
      
      <HeroCarousel bannerImages={bannerImages} />

      <div className="my-8">
        <DigitalProductsSection />
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg my-8">
        <FeaturedListings allListings={allListings as any[]} />
      </div>
    </div>
  );
};

export default Index;
