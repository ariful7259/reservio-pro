
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Printer, Download, Copy, Share2 } from 'lucide-react';
import { formatCurrencyBN } from '@/utils/currencyUtils';

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

interface InvoiceData {
  id: string;
  date: string;
  customerName: string;
  customerAddress: string;
  customerPhone: string;
  customerEmail: string;
  sellerName: string;
  sellerAddress: string;
  sellerPhone: string;
  sellerEmail: string;
  items: InvoiceItem[];
  notes: string;
  termsAndConditions: string;
  taxRate: number;
  discountPercentage: number;
}

const InvoiceGenerator = () => {
  const { toast } = useToast();
  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
    id: `INV-${Date.now().toString().substring(6)}`,
    date: new Date().toISOString().split('T')[0],
    customerName: '',
    customerAddress: '',
    customerPhone: '',
    customerEmail: '',
    sellerName: 'আমার দোকান',
    sellerAddress: 'ঢাকা, বাংলাদেশ',
    sellerPhone: '01700000000',
    sellerEmail: 'info@amardokan.com',
    items: [
      {
        id: '1',
        description: '',
        quantity: 1,
        unitPrice: 0
      }
    ],
    notes: '',
    termsAndConditions: 'সমস্ত বিক্রয় চূড়ান্ত। রিফান্ডের জন্য, আমাদের রিফান্ড নীতি দেখুন।',
    taxRate: 5,
    discountPercentage: 0
  });

  const addItem = () => {
    setInvoiceData({
      ...invoiceData,
      items: [
        ...invoiceData.items,
        {
          id: Date.now().toString(),
          description: '',
          quantity: 1,
          unitPrice: 0
        }
      ]
    });
  };

  const removeItem = (id: string) => {
    if (invoiceData.items.length === 1) {
      toast({
        title: "অন্তত একটি আইটেম প্রয়োজন",
        description: "ইনভয়েসে অন্তত একটি আইটেম থাকা আবশ্যক",
        variant: "destructive"
      });
      return;
    }
    
    setInvoiceData({
      ...invoiceData,
      items: invoiceData.items.filter(item => item.id !== id)
    });
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: string | number) => {
    setInvoiceData({
      ...invoiceData,
      items: invoiceData.items.map(item => {
        if (item.id === id) {
          return { ...item, [field]: value };
        }
        return item;
      })
    });
  };

  const calculateSubtotal = () => {
    return invoiceData.items.reduce((total, item) => total + (item.quantity * item.unitPrice), 0);
  };

  const calculateDiscount = () => {
    const subtotal = calculateSubtotal();
    return subtotal * (invoiceData.discountPercentage / 100);
  };

  const calculateTax = () => {
    const subtotal = calculateSubtotal();
    const discount = calculateDiscount();
    return (subtotal - discount) * (invoiceData.taxRate / 100);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const discount = calculateDiscount();
    const tax = calculateTax();
    return subtotal - discount + tax;
  };

  const generateInvoice = () => {
    // Here you would typically generate a PDF or printable format
    // For this example, we'll just show a success message
    toast({
      title: "ইনভয়েস তৈরি করা হয়েছে",
      description: "ইনভয়েস সফলভাবে তৈরি করা হয়েছে।",
    });
  };

  const printInvoice = () => {
    window.print();
  };

  const downloadInvoice = () => {
    toast({
      title: "ইনভয়েস ডাউনলোড",
      description: "ইনভয়েস ডাউনলোড শুরু হয়েছে।",
    });
  };

  const copyInvoiceLink = () => {
    navigator.clipboard.writeText(`https://example.com/invoice/${invoiceData.id}`);
    toast({
      title: "লিংক কপি করা হয়েছে",
      description: "ইনভয়েস লিংক ক্লিপবোর্ডে কপি করা হয়েছে।",
    });
  };

  const shareInvoice = () => {
    if (navigator.share) {
      navigator.share({
        title: `ইনভয়েস #${invoiceData.id}`,
        text: `${invoiceData.customerName} এর জন্য ইনভয়েস`,
        url: `https://example.com/invoice/${invoiceData.id}`,
      }).catch(() => {
        toast({
          title: "শেয়ার করা সম্ভব হয়নি",
          description: "ইনভয়েস শেয়ার করার সময় একটি সমস্যা হয়েছে।",
          variant: "destructive"
        });
      });
    } else {
      copyInvoiceLink();
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold">ইনভয়েস জেনারেটর</h1>
          <p className="text-muted-foreground">প্রফেশনাল ইনভয়েস তৈরি করুন এবং ডাউনলোড করুন</p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={printInvoice}>
            <Printer className="h-4 w-4 mr-2" />
            প্রিন্ট
          </Button>
          <Button variant="outline" onClick={downloadInvoice}>
            <Download className="h-4 w-4 mr-2" />
            ডাউনলোড
          </Button>
          <Button variant="outline" onClick={copyInvoiceLink}>
            <Copy className="h-4 w-4 mr-2" />
            কপি
          </Button>
          <Button variant="outline" onClick={shareInvoice}>
            <Share2 className="h-4 w-4 mr-2" />
            শেয়ার
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>ইনভয়েস তথ্য</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="invoice-id">ইনভয়েস নম্বর</Label>
                  <Input 
                    id="invoice-id" 
                    value={invoiceData.id} 
                    onChange={(e) => setInvoiceData({...invoiceData, id: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="invoice-date">তারিখ</Label>
                  <Input 
                    id="invoice-date" 
                    type="date" 
                    value={invoiceData.date} 
                    onChange={(e) => setInvoiceData({...invoiceData, date: e.target.value})}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>ক্রেতার তথ্য</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="customer-name">নাম</Label>
                  <Input 
                    id="customer-name" 
                    value={invoiceData.customerName} 
                    onChange={(e) => setInvoiceData({...invoiceData, customerName: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="customer-address">ঠিকানা</Label>
                  <Textarea 
                    id="customer-address" 
                    value={invoiceData.customerAddress} 
                    onChange={(e) => setInvoiceData({...invoiceData, customerAddress: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="customer-phone">ফোন</Label>
                  <Input 
                    id="customer-phone" 
                    value={invoiceData.customerPhone} 
                    onChange={(e) => setInvoiceData({...invoiceData, customerPhone: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="customer-email">ইমেইল</Label>
                  <Input 
                    id="customer-email" 
                    type="email"
                    value={invoiceData.customerEmail} 
                    onChange={(e) => setInvoiceData({...invoiceData, customerEmail: e.target.value})}
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>বিক্রেতার তথ্য</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="seller-name">কোম্পানির নাম</Label>
                  <Input 
                    id="seller-name" 
                    value={invoiceData.sellerName} 
                    onChange={(e) => setInvoiceData({...invoiceData, sellerName: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="seller-address">ঠিকানা</Label>
                  <Textarea 
                    id="seller-address" 
                    value={invoiceData.sellerAddress} 
                    onChange={(e) => setInvoiceData({...invoiceData, sellerAddress: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="seller-phone">ফোন</Label>
                  <Input 
                    id="seller-phone" 
                    value={invoiceData.sellerPhone} 
                    onChange={(e) => setInvoiceData({...invoiceData, sellerPhone: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="seller-email">ইমেইল</Label>
                  <Input 
                    id="seller-email" 
                    type="email"
                    value={invoiceData.sellerEmail} 
                    onChange={(e) => setInvoiceData({...invoiceData, sellerEmail: e.target.value})}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>আইটেম</CardTitle>
              <Button variant="outline" onClick={addItem}>আইটেম যোগ করুন</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {invoiceData.items.map((item) => (
                  <div key={item.id} className="grid grid-cols-12 gap-4 items-end">
                    <div className="col-span-5">
                      <Label htmlFor={`item-desc-${item.id}`}>বিবরণ</Label>
                      <Input 
                        id={`item-desc-${item.id}`} 
                        value={item.description} 
                        onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                      />
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor={`item-qty-${item.id}`}>পরিমাণ</Label>
                      <Input 
                        id={`item-qty-${item.id}`} 
                        type="number"
                        min="1"
                        value={item.quantity} 
                        onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value))}
                      />
                    </div>
                    <div className="col-span-3">
                      <Label htmlFor={`item-price-${item.id}`}>দাম (৳)</Label>
                      <Input 
                        id={`item-price-${item.id}`} 
                        type="number"
                        min="0"
                        step="0.01"
                        value={item.unitPrice} 
                        onChange={(e) => updateItem(item.id, 'unitPrice', parseFloat(e.target.value))}
                      />
                    </div>
                    <div className="col-span-2">
                      <Button 
                        variant="ghost" 
                        onClick={() => removeItem(item.id)}
                        className="w-full text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        মুছুন
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>অতিরিক্ত তথ্য</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="notes">নোট</Label>
                <Textarea 
                  id="notes" 
                  value={invoiceData.notes} 
                  onChange={(e) => setInvoiceData({...invoiceData, notes: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="terms">শর্তাবলী</Label>
                <Textarea 
                  id="terms" 
                  value={invoiceData.termsAndConditions} 
                  onChange={(e) => setInvoiceData({...invoiceData, termsAndConditions: e.target.value})}
                />
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>হিসাব</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="discount">ডিসকাউন্ট (%)</Label>
                <Input 
                  id="discount" 
                  type="number"
                  min="0"
                  max="100"
                  value={invoiceData.discountPercentage} 
                  onChange={(e) => setInvoiceData({...invoiceData, discountPercentage: parseFloat(e.target.value)})}
                />
              </div>
              <div>
                <Label htmlFor="tax">ট্যাক্স (%)</Label>
                <Input 
                  id="tax" 
                  type="number"
                  min="0"
                  max="100"
                  value={invoiceData.taxRate} 
                  onChange={(e) => setInvoiceData({...invoiceData, taxRate: parseFloat(e.target.value)})}
                />
              </div>
              
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">সাবটোটাল:</span>
                  <span>{formatCurrencyBN(calculateSubtotal())}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">ডিসকাউন্ট ({invoiceData.discountPercentage}%):</span>
                  <span>-{formatCurrencyBN(calculateDiscount())}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">ট্যাক্স ({invoiceData.taxRate}%):</span>
                  <span>{formatCurrencyBN(calculateTax())}</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t">
                  <span>মোট:</span>
                  <span>{formatCurrencyBN(calculateTotal())}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={generateInvoice}>ইনভয়েস তৈরি করুন</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>ইনভয়েস টেমপ্লেট</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="h-24 flex flex-col">
                  <span>স্ট্যান্ডার্ড</span>
                  <span className="text-xs text-muted-foreground">সাধারণ ব্যবসা</span>
                </Button>
                <Button variant="outline" className="h-24 flex flex-col">
                  <span>মডার্ন</span>
                  <span className="text-xs text-muted-foreground">আধুনিক লেআউট</span>
                </Button>
                <Button variant="outline" className="h-24 flex flex-col">
                  <span>ক্লাসিক</span>
                  <span className="text-xs text-muted-foreground">ঐতিহ্যবাহী</span>
                </Button>
                <Button variant="outline" className="h-24 flex flex-col">
                  <span>মিনিমাল</span>
                  <span className="text-xs text-muted-foreground">সহজ ডিজাইন</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InvoiceGenerator;
