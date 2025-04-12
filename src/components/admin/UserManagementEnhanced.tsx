
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
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
  Clock,
  Lock,
  Unlock,
  UserPlus,
  Mail,
  Phone,
  Key
} from 'lucide-react';

// Mock data for the user management module
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
    loginHistory: [
      { time: '১০ মিনিট আগে', ip: '১০৩.১১২.৭১.২৩', device: 'আইফোন ১৩', location: 'ঢাকা', status: 'success' },
      { time: '১ দিন আগে', ip: '১০৩.১১২.৭১.২৩', device: 'ম্যাকবুক', location: 'ঢাকা', status: 'success' },
    ],
    address: 'রহমান টাওয়ার, ৩/এ, বনানী, ঢাকা',
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
    loginHistory: [
      { time: '১ ঘন্টা আগে', ip: '১০৩.১১২.৭২.৪১', device: 'স্যামসাং', location: 'চট্টগ্রাম', status: 'success' },
      { time: '২ দিন আগে', ip: '১০৩.১১২.৭২.৪১', device: 'স্যামসাং', location: 'চট্টগ্রাম', status: 'success' },
    ],
    address: 'খান ম্যানশন, নূর আহমেদ রোড, চট্টগ্রাম',
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
    loginHistory: [
      { time: '৫ দিন আগে', ip: '১৯৮.৫৪.১২.১০', device: 'উইন্ডোজ', location: 'সিলেট', status: 'success' },
      { time: '৬ দিন আগে', ip: '১৯৮.৫৪.১২.১০', device: 'উইন্ডোজ', location: 'সিলেট', status: 'failed' },
    ],
    address: 'মিয়া ভিলা, জিন্দাবাজার রোড, সিলেট',
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
    loginHistory: [
      { time: '১২ ঘন্টা আগে', ip: '১০৩.৪৫.৭৮.৯০', device: 'আইফোন', location: 'ঢাকা', status: 'success' },
      { time: '২ দিন আগে', ip: '১০৩.৪৫.৭৮.৯০', device: 'আইফোন', location: 'ঢাকা', status: 'success' },
    ],
    address: 'আক্তার কমপ্লেক্স, মিরপুর-১০, ঢাকা',
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
    loginHistory: [
      { time: '২ দিন আগে', ip: '১০৫.৭৮.৬৭.২২', device: 'অপ্পো', location: 'কুমিল্লা', status: 'success' },
      { time: '৪ দিন আগে', ip: '১০৫.৭৮.৬৭.২২', device: 'অপ্পো', location: 'কুমিল্লা', status: 'success' },
    ],
    address: 'খান ভিলা, কান্দিরপাড়, কুমিল্লা',
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

// Sample KYC documents
const KYC_DOCUMENTS = {
  'usr-002': [
    { type: 'আইডি কার্ড', path: 'https://i.ibb.co/C8Mfvqx/nid-sample.jpg' },
    { type: 'সেলফি', path: 'https://i.pravatar.cc/150?img=2' }
  ],
  'usr-004': [
    { type: 'আইডি কার্ড', path: 'https://i.ibb.co/C8Mfvqx/nid-sample.jpg' },
    { type: 'সেলফি', path: 'https://i.pravatar.cc/150?img=4' }
  ],
};

const UserManagementEnhanced = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState(MOCK_USERS);
  const [activities, setActivities] = useState(MOCK_ACTIVITIES);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [kycFilter, setKycFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isUserFormOpen, setIsUserFormOpen] = useState(false);
  const [isUserDeleteDialogOpen, setIsUserDeleteDialogOpen] = useState(false);
  const [isKycViewOpen, setIsKycViewOpen] = useState(false);
  const [selectedKycDocuments, setSelectedKycDocuments] = useState<any[]>([]);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'user',
    status: 'active',
    verified: false,
    address: ''
  });

  // Filter users based on search query and filters
  const filteredUsers = users.filter(user => {
    // Search filter
    const matchesSearch = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.includes(searchQuery);
    
    // Role filter
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    
    // Status filter
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    
    // KYC filter
    const matchesKyc = kycFilter === 'all' || user.kycStatus === kycFilter;
    
    return matchesSearch && matchesRole && matchesStatus && matchesKyc;
  });

  // Handle user status change (active, suspended, blocked)
  const handleStatusChange = (userId: string, newStatus: 'active' | 'suspended' | 'blocked') => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    ));
    
    // Add activity log
    const user = users.find(u => u.id === userId);
    const statusText = newStatus === 'active' ? 'সক্রিয়' : newStatus === 'suspended' ? 'সাসপেন্ডেড' : 'ব্লক';
    addActivity(userId, user?.name || '', 'স্ট্যাটাস পরিবর্তন', `ইউজার স্ট্যাটাস ${statusText} করা হয়েছে`, 'info');

    toast({
      title: "স্ট্যাটাস আপডেট হয়েছে",
      description: `ইউজারের স্ট্যাটাস ${statusText} করা হয়েছে।`,
    });
  };

  // Handle role change (admin, moderator, user)
  const handleRoleChange = (userId: string, newRole: string) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, role: newRole } : user
    ));
    
    // Add activity log
    const user = users.find(u => u.id === userId);
    const roleText = newRole === 'admin' ? 'অ্যাডমিন' : newRole === 'moderator' ? 'মডারেটর' : 'সাধারণ ব্যবহারকারী';
    addActivity(userId, user?.name || '', 'রোল পরিবর্তন', `ইউজার রোল ${roleText} করা হয়েছে`, 'info');

    toast({
      title: "রোল আপডেট হয়েছে",
      description: `ইউজারের রোল ${roleText} হিসাবে আপডেট করা হয়েছে।`,
    });
  };

  // Handle KYC status change (approved, rejected, pending)
  const handleKycStatusChange = (userId: string, newStatus: string) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, kycStatus: newStatus } : user
    ));
    
    // Add activity log
    const user = users.find(u => u.id === userId);
    const statusText = newStatus === 'approved' ? 'অনুমোদিত' : newStatus === 'rejected' ? 'প্রত্যাখ্যাত' : 'পেন্ডিং';
    addActivity(userId, user?.name || '', 'KYC স্ট্যাটাস', `KYC স্ট্যাটাস ${statusText} করা হয়েছে`, newStatus === 'approved' ? 'success' : newStatus === 'rejected' ? 'error' : 'warning');

    toast({
      title: "KYC স্ট্যাটাস আপডেট হয়েছে",
      description: `ইউজারের KYC স্ট্যাটাস ${statusText} হিসাবে আপডেট করা হয়েছে।`,
    });
  };

  // Handle verification status change
  const handleVerificationChange = (userId: string, verified: boolean) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, verified } : user
    ));
    
    // Add activity log
    const user = users.find(u => u.id === userId);
    addActivity(userId, user?.name || '', 'ভেরিফিকেশন', `ইউজার ${verified ? 'ভেরিফাইড' : 'আনভেরিফাইড'} করা হয়েছে`, verified ? 'success' : 'warning');

    toast({
      title: "ভেরিফিকেশন স্ট্যাটাস আপডেট হয়েছে",
      description: `ইউজারের ভেরিফিকেশন স্ট্যাটাস ${verified ? 'ভেরিফাইড' : 'আনভেরিফাইড'} হিসাবে আপডেট করা হয়েছে।`,
    });
  };

  // Handle user deletion
  const handleDeleteUser = (userId: string) => {
    const userToDelete = users.find(user => user.id === userId);
    
    if (userToDelete) {
      setSelectedUser(userToDelete);
      setIsUserDeleteDialogOpen(true);
    }
  };

  // Confirm delete user
  const confirmDeleteUser = () => {
    if (selectedUser) {
      setUsers(users.filter(user => user.id !== selectedUser.id));
      addActivity('admin', 'Admin', 'ইউজার ডিলিট', `ইউজার "${selectedUser.name}" ডিলিট করা হয়েছে`, 'warning');
      
      toast({
        title: "অ্যাকাউন্ট ডিলিট করা হয়েছে",
        description: "ইউজার অ্যাকাউন্ট সফলভাবে ডিলিট করা হয়েছে।",
      });
      
      setIsUserDeleteDialogOpen(false);
      setSelectedUser(null);
    }
  };

  // Add new user
  const handleAddUser = () => {
    const id = `usr-${(users.length + 1).toString().padStart(3, '0')}`;
    const today = new Date();
    
    const newUserData = {
      ...newUser,
      id,
      kycStatus: 'not_submitted',
      joinDate: `${today.getDate()} ${today.toLocaleString('bn', { month: 'long' })}, ${today.getFullYear()}`,
      lastLogin: 'এখনো লগইন করেনি',
      loginHistory: [],
      avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`
    };
    
    setUsers([...users, newUserData]);
    addActivity('admin', 'Admin', 'নতুন ইউজার', `নতুন ইউজার "${newUser.name}" যোগ করা হয়েছে`, 'success');
    
    toast({
      title: "নতুন ইউজার যোগ করা হয়েছে",
      description: `"${newUser.name}" সফলভাবে সিস্টেমে যোগ করা হয়েছে।`,
    });
    
    setIsUserFormOpen(false);
    setNewUser({
      name: '',
      email: '',
      phone: '',
      role: 'user',
      status: 'active',
      verified: false,
      address: ''
    });
  };

  // View KYC documents
  const handleViewKycDocuments = (userId: string) => {
    const documents = KYC_DOCUMENTS[userId];
    
    if (documents) {
      setSelectedKycDocuments(documents);
      setIsKycViewOpen(true);
    } else {
      toast({
        title: "ডকুমেন্ট পাওয়া যায়নি",
        description: "এই ব্যবহারকারীর কোন KYC ডকুমেন্ট পাওয়া যায়নি।",
        variant: "destructive"
      });
    }
  };

  // Add activity to the activity log
  const addActivity = (userId: string, userName: string, action: string, details: string, status: 'success' | 'warning' | 'error' | 'info') => {
    const newActivity = {
      id: `act-${(activities.length + 1).toString().padStart(3, '0')}`,
      userId,
      userName,
      action,
      details,
      timestamp: 'এখন',
      status
    };
    
    setActivities([newActivity, ...activities]);
  };

  // Get status badge variant
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

  // Get KYC status badge variant
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

  // Get activity status badge variant
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

  // Get role label
  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin':
        return 'অ্যাডমিন';
      case 'moderator':
        return 'মডারেটর';
      case 'user':
        return 'সাধারণ ব্যবহারকারী';
      default:
        return role;
    }
  };

  // Get status label
  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return 'সক্রিয়';
      case 'suspended':
        return 'সাসপেন্ডেড';
      case 'blocked':
        return 'ব্লক';
      default:
        return status;
    }
  };

  // Get KYC status label
  const getKycStatusLabel = (status: string) => {
    switch (status) {
      case 'approved':
        return 'অনুমোদিত';
      case 'pending':
        return 'পেন্ডিং';
      case 'rejected':
        return 'প্রত্যাখ্যাত';
      case 'not_submitted':
        return 'জমা দেওয়া হয়নি';
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">ব্যবহারকারী ম্যানেজমেন্ট</h2>
          <p className="text-muted-foreground">সমস্ত ব্যবহারকারী, রোল, ও অ্যাকটিভিটি পরিচালনা করুন</p>
        </div>
        
        <Dialog open={isUserFormOpen} onOpenChange={setIsUserFormOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-[#2262C6] to-[#6E59A5]">
              <UserPlus className="h-4 w-4 mr-2" />
              নতুন ব্যবহারকারী যোগ করুন
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="text-xl">নতুন ব্যবহারকারী যোগ করুন</DialogTitle>
              <DialogDescription>
                নতুন ব্যবহারকারীর বিস্তারিত তথ্য পূরণ করুন।
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">নাম</Label>
                <Input
                  id="name"
                  placeholder="নাম লিখুন"
                  className="col-span-3"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">ইমেইল</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="ইমেইল লিখুন"
                  className="col-span-3"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">ফোন</Label>
                <Input
                  id="phone"
                  placeholder="ফোন নম্বর লিখুন"
                  className="col-span-3"
                  value={newUser.phone}
                  onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="address" className="text-right">ঠিকানা</Label>
                <Input
                  id="address"
                  placeholder="ঠিকানা লিখুন"
                  className="col-span-3"
                  value={newUser.address}
                  onChange={(e) => setNewUser({ ...newUser, address: e.target.value })}
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right">রোল</Label>
                <Select 
                  value={newUser.role}
                  onValueChange={(value) => setNewUser({ ...newUser, role: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="রোল নির্বাচন করুন" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">অ্যাডমিন</SelectItem>
                    <SelectItem value="moderator">মডারেটর</SelectItem>
                    <SelectItem value="user">সাধারণ ব্যবহারকারী</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">স্ট্যাটাস</Label>
                <Select 
                  value={newUser.status}
                  onValueChange={(value) => setNewUser({ ...newUser, status: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="স্ট্যাটাস নির্বাচন করুন" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">সক্রিয়</SelectItem>
                    <SelectItem value="suspended">সাসপেন্ডেড</SelectItem>
                    <SelectItem value="blocked">ব্লক</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="verified" className="text-right">ভেরিফাইড</Label>
                <div className="flex items-center space-x-2 col-span-3">
                  <Switch
                    id="verified"
                    checked={newUser.verified}
                    onCheckedChange={(checked) => setNewUser({ ...newUser, verified: checked })}
                  />
                  <Label htmlFor="verified">{newUser.verified ? 'হ্যাঁ' : 'না'}</Label>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button
                type="submit"
                onClick={handleAddUser}
                disabled={!newUser.name || !newUser.email || !newUser.phone}
                className="bg-gradient-to-r from-[#2262C6] to-[#6E59A5]"
              >
                সংরক্ষণ করুন
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="users" className="bg-white shadow-sm border rounded-lg overflow-hidden">
        <TabsList className="w-full justify-start p-0 h-auto bg-gray-50 border-b">
          <TabsTrigger className="py-3 px-6 data-[state=active]:bg-white rounded-none border-b-2 border-transparent data-[state=active]:border-[#2262C6]" value="users">
            <User className="h-4 w-4 mr-2" />
            ব্যবহারকারী
          </TabsTrigger>
          <TabsTrigger className="py-3 px-6 data-[state=active]:bg-white rounded-none border-b-2 border-transparent data-[state=active]:border-[#2262C6]" value="kyc">
            <ShieldCheck className="h-4 w-4 mr-2" />
            KYC ভেরিফিকেশন
          </TabsTrigger>
          <TabsTrigger className="py-3 px-6 data-[state=active]:bg-white rounded-none border-b-2 border-transparent data-[state=active]:border-[#2262C6]" value="activity">
            <ActivitySquare className="h-4 w-4 mr-2" />
            অ্যাকটিভিটি লগ
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="users" className="p-4 m-0">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="নাম, ইমেইল, ফোন দিয়ে সার্চ করুন..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-[180px]">
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
              <SelectTrigger className="w-[180px]">
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
          
          <div className="space-y-4">
            {filteredUsers.length > 0 ? (
              filteredUsers.map(user => (
                <Card key={user.id} className="overflow-hidden shadow-md bg-gradient-to-br from-white to-blue-50/30">
                  <CardContent className="p-0">
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 rounded-full overflow-hidden border border-gray-200 shadow-sm">
                            <img 
                              src={user.avatar} 
                              alt={user.name} 
                              className="h-full w-full object-cover" 
                            />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-gray-900">{user.name}</h3>
                              {user.verified && (
                                <Badge className="bg-gradient-to-r from-[#2262C6] to-[#2262C6]/80 h-5 px-1.5">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  ভেরিফাইড
                                </Badge>
                              )}
                            </div>
                            <div className="text-sm text-muted-foreground mt-0.5">
                              <div className="flex items-center gap-2">
                                <Mail className="h-3.5 w-3.5" />
                                <span>{user.email}</span>
                              </div>
                              <div className="flex items-center gap-2 mt-0.5">
                                <Phone className="h-3.5 w-3.5" />
                                <span>{user.phone}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-end gap-2">
                          <div className="flex gap-2">
                            <Badge variant={getStatusBadgeVariant(user.status)}>
                              {getStatusLabel(user.status)}
                            </Badge>
                            <Badge variant="outline" className="border-[#6E59A5] text-[#6E59A5]">
                              <Key className="h-3 w-3 mr-1" />
                              {getRoleLabel(user.role)}
                            </Badge>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            যোগদান: {user.joinDate}
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 mt-4">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">সর্বশেষ লগইন</p>
                          <div className="flex items-center">
                            <Clock className="h-3.5 w-3.5 mr-1.5 text-gray-500" />
                            <p className="text-sm">{user.lastLogin}</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">KYC স্ট্যাটাস</p>
                          <Badge variant={getKycStatusBadgeVariant(user.kycStatus)} className="bg-opacity-90">
                            {getKycStatusLabel(user.kycStatus)}
                          </Badge>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">ঠিকানা</p>
                          <p className="text-sm text-gray-600 truncate">{user.address || "কোন ঠিকানা নেই"}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center mt-2 p-4 pt-2 bg-gray-50 border-t">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1.5">
                          <Label htmlFor={`verified-${user.id}`} className="text-sm">ভেরিফিকেশন:</Label>
                          <Switch 
                            id={`verified-${user.id}`} 
                            checked={user.verified}
                            onCheckedChange={(checked) => handleVerificationChange(user.id, checked)}
                          />
                        </div>
                        
                        <Select 
                          defaultValue={user.role}
                          onValueChange={(value) => handleRoleChange(user.id, value)}
                        >
                          <SelectTrigger className="h-8 w-[150px] text-xs">
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
                        <Button size="sm" variant="outline" className="h-8 text-xs">
                          <Eye className="h-3.5 w-3.5 mr-1" />
                          বিস্তারিত
                        </Button>
                        
                        <Select 
                          defaultValue={user.status}
                          onValueChange={(value) => handleStatusChange(user.id, value as 'active' | 'suspended' | 'blocked')}
                        >
                          <SelectTrigger className="h-8 w-[150px] text-xs">
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
                          className="h-8 px-2"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed">
                <UserX className="h-12 w-12 mx-auto text-muted-foreground" />
                <p className="mt-4 text-muted-foreground">কোনো ব্যবহারকারী পাওয়া যায়নি</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setSearchQuery('');
                    setRoleFilter('all');
                    setStatusFilter('all');
                  }}
                >
                  ফিল্টার রিসেট করুন
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="kyc" className="p-4 m-0">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg font-semibold">KYC ভেরিফিকেশন রিকোয়েস্ট</h3>
              <p className="text-sm text-muted-foreground">সমস্ত KYC রিকোয়েস্ট দেখুন ও অনুমোদন করুন</p>
            </div>
            
            <Select value={kycFilter} onValueChange={setKycFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="সব KYC স্ট্যাটাস" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">সব স্ট্যাটাস</SelectItem>
                <SelectItem value="pending">পেন্ডিং</SelectItem>
                <SelectItem value="approved">অনুমোদিত</SelectItem>
                <SelectItem value="rejected">প্রত্যাখ্যাত</SelectItem>
                <SelectItem value="not_submitted">জমা দেওয়া হয়নি</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-4">
            {users.filter(user => user.kycStatus === 'pending').length > 0 ? (
              users.filter(user => user.kycStatus === 'pending').map(user => (
                <Card key={user.id} className="overflow-hidden shadow-md bg-gradient-to-br from-white to-amber-50/30">
                  <CardContent className="p-0">
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 rounded-full overflow-hidden border border-gray-200 shadow-sm">
                            <img 
                              src={user.avatar} 
                              alt={user.name} 
                              className="h-full w-full object-cover" 
                            />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{user.name}</h3>
                            <div className="text-sm text-muted-foreground mt-0.5">
                              <div className="flex items-center gap-2">
                                <Mail className="h-3.5 w-3.5" />
                                <span>{user.email}</span>
                              </div>
                              <div className="flex items-center gap-2 mt-0.5">
                                <Phone className="h-3.5 w-3.5" />
                                <span>{user.phone}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <Badge variant="warning" className="h-6">
                          <Clock className="h-3.5 w-3.5 mr-1.5" />
                          পেন্ডিং ভেরিফিকেশন
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 mt-4">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">আবেদনের তারিখ</p>
                          <p className="text-sm">১০ এপ্রিল, ২০২৫</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">ডকুমেন্ট টাইপ</p>
                          <p className="text-sm">আইডি কার্ড ও পাসপোর্ট</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">যোগদানের তারিখ</p>
                          <p className="text-sm">{user.joinDate}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end items-center gap-2 mt-2 p-4 pt-3 bg-gray-50 border-t">
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="h-9"
                        onClick={() => handleViewKycDocuments(user.id)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        ডকুমেন্ট দেখুন
                      </Button>
                      <Button 
                        size="sm" 
                        variant="default"
                        className="h-9 bg-gradient-to-r from-[#00A389] to-[#00A389]/80"
                        onClick={() => handleKycStatusChange(user.id, 'approved')}
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        অনুমোদন করুন
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        className="h-9"
                        onClick={() => handleKycStatusChange(user.id, 'rejected')}
                      >
                        <AlertCircle className="h-4 w-4 mr-2" />
                        প্রত্যাখ্যান করুন
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed">
                <FileText className="h-12 w-12 mx-auto text-muted-foreground" />
                <p className="mt-4 text-muted-foreground">কোনো পেন্ডিং KYC রিকোয়েস্ট নেই</p>
              </div>
            )}
          </div>
          
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">সমস্ত KYC আবেদন</h3>
            
            <Card className="shadow-md">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="py-3 px-4 text-left font-medium text-muted-foreground text-sm">ব্যবহারকারী</th>
                        <th className="py-3 px-4 text-left font-medium text-muted-foreground text-sm">ডকুমেন্ট টাইপ</th>
                        <th className="py-3 px-4 text-left font-medium text-muted-foreground text-sm">জমা তারিখ</th>
                        <th className="py-3 px-4 text-left font-medium text-muted-foreground text-sm">স্ট্যাটাস</th>
                        <th className="py-3 px-4 text-center font-medium text-muted-foreground text-sm">অ্যাকশন</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {users.map(user => (
                        <tr key={user.id} className="hover:bg-muted/20">
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <div className="h-10 w-10 rounded-full overflow-hidden">
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
                          <td className="p-4">
                            {user.kycStatus !== 'not_submitted' ? 'আইডি কার্ড ও পাসপোর্ট' : '-'}
                          </td>
                          <td className="p-4">
                            {user.kycStatus !== 'not_submitted' ? '১০ এপ্রিল, ২০২৫' : '-'}
                          </td>
                          <td className="p-4">
                            <Badge variant={getKycStatusBadgeVariant(user.kycStatus)}>
                              {getKycStatusLabel(user.kycStatus)}
                            </Badge>
                          </td>
                          <td className="p-4 text-center">
                            {user.kycStatus !== 'not_submitted' && (
                              <div className="flex justify-center">
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  className="h-9"
                                  onClick={() => handleViewKycDocuments(user.id)}
                                >
                                  <Eye className="h-4 w-4 mr-2" />
                                  দেখুন
                                </Button>
                                
                                {user.kycStatus === 'pending' && (
                                  <>
                                    <Button 
                                      size="sm" 
                                      variant="default" 
                                      className="h-9 ml-2 bg-[#00A389]"
                                      onClick={() => handleKycStatusChange(user.id, 'approved')}
                                    >
                                      <CheckCircle className="h-4 w-4" />
                                    </Button>
                                    <Button 
                                      size="sm" 
                                      variant="destructive" 
                                      className="h-9 ml-2"
                                      onClick={() => handleKycStatusChange(user.id, 'rejected')}
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </>
                                )}
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* KYC Documents Viewer Dialog */}
          <Dialog open={isKycViewOpen} onOpenChange={setIsKycViewOpen}>
            <DialogContent className="sm:max-w-[700px]">
              <DialogHeader>
                <DialogTitle>KYC ডকুমেন্ট</DialogTitle>
                <DialogDescription>
                  ব্যবহারকারীর জমা দেওয়া KYC ডকুমেন্ট
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid grid-cols-1 gap-4 py-4">
                {selectedKycDocuments.map((doc, index) => (
                  <div key={index} className="space-y-2">
                    <h4 className="font-medium">{doc.type}</h4>
                    <div className="border rounded-md overflow-hidden">
                      <img 
                        src={doc.path} 
                        alt={doc.type}
                        className="w-full h-auto" 
                      />
                    </div>
                  </div>
                ))}
              </div>
              
              <DialogFooter>
                <Button onClick={() => setIsKycViewOpen(false)}>বন্ধ করুন</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </TabsContent>
        
        <TabsContent value="activity" className="p-4 m-0">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg font-semibold">অ্যাকটিভিটি লগ</h3>
              <p className="text-sm text-muted-foreground">সমস্ত ব্যবহারকারী অ্যাকটিভিটি ও সিস্টেম লগ</p>
            </div>
            
            <div className="flex gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="লগ সার্চ করুন..."
                  className="pl-10 w-[250px]"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="space-y-3">
            {activities.map((activity) => (
              <Card key={activity.id} className="overflow-hidden shadow-sm border bg-white hover:shadow-md transition-shadow">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className={`
                    h-10 w-10 rounded-full flex items-center justify-center 
                    ${activity.status === 'success' ? 'bg-green-100 text-green-600' : 
                      activity.status === 'warning' ? 'bg-amber-100 text-amber-600' : 
                      activity.status === 'error' ? 'bg-red-100 text-red-600' : 
                      'bg-blue-100 text-blue-600'}
                  `}>
                    <ActivitySquare className="h-5 w-5" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{activity.userName}</h3>
                      <Badge variant={getActivityStatusBadgeVariant(activity.status)}>
                        {activity.action}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{activity.details}</p>
                  </div>
                  
                  <div className="text-sm text-muted-foreground flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{activity.timestamp}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">লগইন হিস্ট্রি</h3>
            
            <Card className="shadow-md">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="py-3 px-4 text-left font-medium text-muted-foreground text-sm">ব্যবহারকারী</th>
                        <th className="py-3 px-4 text-left font-medium text-muted-foreground text-sm">IP ঠিকানা</th>
                        <th className="py-3 px-4 text-left font-medium text-muted-foreground text-sm">ডিভাইস</th>
                        <th className="py-3 px-4 text-left font-medium text-muted-foreground text-sm">লোকেশন</th>
                        <th className="py-3 px-4 text-left font-medium text-muted-foreground text-sm">স্ট্যাটাস</th>
                        <th className="py-3 px-4 text-left font-medium text-muted-foreground text-sm">সময়</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {users.flatMap(user => 
                        (user.loginHistory || []).map((login, idx) => (
                          <tr key={`${user.id}-${idx}`} className="hover:bg-muted/20">
                            <td className="p-4">
                              <div className="flex items-center gap-2">
                                <div className="h-8 w-8 rounded-full overflow-hidden">
                                  <img 
                                    src={user.avatar} 
                                    alt={user.name}
                                    className="h-full w-full object-cover" 
                                  />
                                </div>
                                <div className="font-medium">{user.name}</div>
                              </div>
                            </td>
                            <td className="p-4">{login.ip}</td>
                            <td className="p-4">{login.device}</td>
                            <td className="p-4">{login.location}</td>
                            <td className="p-4">
                              <Badge variant={login.status === 'success' ? 'default' : 'destructive'}>
                                {login.status === 'success' ? 'সফল' : 'ব্যর্থ'}
                              </Badge>
                            </td>
                            <td className="p-4">{login.time}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* User Delete Confirmation Dialog */}
      <Dialog open={isUserDeleteDialogOpen} onOpenChange={setIsUserDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl text-red-600">ইউজার ডিলিট নিশ্চিত করুন</DialogTitle>
            <DialogDescription>
              আপনি কি নিশ্চিত যে আপনি এই ব্যবহারকারীকে ডিলিট করতে চান? এই কাজ ফিরিয়ে নেওয়া যাবে না।
            </DialogDescription>
          </DialogHeader>
          
          {selectedUser && (
            <div className="py-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-md">
                <div className="h-10 w-10 rounded-full overflow-hidden">
                  <img 
                    src={selectedUser.avatar} 
                    alt={selectedUser.name}
                    className="h-full w-full object-cover" 
                  />
                </div>
                <div>
                  <h4 className="font-medium">{selectedUser.name}</h4>
                  <p className="text-sm text-muted-foreground">{selectedUser.email}</p>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsUserDeleteDialogOpen(false)}
            >
              বাতিল করুন
            </Button>
            <Button 
              variant="destructive" 
              onClick={confirmDeleteUser}
            >
              ডিলিট করুন
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserManagementEnhanced;
