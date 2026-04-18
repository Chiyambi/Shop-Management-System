-- ==========================================
-- FIX: Allow all staff to log expenses
-- ==========================================

-- 1. Drop existing insert policy
DROP POLICY IF EXISTS "Expenses insert access" ON expenses;

-- 2. Create new insert policy that checks for shop membership instead of management role
CREATE POLICY "Expenses insert access" ON expenses 
FOR INSERT WITH CHECK (
    shop_id IN (SELECT get_user_shop_access()) 
    AND check_is_shop_member(shop_id)
);

-- Note: Management (Owner/Admin/Manager) can still manage (Edit/Delete)
-- as those policies remain unchanged and use can_manage_shop().
