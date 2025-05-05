
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  Check,
  Flag,
  File,
  MessageSquare,
  AlertTriangle,
  Clock,
  FileText,
  Search,
  ShieldCheck,
  User,
  HelpCircle,
  Send
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface Dispute {
  id: string;
  transactionId: string;
  title: string;
  description: string;
  status: 'open' | 'investigating' | 'resolved' | 'closed';
  createdAt: string;
  updatedAt: string;
  category: string;
  messages: DisputeMessage[];
}

interface DisputeMessage {
  id: string;
  sender: 'user' | 'support' | 'system';
  senderName: string;
  message: string;
  timestamp: string;
  attachments?: { name: string; url: string }[];
}

const DisputeCenter = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  
  const [activeTab, setActiveTab] = useState<string>('open');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [newMessage, setNewMessage] = useState<string>('');
  const [selectedDispute, setSelectedDispute] = useState<Dispute | null>(null);
  
  // মক ডাটা - রিয়েল সিস্টেমে এটি ডাটাবেস থেকে আসবে
  const disputes: Dispute[] = [
    {
      id: 'DISP1001',
      transactionId: 'TX123458',
      title: 'সার্ভিস পেমেন্ট ডিসপিউট',
      description: 'প্লাম্বিং কাজ সম্পন্ন হয়নি কিন্তু পেমেন্ট চাওয়া হচ্ছে',
      status: 'open',
      createdAt: '২০২৫-০৫-০৪',
      updatedAt: '২০২৫-০৫-০৪',
      category: 'সার্ভিস',
      messages: [
        {
          id: 'm1',
          sender: 'user',
          senderName: 'আপনি',
          message: 'আমি প্লাম্বিং সার্ভিস বুক করেছিলাম কিন্তু কাজ সম্পন্ন হয়নি। সার্ভিস প্রোভাইডার কাজ অসম্পূর্ণ রেখে চলে গেছেন এবং পুরো পেমেন্ট দাবি করছেন।',
          timestamp: '২০২৫-০৫-০৪, ১১:৩০ AM',
        },
        {
          id: 'm2',
          sender: 'system',
          senderName: 'সিস্টেম',
          message: 'আপনার ডিসপিউট সফলভাবে সাবমিট করা হয়েছে। আমাদের সাপোর্ট টিম ২৪ ঘন্টার মধ্যে যোগাযোগ করবে।',
          timestamp: '২০২৫-০৫-০৪, ১১:৩১ AM',
        },
        {
          id: 'm3',
          sender: 'support',
          senderName: 'সাপোর্ট টিম',
          message: 'আপনার ডিসপিউট সম্পর্কে আমরা অবগত আছি। দয়া করে সার্ভিস সম্পর্কে আরো বিস্তারিত তথ্য এবং ছবি থাকলে আপলোড করুন।',
          timestamp: '২০২৫-০৫-০৪, ০২:১৫ PM',
        }
      ]
    },
    {
      id: 'DISP1002',
      transactionId: 'TX123459',
      title: 'ইলেক্ট্রিক রিপেয়ার সার্ভিস রিফান্ড',
      description: 'সার্ভিস প্রোভাইডারের সাথে যোগাযোগ করা যাচ্ছে না',
      status: 'investigating',
      createdAt: '২০২৫-০৪-২৮',
      updatedAt: '২০২৫-০৫-০২',
      category: 'রিফান্ড',
      messages: [
        {
          id: 'm1',
          sender: 'user',
          senderName: 'আপনি',
          message: 'আমি ইলেক্ট্রিক রিপেয়ারের জন্য বুকিং করেছিলাম কিন্তু সার্ভিস প্রোভাইডার আসেননি। অনেকবার ফোন করার পরও যোগাযোগ করা যাচ্ছে না।',
          timestamp: '২০২৫-০৪-২৮, ১০:০০ AM',
          attachments: [
            { name: 'বুকিং_কনফার্মেশন.pdf', url: '#' }
          ]
        },
        {
          id: 'm2',
          sender: 'support',
          senderName: 'সাপোর্ট টিম',
          message: 'আমরা সার্ভিস প্রোভাইডারের সাথে যোগাযোগ করার চেষ্টা করছি। আপনার সমস্যা সমাধানের জন্য আমরা কাজ করছি।',
          timestamp: '২০২৫-০৪-২৯, ১১:৩০ AM',
        },
        {
          id: 'm3',
          sender: 'user',
          senderName: 'আপনি',
          message: 'এখনো কোন যোগাযোগ হয়নি। দয়া করে রিফান্ড প্রক্রিয়া শুরু করুন।',
          timestamp: '২০২৫-০৫-০১, ০৯:১৫ AM',
        },
        {
          id: 'm4',
          sender: 'support',
          senderName: 'সাপোর্ট টিম',
          message: 'আমরা আপনার রিফান্ড রিকোয়েস্ট প্রসেস করছি। আমাদের সিস্টেমে দেখা যাচ্ছে সার্ভিস প্রোভাইডার বুকিং ক্যান্সেল করেননি। আমরা বিষয়টি তদন্ত করছি।',
          timestamp: '২০২৫-০৫-০২, ১০:৩০ AM',
        }
      ]
    },
    {
      id: 'DISP1003',
      transactionId: 'TX123450',
      title: 'ভুল পেমেন্ট',
      description: 'ভুল অ্যাকাউন্টে পেমেন্ট পাঠানো হয়েছে',
      status: 'resolved',
      createdAt: '২০২৫-০৪-২০',
      updatedAt: '২০২৫-০৪-২৫',
      category: 'পেমেন্ট',
      messages: [
        {
          id: 'm1',
          sender: 'user',
          senderName: 'আপনি',
          message: 'আমি ভুল অ্যাকাউন্টে পেমেন্ট পাঠিয়েছি। কীভাবে এটি ফেরত পাব?',
          timestamp: '২০২৫-০৪-২০, ১০:০০ AM',
        },
        {
          id: 'm2',
          sender: 'support',
          senderName: 'সাপোর্ট টিম',
          message: 'আমরা আপনার সমস্যা বুঝতে পেরেছি। দয়া করে পেমেন্ট ট্রানজেকশন রিসিপ্ট আপলোড করুন।',
          timestamp: '২০২৫-০৪-২০, ১১:৩০ AM',
        },
        {
          id: 'm3',
          sender: 'system',
          senderName: 'সিস্টেম',
          message: 'আপনার দাখিল করা ডকুমেন্ট ভেরিফাই করা হয়েছে।',
          timestamp: '২০২৫-০৪-২২, ০৯:১৫ AM',
        },
        {
          id: 'm4',
          sender: 'support',
          senderName: 'সাপোর্ট টিম',
          message: 'আপনার পেমেন্ট সফলভাবে রিফান্ড করা হয়েছে। দয়া করে আপনার অ্যাকাউন্ট চেক করুন।',
          timestamp: '২০২৫-০৪-২৫, ১০:৩০ AM',
        },
        {
          id: 'm5',
          sender: 'system',
          senderName: 'সিস্টেম',
          message: 'ডিসপিউট সফলভাবে সমাধান করা হয়েছে এবং কেস বন্ধ করা হয়েছে।',
          timestamp: '২০২৫-০৪-২৫, ১০:৩১ AM',
        }
      ]
    }
  ];
  
  // ফিল্টার করা ডিসপিউটস
  const filteredDisputes = disputes.filter(dispute => {
    // ট্যাব ফিল্টার
    if (activeTab === 'open' && (dispute.status !== 'open' && dispute.status !== 'investigating')) return false;
    if (activeTab === 'resolved' && dispute.status !== 'resolved') return false;
    if (activeTab === 'closed' && dispute.status !== 'closed') return false;
    
    // সার্চ ফিল্টার
    if (searchQuery && !dispute.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !dispute.id.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !dispute.transactionId.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });
  
  // ডিসপিউট সিলেক্ট করার হ্যান্ডলার
  const handleSelectDispute = (dispute: Dispute) => {
    setSelectedDispute(dispute);
  };
  
  // নতুন মেসেজ পাঠানোর হ্যান্ডলার
  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedDispute) return;
    
    // সিমুলেট মেসেজ সেন্ডিং
    toast({
      title: "মেসেজ পাঠানো হয়েছে",
      description: "আপনার মেসেজ সফলভাবে পাঠানো হয়েছে",
    });
    
    // ফেক মেসেজ যোগ করতে ইমুটেবলভাবে আপডেট
    const updatedDispute = {
      ...selectedDispute,
      messages: [
        ...selectedDispute.messages,
        {
          id: `m${selectedDispute.messages.length + 1}`,
          sender: 'user' as const,
          senderName: 'আপনি',
          message: newMessage,
          timestamp: new Date().toLocaleString('bn-BD', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
          })
        }
      ]
    };
    
    setSelectedDispute(updatedDispute);
    setNewMessage('');
    
    // সিমুলেট সাপোর্ট টিম রেসপন্স (রিয়েল সিস্টেমে এটি ডাটাবেস ইভেন্ট থেকে আসতে পারে)
    setTimeout(() => {
      const autoResponse = {
        ...updatedDispute,
        messages: [
          ...updatedDispute.messages,
          {
            id: `m${updatedDispute.messages.length + 2}`,
            sender: 'support' as const,
            senderName: 'সাপোর্ট টিম',
            message: 'আপনার মেসেজ প্রাপ্ত হয়েছে। আমরা যত দ্রুত সম্ভব প্রতিক্রিয়া জানাবো।',
            timestamp: new Date().toLocaleString('bn-BD', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              hour12: true
            })
          }
        ]
      };
      
      setSelectedDispute(autoResponse);
    }, 1000);
  };
  
  // স্ট্যাটাস ব্যাজ রেন্ডার করার ফাংশন
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return <Badge className="bg-red-500">অপেক্ষমান</Badge>;
      case 'investigating':
        return <Badge className="bg-yellow-500">তদন্ত চলছে</Badge>;
      case 'resolved':
        return <Badge className="bg-green-500">সমাধান হয়েছে</Badge>;
      case 'closed':
        return <Badge className="bg-gray-500">বন্ধ</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="container py-20 px-4">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">ডিসপিউট সেন্টার</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* ডিসপিউট লিস্ট */}
        <div className="lg:col-span-4 space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex justify-between items-center">
                <span>আপনার ডিসপিউটসমূহ</span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate('/create-dispute')}
                >
                  <Flag className="h-4 w-4 mr-2" />
                  নতুন ডিসপিউট
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative mb-4">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  type="text" 
                  placeholder="ডিসপিউট সার্চ করুন" 
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Tabs defaultValue="open" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="open">অপেক্ষমান</TabsTrigger>
                  <TabsTrigger value="resolved">সমাধান</TabsTrigger>
                  <TabsTrigger value="closed">বন্ধ</TabsTrigger>
                </TabsList>
                
                <TabsContent value={activeTab} className="mt-0 space-y-4">
                  {filteredDisputes.length === 0 ? (
                    <div className="text-center py-8">
                      <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                      <h3 className="text-lg font-medium mb-1">কোন ডিসপিউট নেই</h3>
                      <p className="text-sm text-muted-foreground">
                        এই মুহূর্তে কোন {activeTab === 'open' ? 'অপেক্ষমান' : activeTab === 'resolved' ? 'সমাধানকৃত' : 'বন্ধ'} ডিসপিউট নেই
                      </p>
                    </div>
                  ) : (
                    filteredDisputes.map(dispute => (
                      <div 
                        key={dispute.id}
                        className={`p-3 rounded-md border cursor-pointer transition-colors ${
                          selectedDispute?.id === dispute.id 
                            ? 'bg-primary/10 border-primary/20' 
                            : 'hover:bg-muted/40'
                        }`}
                        onClick={() => handleSelectDispute(dispute)}
                      >
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium truncate">{dispute.title}</h3>
                          {renderStatusBadge(dispute.status)}
                        </div>
                        
                        <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                          <span>{dispute.id}</span>
                          <span>•</span>
                          <span>{dispute.category}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 mt-2 text-xs">
                          <Calendar className="h-3 w-3" />
                          <span>{dispute.updatedAt}</span>
                          <span className="flex-1"></span>
                          <MessageSquare className="h-3 w-3" />
                          <span>{dispute.messages.length}</span>
                        </div>
                      </div>
                    ))
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>সাপোর্ট সেন্টার</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-md">
                <ShieldCheck className="h-8 w-8 text-primary bg-primary/10 p-1.5 rounded-full" />
                <div>
                  <h4 className="font-medium">লাইভ সাপোর্ট</h4>
                  <p className="text-sm text-muted-foreground">
                    সকাল ৯টা থেকে রাত ১০টা পর্যন্ত
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-md">
                <FileText className="h-8 w-8 text-primary bg-primary/10 p-1.5 rounded-full" />
                <div>
                  <h4 className="font-medium">FAQ</h4>
                  <p className="text-sm text-muted-foreground">
                    ডিসপিউট সম্পর্কে জানুন
                  </p>
                </div>
              </div>
              
              <Button className="w-full">
                <MessageSquare className="h-4 w-4 mr-2" />
                সাপোর্ট চ্যাট
              </Button>
            </CardContent>
          </Card>
        </div>
        
        {/* ডিসপিউট ডিটেইলস */}
        <div className="lg:col-span-8">
          {selectedDispute ? (
            <Card className="h-full flex flex-col">
              <CardHeader className="pb-3 border-b">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <CardTitle>{selectedDispute.title}</CardTitle>
                      {renderStatusBadge(selectedDispute.status)}
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                      <span>আইডি: {selectedDispute.id}</span>
                      <span>•</span>
                      <span>ট্রানজেকশন: {selectedDispute.transactionId}</span>
                      <span>•</span>
                      <span>তারিখ: {selectedDispute.createdAt}</span>
                    </div>
                  </div>
                  
                  <Button variant="outline" size="sm">
                    <File className="h-4 w-4 mr-2" />
                    রিপোর্ট
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="flex-1 p-0 flex flex-col">
                {/* স্ট্যাটাস ইনফো */}
                {selectedDispute.status === 'investigating' && (
                  <Alert className="m-4 bg-yellow-50 border-yellow-200 text-yellow-800">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>তদন্ত চলছে</AlertTitle>
                    <AlertDescription>
                      আমাদের টিম আপনার ডিসপিউট নিয়ে কাজ করছে। সমাধান পেতে আরও ২৪-৪৮ ঘন্টা সময় লাগতে পারে।
                    </AlertDescription>
                  </Alert>
                )}
                
                {selectedDispute.status === 'resolved' && (
                  <Alert className="m-4 bg-green-50 border-green-200 text-green-800">
                    <Check className="h-4 w-4" />
                    <AlertTitle>সমাধান হয়েছে</AlertTitle>
                    <AlertDescription>
                      আপনার ডিসপিউট সফলভাবে সমাধান করা হয়েছে। আপনি যদি আমাদের সেবা নিয়ে সন্তুষ্ট না হন তবে পুনরায় ডিসপিউট খুলতে পারেন।
                    </AlertDescription>
                  </Alert>
                )}
                
                {/* মেসেজ লিস্ট */}
                <div className="flex-1 p-4 overflow-y-auto space-y-4">
                  {selectedDispute.messages.map((message) => (
                    <div 
                      key={message.id}
                      className={`flex gap-4 max-w-[85%] ${message.sender === 'user' ? 'ml-auto flex-row-reverse' : message.sender === 'system' ? 'mx-auto' : ''}`}
                    >
                      {message.sender !== 'system' && (
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                          message.sender === 'user' 
                            ? 'bg-primary/10 text-primary' 
                            : 'bg-muted text-foreground'
                        }`}>
                          {message.sender === 'user' ? (
                            <User className="h-5 w-5" />
                          ) : (
                            <ShieldCheck className="h-5 w-5" />
                          )}
                        </div>
                      )}
                      
                      <div className={`rounded-lg p-3 ${
                        message.sender === 'user' 
                          ? 'bg-primary text-primary-foreground' 
                          : message.sender === 'system'
                          ? 'bg-muted/80 text-foreground text-sm text-center'
                          : 'bg-muted text-foreground'
                      }`}>
                        {message.sender !== 'user' && message.sender !== 'system' && (
                          <div className="font-medium text-sm mb-1">{message.senderName}</div>
                        )}
                        
                        <div>{message.message}</div>
                        
                        {message.attachments && message.attachments.length > 0 && (
                          <div className="mt-2 space-y-1">
                            {message.attachments.map((attachment, index) => (
                              <a 
                                key={index}
                                href={attachment.url}
                                className="text-xs flex items-center gap-1 bg-black/10 px-2 py-1 rounded"
                              >
                                <File className="h-3 w-3" />
                                {attachment.name}
                              </a>
                            ))}
                          </div>
                        )}
                        
                        <div className="text-xs mt-1 opacity-70">{message.timestamp}</div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* রেসপন্স ইনপুট */}
                {selectedDispute.status !== 'closed' && (
                  <div className="p-4 border-t bg-background">
                    <div className="flex gap-2">
                      <Textarea 
                        placeholder="আপনার মেসেজ লিখুন..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="flex-1 min-h-[80px]"
                      />
                      <Button 
                        className="self-end"
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="flex justify-between items-center mt-2">
                      <div className="text-xs text-muted-foreground">
                        <Clock className="h-3 w-3 inline mr-1" />
                        রেসপন্স টাইম: সাধারণত ১২ ঘন্টার মধ্যে
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <File className="h-3.5 w-3.5 mr-1" />
                          আপলোড
                        </Button>
                        
                        {selectedDispute.status === 'resolved' && (
                          <Button variant="outline" size="sm">
                            <Check className="h-3.5 w-3.5 mr-1" />
                            ডিসপিউট বন্ধ করুন
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card className="h-full flex items-center justify-center p-10">
              <div className="text-center">
                <HelpCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-xl font-semibold mb-2">কোন ডিসপিউট সিলেক্ট করা হয়নি</h2>
                <p className="text-muted-foreground mb-6">
                  বিস্তারিত দেখতে বাম দিক থেকে একটি ডিসপিউট সিলেক্ট করুন অথবা নতুন ডিসপিউট তৈরি করুন
                </p>
                <Button onClick={() => navigate('/create-dispute')}>
                  <Flag className="h-4 w-4 mr-2" />
                  নতুন ডিসপিউট তৈরি করুন
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default DisputeCenter;
