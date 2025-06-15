
-- Product টেবিল: মাল্টিপল ইমেজ, ক্যাটাগরি, স্টক, created_by 
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  images TEXT[] DEFAULT '{}',
  price NUMERIC(12,2) NOT NULL,
  category TEXT,
  stock INTEGER DEFAULT 0,
  created_by UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Wishlist টেবিল: user প্রতি প্রোডাক্ট wishlist করা যাবে
CREATE TABLE IF NOT EXISTS public.wishlists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  product_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Order টেবিল: অর্ডার ট্র্যাকিংয়ের জন্য
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  product_id UUID NOT NULL,
  quantity INTEGER DEFAULT 1,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Review টেবিল: রেটিং ও রিভিউ-এর জন্য
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL,
  user_id UUID NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  content TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Access Policies
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Products দেখার policy (সবাই)
CREATE POLICY "Products are viewable by anyone"
  ON public.products
  FOR SELECT
  USING (true);

-- Product যোগানো (শুধুমাত্র logged-in)
CREATE POLICY "Product add by authenticated"
  ON public.products
  FOR INSERT
  WITH CHECK (auth.uid() = created_by);

-- নিজের wishlist/অর্ডার/রিভিউ দেখতে/অ্যাড/ডিলিট করতে পারবে
CREATE POLICY "User can manage own wishlist"
  ON public.wishlists
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "User can manage own orders"
  ON public.orders
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "User can manage own reviews"
  ON public.reviews
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- অর্ডার update trigger
CREATE OR REPLACE FUNCTION public.update_order_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language plpgsql;

DROP TRIGGER IF EXISTS trigger_update_order_updated_at ON public.orders;
CREATE TRIGGER trigger_update_order_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION public.update_order_updated_at();

