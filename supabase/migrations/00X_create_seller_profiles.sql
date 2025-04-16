
CREATE TABLE public.seller_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    seller_type TEXT CHECK (
        seller_type IN ('marketplace', 'rental', 'service', 'content')
    ),
    business_name TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add a trigger to automatically update the updated_at column
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_seller_profile_modtime
BEFORE UPDATE ON public.seller_profiles
FOR EACH ROW
EXECUTE FUNCTION update_modified_column();
