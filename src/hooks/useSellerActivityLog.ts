import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export interface ActivityLog {
  id: string;
  seller_id: string;
  action_type: string;
  action_details: Record<string, any> | null;
  performed_by: string | null;
  ip_address: string | null;
  created_at: string;
}

export const useSellerActivityLog = () => {
  const { user } = useAuth();

  const logActivity = async (
    sellerId: string,
    actionType: string,
    actionDetails?: Record<string, any>
  ) => {
    try {
      const { error } = await supabase
        .from('seller_activity_logs')
        .insert({
          seller_id: sellerId,
          action_type: actionType,
          action_details: actionDetails || null,
          performed_by: user?.id || null
        });

      if (error) {
        console.error('Failed to log activity:', error);
      }
    } catch (err) {
      console.error('Activity log error:', err);
    }
  };

  const getActivityLogs = async (sellerId?: string, limit = 50) => {
    let query = supabase
      .from('seller_activity_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (sellerId) {
      query = query.eq('seller_id', sellerId);
    }

    const { data, error } = await query;
    
    if (error) {
      console.error('Failed to fetch activity logs:', error);
      return [];
    }

    return data as ActivityLog[];
  };

  return { logActivity, getActivityLogs };
};
