import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

export interface NotificationTemplate {
  id: string;
  name: string;
  subject: string;
  message: string;
  notification_type: 'custom' | 'verification' | 'warning' | 'announcement';
  is_active: boolean;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export const useNotificationTemplates = () => {
  const [templates, setTemplates] = useState<NotificationTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();

  const fetchTemplates = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('notification_templates')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTemplates((data || []) as NotificationTemplate[]);
    } catch (error: any) {
      console.error('Failed to fetch templates:', error);
    } finally {
      setLoading(false);
    }
  };

  const createTemplate = async (template: Omit<NotificationTemplate, 'id' | 'created_at' | 'updated_at' | 'created_by' | 'is_active'>) => {
    try {
      const { data, error } = await supabase
        .from('notification_templates')
        .insert({
          ...template,
          created_by: user?.id
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "সফল",
        description: "টেমপ্লেট তৈরি হয়েছে।"
      });

      await fetchTemplates();
      return data as NotificationTemplate;
    } catch (error: any) {
      toast({
        title: "ত্রুটি",
        description: "টেমপ্লেট তৈরি করতে সমস্যা হয়েছে।",
        variant: "destructive"
      });
      return null;
    }
  };

  const updateTemplate = async (id: string, updates: Partial<NotificationTemplate>) => {
    try {
      const { error } = await supabase
        .from('notification_templates')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "সফল",
        description: "টেমপ্লেট আপডেট হয়েছে।"
      });

      await fetchTemplates();
    } catch (error: any) {
      toast({
        title: "ত্রুটি",
        description: "টেমপ্লেট আপডেট করতে সমস্যা হয়েছে।",
        variant: "destructive"
      });
    }
  };

  const deleteTemplate = async (id: string) => {
    try {
      const { error } = await supabase
        .from('notification_templates')
        .update({ is_active: false })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "সফল",
        description: "টেমপ্লেট মুছে ফেলা হয়েছে।"
      });

      await fetchTemplates();
    } catch (error: any) {
      toast({
        title: "ত্রুটি",
        description: "টেমপ্লেট মুছতে সমস্যা হয়েছে।",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  return {
    templates,
    loading,
    fetchTemplates,
    createTemplate,
    updateTemplate,
    deleteTemplate
  };
};
