
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { 
  Store, 
  Smartphone, 
  MapPin, 
  Phone, 
  Mail, 
  Sparkles,
  CheckCircle,
  ArrowRight,
  Upload,
  Zap,
  Globe,
  CreditCard,
  Truck,
  Link,
  Users,
  Camera,
  Share2,
  ExternalLink,
  BarChart3
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface StoreTemplate {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  features: string[];
  type: 'store' | 'linkinbio';
}

const storeTemplates: StoreTemplate[] = [
  {
    id: 'linkinbio',
    name: 'লিংক ইন বায়ো',
    description: 'সোশ্যাল মিডিয়ার জন্য এক পেজে সব লিংক',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=300&auto=format&fit=crop&q=60',
    category: 'linkinbio',
    type: 'linkinbio',
    features: ['সোশ্যাল লিংক', 'QR কোড', 'ক্লিক ট্র্যাকিং', 'কাস্টম ডিজাইন']
  },
  {
    id: 'fashion',
    name: 'ফ্যাশন স্টোর',
    description: 'কাপড়, জুতা, ব্যাগ ও ফ্যাশন আইটেম',
    image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=300&auto=format&fit=crop&q=60',
    category: 'fashion',
    type: 'store',
    features: ['সাইজ গাইড', 'কালার ভেরিয়েন্ট', 'ফ্যাশন ক্যাটালগ']
  },
  {
    id: 'electronics',
    name: 'ইলেকট্রনিক্স শপ',
    description: 'মোবাইল, ল্যাপটপ, গ্যাজেট ও ইলেকট্রনিক্স',
    image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=300&auto=format&fit=crop&q=60',
    category: 'electronics',
    type: 'store',
    features: ['প্রোডাক্ট স্পেসিফিকেশন', 'ওয়ারেন্টি ইনফো', 'কম্পেয়ার ফিচার']
  },
  {
    id: 'food',
    name: 'খাবারের দোকান',
    description: 'রেস্টুরেন্ট, ক্যাফে ও খাবার ডেলিভারি',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&auto=format&fit=crop&q=60',
    category: 'food',
    type: 'store',
    features: ['মেনু ক্যাটাগরি', 'অর্ডার ট্র্যাকিং', 'হট ডিল']
  },
  {
    id: 'services',
    name: 'সার্ভিস বিজনেস',
    description: 'পার্লার, রিপেয়ার, কনসালটেন্সি সার্ভিস',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&auto=format&fit=crop&q=60',
    category: 'services',
    type: 'store',
    features: ['অ্যাপয়েন্টমেন্ট বুকিং', 'সার্ভিস প্যাকেজ', 'রিভিউ সিস্টেম']
  },
  {
    id: 'books',
    name: 'বুক স্টোর',
    description: 'বই, নোটবুক, স্টেশনারি আইটেম',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&auto=format&fit=crop&q=60',
    category: 'books',
    type: 'store',
    features: ['বুক ক্যাটালগ', 'অথর সার্চ', 'প্রি-অর্ডার']
  }
];

interface LinkData {
  title: string;
  url: string;
  icon?: string;
}

const EasyStoreSetup = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [storeData, setStoreData] = useState({
    businessName: '',
    ownerName: '',
    phone: '',
    email: '',
    address: '',
    description: '',
    category: ''
  });
  
  // Link in Bio specific data
  const [linkInBioData, setLinkInBioData] = useState({
    displayName: '',
    bio: '',
    profileImage: '',
    links: [] as LinkData[]
  });
  
  const [isCreating, setIsCreating] = useState(false);

  const selectedTemplateData = storeTemplates.find(t => t.id === selectedTemplate);
  const isLinkInBio = selectedTemplateData?.type === 'linkinbio';

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    const template = storeTemplates.find(t => t.id === templateId);
    if (template) {
      if (template.type === 'linkinbio') {
        setLinkInBioData(prev => ({ ...prev, category: template.category }));
      } else {
        setStoreData(prev => ({ ...prev, category: template.category }));
      }
    }
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const addLink = () => {
    setLinkInBioData(prev => ({
      ...prev,
      links: [...prev.links, { title: '', url: '' }]
    }));
  };

  const updateLink = (index: number, field: 'title' | 'url', value: string) => {
    setLinkInBioData(prev => ({
      ...prev,
      links: prev.links.map((link, i) => 
        i === index ? { ...link, [field]: value } : link
      )
    }));
  };

  const removeLink = (index: number) => {
    setLinkInBioData(prev => ({
      ...prev,
      links: prev.links.filter((_, i) => i !== index)
    }));
  };

  const handleCreateStore = async () => {
    setIsCreating(true);
    
    // সিমুলেট স্টোর তৈরির প্রসেস
    setTimeout(() => {
      setIsCreating(false);
      
      if (isLinkInBio) {
        toast({
          title: "🎉 লিংক ইন বায়ো সফলভাবে তৈরি!",
          description: `${linkInBioData.displayName} এর লিংক ইন বায়ো পেজ লাইভ হয়েছে।`,
        });
        // Navigate to Link in Bio builder page
        navigate('/create-linkinbio');
      } else {
        toast({
          title: "🎉 স্টোর সফলভাবে তৈরি!",
          description: `${storeData.businessName} স্টোর লাইভ হয়েছে।`,
        });
      }
    }, 3000);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">আপনার প্রয়োজন নির্বাচন করুন</h2>
              <p className="text-muted-foreground">অনলাইন স্টোর নাকি লিংক ইন বায়ো পেজ তৈরি করতে চান?</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {storeTemplates.map((template) => (
                <Card 
                  key={template.id}
                  className={`cursor-pointer transition-all hover:shadow-lg ${
                    selectedTemplate === template.id ? 'ring-2 ring-primary border-primary' : ''
                  } ${template.type === 'linkinbio' ? 'border-purple-200 bg-purple-50/50' : ''}`}
                  onClick={() => handleTemplateSelect(template.id)}
                >
                  <div className="relative">
                    <img 
                      src={template.image} 
                      alt={template.name}
                      className="w-full h-32 object-cover rounded-t-md"
                    />
                    {selectedTemplate === template.id && (
                      <div className="absolute top-2 right-2">
                        <CheckCircle className="h-6 w-6 text-primary bg-white rounded-full" />
                      </div>
                    )}
                    {template.type === 'linkinbio' && (
                      <Badge className="absolute top-2 left-2 bg-purple-600 text-white">
                        <Link className="h-3 w-3 mr-1" />
                        নতুন
                      </Badge>
                    )}
                  </div>
                  
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                      {template.type === 'linkinbio' && <Link className="h-4 w-4 text-purple-600" />}
                      {template.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">{template.description}</p>
                    
                    <div className="flex flex-wrap gap-1">
                      {template.features.map((feature, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">
                {isLinkInBio ? 'প্রোফাইল তথ্য দিন' : 'ব্যবসার তথ্য দিন'}
              </h2>
              <p className="text-muted-foreground">
                {isLinkInBio ? 'আপনার লিংক ইন বায়ো প্রোফাইলের তথ্য পূরণ করুন' : 'আপনার দোকানের বেসিক তথ্যগুলো পূরণ করুন'}
              </p>
            </div>

            <div className="max-w-2xl mx-auto space-y-4">
              {isLinkInBio ? (
                // Link in Bio form
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="displayName">প্রদর্শনের নাম *</Label>
                      <Input
                        id="displayName"
                        placeholder="যেমন: রহিম আহমেদ"
                        value={linkInBioData.displayName}
                        onChange={(e) => setLinkInBioData(prev => ({ ...prev, displayName: e.target.value }))}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="profileImage">প্রোফাইল ইমেজ URL (ঐচ্ছিক)</Label>
                      <Input
                        id="profileImage"
                        placeholder="https://example.com/image.jpg"
                        value={linkInBioData.profileImage}
                        onChange={(e) => setLinkInBioData(prev => ({ ...prev, profileImage: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="bio">বায়ো/পরিচয় *</Label>
                    <Textarea
                      id="bio"
                      placeholder="আপনার সম্পর্কে কিছু লিখুন..."
                      value={linkInBioData.bio}
                      onChange={(e) => setLinkInBioData(prev => ({ ...prev, bio: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>আপনার লিংকসমূহ</Label>
                      <Button onClick={addLink} size="sm" variant="outline">
                        <Link className="h-4 w-4 mr-2" />
                        লিংক যোগ করুন
                      </Button>
                    </div>
                    
                    {linkInBioData.links.map((link, index) => (
                      <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-2 p-4 border rounded-lg">
                        <Input
                          placeholder="লিংকের নাম (যেমন: ইনস্টাগ্রাম)"
                          value={link.title}
                          onChange={(e) => updateLink(index, 'title', e.target.value)}
                        />
                        <div className="flex gap-2">
                          <Input
                            placeholder="https://..."
                            value={link.url}
                            onChange={(e) => updateLink(index, 'url', e.target.value)}
                          />
                          <Button
                            onClick={() => removeLink(index)}
                            size="sm"
                            variant="outline"
                            className="text-red-600 hover:text-red-700"
                          >
                            ✕
                          </Button>
                        </div>
                      </div>
                    ))}
                    
                    {linkInBioData.links.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        <Link className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p>এখনো কোন লিংক যোগ করা হয়নি</p>
                        <p className="text-sm">উপরের বাটনে ক্লিক করে লিংক যোগ করুন</p>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                // Store form (existing)
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="businessName">দোকানের নাম *</Label>
                      <Input
                        id="businessName"
                        placeholder="যেমন: রহিম ফ্যাশন হাউস"
                        value={storeData.businessName}
                        onChange={(e) => setStoreData(prev => ({ ...prev, businessName: e.target.value }))}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="ownerName">মালিকের নাম *</Label>
                      <Input
                        id="ownerName"
                        placeholder="আপনার নাম"
                        value={storeData.ownerName}
                        onChange={(e) => setStoreData(prev => ({ ...prev, ownerName: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">মোবাইল নাম্বর *</Label>
                      <Input
                        id="phone"
                        placeholder="01XXXXXXXXX"
                        value={storeData.phone}
                        onChange={(e) => setStoreData(prev => ({ ...prev, phone: e.target.value }))}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email">ইমেইল (ঐচ্ছিক)</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="example@email.com"
                        value={storeData.email}
                        onChange={(e) => setStoreData(prev => ({ ...prev, email: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address">দোকানের ঠিকানা *</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="address"
                        placeholder="সম্পূর্ণ ঠিকানা লিখুন"
                        className="pl-10"
                        value={storeData.address}
                        onChange={(e) => setStoreData(prev => ({ ...prev, address: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description">ব্যবসার বিবরণ (ঐচ্ছিক)</Label>
                    <Textarea
                      id="description"
                      placeholder="আপনার ব্যবসা সম্পর্কে কিছু লিখুন..."
                      value={storeData.description}
                      onChange={(e) => setStoreData(prev => ({ ...prev, description: e.target.value }))}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">সেটআপ সম্পন্ন করুন</h2>
              <p className="text-muted-foreground">
                {isLinkInBio ? 'আপনার লিংক ইন বায়ো প্রায় তৈরি!' : 'আপনার স্টোর প্রায় তৈরি!'} চূড়ান্ত সেটিংস দেখুন
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              {isLinkInBio ? (
                // Link in Bio preview
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Share2 className="h-5 w-5 text-purple-600" />
                        সোশ্যাল শেয়ারিং
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">QR কোড জেনারেট</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">হোয়াটসঅ্যাপ শেয়ার</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">ইনস্টাগ্রাম বায়ো</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <BarChart3 className="h-5 w-5 text-blue-600" />
                        অ্যানালিটিক্স
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">ক্লিক ট্র্যাকিং</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">ভিজিটর কাউন্ট</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">লিংক পারফরম্যান্স</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Users className="h-5 w-5 text-green-600" />
                        কাস্টমাইজেশন
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">কাস্টম থিম</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">ব্র্যান্ড কালার</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">মোবাইল অপটিমাইজড</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                // Store preview (existing)
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <CreditCard className="h-5 w-5 text-green-600" />
                        পেমেন্ট রেডি
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">বিকাশ পেমেন্ট</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">নগদ পেমেন্ট</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">ক্যাশ অন ডেলিভারি</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Truck className="h-5 w-5 text-blue-600" />
                        ডেলিভারি সেটআপ
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">ঢাকার মধ্যে: ৬০ টাকা</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">ঢাকার বাইরে: ১২০ টাকা</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">৫০০+ টাকায় ফ্রি</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Globe className="h-5 w-5 text-purple-600" />
                        অনলাইন উপস্থিতি
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">কাস্টম URL</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">QR কোড</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">সোশ্যাল শেয়ার</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Preview section */}
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle>
                    {isLinkInBio ? 'আপনার লিংক ইন বায়ো প্রিভিউ' : 'আপনার স্টোর প্রিভিউ'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={`border rounded-lg p-4 ${isLinkInBio ? 'bg-gradient-to-r from-purple-50 to-pink-50' : 'bg-gradient-to-r from-blue-50 to-purple-50'}`}>
                    {isLinkInBio ? (
                      <div className="text-center space-y-4">
                        <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center mx-auto">
                          <Users className="h-10 w-10 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">{linkInBioData.displayName || 'আপনার নাম'}</h3>
                          <p className="text-muted-foreground">{linkInBioData.bio || 'আপনার বায়ো'}</p>
                        </div>
                        <div className="space-y-2">
                          {linkInBioData.links.length > 0 ? (
                            linkInBioData.links.map((link, index) => (
                              <div key={index} className="bg-white rounded-lg p-3 flex items-center gap-3 shadow-sm">
                                <ExternalLink className="h-4 w-4 text-purple-600" />
                                <span className="font-medium">{link.title || 'লিংক শিরোনাম'}</span>
                              </div>
                            ))
                          ) : (
                            <div className="bg-white rounded-lg p-3 text-center text-muted-foreground">
                              <Link className="h-8 w-8 mx-auto mb-2 opacity-50" />
                              <p>আপনার লিংকগুলো এখানে দেখাবে</p>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center">
                          <Store className="h-8 w-8 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">{storeData.businessName || 'আপনার স্টোর'}</h3>
                          <p className="text-muted-foreground">{storeData.description || 'স্টোর বিবরণ'}</p>
                          <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              {storeData.phone || '01XXXXXXXXX'}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {storeData.address || 'ঠিকানা'}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div className="text-center">
                      <Badge className={isLinkInBio ? "bg-purple-100 text-purple-800" : "bg-green-100 text-green-800"}>
                        {isLinkInBio ? 'লিংক ইন বায়ো URL: ' : 'স্টোর URL: '}
                        {isLinkInBio 
                          ? (linkInBioData.displayName ? `${linkInBioData.displayName.toLowerCase().replace(/\s+/g, '')}.basabari.com` : 'yourname.basabari.com')
                          : (storeData.businessName ? `${storeData.businessName.toLowerCase().replace(/\s+/g, '')}.basabari.com` : 'yourstore.basabari.com')
                        }
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const getValidationStatus = () => {
    if (isLinkInBio) {
      return linkInBioData.displayName && linkInBioData.bio;
    } else {
      return storeData.businessName && storeData.phone;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* হেডার */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <Zap className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">
            {isLinkInBio ? '২ মিনিটে লিংক ইন বায়ো তৈরি করুন' : '৩ মিনিটে স্টোর তৈরি করুন'}
          </h1>
          <p className="text-lg text-muted-foreground">
            {isLinkInBio ? 'সহজ ৩টি ধাপে আপনার লিংক ইন বায়ো পেজ তৈরি করুন' : 'সহজ ৩টি ধাপে আপনার অনলাইন ব্যবসা শুরু করুন'}
          </p>
        </div>

        {/* প্রগ্রেস স্টেপ */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  currentStep >= step ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {currentStep > step ? <CheckCircle className="h-5 w-5" /> : step}
                </div>
                <div className="ml-3 text-left">
                  <div className="text-sm font-medium">
                    {step === 1 && (isLinkInBio ? 'ধরন নির্বাচন' : 'টেমপ্লেট নির্বাচন')}
                    {step === 2 && (isLinkInBio ? 'প্রোফাইল তথ্য' : 'ব্যবসার তথ্য')}
                    {step === 3 && 'সেটআপ সম্পন্ন'}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {step === 1 && (isLinkInBio ? 'লিংক ইন বায়ো নির্বাচন' : 'ব্যবসার ধরন বেছে নিন')}
                    {step === 2 && (isLinkInBio ? 'প্রোফাইল ও লিংক' : 'প্রয়োজনীয় তথ্য দিন')}
                    {step === 3 && (isLinkInBio ? 'পেজ লাইভ করুন' : 'স্টোর লাইভ করুন')}
                  </div>
                </div>
                {step < 3 && (
                  <ArrowRight className="h-4 w-4 text-gray-400 mx-4" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* মূল কন্টেন্ট */}
        <Card className="max-w-6xl mx-auto">
          <CardContent className="p-8">
            {renderStepContent()}
          </CardContent>
          
          {/* নেভিগেশন বাটন */}
          <div className="flex justify-between items-center p-6 border-t">
            <Button 
              variant="outline" 
              onClick={handlePrevious}
              disabled={currentStep === 1}
            >
              আগের ধাপ
            </Button>
            
            <div className="flex gap-2">
              {currentStep < 3 ? (
                <Button 
                  onClick={handleNext}
                  disabled={currentStep === 1 && !selectedTemplate}
                  className="flex items-center gap-2"
                >
                  পরবর্তী ধাপ <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button 
                  onClick={handleCreateStore}
                  disabled={isCreating || !getValidationStatus()}
                  className={`flex items-center gap-2 ${isLinkInBio ? 'bg-purple-600 hover:bg-purple-700' : 'bg-green-600 hover:bg-green-700'}`}
                >
                  {isCreating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      {isLinkInBio ? 'পেজ তৈরি হচ্ছে...' : 'স্টোর তৈরি হচ্ছে...'}
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      {isLinkInBio ? 'পেজ লাইভ করুন' : 'স্টোর লাইভ করুন'}
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default EasyStoreSetup;
