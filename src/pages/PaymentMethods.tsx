
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  CreditCard, 
  Smartphone, 
  Check, 
  Plus,
  Trash2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PaymentMethod {
  id: string;
  type: 'card' | 'mobile_banking' | 'bank';
  name: string;
  details: {
    number?: string;
    provider?: string;
    bank?: string;
    accountNumber?: string;
    expiryDate?: string;
    accountName?: string;
  };
  isDefault: boolean;
}

const PaymentMethods = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>('all');
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [newMethodType, setNewMethodType] = useState<'card' | 'mobile_banking' | 'bank'>('card');
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  
  // এটি ডেমো ডাটা; আসল অ্যাপে এটি API থেকে লোড হবে
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: '1',
      type: 'card',
      name: 'ভিসা কার্ড',
      details: {
        number: '•••• •••• •••• 4242',
        expiryDate: '12/25',
      },
      isDefault: true
    },
    {
      id: '2',
      type: 'mobile_banking',
      name: 'বিকাশ',
      details: {
        provider: 'বিকাশ',
        number: '017••••••89',
      },
      isDefault: false
    },
    {
      id: '3',
      type: 'bank',
      name: 'সোনালী ব্যাংক',
      details: {
        bank: 'সোনালী ব্যাংক',
        accountNumber: '10062••••••',
        accountName: 'আব্দুল করিম',
      },
      isDefault: false
    }
  ]);

  const [newMethod, setNewMethod] = useState<Partial<PaymentMethod>>({
    type: 'card',
    details: {}
  });

  const handleAddNewMethod = () => {
    // সত্যিকারের অ্যাপে, এখানে API কল করে সার্ভারে সেভ করতে হবে
    const newId = (Math.random() * 10000).toFixed(0);
    let newName = '';
    
    if (newMethod.type === 'card') {
      newName = `${newMethod.details?.number?.slice(-4) || '####'} কার্ড`;
    } else if (newMethod.type === 'mobile_banking') {
      newName = newMethod.details?.provider || 'মোবাইল ব্যাংকিং';
    } else {
      newName = newMethod.details?.bank || 'ব্যাংক অ্যাকাউন্ট';
    }
    
    const createdMethod: PaymentMethod = {
      id: newId,
      type: newMethod.type || 'card',
      name: newName,
      details: { ...newMethod.details! },
      isDefault: false
    };
    
    setPaymentMethods([...paymentMethods, createdMethod]);
    setNewMethod({ type: 'card', details: {} });
    setOpenAddDialog(false);
    
    toast({
      title: "পেমেন্ট মেথড যোগ করা হয়েছে",
      description: `${newName} সফলভাবে যোগ করা হয়েছে।`,
    });
  };

  const setDefaultMethod = (id: string) => {
    setPaymentMethods(
      paymentMethods.map(method => ({
        ...method,
        isDefault: method.id === id
      }))
    );
    
    const method = paymentMethods.find(m => m.id === id);
    toast({
      title: "ডিফল্ট পেমেন্ট মেথড আপডেট হয়েছে",
      description: `${method?.name} ডিফল্ট পেমেন্ট মেথড হিসেবে সেট করা হয়েছে।`,
    });
  };

  const deleteMethod = (id: string) => {
    setPaymentMethods(paymentMethods.filter(method => method.id !== id));
    setConfirmDelete(null);
    
    toast({
      title: "পেমেন্ট মেথড মুছে ফেলা হয়েছে",
      description: "পেমেন্ট মেথড সফলভাবে মুছে ফেলা হয়েছে।",
    });
  };

  const renderMethodCard = (method: PaymentMethod) => {
    return (
      <Card key={method.id} className={`mb-4 relative overflow-hidden ${method.isDefault ? 'border-primary/50' : ''}`}>
        {method.isDefault && (
          <div className="absolute top-0 right-0 bg-primary text-white text-xs px-2 py-1 rounded-bl">
            ডিফল্ট
          </div>
        )}
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              {method.type === 'card' && <CreditCard className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-full" />}
              {method.type === 'mobile_banking' && <Smartphone className="h-10 w-10 text-green-600 p-2 bg-green-50 rounded-full" />}
              {method.type === 'bank' && <CreditCard className="h-10 w-10 text-blue-600 p-2 bg-blue-50 rounded-full" />}
              
              <div>
                <h3 className="font-medium">{method.name}</h3>
                {method.type === 'card' && (
                  <p className="text-sm text-muted-foreground">{method.details.number} • মেয়াদ: {method.details.expiryDate}</p>
                )}
                {method.type === 'mobile_banking' && (
                  <p className="text-sm text-muted-foreground">{method.details.provider} • {method.details.number}</p>
                )}
                {method.type === 'bank' && (
                  <p className="text-sm text-muted-foreground">{method.details.bank} • {method.details.accountNumber}</p>
                )}
              </div>
            </div>
            
            <div className="flex gap-2">
              {!method.isDefault && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setDefaultMethod(method.id)}
                >
                  ডিফল্ট করুন
                </Button>
              )}
              
              <Button 
                variant="ghost" 
                size="icon"
                className="text-red-500 hover:text-red-600 hover:bg-red-50"
                onClick={() => setConfirmDelete(method.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const filteredMethods = activeTab === 'all' 
    ? paymentMethods
    : paymentMethods.filter(method => method.type === activeTab);

  return (
    <div className="container px-4 py-20">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-2xl font-bold">পেমেন্ট মেথড</h1>
        </div>
        <p className="text-muted-foreground">আপনার সকল পেমেন্ট মেথড এখানে ম্যানেজ করুন</p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">সকল</TabsTrigger>
            <TabsTrigger value="card">কার্ড</TabsTrigger>
            <TabsTrigger value="mobile_banking">মোবাইল ব্যাংকিং</TabsTrigger>
            <TabsTrigger value="bank">ব্যাংক</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <Button onClick={() => setOpenAddDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          নতুন যোগ করুন
        </Button>
      </div>

      <div className="space-y-4">
        <TabsContent value={activeTab}>
          {filteredMethods.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6">
                <CreditCard className="h-12 w-12 text-muted-foreground mb-3" />
                <h3 className="text-lg font-medium mb-1">কোন পেমেন্ট মেথড নেই</h3>
                <p className="text-muted-foreground mb-4 text-center">
                  আপনি এখনো কোন পেমেন্ট মেথড যোগ করেননি। নতুন পেমেন্ট মেথড যোগ করতে উপরের বাটন ক্লিক করুন।
                </p>
                <Button onClick={() => setOpenAddDialog(true)}>
                  পেমেন্ট মেথড যোগ করুন
                </Button>
              </CardContent>
            </Card>
          ) : (
            filteredMethods.map(method => renderMethodCard(method))
          )}
        </TabsContent>
      </div>

      {/* নতুন পেমেন্ট মেথড যোগ করার ডায়ালগ */}
      <Dialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>নতুন পেমেন্ট মেথড যোগ করুন</DialogTitle>
            <DialogDescription>
              আপনার পছন্দের পেমেন্ট মেথড সিলেক্ট করে প্রয়োজনীয় তথ্য দিন।
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>পেমেন্ট মেথড টাইপ</Label>
              <Select 
                value={newMethod.type} 
                onValueChange={(value: 'card' | 'mobile_banking' | 'bank') => {
                  setNewMethod({...newMethod, type: value, details: {}});
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="পেমেন্ট মেথড টাইপ সিলেক্ট করুন" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="card">কার্ড</SelectItem>
                  <SelectItem value="mobile_banking">মোবাইল ব্যাংকিং</SelectItem>
                  <SelectItem value="bank">ব্যাংক</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {newMethod.type === 'card' && (
              <>
                <div className="grid gap-2">
                  <Label>কার্ড নম্বর</Label>
                  <Input 
                    placeholder="1234 5678 9012 3456" 
                    onChange={(e) => setNewMethod({
                      ...newMethod, 
                      details: {...newMethod.details, number: e.target.value}
                    })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label>মেয়াদ (MM/YY)</Label>
                  <Input 
                    placeholder="12/25" 
                    onChange={(e) => setNewMethod({
                      ...newMethod, 
                      details: {...newMethod.details, expiryDate: e.target.value}
                    })}
                  />
                </div>
              </>
            )}

            {newMethod.type === 'mobile_banking' && (
              <>
                <div className="grid gap-2">
                  <Label>প্রভাইডার</Label>
                  <Select 
                    onValueChange={(value) => setNewMethod({
                      ...newMethod, 
                      details: {...newMethod.details, provider: value}
                    })}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="প্রভাইডার সিলেক্ট করুন" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="বিকাশ">বিকাশ</SelectItem>
                      <SelectItem value="নগদ">নগদ</SelectItem>
                      <SelectItem value="রকেট">রকেট</SelectItem>
                      <SelectItem value="উপায়">উপায়</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>মোবাইল নম্বর</Label>
                  <Input 
                    placeholder="01712345678" 
                    onChange={(e) => setNewMethod({
                      ...newMethod, 
                      details: {...newMethod.details, number: e.target.value}
                    })}
                  />
                </div>
              </>
            )}

            {newMethod.type === 'bank' && (
              <>
                <div className="grid gap-2">
                  <Label>ব্যাংক নাম</Label>
                  <Select 
                    onValueChange={(value) => setNewMethod({
                      ...newMethod, 
                      details: {...newMethod.details, bank: value}
                    })}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="ব্যাংক সিলেক্ট করুন" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="সোনালী ব্যাংক">সোনালী ব্যাংক</SelectItem>
                      <SelectItem value="জনতা ব্যাংক">জনতা ব্যাংক</SelectItem>
                      <SelectItem value="রূপালী ব্যাংক">রূপালী ব্যাংক</SelectItem>
                      <SelectItem value="ব্র্যাক ব্যাংক">ব্র্যাক ব্যাংক</SelectItem>
                      <SelectItem value="ইস্টার্ন ব্যাংক">ইস্টার্ন ব্যাংক</SelectItem>
                      <SelectItem value="ডাচ-বাংলা ব্যাংক">ডাচ-বাংলা ব্যাংক</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>অ্যাকাউন্ট নম্বর</Label>
                  <Input 
                    placeholder="1234567890" 
                    onChange={(e) => setNewMethod({
                      ...newMethod, 
                      details: {...newMethod.details, accountNumber: e.target.value}
                    })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label>অ্যাকাউন্ট হোল্ডারের নাম</Label>
                  <Input 
                    placeholder="আব্দুল করিম" 
                    onChange={(e) => setNewMethod({
                      ...newMethod, 
                      details: {...newMethod.details, accountName: e.target.value}
                    })}
                  />
                </div>
              </>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenAddDialog(false)}>বাতিল</Button>
            <Button onClick={handleAddNewMethod}>সেভ করুন</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ডিলিট কনফার্মেশন ডায়ালগ */}
      <Dialog open={!!confirmDelete} onOpenChange={() => setConfirmDelete(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>পেমেন্ট মেথড মুছবেন?</DialogTitle>
            <DialogDescription>
              আপনি কি নিশ্চিত এই পেমেন্ট মেথডটি মুছে ফেলতে চান? এটি মুছে ফেললে পুনরুদ্ধার করা যাবে না।
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmDelete(null)}>বাতিল</Button>
            <Button 
              variant="destructive" 
              onClick={() => confirmDelete && deleteMethod(confirmDelete)}
            >
              মুছুন
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PaymentMethods;
