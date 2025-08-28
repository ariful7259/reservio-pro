
import { supabase } from '@/integrations/supabase/client';

// User preference learning system
interface UserPreference {
  category: string;
  interest: number; // 0-10 scale
  lastInteraction: Date;
  searchHistory: string[];
}

const getUserPreferences = async (): Promise<UserPreference[]> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const preferences = localStorage.getItem(`user_preferences_${user.id}`);
    return preferences ? JSON.parse(preferences) : [];
  } catch (error) {
    return [];
  }
};

const updateUserPreferences = async (category: string, query: string) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const preferences = await getUserPreferences();
    const existingIndex = preferences.findIndex(p => p.category === category);
    
    if (existingIndex >= 0) {
      preferences[existingIndex].interest = Math.min(10, preferences[existingIndex].interest + 0.5);
      preferences[existingIndex].lastInteraction = new Date();
      preferences[existingIndex].searchHistory.push(query);
      if (preferences[existingIndex].searchHistory.length > 10) {
        preferences[existingIndex].searchHistory = preferences[existingIndex].searchHistory.slice(-10);
      }
    } else {
      preferences.push({
        category,
        interest: 1,
        lastInteraction: new Date(),
        searchHistory: [query]
      });
    }

    localStorage.setItem(`user_preferences_${user.id}`, JSON.stringify(preferences));
  } catch (error) {
    console.error('Error updating user preferences:', error);
  }
};

export const generateAIResponse = async (userMessage: string, selectedModel: string): Promise<string> => {
  const currentPage = window.location.pathname;
  
  // Product/Service recommendation logic
  const productKeywords = ['প্রোডাক্ট', 'পণ্য', 'কিনতে', 'বিক্রি', 'দাম', 'product', 'buy', 'sell', 'price', 'মোবাইল', 'ফোন', 'laptop', 'কম্পিউটার'];
  const serviceKeywords = ['সেবা', 'সার্ভিস', 'বুকিং', 'অ্যাপয়েন্টমেন্ট', 'service', 'booking', 'appointment', 'ক্লিনিং', 'রিপেয়ার'];
  const rentalKeywords = ['ভাড়া', 'রেন্ট', 'ভাড়ায়', 'rent', 'rental', 'lease', 'গাড়ি', 'বাইক', 'বাসা'];
  const searchKeywords = ['খুঁজছি', 'চাই', 'দরকার', 'লাগবে', 'need', 'want', 'looking for'];

  const isProductQuery = productKeywords.some(keyword => userMessage.toLowerCase().includes(keyword));
  const isServiceQuery = serviceKeywords.some(keyword => userMessage.toLowerCase().includes(keyword));
  const isRentalQuery = rentalKeywords.some(keyword => userMessage.toLowerCase().includes(keyword));
  const isSearchQuery = searchKeywords.some(keyword => userMessage.toLowerCase().includes(keyword));

  // Update user preferences based on query
  if (isProductQuery) await updateUserPreferences('products', userMessage);
  if (isServiceQuery) await updateUserPreferences('services', userMessage);
  if (isRentalQuery) await updateUserPreferences('rentals', userMessage);

  // Enhanced quick responses with context
  const quickResponses = {
    'ছবি': `প্রোডাক্টের ছবি তোলার জন্য: ১) ভাল আলোতে তুলুন ২) সাদা ব্যাকগ্রাউন্ড ব্যবহার করুন ৩) বিভিন্ন অ্যাঙ্গেল থেকে তুলুন ৪) ছবির মান ভাল রাখুন। ${currentPage === '/marketplace' ? 'আপনি এখানেই নতুন প্রোডাক্ট যোগ করতে পারেন!' : ''}`,
    'বিক্রয়': `বিক্রয় বাড়ানোর জন্য: ১) প্রতিযোগিতামূলক দাম রাখুন ২) নিয়মিত স্টক আপডেট করুন ৩) গ্রাহকদের দ্রুত রিপ্লাই দিন ৪) ভাল রিভিউ নিন ৫) প্রোমো অফার করুন। ${currentPage === '/seller-dashboard' ? 'আপনার ড্যাশবোর্ডে বিক্রয় ডেটা দেখুন!' : ''}`,
    'গ্রাহক': 'গ্রাহকদের সাথে কথা বলার সময়: ১) ভদ্র ও নম্র থাকুন ২) দ্রুত উত্তর দিন ৩) সৎ তথ্য দিন ৪) প্রোডাক্ট সম্পর্কে বিস্তারিত জানান ৫) অভিযোগ ধৈর্য নিয়ে শুনুন।',
    'ডিসক্রিপশন': 'ভাল প্রোডাক্ট ডিসক্রিপশনে থাকবে: ১) প্রোডাক্টের মূল বৈশিষ্ট্য ২) সাইজ ও রঙের তথ্য ৩) ব্যবহারের নিয়ম ৪) দাম ও ডেলিভারি তথ্য ৫) কিওয়ার্ড ব্যবহার।',
    'মোবাইল': 'মোবাইল কিনার সময় যা দেখবেন: ১) প্রসেসরের গতি ২) RAM ও স্টোরেজ ৩) ক্যামেরার মান ৪) ব্যাটারি লাইফ ৫) দাম ও ওয়ারেন্টি। নিচে কিছু সুপারিশ দেখুন।',
    'ক্লিনিং': 'ভাল ক্লিনিং সার্ভিসের জন্য: ১) অভিজ্ঞ কর্মী ২) নিরাপদ পণ্য ৩) সময়মত সেবা ৪) যুক্তিসঙ্গত দাম ৫) বীমা কভারেজ। আশেপাশের সেবা দেখুন।',
    'গাড়ি': 'গাড়ি ভাড়ার সময়: ১) ড্রাইভিং লাইসেন্স চেক ২) গাড়ির অবস্থা দেখুন ৩) ইন্স্যুরেন্স নিশ্চিত করুন ৄ) জ্বালানি নিয়ম জানুন ৫) ক্ষতির দায়বদ্ধতা বুঝুন।'
  };

  // Check for quick responses first
  for (const [key, response] of Object.entries(quickResponses)) {
    if (userMessage.includes(key)) {
      return response + getRecommendations(isProductQuery, isServiceQuery, isRentalQuery, currentPage, userMessage);
    }
  }

  // Use Gemini API for more complex responses
  try {
    const pageContext = getPageContext(currentPage);
    const searchContext = isSearchQuery ? '\n\nব্যবহারকারী কিছু খুঁজছে, তাই তাদের নিচে দেখানো ফলাফল দেখতে বলুন।' : '';
    const context = `আপনি একটি সহায়ক AI অ্যাসিস্ট্যান্ট যা ${pageContext} সাহায্য করে। বাংলায় সংক্ষিপ্ত ও স্পষ্ট উত্তর দিন।${searchContext}`;

    const { data, error } = await supabase.functions.invoke('gemini-chat', {
      body: {
        message: userMessage,
        model: selectedModel,
        context: context
      }
    });

    if (error) {
      console.error('Error calling Gemini API:', error);
      return getFallbackResponse(userMessage, selectedModel, currentPage) + getRecommendations(isProductQuery, isServiceQuery, isRentalQuery, currentPage, userMessage);
    }

    const aiResponse = data.response || getFallbackResponse(userMessage, selectedModel, currentPage);
    const personalizedRecs = await getPersonalizedRecommendations(isProductQuery, isServiceQuery, isRentalQuery, currentPage, userMessage);
    return aiResponse + personalizedRecs;

  } catch (error) {
    console.error('Error generating AI response:', error);
    return getFallbackResponse(userMessage, selectedModel, currentPage) + getRecommendations(isProductQuery, isServiceQuery, isRentalQuery, currentPage, userMessage);
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

  return `আপনার প্রশ্নটি খুবই ভাল! আপনি এখন ${pageContext} আছেন। ${selectedModel} মডেল ব্যবহার করে আমি আরও বিস্তারিত সাহায্য করতে পারি।`;
};

const getPersonalizedRecommendations = async (isProductQuery: boolean, isServiceQuery: boolean, isRentalQuery: boolean, currentPage: string, userMessage: string): Promise<string> => {
  const userPreferences = await getUserPreferences();
  let recommendations = '';
  
  // Check if it's a search query
  const searchKeywords = ['খুঁজছি', 'চাই', 'দরকার', 'লাগবে'];
  const isSearchQuery = searchKeywords.some(keyword => userMessage.toLowerCase().includes(keyword));
  
  if (isSearchQuery) {
    recommendations += '\n\n🔍 নিচে সার্চ রেজাল্ট দেখুন - আপনার পছন্দের আইটেম খুঁজে নিন!';
  }

  // Purchase/booking intent detection
  const purchaseKeywords = ['কিনব', 'বুক করব', 'নিব', 'অর্ডার', 'buy', 'book', 'order'];
  const hasPurchaseIntent = purchaseKeywords.some(keyword => userMessage.toLowerCase().includes(keyword));
  
  if (hasPurchaseIntent) {
    recommendations += '\n\n🗺️ পণ্য/সেবা নিশ্চিত করার পর আমি আপনাকে ম্যাপে দিকনির্দেশনা দেখিয়ে দেব!';
  }

  // Personalized recommendations based on user preferences
  const productPrefs = userPreferences.filter(p => p.category === 'products').sort((a, b) => b.interest - a.interest);
  const servicePrefs = userPreferences.filter(p => p.category === 'services').sort((a, b) => b.interest - a.interest);
  const rentalPrefs = userPreferences.filter(p => p.category === 'rentals').sort((a, b) => b.interest - a.interest);
  
  if (isProductQuery || (productPrefs.length > 0 && !isServiceQuery && !isRentalQuery)) {
    if (productPrefs.length > 0) {
      recommendations += '\n\n📱 আপনার পছন্দ অনুযায়ী: ';
      recommendations += productPrefs.slice(0, 3).map(p => p.searchHistory[p.searchHistory.length - 1]).join(', ');
    } else {
      recommendations += '\n\n📱 জনপ্রিয় পণ্য: স্মার্টফোন, ল্যাপটপ, ইলেকট্রনিক্স';
    }
    recommendations += '\n💡 ট্রেন্ডিং: iPhone, Samsung, gaming laptop';
  }
  
  if (isServiceQuery || (servicePrefs.length > 0 && !isProductQuery && !isRentalQuery)) {
    if (servicePrefs.length > 0) {
      recommendations += '\n\n🏠 আপনার আগ্রহ অনুযায়ী: ';
      recommendations += servicePrefs.slice(0, 3).map(p => p.searchHistory[p.searchHistory.length - 1]).join(', ');
    } else {
      recommendations += '\n\n🏠 জনপ্রিয় সেবা: হোম ক্লিনিং, AC সার্ভিস, রিপেয়ার';
    }
    recommendations += '\n⚡ দ্রুত বুকিং: ইলেকট্রিশিয়ান, প্লাম্বার, পেইন্টার';
  }
  
  if (isRentalQuery || (rentalPrefs.length > 0 && !isProductQuery && !isServiceQuery)) {
    if (rentalPrefs.length > 0) {
      recommendations += '\n\n🚗 আপনার পছন্দ অনুযায়ী: ';
      recommendations += rentalPrefs.slice(0, 3).map(p => p.searchHistory[p.searchHistory.length - 1]).join(', ');
    } else {
      recommendations += '\n\n🚗 জনপ্রিয় ভাড়া: গাড়ি, বাইক, ক্যামেরা';
    }
    recommendations += '\n🏡 হাউজিং: ফ্ল্যাট, রুম, অফিস স্পেস';
  }
  
  // Page-specific recommendations
  if (currentPage === '/securepay') {
    recommendations += '\n\n💳 সিকিউর পেমেন্ট: নিরাপদ লেনদেন করুন';
  }
  
  return recommendations;
};

const getRecommendations = (isProductQuery: boolean, isServiceQuery: boolean, isRentalQuery: boolean, currentPage: string, userMessage: string): string => {
  let recommendations = '';
  
  // Check if it's a search query
  const searchKeywords = ['খুঁজছি', 'চাই', 'দরকার', 'লাগবে'];
  const isSearchQuery = searchKeywords.some(keyword => userMessage.toLowerCase().includes(keyword));
  
  if (isSearchQuery) {
    recommendations += '\n\n🔍 নিচে সার্চ রেজাল্ট দেখুন - আপনার পছন্দের আইটেম খুঁজে নিন!';
  }
  
  if (isProductQuery) {
    recommendations += '\n\n📱 জনপ্রিয় পণ্য: স্মার্টফোন, ল্যাপটপ, ইলেকট্রনিক্স';
    recommendations += '\n💡 ট্রেন্ডিং: iPhone, Samsung, gaming laptop';
  }
  
  if (isServiceQuery) {
    recommendations += '\n\n🏠 জনপ্রিয় সেবা: হোম ক্লিনিং, AC সার্ভিস, রিপেয়ার';
    recommendations += '\n⚡ দ্রুত বুকিং: ইলেকট্রিশিয়ান, প্লাম্বার, পেইন্টার';
  }
  
  if (isRentalQuery) {
    recommendations += '\n\n🚗 জনপ্রিয় ভাড়া: গাড়ি, বাইক, ক্যামেরা';
    recommendations += '\n🏡 হাউজিং: ফ্ল্যাট, রুম, অফিস স্পেস';
  }
  
  // Page-specific recommendations
  if (currentPage === '/securepay') {
    recommendations += '\n\n💳 সিকিউর পেমেন্ট: নিরাপদ লেনদেন করুন';
  }
  
  return recommendations;
};
