import React, { useState, useRef } from 'react';
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
  Star,
  Clock,
  XCircle,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { useSellerApplication } from '@/hooks/useSellerApplication';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

interface UploadedFile {
  file: File;
  progress: number;
  url?: string;
  uploading: boolean;
  error?: string;
}

const BecomeSeller = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();
  const { application, isLoading: appLoading, submitApplication, isPending, isApproved, isRejected } = useSellerApplication();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
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
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      await processFiles(Array.from(files));
    }
  };

  const processFiles = async (files: File[]) => {
    if (!user?.id) return;
    
    const validFiles = files.filter(file => {
      const isValidType = file.type.startsWith('image/') || 
                         file.type === 'application/pdf' ||
                         file.type === 'application/msword' ||
                         file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      return isValidType;
    });

    if (validFiles.length === 0) {
      toast({
        title: "অবৈধ ফাইল টাইপ",
        description: "শুধুমাত্র ছবি, PDF ও Word ফাইল আপলোড করা যাবে।",
        variant: "destructive"
      });
      return;
    }
    
    const newFiles = validFiles.slice(0, 5 - uploadedFiles.length);
    
    if (newFiles.length < validFiles.length) {
      toast({
        title: "সর্বোচ্চ ৫টি ফাইল",
        description: "আপনি সর্বোচ্চ ৫টি ফাইল আপলোড করতে পারবেন।",
        variant: "destructive"
      });
    }
    
    // Add files to state with initial progress
    const fileObjects: UploadedFile[] = newFiles.map(file => ({
      file,
      progress: 0,
      uploading: true
    }));
    
    setUploadedFiles(prev => [...prev, ...fileObjects]);
    
    // Upload each file
    for (let i = 0; i < newFiles.length; i++) {
      const file = newFiles[i];
      const fileIndex = uploadedFiles.length + i;
      const fileName = `${user.id}/${Date.now()}-${file.name}`;
      
      try {
        // Simulate progress updates
        const progressInterval = setInterval(() => {
          setUploadedFiles(prev => prev.map((f, idx) => 
            idx === fileIndex && f.progress < 90 
              ? { ...f, progress: f.progress + 10 } 
              : f
          ));
        }, 100);
        
        const { data, error } = await supabase.storage
          .from('seller-documents')
          .upload(fileName, file);
        
        clearInterval(progressInterval);
        
        if (error) throw error;
        
        // Get signed URL for the file
        const { data: urlData } = await supabase.storage
          .from('seller-documents')
          .createSignedUrl(fileName, 60 * 60 * 24 * 365); // 1 year
        
        setUploadedFiles(prev => prev.map((f, idx) => 
          idx === fileIndex 
            ? { ...f, progress: 100, uploading: false, url: urlData?.signedUrl || fileName } 
            : f
        ));
        
        toast({
          title: "আপলোড সম্পন্ন",
          description: `${file.name} সফলভাবে আপলোড হয়েছে।`,
        });
      } catch (error: any) {
        console.error('Upload error:', error);
        setUploadedFiles(prev => prev.map((f, idx) => 
          idx === fileIndex 
            ? { ...f, uploading: false, error: error.message, progress: 0 } 
            : f
        ));
        toast({
          title: "আপলোড ব্যর্থ",
          description: `${file.name} আপলোড করতে সমস্যা হয়েছে।`,
          variant: "destructive"
        });
      }
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    
    await processFiles(Array.from(files));
    
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeFile = async (index: number) => {
    const fileToRemove = uploadedFiles[index];
    
    // If file was uploaded, delete from storage
    if (fileToRemove.url && user?.id) {
      try {
        const filePath = fileToRemove.url.split('/').pop();
        if (filePath) {
          await supabase.storage
            .from('seller-documents')
            .remove([`${user.id}/${filePath}`]);
        }
      } catch (error) {
        console.error('Error deleting file:', error);
      }
    }
    
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

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

  const handleSubmit = async () => {
    if (!isAuthenticated || !user) {
      toast({
        title: "লগইন প্রয়োজন",
        description: "আবেদন করতে প্রথমে লগইন করুন",
        variant: "destructive"
      });
      navigate('/login');
      return;
    }

    // Check if any file is still uploading
    const stillUploading = uploadedFiles.some(f => f.uploading);
    if (stillUploading) {
      toast({
        title: "অপেক্ষা করুন",
        description: "ফাইল আপলোড সম্পন্ন হওয়ার জন্য অপেক্ষা করুন।",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // Get document URLs from uploaded files
      const documentUrls = uploadedFiles
        .filter(f => f.url && !f.error)
        .map(f => f.url as string);

      await submitApplication({
        businessName: formData.businessName,
        businessType: formData.businessType,
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        description: formData.description,
        category: formData.category,
        experience: formData.experience,
        documents: documentUrls
      });

      toast({
        title: "আবেদন জমা দেওয়া হয়েছে",
        description: "আপনার আবেদনটি এডমিনের কাছে পাঠানো হয়েছে। অনুমোদনের পর আপনি সেলার ড্যাশবোর্ড অ্যাক্সেস পাবেন।"
      });
      navigate('/profile');
    } catch (error: any) {
      toast({
        title: "আবেদন জমা দিতে ব্যর্থ",
        description: error.message || "একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // যদি আগে থেকে আবেদন থাকে তাহলে স্ট্যাটাস দেখাও
  if (appLoading) {
    return (
      <div className="container px-4 pt-16 pb-20 flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (application) {
    return (
      <div className="container px-4 pt-16 pb-20">
        <div className="flex items-center gap-3 mb-6">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">আবেদনের স্ট্যাটাস</h1>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-8 text-center">
            {isPending && (
              <>
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-yellow-100 flex items-center justify-center">
                  <Clock className="h-10 w-10 text-yellow-600" />
                </div>
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 mb-4">অপেক্ষমান</Badge>
                <h2 className="text-2xl font-bold mb-2">আপনার আবেদন প্রক্রিয়াধীন</h2>
                <p className="text-muted-foreground mb-4">
                  আপনার বিক্রেতা হওয়ার আবেদনটি এডমিনের কাছে রয়েছে। অনুগ্রহ করে অপেক্ষা করুন।
                </p>
                <div className="bg-muted/50 p-4 rounded-lg text-left">
                  <p className="text-sm"><strong>ব্যবসার নাম:</strong> {application.business_name}</p>
                  <p className="text-sm"><strong>আবেদনের তারিখ:</strong> {new Date(application.created_at).toLocaleDateString('bn-BD')}</p>
                </div>
              </>
            )}

            {isApproved && (
              <>
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-800 mb-4">অনুমোদিত</Badge>
                <h2 className="text-2xl font-bold mb-2">অভিনন্দন! 🎉</h2>
                <p className="text-muted-foreground mb-4">
                  আপনার আবেদন অনুমোদিত হয়েছে। এখন আপনি সেলার ড্যাশবোর্ড অ্যাক্সেস করতে পারবেন।
                </p>
                <Button onClick={() => navigate('/seller-dashboard')} className="mt-4">
                  <Store className="h-4 w-4 mr-2" />
                  সেলার ড্যাশবোর্ডে যান
                </Button>
              </>
            )}

            {isRejected && (
              <>
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
                  <XCircle className="h-10 w-10 text-red-600" />
                </div>
                <Badge variant="secondary" className="bg-red-100 text-red-800 mb-4">প্রত্যাখ্যাত</Badge>
                <h2 className="text-2xl font-bold mb-2">আবেদন প্রত্যাখ্যাত হয়েছে</h2>
                <p className="text-muted-foreground mb-4">
                  দুঃখিত, আপনার আবেদনটি প্রত্যাখ্যাত হয়েছে।
                </p>
                {application.admin_notes && (
                  <div className="bg-red-50 p-4 rounded-lg text-left mb-4">
                    <p className="text-sm font-medium text-red-800">এডমিনের মন্তব্য:</p>
                    <p className="text-sm text-red-700">{application.admin_notes}</p>
                  </div>
                )}
                <p className="text-sm text-muted-foreground">
                  সাহায্যের জন্য আমাদের সাপোর্ট টিমে যোগাযোগ করুন।
                </p>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

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
            {/* Drag and Drop Zone */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${
                isDragging 
                  ? 'border-primary bg-primary/10' 
                  : 'border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50'
              }`}
            >
              <Upload className={`h-16 w-16 mx-auto mb-4 transition-colors ${isDragging ? 'text-primary' : 'text-gray-400'}`} />
              <p className="text-lg font-medium mb-2">
                {isDragging ? 'ফাইল এখানে ড্রপ করুন' : 'প্রয়োজনীয় ডকুমেন্ট আপলোড করুন'}
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                ট্রেড লাইসেন্স, NID কপি, ব্যাংক স্টেটমেন্ট ইত্যাদি আপলোড করুন
              </p>
              <p className="text-xs text-muted-foreground mb-4">
                ফাইল ড্র্যাগ করে এখানে ড্রপ করুন অথবা ক্লিক করুন
              </p>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                multiple
                accept="image/*,.pdf,.doc,.docx"
                className="hidden"
              />
              <Button 
                variant="outline" 
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
              >
                <Upload className="h-4 w-4 mr-2" />
                ফাইল নির্বাচন করুন
              </Button>
            </div>
            
            {/* Uploaded Files List */}
            {uploadedFiles.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium">আপলোড করা ফাইল ({uploadedFiles.length}/৫):</p>
                {uploadedFiles.map((uploadedFile, index) => (
                  <div key={index} className="p-3 bg-muted rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 flex-1">
                        <FileText className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        <span className="text-sm truncate max-w-[180px]">{uploadedFile.file.name}</span>
                        <span className="text-xs text-muted-foreground">
                          ({(uploadedFile.file.size / 1024).toFixed(1)} KB)
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {uploadedFile.uploading ? (
                          <Loader2 className="h-4 w-4 animate-spin text-primary" />
                        ) : uploadedFile.error ? (
                          <Badge variant="destructive" className="text-xs">ব্যর্থ</Badge>
                        ) : (
                          <Badge className="bg-green-500 text-xs">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            সম্পন্ন
                          </Badge>
                        )}
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => removeFile(index)}
                          disabled={uploadedFile.uploading}
                        >
                          <XCircle className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                    {uploadedFile.uploading && (
                      <Progress value={uploadedFile.progress} className="h-2" />
                    )}
                  </div>
                ))}
              </div>
            )}
            
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
