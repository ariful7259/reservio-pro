import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, Store, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { usePostStore, Post, PostType } from '@/store/usePostStore';
import { useAuth } from '@/hooks/useAuth';
import BannerCarousel from '@/components/BannerCarousel';
import FeaturedListingsGrid from '@/components/FeaturedListingsGrid';
import FeaturedDigitalProducts from '@/components/FeaturedDigitalProducts';
import SearchBar from '@/components/ui/search-bar';

const Index = () => {
  const navigate = useNavigate();
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100 
      }
    }
  };

  return (
    <motion.div 
      className="container px-4 pt-20 pb-20"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div 
        className="flex flex-wrap justify-center gap-2 mb-6"
        variants={itemVariants}
      >
        {!isAuthenticated ? (
          <Button 
            onClick={() => navigate('/login')} 
            variant="outline" 
            className="flex items-center gap-1 bg-background/80 backdrop-blur-sm hover:bg-background border border-border/50 rounded-xl"
          >
            <LogIn className="h-4 w-4" /> লগইন
          </Button>
        ) : (
          <>
            {isSeller && (
              <Button 
                onClick={() => navigate(user?.sellerType ? `/dashboard/${user.sellerType}` : '/seller-dashboard')} 
                variant="outline" 
                className="flex items-center gap-1 bg-background/80 backdrop-blur-sm hover:bg-background border border-border/50 rounded-xl"
              >
                <Store className="h-4 w-4" /> বিক্রেতা কেন্দ্র
              </Button>
            )}
            {isAdmin && (
              <Button 
                onClick={() => navigate('/admin-dashboard')} 
                variant="outline" 
                className="flex items-center gap-1 bg-background/80 backdrop-blur-sm hover:bg-background border border-border/50 rounded-xl"
              >
                <Briefcase className="h-4 w-4" /> অ্যাডমিন প্যানেল
              </Button>
            )}
          </>
        )}
      </motion.div>

      <motion.div 
        className="my-8 relative z-0" 
        variants={itemVariants}
      >
        <SearchBar variant="expanded" className="max-w-xl mx-auto" />
      </motion.div>

      <motion.div 
        className="overflow-hidden px-0 py-3 mb-8" 
        variants={itemVariants}
      >
        <BannerCarousel images={bannerImages} />
      </motion.div>
      
      <motion.div 
        className="mb-10"
        variants={itemVariants}
      >
        <FeaturedDigitalProducts />
      </motion.div>

      <motion.div 
        className="mb-6"
        variants={itemVariants}
      >
        <FeaturedListingsGrid listings={allListings} />
      </motion.div>
    </motion.div>
  );
};

export default Index;
