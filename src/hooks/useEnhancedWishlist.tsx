import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

export interface EnhancedWishlistItem {
  id: string;
  user_id: string;
  product_id?: string;
  service_id?: string;
  item_type: 'product' | 'service';
  added_at: string;
  reminder_frequency: number;
  last_reminder_sent?: string;
  conversion_status: 'pending' | 'purchased' | 'ignored';
  metadata: any;
}

export interface UserPreferences {
  id: string;
  user_id: string;
  reminder_frequency: number;
  allow_marketing_notifications: boolean;
  allow_discount_notifications: boolean;
  preferred_notification_time: string;
  timezone: string;
}

export const useEnhancedWishlist = () => {
  const [wishlistItems, setWishlistItems] = useState<EnhancedWishlistItem[]>([]);
  const [userPreferences, setUserPreferences] = useState<UserPreferences | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Fetch wishlist items
  const fetchWishlistItems = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('wishlist_items')
        .select('*')
        .eq('user_id', user.id)
        .order('added_at', { ascending: false });

      if (error) throw error;
      setWishlistItems((data as EnhancedWishlistItem[]) || []);
    } catch (error) {
      console.error('Error fetching wishlist items:', error);
      toast({
        title: "Error",
        description: "Failed to fetch wishlist items",
        variant: "destructive"
      });
    }
  };

  // Fetch user preferences
  const fetchUserPreferences = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      
      if (!data) {
        // Create default preferences
        await createDefaultPreferences(user.id);
      } else {
        setUserPreferences(data);
      }
    } catch (error) {
      console.error('Error fetching user preferences:', error);
    }
  };

  // Create default preferences
  const createDefaultPreferences = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_preferences')
        .insert({
          user_id: userId,
          reminder_frequency: 24,
          allow_marketing_notifications: true,
          allow_discount_notifications: true,
          preferred_notification_time: '10:00:00',
          timezone: 'Asia/Dhaka'
        })
        .select()
        .single();

      if (error) throw error;
      setUserPreferences(data);
    } catch (error) {
      console.error('Error creating default preferences:', error);
    }
  };

  // Add item to wishlist
  const addToWishlist = async (item: {
    product_id?: string;
    service_id?: string;
    item_type: 'product' | 'service';
    metadata?: any;
  }) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Login Required",
          description: "Please login to add items to wishlist",
          variant: "destructive"
        });
        return;
      }

      const { data, error } = await supabase
        .from('wishlist_items')
        .insert({
          user_id: user.id,
          ...item,
          reminder_frequency: userPreferences?.reminder_frequency || 24
        })
        .select()
        .single();

      if (error) throw error;

      setWishlistItems(prev => [data as EnhancedWishlistItem, ...prev]);
      toast({
        title: "Added to Wishlist",
        description: "Item added to your wishlist successfully",
      });

    } catch (error: any) {
      console.error('Error adding to wishlist:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to add item to wishlist",
        variant: "destructive"
      });
    }
  };

  // Remove item from wishlist
  const removeFromWishlist = async (id: string) => {
    try {
      const { error } = await supabase
        .from('wishlist_items')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setWishlistItems(prev => prev.filter(item => item.id !== id));
      toast({
        title: "Removed from Wishlist",
        description: "Item removed from your wishlist",
      });

    } catch (error: any) {
      console.error('Error removing from wishlist:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to remove item from wishlist",
        variant: "destructive"
      });
    }
  };

  // Update user preferences
  const updateUserPreferences = async (preferences: Partial<UserPreferences>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('user_preferences')
        .update(preferences)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;
      
      setUserPreferences(data);
      toast({
        title: "Preferences Updated",
        description: "Your notification preferences have been updated",
      });

    } catch (error: any) {
      console.error('Error updating preferences:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to update preferences",
        variant: "destructive"
      });
    }
  };

  // Check if item is in wishlist
  const isInWishlist = (productId?: string, serviceId?: string) => {
    return wishlistItems.some(item => 
      (productId && item.product_id === productId) || 
      (serviceId && item.service_id === serviceId)
    );
  };

  // Mark item as purchased
  const markAsPurchased = async (id: string) => {
    try {
      const { error } = await supabase
        .from('wishlist_items')
        .update({ conversion_status: 'purchased' })
        .eq('id', id);

      if (error) throw error;

      setWishlistItems(prev => 
        prev.map(item => 
          item.id === id 
            ? { ...item, conversion_status: 'purchased' as const }
            : item
        )
      );

    } catch (error) {
      console.error('Error marking as purchased:', error);
    }
  };

  useEffect(() => {
    const initializeData = async () => {
      setLoading(true);
      await Promise.all([
        fetchWishlistItems(),
        fetchUserPreferences()
      ]);
      setLoading(false);
    };

    initializeData();

    // Set up real-time subscription
    const channel = supabase
      .channel('wishlist-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'wishlist_items'
      }, (payload) => {
        if (payload.eventType === 'INSERT') {
          setWishlistItems(prev => [payload.new as EnhancedWishlistItem, ...prev]);
        } else if (payload.eventType === 'DELETE') {
          setWishlistItems(prev => prev.filter(item => item.id !== payload.old.id));
        } else if (payload.eventType === 'UPDATE') {
          setWishlistItems(prev => 
            prev.map(item => 
              item.id === payload.new.id 
                ? payload.new as EnhancedWishlistItem 
                : item
            )
          );
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return {
    wishlistItems,
    userPreferences,
    loading,
    addToWishlist,
    removeFromWishlist,
    updateUserPreferences,
    isInWishlist,
    markAsPurchased,
    wishlistCount: wishlistItems.length
  };
};