
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle,
  Calendar,
  PieChart,
  Target,
  Plus
} from 'lucide-react';

const BuyerBudgetTab = () => {
  const [monthlyBudget, setMonthlyBudget] = useState('10000');
  const [showAddBudget, setShowAddBudget] = useState(false);

  const budgetData = {
    monthly: {
      budget: 10000,
      spent: 6500,
      remaining: 3500,
      percentage: 65
    },
    categories: [
      {
        name: 'গ্রাফিক্স ডিজাইন',
        budget: 4000,
        spent: 2500,
        percentage: 62.5,
        color: 'bg-blue-500'
      },
      {
        name: 'ওয়েব ডেভেলপমেন্ট',
        budget: 3000,
        spent: 2800,
        percentage: 93.3,
        color: 'bg-red-500'
      },
      {
        name: 'কন্টেন্ট রাইটিং',
        budget: 2000,
        spent: 800,
        percentage: 40,
        color: 'bg-green-500'
      },
      {
        name: 'ভিডিও এডিটিং',
        budget: 1000,
        spent: 400,
        percentage: 40,
        color: 'bg-purple-500'
      }
    ]
  };

  const recentExpenses = [
    {
      id: 1,
      service: 'লোগো ডিজাইন',
      creator: 'ডিজাইন এক্সপার্ট',
      amount: -2500,
      date: '২৫ ডিসেম্বর',
      category: 'গ্রাফিক্স ডিজাইন'
    },
    {
      id: 2,
      service: 'ওয়েবসাইট আপডেট',
      creator: 'ওয়েব মাস্টার',
      amount: -1500,
      date: '২৩ ডিসেম্বর',
      category: 'ওয়েব ডেভেলপমেন্ট'
    },
    {
      id: 3,
      service: 'ব্লগ পোস্ট',
      creator: 'কন্টেন্ট রাইটার',
      amount: -800,
      date: '২০ ডিসেম্বর',
      category: 'কন্টেন্ট রাইটিং'
    }
  ];

  const budgetAlerts = [
    {
      category: 'ওয়েব ডেভেলপমেন্ট',
      message: 'বাজেটের ৯৩% ব্যয় হয়েছে',
      type: 'warning'
    },
    {
      category: 'গ্রাফিক্স ডিজাইন',
      message: 'বাজে�� সীমা অতিক্রম করতে পারে',
      type: 'info'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Budget Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">মাসিক বাজেট</p>
                <p className="text-2xl font-bold">৳{budgetData.monthly.budget.toLocaleString()}</p>
              </div>
              <Target className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">ব্যয়িত</p>
                <p className="text-2xl font-bold text-red-600">৳{budgetData.monthly.spent.toLocaleString()}</p>
              </div>
              <TrendingDown className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">অবশিষ্ট</p>
                <p className="text-2xl font-bold text-green-600">৳{budgetData.monthly.remaining.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">ব্যয়ের হার</p>
                <p className="text-2xl font-bold">{budgetData.monthly.percentage}%</p>
              </div>
              <PieChart className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Budget Progress */}
      <Card>
        <CardHeader>
          <CardTitle>মাসিক বাজেট ট্র্যাকিং</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>মোট বাজেট অগ্রগতি</span>
              <span className="font-bold">{budgetData.monthly.percentage}%</span>
            </div>
            <Progress value={budgetData.monthly.percentage} className="h-3" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>৳{budgetData.monthly.spent.toLocaleString()} ব্যয়িত</span>
              <span>৳{budgetData.monthly.remaining.toLocaleString()} অবশিষ্ট</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category-wise Budget */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>ক্যাটাগরি অনুযায়ী বাজেট</CardTitle>
          <Button onClick={() => setShowAddBudget(true)}>
            <Plus className="h-4 w-4 mr-2" />
            নতুন ক্যাটাগরি
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {budgetData.categories.map((category, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full ${category.color}`}></div>
                    <span className="font-medium">{category.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">
                      ৳{category.spent.toLocaleString()} / ৳{category.budget.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {category.percentage.toFixed(1)}%
                    </div>
                  </div>
                </div>
                <Progress 
                  value={category.percentage} 
                  className="h-2"
                />
                {category.percentage > 80 && (
                  <div className="flex items-center gap-2 text-sm text-orange-600">
                    <AlertTriangle className="h-4 w-4" />
                    <span>বাজেট সীমা প্রায় শেষ</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Budget Alerts */}
      {budgetAlerts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              বাজেট সতর্কতা
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {budgetAlerts.map((alert, index) => (
                <div key={index} className={`p-3 rounded-lg border-l-4 ${
                  alert.type === 'warning' ? 'bg-orange-50 border-orange-400' : 'bg-blue-50 border-blue-400'
                }`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{alert.category}</p>
                      <p className="text-sm text-muted-foreground">{alert.message}</p>
                    </div>
                    <Badge variant={alert.type === 'warning' ? 'destructive' : 'default'}>
                      {alert.type === 'warning' ? 'সতর্কতা' : 'তথ্য'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Expenses */}
      <Card>
        <CardHeader>
          <CardTitle>সাম্প্রতিক খরচ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentExpenses.map((expense) => (
              <div key={expense.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <TrendingDown className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <p className="font-medium">{expense.service}</p>
                    <p className="text-sm text-muted-foreground">{expense.creator}</p>
                    <Badge variant="outline" className="mt-1 text-xs">
                      {expense.category}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-red-600">৳{Math.abs(expense.amount).toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">{expense.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Budget Settings */}
      <Card>
        <CardHeader>
          <CardTitle>বাজেট সেটিংস</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">মাসিক বাজেট সীমা</label>
            <div className="flex gap-2 mt-1">
              <Input
                type="number"
                value={monthlyBudget}
                onChange={(e) => setMonthlyBudget(e.target.value)}
                placeholder="বাজেট পরিমাণ"
              />
              <Button>আপডেট করুন</Button>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <p className="font-medium">বাজেট সতর্কতা</p>
              <p className="text-sm text-muted-foreground">৮০% ব্যয় হলে সতর্কতা পাঠান</p>
            </div>
            <Button variant="outline" size="sm">
              সক্রিয়
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BuyerBudgetTab;
