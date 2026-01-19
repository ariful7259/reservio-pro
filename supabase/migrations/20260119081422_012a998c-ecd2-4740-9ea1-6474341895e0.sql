-- Create storage bucket for seller documents
INSERT INTO storage.buckets (id, name, public)
VALUES ('seller-documents', 'seller-documents', false)
ON CONFLICT (id) DO NOTHING;

-- RLS policies for seller-documents bucket
CREATE POLICY "Users can upload their own seller documents"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'seller-documents' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can view their own seller documents"
ON storage.objects
FOR SELECT
USING (
  bucket_id = 'seller-documents' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Admins can view all seller documents"
ON storage.objects
FOR SELECT
USING (
  bucket_id = 'seller-documents' 
  AND public.has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Users can delete their own seller documents"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'seller-documents' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);