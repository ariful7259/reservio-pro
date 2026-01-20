-- Create seller activity log table
CREATE TABLE public.seller_activity_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  seller_id UUID NOT NULL,
  action_type TEXT NOT NULL,
  action_details JSONB,
  performed_by UUID,
  ip_address TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create index for faster queries
CREATE INDEX idx_seller_activity_logs_seller_id ON public.seller_activity_logs(seller_id);
CREATE INDEX idx_seller_activity_logs_created_at ON public.seller_activity_logs(created_at DESC);
CREATE INDEX idx_seller_activity_logs_action_type ON public.seller_activity_logs(action_type);

-- Enable RLS
ALTER TABLE public.seller_activity_logs ENABLE ROW LEVEL SECURITY;

-- Only admins can view activity logs
CREATE POLICY "Admins can view all activity logs"
ON public.seller_activity_logs
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- Only admins can insert activity logs
CREATE POLICY "Admins can insert activity logs"
ON public.seller_activity_logs
FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Create notification templates table
CREATE TABLE public.notification_templates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  notification_type TEXT NOT NULL DEFAULT 'custom',
  is_active BOOLEAN DEFAULT true,
  created_by UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.notification_templates ENABLE ROW LEVEL SECURITY;

-- Only admins can manage templates
CREATE POLICY "Admins can view all templates"
ON public.notification_templates
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert templates"
ON public.notification_templates
FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update templates"
ON public.notification_templates
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete templates"
ON public.notification_templates
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));