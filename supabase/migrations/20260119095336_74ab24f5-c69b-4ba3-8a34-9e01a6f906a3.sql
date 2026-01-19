-- Add new columns for NID/Passport verification
ALTER TABLE public.seller_applications
ADD COLUMN IF NOT EXISTS nid_number TEXT,
ADD COLUMN IF NOT EXISTS nid_type TEXT DEFAULT 'nid',
ADD COLUMN IF NOT EXISTS nid_front_image TEXT,
ADD COLUMN IF NOT EXISTS nid_back_image TEXT;

-- Add columns for Bank/Mobile Banking information
ALTER TABLE public.seller_applications
ADD COLUMN IF NOT EXISTS bank_name TEXT,
ADD COLUMN IF NOT EXISTS bank_account_number TEXT,
ADD COLUMN IF NOT EXISTS bank_account_holder TEXT,
ADD COLUMN IF NOT EXISTS bank_branch TEXT,
ADD COLUMN IF NOT EXISTS mobile_banking_provider TEXT,
ADD COLUMN IF NOT EXISTS mobile_banking_number TEXT;

-- Add columns for Trade License
ALTER TABLE public.seller_applications
ADD COLUMN IF NOT EXISTS trade_license_number TEXT,
ADD COLUMN IF NOT EXISTS trade_license_image TEXT,
ADD COLUMN IF NOT EXISTS trade_license_expiry DATE;

-- Add columns for Social Media Links
ALTER TABLE public.seller_applications
ADD COLUMN IF NOT EXISTS facebook_url TEXT,
ADD COLUMN IF NOT EXISTS instagram_url TEXT,
ADD COLUMN IF NOT EXISTS whatsapp_number TEXT,
ADD COLUMN IF NOT EXISTS website_url TEXT;

-- Add columns for Product Samples, References, and Video
ALTER TABLE public.seller_applications
ADD COLUMN IF NOT EXISTS product_samples JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS seller_references JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS video_introduction_url TEXT;

-- Add comment for documentation
COMMENT ON COLUMN public.seller_applications.nid_type IS 'Type of ID: nid or passport';
COMMENT ON COLUMN public.seller_applications.mobile_banking_provider IS 'Provider: bkash, nagad, rocket';
COMMENT ON COLUMN public.seller_applications.product_samples IS 'Array of product samples: [{name, image, description}]';
COMMENT ON COLUMN public.seller_applications.seller_references IS 'Array of references: [{name, phone, relationship}]';