-- Allow users to delete their own rejected applications
CREATE POLICY "Users can delete own rejected application"
ON public.seller_applications
FOR DELETE
USING (auth.uid() = user_id AND status = 'rejected');