
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  Check,
  Copy,
  Download,
  FileText,
  Printer,
  Send,
  Share2,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  price: number;
}

const InvoiceGenerator = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [invoiceNumber, setInvoiceNumber] = useState(`INV-${Math.floor(Math.random() * 10000)}`);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [dueDate, setDueDate] = useState(
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );
  
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  
  const [items, setItems] = useState<InvoiceItem[]>([
    { id: '1', description: '', quantity: 1, price: 0 }
  ]);
  
  const [note, setNote] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('বিকাশ');
  const [taxRate, setTaxRate] = useState(0);
  
  // ক্যালকুলেট সাবটোটাল
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // ক্যালকুলেট ট্যাক্স
  const taxAmount = subtotal * (taxRate / 100);
  
  // ক্যালকুলেট টোটাল
  const total = subtotal + taxAmount;
  
  // নতুন আইটেম যোগ করার ফাংশন
  const addItem = () => {
    setItems([
      ...items,
      { id: `${items.length + 1}`, description: '', quantity: 1, price: 0 }
    ]);
  };
  
  // আইটেম পরিবর্তন করার ফাংশন
  const handleItemChange = (id: string, field: keyof InvoiceItem, value: string | number) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };
  
  // আইটেম রিমুভ করার ফাংশন
  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id));
    }
  };
  
  // ইনভয়েস জেনারেট করার ফাংশন
  const generateInvoice = () => {
    if (!customerName) {
      toast({
        title: "গ্রাহকের নাম প্রয়োজন",
        description: "দয়া করে গ্রাহকের নাম দিন",
        variant: "destructive"
      });
      return;
    }
    
    if (items.some(item => !item.description || item.price <= 0)) {
      toast({
        title: "অসম্পূর্ণ আইটেম তথ্য",
        description: "দয়া করে সব আইটেমের বিবরণ এবং মূল্য দিন",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "ইনভয়েস জেনারেট করা হয়েছে",
      description: "ইনভয়েস সফলভাবে তৈরি করা হয়েছে",
    });
    
    // প্রিভিউ দেখানোর জন্য ধারণা: এখানে একটি মডাল ওপেন করা যেতে পারে
    // বাস্তব প্রয়োগে, এখানে আমরা PDF জেনারেট করতে পারি বা ইনভয়েসটি সেভ করতে পারি
  };
  
  // ইনভয়েস শেয়ার করার ফাংশন
  const shareInvoice = () => {
    toast({
      title: "ইনভয়েস শেয়ার করা হয়েছে",
      description: "ইনভয়েস লিংক কপি করা হয়েছে",
    });
  };
  
  // ইনভয়েস প্রিন্ট করার ফাংশন
  const printInvoice = () => {
    window.print();
  };

  return (
    <div className="container py-20 px-4">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">ইনভয়েস জেনারেট করুন</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* ইনভয়েস ইনফরমেশন */}
          <Card>
            <CardHeader>
              <CardTitle>ইনভয়েস তথ্য</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">ইনভয়েস নম্বর</label>
                  <Input 
                    value={invoiceNumber}
                    onChange={(e) => setInvoiceNumber(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">তারিখ</label>
                  <Input 
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">শেষ তারিখ</label>
                  <Input 
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">পেমেন্ট মেথড</label>
                  <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                    <SelectTrigger>
                      <SelectValue placeholder="পেমেন্ট মেথড নির্বাচন করুন" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="বিকাশ">বিকাশ</SelectItem>
                      <SelectItem value="নগদ">নগদ</SelectItem>
                      <SelectItem value="রকেট">রকেট</SelectItem>
                      <SelectItem value="ব্যাংক ট্রান্সফার">ব্যাংক ট্রান্সফার</SelectItem>
                      <SelectItem value="ক্যাশ">ক্যাশ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* গ্রাহক তথ্য */}
          <Card>
            <CardHeader>
              <CardTitle>গ্রাহক তথ্য</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">নাম</label>
                  <Input 
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="গ্রাহকের নাম"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">ইমেইল</label>
                  <Input 
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="গ্রাহকের ইমেইল"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">ফোন</label>
                  <Input 
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="গ্রাহকের ফোন নম্বর"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">ঠিকানা</label>
                  <Input 
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    placeholder="গ্রাহকের ঠিকানা"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* আইটেম সেকশন */}
          <Card>
            <CardHeader>
              <CardTitle>আইটেম</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="text-left p-2 text-sm font-medium">বিবরণ</th>
                      <th className="text-right p-2 text-sm font-medium">পরিমাণ</th>
                      <th className="text-right p-2 text-sm font-medium">মূল্য</th>
                      <th className="text-right p-2 text-sm font-medium">মোট</th>
                      <th className="p-2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr key={item.id} className="border-b">
                        <td className="p-2">
                          <Input 
                            value={item.description}
                            onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                            placeholder="আইটেম বিবরণ"
                          />
                        </td>
                        <td className="p-2">
                          <Input 
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => handleItemChange(item.id, 'quantity', parseInt(e.target.value) || 1)}
                            className="text-right"
                          />
                        </td>
                        <td className="p-2">
                          <Input 
                            type="number"
                            min="0"
                            value={item.price}
                            onChange={(e) => handleItemChange(item.id, 'price', parseFloat(e.target.value) || 0)}
                            className="text-right"
                          />
                        </td>
                        <td className="p-2 text-right font-medium">
                          ৳ {(item.price * item.quantity).toFixed(2)}
                        </td>
                        <td className="p-2 text-right">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            disabled={items.length === 1}
                          >
                            &times;
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <Button variant="outline" onClick={addItem}>
                + আইটেম যোগ করুন
              </Button>
              
              <div className="mt-4">
                <label className="text-sm font-medium mb-1.5 block">নোট/মন্তব্য</label>
                <Input 
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="অতিরিক্ত তথ্য বা মন্তব্য"
                />
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* সামারি কার্ড */}
        <div className="space-y-6">
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>ইনভয়েস সামারি</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">সাবটোটাল:</span>
                <span>৳ {subtotal.toFixed(2)}</span>
              </div>
              
              <div>
                <div className="flex justify-between items-center">
                  <label className="text-muted-foreground">ট্যাক্স (%):</label>
                  <Input 
                    type="number"
                    min="0"
                    max="100"
                    value={taxRate}
                    onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
                    className="w-24 text-right"
                  />
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-muted-foreground">ট্যাক্স অ্যামাউন্ট:</span>
                  <span>৳ {taxAmount.toFixed(2)}</span>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex justify-between font-bold text-lg">
                <span>মোট:</span>
                <span>৳ {total.toFixed(2)}</span>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-3">
              <Button className="w-full" onClick={generateInvoice}>
                <FileText className="h-4 w-4 mr-2" />
                ইনভয়েস জেনারেট করুন
              </Button>
              
              <div className="grid grid-cols-3 gap-2 w-full">
                <Button variant="outline" onClick={printInvoice}>
                  <Printer className="h-4 w-4" />
                </Button>
                <Button variant="outline" onClick={shareInvoice}>
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button variant="outline" onClick={() => navigator.clipboard.writeText(invoiceNumber)}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InvoiceGenerator;
