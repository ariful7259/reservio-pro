
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Upload, 
  Download, 
  FileSpreadsheet, 
  FileText,
  CheckCircle2,
  AlertCircle,
  Info,
  FileImage,
  Package
} from 'lucide-react';

const ProductImportExport = () => {
  const { toast } = useToast();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // ফাইল ভ্যালিডেশন
    const allowedTypes = [
      'text/csv',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ];

    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "ভুল ফাইল ফরম্যাট",
        description: "শুধুমাত্র CSV, XLS বা XLSX ফাইল আপলোড করুন।",
        variant: "destructive"
      });
      return;
    }

    setUploadedFile(file);
    setIsUploading(true);
    setUploadProgress(0);

    // প্রোগ্রেস সিমুলেশন
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          toast({
            title: "আপলোড সম্পন্ন",
            description: `${file.name} সফলভাবে আপলোড হয়েছে।`,
          });
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleImportProducts = () => {
    if (!uploadedFile) {
      toast({
        title: "কোন ফাইল নেই",
        description: "প্রথমে একটি ফাইল আপলোড করুন।",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "ইমপোর্ট শুরু",
      description: "পণ্যগুলো ইমপোর্ট করা হচ্ছে...",
    });

    // ইমপোর্ট প্রসেস সিমুলেশন
    setTimeout(() => {
      toast({
        title: "ইমপোর্ট সম্পন্ন",
        description: "১২৫টি পণ্য সফলভাবে ইমপোর্ট হয়েছে।",
      });
    }, 3000);
  };

  const handleExportProducts = (format: 'csv' | 'excel') => {
    toast({
      title: "এক্সপোর্ট শুরু",
      description: `${format.toUpperCase()} ফরম্যাটে পণ্য এক্সপোর্ট হচ্ছে...`,
    });

    // এক্সপোর্ট সিমুলেশন
    setTimeout(() => {
      const fileName = `products_${new Date().toISOString().split('T')[0]}.${format === 'csv' ? 'csv' : 'xlsx'}`;
      toast({
        title: "এক্সপোর্ট সম্পন্ন",
        description: `${fileName} ডাউনলোড শুরু হয়েছে।`,
      });
    }, 2000);
  };

  const downloadTemplate = (format: 'csv' | 'excel') => {
    const fileName = `product_template.${format === 'csv' ? 'csv' : 'xlsx'}`;
    toast({
      title: "টেমপ্লেট ডাউনলোড",
      description: `${fileName} ডাউনলোড শুরু হয়েছে।`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Package className="h-6 w-6 text-primary" />
            পণ্য ইমপোর্ট/এক্সপোর্ট
          </h2>
          <p className="text-muted-foreground">
            CSV বা Excel ফাইল ব্যবহার করে পণ্য ইমপোর্ট/এক্সপোর্ট করুন
          </p>
        </div>
      </div>

      <Tabs defaultValue="import" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="import">
            <Upload className="h-4 w-4 mr-2" />
            ইমপোর্ট
          </TabsTrigger>
          <TabsTrigger value="export">
            <Download className="h-4 w-4 mr-2" />
            এক্সপোর্ট
          </TabsTrigger>
        </TabsList>

        <TabsContent value="import" className="space-y-6">
          {/* টেমপ্লেট ডাউনলোড */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                টেমপ্লেট ডাউনলোড
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="font-medium text-blue-800">ইমপোর্ট করার আগে</h4>
                    <p className="text-sm text-blue-700 mt-1">
                      প্রথমে টেমপ্লেট ডাউনলোড করুন এবং সেই ফরম্যাট অনুসরণ করে আপনার পণ্যের তথ্য পূরণ করুন।
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => downloadTemplate('csv')}
                  className="flex-1"
                >
                  <FileSpreadsheet className="h-4 w-4 mr-2" />
                  CSV টেমপ্লেট
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => downloadTemplate('excel')}
                  className="flex-1"
                >
                  <FileSpreadsheet className="h-4 w-4 mr-2" />
                  Excel টেমপ্লেট
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* ফাইল আপলোড */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                ফাইল আপলোড
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                <FileSpreadsheet className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="font-medium mb-2">পণ্যের ফাইল আপলোড করুন</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  CSV, XLS বা XLSX ফাইল সাপোর্ট করে (সর্বোচ্চ ১০ MB)
                </p>
                <Input
                  type="file"
                  accept=".csv,.xls,.xlsx"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload">
                  <Button variant="outline" className="cursor-pointer">
                    ফাইল সিলেক্ট করুন
                  </Button>
                </label>
              </div>

              {/* আপলোড প্রোগ্রেস */}
              {isUploading && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>আপলোড হচ্ছে...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} className="w-full" />
                </div>
              )}

              {/* আপলোডেড ফাইল তথ্য */}
              {uploadedFile && !isUploading && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <div className="flex-grow">
                      <p className="font-medium text-green-800">{uploadedFile.name}</p>
                      <p className="text-sm text-green-700">
                        সাইজ: {(uploadedFile.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* ইমপোর্ট বাটন */}
              <Button 
                onClick={handleImportProducts}
                disabled={!uploadedFile || isUploading}
                className="w-full"
              >
                <Upload className="h-4 w-4 mr-2" />
                পণ্য ইমপোর্ট করুন
              </Button>
            </CardContent>
          </Card>

          {/* ইমপোর্ট গাইডলাইন */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                গুরুত্বপূর্ণ নির্দেশনা
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0"></span>
                  <span>প্রতিটি পণ্যের জন্য নাম, মূল্য এবং ক্যাটাগরি বাধ্যতামূলক</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0"></span>
                  <span>ছবির URL সঠিক এবং অ্যাক্সেসিবল হতে হবে</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0"></span>
                  <span>মূল্য সংখ্যায় লিখুন (টাকার চিহ্ন ছাড়া)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0"></span>
                  <span>স্টক সংখ্যা পূর্ণসংখ্যায় দিন</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="export" className="space-y-6">
          {/* এক্সপোর্ট অপশন */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5" />
                পণ্য এক্সপোর্ট
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                আপনার সব পণ্যের তথ্য CSV বা Excel ফরম্যাটে ডাউনলোড করুন। 
                এটি ব্যাকআপ বা অন্য প্ল্যাটফর্মে স্থানান্তরের জন্য উপযোগী।
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <FileSpreadsheet className="h-8 w-8 mx-auto text-green-600 mb-3" />
                    <h4 className="font-medium mb-2">CSV ফরম্যাট</h4>
                    <p className="text-xs text-muted-foreground mb-3">
                      সাধারণ স্প্রেডশিট ব্যবহারের জন্য
                    </p>
                    <Button 
                      onClick={() => handleExportProducts('csv')}
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                    >
                      CSV ডাউনলোড
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 text-center">
                    <FileSpreadsheet className="h-8 w-8 mx-auto text-blue-600 mb-3" />
                    <h4 className="font-medium mb-2">Excel ফরম্যাট</h4>
                    <p className="text-xs text-muted-foreground mb-3">
                      এডভান্সড ফিচার ও ফরম্যাটিং সহ
                    </p>
                    <Button 
                      onClick={() => handleExportProducts('excel')}
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                    >
                      Excel ডাউনলোড
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* এক্সপোর্ট পরিসংখ্যান */}
          <Card>
            <CardHeader>
              <CardTitle>এক্সপোর্ট তথ্য</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div className="bg-muted rounded-lg p-3">
                  <div className="text-2xl font-bold text-primary">১২৫</div>
                  <div className="text-xs text-muted-foreground">মোট পণ্য</div>
                </div>
                <div className="bg-muted rounded-lg p-3">
                  <div className="text-2xl font-bold text-green-600">৯৮</div>
                  <div className="text-xs text-muted-foreground">সক্রিয় পণ্য</div>
                </div>
                <div className="bg-muted rounded-lg p-3">
                  <div className="text-2xl font-bold text-orange-600">২৭</div>
                  <div className="text-xs text-muted-foreground">স্টক আউট</div>
                </div>
                <div className="bg-muted rounded-lg p-3">
                  <div className="text-2xl font-bold text-blue-600">১৫</div>
                  <div className="text-xs text-muted-foreground">ক্যাটাগরি</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductImportExport;
