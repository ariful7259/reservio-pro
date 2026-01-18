import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export function usePendingApplicationsCount() {
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCount = async () => {
    try {
      const { count, error } = await supabase
        .from('seller_applications')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending');

      if (error) throw error;
      setCount(count || 0);
    } catch (error) {
      console.error('Failed to fetch pending applications count:', error);
      setCount(0);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCount();

    // Subscribe to realtime changes
    const channel = supabase
      .channel('seller_applications_count')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'seller_applications'
        },
        () => {
          fetchCount();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { count, isLoading, refetch: fetchCount };
}
