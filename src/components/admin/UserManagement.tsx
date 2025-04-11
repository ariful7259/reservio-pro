
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { 
  UserCog, 
  User, 
  UserCheck, 
  UserX, 
  ShieldCheck, 
  History, 
  FileText,
  Search,
  PlusCircle,
  Edit,
  Trash2,
  Filter,
  ActivitySquare,
  CheckCircle,
  AlertCircle,
  BookmarkX,
  Eye,
  Clock
} from 'lucide-react';

// মক ডাটা 
const MOCK_USERS = [
  { 
    id: 'usr-001', 
    name: 'আরিফ রহমান', 
    email: 'arif@example.com', 
    phone: '০১৭১২৩৪৫৬৭৮', 
    role: 'admin', 
    status: 'active', 
    verified: true, 
    kycStatus: 'approved',
    joinDate: '১৫ জানুয়ারি, ২০২৫', 
    lastLogin: '১০ মিনিট আগে',
    avatar: 'https://i.pravatar.cc/150?img=1'
  },
  { 
    id: 'usr-002', 
    name: 'মরিয়ম খান', 
    email: 'moriyom@example.com', 
    phone: '০১৮১২৩৪৫৬৭৮', 
    role: 'moderator', 
    status: 'active', 
    verified: true, 
    kycStatus: 'pending',
    joinDate: '২৩ ফেব্রুয়ারি, ২০২৫', 
    lastLogin: '১ ঘন্টা আগে',
    avatar: 'https://i.pravatar.cc/150?img=2'
  },
  { 
    id: 'usr-003', 
    name: 'করিম মিয়া', 
    email: 'karim@example.com', 
    phone: '০১৯১২৩৪৫৬৭৮', 
    role: 'user', 
    status: 'suspended', 
    verified: false, 
    kycStatus: 'rejected',
    joinDate: '১০ মার্চ, ২০২৫', 
    lastLogin: '৫ দিন আগে',
    avatar: 'https://i.pravatar.cc/150?img=3'
  },
  { 
    id: 'usr-004', 
    name: 'সাদিয়া আক্তার', 
    email: 'sadia@example.com', 
    phone: '০১৭৮৯০১২৩৪৫', 
    role: 'user', 
    status: 'active', 
    verified: true, 
    kycStatus: 'pending',
    joinDate: '৫ এপ্রিল, ২০২৫', 
    lastLogin: '১২ ঘন্টা আগে',
    avatar: 'https://i.pravatar.cc/150?img=4'
  },
  { 
    id: 'usr-005', 
    name: 'আব্দুল্লাহ খান', 
    email: 'abdullah@example.com', 
    phone: '০১৬১২৩৪৫৬৭৮', 
    role: 'user', 
    status: 'active', 
    verified: true, 
    kycStatus: 'not_submitted',
    joinDate: '১২ মার্চ, ২০২৫', 
    lastLogin: '২ দিন আগে',
    avatar: 'https://i.pravatar.cc/150?img=5'
  }
];

const MOCK_ACTIVITIES = [
  { 
    id: 'act-001', 
    userId: 'usr-001', 
    userName: 'আরিফ রহমান', 
    action: 'লগইন', 
    details: 'সফল লগইন [IP: ১০৩.১১২.৭১.২৩]', 
    timestamp: '১০ মিনিট আগে',
    status: 'success'
  },
  { 
    id: 'act-002', 
    userId: 'usr-002', 
    userName: 'মরিয়ম খান', 
    action: 'পাসওয়ার্ড রিসেট', 
    details: 'পাসওয়ার্ড রিসেট রিকোয়েস্ট', 
    timestamp: '৩০ মিনিট আগে',
    status: 'warning'
  },
  { 
    id: 'act-003', 
    userId: 'usr-003', 
    userName: 'করিম মিয়া', 
    action: 'প্রোফাইল আপডেট', 
    details: 'কন্টাক্ট ইনফরমেশন আপডেট করা হয়েছে', 
    timestamp: '১ ঘন্টা আগে',
    status: 'info'
  },
  { 
    id: 'act-004', 
    userId: 'usr-004', 
    userName: 'সাদিয়া আক্তার', 
    action: 'KYC সাবমিশন', 
    details: 'KYC ডকুমেন্ট সাবমিট করা হয়েছে', 
    timestamp: '৩ ঘন্টা আগে',
    status: 'info'
  },
  { 
    id: 'act-005', 
    userId: 'usr-001', 
    userName: 'আরিফ রহমান', 
    action: 'ইউজার আপডেট', 
    details: 'ইউজার "মরিয়ম খান" এর রোল পরিবর্তন করা হয়েছে', 
    timestamp: '৫ ঘন্টা আগে',
    status: 'success'
  }
];

const UserManagement: React.FC = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState(MOCK_USERS);
  const [activities, setActivities] = useState(MOCK_ACTIVITIES);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // ইউজার ফিল্টারিং
  const filteredUsers = users.filter(user => {
    // সার্চ ফিল্টার
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.includes(searchQuery);
    
    // রোল ফিল্টার
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    
    // স্ট্যাটাস ফিল্টার
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  // ইউজার স্ট্যাটাস পরিবর্তন
  const handleStatusChange = (userId: string, newStatus: 'active' | 'suspended' | 'blocked') => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    ));
    
    toast({
      title: "স্ট্যাটাস আপডেট হয়েছে",
      description: `ইউজারের স্ট্যাটাস ${newStatus === 'active' ? 'সক্রিয়' : newStatus === 'suspended' ? 'সাসপেন্ডেড' : 'ব্লক'} করা হয়েছে।`,
    });
  };

  // রোল পরিবর্তন
  const handleRoleChange = (userId: string, newRole: string) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, role: newRole } : user
    ));
    
    toast({
      title: "রোল আপডেট হয়েছে",
      description: `ইউজারের রোল ${newRole === 'admin' ? 'অ্যাডমিন' : newRole === 'moderator' ? 'মডারেটর' : 'সাধারণ ব্যবহারকারী'} হিসাবে আপডেট করা হয়েছে।`,
    });
  };

  // KYC স্ট্যাটাস পরিবর্তন
  const handleKycStatusChange = (userId: string, newStatus: string) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, kycStatus: newStatus } : user
    ));
    
    toast({
      title: "KYC স্ট্যাটাস আপডেট হয়েছে",
      description: `ইউজারের KYC স্ট্যাটাস ${newStatus === 'approved' ? 'অনুমোদিত' : newStatus === 'rejected' ? 'প্রত্যাখ্যাত' : 'পেন্ডিং'} হিসাবে আপডেট করা হয়েছে।`,
    });
  };

  // ভেরিফিকেশন স্ট্যাটাস পরিবর্তন
  const handleVerificationChange = (userId: string, verified: boolean) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, verified } : user
    ));
    
    toast({
      title: "ভেরিফিকেশন স্ট্যাটাস আপডেট হয়েছে",
      description: `ইউজারের ভেরিফিকেশন স্ট্যাটাস ${verified ? 'ভেরিফাইড' : 'আনভেরিফাইড'} হিসাবে আপডেট করা হয়েছে।`,
    });
  };

  // ইউজার অ্যাকাউন্ট ডিলিট করা
  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId));
    
    toast({
      title: "অ্যাকাউন্ট ডিলিট করা হয়েছে",
      description: "ইউজার অ্যাকাউন্ট সফলভাবে ডিলিট করা হয়েছে।",
    });
  };

  // স্ট্যাটাস ব্যাজের কালার
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'active':
        return 'default';
      case 'suspended':
        return 'warning';
      case 'blocked':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  // KYC স্ট্যাটাস ব্যাজের কালার
  const getKycStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'approved':
        return 'default';
      case 'pending':
        return 'warning';
      case 'rejected':
        return 'destructive';
      case 'not_submitted':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  // অ্যাকটিভিটি স্ট্যাটাস ব্যাজের কালার
  const getActivityStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'success':
        return 'default';
      case 'warning':
        return 'warning';
      case 'error':
        return 'destructive';
      case 'info':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">ব্যবহারকারী ম্যানেজমেন্ট</h2>
          <p className="text-muted-foreground">সমস্ত ব্যবহারকারী, রোল, ও অ্যাকটিভিটি পরিচালনা করুন</p>
        </div>
        <Button>
          <PlusCircle className="h-4 w-4 mr-2" />
          নতুন ব্যবহারকারী
        </Button>
      </div>

      <Tabs defaultValue="users">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="users">ব্যবহারকারী</TabsTrigger>
          <TabsTrigger value="kyc">KYC ভেরিফিকেশন</TabsTrigger>
          <TabsTrigger value="activity">অ্যাকটিভিটি লগ</TabsTrigger>
        </TabsList>
        
        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>ব্যবহারকারী তালিকা</CardTitle>
                <div className="flex gap-2">
                  <Select value={roleFilter} onValueChange={setRoleFilter}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="সব রোল" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">সব রোল</SelectItem>
                      <SelectItem value="admin">অ্যাডমিন</SelectItem>
                      <SelectItem value="moderator">মডারেটর</SelectItem>
                      <SelectItem value="user">সাধারণ ব্যবহারকারী</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="সব স্ট্যাটাস" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">সব স্ট্যাটাস</SelectItem>
                      <SelectItem value="active">সক্রিয়</SelectItem>
                      <SelectItem value="suspended">সাসপেন্ডেড</SelectItem>
                      <SelectItem value="blocked">ব্লক</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex items-center gap-2 pt-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="ব্যবহারকারী খুঁজুন..." 
                  className="flex-1"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredUsers.length > 0 ? filteredUsers.map(user => (
                  <div key={user.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full overflow-hidden">
                          <img 
                            src={user.avatar} 
                            alt={user.name} 
                            className="h-full w-full object-cover" 
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{user.name}</h3>
                            {user.verified && (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {user.email} • {user.phone}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Badge variant={getStatusBadgeVariant(user.status)}>
                          {user.status === 'active' ? 'সক্রিয়' : 
                           user.status === 'suspended' ? 'সাসপেন্ডেড' : 'ব্লক'}
                        </Badge>
                        <Badge variant="outline">
                          {user.role === 'admin' ? 'অ্যাডমিন' : 
                           user.role === 'moderator' ? 'মডারেটর' : 'সাধারণ ব্যবহারকারী'}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 mt-4">
                      <div>
                        <p className="text-sm text-muted-foreground">যোগদান তারিখ</p>
                        <p>{user.joinDate}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">সর্বশেষ লগইন</p>
                        <p>{user.lastLogin}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">KYC স্ট্যাটাস</p>
                        <Badge variant={getKycStatusBadgeVariant(user.kycStatus)}>
                          {user.kycStatus === 'approved' ? 'অনুমোদিত' : 
                           user.kycStatus === 'pending' ? 'পেন্ডিং' : 
                           user.kycStatus === 'rejected' ? 'প্রত্যাখ্যাত' : 'জমা দেওয়া হয়নি'}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center mt-4 pt-4 border-t">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-2">
                          <Label htmlFor={`verified-${user.id}`}>ভেরিফিকেশন:</Label>
                          <Switch 
                            id={`verified-${user.id}`} 
                            checked={user.verified}
                            onCheckedChange={(checked) => handleVerificationChange(user.id, checked)}
                          />
                        </div>
                        
                        <Separator orientation="vertical" className="h-6 mx-2" />
                        
                        <Select 
                          defaultValue={user.role}
                          onValueChange={(value) => handleRoleChange(user.id, value)}
                        >
                          <SelectTrigger className="h-8 w-[150px]">
                            <SelectValue placeholder="রোল পরিবর্তন" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="admin">অ্যাডমিন</SelectItem>
                            <SelectItem value="moderator">মডারেটর</SelectItem>
                            <SelectItem value="user">সাধারণ ব্যবহারকারী</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-1" />
                          বিস্তারিত
                        </Button>
                        
                        <Select 
                          defaultValue={user.status}
                          onValueChange={(value) => handleStatusChange(user.id, value as 'active' | 'suspended' | 'blocked')}
                        >
                          <SelectTrigger className="h-8 w-[150px]">
                            <SelectValue placeholder="স্ট্যাটাস পরিবর্তন" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">সক্রিয়</SelectItem>
                            <SelectItem value="suspended">সাসপেন্ড</SelectItem>
                            <SelectItem value="blocked">ব্লক</SelectItem>
                          </SelectContent>
                        </Select>
                        
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )) : (
                  <div className="text-center py-8">
                    <UserX className="h-12 w-12 mx-auto text-muted-foreground" />
                    <p className="mt-4 text-muted-foreground">কোনো ব্যবহারকারী পাওয়া যায়নি</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="kyc" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>KYC ভেরিফিকেশন রিকোয়েস্ট</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {users.filter(user => user.kycStatus === 'pending').length > 0 ? (
                  users.filter(user => user.kycStatus === 'pending').map(user => (
                    <div key={user.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full overflow-hidden">
                            <img 
                              src={user.avatar} 
                              alt={user.name} 
                              className="h-full w-full object-cover" 
                            />
                          </div>
                          <div>
                            <h3 className="font-medium">{user.name}</h3>
                            <div className="text-sm text-muted-foreground">
                              {user.email} • {user.phone}
                            </div>
                          </div>
                        </div>
                        
                        <Badge variant="warning">পেন্ডিং ভেরিফিকেশন</Badge>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 mt-4">
                        <div>
                          <p className="text-sm text-muted-foreground">আবেদনের তারিখ</p>
                          <p>১০ এপ্রিল, ২০২৫</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">ডকুমেন্ট টাইপ</p>
                          <p>আইডি কার্ড ও পাসপোর্ট</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">স্ট্যাটাস</p>
                          <Badge variant="warning">রিভিউ পেন্ডিং</Badge>
                        </div>
                      </div>
                      
                      <div className="flex justify-end items-center gap-2 mt-4 pt-4 border-t">
                        <Button 
                          size="sm" 
                          variant="outline"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          ডকুমেন্ট দেখুন
                        </Button>
                        <Button 
                          size="sm" 
                          variant="default"
                          onClick={() => handleKycStatusChange(user.id, 'approved')}
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          অনুমোদন করুন
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => handleKycStatusChange(user.id, 'rejected')}
                        >
                          <AlertCircle className="h-4 w-4 mr-2" />
                          প্রত্যাখ্যান করুন
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 mx-auto text-muted-foreground" />
                    <p className="mt-4 text-muted-foreground">কোনো পেন্ডিং KYC রিকোয়েস্ট নেই</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>সমস্ত KYC আবেদন</CardTitle>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="সব স্ট্যাটাস" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">সব স্ট্যাটাস</SelectItem>
                    <SelectItem value="approved">অনুমোদিত</SelectItem>
                    <SelectItem value="pending">পেন্ডিং</SelectItem>
                    <SelectItem value="rejected">প্রত্যাখ্যাত</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="w-full caption-bottom text-sm">
                  <thead className="border-b">
                    <tr>
                      <th className="h-12 px-4 text-left align-middle font-medium">ব্যবহারকারী</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">ডকুমেন্ট টাইপ</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">জমা তারিখ</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">স্ট্যাটাস</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">অ্যাকশন</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user.id} className="border-b">
                        <td className="p-4 align-middle">
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full overflow-hidden">
                              <img 
                                src={user.avatar} 
                                alt={user.name} 
                                className="h-full w-full object-cover" 
                              />
                            </div>
                            <div>
                              <div className="font-medium">{user.name}</div>
                              <div className="text-xs text-muted-foreground">{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 align-middle">
                          {user.kycStatus !== 'not_submitted' ? 'আইডি কার্ড ও পাসপোর্ট' : '-'}
                        </td>
                        <td className="p-4 align-middle">
                          {user.kycStatus !== 'not_submitted' ? user.joinDate : '-'}
                        </td>
                        <td className="p-4 align-middle">
                          <Badge variant={getKycStatusBadgeVariant(user.kycStatus)}>
                            {user.kycStatus === 'approved' ? 'অনুমোদিত' : 
                             user.kycStatus === 'pending' ? 'পেন্ডিং' : 
                             user.kycStatus === 'rejected' ? 'প্রত্যাখ্যাত' : 'জমা দেওয়া হয়নি'}
                          </Badge>
                        </td>
                        <td className="p-4 align-middle">
                          {user.kycStatus !== 'not_submitted' && (
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>অ্যাকটিভিটি লগ</CardTitle>
                <div className="flex gap-2">
                  <Input 
                    placeholder="লগ সার্চ করুন..."
                    className="w-[200px]"
                  />
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activities.map((activity) => (
                  <div key={activity.id} className="flex items-center gap-4 p-3 border rounded-lg">
                    <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
                      <ActivitySquare className="h-5 w-5" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{activity.userName}</h3>
                        <Badge variant={getActivityStatusBadgeVariant(activity.status)}>
                          {activity.action}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{activity.details}</p>
                    </div>
                    
                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{activity.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>লগইন হিস্ট্রি</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="w-full caption-bottom text-sm">
                  <thead className="border-b">
                    <tr>
                      <th className="h-12 px-4 text-left align-middle font-medium">ব্যবহারকারী</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">IP ঠিকানা</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">ডিভাইস</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">লোকেশন</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">স্ট্যাটাস</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">সময়</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-4 align-middle">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full overflow-hidden">
                            <img 
                              src="https://i.pravatar.cc/150?img=1" 
                              alt="ইউজার" 
                              className="h-full w-full object-cover" 
                            />
                          </div>
                          <div className="font-medium">আরিফ রহমান</div>
                        </div>
                      </td>
                      <td className="p-4 align-middle">১০৩.১১২.৭১.২৩</td>
                      <td className="p-4 align-middle">আইফোন ১৩ (সাফারি)</td>
                      <td className="p-4 align-middle">ঢাকা, বাংলাদেশ</td>
                      <td className="p-4 align-middle">
                        <Badge variant="default">সফল</Badge>
                      </td>
                      <td className="p-4 align-middle">১০ মিনিট আগে</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 align-middle">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full overflow-hidden">
                            <img 
                              src="https://i.pravatar.cc/150?img=2" 
                              alt="ইউজার" 
                              className="h-full w-full object-cover" 
                            />
                          </div>
                          <div className="font-medium">মরিয়ম খান</div>
                        </div>
                      </td>
                      <td className="p-4 align-middle">১০৩.১১২.৭২.৪১</td>
                      <td className="p-4 align-middle">স্যামসাং (ক্রোম)</td>
                      <td className="p-4 align-middle">চট্টগ্রাম, বাংলাদেশ</td>
                      <td className="p-4 align-middle">
                        <Badge variant="default">সফল</Badge>
                      </td>
                      <td className="p-4 align-middle">১ ঘন্টা আগে</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 align-middle">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full overflow-hidden">
                            <img 
                              src="https://i.pravatar.cc/150?img=3" 
                              alt="ইউজার" 
                              className="h-full w-full object-cover" 
                            />
                          </div>
                          <div className="font-medium">করিম মিয়া</div>
                        </div>
                      </td>
                      <td className="p-4 align-middle">১৯৮.৫৪.১২.১০</td>
                      <td className="p-4 align-middle">উইন্ডোজ (ফায়ারফক্স)</td>
                      <td className="p-4 align-middle">সিলেট, বাংলাদেশ</td>
                      <td className="p-4 align-middle">
                        <Badge variant="destructive">ব্যর্থ</Badge>
                      </td>
                      <td className="p-4 align-middle">৩ ঘন্টা আগে</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserManagement;
