
import { supabase } from '@/integrations/supabase/client';

export const generateAIResponse = async (userMessage: string, selectedModel: string): Promise<string> => {
  const currentPage = window.location.pathname;
  
  // Product/Service recommendation logic
  const productKeywords = ['প্রোডাক্ট', 'পণ্য', 'কিনতে', 'বিক্রি', 'দাম', 'product', 'buy', 'sell', 'price'];
  const serviceKeywords = ['সেবা', 'সার্ভিস', 'বুকিং', 'অ্যাপয়েন্টমেন্ট', 'service', 'booking', 'appointment'];
  const rentalKeywords = ['ভাড়া', 'রেন্ট', 'ভাড়ায়', 'rent', 'rental', 'lease'];
  
  const isProductQuery = productKeywords.some(keyword => userMessage.toLowerCase().includes(keyword));
  const isServiceQuery = serviceKeywords.some(keyword => userMessage.toLowerCase().includes(keyword));
  const isRentalQuery = rentalKeywords.some(keyword => userMessage.toLowerCase().includes(keyword));

  // Quick responses for common keywords with recommendations
  const quickResponses = {
    'ছবি': `প্রোডাক্টের ছবি তোলার জন্য: ১) ভাল আলোতে তুলুন ২) সাদা ব্যাকগ্রাউন্ড ব্যবহার করুন ৩) বিভিন্ন অ্যাঙ্গেল থেকে তুলুন ৪) ছবির মান ভাল রাখুন। ${currentPage === '/marketplace' ? 'আপনি এখানেই নতুন প্রোডাক্ট যোগ করতে পারেন!' : ''}`,
    'বিক্রয়': `বিক্রয় বাড়ানোর জন্য: ১) প্রতিযোগিতামূলক দাম রাখুন ২) নিয়মিত স্টক আপডেট করুন ৩) গ্রাহকদের দ্রুত রিপ্লাই দিন ৪) ভাল রিভিউ নিন ৫) প্রোমো অফার করুন। ${currentPage === '/seller-dashboard' ? 'আপনার ড্যাশবোর্ডে বিক্রয় ডেটা দেখুন!' : ''}`,
    'গ্রাহক': 'গ্রাহকদের সাথে কথা বলার সময়: ১) ভদ্র ও নম্র থাকুন ২) দ্রুত উত্তর দিন ৩) সৎ তথ্য দিন ৪) প্রোডাক্ট সম্পর্কে বিস্তারিত জানান ৫) অভিযোগ ধৈর্য নিয়ে শুনুন।',
    'ডিসক্রিপশন': 'ভাল প্রোডাক্ট ডিসক্রিপশনে থাকবে: ১) প্রোডাক্টের মূল বৈশিষ্ট্য ২) সাইজ ও রঙের তথ্য ৩) ব্যবহারের নিয়ম ৪) দাম ও ডেলিভারি তথ্য ৫) কিওয়ার্ড ব্যবহার।'
  };

  // Check for quick responses first
  for (const [key, response] of Object.entries(quickResponses)) {
    if (userMessage.includes(key)) {
      return response + getRecommendations(isProductQuery, isServiceQuery, isRentalQuery, currentPage);
    }
  }

  // Use Gemini API for more complex responses
  try {
    const pageContext = getPageContext(currentPage);
    const context = `আপনি একটি সহায়ক AI অ্যাসিস্ট্যান্ট যা ${pageContext} সাহায্য করে। বাংলায় উত্তর দিন এবং ব্যবহারিক পরামর্শ দিন।`;

    const { data, error } = await supabase.functions.invoke('gemini-chat', {
      body: {
        message: userMessage,
        model: selectedModel,
        context: context
      }
    });

    if (error) {
      console.error('Error calling Gemini API:', error);
      return getFallbackResponse(userMessage, selectedModel, currentPage) + getRecommendations(isProductQuery, isServiceQuery, isRentalQuery, currentPage);
    }

    const aiResponse = data.response || getFallbackResponse(userMessage, selectedModel, currentPage);
    return aiResponse + getRecommendations(isProductQuery, isServiceQuery, isRentalQuery, currentPage);

  } catch (error) {
    console.error('Error generating AI response:', error);
    return getFallbackResponse(userMessage, selectedModel, currentPage) + getRecommendations(isProductQuery, isServiceQuery, isRentalQuery, currentPage);
  }
};

const getPageContext = (currentPage: string): string => {
  switch (currentPage) {
    case '/marketplace':
      return 'মার্কেটপ্লেস ব্যবহারকারীদের পণ্য কেনাবেচায়';
    case '/seller-dashboard':
      return 'বিক্রেতাদের ব্যবসা পরিচালনায়';
    case '/rentals':
      return 'ভাড়া সেবা খুঁজতে ও দিতে';
    case '/services':
      return 'বিভিন্ন সেবা বুকিং করতে';
    default:
      return 'প্ল্যাটফর্ম ব্যবহার করতে';
  }
};

const getFallbackResponse = (userMessage: string, selectedModel: string, currentPage: string): string => {
  const pageContext = currentPage === '/marketplace' ? 'মার্কেটপ্লেসে' : 
                     currentPage === '/seller-dashboard' ? 'ড্যাশবোর্ডে' :
                     currentPage === '/rentals' ? 'রেন্টাল সেকশনে' : 'এই পেজে';

  return `আপনার প্রশ্নটি খুবই ভাল! আপনি এখন ${pageContext} আছেন। ${selectedModel} মডেল ব্যবহার করে আমি আরও বিস্তারিত সাহায্য করতে পারি। অনুগ্রহ করে আরও নির্দিষ্ট প্রশ্ন করুন।`;
};

const getRecommendations = (isProductQuery: boolean, isServiceQuery: boolean, isRentalQuery: boolean, currentPage: string): string => {
  let recommendations = '\n\n📍 সুপারিশ:\n';
  
  if (isProductQuery) {
    recommendations += `• মার্কেটপ্লেসে জনপ্রিয় পণ্য: মোবাইল, ল্যাপটপ, কাপড়-চোপড়, বই\n`;
    recommendations += `• ট্রেন্ডিং ক্যাটাগরি: ইলেকট্রনিক্স, ফ্যাশন, হোম ডেকর\n`;
  }
  
  if (isServiceQuery) {
    recommendations += `• জনপ্রিয় সেবা: হোম ক্লিনিং, টিউশন, রিপেয়ার সার্ভিস\n`;
    recommendations += `• দ্রুত বুকিং: এসি সার্ভিস, ইলেকট্রিশিয়ান, প্লাম্বার\n`;
  }
  
  if (isRentalQuery) {
    recommendations += `• জনপ্রিয় ভাড়া: বাইক, গাড়ি, ইভেন্ট আইটেম\n`;
    recommendations += `• সাশ্রয়ী অপশন: ক্যামেরা, সাউন্ড সিস্টেম, ফার্নিচার\n`;
  }
  
  // Page-specific recommendations
  if (currentPage === '/securepay') {
    recommendations += `• সিকিউর পেমেন্ট: নিরাপদ লেনদেন, ডিজিটাল পেমেন্ট\n`;
    recommendations += `• পেমেন্ট লিংক তৈরি করুন সহজেই\n`;
  }
  
  return recommendations;
};
