import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Get payout delay days from settings
    const { data: settings } = await supabase
      .from('reseller_settings')
      .select('payout_delay_days')
      .limit(1)
      .single()

    const payoutDelayDays = settings?.payout_delay_days || 7

    // Calculate cutoff date
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - payoutDelayDays)

    // Find completed orders that haven't updated balance yet
    const { data: eligibleOrders, error: fetchError } = await supabase
      .from('reseller_orders')
      .select('id, user_id, margin_amount, margin_blocked')
      .eq('status', 'completed')
      .eq('balance_updated', false)
      .eq('margin_blocked', false)
      .lt('created_at', cutoffDate.toISOString())

    if (fetchError) {
      console.error('Error fetching orders:', fetchError)
      throw fetchError
    }

    console.log(`Found ${eligibleOrders?.length || 0} eligible orders for auto-balance update`)

    let updatedCount = 0

    for (const order of eligibleOrders || []) {
      // Update reseller balance
      const { error: balanceError } = await supabase.rpc('update_reseller_balance', {
        p_user_id: order.user_id,
        p_amount: order.margin_amount,
        p_type: 'credit',
        p_description: `অর্ডার #${order.id.slice(0, 8)} থেকে মার্জিন (অটো)`,
        p_order_id: order.id
      })

      if (balanceError) {
        console.error(`Error updating balance for order ${order.id}:`, balanceError)
        continue
      }

      // Mark order as balance updated
      const { error: updateError } = await supabase
        .from('reseller_orders')
        .update({
          balance_updated: true,
          balance_update_date: new Date().toISOString()
        })
        .eq('id', order.id)

      if (updateError) {
        console.error(`Error updating order ${order.id}:`, updateError)
        continue
      }

      updatedCount++
    }

    // Process referral bonuses for new resellers
    const { data: unpaidReferrals, error: referralError } = await supabase
      .from('reseller_referrals')
      .select('id, referrer_id, referred_id, bonus_amount')
      .eq('bonus_paid', false)

    if (!referralError && unpaidReferrals) {
      for (const referral of unpaidReferrals) {
        // Check if referred user is a reseller now
        const { data: referredProfile } = await supabase
          .from('profiles')
          .select('is_reseller')
          .eq('id', referral.referred_id)
          .single()

        if (referredProfile?.is_reseller) {
          // Pay the referral bonus
          const { error: bonusError } = await supabase.rpc('update_reseller_balance', {
            p_user_id: referral.referrer_id,
            p_amount: referral.bonus_amount,
            p_type: 'credit',
            p_description: 'রেফারেল বোনাস'
          })

          if (!bonusError) {
            await supabase
              .from('reseller_referrals')
              .update({
                bonus_paid: true,
                paid_at: new Date().toISOString()
              })
              .eq('id', referral.id)
          }
        }
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: `Updated ${updatedCount} orders`,
        eligibleCount: eligibleOrders?.length || 0
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    )
  } catch (error) {
    console.error('Error in auto-balance-update:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    )
  }
})
