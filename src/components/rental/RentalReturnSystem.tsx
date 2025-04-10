
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { Check, X, AlertTriangle, Clock, ArrowLeft, Info, Camera } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface RentalReturnSystemProps {
  rentalId: string;
  itemName: string;
  startDate: Date;
  endDate: Date;
  depositAmount: number;
  onReturnComplete?: (returnData: ReturnData) => void;
}

export interface ReturnData {
  rentalId: string;
  returnDate: Date;
  condition: 'good' | 'damaged' | 'missing';
  notes: string;
  refundAmount: number;
}

const RentalReturnSystem: React.FC<RentalReturnSystemProps> = ({
  rentalId,
  itemName,
  startDate,
  endDate,
  depositAmount,
  onReturnComplete
}) => {
  const { toast } = useToast();
  const [step, setStep] = useState<'condition' | 'confirmation'>('condition');
  const [condition, setCondition] = useState<'good' | 'damaged' | 'missing'>('good');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  const today = new Date();
  const isLate = today > endDate;
  const daysLate = isLate ? Math.floor((today.getTime() - endDate.getTime()) / (1000 * 60 * 60 * 24)) : 0;
  
  // Calculate late fee (10% of deposit per day late, max 100% of deposit)
  const lateFee = Math.min(depositAmount * 0.1 * daysLate, depositAmount);
  
  // Calculate damage deduction (50% for damaged, 100% for missing)
  const damageDeduction = condition === 'good' ? 0 : condition === 'damaged' ? depositAmount * 0.5 : depositAmount;
  
  // Calculate refund amount
  const refundAmount = depositAmount - lateFee - damageDeduction;

  const handleContinue = () => {
    setStep('confirmation');
  };

  const handleReturn = () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const returnData: ReturnData = {
        rentalId,
        returnDate: new Date(),
        condition,
        notes,
        refundAmount
      };
      
      toast({
        title: "প্রোডাক্ট রিটার্ন সম্পন্ন হয়েছে",
        description: `${itemName} সফলভাবে রিটার্ন করা হয়েছে।`,
      });
      
      if (onReturnComplete) {
        onReturnComplete(returnData);
      }
      
      setLoading(false);
    }, 1500);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          {step === 'condition' ? "প্রোডাক্ট রিটার্ন" : "রিটার্ন কনফার্মেশন"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {step === 'condition' ? (
          <>
            <div className="mb-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">রেন্টাল আইডি:</span>
                <Badge variant="outline">{rentalId}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">প্রোডাক্ট:</span>
                <span>{itemName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">গ্রহণের তারিখ:</span>
                <span>{startDate.toLocaleDateString('bn-BD')}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">রিটার্নের তারিখ:</span>
                <span className={isLate ? 'text-red-500 font-semibold' : ''}>
                  {endDate.toLocaleDateString('bn-BD')}
                </span>
              </div>
              
              {isLate && (
                <div className="flex items-center gap-2 bg-red-50 p-2 rounded-md text-red-700 text-sm">
                  <AlertTriangle className="h-4 w-4" />
                  <span>রিটার্ন লেট! {daysLate} দিন বিলম্বিত</span>
                </div>
              )}
              
              <Separator className="my-2" />
              
              <div className="space-y-4 mt-4">
                <div>
                  <Label className="text-base">প্রোডাক্টের অবস্থা</Label>
                  <RadioGroup 
                    value={condition} 
                    onValueChange={(value) => setCondition(value as 'good' | 'damaged' | 'missing')}
                    className="mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="good" id="good" />
                      <Label htmlFor="good" className="font-normal">ভালো অবস্থায় (সম্পূর্ণ ডিপোজিট ফেরত)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="damaged" id="damaged" />
                      <Label htmlFor="damaged" className="font-normal">ক্ষতিগ্রস্ত (আংশিক ডিপোজিট ফেরত)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="missing" id="missing" />
                      <Label htmlFor="missing" className="font-normal">হারিয়েছে (কোন ডিপোজিট ফেরত নয়)</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div>
                  <Label htmlFor="notes">নোট (ঐচ্ছিক)</Label>
                  <Textarea
                    id="notes"
                    placeholder="প্রোডাক্টের অবস্থা সম্পর্কে কিছু লিখুন"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="mt-1"
                  />
                </div>
                
                <div className="flex justify-between mt-2">
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-2"
                    type="button"
                  >
                    <Camera className="h-4 w-4" />
                    <span>ছবি যোগ করুন</span>
                  </Button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="space-y-4">
            <div className="bg-secondary/20 p-3 rounded-md space-y-2 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">ডিপোজিট পরিমাণ:</span>
                <span className="font-medium">৳{depositAmount}</span>
              </div>
              
              {isLate && (
                <div className="flex items-center justify-between text-red-600">
                  <span className="text-sm">লেট ফি ({daysLate} দিন):</span>
                  <span className="font-medium">- ৳{lateFee}</span>
                </div>
              )}
              
              {condition !== 'good' && (
                <div className="flex items-center justify-between text-red-600">
                  <span className="text-sm">{condition === 'damaged' ? 'ক্ষতিগ্রস্ত' : 'হারিয়েছে'} বাবদ কর্তন:</span>
                  <span className="font-medium">- ৳{damageDeduction}</span>
                </div>
              )}
              
              <Separator />
              
              <div className="flex items-center justify-between font-bold">
                <span>ফেরত যোগ্য:</span>
                <span className={refundAmount <= 0 ? 'text-red-600' : 'text-green-600'}>
                  ৳{refundAmount > 0 ? refundAmount : 0}
                </span>
              </div>
            </div>
            
            <div className="rounded-md border p-3 space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Info className="h-4 w-4" />
                <span>রিটার্ন সংক্রান্ত তথ্য</span>
              </div>
              
              <div className="text-sm space-y-1 pl-6">
                <p>অবস্থা: {
                  condition === 'good' ? 'ভালো অবস্থায়' : 
                  condition === 'damaged' ? 'ক্ষতিগ্রস্ত' : 'হারিয়েছে'
                }</p>
                {notes && <p>নোট: {notes}</p>}
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {step === 'confirmation' ? (
          <>
            <Button variant="outline" onClick={() => setStep('condition')}>
              <ArrowLeft className="mr-2 h-4 w-4" /> ফিরে যান
            </Button>
            <Button 
              onClick={handleReturn}
              disabled={loading}
            >
              {loading ? 'প্রসেসিং...' : (
                <>
                  <Check className="mr-2 h-4 w-4" /> কনফার্ম করুন
                </>
              )}
            </Button>
          </>
        ) : (
          <Button onClick={handleContinue} className="w-full">
            এগিয়ে যান
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default RentalReturnSystem;
