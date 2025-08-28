-- Create wishlist_items table for enhanced wishlist functionality
CREATE TABLE public.wishlist_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  product_id UUID,
  service_id UUID,
  item_type TEXT NOT NULL CHECK (item_type IN ('product', 'service')),
  added_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  reminder_frequency INTEGER DEFAULT 24, -- hours
  last_reminder_sent TIMESTAMP WITH TIME ZONE,
  conversion_status TEXT DEFAULT 'pending' CHECK (conversion_status IN ('pending', 'purchased', 'ignored')),
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Create seller_insights table for analytics
CREATE TABLE public.seller_insights (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  seller_id UUID NOT NULL,
  product_id UUID,
  service_id UUID,
  item_type TEXT NOT NULL CHECK (item_type IN ('product', 'service')),
  wishlist_count INTEGER DEFAULT 0,
  conversion_count INTEGER DEFAULT 0,
  conversion_rate DECIMAL(5,2) DEFAULT 0.00,
  last_updated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create notification_queue table for automated reminders
CREATE TABLE public.notification_queue (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  wishlist_item_id UUID NOT NULL REFERENCES public.wishlist_items(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  notification_type TEXT NOT NULL CHECK (notification_type IN ('reminder', 'discount', 'retarget')),
  scheduled_for TIMESTAMP WITH TIME ZONE NOT NULL,
  sent_at TIMESTAMP WITH TIME ZONE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed')),
  content JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create retargeting_campaigns table for seller campaigns
CREATE TABLE public.retargeting_campaigns (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  seller_id UUID NOT NULL,
  campaign_name TEXT NOT NULL,
  target_product_id UUID,
  target_service_id UUID,
  item_type TEXT NOT NULL CHECK (item_type IN ('product', 'service')),
  discount_percentage INTEGER CHECK (discount_percentage >= 0 AND discount_percentage <= 100),
  discount_amount DECIMAL(10,2),
  campaign_message TEXT,
  start_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  end_date TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT true,
  target_criteria JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_preferences table for reminder settings
CREATE TABLE public.user_preferences (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  reminder_frequency INTEGER DEFAULT 24, -- hours
  allow_marketing_notifications BOOLEAN DEFAULT true,
  allow_discount_notifications BOOLEAN DEFAULT true,
  preferred_notification_time TIME DEFAULT '10:00:00',
  timezone TEXT DEFAULT 'Asia/Dhaka',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security on all tables
ALTER TABLE public.wishlist_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seller_insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notification_queue ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.retargeting_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for wishlist_items
CREATE POLICY "Users can manage their own wishlist items" 
ON public.wishlist_items 
FOR ALL 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for seller_insights
CREATE POLICY "Sellers can view their own insights" 
ON public.seller_insights 
FOR SELECT 
USING (auth.uid() = seller_id);

CREATE POLICY "System can manage seller insights" 
ON public.seller_insights 
FOR ALL 
USING (true);

-- Create RLS policies for notification_queue
CREATE POLICY "Users can view their own notifications" 
ON public.notification_queue 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "System can manage notifications" 
ON public.notification_queue 
FOR ALL 
USING (true);

-- Create RLS policies for retargeting_campaigns
CREATE POLICY "Sellers can manage their own campaigns" 
ON public.retargeting_campaigns 
FOR ALL 
USING (auth.uid() = seller_id)
WITH CHECK (auth.uid() = seller_id);

-- Create RLS policies for user_preferences
CREATE POLICY "Users can manage their own preferences" 
ON public.user_preferences 
FOR ALL 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX idx_wishlist_items_user_id ON public.wishlist_items(user_id);
CREATE INDEX idx_wishlist_items_product_id ON public.wishlist_items(product_id);
CREATE INDEX idx_wishlist_items_service_id ON public.wishlist_items(service_id);
CREATE INDEX idx_wishlist_items_added_at ON public.wishlist_items(added_at);

CREATE INDEX idx_seller_insights_seller_id ON public.seller_insights(seller_id);
CREATE INDEX idx_seller_insights_product_id ON public.seller_insights(product_id);
CREATE INDEX idx_seller_insights_service_id ON public.seller_insights(service_id);

CREATE INDEX idx_notification_queue_user_id ON public.notification_queue(user_id);
CREATE INDEX idx_notification_queue_scheduled_for ON public.notification_queue(scheduled_for);
CREATE INDEX idx_notification_queue_status ON public.notification_queue(status);

CREATE INDEX idx_retargeting_campaigns_seller_id ON public.retargeting_campaigns(seller_id);
CREATE INDEX idx_retargeting_campaigns_active ON public.retargeting_campaigns(is_active);

-- Create function to update seller insights
CREATE OR REPLACE FUNCTION public.update_seller_insights()
RETURNS TRIGGER AS $$
BEGIN
  -- Handle wishlist item insertion
  IF TG_OP = 'INSERT' THEN
    INSERT INTO public.seller_insights (
      seller_id, 
      product_id, 
      service_id, 
      item_type, 
      wishlist_count
    )
    SELECT 
      CASE 
        WHEN NEW.item_type = 'product' THEN p.created_by
        WHEN NEW.item_type = 'service' THEN s.created_by
      END as seller_id,
      NEW.product_id,
      NEW.service_id,
      NEW.item_type,
      1
    FROM 
      (SELECT created_by FROM public.products WHERE id = NEW.product_id) p
      FULL OUTER JOIN 
      (SELECT created_by FROM public.products WHERE id = NEW.service_id) s ON true
    WHERE 
      (NEW.item_type = 'product' AND p.created_by IS NOT NULL) OR
      (NEW.item_type = 'service' AND s.created_by IS NOT NULL)
    ON CONFLICT (seller_id, product_id, service_id, item_type) 
    DO UPDATE SET 
      wishlist_count = public.seller_insights.wishlist_count + 1,
      last_updated = now();
      
    RETURN NEW;
  END IF;
  
  -- Handle wishlist item deletion
  IF TG_OP = 'DELETE' THEN
    UPDATE public.seller_insights 
    SET 
      wishlist_count = GREATEST(0, wishlist_count - 1),
      last_updated = now()
    WHERE 
      (OLD.item_type = 'product' AND product_id = OLD.product_id) OR
      (OLD.item_type = 'service' AND service_id = OLD.service_id);
      
    RETURN OLD;
  END IF;
  
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for updating seller insights
CREATE TRIGGER wishlist_insights_trigger
  AFTER INSERT OR DELETE ON public.wishlist_items
  FOR EACH ROW EXECUTE FUNCTION public.update_seller_insights();

-- Create function to schedule automatic reminders
CREATE OR REPLACE FUNCTION public.schedule_wishlist_reminder()
RETURNS TRIGGER AS $$
BEGIN
  -- Schedule first reminder
  INSERT INTO public.notification_queue (
    wishlist_item_id,
    user_id,
    notification_type,
    scheduled_for,
    content
  ) VALUES (
    NEW.id,
    NEW.user_id,
    'reminder',
    NEW.added_at + INTERVAL '1 hour' * NEW.reminder_frequency,
    jsonb_build_object(
      'message', 'আপনার উইশলিস্টের আইটেমটি এখনও উপলব্ধ আছে!',
      'item_type', NEW.item_type,
      'product_id', NEW.product_id,
      'service_id', NEW.service_id
    )
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for scheduling reminders
CREATE TRIGGER schedule_reminder_trigger
  AFTER INSERT ON public.wishlist_items
  FOR EACH ROW EXECUTE FUNCTION public.schedule_wishlist_reminder();

-- Create function to update updated_at timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_wishlist()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for user_preferences updated_at
CREATE TRIGGER update_user_preferences_updated_at
  BEFORE UPDATE ON public.user_preferences
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_wishlist();