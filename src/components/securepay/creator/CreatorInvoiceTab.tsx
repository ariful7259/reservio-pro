
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  FileText, 
  Plus, 
  Download, 
  Eye, 
  Send,
  Calendar,
  DollarSign,
  User
} from 'lucide-react';

const CreatorInvoiceTab = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newInvoice, setNewInvoice] = useState({
    clientName: '',
    clientEmail: '',
    service: '',
    amount: '',
    description: '',
    dueDate: ''
  });

  const invoices = [
    {
      id: 'INV-001',
      clientName: 'আহমেদ হাসান',
      clientEmail: 'ahmed@email.com',
      service: 'লোগো ডিজাইন',
      amount: '৳২,৫০০',
      status: 'paid',
      issueDate: '২৫ ডিসেম্বর ২০২৪',
      dueDate: '৩১ ডিসেম্বর ২০২৪',
      paidDate: '২৮ ডিসেম্বর ২০২৪'
    },
    {
      id: 'INV-002',
      clientName: 'ফাতিমা খাতুন',
      clientEmail: 'fatima@email.com',
      service: 'ওয়েবসাইট ডিজাইন',
      amount: '৳১৫,০০০',
      status: 'pending',
      issueDate: '২০ ডিসেম্বর ২০২৪',
      dueDate: '৫ জানুয়ারি ২০২৫',
      paidDate: null
    },
    {
      id: 'INV-003',
      clientName: 'মো. রহিম',
      clientEmail: 'rahim@email.com',
      service: 'ব্র্যান্ডিং প্যাকেজ',
      amount: '৳৮,০০০',
      status: 'overdue',
      issueDate: '১০ ডিসেম্বর ২০২৪',
      dueDate: '২০ ডিসেম্বর ২০২৪',
      paidDate: null
    }
  ];

  const invoiceStats = {
    total: invoices.length,
    paid: invoices.filter(inv => inv.status === 'paid').length,
    pending: invoices.filter(inv => inv.status === 'pending').length,
    overdue: invoices.filter(inv => inv.status === 'overdue').length,
    totalAmount: '৳২৫,৫০০',
    paidAmount: '৳২,৫০০',
    pendingAmount: '৳২৩,০০০'
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-100 text-green-800">পরিশোধিত</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">অপেক্ষমাণ</Badge>;
      case 'overdue':
        return <Badge className="bg-red-100 text-red-800">মেয়াদোত্তীর্ণ</Badge>;
      default:
        return <Badge variant="secondary">অজানা</Badge>;
    }
  };

  const handleCreateInvoice = () => {
    console.log('Creating invoice:', newInvoice);
    setShowCreateForm(false);
    setNewInvoice({
      clientName: '',
      clientEmail: '',
      service: '',
      amount: '',
      description: '',
      dueDate: ''
    });
  };

  return (
    <div className="space-y-6">
      {/* Invoice Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">মোট ইনভয়েস</p>
                <p className="text-2xl font-bold">{invoiceStats.total}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">পরিশোধিত</p>
                <p className="text-2xl font-bold text-green-600">{invoiceStats.paid}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">অপেক্ষমাণ</p>
                <p className="text-2xl font-bold text-yellow-600">{invoiceStats.pending}</p>
              </div>
              <Calendar className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">মেয়াদোত্তীর্ণ</p>
                <p className="text-2xl font-bold text-red-600">{invoiceStats.overdue}</p>
              </div>
              <Calendar className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Header with Create Button */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">ইনভয়েস ম্যানেজমেন্ট</h2>
          <p className="text-muted-foreground">আপনার ইনভয়েস তৈরি ও পরিচালনা করুন</p>
        </div>
        <Button onClick={() => setShowCreateForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          নতুন ইনভয়েস
        </Button>
      </div>

      {/* Create Invoice Form */}
      {showCreateForm && (
        <Card>
          <CardHeader>
            <CardTitle>নতুন ইনভয়েস তৈরি করুন</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">ক্লায়েন্টের নাম</label>
                <Input
                  value={newInvoice.clientName}
                  onChange={(e) => setNewInvoice({...newInvoice, clientName: e.target.value})}
                  placeholder="ক্লায়েন্টের নাম লিখুন"
                />
              </div>
              <div>
                <label className="text-sm font-medium">ক্লায়েন্টের ইমেইল</label>
                <Input
                  type="email"
                  value={newInvoice.clientEmail}
                  onChange={(e) => setNewInvoice({...newInvoice, clientEmail: e.target.value})}
                  placeholder="ক্লায়েন্টের ইমেইল"
                />
              </div>
              <div>
                <label className="text-sm font-medium">সার্ভিস</label>
                <Input
                  value={newInvoice.service}
                  onChange={(e) => setNewInvoice({...newInvoice, service: e.target.value})}
                  placeholder="সার্ভিসের নাম"
                />
              </div>
              <div>
                <label className="text-sm font-medium">পরিমাণ</label>
                <Input
                  value={newInvoice.amount}
                  onChange={(e) => setNewInvoice({...newInvoice, amount: e.target.value})}
                  placeholder="৳ পরিমাণ"
                />
              </div>
              <div>
                <label className="text-sm font-medium">শেষ তারিখ</label>
                <Input
                  type="date"
                  value={newInvoice.dueDate}
                  onChange={(e) => setNewInvoice({...newInvoice, dueDate: e.target.value})}
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">বিবরণ</label>
              <Textarea
                value={newInvoice.description}
                onChange={(e) => setNewInvoice({...newInvoice, description: e.target.value})}
                placeholder="সার্ভিসের বিস্তারিত বিবরণ"
                rows={3}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleCreateInvoice}>
                ইনভয়েস তৈরি করুন
              </Button>
              <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                বাতিল
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Invoices List */}
      <Card>
        <CardHeader>
          <CardTitle>ইনভয়েস তালিকা</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {invoices.map((invoice) => (
              <div key={invoice.id} className="border rounded-lg p-4">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FileText className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">{invoice.id}</p>
                        <p className="text-sm text-muted-foreground">{invoice.service}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {invoice.clientName}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        শেষ তারিখ: {invoice.dueDate}
                      </span>
                      {invoice.paidDate && (
                        <span className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          পরিশোধিত: {invoice.paidDate}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-col lg:items-end gap-2">
                    <div className="flex items-center gap-2">
                      <p className="text-lg font-bold">{invoice.amount}</p>
                      {getStatusBadge(invoice.status)}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        দেখুন
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        PDF
                      </Button>
                      {invoice.status !== 'paid' && (
                        <Button variant="outline" size="sm">
                          <Send className="h-4 w-4 mr-1" />
                          পাঠান
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Revenue Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{invoiceStats.totalAmount}</div>
            <div className="text-sm text-muted-foreground">মোট বিল</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{invoiceStats.paidAmount}</div>
            <div className="text-sm text-muted-foreground">প্রাপ্ত অর্থ</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{invoiceStats.pendingAmount}</div>
            <div className="text-sm text-muted-foreground">বকেয়া অর্থ</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreatorInvoiceTab;
