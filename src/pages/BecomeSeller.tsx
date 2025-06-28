import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Store, 
  CheckCircle, 
  Upload, 
  User, 
  Building,
  Phone,
  Mail,
  MapPin,
  FileText,
  DollarSign,
  Truck,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const BecomeSeller = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: '',
    businessType: '',
    phone: '',
    email: '',
    address: '',
    description: '',
    category: '',
    experience: '',
    documents: null,
    agreeTerms: false
  });

  const steps = [
    { id: 1, title: 'ব্যবসায়িক তথ্য', description: 'আপনার ব্যবসার মূল তথ্য প্রদান করুন' },
    { id: 2, title: 'বিভাগ নির্বাচন', description: 'আপনার ব্যবসার ধরন নির্বাচন করুন' },
    { id: 3, title: 'ডকুমেন্ট আপলোড', description: 'প্রয়োজনীয় কাগজপত্র আপলোড করুন' },
    { id: 4, title: 'রিভিউ ও সাবমিট', description: 'তথ্য যাচাই করে আবেদন জমা দিন' }
  ];

  const benefits = [
    { icon: <DollarSign className="h-6 w-6" />, title: 'আয় বৃদ্ধি', description: 'আপনার পণ্য ও সেবা বিক্রি করে আয় করুন' },
    { icon: <Store className="h-6 w-6" />, title: 'অনলাইন স্টোর', description: 'নিজস্ব অনলাইন দোকান পান' },
    { icon: <Truck className="h-6 w-6" />, title: 'ডেলিভারি সাপোর্ট', description: 'আমাদের ডেলিভারি নেটওয়ার্ক ব্যবহার করুন' },
    { icon: <Star className="h-6 w-6" />, title: 'রেটিং সিস্টেম', description: 'গ্রাহকদের রিভিউ ও রেটিং পান' }
  ];

  const categories = [
    'ইলেকট্রনিক্স',
    'ফ্যাশন ও পোশাক',
    'খাদ্য ও পানীয়',
    'স্বাস্থ্য ও সৌন্দর্য',
    'বই ও স্টেশনারি',
    'হোম অ্যাপ্লায়েন্স',
    'খেলাধুলা',
    'গাড়ি ও যন্ত্রাংশ',
    'সেবা প্রদানকারী',
    'অন্যান্য'
  ];

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    toast({
      title: "আবেদন জমা দেওয়া হয়েছে",
      description: "আপনার বিক্রেতা হওয়ার আবেদনটি আমাদের কাছে পৌঁছেছে। আমরা শীঘ্রই যোগাযোগ করব।"
    });
    navigate('/profile');
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="businessName">ব্যবসার নাম *</Label>
              <Input
                id="businessName"
                value={formData.businessName}
                onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                placeholder="আপনার ব্যবসার নাম লিখুন"
              />
            </div>
            <div>
              <Label htmlFor="businessType">ব্যবসার ধরন *</Label>
              <Select value={formData.businessType} onValueChange={(value) => setFormData({...formData, businessType: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="ব্যবসার ধরন নির্বাচন করুন" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="individual">ব্যক্তিগত</SelectItem>
                  <SelectItem value="company">কোম্পানি</SelectItem>
                  <SelectItem value="partnership">পার্টনারশিপ</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">ফোন নম্বর *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder="+৮৮০১৭xxxxxxxx"
                />
              </div>
              <div>
                <Label htmlFor="email">ইমেইল *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="example@email.com"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="address">ব্যবসার ঠিকানা *</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                placeholder="আপনার ব্যবসার সম্পূর্ণ ঠিকানা লিখুন"
                rows={3}
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="category">প্রধান বিভাগ *</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="আপনার ব্যবসার বিভাগ নির্বাচন করুন" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="experience">অভিজ্ঞতা *</Label>
              <Select value={formData.experience} onValueChange={(value) => setFormData({...formData, experience: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="আপনার অভিজ্ঞতার মেয়াদ নির্বাচন করুন" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-1">০-১ বছর</SelectItem>
                  <SelectItem value="1-3">১-৩ বছর</SelectItem>
                  <SelectItem value="3-5">৩-৫ বছর</SelectItem>
                  <SelectItem value="5+">৫+ বছর</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="description">ব্যবসার বিবরণ *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="আপনার ব্যবসা সম্পর্কে বিস্তারিত বলুন"
                rows={4}
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div className="text-center">
              <Upload className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <p className="text-lg font-medium mb-2">প্রয়োজনীয় ডকুমেন্ট আপলোড করুন</p>
              <p className="text-sm text-muted-foreground mb-4">
                ট্রেড লাইসেন্স, NID কপি, ব্যাংক স্টেটমেন্ট ইত্যাদি আপলোড করুন
              </p>
              <Button variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                ফাইল নির্বাচন করুন
              </Button>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">প্রয়োজনীয় ডকুমেন্ট:</h4>
              <ul className="text-sm space-y-1">
                <li>• ট্রেড লাইসেন্স (যদি থাকে)</li>
                <li>• জাতীয় পরিচয়পত্রের কপি</li>
                <li>• ব্যাংক একাউন্ট তথ্য</li>
                <li>• পণ্যের ছবি (৫টি পর্যন্ত)</li>
              </ul>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2 text-green-800">তথ্য যাচাই করুন</h4>
              <div className="text-sm space-y-2">
                <p><strong>ব্যবসার নাম:</strong> {formData.businessName}</p>
                <p><strong>ব্যবসার ধরন:</strong> {formData.businessType}</p>
                <p><strong>বিভাগ:</strong> {formData.category}</p>
                <p><strong>অভিজ্ঞতা:</strong> {formData.experience}</p>
                <p><strong>ফোন:</strong> {formData.phone}</p>
                <p><strong>ইমেইল:</strong> {formData.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="terms" 
                checked={formData.agreeTerms}
                onCheckedChange={(checked) => setFormData({...formData, agreeTerms: Boolean(checked)})}
              />
              <Label htmlFor="terms" className="text-sm">
                আমি <a href="#" className="text-primary">শর্তাবলী ও নীতিমালা</a> সম্মত আছি
              </Label>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container px-4 pt-16 pb-20">
      <div className="flex items-center gap-3 mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold">বিক্রেতা হয়ে যান</h1>
      </div>

      {/* Benefits Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {benefits.map((benefit, index) => (
          <Card key={index} className="text-center">
            <CardContent className="p-4">
              <div className="text-primary mb-2 flex justify-center">
                {benefit.icon}
              </div>
              <h3 className="font-medium mb-1">{benefit.title}</h3>
              <p className="text-xs text-muted-foreground">{benefit.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Progress Steps */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center space-x-4">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep >= step.id ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {currentStep > step.id ? <CheckCircle className="h-5 w-5" /> : step.id}
              </div>
              {index < steps.length - 1 && (
                <div className={`w-16 h-1 ${currentStep > step.id ? 'bg-primary' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form Card */}
      <Card>
        <CardHeader>
          <CardTitle>{steps[currentStep - 1].title}</CardTitle>
          <CardDescription>{steps[currentStep - 1].description}</CardDescription>
        </CardHeader>
        <CardContent>
          {renderStepContent()}
          
          <div className="flex justify-between mt-6">
            <Button 
              variant="outline" 
              onClick={handlePrevious}
              disabled={currentStep === 1}
            >
              পূর্ববর্তী
            </Button>
            {currentStep < 4 ? (
              <Button onClick={handleNext}>
                পরবর্তী
              </Button>
            ) : (
              <Button 
                onClick={handleSubmit}
                disabled={!formData.agreeTerms}
              >
                আবেদন জমা দিন
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BecomeSeller;
