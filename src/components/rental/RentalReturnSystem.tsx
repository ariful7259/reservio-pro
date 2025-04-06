
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { 
  CheckCircle2, 
  Package, 
  AlertTriangle, 
  Camera, 
  Clock, 
  Calendar, 
  RefreshCw,
  User,
  CreditCard
} from 'lucide-react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Switch } from "@/components/ui/switch";

interface RentalItem {
  id: string;
  name: string;
  image: string;
  rentedAt: Date;
  returnByDate: Date;
  deposit: number;
  condition: string;
  status: 'rented' | 'returned' | 'pending';
}

const RentalReturnSystem = () => {
  const { toast } = useToast();
  
  // Demo data - in a real app this would come from your backend
  const [rentalItems, setRentalItems] = useState<RentalItem[]>([
    {
      id: '1',
      name: 'ক্যানন DSLR ক্যামেরা',
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=400',
      rentedAt: new Date(2025, 3, 1),
      returnByDate: new Date(2025, 3, 15),
      deposit: 5000,
      condition: 'নতুন',
      status: 'rented'
    },
    {
      id: '2',
      name: 'আইফোন ১৩ প্রো',
      image: 'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?q=80&w=400',
      rentedAt: new Date(2025, 3, 5),
      returnByDate: new Date(2025, 3, 12),
      deposit: 10000,
      condition: 'ভালো',
      status: 'rented'
    },
    {
      id: '3',
      name: 'বুস স্পিকার',
      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=400',
      rentedAt: new Date(2025, 2, 20),
      returnByDate: new Date(2025, 3, 20),
      deposit: 2000,
      condition: 'ব্যবহৃত',
      status: 'returned'
    },
  ]);
  
  const [selectedItem, setSelectedItem] = useState<string>('');
  const [condition, setCondition] = useState<string>('good');
  const [notes, setNotes] = useState<string>('');
  const [hasLateCharge, setHasLateCharge] = useState<boolean>(false);
  const [damageFee, setDamageFee] = useState<string>('0');
  
  const handleReturnItem = () => {
    if (!selectedItem) {
      toast({
        title: "আইটেম নির্বাচন করুন",
        description: "রিটার্ন করার জন্য একটি আইটেম নির্বাচন করুন",
        variant: "destructive",
      });
      return;
    }
    
    // Update the rental item status
    const updatedItems = rentalItems.map(item => {
      if (item.id === selectedItem) {
        return {
          ...item,
          status: 'returned' as const
        };
      }
      return item;
    });
    
    setRentalItems(updatedItems);
    
    // Calculate total deposit refund
    const item = rentalItems.find(item => item.id === selectedItem);
    const deposit = item?.deposit || 0;
    const damageDeduction = parseInt(damageFee) || 0;
    const lateChargeFee = hasLateCharge ? 500 : 0; // Example late charge
    const refundAmount = deposit - damageDeduction - lateChargeFee;
    
    // Show success message
    toast({
      title: "আইটেম রিটার্ন সম্পন্ন হয়েছে",
      description: `ডিপোজিট ফেরত: ৳${refundAmount}`,
      variant: "default",
    });
    
    // Reset form
    setSelectedItem('');
    setCondition('good');
    setNotes('');
    setHasLateCharge(false);
    setDamageFee('0');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/2">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">রেন্টাল রিটার্ন ফরম</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="item-select">আইটেম নির্বাচন করুন</Label>
                <Select value={selectedItem} onValueChange={setSelectedItem}>
                  <SelectTrigger>
                    <SelectValue placeholder="রিটার্ন আইটেম সিলেক্ট করুন" />
                  </SelectTrigger>
                  <SelectContent>
                    {rentalItems
                      .filter(item => item.status === 'rented')
                      .map(item => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.name}
                        </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {selectedItem && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="condition">আইটেমের অবস্থা</Label>
                    <Select value={condition} onValueChange={setCondition}>
                      <SelectTrigger>
                        <SelectValue placeholder="অবস্থা সিলেক্ট করুন" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="perfect">পারফেক্ট - কোন ক্ষতি নেই</SelectItem>
                        <SelectItem value="good">ভালো - সামান্য ব্যবহারের চিহ্ন</SelectItem>
                        <SelectItem value="fair">মোটামুটি - হালকা ক্ষতি</SelectItem>
                        <SelectItem value="damaged">ক্ষতিগ্রস্ত - উল্লেখযোগ্য সমস্যা আছে</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="damage-fee">ক্ষতির জন্য ফি (৳)</Label>
                      <span className="text-xs text-muted-foreground">ডিপোজিট থেকে কেটে নেওয়া হবে</span>
                    </div>
                    <Input
                      id="damage-fee"
                      type="number"
                      min="0"
                      placeholder="0"
                      value={damageFee}
                      onChange={(e) => setDamageFee(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="late-return" 
                      checked={hasLateCharge}
                      onCheckedChange={setHasLateCharge}
                    />
                    <Label htmlFor="late-return" className="cursor-pointer">বিলম্বিত রিটার্নের জন্য অতিরিক্ত চার্জ (৳৫০০)</Label>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="notes">নোটস</Label>
                    <Textarea 
                      id="notes" 
                      placeholder="আইটেম সম্পর্কে অতিরিক্ত তথ্য লিখুন"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <Button variant="outline" className="w-auto">
                      <Camera className="mr-2 h-4 w-4" />
                      ছবি তোলুন
                    </Button>
                    <Button variant="outline" className="w-auto">
                      <AlertTriangle className="mr-2 h-4 w-4" />
                      সমস্যা রিপোর্ট
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleReturnItem} 
                disabled={!selectedItem}
                className="w-full"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                রিটার্ন সম্পন্ন করুন
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div className="md:w-1/2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-center">আমার রেন্টাল আইটেমসমূহ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {rentalItems.map((item) => (
                <div 
                  key={item.id} 
                  className="flex gap-4 p-3 border rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <div className="h-24 w-24 overflow-hidden rounded-md">
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-medium">{item.name}</h3>
                      <Badge variant={item.status === 'returned' ? 'secondary' : 'default'}>
                        {item.status === 'rented' ? 'ভাড়া নেওয়া' : 'ফেরত দেওয়া'}
                      </Badge>
                    </div>
                    
                    <div className="mt-1 text-sm space-y-1">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>নেওয়া: {item.rentedAt.toLocaleDateString()}</span>
                      </div>
                      
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="h-3.5 w-3.5" />
                        <span>ফেরত: {item.returnByDate.toLocaleDateString()}</span>
                      </div>
                      
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <CreditCard className="h-3.5 w-3.5" />
                        <span>ডিপোজিট: ৳{item.deposit}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {rentalItems.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  কোন রেন্টাল আইটেম নেই
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RentalReturnSystem;
