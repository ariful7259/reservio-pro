
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface ChatRequest {
  message: string;
  model: string;
  context?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { message, model, context }: ChatRequest = await req.json()
    
    const apiKey = Deno.env.get('GEMINI_API_KEY')
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY not found')
    }

    // Determine which Gemini model to use
    let geminiModel = 'gemini-1.5-flash'
    if (model === 'gemini-pro') {
      geminiModel = 'gemini-1.5-pro'
    }

    const prompt = context 
      ? `${context}\n\nব্যবহারকারী: ${message}\n\nসহায়ক:`
      : `আপনি একটি সহায়ক AI অ্যাসিস্ট্যান্ট। বাংলায় উত্তর দিন এবং ব্যবহারকারীদের সাহায্য করুন।\n\nব্যবহারকারী: ${message}\n\nসহায়ক:`

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${geminiModel}:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Gemini API error:', errorText)
      throw new Error(`Gemini API error: ${response.status}`)
    }

    const data = await response.json()
    
    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      throw new Error('Invalid response from Gemini API')
    }

    const aiResponse = data.candidates[0].content.parts[0].text

    return new Response(
      JSON.stringify({ response: aiResponse }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )

  } catch (error) {
    console.error('Error in gemini-chat function:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Internal server error',
        fallback: 'দুঃখিত, এই মুহূর্তে AI সেবা উপলব্ধ নেই। অনুগ্রহ করে পরে আবার চেষ্টা করুন।'
      }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )
  }
})
