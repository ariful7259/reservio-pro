
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { 
  Ticket, 
  User, 
  AlertTriangle, 
  Check, 
  CheckCircle, 
  X, 
  Search, 
  Filter, 
  Clock, 
  MessageSquare, 
  Tag, 
  Settings, 
  FileText, 
  BarChart, 
  ArrowUpRight, 
  Star, 
  Plus, 
  RefreshCw,
  Mail,
  HelpCircle,
  Folder
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SupportTicket = () => {
  const [activeTab, setActiveTab] = useState('all');
  const { toast } = useToast();
  
  // Mock tickets data
  const tickets = [
    {
      id: 'TKT-1025',
      subject: 'প্রোডাক্ট ডেলিভারি সম্পর্কে',
      priority: 'high',
      category: 'ডেলিভারি',
      status: 'open',
      createdAt: '2023-12-15T10:30:00',
      updatedAt: '2023-12-15T15:45:00',
      user: {
        name: 'রহিম আহমেদ',
        avatar: 'https://i.pravatar.cc/150?img=32',
        email: 'rahim@example.com',
      },
      assignedTo: {
        name: 'মেহেদী হাসান',
        avatar: 'https://i.pravatar.cc/150?img=56',
      },
      messages: [
        {
          id: 1,
          user: 'রহিম আহমেদ',
          isAdmin: false,
          message: 'আমার অর্ডার করা প্রোডাক্ট এখনো পৌঁছায়নি। অর্ডার নম্বর #ORDER-8542',
          time: '10:30 AM',
        },
        {
          id: 2,
          user: 'মেহেদী হাসান',
          isAdmin: true,
          message: 'অসংখ্য ধন্যবাদ আমাদের সাথে যোগাযোগ করার জন্য। আমরা আপনার অর্ডার চেক করছি এবং শীঘ্রই ফিরে আসব।',
          time: '11:45 AM',
        },
      ],
    },
    {
      id: 'TKT-1024',
      subject: 'পাসওয়ার্ড রিসেট সমস্যা',
      priority: 'medium',
      category: 'অ্যাকাউন্ট',
      status: 'pending',
      createdAt: '2023-12-14T09:20:00',
      updatedAt: '2023-12-14T14:30:00',
      user: {
        name: 'ফাতেমা খাতুন',
        avatar: 'https://i.pravatar.cc/150?img=23',
        email: 'fatema@example.com',
      },
      assignedTo: {
        name: 'তানিয়া ইসলাম',
        avatar: 'https://i.pravatar.cc/150?img=45',
      },
      messages: [
        {
          id: 1,
          user: 'ফাতেমা খাতুন',
          isAdmin: false,
          message: 'আমি পাসওয়ার্ড রিসেট করার চেষ্টা করছি কিন্তু কোন ইমেইল পাচ্ছি না।',
          time: '09:20 AM',
        },
      ],
    },
    {
      id: 'TKT-1023',
      subject: 'রিফান্ড রিকোয়েস্ট',
      priority: 'high',
      category: 'পেমেন্ট',
      status: 'closed',
      createdAt: '2023-12-13T14:15:00',
      updatedAt: '2023-12-13T18:30:00',
      user: {
        name: 'করিম খান',
        avatar: 'https://i.pravatar.cc/150?img=67',
        email: 'karim@example.com',
      },
      assignedTo: {
        name: 'জাহিদ হাসান',
        avatar: 'https://i.pravatar.cc/150?img=54',
      },
      messages: [
        {
          id: 1,
          user: 'করিম খান',
          isAdmin: false,
          message: 'আমি অর্ডার #ORDER-7542 এর জন্য রিফান্ড চাই কারণ প্রোডাক্ট ডেমেজড ছিল।',
          time: '2:15 PM',
        },
        {
          id: 2,
          user: 'জাহিদ হাসান',
          isAdmin: true,
          message: 'আমরা আপনার রিফান্ড অনুমোদন করেছি। ৩-৫ কার্যদিবসের মধ্যে আপনার অ্যাকাউন্টে রিফান্ড পাবেন।',
          time: '4:30 PM',
        },
        {
          id: 3,
          user: 'করিম খান',
          isAdmin: false,
          message: 'ধন্যবাদ! আমি রিফান্ড পেয়েছি।',
          time: '6:15 PM',
        },
      ],
    },
    {
      id: 'TKT-1022',
      subject: 'প্রোমো কোড কাজ করছে না',
      priority: 'low',
      category: 'প্রোমোশন',
      status: 'open',
      createdAt: '2023-12-12T11:45:00',
      updatedAt: '2023-12-12T13:20:00',
      user: {
        name: 'তানভীর আহমেদ',
        avatar: 'https://i.pravatar.cc/150?img=43',
        email: 'tanvir@example.com',
      },
      assignedTo: null,
      messages: [
        {
          id: 1,
          user: 'তানভীর আহমেদ',
          isAdmin: false,
          message: 'আমি DISCOUNT50 প্রোমো কোড ব্যবহার করতে পারছি না, এটি বলছে অবৈধ।',
          time: '11:45 AM',
        },
      ],
    },
    {
      id: 'TKT-1021',
      subject: 'অ্যাপে লগইন করতে পারছি না',
      priority: 'medium',
      category: 'অ্যাপ সমস্যা',
      status: 'pending',
      createdAt: '2023-12-11T13:10:00',
      updatedAt: '2023-12-11T15:40:00',
      user: {
        name: 'সুমাইয়া হক',
        avatar: 'https://i.pravatar.cc/150?img=12',
        email: 'sumaiya@example.com',
      },
      assignedTo: {
        name: 'মেহেদী হাসান',
        avatar: 'https://i.pravatar.cc/150?img=56',
      },
      messages: [
        {
          id: 1,
          user: 'সুমাইয়া হক',
          isAdmin: false,
          message: 'অ্যাপে লগইন করার সময় "সার্ভার এরর" দেখাচ্ছে। কয়েকবার চেষ্টা করেছি।',
          time: '1:10 PM',
        },
        {
          id: 2,
          user: 'মেহেদী হাসান',
          isAdmin: true,
          message: 'অসুবিধার জন্য দুঃখিত। আমরা টেকনিকাল টিমকে জানিয়েছি। আপনি অ্যাপ আপডেট করেছেন?',
          time: '2:30 PM',
        },
      ],
    }
  ];
  
  // Response templates
  const responseTemplates = [
    {
      id: 1,
      title: 'স্বাগতম জবাব',
      body: 'অসংখ্য ধন্যবাদ আমাদের সাথে যোগাযোগ করার জন্য। আমরা আপনার মেসেজ পেয়েছি এবং শীঘ্রই বিস্তারিত জানাব।',
    },
    {
      id: 2,
      title: 'অর্ডার স্ট্যাটাস',
      body: 'আপনার অর্ডার প্রসেস করা হচ্ছে এবং শীঘ্রই শিপ করা হবে। আপনি ট্র্যাকিং আপডেট পাবেন আপনার রেজিস্টার্ড ইমেইলে।',
    },
    {
      id: 3,
      title: 'রিফান্ড সম্পর্কিত',
      body: 'আমরা আপনার রিফান্ড রিকোয়েস্ট প্রসেস করেছি। আপনার অ্যাকাউন্টে ৩-৫ কার্যদিবসের মধ্যে রিফান্ড দেখতে পাবেন।',
    },
    {
      id: 4,
      title: 'টেকনিকাল সমস্যা',
      body: 'আপনার রিপোর্ট করা সমস্যাটি আমরা দেখছি। আমাদের টেকনিকাল টিম সমাধানের চেষ্টা করছে এবং শীঘ্রই আপনাকে জানাব।',
    },
    {
      id: 5,
      title: 'সাপোর্ট ধন্যবাদ',
      body: 'আমাদের সাথে যোগাযোগ করার জন্য ধন্যবাদ। আপনার মতামত আমাদের পরিষেবা উন্নত করতে সাহায্য করে। কোন প্রশ্ন থাকলে জানাবেন।',
    },
  ];
  
  // Sample support agents for assignment
  const supportAgents = [
    { id: 1, name: 'মেহেদী হাসান', avatar: 'https://i.pravatar.cc/150?img=56', activeCases: 3, speciality: 'টেকনিকাল সাপোর্ট' },
    { id: 2, name: 'তানিয়া ইসলাম', avatar: 'https://i.pravatar.cc/150?img=45', activeCases: 2, speciality: 'পেমেন্ট সাপোর্ট' },
    { id: 3, name: 'জাহিদ হাসান', avatar: 'https://i.pravatar.cc/150?img=54', activeCases: 4, speciality: 'অ্যাকাউন্ট সাপোর্ট' },
    { id: 4, name: 'সাদিয়া আক্তার', avatar: 'https://i.pravatar.cc/150?img=23', activeCases: 1, speciality: 'প্রোডাক্ট সাপোর্ট' },
    { id: 5, name: 'রাকিব হোসেন', avatar: 'https://i.pravatar.cc/150?img=57', activeCases: 2, speciality: 'ডেলিভারি সাপোর্ট' },
  ];
  
  // Ticket categories
  const ticketCategories = [
    { id: 1, name: 'অ্যাকাউন্ট', count: 45 },
    { id: 2, name: 'পেমেন্ট', count: 32 },
    { id: 3, name: 'ডেলিভারি', count: 28 },
    { id: 4, name: 'প্রোডাক্ট', count: 24 },
    { id: 5, name: 'টেকনিকাল', count: 18 },
    { id: 6, name: 'অন্যান্য', count: 12 },
  ];
  
  // Satisfaction survey questions
  const satisfactionSurveyQuestions = [
    { id: 1, question: 'আমাদের সাপোর্ট কেমন ছিল?', type: 'rating' },
    { id: 2, question: 'আপনার সমস্যা দ্রুত সমাধান হয়েছিল?', type: 'yesno' },
    { id: 3, question: 'সাপোর্ট এজেন্ট কেমন সাহায্য করেছিলেন?', type: 'rating' },
    { id: 4, question: 'আমাদের সার্ভিস কি উন্নত করতে পারি?', type: 'text' },
  ];
  
  // Performance metrics
  const performanceMetrics = {
    responseTime: {
      value: '3.2 ঘন্টা',
      change: '-15%',
      improved: true
    },
    resolutionTime: {
      value: '12.5 ঘন্টা',
      change: '-8%',
      improved: true
    },
    satisfactionRate: {
      value: '92%',
      change: '+5%',
      improved: true
    },
    firstResponseResolution: {
      value: '65%',
      change: '+3%',
      improved: true
    },
    reopenedTickets: {
      value: '4%',
      change: '-2%',
      improved: true
    }
  };
  
  // Get tickets by filter
  const getFilteredTickets = () => {
    if (activeTab === 'all') return tickets;
    if (activeTab === 'open') return tickets.filter(ticket => ticket.status === 'open');
    if (activeTab === 'pending') return tickets.filter(ticket => ticket.status === 'pending');
    if (activeTab === 'closed') return tickets.filter(ticket => ticket.status === 'closed');
    if (activeTab === 'unassigned') return tickets.filter(ticket => !ticket.assignedTo);
    if (activeTab === 'highPriority') return tickets.filter(ticket => ticket.priority === 'high');
    return tickets;
  };
  
  // Handle assigning ticket
  const handleAssignTicket = (ticketId, agentId) => {
    const agent = supportAgents.find(agent => agent.id === agentId);
    toast({
      title: 'টিকেট অ্যাসাইন করা হয়েছে',
      description: `${agent.name} এখন টিকেট #${ticketId} হ্যান্ডল করবেন।`,
    });
  };
  
  // Handle updating ticket status
  const handleUpdateStatus = (ticketId, status) => {
    toast({
      title: 'টিকেট স্ট্যাটাস আপডেট করা হয়েছে',
      description: `টিকেট #${ticketId} এখন ${status} অবস্থায় আছে।`,
    });
  };
  
  // Handle sending response
  const handleSendResponse = (ticketId) => {
    toast({
      title: 'রেসপন্স পাঠানো হয়েছে',
      description: `টিকেট #${ticketId} এ রেসপন্স সফলভাবে পাঠানো হয়েছে।`,
    });
  };
  
  // Handle creating a new ticket
  const handleCreateTicket = () => {
    toast({
      title: 'নতুন টিকেট তৈরি করা হয়েছে',
      description: 'টিকেট আইডি: TKT-1026',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold">সাপোর্ট টিকেট ম্যানেজমেন্ট</h1>
        
        <div className="flex flex-wrap gap-2">
          <Button className="flex items-center gap-2" onClick={handleCreateTicket}>
            <Plus className="h-4 w-4" />
            নতুন টিকেট
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            রিফ্রেশ
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col-reverse lg:flex-row gap-6">
        {/* টিকেট লিস্ট সেকশন */}
        <div className="lg:w-8/12 space-y-4">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="flex-1 flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input placeholder="টিকেট আইডি, ইউজার নাম, বা বিষয় খুঁজুন..." className="pl-10" />
              </div>
              
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
            
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="স্ট্যাটাস ফিল্টার" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">সকল টিকেট</SelectItem>
                <SelectItem value="open">ওপেন টিকেট</SelectItem>
                <SelectItem value="pending">পেন্ডিং টিকেট</SelectItem>
                <SelectItem value="closed">ক্লোজড টিকেট</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4 flex flex-wrap">
              <TabsTrigger value="all" className="flex items-center gap-1">
                <Ticket className="h-4 w-4" />
                সব
                <Badge>{tickets.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="open" className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4" />
                ওপেন
                <Badge>{tickets.filter(t => t.status === 'open').length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="pending" className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                পেন্ডিং
                <Badge>{tickets.filter(t => t.status === 'pending').length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="closed" className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4" />
                ক্লোজড
                <Badge>{tickets.filter(t => t.status === 'closed').length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="unassigned" className="flex items-center gap-1">
                <User className="h-4 w-4" />
                অ্যাসাইন নেই
                <Badge>{tickets.filter(t => !t.assignedTo).length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="highPriority" className="flex items-center gap-1">
                <AlertTriangle className="h-4 w-4" />
                হাই প্রায়োরিটি
                <Badge>{tickets.filter(t => t.priority === 'high').length}</Badge>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab} className="space-y-4">
              {getFilteredTickets().map((ticket) => (
                <Card key={ticket.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="p-4 flex flex-col sm:flex-row justify-between gap-4">
                      <div className="flex gap-4">
                        <Avatar>
                          <AvatarImage src={ticket.user.avatar} alt={ticket.user.name} />
                          <AvatarFallback>{ticket.user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{ticket.subject}</h3>
                            <Badge 
                              variant={
                                ticket.status === 'open' ? 'default' : 
                                ticket.status === 'pending' ? 'secondary' : 
                                'outline'
                              }
                            >
                              {ticket.status === 'open' ? 'ওপেন' : 
                               ticket.status === 'pending' ? 'পেন্ডিং' : 'ক্লোজড'}
                            </Badge>
                            <Badge 
                              variant="outline" 
                              className={
                                ticket.priority === 'high' ? 'border-red-500 text-red-500 bg-red-50' :
                                ticket.priority === 'medium' ? 'border-amber-500 text-amber-500 bg-amber-50' :
                                'border-green-500 text-green-500 bg-green-50'
                              }
                            >
                              {ticket.priority === 'high' ? 'হাই' : 
                               ticket.priority === 'medium' ? 'মিডিয়াম' : 'লো'}
                            </Badge>
                          </div>
                          
                          <div className="text-sm text-muted-foreground mt-1">
                            <span className="font-medium">{ticket.user.name}</span> - টিকেট #{ticket.id}
                          </div>
                          
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
                            <Tag className="h-3 w-3" />
                            <span>{ticket.category}</span>
                            <span className="mx-1">•</span>
                            <Clock className="h-3 w-3" />
                            <span>
                              {new Date(ticket.createdAt).toLocaleDateString('bn-BD', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-2">
                        {ticket.assignedTo ? (
                          <div className="flex items-center gap-2 border px-3 py-1 rounded-full">
                            <Avatar className="h-5 w-5">
                              <AvatarImage src={ticket.assignedTo.avatar} alt={ticket.assignedTo.name} />
                              <AvatarFallback>{ticket.assignedTo.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="text-xs">{ticket.assignedTo.name}</span>
                          </div>
                        ) : (
                          <Select onValueChange={(value) => handleAssignTicket(ticket.id, parseInt(value))}>
                            <SelectTrigger className="h-8 text-xs border-dashed">
                              <SelectValue placeholder="অ্যাসাইন করুন" />
                            </SelectTrigger>
                            <SelectContent>
                              {supportAgents.map((agent) => (
                                <SelectItem key={agent.id} value={agent.id.toString()}>
                                  <div className="flex items-center gap-2">
                                    <Avatar className="h-5 w-5">
                                      <AvatarImage src={agent.avatar} alt={agent.name} />
                                      <AvatarFallback>{agent.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <span>{agent.name}</span>
                                    <Badge variant="outline" className="ml-2">
                                      {agent.activeCases}
                                    </Badge>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                        
                        <div className="flex items-center gap-1">
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            onClick={() => handleUpdateStatus(ticket.id, 'closed')}
                            disabled={ticket.status === 'closed'}
                          >
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={() => handleUpdateStatus(ticket.id, 'pending')}
                            disabled={ticket.status === 'pending'}
                          >
                            <Clock className="h-4 w-4 text-amber-500" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={() => handleUpdateStatus(ticket.id, 'open')}
                            disabled={ticket.status === 'open'}
                          >
                            <MessageSquare className="h-4 w-4 text-blue-500" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="p-4 space-y-3">
                      <h4 className="font-medium">মেসেজ</h4>
                      
                      <div className="space-y-3 max-h-60 overflow-y-auto">
                        {ticket.messages.map((message) => (
                          <div 
                            key={message.id} 
                            className={`p-3 rounded-lg ${
                              message.isAdmin ? 'bg-blue-50 ml-4' : 'bg-gray-50 mr-4'
                            }`}
                          >
                            <div className="flex justify-between mb-2">
                              <span className="font-medium text-sm">{message.user}</span>
                              <span className="text-xs text-muted-foreground">{message.time}</span>
                            </div>
                            <p className="text-sm">{message.message}</p>
                          </div>
                        ))}
                      </div>
                      
                      <div className="pt-3">
                        <div className="flex gap-2 mb-2">
                          <Select>
                            <SelectTrigger className="w-[220px]">
                              <SelectValue placeholder="রেসপন্স টেমপ্লেট বাছাই করুন" />
                            </SelectTrigger>
                            <SelectContent>
                              {responseTemplates.map((template) => (
                                <SelectItem key={template.id} value={template.id.toString()}>
                                  {template.title}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          
                          <Button variant="outline" size="sm">
                            <ArrowUpRight className="h-4 w-4" />
                            <span className="ml-1">এস্কালেট</span>
                          </Button>
                        </div>
                        
                        <div className="flex gap-2">
                          <Textarea 
                            placeholder="আপনার রেসপন্স লিখুন..." 
                            className="flex-1"
                            rows={2}
                          />
                          <Button className="self-end" onClick={() => handleSendResponse(ticket.id)}>
                            পাঠান
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
        
        {/* সাইডবার সেকশন */}
        <div className="lg:w-4/12 space-y-6">
          {/* টিকেট স্ট্যাটিসটিক্স */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">টিকেট স্ট্যাটিসটিক্স</CardTitle>
            </CardHeader>
            <CardContent className="pb-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="border rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold">{tickets.length}</div>
                  <div className="text-sm text-muted-foreground">মোট টিকেট</div>
                </div>
                <div className="border rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold">{tickets.filter(t => t.status === 'open').length}</div>
                  <div className="text-sm text-muted-foreground">ওপেন টিকেট</div>
                </div>
                <div className="border rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold">{tickets.filter(t => t.status === 'pending').length}</div>
                  <div className="text-sm text-muted-foreground">পেন্ডিং টিকেট</div>
                </div>
                <div className="border rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold">{tickets.filter(t => t.status === 'closed').length}</div>
                  <div className="text-sm text-muted-foreground">ক্লোজড টিকেট</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* সাপোর্ট টিম */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">সাপোর্ট টিম</CardTitle>
            </CardHeader>
            <CardContent className="pb-3">
              <div className="space-y-3">
                {supportAgents.map((agent) => (
                  <div key={agent.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={agent.avatar} alt={agent.name} />
                        <AvatarFallback>{agent.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{agent.name}</div>
                        <div className="text-xs text-muted-foreground">{agent.speciality}</div>
                      </div>
                    </div>
                    <Badge variant="outline">{agent.activeCases} টিকেট</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* টিকেট ক্যাটাগরি */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">টিকেট ক্যাটাগরি</CardTitle>
            </CardHeader>
            <CardContent className="pb-3">
              <div className="space-y-2">
                {ticketCategories.map((category) => (
                  <div key={category.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Folder className="h-4 w-4 text-muted-foreground" />
                      <span>{category.name}</span>
                    </div>
                    <Badge variant="outline">{category.count}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                নতুন ক্যাটাগরি
              </Button>
            </CardFooter>
          </Card>
          
          {/* সাপোর্ট পারফরম্যান্স */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">সাপোর্ট পারফরম্যান্স</CardTitle>
            </CardHeader>
            <CardContent className="pb-3">
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>গড় রেসপন্স টাইম</span>
                    <span className={performanceMetrics.responseTime.improved ? 'text-green-600' : 'text-red-600'}>
                      {performanceMetrics.responseTime.change}
                    </span>
                  </div>
                  <div className="font-medium">{performanceMetrics.responseTime.value}</div>
                </div>
                
                <Separator />
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>গড় রেজোলিউশন টাইম</span>
                    <span className={performanceMetrics.resolutionTime.improved ? 'text-green-600' : 'text-red-600'}>
                      {performanceMetrics.resolutionTime.change}
                    </span>
                  </div>
                  <div className="font-medium">{performanceMetrics.resolutionTime.value}</div>
                </div>
                
                <Separator />
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>সন্তুষ্টি রেট</span>
                    <span className={performanceMetrics.satisfactionRate.improved ? 'text-green-600' : 'text-red-600'}>
                      {performanceMetrics.satisfactionRate.change}
                    </span>
                  </div>
                  <div className="font-medium">{performanceMetrics.satisfactionRate.value}</div>
                </div>
                
                <Separator />
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>ফার্স্ট রেসপন্স রেজোলিউশন</span>
                    <span className={performanceMetrics.firstResponseResolution.improved ? 'text-green-600' : 'text-red-600'}>
                      {performanceMetrics.firstResponseResolution.change}
                    </span>
                  </div>
                  <div className="font-medium">{performanceMetrics.firstResponseResolution.value}</div>
                </div>
                
                <Separator />
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>রিওপেনড টিকেট</span>
                    <span className={performanceMetrics.reopenedTickets.improved ? 'text-green-600' : 'text-red-600'}>
                      {performanceMetrics.reopenedTickets.change}
                    </span>
                  </div>
                  <div className="font-medium">{performanceMetrics.reopenedTickets.value}</div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                <BarChart className="h-4 w-4 mr-2" />
                বিস্তারিত রিপোর্ট
              </Button>
            </CardFooter>
          </Card>
          
          {/* সন্তুষ্টি সার্ভে */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">কাস্টমার সন্তুষ্টি সার্ভে</CardTitle>
              <CardDescription>সার্ভে প্রশ্ন কনফিগারেশন</CardDescription>
            </CardHeader>
            <CardContent className="pb-3">
              <div className="space-y-4">
                {satisfactionSurveyQuestions.map((question) => (
                  <div key={question.id} className="border rounded-lg p-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">{question.question}</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {question.type === 'rating' ? 'রেটিং (১-৫)' : 
                           question.type === 'yesno' ? 'হ্যাঁ/না' : 'টেক্সট উত্তর'}
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                নতুন প্রশ্ন
              </Button>
              <Button variant="outline" size="sm">
                <FileText className="h-4 w-4 mr-2" />
                সার্ভে রেজাল্ট
              </Button>
            </CardFooter>
          </Card>
          
          {/* অটো-রেসপন্স কনফিগারেশন */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">অটো-রেসপন্স কনফিগারেশন</CardTitle>
            </CardHeader>
            <CardContent className="pb-3">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-blue-500" />
                    <span>নতুন টিকেট কনফার্মেশন</span>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>টিকেট রেজোলভড</span>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-amber-500" />
                    <span>সার্ভে রিকোয়েস্ট</span>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-purple-500" />
                    <span>ইনঅ্যাকটিভ রিমাইন্ডার</span>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="h-4 w-4 text-red-500" />
                    <span>এস্কালেশন নোটিফিকেশন</span>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                নতুন অটো-রেসপন্স
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SupportTicket;
