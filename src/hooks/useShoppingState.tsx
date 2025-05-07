
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useToast } from '@/components/ui/use-toast';

export interface CartItem {
  id: string;
  title: string;
  price: string;
  quantity: number;
  image?: string;
}

export interface WishlistItem {
  id: string;
  title: string;
  price: string;
  image?: string;
}

interface ShoppingState {
  cart: CartItem[];
  wishlist: WishlistItem[];
  recentlyViewed: WishlistItem[];
  searchHistory: string[];
  loyaltyPoints: number;
  
  // Cart operations
  addToCart: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeFromCart: (id: string) => void;
  updateCartItemQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  
  // Wishlist operations
  toggleWishlist: (item: WishlistItem) => void;
  isInWishlist: (id: string) => boolean;
  clearWishlist: () => void;
  
  // Recently viewed operations
  addToRecentlyViewed: (item: WishlistItem) => void;
  clearRecentlyViewed: () => void;
  
  // Search history operations
  addToSearchHistory: (term: string) => void;
  clearSearchHistory: () => void;
  
  // Loyalty points operations
  addLoyaltyPoints: (points: number) => void;
  redeemLoyaltyPoints: (points: number) => boolean;
  
  // Calculations
  getCartTotal: () => number;
  getCartItemsCount: () => number;
}

// Helper function to parse price strings in Bengali/Bangla format (like "৳৫,৯৯৯")
const parsePrice = (priceStr: string): number => {
  // Remove non-numeric characters, except for dots
  const cleanedStr = priceStr.replace(/[^\d.]/g, '');
  return parseFloat(cleanedStr) || 0;
};

export const useShoppingState = create<ShoppingState>()(
  persist(
    (set, get) => ({
      cart: [],
      wishlist: [],
      recentlyViewed: [],
      searchHistory: [],
      loyaltyPoints: 0,
      
      addToCart: (item) => set((state) => {
        const existingItem = state.cart.find(i => i.id === item.id);
        
        if (existingItem) {
          return {
            cart: state.cart.map(i => 
              i.id === item.id 
                ? { ...i, quantity: i.quantity + (item.quantity || 1) }
                : i
            ),
          };
        }
        
        return {
          cart: [...state.cart, { ...item, quantity: item.quantity || 1 }],
        };
      }),
      
      removeFromCart: (id) => set((state) => ({
        cart: state.cart.filter(item => item.id !== id),
      })),
      
      updateCartItemQuantity: (id, quantity) => set((state) => ({
        cart: state.cart.map(item => 
          item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
        ),
      })),
      
      clearCart: () => set({ cart: [] }),
      
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
      
      clearWishlist: () => set({ wishlist: [] }),
      
      addToRecentlyViewed: (item) => set((state) => {
        // Remove if already exists
        const filtered = state.recentlyViewed.filter(i => i.id !== item.id);
        
        // Add to the beginning of the array and limit to 10 items
        return {
          recentlyViewed: [item, ...filtered].slice(0, 10)
        };
      }),
      
      clearRecentlyViewed: () => set({ recentlyViewed: [] }),
      
      addToSearchHistory: (term) => set((state) => {
        if (!term.trim() || state.searchHistory.includes(term)) {
          return state;
        }
        
        return {
          searchHistory: [term, ...state.searchHistory].slice(0, 20)
        };
      }),
      
      clearSearchHistory: () => set({ searchHistory: [] }),
      
      addLoyaltyPoints: (points) => set((state) => ({
        loyaltyPoints: state.loyaltyPoints + points,
      })),
      
      redeemLoyaltyPoints: (points) => {
        const { loyaltyPoints } = get();
        
        if (points <= loyaltyPoints) {
          set({ loyaltyPoints: loyaltyPoints - points });
          return true;
        }
        
        return false;
      },
      
      getCartTotal: () => {
        const { cart } = get();
        return cart.reduce((acc, item) => {
          const price = parsePrice(item.price);
          return acc + (price * item.quantity);
        }, 0);
      },
      
      getCartItemsCount: () => {
        const { cart } = get();
        return cart.reduce((acc, item) => acc + item.quantity, 0);
      },
    }),
    {
      name: 'shopping-storage',
    }
  )
);

// Hook for using shopping state with toast notifications
export const useShoppingStateWithToast = () => {
  const { toast } = useToast();
  const shoppingState = useShoppingState();
  
  const addToCartWithToast = (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
    shoppingState.addToCart(item);
    toast({
      title: "কার্টে যোগ করা হয়েছে",
      description: `${item.title} কার্টে যোগ করা হয়েছে।`,
    });
  };
  
  const toggleWishlistWithToast = (item: WishlistItem) => {
    const wasInWishlist = shoppingState.isInWishlist(item.id);
    shoppingState.toggleWishlist(item);
    
    toast({
      title: wasInWishlist 
        ? "উইশলিস্ট থেকে সরানো হয়েছে" 
        : "উইশলিস্টে যোগ করা হয়েছে",
      description: wasInWishlist
        ? `${item.title} উইশলিস্ট থেকে সরানো হয়েছে।`
        : `${item.title} উইশলিস্টে যোগ করা হয়েছে।`,
    });
  };
  
  return {
    ...shoppingState,
    addToCartWithToast,
    toggleWishlistWithToast,
  };
};
