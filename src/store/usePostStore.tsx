import { create } from 'zustand';

export type PostType = 'rent' | 'service' | 'marketplace';

export interface BasePost {
  id: string;
  title: string;
  description: string;
  category: string;
  subcategory?: string;
  location?: string;
  price?: string;
  images?: string[]; // for simplicity, File[] not persisted, will be blank string until using backend
  createdAt: Date;
}

export interface RentPost extends BasePost {
  type: 'rent';
  period: string;
}
export interface ServicePost extends BasePost {
  type: 'service';
  duration: string;
  timeUnit: string;
}
export interface MarketplacePost extends BasePost {
  type: 'marketplace';
  discountPrice?: string;
  tags?: string;
}
export type Post = RentPost | ServicePost | MarketplacePost;

interface PostStore {
  posts: Post[];
  addPost: (post: Post) => void;
  setPosts: (posts: Post[]) => void;
}

// Initial demo posts (convert your demo posts here or keep in Index for now)
export const usePostStore = create<PostStore>((set) => ({
  posts: [],
  addPost: (post) => set((state) => ({ posts: [post, ...state.posts] })),
  setPosts: (posts) => set({ posts }),
}));
