-- Phase 3: Database Cleanup Migration (Fixed with CASCADE)
-- Drop tables and related objects properly

-- 1. Drop notification_queue table and related objects with CASCADE
DROP FUNCTION IF EXISTS schedule_wishlist_reminder() CASCADE;
DROP TABLE IF EXISTS notification_queue CASCADE;

-- 2. Drop retargeting_campaigns table (unused marketing feature)
DROP TABLE IF EXISTS retargeting_campaigns CASCADE;

-- 3. Drop seller_insights table and related objects with CASCADE
DROP FUNCTION IF EXISTS update_seller_insights() CASCADE;
DROP TABLE IF EXISTS seller_insights CASCADE;

-- 4. Drop public_seller_profiles view and function
DROP FUNCTION IF EXISTS get_public_seller_info() CASCADE;

-- Add comment for documentation
COMMENT ON SCHEMA public IS 'Cleaned up unused tables: notification_queue, retargeting_campaigns, seller_insights - removed as part of app optimization on 2025-11-03';