
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { format } from "date-fns";
import { ArrowLeft, Camera, Check, FileCheck, Info, Timer, Upload } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';

interface RentalReturnSystemProps {
  rentalId: string;
  itemName: string;
  rentalStartDate: Date;
  rentalEndDate: Date;
  depositAmount: number;
}

const RentalReturnSystem: React.FC<RentalReturnSystemProps> = ({
  rentalId,
  itemName,
  rentalStartDate,
  rentalEndDate,
  depositAmount
}) => {
  const { toast } = useToast();
  const [returnStatus, setReturnStatus] = useState<'preparing' | 'uploading' | 'completed' | 'inspecting'>('preparing');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [damageReported, setDamageReported] = useState(false);
  const [damageDescription, setDamageDescription] = useState('');
  const [returnReviewDialogOpen, setReturnReviewDialogOpen] = useState(false);
  const [checklist, setChecklist] = useState({
    itemComplete: false,
    itemClean: false,
    itemFunctional: false,
  });

  const handleImageUpload = () => {
    // Simulate image upload
    setReturnStatus('uploading');
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setReturnStatus('completed');
          // Simulate uploaded images (in a real app these would be actual uploaded files)
          setUploadedImages([
            'https://images.unsplash.com/photo-1577495508048-b635879837f1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80',
            'https://images.unsplash.com/photo-1576158113860-fb8a469b496e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80',
          ]);
          return 100;
        }
        return prev + 25;
      });
    }, 500);
  };

  const handleReturnSubmit = () => {
    setReturnReviewDialogOpen(true);
  };

  const finalizeReturn = () => {
    // In a real app, this would submit to an API
    toast({
      title: "রেন্টাল রিটার্ন সফল!",
      description: `${itemName} সফলভাবে ফেরত দেওয়া হয়েছে। আপনার ডিপোজিট ${damageReported ? 'আংশিক' : 'সম্পূর্ণ'} ফেরত দেওয়া হবে।`,
      variant: "default"
    });
    
    setReturnStatus('inspecting');
    setReturnReviewDialogOpen(false);
    
    // Simulate inspection completion
    setTimeout(() => {
      toast({
        title: "ডিপোজিট ফেরত প্রসেস শুরু হয়েছে",
        description: `আপনার ডিপোজিট ৳${damageReported ? depositAmount/2 : depositAmount} টাকা ৩-৫ কার্যদিবসের মধ্যে ফেরত দেওয়া হবে।`,
        variant: "default"
      });
    }, 3000);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>রেন্টাল আইটেম ফেরত</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-muted p-4 rounded-md">
          <h3 className="font-medium mb-2">{itemName}</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <p className="text-muted-foreground">রেন্টাল আইডি</p>
              <p className="font-medium">{rentalId}</p>
            </div>
            <div>
              <p className="text-muted-foreground">ডিপোজিট</p>
              <p className="font-medium">৳{depositAmount.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-muted-foreground">শুরুর তারিখ</p>
              <p className="font-medium">{format(rentalStartDate, "dd/MM/yyyy")}</p>
            </div>
            <div>
              <p className="text-muted-foreground">শেষের তারিখ</p>
              <p className="font-medium">{format(rentalEndDate, "dd/MM/yyyy")}</p>
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="font-medium">রিটার্ন চেকলিস্ট</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="itemComplete" 
                checked={checklist.itemComplete} 
                onCheckedChange={(checked) => 
                  setChecklist({...checklist, itemComplete: checked === true})
                }
              />
              <Label htmlFor="itemComplete">সমস্ত অংশ/সামগ্রী সম্পূর্ণ</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="itemClean" 
                checked={checklist.itemClean} 
                onCheckedChange={(checked) => 
                  setChecklist({...checklist, itemClean: checked === true})
                }
              />
              <Label htmlFor="itemClean">আইটেম পরিষ্কার</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="itemFunctional" 
                checked={checklist.itemFunctional} 
                onCheckedChange={(checked) => 
                  setChecklist({...checklist, itemFunctional: checked === true})
                }
              />
              <Label htmlFor="itemFunctional">আইটেম সঠিকভাবে কাজ করে</Label>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium">আইটেমের অবস্থার ছবি আপলোড করুন</h3>
          <div className="p-4 border-2 border-dashed rounded-md text-center">
            {returnStatus === 'preparing' ? (
              <div className="space-y-2">
                <Camera className="h-8 w-8 mx-auto text-muted-foreground" />
                <p className="text-sm text-muted-foreground">আইটেমের সামনে, পিছনে এবং যেকোন ক্ষতির ছবি তুলুন</p>
                <Button onClick={handleImageUpload} className="mt-2">
                  <Upload className="h-4 w-4 mr-2" /> ছবি আপলোড করুন
                </Button>
              </div>
            ) : returnStatus === 'uploading' ? (
              <div className="space-y-2">
                <p className="text-sm">আপলোড করা হচ্ছে...</p>
                <Progress value={uploadProgress} className="h-2 w-full" />
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-2">
                {uploadedImages.map((img, i) => (
                  <div key={i} className="relative aspect-square rounded-md overflow-hidden">
                    <img src={img} alt={`Uploaded ${i+1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
                <div className="aspect-square border flex items-center justify-center rounded-md cursor-pointer">
                  <Camera className="h-6 w-6 text-muted-foreground" />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="reportDamage" 
              checked={damageReported} 
              onCheckedChange={(checked) => setDamageReported(checked === true)}
            />
            <Label htmlFor="reportDamage">ক্ষতি/সমস্যা রিপোর্ট করুন</Label>
          </div>
          
          {damageReported && (
            <div className="space-y-2">
              <Label htmlFor="damageDescription">ক্ষতির বিবরণ</Label>
              <Textarea 
                id="damageDescription" 
                placeholder="ক্ষতি বা সমস্যার বিস্তারিত বিবরণ দিন..." 
                value={damageDescription}
                onChange={(e) => setDamageDescription(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                <Info className="h-3 w-3 inline mr-1" />
                ক্ষতির ধরনের উপর নির্ভর করে আপনার ডিপোজিট থেকে কাটা হতে পারে।
              </p>
            </div>
          )}
        </div>

        <Dialog open={returnReviewDialogOpen} onOpenChange={setReturnReviewDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>রিটার্ন নিশ্চিত করুন</DialogTitle>
              <DialogDescription>
                নিম্নলিখিত তথ্য অনুসারে আপনি এই রেন্টাল আইটেম ফেরত দিতে চান?
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="bg-muted p-3 rounded-md">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-muted-foreground">আইটেম</p>
                    <p className="font-medium">{itemName}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">আইডি</p>
                    <p className="font-medium">{rentalId}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium">চেকলিস্ট স্ট্যাটাস:</p>
                <div className="flex items-center space-x-2">
                  <div className={`h-4 w-4 rounded-full ${checklist.itemComplete ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className="text-sm">সমস্ত অংশ সম্পূর্ণ</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`h-4 w-4 rounded-full ${checklist.itemClean ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className="text-sm">আইটেম পরিষ্কার</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`h-4 w-4 rounded-full ${checklist.itemFunctional ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className="text-sm">আইটেম সঠিকভাবে কাজ করে</span>
                </div>
              </div>
              
              {damageReported && (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-amber-600">ক্ষতি রিপোর্ট করা হয়েছে:</p>
                  <p className="text-sm bg-amber-50 p-2 rounded">{damageDescription}</p>
                </div>
              )}
              
              <div className="space-y-2">
                <p className="text-sm font-medium">প্রত্যাশিত ডিপোজিট ফেরত:</p>
                <p className="text-xl font-bold">৳{damageReported ? depositAmount/2 : depositAmount}</p>
                {damageReported && (
                  <p className="text-xs text-muted-foreground">
                    * ক্ষতির কারণে আপনার ডিপোজিট থেকে ৳{depositAmount/2} কাটা হয়েছে
                  </p>
                )}
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setReturnReviewDialogOpen(false)}>
                <ArrowLeft className="h-4 w-4 mr-2" /> ফিরে যান
              </Button>
              <Button onClick={finalizeReturn}>
                <Check className="h-4 w-4 mr-2" /> রিটার্ন নিশ্চিত করুন
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
      <CardFooter>
        {returnStatus !== 'inspecting' ? (
          <Button 
            className="w-full"
            onClick={handleReturnSubmit}
            disabled={
              returnStatus !== 'completed' || 
              (!checklist.itemComplete && !checklist.itemClean && !checklist.itemFunctional)
            }
          >
            <FileCheck className="h-4 w-4 mr-2" /> রিটার্ন সম্পন্ন করুন
          </Button>
        ) : (
          <div className="w-full text-center p-4 bg-amber-50 rounded-md">
            <Timer className="h-6 w-6 mx-auto text-amber-600 mb-2" />
            <p className="font-medium">রিটার্ন ইনস্পেকশন চলছে</p>
            <p className="text-sm text-muted-foreground mt-1">
              আমরা আপনার আইটেম পরীক্ষা করছি, এটি সম্পন্ন হতে ৪৮ ঘন্টা সময় লাগতে পারে
            </p>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default RentalReturnSystem;
