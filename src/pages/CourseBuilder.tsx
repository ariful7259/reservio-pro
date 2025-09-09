
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Save,
  Eye,
  Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from "sonner";

// Import refactored components
import { CourseInfoForm } from '@/components/course-builder/CourseInfoForm';
import { CourseModules } from '@/components/course-builder/CourseModules';
import { CourseSummary } from '@/components/course-builder/CourseSummary';
import { CourseTypeSelector } from '@/components/course-builder/CourseTypeSelector';
import { TemplateSelector } from '@/components/course-builder/TemplateSelector';
import { ColorSchemeSelector } from '@/components/course-builder/ColorSchemeSelector';
import { PricingModelSelector } from '@/components/course-builder/PricingModelSelector';
import { PriceConfigurationForm } from '@/components/course-builder/PriceConfigurationForm';
import { EnhancedPricingModel } from '@/components/course-builder/EnhancedPricingModel';
import { ResellerOptions } from '@/components/course-builder/ResellerOptions';
import { StudentEnrollment } from '@/components/course-builder/StudentEnrollment';
import { StudentCommunication } from '@/components/course-builder/StudentCommunication';
import { CertificateSettings } from '@/components/course-builder/CertificateSettings';
import { AdvancedFeatures } from '@/components/course-builder/AdvancedFeatures';
import { CourseAccess } from '@/components/course-builder/CourseAccess';
import { SeoSettings } from '@/components/course-builder/SeoSettings';
import { PaymentGatewaySetup } from '@/components/course-builder/PaymentGatewaySetup';
import { AdTrackingAnalytics } from '@/components/course-builder/AdTrackingAnalytics';

const CourseBuilder: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('content');
  const [courseName, setCourseName] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [coursePrice, setCoursePrice] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pricingData, setPricingData] = useState(null);
  const [modules, setModules] = useState([
    {
      id: 1,
      title: 'ইন্ট্রোডাকশন টু ডিজিটাল মার্কেটিং',
      lessons: [
        { id: 101, title: 'ডিজিটাল মার্কেটিং কি?', type: 'video', duration: '12:30', isComplete: false },
        { id: 102, title: 'ডিজিটাল মার্কেটিং এর সুবিধা', type: 'text', duration: '5:00', isComplete: false },
        { id: 103, title: 'কুইজ - ইন্ট্রোডাকশন', type: 'quiz', duration: '10:00', isComplete: false },
      ]
    },
    {
      id: 2,
      title: 'সোশ্যাল মিডিয়া মার্কেটিং',
      lessons: [
        { id: 201, title: 'ফেসবুক মার্কেটিং ফান্ডামেন্টালস', type: 'video', duration: '18:45', isComplete: false },
        { id: 202, title: 'ইনস্টাগ্রাম গ্রোথ স্ট্র্যাটেজি', type: 'video', duration: '22:10', isComplete: false },
      ]
    }
  ]);

  const advancedOptions = [
    { id: 'drip-content', name: 'ড্রিপ কনটেন্ট', description: 'নির্দিষ্ট সময়ে কনটেন্ট আনলক করা', enabled: false },
    { id: 'certificates', name: 'সার্টিফিকেট', description: 'কোর্স শেষে সার্টিফিকেট প্রদান', enabled: true },
    { id: 'discussion', name: 'ডিসকাশন ফোরাম', description: 'শিক্ষার্থীদের আলোচনার জন্য ফোরাম', enabled: true },
    { id: 'assignments', name: 'অ্যাসাইনমেন্ট', description: 'হ্যান্ডস-অন প্র্যাকটিস এসাইনমেন্ট', enabled: false },
    { id: 'analytics', name: 'স্টুডেন্ট অ্যানালিটিক্স', description: 'শিক্ষার্থীদের প্রোগ্রেস ট্র্যাকিং', enabled: true },
    { id: 'ai-assist', name: 'AI অ্যাসিস্ট', description: 'AI-পাওয়ারড লার্নিং অ্যাসিস্ট্যান্ট', enabled: false },
  ];

  const handleSaveCourse = () => {
    setIsSubmitting(true);
    
    // Simulating API call
    setTimeout(() => {
      toast.success("কোর্স সফলভাবে সেভ হয়েছে!", {
        description: "আপনার কোর্স ড্যাশবোর্ডে প্রদর্শিত হবে।",
      });
      setIsSubmitting(false);
    }, 1500);
  };

  const handlePublishCourse = () => {
    setIsSubmitting(true);
    
    // Simulating API call
    setTimeout(() => {
      toast.success("কোর্স সফলভাবে পাবলিশ হয়েছে!", {
        description: "আপনার কোর্স এখন পাবলিকলি উপলব্ধ।",
      });
      setIsSubmitting(false);
      navigate('/my-services');
    }, 1500);
  };

  const handleToggleAdvancedOption = (optionId: string) => {
    const updatedOptions = advancedOptions.map(option => 
      option.id === optionId ? { ...option, enabled: !option.enabled } : option
    );
    // In a real app, we would set the state here
    console.log(`Option ${optionId} toggled:`, updatedOptions);
  };

  return (
    <div className="container pt-20 pb-20">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">কোর্স বিল্ডার</h1>
          <p className="text-muted-foreground">আপনার নিজস্ব অনলাইন কোর্স তৈরি করুন এবং আপনার জ্ঞান বিক্রি করুন</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleSaveCourse} disabled={isSubmitting}>
            <Save className="h-4 w-4 mr-2" />
            সেভ করুন
          </Button>
          <Button onClick={handlePublishCourse} disabled={isSubmitting}>
            <Eye className="h-4 w-4 mr-2" />
            পাবলিশ করুন
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-10">
        <TabsList className="w-full overflow-x-auto flex flex-nowrap sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 mb-8">
          <TabsTrigger value="content" className="whitespace-nowrap">কোর্স কনটেন্ট</TabsTrigger>
          <TabsTrigger value="appearance" className="whitespace-nowrap">অ্যাপিয়ারেন্স</TabsTrigger>
          <TabsTrigger value="pricing" className="whitespace-nowrap">প্রাইসিং</TabsTrigger>
          <TabsTrigger value="payment" className="whitespace-nowrap">পেমেন্ট গেটওয়ে</TabsTrigger>
          <TabsTrigger value="analytics" className="whitespace-nowrap">অ্যাড ট্র্যাকিং</TabsTrigger>
          <TabsTrigger value="students" className="whitespace-nowrap">শিক্ষার্থী ম্যানেজমেন্ট</TabsTrigger>
          <TabsTrigger value="settings" className="whitespace-nowrap">সেটিংস</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-7">
            <div className="md:col-span-5 space-y-6">
              {/* Course Information Form */}
              <CourseInfoForm 
                courseName={courseName}
                setCourseName={setCourseName}
                courseDescription={courseDescription}
                setCourseDescription={setCourseDescription}
              />

              {/* Course Modules Section */}
              <CourseModules 
                modules={modules}
                setModules={setModules}
              />
            </div>

            <div className="md:col-span-2 space-y-6">
              {/* Course Summary */}
              <CourseSummary modules={modules} />

              {/* Course Type Selector */}
              <CourseTypeSelector selectedTemplate={selectedTemplate} />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          {/* Template Selector */}
          <TemplateSelector 
            selectedTemplate={selectedTemplate}
            setSelectedTemplate={setSelectedTemplate}
          />

          {/* Color Scheme Selector */}
          <ColorSchemeSelector />
        </TabsContent>

        <TabsContent value="pricing" className="space-y-6">
          {/* Enhanced Pricing Model */}
          <EnhancedPricingModel 
            onPricingChange={setPricingData}
          />

          {/* Legacy Price Configuration (for backward compatibility) */}
          <PriceConfigurationForm 
            coursePrice={coursePrice}
            setCoursePrice={setCoursePrice}
          />

          {/* Reseller Options */}
          <ResellerOptions />
        </TabsContent>

        <TabsContent value="payment" className="space-y-6">
          {/* Payment Gateway Setup */}
          <PaymentGatewaySetup />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          {/* Ad Tracking & Analytics */}
          <AdTrackingAnalytics />
        </TabsContent>

        <TabsContent value="students" className="space-y-6">
          {/* Student Enrollment */}
          <StudentEnrollment />

          {/* Student Communication */}
          <StudentCommunication />

          {/* Certificate Settings */}
          <CertificateSettings />
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          {/* Advanced Features */}
          <AdvancedFeatures 
            advancedOptions={advancedOptions}
            handleToggleAdvancedOption={handleToggleAdvancedOption}
          />

          {/* Course Access */}
          <CourseAccess />

          {/* SEO Settings */}
          <SeoSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CourseBuilder;
