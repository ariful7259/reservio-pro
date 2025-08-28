-- Fix security warnings by setting search_path for functions

-- Update update_seller_insights function with proper search_path
CREATE OR REPLACE FUNCTION public.update_seller_insights()
RETURNS TRIGGER 
LANGUAGE plpgsql 
SECURITY DEFINER 
SET search_path = public
AS $$
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
$$;

-- Update schedule_wishlist_reminder function with proper search_path
CREATE OR REPLACE FUNCTION public.schedule_wishlist_reminder()
RETURNS TRIGGER 
LANGUAGE plpgsql 
SECURITY DEFINER 
SET search_path = public
AS $$
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
$$;

-- Update update_updated_at_wishlist function with proper search_path
CREATE OR REPLACE FUNCTION public.update_updated_at_wishlist()
RETURNS TRIGGER 
LANGUAGE plpgsql 
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;