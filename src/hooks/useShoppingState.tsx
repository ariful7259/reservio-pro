
import { create } from 'zustand';

interface CartItem {
  id: string;
  title: string;
  price: string;
  quantity: number;
  image?: string;
}

interface WishlistItem {
  id: string;
  title: string;
  price: string;
  image?: string;
}

interface ShoppingState {
  cart: CartItem[];
  wishlist: WishlistItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  toggleWishlist: (item: WishlistItem) => void;
  isInWishlist: (id: string) => boolean;
  loyaltyPoints: number;
  addLoyaltyPoints: (points: number) => void;
}

export const useShoppingState = create<ShoppingState>((set, get) => ({
  cart: [],
  wishlist: [],
  loyaltyPoints: 0,
  
  addToCart: (item) => set((state) => ({
    cart: [...state.cart, item],
  })),
  
  removeFromCart: (id) => set((state) => ({
    cart: state.cart.filter(item => item.id !== id),
  })),
  
  toggleWishlist: (item) => set((state) => {
    const exists = state.wishlist.some(i => i.id === item.id);
    if (exists) {
      return {
        wishlist: state.wishlist.filter(i => i.id !== item.id),
      };
    }
    return {
      wishlist: [...state.wishlist, item],
    };
  }),
  
  isInWishlist: (id) => get().wishlist.some(item => item.id === id),
  
  addLoyaltyPoints: (points) => set((state) => ({
    loyaltyPoints: state.loyaltyPoints + points,
  })),
}));
