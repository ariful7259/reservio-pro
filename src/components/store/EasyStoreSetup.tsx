import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles,
  ArrowRight,
  Zap,
  ExternalLink,
  Share2,
  Copy,
  Eye
} from 'lucide-react';

// Refactored components
import TemplateSelection from './EasyStoreSetup/TemplateSelection';
import StoreInfoForm from './EasyStoreSetup/StoreInfoForm';
import LinkInBioForm from './EasyStoreSetup/LinkInBioForm';
import PreviewSection from './EasyStoreSetup/PreviewSection';
import ProgressSteps from './EasyStoreSetup/ProgressSteps';

// Types and data
import { StoreData, LinkInBioData } from './EasyStoreSetup/types';
import { storeTemplates } from './EasyStoreSetup/templateData';

const EasyStoreSetup = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [storeData, setStoreData] = useState<StoreData>({
    businessName: '',
    ownerName: '',
    phone: '',
    email: '',
    address: '',
    description: '',
    category: ''
  });
  
  // Link in Bio specific data
  const [linkInBioData, setLinkInBioData] = useState<LinkInBioData>({
    displayName: '',
    bio: '',
    profileImage: '',
    links: []
  });
  
  const [isCreating, setIsCreating] = useState(false);
  const [isStoreCreated, setIsStoreCreated] = useState(false);
  const [createdStoreUrl, setCreatedStoreUrl] = useState('');

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
      setIsStoreCreated(true);
      
      if (isLinkInBio) {
        const url = `${linkInBioData.displayName.toLowerCase().replace(/\s+/g, '')}.basabari.com`;
        setCreatedStoreUrl(url);
        toast({
          title: "🎉 লিংক ইন বায়ো সফলভাবে তৈরি!",
          description: `${linkInBioData.displayName} এর লিংক ইন বায়ো পেজ লাইভ হয়েছে।`,
        });
      } else {
        const url = `${storeData.businessName.toLowerCase().replace(/\s+/g, '')}.basabari.com`;
        setCreatedStoreUrl(url);
        toast({
          title: "🎉 স্টোর সফলভাবে তৈরি!",
          description: `${storeData.businessName} স্টোর লাইভ হয়েছে।`,
        });
      }
    }, 3000);
  };

  const copyStoreUrl = () => {
    navigator.clipboard.writeText(`https://${createdStoreUrl}`);
    toast({
      title: "লিংক কপি হয়েছে!",
      description: "আপনার স্টোর লিংক ক্লিপবোর্ডে কপি হয়েছে।",
    });
  };

  const shareStoreUrl = () => {
    if (navigator.share) {
      navigator.share({
        title: isLinkInBio ? linkInBioData.displayName : storeData.businessName,
        url: `https://${createdStoreUrl}`
      });
    } else {
      copyStoreUrl();
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <TemplateSelection
            selectedTemplate={selectedTemplate}
            onTemplateSelect={handleTemplateSelect}
          />
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
                <LinkInBioForm
                  linkInBioData={linkInBioData}
                  setLinkInBioData={setLinkInBioData}
                  addLink={addLink}
                  updateLink={updateLink}
                  removeLink={removeLink}
                />
              ) : (
                <StoreInfoForm
                  storeData={storeData}
                  setStoreData={setStoreData}
                />
              )}
            </div>
          </div>
        );

      case 3:
        return (
          <PreviewSection
            isLinkInBio={isLinkInBio}
            storeData={storeData}
            linkInBioData={linkInBioData}
          />
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

  // স্টোর তৈরি হওয়ার পর লাইভ প্রিভিউ দেখানো
  if (isStoreCreated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-green-100 p-3 rounded-full">
                <Sparkles className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-2 text-green-700">
              🎉 {isLinkInBio ? 'লিংক ইন বায়ো' : 'আপনার স্টোর'} সফলভাবে লাইভ!
            </h1>
            <p className="text-lg text-muted-foreground mb-4">
              আপনার {isLinkInBio ? 'লিংক ইন বায়ো পেজ' : 'অনলাইন স্টোর'} এখন লাইভ এবং সবার জন্য অ্যাক্সেসযোগ্য
            </p>
            <div className="flex justify-center gap-4 mb-8">
              <Button 
                onClick={() => window.open(`https://${createdStoreUrl}`, '_blank')}
                className="flex items-center gap-2"
              >
                <Eye className="h-4 w-4" />
                লাইভ প্রিভিউ দেখুন
              </Button>
              <Button variant="outline" onClick={copyStoreUrl}>
                <Copy className="h-4 w-4 mr-2" />
                লিংক কপি করুন
              </Button>
              <Button variant="outline" onClick={shareStoreUrl}>
                <Share2 className="h-4 w-4 mr-2" />
                শেয়ার করুন
              </Button>
            </div>
          </div>

          {/* লাইভ প্রিভিউ সেকশন */}
          <Card className="max-w-4xl mx-auto mb-8">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">
                  {isLinkInBio ? 'আপনার লিংক ইন বায়ো প্রিভিউ' : 'আপনার স্টোর প্রিভিউ'}
                </h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  লাইভ
                </div>
              </div>
              
              {/* মোবাইল প্রিভিউ ফ্রেম */}
              <div className="max-w-sm mx-auto">
                <div className="bg-gray-800 rounded-[2.5rem] p-2">
                  <div className="bg-white rounded-[2rem] overflow-hidden">
                    <div className="bg-gray-50 px-4 py-2 flex items-center justify-center text-xs text-gray-600">
                      {createdStoreUrl}
                    </div>
                    <div className="p-6 min-h-[500px]">
                      {isLinkInBio ? (
                        <div className="text-center space-y-4">
                          <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto">
                            {linkInBioData.profileImage ? (
                              <img src={linkInBioData.profileImage} alt="Profile" className="w-full h-full rounded-full object-cover" />
                            ) : (
                              <span className="text-white text-xl font-bold">
                                {linkInBioData.displayName.charAt(0)}
                              </span>
                            )}
                          </div>
                          <div>
                            <h3 className="text-lg font-bold">{linkInBioData.displayName}</h3>
                            <p className="text-sm text-gray-600">{linkInBioData.bio}</p>
                          </div>
                          <div className="space-y-3">
                            {linkInBioData.links.map((link, index) => (
                              <div key={index} className="bg-purple-100 hover:bg-purple-200 rounded-lg p-3 flex items-center gap-3 cursor-pointer transition-colors">
                                <ExternalLink className="h-4 w-4 text-purple-600" />
                                <span className="font-medium">{link.title}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="text-center">
                            <h3 className="text-xl font-bold">{storeData.businessName}</h3>
                            <p className="text-sm text-gray-600">{storeData.description}</p>
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="bg-blue-100 rounded-lg p-3 text-center">
                              <div className="w-12 h-12 bg-blue-200 rounded-lg mx-auto mb-2"></div>
                              <p className="text-xs font-medium">পণ্য ১</p>
                            </div>
                            <div className="bg-green-100 rounded-lg p-3 text-center">
                              <div className="w-12 h-12 bg-green-200 rounded-lg mx-auto mb-2"></div>
                              <p className="text-xs font-medium">পণ্য ২</p>
                            </div>
                            <div className="bg-yellow-100 rounded-lg p-3 text-center">
                              <div className="w-12 h-12 bg-yellow-200 rounded-lg mx-auto mb-2"></div>
                              <p className="text-xs font-medium">পণ্য ৩</p>
                            </div>
                            <div className="bg-purple-100 rounded-lg p-3 text-center">
                              <div className="w-12 h-12 bg-purple-200 rounded-lg mx-auto mb-2"></div>
                              <p className="text-xs font-medium">পণ্য ৪</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">পরবর্তী ধাপসমূহ:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button 
                  variant="outline" 
                  className="h-auto p-4 justify-start"
                  onClick={() => navigate(isLinkInBio ? '/create-linkinbio' : '/create-store')}
                >
                  <div className="text-left">
                    <div className="font-medium">কাস্টমাইজ করুন</div>
                    <div className="text-sm text-muted-foreground">
                      {isLinkInBio ? 'আরো লিংক যোগ করুন ও ডিজাইন পরিবর্তন করুন' : 'পণ্য যোগ করুন ও ডিজাইন পরিবর্তন করুন'}
                    </div>
                  </div>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-auto p-4 justify-start"
                  onClick={() => window.open(`https://${createdStoreUrl}`, '_blank')}
                >
                  <div className="text-left">
                    <div className="font-medium">শেয়ার করুন</div>
                    <div className="text-sm text-muted-foreground">সবার সাথে আপনার নতুন সাইট শেয়ার করুন</div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

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
        <ProgressSteps currentStep={currentStep} isLinkInBio={isLinkInBio} />

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
