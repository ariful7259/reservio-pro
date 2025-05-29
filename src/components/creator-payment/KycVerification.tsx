
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Upload, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  X, 
  Eye,
  FileText,
  Camera,
  Shield,
  User,
  CreditCard
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const KycVerification = () => {
  const { toast } = useToast();
  
  const [kycData, setKycData] = useState({
    documentType: '',
    documentNumber: '',
    fullName: '',
    dateOfBirth: '',
    address: '',
    phoneNumber: '',
    bankAccountName: '',
    bankAccountNumber: '',
    bankName: '',
    routingNumber: '',
    documentFront: null,
    documentBack: null,
    selfiePhoto: null,
    bankStatement: null
  });

  const [verificationStatus] = useState({
    identity: 'verified',
    address: 'pending',
    phone: 'verified',
    bank: 'rejected',
    selfie: 'pending',
    overall: 'incomplete'
  });

  const [submissionStatus, setSubmissionStatus] = useState('draft'); // draft, submitted, reviewing, approved, rejected

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'rejected':
        return <X className="h-4 w-4 text-red-600" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return <Badge className="bg-green-100 text-green-800">যাচাইকৃত</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">অপেক্ষমান</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800">প্রত্যাখ্যাত</Badge>;
      case 'incomplete':
        return <Badge className="bg-gray-100 text-gray-800">অসম্পূর্ণ</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setKycData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (field: string, file: File | null) => {
    setKycData(prev => ({ ...prev, [field]: file }));
    if (file) {
      toast({
        title: "ফাইল আপলোড সফল",
        description: `${file.name} সফলভাবে আপলোড হয়েছে`,
      });
    }
  };

  const handleSubmitKyc = () => {
    // Validation
    if (!kycData.documentType || !kycData.documentNumber || !kycData.fullName) {
      toast({
        title: "অসম্পূর্ণ তথ্য",
        description: "সকল প্রয়োজনীয় তথ্য পূরণ করুন",
        variant: "destructive"
      });
      return;
    }

    setSubmissionStatus('submitted');
    toast({
      title: "KYC জমা দেওয়া হয়েছে",
      description: "আপনার তথ্য পর্যালোচনার জন্য পাঠানো হয়েছে",
    });
  };

  return (
    <div className="space-y-6">
      {/* KYC Status Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-600" />
            KYC ভেরিফিকেশন স্ট্যাটাস
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-3">
              <h4 className="font-medium">পরিচয় ভেরিফিকেশন</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(verificationStatus.identity)}
                    <span className="text-sm">পরিচয়পত্র</span>
                  </div>
                  {getStatusBadge(verificationStatus.identity)}
                </div>
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(verificationStatus.selfie)}
                    <span className="text-sm">সেলফি ভেরিফিকেশন</span>
                  </div>
                  {getStatusBadge(verificationStatus.selfie)}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium">ব্যক্তিগত তথ্য</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(verificationStatus.address)}
                    <span className="text-sm">ঠিকানা</span>
                  </div>
                  {getStatusBadge(verificationStatus.address)}
                </div>
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(verificationStatus.phone)}
                    <span className="text-sm">ফোন নম্বর</span>
                  </div>
                  {getStatusBadge(verificationStatus.phone)}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium">ব্যাংকিং তথ্য</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(verificationStatus.bank)}
                    <span className="text-sm">ব্যাংক অ্যাকাউন্ট</span>
                  </div>
                  {getStatusBadge(verificationStatus.bank)}
                </div>
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-blue-600" />
                    <span className="text-sm">সামগ্রিক স্ট্যাটাস</span>
                  </div>
                  {getStatusBadge(verificationStatus.overall)}
                </div>
              </div>
            </div>
          </div>

          {verificationStatus.overall !== 'verified' && (
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                <span className="font-medium text-yellow-800">ভেরিফিকেশন অসম্পূর্ণ</span>
              </div>
              <p className="text-sm text-yellow-700">
                আপনার উত্তোলনের সীমা বর্তমানে মাসিক ৫০,০০০ টাকা। সম্পূর্ণ ভেরিফিকেশনের মাধ্যমে অসীমিত উত্তোলন করুন।
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* KYC Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-purple-600" />
              ব্যক্তিগত তথ্য
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="documentType">পরিচয়পত্রের ধরন *</Label>
              <Select value={kycData.documentType} onValueChange={(value) => handleInputChange('documentType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="নির্বাচন করুন" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nid">জাতীয় পরিচয়পত্র</SelectItem>
                  <SelectItem value="passport">পাসপোর্ট</SelectItem>
                  <SelectItem value="driving_license">ড্রাইভিং লাইসেন্স</SelectItem>
                  <SelectItem value="birth_certificate">জন্ম সনদ</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="documentNumber">পরিচয়পত্র নম্বর *</Label>
              <Input
                id="documentNumber"
                placeholder="পরিচয়পত্রের নম্বর লিখুন"
                value={kycData.documentNumber}
                onChange={(e) => handleInputChange('documentNumber', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="fullName">পূর্ণ নাম *</Label>
              <Input
                id="fullName"
                placeholder="আপনার পূর্ণ নাম লিখুন"
                value={kycData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="dateOfBirth">জন্ম তারিখ</Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={kycData.dateOfBirth}
                onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="address">সম্পূর্ণ ঠিকানা</Label>
              <Textarea
                id="address"
                placeholder="আপনার সম্পূর্ণ ঠিকানা লিখুন"
                value={kycData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="phoneNumber">ফোন নম্বর</Label>
              <Input
                id="phoneNumber"
                placeholder="+8801XXXXXXXXX"
                value={kycData.phoneNumber}
                onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Banking Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-green-600" />
              ব্যাংকিং তথ্য
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="bankAccountName">অ্যাকাউন্ট হোল্ডারের নাম</Label>
              <Input
                id="bankAccountName"
                placeholder="যেমন: মোহাম্মদ রহিম"
                value={kycData.bankAccountName}
                onChange={(e) => handleInputChange('bankAccountName', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="bankAccountNumber">ব্যাংক অ্যাকাউন্ট নম্বর</Label>
              <Input
                id="bankAccountNumber"
                placeholder="অ্যাকাউন্ট নম্বর"
                value={kycData.bankAccountNumber}
                onChange={(e) => handleInputChange('bankAccountNumber', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="bankName">ব্যাংকের নাম</Label>
              <Select value={kycData.bankName} onValueChange={(value) => handleInputChange('bankName', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="ব্যাংক নির্বাচন করুন" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sonali">সোনালী ব্যাংক</SelectItem>
                  <SelectItem value="islami">ইসলামী ব্যাংক</SelectItem>
                  <SelectItem value="dutch_bangla">ডাচ বাংলা ব্যাংক</SelectItem>
                  <SelectItem value="brac">ব্র্যাক ব্যাংক</SelectItem>
                  <SelectItem value="city">সিটি ব্যাংক</SelectItem>
                  <SelectItem value="standard_chartered">স্ট্যান্ডার্ড চার্টার্ড</SelectItem>
                  <SelectItem value="eastern">ইস্টার্ন ব্যাংক</SelectItem>
                  <SelectItem value="other">অন্যান্য</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="routingNumber">রাউটিং নম্বর</Label>
              <Input
                id="routingNumber"
                placeholder="রাউটিং নম্বর (যদি থাকে)"
                value={kycData.routingNumber}
                onChange={(e) => handleInputChange('routingNumber', e.target.value)}
              />
            </div>

            {verificationStatus.bank === 'rejected' && (
              <div className="p-3 bg-red-50 border border-red-200 rounded">
                <div className="flex items-center gap-2 mb-1">
                  <X className="h-4 w-4 text-red-600" />
                  <span className="text-sm font-medium text-red-800">ব্যাংক তথ্য প্রত্যাখ্যাত</span>
                </div>
                <p className="text-xs text-red-600">
                  কারণ: অ্যাকাউন্ট নম্বর সঠিক নয়। অনুগ্রহ করে সঠিক তথ্য দিয়ে পুনরায় জমা দিন।
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Document Upload */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-orange-600" />
            ডকুমেন্ট আপলোড
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Document Front */}
            <div className="space-y-2">
              <Label>পরিচয়পত্রের সামনের অংশ *</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-600 mb-2">ছবি আপলোড করুন</p>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload('documentFront', e.target.files?.[0] || null)}
                  className="hidden"
                  id="documentFront"
                />
                <Button size="sm" variant="outline" asChild>
                  <label htmlFor="documentFront" className="cursor-pointer">
                    ফাইল নির্বাচন
                  </label>
                </Button>
              </div>
            </div>

            {/* Document Back */}
            <div className="space-y-2">
              <Label>পরিচয়পত্রের পেছনের অংশ</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-600 mb-2">ছবি আপলোড করুন</p>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload('documentBack', e.target.files?.[0] || null)}
                  className="hidden"
                  id="documentBack"
                />
                <Button size="sm" variant="outline" asChild>
                  <label htmlFor="documentBack" className="cursor-pointer">
                    ফাইল নির্বাচন
                  </label>
                </Button>
              </div>
            </div>

            {/* Selfie Photo */}
            <div className="space-y-2">
              <Label>সেলফি ছবি *</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <Camera className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-600 mb-2">পরিচয়পত্র হাতে নিয়ে সেলফি</p>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload('selfiePhoto', e.target.files?.[0] || null)}
                  className="hidden"
                  id="selfiePhoto"
                />
                <Button size="sm" variant="outline" asChild>
                  <label htmlFor="selfiePhoto" className="cursor-pointer">
                    ছবি তুলুন
                  </label>
                </Button>
              </div>
            </div>

            {/* Bank Statement */}
            <div className="space-y-2">
              <Label>ব্যাংক স্টেটমেন্ট</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <FileText className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-600 mb-2">সাম্প্রতিক স্টেটমেন্ট</p>
                <Input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileUpload('bankStatement', e.target.files?.[0] || null)}
                  className="hidden"
                  id="bankStatement"
                />
                <Button size="sm" variant="outline" asChild>
                  <label htmlFor="bankStatement" className="cursor-pointer">
                    ফাইল নির্বাচন
                  </label>
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-2">গুরুত্বপূর্ণ নির্দেশনা:</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• সকল ছবি স্পষ্ট এবং পাঠযোগ্য হতে হবে</li>
              <li>• ফাইলের সাইজ সর্বোচ্চ ৫ MB হতে পারে</li>
              <li>• JPG, PNG, বা PDF ফরম্যাট গ্রহণযোগ্য</li>
              <li>• সেলফি ছবিতে পরিচয়পত্র স্পষ্টভাবে দেখা যেতে হবে</li>
            </ul>
          </div>

          <div className="mt-6 flex gap-4">
            <Button 
              onClick={handleSubmitKyc}
              disabled={submissionStatus === 'submitted'}
              className="flex-1"
            >
              {submissionStatus === 'submitted' ? 'জমা দেওয়া হয়েছে' : 'KYC জমা দিন'}
            </Button>
            <Button variant="outline">
              <Eye className="h-4 w-4 mr-2" />
              প্রিভিউ
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default KycVerification;
