
import { create } from 'zustand';

export interface Post {
  id: string;
  title: string;
  description: string;
  category: string;
  subcategory?: string;
  location: string;
  price: string;
  images: string[];
  videos?: string[];
  createdAt: Date;
  type: 'rent' | 'service' | 'marketplace';
  
  // Rental specific fields
  period?: string;
  
  // Service specific fields
  duration?: string;
  timeUnit?: string;
  
  // Marketplace specific fields
  discountPrice?: string;
  tags?: string;
}

interface PostStore {
  posts: Post[];
  addPost: (post: Post) => void;
  updatePost: (id: string, updates: Partial<Post>) => void;
  deletePost: (id: string) => void;
  getPostsByType: (type: Post['type']) => Post[];
}

export const usePostStore = create<PostStore>((set, get) => ({
  posts: [],
  
  addPost: (post) => set((state) => ({
    posts: [...state.posts, post]
  })),
  
  updatePost: (id, updates) => set((state) => ({
    posts: state.posts.map(post => 
      post.id === id ? { ...post, ...updates } : post
    )
  })),
  
  deletePost: (id) => set((state) => ({
    posts: state.posts.filter(post => post.id !== id)
  })),
  
  getPostsByType: (type) => {
    return get().posts.filter(post => post.type === type);
  }
}));
