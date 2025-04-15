
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// টাইপস
export interface RentPost {
  id: string;
  title: string;
  category: string;
  subcategory: string;
  location: string;
  price: string;
  period: string;
  description: string;
  imageUrls: string[];
  createdAt: string;
  author: string;
}

export interface ServicePost {
  id: string;
  title: string;
  category: string;
  subcategory: string;
  location: string;
  price: string;
  duration: string;
  timeUnit: string;
  description: string;
  imageUrls: string[];
  createdAt: string;
  author: string;
}

export interface MarketplacePost {
  id: string;
  title: string;
  category: string;
  subcategory: string;
  price: string;
  discountPrice: string;
  tags: string[];
  description: string;
  imageUrls: string[];
  createdAt: string;
  author: string;
}

export type PostType = 'rent' | 'service' | 'marketplace';

interface PostContextType {
  rentPosts: RentPost[];
  servicePosts: ServicePost[];
  marketplacePosts: MarketplacePost[];
  addRentPost: (post: Omit<RentPost, 'id' | 'createdAt' | 'author'>) => void;
  addServicePost: (post: Omit<ServicePost, 'id' | 'createdAt' | 'author'>) => void;
  addMarketplacePost: (post: Omit<MarketplacePost, 'id' | 'createdAt' | 'author'>) => void;
  getPostsByCategory: (type: PostType, category: string) => any[];
}

const PostContext = createContext<PostContextType | undefined>(undefined);

export const usePostContext = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error('usePostContext must be used within a PostProvider');
  }
  return context;
};

interface PostProviderProps {
  children: ReactNode;
}

export const PostProvider: React.FC<PostProviderProps> = ({ children }) => {
  const [rentPosts, setRentPosts] = useState<RentPost[]>([]);
  const [servicePosts, setServicePosts] = useState<ServicePost[]>([]);
  const [marketplacePosts, setMarketplacePosts] = useState<MarketplacePost[]>([]);

  // লোকাল স্টোরেজ থেকে পোস্ট ডেটা লোড করা
  useEffect(() => {
    const storedRentPosts = localStorage.getItem('rentPosts');
    const storedServicePosts = localStorage.getItem('servicePosts');
    const storedMarketplacePosts = localStorage.getItem('marketplacePosts');

    if (storedRentPosts) {
      setRentPosts(JSON.parse(storedRentPosts));
    }
    if (storedServicePosts) {
      setServicePosts(JSON.parse(storedServicePosts));
    }
    if (storedMarketplacePosts) {
      setMarketplacePosts(JSON.parse(storedMarketplacePosts));
    }
  }, []);

  // লোকাল স্টোরেজে পোস্ট ডেটা সেভ করা
  useEffect(() => {
    localStorage.setItem('rentPosts', JSON.stringify(rentPosts));
  }, [rentPosts]);

  useEffect(() => {
    localStorage.setItem('servicePosts', JSON.stringify(servicePosts));
  }, [servicePosts]);

  useEffect(() => {
    localStorage.setItem('marketplacePosts', JSON.stringify(marketplacePosts));
  }, [marketplacePosts]);

  // নতুন রেন্ট পোস্ট যোগ করা
  const addRentPost = (post: Omit<RentPost, 'id' | 'createdAt' | 'author'>) => {
    const newPost: RentPost = {
      ...post,
      id: `rent-${Date.now()}`,
      createdAt: new Date().toISOString(),
      author: 'Current User', // এখানে ইউজার কনটেক্সট থেকে বর্তমান ইউজারের নাম ব্যবহার করা যেতে পারে
    };
    setRentPosts(prevPosts => [newPost, ...prevPosts]);
  };

  // নতুন সার্ভিস পোস্ট যোগ করা
  const addServicePost = (post: Omit<ServicePost, 'id' | 'createdAt' | 'author'>) => {
    const newPost: ServicePost = {
      ...post,
      id: `service-${Date.now()}`,
      createdAt: new Date().toISOString(),
      author: 'Current User', // এখানে ইউজার কনটেক্সট থেকে বর্তমান ইউজারের নাম ব্যবহার করা যেতে পারে
    };
    setServicePosts(prevPosts => [newPost, ...prevPosts]);
  };

  // নতুন মার্কেটপ্লেস পোস্ট যোগ করা
  const addMarketplacePost = (post: Omit<MarketplacePost, 'id' | 'createdAt' | 'author'>) => {
    const newPost: MarketplacePost = {
      ...post,
      id: `marketplace-${Date.now()}`,
      createdAt: new Date().toISOString(),
      author: 'Current User', // এখানে ইউজার কনটেক্সট থেকে বর্তমান ইউজারের নাম ব্যবহার করা যেতে পারে
    };
    setMarketplacePosts(prevPosts => [newPost, ...prevPosts]);
  };

  // ক্যাটাগরি অনুযায়ী পোস্ট ফিল্টারিং
  const getPostsByCategory = (type: PostType, category: string) => {
    switch (type) {
      case 'rent':
        return rentPosts.filter(post => post.category === category);
      case 'service':
        return servicePosts.filter(post => post.category === category);
      case 'marketplace':
        return marketplacePosts.filter(post => post.category === category);
      default:
        return [];
    }
  };

  return (
    <PostContext.Provider
      value={{
        rentPosts,
        servicePosts,
        marketplacePosts,
        addRentPost,
        addServicePost,
        addMarketplacePost,
        getPostsByCategory,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

