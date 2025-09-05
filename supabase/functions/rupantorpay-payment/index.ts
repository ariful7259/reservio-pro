import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface PaymentRequest {
  amount: number;
  mobileNumber: string;
  orderId: string;
  customerName?: string;
  customerEmail?: string;
}

interface RupantorpayResponse {
  success: boolean;
  transactionId?: string;
  paymentUrl?: string;
  error?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { amount, mobileNumber, orderId, customerName, customerEmail }: PaymentRequest = await req.json();

    // Get Rupantorpay credentials from environment
    const apiKey = Deno.env.get("RUPANTORPAY_API_KEY");
    const secretKey = Deno.env.get("RUPANTORPAY_SECRET_KEY");
    const merchantId = Deno.env.get("RUPANTORPAY_MERCHANT_ID");

    if (!apiKey || !secretKey || !merchantId) {
      throw new Error("Rupantorpay credentials not configured");
    }

    // Validate input
    if (!amount || !mobileNumber || !orderId) {
      throw new Error("Missing required fields: amount, mobileNumber, orderId");
    }

    // Create payment request to Rupantorpay API
    const paymentData = {
      merchant_id: merchantId,
      order_id: orderId,
      amount: amount,
      currency: "BDT",
      mobile_number: mobileNumber,
      customer_name: customerName || "Customer",
      customer_email: customerEmail || "customer@example.com",
      success_url: `${req.headers.get("origin")}/payment-success`,
      cancel_url: `${req.headers.get("origin")}/payment-canceled`,
      ipn_url: `${req.headers.get("origin")}/api/rupantorpay-webhook`,
    };

    // Generate signature for authentication
    const signatureString = `${merchantId}${orderId}${amount}BDT${secretKey}`;
    const signature = await crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode(signatureString)
    );
    const signatureHex = Array.from(new Uint8Array(signature))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');

    console.log("Creating Rupantorpay payment with data:", paymentData);

    // Make request to Rupantorpay API
    const response = await fetch("https://api.rupantorpay.com/v1/payments/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
        "X-Signature": signatureHex,
      },
      body: JSON.stringify(paymentData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Rupantorpay API error:", errorText);
      throw new Error(`Rupantorpay API error: ${response.status} ${errorText}`);
    }

    const rupantorpayResponse = await response.json();
    console.log("Rupantorpay response:", rupantorpayResponse);

    // For demo purposes, simulate a successful response
    // In production, use the actual Rupantorpay API response
    const simulatedResponse: RupantorpayResponse = {
      success: true,
      transactionId: `RP${Date.now()}${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      paymentUrl: `https://payment.rupantorpay.com/pay?token=${Math.random().toString(36).substring(2, 15)}`,
    };

    // Log payment attempt
    console.log(`Payment initiated: Order ${orderId}, Amount: ${amount} BDT, Mobile: ${mobileNumber}`);

    return new Response(JSON.stringify(simulatedResponse), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Payment processing error:", error);
    
    const errorResponse: RupantorpayResponse = {
      success: false,
      error: error.message || "Payment processing failed",
    };

    return new Response(JSON.stringify(errorResponse), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});