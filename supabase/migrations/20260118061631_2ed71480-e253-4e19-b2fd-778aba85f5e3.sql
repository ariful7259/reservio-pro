-- Create seller application status enum
CREATE TYPE public.seller_application_status AS ENUM ('pending', 'approved', 'rejected');

-- Create seller_applications table
CREATE TABLE public.seller_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    business_name TEXT NOT NULL,
    business_type TEXT NOT NULL,
    phone TEXT,
    email TEXT,
    address TEXT,
    description TEXT,
    category TEXT,
    experience TEXT,
    documents TEXT[],
    status seller_application_status DEFAULT 'pending' NOT NULL,
    admin_notes TEXT,
    reviewed_by UUID REFERENCES auth.users(id),
    reviewed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE public.seller_applications ENABLE ROW LEVEL SECURITY;

-- Users can view their own applications
CREATE POLICY "Users can view own application"
ON public.seller_applications
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Users can create their own application
CREATE POLICY "Users can create own application"
ON public.seller_applications
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Admins can view all applications
CREATE POLICY "Admins can view all applications"
ON public.seller_applications
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Admins can update applications
CREATE POLICY "Admins can update applications"
ON public.seller_applications
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for updated_at
CREATE TRIGGER update_seller_applications_updated_at
BEFORE UPDATE ON public.seller_applications
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create the approve function
CREATE OR REPLACE FUNCTION public.approve_seller_application(application_id UUID, admin_user_id UUID, notes TEXT DEFAULT NULL)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    app_record RECORD;
BEGIN
    -- Check if admin has role
    IF NOT public.has_role(admin_user_id, 'admin'::app_role) THEN
        RAISE EXCEPTION 'Unauthorized: Admin access required';
    END IF;
    
    -- Get application
    SELECT * INTO app_record FROM public.seller_applications WHERE id = application_id;
    
    IF app_record IS NULL THEN
        RAISE EXCEPTION 'Application not found';
    END IF;
    
    IF app_record.status != 'pending' THEN
        RAISE EXCEPTION 'Application already processed';
    END IF;
    
    -- Update application status
    UPDATE public.seller_applications
    SET status = 'approved',
        admin_notes = notes,
        reviewed_by = admin_user_id,
        reviewed_at = NOW(),
        updated_at = NOW()
    WHERE id = application_id;
    
    -- Create seller profile
    INSERT INTO public.seller_profiles (id, seller_type, business_name, phone, email, address, bio)
    VALUES (
        app_record.user_id,
        app_record.business_type::seller_type,
        app_record.business_name,
        app_record.phone,
        app_record.email,
        app_record.address,
        app_record.description
    )
    ON CONFLICT (id) DO UPDATE
    SET seller_type = EXCLUDED.seller_type,
        business_name = EXCLUDED.business_name,
        updated_at = NOW();
    
    RETURN TRUE;
END;
$$;

-- Create the reject function
CREATE OR REPLACE FUNCTION public.reject_seller_application(application_id UUID, admin_user_id UUID, notes TEXT DEFAULT NULL)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    -- Check if admin has role
    IF NOT public.has_role(admin_user_id, 'admin'::app_role) THEN
        RAISE EXCEPTION 'Unauthorized: Admin access required';
    END IF;
    
    -- Update application status
    UPDATE public.seller_applications
    SET status = 'rejected',
        admin_notes = notes,
        reviewed_by = admin_user_id,
        reviewed_at = NOW(),
        updated_at = NOW()
    WHERE id = application_id AND status = 'pending';
    
    RETURN FOUND;
END;
$$;