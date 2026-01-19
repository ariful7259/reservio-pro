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
  Loader2,
  CreditCard,
  Smartphone,
  Globe,
  Video,
  Users,
  IdCard,
  Image as ImageIcon,
  Plus,
  Trash2,
  Facebook,
  Instagram,
  MessageCircle
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
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

interface ProductSample {
  name: string;
  description: string;
  image?: string;
  imageFile?: File;
  uploading?: boolean;
}

interface Reference {
  name: string;
  phone: string;
  relationship: string;
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
  
  // Form Data
  const [formData, setFormData] = useState({
    // Step 1: Business Info
    businessName: '',
    businessType: '',
    phone: '',
    email: '',
    address: '',
    description: '',
    
    // Step 2: NID/Passport
    nidType: 'nid',
    nidNumber: '',
    nidFrontImage: '',
    nidBackImage: '',
    
    // Step 3: Trade License
    tradeLicenseNumber: '',
    tradeLicenseImage: '',
    tradeLicenseExpiry: '',
    
    // Step 4: Bank/Payment Info
    paymentMethod: 'bank',
    bankName: '',
    bankAccountNumber: '',
    bankAccountHolder: '',
    bankBranch: '',
    mobileBankingProvider: '',
    mobileBankingNumber: '',
    
    // Step 5: Category & Experience
    category: '',
    experience: '',
    
    // Step 6: Social Media & References
    facebookUrl: '',
    instagramUrl: '',
    whatsappNumber: '',
    websiteUrl: '',
    references: [] as Reference[],
    
    // Step 7: Product Samples & Video
    productSamples: [] as ProductSample[],
    videoIntroductionUrl: '',
    
    // Step 8: Documents & Submit
    agreeTerms: false
  });
  
  // File refs
  const fileInputRef = useRef<HTMLInputElement>(null);
  const nidFrontRef = useRef<HTMLInputElement>(null);
  const nidBackRef = useRef<HTMLInputElement>(null);
  const tradeLicenseRef = useRef<HTMLInputElement>(null);
  const productImageRef = useRef<HTMLInputElement>(null);

  // NID Image uploading states
  const [nidFrontUploading, setNidFrontUploading] = useState(false);
  const [nidBackUploading, setNidBackUploading] = useState(false);
  const [tradeLicenseUploading, setTradeLicenseUploading] = useState(false);

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

  // File validation constants
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  const ALLOWED_TYPES = {
    'image/jpeg': ['.jpg', '.jpeg'],
    'image/png': ['.png'],
    'image/gif': ['.gif'],
    'image/webp': ['.webp'],
    'application/pdf': ['.pdf'],
    'application/msword': ['.doc'],
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
  };

  const validateFile = (file: File): { valid: boolean; error?: string } => {
    if (file.size > MAX_FILE_SIZE) {
      return { 
        valid: false, 
        error: `ফাইল সাইজ ${(file.size / (1024 * 1024)).toFixed(2)}MB - সর্বোচ্চ ৫MB অনুমোদিত` 
      };
    }

    const allowedMimeTypes = Object.keys(ALLOWED_TYPES);
    if (!allowedMimeTypes.includes(file.type)) {
      return { 
        valid: false, 
        error: 'অবৈধ ফাইল টাইপ - শুধুমাত্র JPG, PNG, GIF, WebP, PDF ও Word ফাইল অনুমোদিত' 
      };
    }

    const fileName = file.name.toLowerCase();
    const allowedExtensions = ALLOWED_TYPES[file.type as keyof typeof ALLOWED_TYPES] || [];
    const hasValidExtension = allowedExtensions.some(ext => fileName.endsWith(ext));
    
    if (!hasValidExtension) {
      return { 
        valid: false, 
        error: 'ফাইল এক্সটেনশন মিলছে না - সঠিক ফাইল টাইপ ব্যবহার করুন' 
      };
    }

    return { valid: true };
  };

  const uploadSingleFile = async (file: File, folder: string): Promise<string | null> => {
    if (!user?.id) return null;
    
    const validation = validateFile(file);
    if (!validation.valid) {
      toast({
        title: "অবৈধ ফাইল",
        description: validation.error,
        variant: "destructive"
      });
      return null;
    }

    const fileName = `${user.id}/${folder}/${Date.now()}-${file.name}`;
    
    try {
      const { data, error } = await supabase.storage
        .from('seller-documents')
        .upload(fileName, file);
      
      if (error) throw error;
      
      const { data: urlData } = await supabase.storage
        .from('seller-documents')
        .createSignedUrl(fileName, 60 * 60 * 24 * 365);
      
      return urlData?.signedUrl || null;
    } catch (error: any) {
      console.error('Upload error:', error);
      toast({
        title: "আপলোড ব্যর্থ",
        description: error.message,
        variant: "destructive"
      });
      return null;
    }
  };

  const handleNidFrontUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setNidFrontUploading(true);
    const url = await uploadSingleFile(file, 'nid');
    if (url) {
      setFormData(prev => ({ ...prev, nidFrontImage: url }));
      toast({ title: "NID সামনের ছবি আপলোড সম্পন্ন" });
    }
    setNidFrontUploading(false);
  };

  const handleNidBackUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setNidBackUploading(true);
    const url = await uploadSingleFile(file, 'nid');
    if (url) {
      setFormData(prev => ({ ...prev, nidBackImage: url }));
      toast({ title: "NID পেছনের ছবি আপলোড সম্পন্ন" });
    }
    setNidBackUploading(false);
  };

  const handleTradeLicenseUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setTradeLicenseUploading(true);
    const url = await uploadSingleFile(file, 'trade-license');
    if (url) {
      setFormData(prev => ({ ...prev, tradeLicenseImage: url }));
      toast({ title: "ট্রেড লাইসেন্স আপলোড সম্পন্ন" });
    }
    setTradeLicenseUploading(false);
  };

  const processFiles = async (files: File[]) => {
    if (!user?.id) return;
    
    const validatedFiles: { file: File; error?: string }[] = [];
    const errors: string[] = [];

    for (const file of files) {
      const validation = validateFile(file);
      if (validation.valid) {
        validatedFiles.push({ file });
      } else {
        validatedFiles.push({ file, error: validation.error });
        errors.push(`${file.name}: ${validation.error}`);
      }
    }

    if (validatedFiles.every(f => f.error)) {
      toast({
        title: "অবৈধ ফাইল",
        description: errors.join('; '),
        variant: "destructive"
      });
      return;
    }

    const validFiles = validatedFiles.filter(f => !f.error);
    const newFiles = validFiles.slice(0, 5 - uploadedFiles.length);
    
    if (newFiles.length < validFiles.length) {
      toast({
        title: "সর্বোচ্চ ৫টি ফাইল",
        description: "আপনি সর্বোচ্চ ৫টি ফাইল আপলোড করতে পারবেন।",
        variant: "destructive"
      });
    }

    if (errors.length > 0 && newFiles.length > 0) {
      toast({
        title: "কিছু ফাইল বাদ দেওয়া হয়েছে",
        description: errors.slice(0, 2).join('; '),
        variant: "destructive"
      });
    }
    
    const fileObjects: UploadedFile[] = newFiles.map(f => ({
      file: f.file,
      progress: 0,
      uploading: true
    }));
    
    setUploadedFiles(prev => [...prev, ...fileObjects]);
    
    for (let i = 0; i < newFiles.length; i++) {
      const fileItem = newFiles[i];
      const fileIndex = uploadedFiles.length + i;
      const fileName = `${user.id}/documents/${Date.now()}-${fileItem.file.name}`;
      
      try {
        const progressInterval = setInterval(() => {
          setUploadedFiles(prev => prev.map((f, idx) => 
            idx === fileIndex && f.progress < 90 
              ? { ...f, progress: f.progress + 10 } 
              : f
          ));
        }, 100);
        
        const { data, error } = await supabase.storage
          .from('seller-documents')
          .upload(fileName, fileItem.file);
        
        clearInterval(progressInterval);
        
        if (error) throw error;
        
        const { data: urlData } = await supabase.storage
          .from('seller-documents')
          .createSignedUrl(fileName, 60 * 60 * 24 * 365);
        
        setUploadedFiles(prev => prev.map((f, idx) => 
          idx === fileIndex 
            ? { ...f, progress: 100, uploading: false, url: urlData?.signedUrl || fileName } 
            : f
        ));
        
        toast({
          title: "আপলোড সম্পন্ন",
          description: `${fileItem.file.name} সফলভাবে আপলোড হয়েছে।`,
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
          description: `${fileItem.file.name} আপলোড করতে সমস্যা হয়েছে।`,
          variant: "destructive"
        });
      }
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    
    await processFiles(Array.from(files));
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeFile = async (index: number) => {
    const fileToRemove = uploadedFiles[index];
    
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

  // Reference handlers
  const addReference = () => {
    if (formData.references.length < 3) {
      setFormData(prev => ({
        ...prev,
        references: [...prev.references, { name: '', phone: '', relationship: '' }]
      }));
    }
  };

  const updateReference = (index: number, field: keyof Reference, value: string) => {
    setFormData(prev => ({
      ...prev,
      references: prev.references.map((ref, i) => 
        i === index ? { ...ref, [field]: value } : ref
      )
    }));
  };

  const removeReference = (index: number) => {
    setFormData(prev => ({
      ...prev,
      references: prev.references.filter((_, i) => i !== index)
    }));
  };

  // Product Sample handlers
  const addProductSample = () => {
    if (formData.productSamples.length < 5) {
      setFormData(prev => ({
        ...prev,
        productSamples: [...prev.productSamples, { name: '', description: '' }]
      }));
    }
  };

  const updateProductSample = (index: number, field: keyof ProductSample, value: string) => {
    setFormData(prev => ({
      ...prev,
      productSamples: prev.productSamples.map((sample, i) => 
        i === index ? { ...sample, [field]: value } : sample
      )
    }));
  };

  const uploadProductSampleImage = async (index: number, file: File) => {
    if (!user?.id) return;
    
    setFormData(prev => ({
      ...prev,
      productSamples: prev.productSamples.map((sample, i) => 
        i === index ? { ...sample, uploading: true } : sample
      )
    }));

    const url = await uploadSingleFile(file, 'product-samples');
    
    setFormData(prev => ({
      ...prev,
      productSamples: prev.productSamples.map((sample, i) => 
        i === index ? { ...sample, image: url || undefined, uploading: false } : sample
      )
    }));
  };

  const removeProductSample = (index: number) => {
    setFormData(prev => ({
      ...prev,
      productSamples: prev.productSamples.filter((_, i) => i !== index)
    }));
  };

  const steps = [
    { id: 1, title: 'ব্যবসায়িক তথ্য', icon: <Building className="h-4 w-4" /> },
    { id: 2, title: 'পরিচয় যাচাই', icon: <IdCard className="h-4 w-4" /> },
    { id: 3, title: 'ট্রেড লাইসেন্স', icon: <FileText className="h-4 w-4" /> },
    { id: 4, title: 'পেমেন্ট তথ্য', icon: <CreditCard className="h-4 w-4" /> },
    { id: 5, title: 'বিভাগ ও অভিজ্ঞতা', icon: <Star className="h-4 w-4" /> },
    { id: 6, title: 'সোশ্যাল ও রেফারেন্স', icon: <Users className="h-4 w-4" /> },
    { id: 7, title: 'পণ্যের নমুনা', icon: <ImageIcon className="h-4 w-4" /> },
    { id: 8, title: 'ডকুমেন্ট ও সাবমিট', icon: <CheckCircle className="h-4 w-4" /> }
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
    if (currentStep < 8) {
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
        documents: documentUrls,
        // New fields
        nidType: formData.nidType,
        nidNumber: formData.nidNumber,
        nidFrontImage: formData.nidFrontImage,
        nidBackImage: formData.nidBackImage,
        tradeLicenseNumber: formData.tradeLicenseNumber,
        tradeLicenseImage: formData.tradeLicenseImage,
        tradeLicenseExpiry: formData.tradeLicenseExpiry,
        bankName: formData.bankName,
        bankAccountNumber: formData.bankAccountNumber,
        bankAccountHolder: formData.bankAccountHolder,
        bankBranch: formData.bankBranch,
        mobileBankingProvider: formData.mobileBankingProvider,
        mobileBankingNumber: formData.mobileBankingNumber,
        facebookUrl: formData.facebookUrl,
        instagramUrl: formData.instagramUrl,
        whatsappNumber: formData.whatsappNumber,
        websiteUrl: formData.websiteUrl,
        references: formData.references,
        productSamples: formData.productSamples,
        videoIntroductionUrl: formData.videoIntroductionUrl
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

  // Loading state
  if (appLoading) {
    return (
      <div className="container px-4 pt-16 pb-20 flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Show existing application status
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
            <div>
              <Label htmlFor="description">ব্যবসার বিবরণ</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="আপনার ব্যবসা সম্পর্কে সংক্ষেপে বলুন"
                rows={3}
              />
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <h4 className="font-medium text-blue-800 mb-2">পরিচয় যাচাই</h4>
              <p className="text-sm text-blue-700">আপনার জাতীয় পরিচয়পত্র (NID) অথবা পাসপোর্টের তথ্য প্রদান করুন।</p>
            </div>
            
            <div>
              <Label>পরিচয়পত্রের ধরন *</Label>
              <RadioGroup 
                value={formData.nidType} 
                onValueChange={(value) => setFormData({...formData, nidType: value})}
                className="flex gap-4 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="nid" id="nid" />
                  <Label htmlFor="nid">জাতীয় পরিচয়পত্র (NID)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="passport" id="passport" />
                  <Label htmlFor="passport">পাসপোর্ট</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="nidNumber">{formData.nidType === 'nid' ? 'NID নম্বর' : 'পাসপোর্ট নম্বর'} *</Label>
              <Input
                id="nidNumber"
                value={formData.nidNumber}
                onChange={(e) => setFormData({...formData, nidNumber: e.target.value})}
                placeholder={formData.nidType === 'nid' ? '১০ অথবা ১৭ ডিজিট NID নম্বর' : 'পাসপোর্ট নম্বর'}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>সামনের ছবি *</Label>
                <div 
                  onClick={() => nidFrontRef.current?.click()}
                  className="mt-2 border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:border-primary/50 transition-colors"
                >
                  {formData.nidFrontImage ? (
                    <div className="relative">
                      <img src={formData.nidFrontImage} alt="NID Front" className="max-h-32 mx-auto rounded" />
                      <Badge className="absolute top-1 right-1 bg-green-500">আপলোড সম্পন্ন</Badge>
                    </div>
                  ) : nidFrontUploading ? (
                    <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
                  ) : (
                    <>
                      <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                      <p className="text-sm mt-2">ক্লিক করে আপলোড করুন</p>
                    </>
                  )}
                </div>
                <input
                  type="file"
                  ref={nidFrontRef}
                  onChange={handleNidFrontUpload}
                  accept="image/*"
                  className="hidden"
                />
              </div>
              
              <div>
                <Label>পেছনের ছবি *</Label>
                <div 
                  onClick={() => nidBackRef.current?.click()}
                  className="mt-2 border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:border-primary/50 transition-colors"
                >
                  {formData.nidBackImage ? (
                    <div className="relative">
                      <img src={formData.nidBackImage} alt="NID Back" className="max-h-32 mx-auto rounded" />
                      <Badge className="absolute top-1 right-1 bg-green-500">আপলোড সম্পন্ন</Badge>
                    </div>
                  ) : nidBackUploading ? (
                    <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
                  ) : (
                    <>
                      <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                      <p className="text-sm mt-2">ক্লিক করে আপলোড করুন</p>
                    </>
                  )}
                </div>
                <input
                  type="file"
                  ref={nidBackRef}
                  onChange={handleNidBackUpload}
                  accept="image/*"
                  className="hidden"
                />
              </div>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-4">
            <div className="bg-amber-50 p-4 rounded-lg mb-4">
              <h4 className="font-medium text-amber-800 mb-2">ট্রেড লাইসেন্স (ঐচ্ছিক)</h4>
              <p className="text-sm text-amber-700">ব্যবসায়িক প্রতিষ্ঠানের জন্য ট্রেড লাইসেন্স তথ্য প্রদান করুন। ব্যক্তিগত বিক্রেতাদের জন্য এটি বাধ্যতামূলক নয়।</p>
            </div>

            <div>
              <Label htmlFor="tradeLicenseNumber">ট্রেড লাইসেন্স নম্বর</Label>
              <Input
                id="tradeLicenseNumber"
                value={formData.tradeLicenseNumber}
                onChange={(e) => setFormData({...formData, tradeLicenseNumber: e.target.value})}
                placeholder="ট্রেড লাইসেন্স নম্বর"
              />
            </div>

            <div>
              <Label htmlFor="tradeLicenseExpiry">মেয়াদ উত্তীর্ণের তারিখ</Label>
              <Input
                id="tradeLicenseExpiry"
                type="date"
                value={formData.tradeLicenseExpiry}
                onChange={(e) => setFormData({...formData, tradeLicenseExpiry: e.target.value})}
              />
            </div>

            <div>
              <Label>ট্রেড লাইসেন্সের ছবি</Label>
              <div 
                onClick={() => tradeLicenseRef.current?.click()}
                className="mt-2 border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-primary/50 transition-colors"
              >
                {formData.tradeLicenseImage ? (
                  <div className="relative">
                    <img src={formData.tradeLicenseImage} alt="Trade License" className="max-h-40 mx-auto rounded" />
                    <Badge className="absolute top-1 right-1 bg-green-500">আপলোড সম্পন্ন</Badge>
                  </div>
                ) : tradeLicenseUploading ? (
                  <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
                ) : (
                  <>
                    <FileText className="h-12 w-12 mx-auto text-muted-foreground" />
                    <p className="text-sm mt-2">ট্রেড লাইসেন্সের ছবি আপলোড করুন</p>
                    <p className="text-xs text-muted-foreground">JPG, PNG বা PDF</p>
                  </>
                )}
              </div>
              <input
                type="file"
                ref={tradeLicenseRef}
                onChange={handleTradeLicenseUpload}
                accept="image/*,.pdf"
                className="hidden"
              />
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="space-y-4">
            <div className="bg-green-50 p-4 rounded-lg mb-4">
              <h4 className="font-medium text-green-800 mb-2">পেমেন্ট তথ্য</h4>
              <p className="text-sm text-green-700">বিক্রয়ের অর্থ গ্রহণের জন্য আপনার পেমেন্ট তথ্য প্রদান করুন।</p>
            </div>

            <div>
              <Label>পেমেন্ট মেথড *</Label>
              <RadioGroup 
                value={formData.paymentMethod} 
                onValueChange={(value) => setFormData({...formData, paymentMethod: value})}
                className="grid grid-cols-2 gap-4 mt-2"
              >
                <div className={`flex items-center space-x-2 p-4 border rounded-lg cursor-pointer ${formData.paymentMethod === 'bank' ? 'border-primary bg-primary/5' : ''}`}>
                  <RadioGroupItem value="bank" id="bank" />
                  <Label htmlFor="bank" className="flex items-center gap-2 cursor-pointer">
                    <CreditCard className="h-5 w-5" />
                    ব্যাংক অ্যাকাউন্ট
                  </Label>
                </div>
                <div className={`flex items-center space-x-2 p-4 border rounded-lg cursor-pointer ${formData.paymentMethod === 'mobile' ? 'border-primary bg-primary/5' : ''}`}>
                  <RadioGroupItem value="mobile" id="mobile" />
                  <Label htmlFor="mobile" className="flex items-center gap-2 cursor-pointer">
                    <Smartphone className="h-5 w-5" />
                    মোবাইল ব্যাংকিং
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {formData.paymentMethod === 'bank' ? (
              <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
                <div>
                  <Label htmlFor="bankName">ব্যাংকের নাম *</Label>
                  <Select value={formData.bankName} onValueChange={(value) => setFormData({...formData, bankName: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="ব্যাংক নির্বাচন করুন" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dutch-bangla">ডাচ-বাংলা ব্যাংক</SelectItem>
                      <SelectItem value="brac">ব্র্যাক ব্যাংক</SelectItem>
                      <SelectItem value="city">সিটি ব্যাংক</SelectItem>
                      <SelectItem value="islami">ইসলামী ব্যাংক</SelectItem>
                      <SelectItem value="sonali">সোনালী ব্যাংক</SelectItem>
                      <SelectItem value="janata">জনতা ব্যাংক</SelectItem>
                      <SelectItem value="other">অন্যান্য</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="bankAccountHolder">অ্যাকাউন্ট হোল্ডারের নাম *</Label>
                  <Input
                    id="bankAccountHolder"
                    value={formData.bankAccountHolder}
                    onChange={(e) => setFormData({...formData, bankAccountHolder: e.target.value})}
                    placeholder="অ্যাকাউন্ট হোল্ডারের নাম"
                  />
                </div>
                <div>
                  <Label htmlFor="bankAccountNumber">অ্যাকাউন্ট নম্বর *</Label>
                  <Input
                    id="bankAccountNumber"
                    value={formData.bankAccountNumber}
                    onChange={(e) => setFormData({...formData, bankAccountNumber: e.target.value})}
                    placeholder="ব্যাংক অ্যাকাউন্ট নম্বর"
                  />
                </div>
                <div>
                  <Label htmlFor="bankBranch">ব্রাঞ্চের নাম</Label>
                  <Input
                    id="bankBranch"
                    value={formData.bankBranch}
                    onChange={(e) => setFormData({...formData, bankBranch: e.target.value})}
                    placeholder="ব্রাঞ্চের নাম"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
                <div>
                  <Label htmlFor="mobileBankingProvider">প্রোভাইডার *</Label>
                  <Select value={formData.mobileBankingProvider} onValueChange={(value) => setFormData({...formData, mobileBankingProvider: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="প্রোভাইডার নির্বাচন করুন" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bkash">বিকাশ</SelectItem>
                      <SelectItem value="nagad">নগদ</SelectItem>
                      <SelectItem value="rocket">রকেট</SelectItem>
                      <SelectItem value="upay">উপায়</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="mobileBankingNumber">মোবাইল নম্বর *</Label>
                  <Input
                    id="mobileBankingNumber"
                    value={formData.mobileBankingNumber}
                    onChange={(e) => setFormData({...formData, mobileBankingNumber: e.target.value})}
                    placeholder="০১XXXXXXXXX"
                  />
                </div>
              </div>
            )}
          </div>
        );
      
      case 5:
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
          </div>
        );
      
      case 6:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h4 className="font-medium flex items-center gap-2">
                <Globe className="h-4 w-4" />
                সোশ্যাল মিডিয়া লিংক (ঐচ্ছিক)
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="facebookUrl" className="flex items-center gap-2">
                    <Facebook className="h-4 w-4 text-blue-600" />
                    Facebook
                  </Label>
                  <Input
                    id="facebookUrl"
                    value={formData.facebookUrl}
                    onChange={(e) => setFormData({...formData, facebookUrl: e.target.value})}
                    placeholder="https://facebook.com/yourpage"
                  />
                </div>
                <div>
                  <Label htmlFor="instagramUrl" className="flex items-center gap-2">
                    <Instagram className="h-4 w-4 text-pink-600" />
                    Instagram
                  </Label>
                  <Input
                    id="instagramUrl"
                    value={formData.instagramUrl}
                    onChange={(e) => setFormData({...formData, instagramUrl: e.target.value})}
                    placeholder="https://instagram.com/yourprofile"
                  />
                </div>
                <div>
                  <Label htmlFor="whatsappNumber" className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4 text-green-600" />
                    WhatsApp
                  </Label>
                  <Input
                    id="whatsappNumber"
                    value={formData.whatsappNumber}
                    onChange={(e) => setFormData({...formData, whatsappNumber: e.target.value})}
                    placeholder="+৮৮০১XXXXXXXXX"
                  />
                </div>
                <div>
                  <Label htmlFor="websiteUrl" className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    ওয়েবসাইট
                  </Label>
                  <Input
                    id="websiteUrl"
                    value={formData.websiteUrl}
                    onChange={(e) => setFormData({...formData, websiteUrl: e.target.value})}
                    placeholder="https://yourwebsite.com"
                  />
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  রেফারেন্স (ঐচ্ছিক)
                </h4>
                {formData.references.length < 3 && (
                  <Button variant="outline" size="sm" onClick={addReference}>
                    <Plus className="h-4 w-4 mr-1" />
                    যোগ করুন
                  </Button>
                )}
              </div>
              
              {formData.references.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  কোনো রেফারেন্স যোগ করা হয়নি। সর্বোচ্চ ৩টি রেফারেন্স যোগ করতে পারবেন।
                </p>
              ) : (
                <div className="space-y-4">
                  {formData.references.map((ref, index) => (
                    <div key={index} className="p-4 border rounded-lg space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">রেফারেন্স #{index + 1}</span>
                        <Button variant="ghost" size="sm" onClick={() => removeReference(index)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <Input
                          value={ref.name}
                          onChange={(e) => updateReference(index, 'name', e.target.value)}
                          placeholder="নাম"
                        />
                        <Input
                          value={ref.phone}
                          onChange={(e) => updateReference(index, 'phone', e.target.value)}
                          placeholder="ফোন নম্বর"
                        />
                        <Input
                          value={ref.relationship}
                          onChange={(e) => updateReference(index, 'relationship', e.target.value)}
                          placeholder="সম্পর্ক (যেমন: ব্যবসায়িক সহযোগী)"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      
      case 7:
        return (
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium flex items-center gap-2">
                  <ImageIcon className="h-4 w-4" />
                  পণ্যের নমুনা (ঐচ্ছিক)
                </h4>
                {formData.productSamples.length < 5 && (
                  <Button variant="outline" size="sm" onClick={addProductSample}>
                    <Plus className="h-4 w-4 mr-1" />
                    যোগ করুন
                  </Button>
                )}
              </div>
              
              {formData.productSamples.length === 0 ? (
                <div className="text-center py-8 border-2 border-dashed rounded-lg">
                  <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">
                    আপনার পণ্যের নমুনা ছবি যোগ করুন। সর্বোচ্চ ৫টি।
                  </p>
                  <Button variant="outline" size="sm" className="mt-3" onClick={addProductSample}>
                    <Plus className="h-4 w-4 mr-1" />
                    প্রথম পণ্য যোগ করুন
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {formData.productSamples.map((sample, index) => (
                    <div key={index} className="p-4 border rounded-lg space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">পণ্য #{index + 1}</span>
                        <Button variant="ghost" size="sm" onClick={() => removeProductSample(index)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                      
                      <div 
                        onClick={() => {
                          const input = document.createElement('input');
                          input.type = 'file';
                          input.accept = 'image/*';
                          input.onchange = (e) => {
                            const file = (e.target as HTMLInputElement).files?.[0];
                            if (file) uploadProductSampleImage(index, file);
                          };
                          input.click();
                        }}
                        className="border-2 border-dashed rounded-lg p-3 text-center cursor-pointer hover:border-primary/50"
                      >
                        {sample.image ? (
                          <img src={sample.image} alt={sample.name} className="max-h-24 mx-auto rounded" />
                        ) : sample.uploading ? (
                          <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                        ) : (
                          <>
                            <Upload className="h-6 w-6 mx-auto text-muted-foreground" />
                            <p className="text-xs mt-1">ছবি আপলোড</p>
                          </>
                        )}
                      </div>
                      
                      <Input
                        value={sample.name}
                        onChange={(e) => updateProductSample(index, 'name', e.target.value)}
                        placeholder="পণ্যের নাম"
                      />
                      <Textarea
                        value={sample.description}
                        onChange={(e) => updateProductSample(index, 'description', e.target.value)}
                        placeholder="সংক্ষিপ্ত বিবরণ"
                        rows={2}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t pt-6">
              <h4 className="font-medium flex items-center gap-2 mb-4">
                <Video className="h-4 w-4" />
                ভিডিও ইন্ট্রোডাকশন (ঐচ্ছিক)
              </h4>
              <p className="text-sm text-muted-foreground mb-3">
                YouTube অথবা Facebook ভিডিও লিংক দিন যেখানে আপনি আপনার ব্যবসা সম্পর্কে বলেছেন।
              </p>
              <Input
                value={formData.videoIntroductionUrl}
                onChange={(e) => setFormData({...formData, videoIntroductionUrl: e.target.value})}
                placeholder="https://youtube.com/watch?v=... অথবা https://facebook.com/..."
              />
              {formData.videoIntroductionUrl && formData.videoIntroductionUrl.includes('youtube') && (
                <div className="mt-3 aspect-video rounded-lg overflow-hidden bg-muted">
                  <iframe
                    width="100%"
                    height="100%"
                    src={formData.videoIntroductionUrl.replace('watch?v=', 'embed/')}
                    title="Video Introduction"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}
            </div>
          </div>
        );
      
      case 8:
        return (
          <div className="space-y-6">
            {/* Document Upload */}
            <div>
              <h4 className="font-medium mb-4">অতিরিক্ত ডকুমেন্ট আপলোড (ঐচ্ছিক)</h4>
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all ${
                  isDragging 
                    ? 'border-primary bg-primary/10' 
                    : 'border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50'
                }`}
              >
                <Upload className={`h-12 w-12 mx-auto mb-3 transition-colors ${isDragging ? 'text-primary' : 'text-gray-400'}`} />
                <p className="text-sm font-medium mb-1">
                  {isDragging ? 'ফাইল এখানে ড্রপ করুন' : 'অতিরিক্ত ডকুমেন্ট আপলোড করুন'}
                </p>
                <p className="text-xs text-muted-foreground">
                  সর্বোচ্চ ৫MB • JPG, PNG, PDF, DOC
                </p>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  multiple
                  accept="image/*,.pdf,.doc,.docx"
                  className="hidden"
                />
              </div>
              
              {uploadedFiles.length > 0 && (
                <div className="mt-4 space-y-2">
                  {uploadedFiles.map((uploadedFile, index) => (
                    <div key={index} className="p-3 bg-muted rounded-lg flex items-center justify-between">
                      <div className="flex items-center gap-2 flex-1">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm truncate max-w-[200px]">{uploadedFile.file.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {uploadedFile.uploading ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : uploadedFile.error ? (
                          <Badge variant="destructive">ব্যর্থ</Badge>
                        ) : (
                          <Badge className="bg-green-500">সম্পন্ন</Badge>
                        )}
                        <Button variant="ghost" size="sm" onClick={() => removeFile(index)} disabled={uploadedFile.uploading}>
                          <XCircle className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Review Summary */}
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-medium mb-3 text-green-800">আবেদন সারসংক্ষেপ</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-muted-foreground">ব্যবসার নাম</p>
                  <p className="font-medium">{formData.businessName || '-'}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">ব্যবসার ধরন</p>
                  <p className="font-medium">{formData.businessType || '-'}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">বিভাগ</p>
                  <p className="font-medium">{formData.category || '-'}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">NID/পাসপোর্ট</p>
                  <p className="font-medium">{formData.nidNumber ? '✓ প্রদান করা হয়েছে' : '-'}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">পেমেন্ট মেথড</p>
                  <p className="font-medium">
                    {formData.paymentMethod === 'bank' ? formData.bankName || 'ব্যাংক' : formData.mobileBankingProvider || 'মোবাইল ব্যাংকিং'}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">পণ্যের নমুনা</p>
                  <p className="font-medium">{formData.productSamples.length}টি</p>
                </div>
              </div>
            </div>

            {/* Terms Agreement */}
            <div className="flex items-center space-x-2 p-4 border rounded-lg">
              <Checkbox 
                id="terms" 
                checked={formData.agreeTerms}
                onCheckedChange={(checked) => setFormData({...formData, agreeTerms: Boolean(checked)})}
              />
              <Label htmlFor="terms" className="text-sm">
                আমি <a href="#" className="text-primary underline">শর্তাবলী ও নীতিমালা</a> পড়েছি এবং সম্মত আছি
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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {benefits.map((benefit, index) => (
          <Card key={index} className="text-center">
            <CardContent className="p-3">
              <div className="text-primary mb-1 flex justify-center">
                {benefit.icon}
              </div>
              <h3 className="font-medium text-sm mb-0.5">{benefit.title}</h3>
              <p className="text-xs text-muted-foreground">{benefit.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Progress Steps */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">ধাপ {currentStep}/৮</span>
          <span className="text-sm font-medium">{steps[currentStep - 1].title}</span>
        </div>
        <Progress value={(currentStep / 8) * 100} className="h-2" />
      </div>

      {/* Step Indicators (Mobile-friendly) */}
      <div className="flex justify-center gap-1 mb-6 overflow-x-auto pb-2">
        {steps.map((step) => (
          <div 
            key={step.id}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 ${
              currentStep >= step.id 
                ? 'bg-primary text-white' 
                : 'bg-muted text-muted-foreground'
            }`}
          >
            {currentStep > step.id ? <CheckCircle className="h-4 w-4" /> : step.id}
          </div>
        ))}
      </div>

      {/* Form Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {steps[currentStep - 1].icon}
            {steps[currentStep - 1].title}
          </CardTitle>
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
            {currentStep < 8 ? (
              <Button onClick={handleNext}>
                পরবর্তী
              </Button>
            ) : (
              <Button 
                onClick={handleSubmit}
                disabled={!formData.agreeTerms || isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    জমা দেওয়া হচ্ছে...
                  </>
                ) : (
                  'আবেদন জমা দিন'
                )}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BecomeSeller;
