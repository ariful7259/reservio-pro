
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles,
  ArrowRight,
  Zap
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
