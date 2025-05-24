
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Calculator, 
  FileText, 
  Download, 
  Settings,
  Receipt,
  Percent,
  Building,
  Mail,
  Printer,
  Eye
} from 'lucide-react';

interface TaxRule {
  id: string;
  name: string;
  rate: number;
  isActive: boolean;
  applicableOn: string;
  description: string;
}

interface InvoiceTemplate {
  id: string;
  name: string;
  preview: string;
  isActive: boolean;
  features: string[];
}

const TaxInvoiceGenerator = () => {
  const { toast } = useToast();
  const [taxRules, setTaxRules] = useState<TaxRule[]>([
    {
      id: 'vat',
      name: 'VAT (ভ্যাট)',
      rate: 15,
      isActive: true,
      applicableOn: 'সব পণ্য',
      description: 'সরকারি ভ্যালু অ্যাডেড ট্যাক্স'
    },
    {
      id: 'service-tax',
      name: 'সার্ভিস ট্যাক্স',
      rate: 10,
      isActive: false,
      applicableOn: 'সেবা সমূহ',
      description: 'সেবা প্রদানের জন্য প্রযোজ্য ট্যাক্স'
    },
    {
      id: 'luxury-tax',
      name: 'লাক্সারি ট্যাক্স',
      rate: 25,
      isActive: false,
      applicableOn: 'লাক্সারি পণ্য',
      description: 'দামী পণ্যের জন্য অতিরিক্ত ট্যাক্স'
    }
  ]);

  const [invoiceTemplates] = useState<InvoiceTemplate[]>([
    {
      id: 'standard',
      name: 'স্ট্যান্ডার্ড',
      preview: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=300&auto=format&fit=crop&q=60',
      isActive: true,
      features: ['কোম্পানি লোগো', 'পণ্য বিবরণ', 'ট্যাক্স ব্রেকডাউন', 'QR কোড']
    },
    {
      id: 'professional',
      name: 'প্রফেশনাল',
      preview: 'https://images.unsplash.com/photo-1554224154-26032fbc4d72?w=300&auto=format&fit=crop&q=60',
      isActive: false,
      features: ['এডভান্সড ডিজাইন', 'কাস্টম ফিল্ড', 'মাল্টি কারেন্সি', 'ডিজিটাল স্ট্যাম্প']
    },
    {
      id: 'minimal',
      name: 'মিনিমাল',
      preview: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=300&auto=format&fit=crop&q=60',
      isActive: false,
      features: ['সিম্পল ডিজাইন', 'দ্রুত লোডিং', 'প্রিন্ট অপটিমাইজড', 'মোবাইল ফ্রেন্ডলি']
    }
  ]);

  const [invoiceSettings, setInvoiceSettings] = useState({
    autoGenerate: true,
    emailToCustomer: true,
    includeQR: true,
    digitalSignature: false,
    invoicePrefix: 'INV',
    companyName: 'আমার কোম্পানি',
    companyAddress: 'ঢাকা, বাংলাদেশ',
    taxId: 'TAX123456789'
  });

  const toggleTaxRule = (ruleId: string) => {
    setTaxRules(prev => 
      prev.map(rule => 
        rule.id === ruleId 
          ? { ...rule, isActive: !rule.isActive }
          : rule
      )
    );
    
    const rule = taxRules.find(r => r.id === ruleId);
    toast({
      title: `${rule?.name} ${rule?.isActive ? 'নিষ্ক্রিয়' : 'সক্রিয়'} করা হয়েছে`,
      description: "ট্যাক্স রুল আপডেট হয়েছে।",
    });
  };

  const calculateTax = (amount: number) => {
    let totalTax = 0;
    taxRules.forEach(rule => {
      if (rule.isActive) {
        totalTax += (amount * rule.rate) / 100;
      }
    });
    return totalTax;
  };

  const generateInvoice = () => {
    toast({
      title: "ইনভয়েস জেনারেট করা হচ্ছে",
      description: "অনুগ্রহ করে কিছুক্ষণ অপেক্ষা করুন...",
    });

    setTimeout(() => {
      toast({
        title: "ইনভয়েস তৈরি সম্পন্ন",
        description: "ইনভয়েস সফলভাবে জেনারেট এবং ইমেইল করা হয়েছে।",
      });
    }, 2000);
  };

  const previewInvoice = () => {
    toast({
      title: "ইনভয়েস প্রিভিউ",
      description: "নতুন ট্যাবে ইনভয়েস প্রিভিউ খোলা হচ্ছে...",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Calculator className="h-6 w-6 text-primary" />
            ট্যাক্স ও ইনভয়েস অটো-জেনারেটর
          </h2>
          <p className="text-muted-foreground">
            স্বয়ংক্রিয় ট্যাক্স ক্যালকুলেশন এবং প্রফেশনাল ইনভয়েস জেনারেশন
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={previewInvoice} variant="outline">
            <Eye className="h-4 w-4 mr-2" />
            প্রিভিউ
          </Button>
          <Button onClick={generateInvoice}>
            <FileText className="h-4 w-4 mr-2" />
            ইনভয়েস জেনারেট
          </Button>
        </div>
      </div>

      <Tabs defaultValue="tax-rules" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="tax-rules">ট্যাক্স নিয়ম</TabsTrigger>
          <TabsTrigger value="templates">টেমপ্লেট</TabsTrigger>
          <TabsTrigger value="settings">সেটিংস</TabsTrigger>
          <TabsTrigger value="calculator">ক্যালকুলেটর</TabsTrigger>
        </TabsList>

        <TabsContent value="tax-rules" className="space-y-6">
          {/* ট্যাক্স রুলস */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {taxRules.map((rule) => (
              <Card key={rule.id} className={`transition-all ${
                rule.isActive ? 'ring-2 ring-green-500/20 bg-green-50/50' : 'opacity-75'
              }`}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{rule.name}</CardTitle>
                      <Badge variant={rule.isActive ? "default" : "secondary"} className="mt-1">
                        {rule.isActive ? 'সক্রিয়' : 'নিষ্ক্রিয়'}
                      </Badge>
                    </div>
                    <Switch
                      checked={rule.isActive}
                      onCheckedChange={() => toggleTaxRule(rule.id)}
                    />
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-3">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">{rule.rate}%</div>
                    <div className="text-sm text-muted-foreground">ট্যাক্স রেট</div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium">প্রযোজ্য:</p>
                    <p className="text-sm text-muted-foreground">{rule.applicableOn}</p>
                  </div>
                  
                  <p className="text-xs text-muted-foreground">{rule.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* নতুন ট্যাক্স রুল যোগ করুন */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Percent className="h-5 w-5" />
                নতুন ট্যাক্স রুল যোগ করুন
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Input placeholder="ট্যাক্সের নাম" />
                <Input placeholder="রেট (%)" type="number" />
                <Input placeholder="প্রযোজ্য পণ্য" />
                <Button>
                  যোগ করুন
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          {/* ইনভয়েস টেমপ্লেট */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {invoiceTemplates.map((template) => (
              <Card key={template.id} className={`overflow-hidden transition-all ${
                template.isActive ? 'ring-2 ring-primary' : 'hover:shadow-lg'
              }`}>
                <div className="aspect-[4/5] w-full overflow-hidden">
                  <img 
                    src={template.preview} 
                    alt={template.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    {template.isActive && (
                      <Badge className="bg-green-500 text-white">
                        সক্রিয়
                      </Badge>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {template.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="h-3 w-3 mr-1" />
                      প্রিভিউ
                    </Button>
                    <Button 
                      size="sm" 
                      className="flex-1"
                      variant={template.isActive ? "secondary" : "default"}
                      disabled={template.isActive}
                    >
                      {template.isActive ? 'সক্রিয়' : 'ব্যবহার করুন'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          {/* ইনভয়েস সেটিংস */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                ইনভয়েস সেটিংস
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">অটো জেনারেট</h4>
                  <p className="text-sm text-muted-foreground">
                    অর্ডার কনফার্ম হলে স্বয়ংক্রিয়ভাবে ইনভয়েস তৈরি করুন
                  </p>
                </div>
                <Switch 
                  checked={invoiceSettings.autoGenerate}
                  onCheckedChange={(checked) => setInvoiceSettings(prev => ({ ...prev, autoGenerate: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">কাস্টমারকে ইমেইল</h4>
                  <p className="text-sm text-muted-foreground">
                    ইনভয়েস তৈরি হলে কাস্টমারকে ইমেইল পাঠান
                  </p>
                </div>
                <Switch 
                  checked={invoiceSettings.emailToCustomer}
                  onCheckedChange={(checked) => setInvoiceSettings(prev => ({ ...prev, emailToCustomer: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">QR কোড যুক্ত করুন</h4>
                  <p className="text-sm text-muted-foreground">
                    পেমেন্ট ভেরিফিকেশনের জন্য QR কোড অন্তর্ভুক্ত করুন
                  </p>
                </div>
                <Switch 
                  checked={invoiceSettings.includeQR}
                  onCheckedChange={(checked) => setInvoiceSettings(prev => ({ ...prev, includeQR: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">ডিজিটাল সিগনেচার</h4>
                  <p className="text-sm text-muted-foreground">
                    ইনভয়েসে ডিজিটাল সিগনেচার যোগ করুন
                  </p>
                </div>
                <Switch 
                  checked={invoiceSettings.digitalSignature}
                  onCheckedChange={(checked) => setInvoiceSettings(prev => ({ ...prev, digitalSignature: checked }))}
                />
              </div>
            </CardContent>
          </Card>

          {/* কোম্পানি তথ্য */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                কোম্পানি তথ্য
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">কোম্পানির নাম</label>
                  <Input 
                    value={invoiceSettings.companyName}
                    onChange={(e) => setInvoiceSettings(prev => ({ ...prev, companyName: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">ইনভয়েস প্রিফিক্স</label>
                  <Input 
                    value={invoiceSettings.invoicePrefix}
                    onChange={(e) => setInvoiceSettings(prev => ({ ...prev, invoicePrefix: e.target.value }))}
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium">কোম্পানির ঠিকানা</label>
                <Input 
                  value={invoiceSettings.companyAddress}
                  onChange={(e) => setInvoiceSettings(prev => ({ ...prev, companyAddress: e.target.value }))}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium">ট্যাক্স আইডি</label>
                <Input 
                  value={invoiceSettings.taxId}
                  onChange={(e) => setInvoiceSettings(prev => ({ ...prev, taxId: e.target.value }))}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calculator" className="space-y-6">
          {/* ট্যাক্স ক্যালকুলেটর */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                ট্যাক্স ক্যালকুলেটর
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">পণ্যের মূল্য (৳)</label>
                    <Input 
                      type="number" 
                      placeholder="১০০০" 
                      id="amount-input"
                    />
                  </div>
                  
                  <Button 
                    onClick={() => {
                      const input = document.getElementById('amount-input') as HTMLInputElement;
                      const amount = parseFloat(input?.value || '0');
                      const tax = calculateTax(amount);
                      const total = amount + tax;
                      
                      const resultDiv = document.getElementById('calculation-result');
                      if (resultDiv) {
                        resultDiv.innerHTML = `
                          <div class="space-y-2">
                            <div class="flex justify-between">
                              <span>পণ্যের মূল্য:</span>
                              <span>৳${amount.toFixed(2)}</span>
                            </div>
                            <div class="flex justify-between">
                              <span>মোট ট্যাক্স:</span>
                              <span>৳${tax.toFixed(2)}</span>
                            </div>
                            <div class="flex justify-between font-bold text-lg border-t pt-2">
                              <span>সর্বমোট:</span>
                              <span>৳${total.toFixed(2)}</span>
                            </div>
                          </div>
                        `;
                      }
                    }}
                    className="w-full"
                  >
                    <Calculator className="h-4 w-4 mr-2" />
                    ক্যালকুলেট করুন
                  </Button>
                </div>
                
                <div className="bg-muted rounded-lg p-4">
                  <h4 className="font-medium mb-3">ক্যালকুলেশন রেজাল্ট</h4>
                  <div id="calculation-result" className="text-sm text-muted-foreground">
                    পণ্যের মূল্য দিয়ে ক্যালকুলেট করুন
                  </div>
                </div>
              </div>

              {/* সক্রিয় ট্যাক্স রুলস */}
              <div>
                <h4 className="font-medium mb-3">সক্রিয় ট্যাক্স রুলস</h4>
                <div className="space-y-2">
                  {taxRules.filter(rule => rule.isActive).map((rule) => (
                    <div key={rule.id} className="flex justify-between items-center p-2 bg-muted rounded">
                      <span className="text-sm">{rule.name}</span>
                      <span className="text-sm font-medium">{rule.rate}%</span>
                    </div>
                  ))}
                  {taxRules.filter(rule => rule.isActive).length === 0 && (
                    <p className="text-sm text-muted-foreground">কোন ট্যাক্স রুল সক্রিয় নেই</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* সাম্প্রতিক ইনভয়েস */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Receipt className="h-5 w-5" />
                সাম্প্রতিক ইনভয়েস
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { id: 'INV-001', customer: 'রহিম সাহেব', amount: 1500, date: '২০২৪-০১-১৫' },
                  { id: 'INV-002', customer: 'করিম আহমেদ', amount: 2300, date: '২০২৪-০১-১৪' },
                  { id: 'INV-003', customer: 'ফাতেমা খাতুন', amount: 850, date: '২০২৪-০১-১৩' }
                ].map((invoice) => (
                  <div key={invoice.id} className="flex justify-between items-center p-3 border rounded">
                    <div>
                      <p className="font-medium">{invoice.id}</p>
                      <p className="text-sm text-muted-foreground">{invoice.customer}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">৳{invoice.amount}</p>
                      <p className="text-sm text-muted-foreground">{invoice.date}</p>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="outline" size="icon">
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Download className="h-3 w-3" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Mail className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TaxInvoiceGenerator;
