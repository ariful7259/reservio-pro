import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface SellerNotificationRequest {
  sellerEmail: string;
  sellerName: string;
  subject: string;
  message: string;
  notificationType: 'custom' | 'verification' | 'warning' | 'announcement';
}

const getEmailTemplate = (data: SellerNotificationRequest) => {
  const { sellerName, subject, message, notificationType } = data;
  
  let headerColor = '#6366f1';
  let headerIcon = '📬';
  
  switch (notificationType) {
    case 'verification':
      headerColor = '#10b981';
      headerIcon = '✅';
      break;
    case 'warning':
      headerColor = '#f59e0b';
      headerIcon = '⚠️';
      break;
    case 'announcement':
      headerColor = '#3b82f6';
      headerIcon = '📢';
      break;
    default:
      headerColor = '#6366f1';
      headerIcon = '📬';
  }
  
  return {
    subject: subject,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 20px; background-color: #f3f4f6;">
        <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <div style="background: linear-gradient(135deg, ${headerColor} 0%, ${headerColor}dd 100%); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">${headerIcon} ${subject}</h1>
          </div>
          
          <div style="padding: 30px;">
            <p style="color: #374151; font-size: 16px;">প্রিয় ${sellerName},</p>
            
            <div style="color: #4b5563; font-size: 15px; line-height: 1.7; white-space: pre-wrap;">
              ${message}
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; font-size: 14px; margin: 0;">
                কোন প্রশ্ন থাকলে আমাদের সাপোর্ট টিমের সাথে যোগাযোগ করুন।
              </p>
            </div>
          </div>
          
          <div style="background: #f9fafb; padding: 20px; text-align: center; color: #6b7280; font-size: 12px;">
            <p style="margin: 0;">© 2025 রিজার্ভিও প্রো। সর্বস্বত্ব সংরক্ষিত।</p>
          </div>
        </div>
      </body>
      </html>
    `
  };
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: SellerNotificationRequest = await req.json();
    
    console.log("Sending seller notification:", {
      sellerEmail: data.sellerEmail,
      notificationType: data.notificationType,
      subject: data.subject
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

    const { subject, html } = getEmailTemplate(data);

    const emailResponse = await resend.emails.send({
      from: "রিজার্ভিও প্রো <onboarding@resend.dev>",
      to: [data.sellerEmail],
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
    console.error("Error in send-seller-notification function:", error);
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
