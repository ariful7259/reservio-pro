import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface OrderNotificationRequest {
  orderId: string;
  type: 'confirmation' | 'status_update' | 'shipped' | 'delivered' | 'cancelled';
  customerEmail: string;
  customerName: string;
  orderDetails: {
    items: Array<{
      name: string;
      price: number;
      quantity: number;
    }>;
    totalAmount: number;
    finalPrice: number;
    deliveryAddress?: {
      fullName: string;
      phone: string;
      address: string;
      city: string;
      area: string;
    };
    trackingId?: string;
    status?: string;
  };
}

const getEmailTemplate = (type: string, data: OrderNotificationRequest) => {
  const { customerName, orderDetails, orderId } = data;
  const trackingId = orderDetails.trackingId || `TRK${orderId.slice(0, 8).toUpperCase()}`;
  
  const itemsHtml = orderDetails.items.map(item => `
    <tr>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">${item.name}</td>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: center;">${item.quantity}</td>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right;">৳${item.price.toLocaleString()}</td>
    </tr>
  `).join('');

  const addressHtml = orderDetails.deliveryAddress ? `
    <div style="background: #f9fafb; padding: 16px; border-radius: 8px; margin-top: 20px;">
      <h3 style="margin: 0 0 12px 0; color: #374151;">📍 ডেলিভারি ঠিকানা</h3>
      <p style="margin: 0; color: #4b5563;">
        <strong>${orderDetails.deliveryAddress.fullName}</strong><br>
        ${orderDetails.deliveryAddress.phone}<br>
        ${orderDetails.deliveryAddress.address}<br>
        ${orderDetails.deliveryAddress.area}, ${orderDetails.deliveryAddress.city}
      </p>
    </div>
  ` : '';

  switch (type) {
    case 'confirmation':
      return {
        subject: `অর্ডার নিশ্চিত হয়েছে! #${orderId.slice(0, 8).toUpperCase()}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 20px; background-color: #f3f4f6;">
            <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
              <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 30px; text-align: center;">
                <h1 style="color: white; margin: 0; font-size: 24px;">✅ অর্ডার নিশ্চিত হয়েছে!</h1>
              </div>
              
              <div style="padding: 30px;">
                <p style="color: #374151; font-size: 16px;">প্রিয় ${customerName},</p>
                <p style="color: #4b5563;">আপনার অর্ডার সফলভাবে গ্রহণ করা হয়েছে। আমরা শীঘ্রই আপনার অর্ডার প্রসেস করব।</p>
                
                <div style="background: #f0fdf4; border-left: 4px solid #10b981; padding: 16px; margin: 20px 0; border-radius: 0 8px 8px 0;">
                  <p style="margin: 0; color: #166534;">
                    <strong>অর্ডার ID:</strong> #${orderId.slice(0, 8).toUpperCase()}<br>
                    <strong>ট্র্যাকিং ID:</strong> ${trackingId}
                  </p>
                </div>
                
                <h3 style="color: #374151; margin-top: 24px;">📦 অর্ডার আইটেম</h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <thead>
                    <tr style="background: #f9fafb;">
                      <th style="padding: 12px; text-align: left; color: #374151;">পণ্য</th>
                      <th style="padding: 12px; text-align: center; color: #374151;">পরিমাণ</th>
                      <th style="padding: 12px; text-align: right; color: #374151;">মূল্য</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${itemsHtml}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colspan="2" style="padding: 12px; text-align: right; font-weight: bold;">মোট:</td>
                      <td style="padding: 12px; text-align: right; font-weight: bold; color: #10b981;">৳${orderDetails.finalPrice.toLocaleString()}</td>
                    </tr>
                  </tfoot>
                </table>
                
                ${addressHtml}
                
                <p style="color: #6b7280; font-size: 14px; margin-top: 24px;">
                  ধন্যবাদ আমাদের সাথে কেনাকাটার জন্য!
                </p>
              </div>
              
              <div style="background: #f9fafb; padding: 20px; text-align: center; color: #6b7280; font-size: 12px;">
                <p style="margin: 0;">© 2025 রিজার্ভিও প্রো। সর্বস্বত্ব সংরক্ষিত।</p>
              </div>
            </div>
          </body>
          </html>
        `
      };
      
    case 'shipped':
      return {
        subject: `আপনার অর্ডার পাঠানো হয়েছে! 🚚 #${orderId.slice(0, 8).toUpperCase()}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
          </head>
          <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 20px; background-color: #f3f4f6;">
            <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
              <div style="background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); padding: 30px; text-align: center;">
                <h1 style="color: white; margin: 0; font-size: 24px;">🚚 অর্ডার পাঠানো হয়েছে!</h1>
              </div>
              
              <div style="padding: 30px;">
                <p style="color: #374151; font-size: 16px;">প্রিয় ${customerName},</p>
                <p style="color: #4b5563;">আপনার অর্ডার পাঠানো হয়েছে এবং শীঘ্রই আপনার কাছে পৌঁছে যাবে।</p>
                
                <div style="background: #eff6ff; border-left: 4px solid #3b82f6; padding: 16px; margin: 20px 0; border-radius: 0 8px 8px 0;">
                  <p style="margin: 0; color: #1e40af;">
                    <strong>ট্র্যাকিং ID:</strong> ${trackingId}<br>
                    <strong>আনুমানিক ডেলিভারি:</strong> ২-৩ কর্মদিবস
                  </p>
                </div>
                
                ${addressHtml}
              </div>
            </div>
          </body>
          </html>
        `
      };
      
    case 'delivered':
      return {
        subject: `অর্ডার ডেলিভার হয়েছে! ✅ #${orderId.slice(0, 8).toUpperCase()}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
          </head>
          <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 20px; background-color: #f3f4f6;">
            <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
              <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 30px; text-align: center;">
                <h1 style="color: white; margin: 0; font-size: 24px;">✅ অর্ডার ডেলিভার হয়েছে!</h1>
              </div>
              
              <div style="padding: 30px;">
                <p style="color: #374151; font-size: 16px;">প্রিয় ${customerName},</p>
                <p style="color: #4b5563;">আপনার অর্ডার সফলভাবে ডেলিভার করা হয়েছে। আশা করি আপনি পণ্য পেয়ে সন্তুষ্ট হয়েছেন!</p>
                
                <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
                  <p style="margin: 0 0 12px 0; color: #166534;">আপনার অভিজ্ঞতা শেয়ার করুন!</p>
                  <a href="#" style="display: inline-block; background: #10b981; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">⭐ রিভিউ দিন</a>
                </div>
              </div>
            </div>
          </body>
          </html>
        `
      };
      
    case 'cancelled':
      return {
        subject: `অর্ডার বাতিল হয়েছে 😔 #${orderId.slice(0, 8).toUpperCase()}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
          </head>
          <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 20px; background-color: #f3f4f6;">
            <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
              <div style="background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); padding: 30px; text-align: center;">
                <h1 style="color: white; margin: 0; font-size: 24px;">😔 অর্ডার বাতিল হয়েছে</h1>
              </div>
              
              <div style="padding: 30px;">
                <p style="color: #374151; font-size: 16px;">প্রিয় ${customerName},</p>
                <p style="color: #4b5563;">দুঃখিত, আপনার অর্ডার বাতিল করা হয়েছে। যদি কোন পেমেন্ট করে থাকেন তাহলে রিফান্ড প্রসেস করা হবে।</p>
                
                <div style="background: #fef2f2; border-left: 4px solid #ef4444; padding: 16px; margin: 20px 0; border-radius: 0 8px 8px 0;">
                  <p style="margin: 0; color: #991b1b;">
                    <strong>অর্ডার ID:</strong> #${orderId.slice(0, 8).toUpperCase()}
                  </p>
                </div>
                
                <p style="color: #6b7280;">কোন প্রশ্ন থাকলে আমাদের সাপোর্ট টিমের সাথে যোগাযোগ করুন।</p>
              </div>
            </div>
          </body>
          </html>
        `
      };
      
    default:
      return {
        subject: `অর্ডার আপডেট #${orderId.slice(0, 8).toUpperCase()}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
          </head>
          <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 20px; background-color: #f3f4f6;">
            <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
              <div style="background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%); padding: 30px; text-align: center;">
                <h1 style="color: white; margin: 0; font-size: 24px;">📦 অর্ডার আপডেট</h1>
              </div>
              
              <div style="padding: 30px;">
                <p style="color: #374151; font-size: 16px;">প্রিয় ${customerName},</p>
                <p style="color: #4b5563;">আপনার অর্ডারের স্ট্যাটাস আপডেট হয়েছে।</p>
                
                <div style="background: #eef2ff; border-left: 4px solid #6366f1; padding: 16px; margin: 20px 0; border-radius: 0 8px 8px 0;">
                  <p style="margin: 0; color: #3730a3;">
                    <strong>বর্তমান স্ট্যাটাস:</strong> ${orderDetails.status || 'প্রক্রিয়াধীন'}
                  </p>
                </div>
              </div>
            </div>
          </body>
          </html>
        `
      };
  }
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: OrderNotificationRequest = await req.json();
    
    console.log("Sending order notification:", {
      orderId: data.orderId,
      type: data.type,
      customerEmail: data.customerEmail
    });

    // Check if RESEND_API_KEY is configured
    const apiKey = Deno.env.get("RESEND_API_KEY");
    if (!apiKey) {
      console.warn("RESEND_API_KEY not configured, skipping email notification");
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: "Email notifications not configured. Please add RESEND_API_KEY." 
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const { subject, html } = getEmailTemplate(data.type, data);

    const emailResponse = await resend.emails.send({
      from: "রিজার্ভিও প্রো <onboarding@resend.dev>",
      to: [data.customerEmail],
      subject: subject,
      html: html,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(
      JSON.stringify({ success: true, data: emailResponse }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-order-notification function:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
