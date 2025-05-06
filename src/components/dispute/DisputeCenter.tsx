import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { 
  AlertTriangle, MessageSquare, ShieldCheck, Clock, FileText, 
  Search, Filter, CheckCircle, XCircle, HelpCircle, ArrowLeft, ChevronRight
} from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type DisputeStatus = 'pending' | 'in-progress' | 'resolved' | 'closed';

interface Dispute {
  id: string;
  title: string;
  description: string;
  orderId: string;
  counterparty: string;
  amount: number;
  category: 'payment' | 'service' | 'product' | 'delivery' | 'other';
  status: DisputeStatus;
  createdAt: string;
  updatedAt: string;
  priority: 'low' | 'medium' | 'high';
  messages: Message[];
}

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  isAdmin?: boolean;
}

// Sample data - in a real app, this would come from an API
const SAMPLE_DISPUTES: Dispute[] = [
  {
    id: 'DSP-001',
    title: 'পেমেন্ট রিফান্ড অনুরোধ',
    description: 'আমি সার্ভিসটি বুক করেছিলাম কিন্তু বিক্রেতা সময়মত উপস্থিত হননি। আমি রিফান্ড চাই।',
    orderId: 'ORD-12345',
    counterparty: 'করিম মিয়া',
    amount: 1500,
    category: 'service',
    status: 'in-progress',
    createdAt: '2025-05-02T10:30:00',
    updatedAt: '2025-05-04T14:45:00',
    priority: 'medium',
    messages: [
      {
        id: 'm1',
        sender: 'আমি',
        content: 'সার্ভিস প্রোভাইডার নির্ধারিত সময়ে আসেনি, আমি রিফান্ড চাই।',
        timestamp: '2025-05-02T10:30:00'
      },
      {
        id: 'm2',
        sender: 'করিম মিয়া',
        content: 'আমি দুঃখিত, আমি ট্রাফিক জ্যামে আটকে পড়েছিলাম। আমি আগামীকাল সেবা দিতে রাজি আছি।',
        timestamp: '2025-05-02T14:20:00'
      },
      {
        id: 'm3',
        sender: 'সাপোর্ট টিম',
        content: 'আমরা সমস্যাটি বুঝতে পেরেছি। আমরা উভয় পক্ষের সাথে যোগাযোগ করে সমাধান খুঁজছি।',
        timestamp: '2025-05-03T09:15:00',
        isAdmin: true
      }
    ]
  },
  {
    id: 'DSP-002',
    title: 'পণ্য ক্ষতিগ্রস্ত অবস্থায় পাওয়া',
    description: 'আমি যে পণ্যটি অর্ডার করেছিলাম সেটি ক্ষতিগ্রস্ত অবস্থায় পৌঁছেছে। আমি প্রতিস্থাপন বা রিফান্ড চাই।',
    orderId: 'ORD-67890',
    counterparty: 'মেগা শপ',
    amount: 3500,
    category: 'product',
    status: 'pending',
    createdAt: '2025-05-04T15:20:00',
    updatedAt: '2025-05-04T15:20:00',
    priority: 'high',
    messages: [
      {
        id: 'm1',
        sender: 'আমি',
        content: 'পণ্যটি ক্ষতিগ্রস্ত অবস্থায় এসেছে। প্যাকেজিং ভালো ছিল না।',
        timestamp: '2025-05-04T15:20:00'
      }
    ]
  },
  {
    id: 'DSP-003',
    title: 'ভুল পরিমাণ চার্জ করা হয়েছে',
    description: 'আমার কাছ থেকে চুক্তির চেয়ে বেশি টাকা নেওয়া হয়েছে। আমি অতিরিক্ত টাকা ফেরত চাই।',
    orderId: 'ORD-24680',
    counterparty: 'রহিম ট্রেডার্স',
    amount: 500,
    category: 'payment',
    status: 'resolved',
    createdAt: '2025-05-01T09:10:00',
    updatedAt: '2025-05-03T11:30:00',
    priority: 'low',
    messages: [
      {
        id: 'm1',
        sender: 'আমি',
        content: 'আমার কাছ থেকে ৫০০ টাকা বেশি নেওয়া হয়েছে।',
        timestamp: '2025-05-01T09:10:00'
      },
      {
        id: 'm2',
        sender: 'রহিম ট্রেডার্স',
        content: 'আমরা চেক করে দেখেছি যে এটি একটি সিস্টেম ত্রুটি ছিল। আমরা অতিরিক্ত টাকা ফেরত দিতে সম্মত হয়েছেন। আমরা আপনার ওয়ালেটে ৫০০ টাকা ফেরত দিয়েছি।',
        timestamp: '2025-05-02T10:40:00'
      },
      {
        id: 'm3',
        sender: 'সাপোর্ট টিম',
        content: 'বিক্রেতা অতিরিক্ত অর্থ ফেরত দিতে সম্মত হয়েছেন। আমরা আপনার ওয়ালেটে ৫০০ টাকা ফেরত দিয়েছি।',
        timestamp: '2025-05-03T11:30:00',
        isAdmin: true
      },
      {
        id: 'm4',
        sender: 'আমি',
        content: 'ধন্যবাদ, আমি টাকা পেয়েছি।',
        timestamp: '2025-05-03T12:15:00'
      }
    ]
  }
];

const DisputeCenter: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('active');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [selectedDispute, setSelectedDispute] = useState<Dispute | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [newDisputeData, setNewDisputeData] = useState({
    title: '',
    description: '',
    orderId: '',
    category: 'service' as 'payment' | 'service' | 'product' | 'delivery' | 'other',
    amount: 0
  });
  const [showNewDisputeForm, setShowNewDisputeForm] = useState(false);
  
  const filteredDisputes = SAMPLE_DISPUTES.filter(dispute => {
    // Tab filter
    if (activeTab === 'active' && dispute.status === 'resolved') return false;
    if (activeTab === 'resolved' && dispute.status !== 'resolved') return false;
    
    // Search filter
    if (searchQuery && 
        !dispute.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !dispute.id.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !dispute.orderId.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Status filter
    if (statusFilter !== 'all' && dispute.status !== statusFilter) return false;
    
    // Category filter
    if (categoryFilter !== 'all' && dispute.category !== categoryFilter) return false;
    
    return true;
  });
  
  const handleSubmitMessage = () => {
    if (!newMessage.trim() || !selectedDispute) return;
    
    // In a real app, we would send this to an API
    toast({
      title: "মেসেজ পাঠানো হয়েছে",
      description: "আপনার মেসেজ সফলভাবে পাঠানো হয়েছে।",
    });
    
    setNewMessage('');
  };
  
  const handleCreateDispute = () => {
    // Validate form
    if (!newDisputeData.title || !newDisputeData.description || !newDisputeData.orderId) {
      toast({
        title: "তথ্য অসম্পূর্ণ",
        description: "সমস্ত প্রয়োজনীয় তথ্য পূরণ করুন।",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, we would send this to an API
    toast({
      title: "ডিসপিউট দাখিল করা হয়েছে",
      description: "আপনার ডিসপিউট সফলভাবে দাখিল করা হয়েছে। আমাদের টিম শীঘ্রই পর্যালোচনা করবে।",
    });
    
    // Reset form
    setNewDisputeData({
      title: '',
      description: '',
      orderId: '',
      category: 'service',
      amount: 0
    });
    
    setShowNewDisputeForm(false);
  };
  
  const getStatusBadge = (status: DisputeStatus) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-500">অপেক্ষমান</Badge>;
      case 'in-progress':
        return <Badge className="bg-blue-500">প্রক্রিয়াধীন</Badge>;
      case 'resolved':
        return <Badge className="bg-green-500">সমাধান হয়েছে</Badge>;
      case 'closed':
        return <Badge className="bg-gray-500">বন্ধ করা হয়েছে</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'payment':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">পেমেন্ট</Badge>;
      case 'service':
        return <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">সেবা</Badge>;
      case 'product':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">পণ্য</Badge>;
      case 'delivery':
        return <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">ডেলিভারি</Badge>;
      case 'other':
        return <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200">অন্যান্য</Badge>;
      default:
        return <Badge variant="outline">{category}</Badge>;
    }
  };
  
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'low':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">কম</Badge>;
      case 'medium':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">মাঝারি</Badge>;
      case 'high':
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">উচ্চ</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };
  
  return (
    <div className="container mx-auto py-20 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold">ডিসপিউট সেন্টার</h1>
          <p className="text-muted-foreground">আপনার সমস্যা সমাধানের জন্য সাহায্য করি</p>
        </div>
        
        <Dialog open={showNewDisputeForm} onOpenChange={setShowNewDisputeForm}>
          <DialogTrigger asChild>
            <Button>নতুন ডিসপিউট</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>নতুন ডিসপিউট দাখিল করুন</DialogTitle>
              <DialogDescription>
                আপনার সমস্যার বিবরণ দিন। আমাদের টিম যত তাড়াতাড়ি সম্ভব সমাধান করার চেষ্টা করবে।
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="dispute-title">বিষয়</Label>
                <Input 
                  id="dispute-title" 
                  placeholder="সংক্ষিপ্ত বিষয়"
                  value={newDisputeData.title}
                  onChange={(e) => setNewDisputeData({...newDisputeData, title: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="dispute-orderId">অর্ডার আইডি</Label>
                <Input 
                  id="dispute-orderId" 
                  placeholder="যেমন: ORD-12345"
                  value={newDisputeData.orderId}
                  onChange={(e) => setNewDisputeData({...newDisputeData, orderId: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="dispute-category">বিভাগ</Label>
                <Select 
                  value={newDisputeData.category}
                  onValueChange={(value: any) => setNewDisputeData({...newDisputeData, category: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="বিভাগ নির্বাচন করুন" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="payment">পেমেন্ট</SelectItem>
                    <SelectItem value="service">সেবা</SelectItem>
                    <SelectItem value="product">পণ্য</SelectItem>
                    <SelectItem value="delivery">ডেলিভারি</SelectItem>
                    <SelectItem value="other">অন্যান্য</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="dispute-amount">পরিমাণ (৳)</Label>
                <Input 
                  id="dispute-amount" 
                  type="number"
                  min="0"
                  placeholder="টাকার পরিমাণ"
                  value={newDisputeData.amount || ''}
                  onChange={(e) => setNewDisputeData({...newDisputeData, amount: parseInt(e.target.value) || 0})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="dispute-description">বিস্তারিত বিবরণ</Label>
                <Textarea 
                  id="dispute-description" 
                  placeholder="আপনার সমস্যার বিস্তারিত বিবরণ দিন..."
                  rows={4}
                  value={newDisputeData.description}
                  onChange={(e) => setNewDisputeData({...newDisputeData, description: e.target.value})}
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowNewDisputeForm(false)}>বাতিল</Button>
              <Button onClick={handleCreateDispute}>দাখিল করুন</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card className="mb-6">
            <CardHeader className="pb-3">
              <CardTitle>ফিল্টার</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type="text" 
                    placeholder="ডিসপিউট, অর্ডার আইডি খুঁজুন" 
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="status-filter">স্ট্যাটাস</Label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger id="status-filter">
                      <SelectValue placeholder="স্ট্যাটাস ফিল্টার" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">সব স্ট্যাটাস</SelectItem>
                      <SelectItem value="pending">অপেক্ষমান</SelectItem>
                      <SelectItem value="in-progress">প্রক্রিয়াধীন</SelectItem>
                      <SelectItem value="resolved">সমাধান হয়েছে</SelectItem>
                      <SelectItem value="closed">বন্ধ করা হয়েছে</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="category-filter">বিভাগ</Label>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger id="category-filter">
                      <SelectValue placeholder="বিভাগ ফিল্টার" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">সব বিভাগ</SelectItem>
                      <SelectItem value="payment">পেমেন্ট</SelectItem>
                      <SelectItem value="service">সেবা</SelectItem>
                      <SelectItem value="product">পণ্য</SelectItem>
                      <SelectItem value="delivery">ডেলিভারি</SelectItem>
                      <SelectItem value="other">অন্যান্য</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>সাধারণ প্রশ্নোত্তর</CardTitle>
              <CardDescription>আপনার প্রশ্নের উত্তর খুঁজুন</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium flex items-center gap-2">
                  <HelpCircle className="h-4 w-4 text-primary" />
                  কিভাবে রিফান্ড অনুরোধ করব?
                </h3>
                <p className="text-sm text-muted-foreground">
                  রিফান্ড অনুরোধ করতে, অর্ডার ডিটেইলস পেজে যান এবং "রিফান্ড অনুরোধ" বাটনে ক্লিক করুন। আপনার অনুরোধ ৪৮ ঘন্টার মধ্যে পর্যালোচনা করা হবে।
                </p>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium flex items-center gap-2">
                  <HelpCircle className="h-4 w-4 text-primary" />
                  ডিসপিউট রেজোলিউশনে কত সময় লাগে?
                </h3>
                <p className="text-sm text-muted-foreground">
                  আমরা সাধারণত ৭২ ঘন্টার মধ্যে ডিসপিউট সমাধান করি। জটিল ক্ষেত্রে, এটি আরও কিছু দিন নিতে পারে।
                </p>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium flex items-center gap-2">
                  <HelpCircle className="h-4 w-4 text-primary" />
                  ডিসপিউট পেন্ডিং থাকা অবস্থায় আমি কি পুনরায় অর্ডার করতে পারব?
                </h3>
                <p className="text-sm text-muted-foreground">
                  হ্যাঁ, আপনি একটি ডিসপিউট পেন্ডিং থাকা অবস্থায়ও অর্ডার করতে পারবেন। এটি আপনার অ্যাকাউন্টের ব্যবহার বা অন্যান্য লেনদেনকে প্রভাবিত করবে না।
                </p>
              </div>
              
              <Button variant="outline" className="w-full">
                সব FAQs দেখুন
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-2">
          {selectedDispute ? (
            <Card>
              <CardHeader className="pb-3">
                <div className="flex justify-between">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="mb-2"
                    onClick={() => setSelectedDispute(null)}
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    ফিরে যান
                  </Button>
                  
                  {getStatusBadge(selectedDispute.status)}
                </div>
                <CardTitle>{selectedDispute.title}</CardTitle>
                <div className="flex flex-wrap gap-2 mt-2">
                  {getCategoryBadge(selectedDispute.category)}
                  {getPriorityBadge(selectedDispute.priority)}
                  <Badge variant="outline">আইডি: {selectedDispute.id}</Badge>
                  <Badge variant="outline">অর্ডার: {selectedDispute.orderId}</Badge>
                </div>
                <CardDescription className="mt-2">
                  {selectedDispute.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-md p-4 mb-4">
                  <h3 className="font-medium mb-2">ডিসপিউট বিবরণ</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-muted-foreground">পরিমাণ:</div>
                    <div className="font-medium">৳{selectedDispute.amount}</div>
                    
                    <div className="text-muted-foreground">কাউন্টারপার্টি:</div>
                    <div className="font-medium">{selectedDispute.counterparty}</div>
                    
                    <div className="text-muted-foreground">তারিখ:</div>
                    <div className="font-medium">{new Date(selectedDispute.createdAt).toLocaleDateString()}</div>
                    
                    <div className="text-muted-foreground">আপডেট:</div>
                    <div className="font-medium">{new Date(selectedDispute.updatedAt).toLocaleDateString()}</div>
                  </div>
                </div>
                
                <h3 className="font-medium mb-3">মেসেজ</h3>
                <div className="space-y-4 mb-4 max-h-96 overflow-y-auto">
                  {selectedDispute.messages.map((message) => (
                    <div 
                      key={message.id}
                      className={`flex ${message.sender === 'আমি' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.isAdmin 
                            ? 'bg-primary/10 text-primary-foreground' 
                            : message.sender === 'আমি' 
                              ? 'bg-primary text-primary-foreground' 
                              : 'bg-muted'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm">
                            {message.sender}
                            {message.isAdmin && <Badge className="ml-2 text-xs" variant="outline">অফিশিয়াল</Badge>}
                          </span>
                        </div>
                        <p>{message.content}</p>
                        <div className="text-xs mt-1 opacity-70 text-right">
                          {new Date(message.timestamp).toLocaleTimeString()} | {new Date(message.timestamp).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {selectedDispute.status !== 'resolved' && selectedDispute.status !== 'closed' && (
                  <div className="flex gap-2">
                    <Textarea 
                      placeholder="আপনার মেসেজ লিখুন..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <Button 
                      className="shrink-0" 
                      onClick={handleSubmitMessage}
                      disabled={!newMessage.trim()}
                    >
                      পাঠান
                    </Button>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                {selectedDispute.status === 'resolved' ? (
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="h-5 w-5" />
                    <span>এই ডিসপিউট সমাধান করা হয়েছে</span>
                  </div>
                ) : selectedDispute.status === 'closed' ? (
                  <div className="flex items-center gap-2 text-gray-500">
                    <XCircle className="h-5 w-5" />
                    <span>এই ডিসপিউট বন্ধ করা হয়েছে</span>
                  </div>
                ) : (
                  <>
                    <Button variant="outline">ডিসপিউট ক্লোজ করুন</Button>
                    {selectedDispute.status === 'pending' && (
                      <Button variant="outline" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                        এসকেলেট করুন
                      </Button>
                    )}
                  </>
                )}
              </CardFooter>
            </Card>
          ) : (
            <>
              <Tabs defaultValue="active" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="w-full mb-6">
                  <TabsTrigger value="active" className="flex-1">অ্যাকটিভ ডিসপিউট</TabsTrigger>
                  <TabsTrigger value="resolved" className="flex-1">সমাধানকৃত ডিসপিউট</TabsTrigger>
                </TabsList>
                
                <TabsContent value={activeTab} className="mt-0">
                  {filteredDisputes.length === 0 ? (
                    <Card>
                      <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                        <AlertTriangle className="h-12 w-12 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold mb-2">কোন ডিসপিউট পাওয়া যায়নি</h3>
                        <p className="text-muted-foreground mb-4">
                          {activeTab === 'active' 
                            ? 'আপনার কোন অ্যাকটিভ ডিসপিউট নেই। আপনি সহজেই নতুন ডিসপিউট দাখিল করতে পারেন।'
                            : 'আপনার কোন সমাধানকৃত ডিসপিউট নেই।'
                          }
                        </p>
                        <Button 
                          variant="outline" 
                          onClick={() => setShowNewDisputeForm(true)}
                        >
                          নতুন ডিসপিউট
                        </Button>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="space-y-4">
                      {filteredDisputes.map((dispute) => (
                        <Card key={dispute.id} className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow" onClick={() => setSelectedDispute(dispute)}>
                          <CardContent className="p-0">
                            <div className="p-4">
                              <div className="flex items-center justify-between mb-2">
                                <h3 className="font-medium">{dispute.title}</h3>
                                {getStatusBadge(dispute.status)}
                              </div>
                              
                              <div className="flex flex-wrap gap-2 mb-2">
                                {getCategoryBadge(dispute.category)}
                                <Badge variant="outline">আইডি: {dispute.id}</Badge>
                                <Badge variant="outline">অর্ডার: {dispute.orderId}</Badge>
                              </div>
                              
                              <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                                {dispute.description}
                              </p>
                              
                              <div className="flex flex-wrap justify-between text-xs text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  <span>{new Date(dispute.createdAt).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <MessageSquare className="h-3 w-3" />
                                  <span>{dispute.messages.length} মেসেজ</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <FileText className="h-3 w-3" />
                                  <span>৳{dispute.amount}</span>
                                </div>
                              </div>
                            </div>
                            
                            {dispute.status === 'pending' && (
                              <div className="bg-yellow-50 border-t border-yellow-100 p-2 flex items-center justify-between">
                                <div className="flex items-center gap-2 text-yellow-700 text-sm">
                                  <Clock className="h-4 w-4" />
                                  <span>রিভিউ করা হচ্ছে</span>
                                </div>
                                <Button variant="ghost" size="sm" className="text-sm h-7">
                                  বিস্তারিত দেখুন
                                </Button>
                              </div>
                            )}
                            
                            {dispute.status === 'in-progress' && (
                              <div className="bg-blue-50 border-t border-blue-100 p-2 flex items-center justify-between">
                                <div className="flex items-center gap-2 text-blue-700 text-sm">
                                  <MessageSquare className="h-4 w-4" />
                                  <span>আপডেট আছে</span>
                                </div>
                                <Button variant="ghost" size="sm" className="text-sm h-7">
                                  বিস্তারিত দেখুন
                                </Button>
                              </div>
                            )}
                            
                            {dispute.status === 'resolved' && (
                              <div className="bg-green-50 border-t border-green-100 p-2 flex items-center justify-between">
                                <div className="flex items-center gap-2 text-green-700 text-sm">
                                  <ShieldCheck className="h-4 w-4" />
                                  <span>সমাধান করা হয়েছে</span>
                                </div>
                                <Button variant="ghost" size="sm" className="text-sm h-7">
                                  বিস্তারিত দেখুন
                                </Button>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DisputeCenter;
