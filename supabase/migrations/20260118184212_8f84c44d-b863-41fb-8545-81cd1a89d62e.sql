-- Insert admin role for the first user (you can change the user_id as needed)
INSERT INTO public.user_roles (user_id, role)
VALUES ('58f4e222-895b-4b92-8ca8-ee267340b4d6', 'admin')
ON CONFLICT (user_id, role) DO NOTHING;