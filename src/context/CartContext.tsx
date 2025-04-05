
import React, { createContext, useState, useContext, useEffect } from 'react';

// প্রোডাক্ট টাইপ ডেফিনেশন
export interface CartProduct {
  id: string;
  title: string;
  price: number;
  discount?: number;
  quantity: number;
  image?: string;
  attributes?: {
    [key: string]: string;
  };
}

// কার্ট কনটেক্সট টাইপ ডেফিনেশন
interface CartContextType {
  cartItems: CartProduct[];
  addToCart: (product: CartProduct) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  saveForLater: (id: string) => void;
  getSavedItems: () => CartProduct[];
  moveToCart: (id: string) => void;
  itemCount: number;
  cartTotal: number;
  applyCoupon: (code: string) => boolean;
  activeCoupon: string | null;
  discountAmount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartProduct[]>([]);
  const [savedItems, setSavedItems] = useState<CartProduct[]>([]);
  const [activeCoupon, setActiveCoupon] = useState<string | null>(null);
  const [discountAmount, setDiscountAmount] = useState(0);

  // লোকাল স্টোরেজ থেকে কার্ট আইটেম লোড করা
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    const storedSavedItems = localStorage.getItem('savedItems');
    const storedCoupon = localStorage.getItem('activeCoupon');
    
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
    
    if (storedSavedItems) {
      setSavedItems(JSON.parse(storedSavedItems));
    }
    
    if (storedCoupon) {
      setActiveCoupon(storedCoupon);
      calculateDiscount(JSON.parse(storedCart || '[]'), storedCoupon);
    }
  }, []);

  // কার্ট আইটেম সেভ করা
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
    calculateDiscount(cartItems, activeCoupon);
    
    // মোট আইটেম কাউন্ট আপডেট
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    
    // কার্ট আইকনে বেজ আপডেট করার জন্য একটি কাস্টম ইভেন্ট ডিসপ্যাচ করা
    const event = new CustomEvent('cartUpdated', { detail: { count: totalItems } });
    window.dispatchEvent(event);
    
  }, [cartItems, activeCoupon]);

  // সেভ করা আইটেম স্টোর করা
  useEffect(() => {
    localStorage.setItem('savedItems', JSON.stringify(savedItems));
  }, [savedItems]);

  // কুপন অ্যাপ্লাই করার পরে লোকাল স্টোরেজে সেভ করা
  useEffect(() => {
    if (activeCoupon) {
      localStorage.setItem('activeCoupon', activeCoupon);
    } else {
      localStorage.removeItem('activeCoupon');
    }
  }, [activeCoupon]);

  // ডিসকাউন্ট ক্যালকুলেট করা
  const calculateDiscount = (items: CartProduct[], coupon: string | null) => {
    if (!coupon) {
      setDiscountAmount(0);
      return;
    }
    
    const subtotal = items.reduce((total, item) => {
      const itemPrice = item.discount 
        ? item.price - (item.price * item.discount / 100) 
        : item.price;
      return total + (itemPrice * item.quantity);
    }, 0);
    
    // সিমুলেটেড কুপন লজিক
    switch(coupon) {
      case 'NEW10':
        setDiscountAmount(subtotal * 0.1); // 10% discount
        break;
      case 'SAVE20':
        setDiscountAmount(subtotal * 0.2); // 20% discount
        break;
      case 'FLAT500':
        setDiscountAmount(500); // Flat 500 off
        break;
      default:
        setDiscountAmount(0);
    }
  };

  // কার্টে আইটেম যোগ করা
  const addToCart = (product: CartProduct) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevItems.map(item => 
          item.id === product.id
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        );
      } else {
        return [...prevItems, product];
      }
    });
  };

  // কার্ট থেকে আইটেম রিমুভ করা
  const removeFromCart = (id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  // কার্টে আইটেমের পরিমাণ আপডেট করা
  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  // কার্ট খালি করা
  const clearCart = () => {
    setCartItems([]);
    setActiveCoupon(null);
    setDiscountAmount(0);
  };

  // পরবর্তীতে কেনার জন্য আইটেম সংরক্ষণ করা
  const saveForLater = (id: string) => {
    const itemToSave = cartItems.find(item => item.id === id);
    if (itemToSave) {
      setSavedItems(prev => [...prev, itemToSave]);
      removeFromCart(id);
    }
  };

  // সেভ করা আইটেম পাওয়া
  const getSavedItems = () => {
    return savedItems;
  };

  // সেভ করা আইটেমকে কার্টে মুভ করা
  const moveToCart = (id: string) => {
    const itemToMove = savedItems.find(item => item.id === id);
    if (itemToMove) {
      addToCart(itemToMove);
      setSavedItems(prev => prev.filter(item => item.id !== id));
    }
  };

  // মোট আইটেম কাউন্ট ক্যালকুলেট করা
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // কার্ট টোটাল ক্যালকুলেট করা
  const cartTotal = cartItems.reduce((total, item) => {
    const itemPrice = item.discount 
      ? item.price - (item.price * item.discount / 100) 
      : item.price;
    return total + (itemPrice * item.quantity);
  }, 0);

  // কুপন অ্যাপ্লাই করা
  const applyCoupon = (code: string): boolean => {
    // সিমুলেটেড কুপন ভ্যালিডেশন
    const validCoupons = ['NEW10', 'SAVE20', 'FLAT500'];
    
    if (validCoupons.includes(code)) {
      setActiveCoupon(code);
      calculateDiscount(cartItems, code);
      return true;
    }
    
    return false;
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        saveForLater,
        getSavedItems,
        moveToCart,
        itemCount,
        cartTotal,
        applyCoupon,
        activeCoupon,
        discountAmount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// কার্ট কনটেক্সট ব্যবহারের হুক
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
