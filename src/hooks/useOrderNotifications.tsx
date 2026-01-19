import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

interface OrderNotification {
  orderId: string;
  status: string;
  message: string;
}

export const useOrderNotifications = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (!user?.id) return;

    // Subscribe to order status changes
    const channel = supabase
      .channel('order-status-changes')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'reseller_orders',
          filter: `user_id=eq.${user.id}`
        },
        async (payload) => {
          const newOrder = payload.new as any;
          const oldOrder = payload.old as any;
          
          // Only notify if status changed
          if (newOrder.status !== oldOrder.status) {
            const notification = getStatusNotification(newOrder.status, newOrder.id);
            
            toast({
              title: notification.title,
              description: notification.description,
              variant: notification.variant as 'default' | 'destructive',
            });

            // Also send email notification for important status changes
            if (['shipped', 'delivered', 'cancelled'].includes(newOrder.status)) {
              try {
                const orderData = typeof newOrder.order_data === 'object' ? newOrder.order_data : {};
                await supabase.functions.invoke('send-order-notification', {
                  body: {
                    orderId: newOrder.id,
                    type: newOrder.status,
                    customerEmail: user.email,
                    customerName: orderData?.deliveryAddress?.fullName || 'গ্রাহক',
                    orderDetails: {
                      items: orderData?.items || [],
                      totalAmount: newOrder.total_amount,
                      finalPrice: newOrder.final_price,
                      deliveryAddress: orderData?.deliveryAddress,
                      trackingId: `TRK${newOrder.id.slice(0, 8).toUpperCase()}`
                    }
                  }
                });
              } catch (error) {
                console.log('Email notification skipped:', error);
              }
            }
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id, user?.email, toast]);

  return null;
};

const getStatusNotification = (status: string, orderId: string) => {
  const shortId = orderId.slice(0, 8).toUpperCase();
  
  switch (status) {
    case 'confirmed':
      return {
        title: '✅ অর্ডার নিশ্চিত হয়েছে!',
        description: `অর্ডার #${shortId} নিশ্চিত করা হয়েছে। শীঘ্রই প্রসেস করা হবে।`,
        variant: 'default'
      };
    case 'processing':
      return {
        title: '🔄 অর্ডার প্রক্রিয়াধীন',
        description: `অর্ডার #${shortId} প্যাকেজিং শুরু হয়েছে।`,
        variant: 'default'
      };
    case 'shipped':
      return {
        title: '🚚 অর্ডার পাঠানো হয়েছে!',
        description: `অর্ডার #${shortId} কুরিয়ারে হস্তান্তর করা হয়েছে।`,
        variant: 'default'
      };
    case 'delivered':
      return {
        title: '🎉 অর্ডার ডেলিভার হয়েছে!',
        description: `অর্ডার #${shortId} সফলভাবে ডেলিভার করা হয়েছে।`,
        variant: 'default'
      };
    case 'cancelled':
      return {
        title: '❌ অর্ডার বাতিল',
        description: `অর্ডার #${shortId} বাতিল করা হয়েছে।`,
        variant: 'destructive'
      };
    default:
      return {
        title: '📦 অর্ডার আপডেট',
        description: `অর্ডার #${shortId} স্ট্যাটাস: ${status}`,
        variant: 'default'
      };
  }
};

export default useOrderNotifications;
