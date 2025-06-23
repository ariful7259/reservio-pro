
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calculator, 
  Receipt, 
  Download, 
  Plus,
  TrendingDown,
  TrendingUp,
  FileText
} from 'lucide-react';

const CreatorTaxTab = () => {
  const [currentYear, setCurrentYear] = useState('2024');
  const [income, setIncome] = useState('');
  const [expenses, setExpenses] = useState('');

  const taxData = {
    totalIncome: '৳১,২০,০০০',
    totalExpenses: '৳২৫,০০০',
    taxableIncome: '৳৯৫,০০০',
    estimatedTax: '৳৮,৫০০',
    taxRate: '8.9%'
  };

  const expenseCategories = [
    {
      category: 'সফটওয়্যার ও টুলস',
      amount: '৳১২,০০০',
      percentage: 48,
      items: ['Adobe Creative Suite', 'Figma Pro', 'Hosting']
    },
    {
      category: 'হার্ডওয়্যার',
      amount: '৳৮,০০০',
      percentage: 32,
      items: ['ল্যাপটপ আপগ্রেড', 'গ্রাফিক্স ট্যাবলেট']
    },
    {
      category: 'শিক্ষা ও ট্রেনিং',
      amount: '৩,০০০',
      percentage: 12,
      items: ['অনলাইন কোর্স', 'ওয়ার্কশপ']
    },
    {
      category: 'মার্কেটিং',
      amount: '৳২,০০০',
      percentage: 8,
      items: ['সোশ্যাল মিডিয়া বিজ্ঞাপন']
    }
  ];

  const monthlyData = [
    { month: 'জানুয়ারি', income: '১০,০০০', expenses: '২,৫০০', tax: '৭৫০' },
    { month: 'ফেব্রুয়ারি', income: '১২,০০০', expenses: '৩,০০০', tax: '৯০০' },
    { month: 'মার্চ', income: '৮,০০০', expenses: '২,০০০', tax: '৬০০' },
    { month: 'এপ্রিল', income: '১৫,০০০', expenses: '৩,৫০০', tax: '১,১৫০' },
  ];

  const calculateTax = () => {
    const totalIncome = parseFloat(income) || 0;
    const totalExpenses = parseFloat(expenses) || 0;
    const taxableAmount = totalIncome - totalExpenses;
    
    let tax = 0;
    if (taxableAmount <= 300000) {
      tax = 0;
    } else if (taxableAmount <= 400000) {
      tax = (taxableAmount - 300000) * 0.05;
    } else if (taxableAmount <= 700000) {
      tax = 5000 + (taxableAmount - 400000) * 0.10;
    } else {
      tax = 35000 + (taxableAmount - 700000) * 0.15;
    }
    
    return {
      taxableIncome: taxableAmount,
      estimatedTax: tax,
      taxRate: totalIncome > 0 ? ((tax / totalIncome) * 100).toFixed(1) : 0
    };
  };

  const calculatedTax = calculateTax();

  return (
    <div className="space-y-6">
      {/* Tax Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-6 w-6 text-green-600 mx-auto mb-2" />
            <div className="text-lg font-bold text-green-600">{taxData.totalIncome}</div>
            <div className="text-sm text-muted-foreground">মোট আয়</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <TrendingDown className="h-6 w-6 text-red-600 mx-auto mb-2" />
            <div className="text-lg font-bold text-red-600">{taxData.totalExpenses}</div>
            <div className="text-sm text-muted-foreground">মোট খরচ</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Calculator className="h-6 w-6 text-blue-600 mx-auto mb-2" />
            <div className="text-lg font-bold text-blue-600">{taxData.taxableIncome}</div>
            <div className="text-sm text-muted-foreground">করযোগ্য আয়</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Receipt className="h-6 w-6 text-purple-600 mx-auto mb-2" />
            <div className="text-lg font-bold text-purple-600">{taxData.estimatedTax}</div>
            <div className="text-sm text-muted-foreground">আনুমানিক কর</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <FileText className="h-6 w-6 text-orange-600 mx-auto mb-2" />
            <div className="text-lg font-bold text-orange-600">{taxData.taxRate}</div>
            <div className="text-sm text-muted-foreground">করের হার</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="calculator" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="calculator">কর ক্যালকুলেটর</TabsTrigger>
          <TabsTrigger value="expenses">খরচ ট্র্যাকিং</TabsTrigger>
          <TabsTrigger value="reports">রিপোর্ট</TabsTrigger>
          <TabsTrigger value="yearly">বার্ষিক সংক্ষেপ</TabsTrigger>
        </TabsList>

        <TabsContent value="calculator">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>কর ক্যালকুলেটর</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">বার্ষিক আয় (৳)</label>
                  <Input
                    type="number"
                    value={income}
                    onChange={(e) => setIncome(e.target.value)}
                    placeholder="আপনার মোট আয়"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">বার্ষিক খরচ (৳)</label>
                  <Input
                    type="number"
                    value={expenses}
                    onChange={(e) => setExpenses(e.target.value)}
                    placeholder="ব্যবসায়িক খরচ"
                  />
                </div>
                <Button className="w-full">
                  <Calculator className="h-4 w-4 mr-2" />
                  কর গণনা করুন
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>কর গণনার ফলাফল</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>মোট আয়:</span>
                    <span className="font-bold">৳{income || '0'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>মোট খরচ:</span>
                    <span className="font-bold">৳{expenses || '0'}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span>করযোগ্য আয়:</span>
                    <span className="font-bold">৳{calculatedTax.taxableIncome.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>আনুমানিক কর:</span>
                    <span className="font-bold text-purple-600">৳{calculatedTax.estimatedTax.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>করের হার:</span>
                    <span className="font-bold">{calculatedTax.taxRate}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="expenses">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">খরচের বিভাগ</h3>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                নতুন খরচ যোগ করুন
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {expenseCategories.map((category, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">{category.category}</h4>
                        <span className="font-bold">{category.amount}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${category.percentage}%` }}
                        ></div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {category.items.join(', ')}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="reports">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>মাসিক রিপোর্ট</CardTitle>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                PDF ডাউনলোড
              </Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">মাস</th>
                      <th className="text-right py-2">আয়</th>
                      <th className="text-right py-2">খরচ</th>
                      <th className="text-right py-2">আনুমানিক কর</th>
                    </tr>
                  </thead>
                  <tbody>
                    {monthlyData.map((data, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-2">{data.month}</td>
                        <td className="text-right py-2">৳{data.income}</td>
                        <td className="text-right py-2">৳{data.expenses}</td>
                        <td className="text-right py-2">৳{data.tax}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="yearly">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>বছর নির্বাচন</CardTitle>
              </CardHeader>
              <CardContent>
                <select 
                  value={currentYear}
                  onChange={(e) => setCurrentYear(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="2024">২০২৪</option>
                  <option value="2023">২০২৩</option>
                  <option value="2022">২০২২</option>
                </select>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{currentYear} সালের সংক্ষেপ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>মোট আয়:</span>
                  <span className="font-bold text-green-600">৳১,২০,০০০</span>
                </div>
                <div className="flex justify-between">
                  <span>মোট খরচ:</span>
                  <span className="font-bold text-red-600">৳২৫,০০০</span>
                </div>
                <div className="flex justify-between">
                  <span>নিট লাভ:</span>
                  <span className="font-bold text-blue-600">৳৯৫,০০০</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span>প্রদেয় কর:</span>
                  <span className="font-bold text-purple-600">৳৮,৫০০</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CreatorTaxTab;
