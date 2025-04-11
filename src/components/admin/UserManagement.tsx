
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger, 
  DialogClose 
} from '@/components/ui/dialog';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Filter, 
  Search, 
  UserPlus, 
  Edit, 
  Trash2, 
  Lock, 
  Unlock, 
  UserCheck, 
  Clock, 
  ShieldAlert,
  FileText,
  User,
  UserCog,
  AlertTriangle,
  Eye
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock user data for demonstration
const mockUsers = [
  { 
    id: 1, 
    name: 'আব্দুল্লাহ খান', 
    email: 'abdullah@example.com', 
    phone: '01712345678', 
    role: 'অ্যাডমিন', 
    status: 'সক্রিয়',
    joined: '১০ মার্চ, ২০২৩',
    lastLogin: '১ ঘন্টা আগে',
    kycStatus: 'যাচাইকৃত'
  },
  { 
    id: 2, 
    name: 'ফারিয়া রহমান', 
    email: 'faria@example.com', 
    phone: '01812345678', 
    role: 'বিক্রেতা', 
    status: 'সক্রিয়',
    joined: '১৫ মে, ২০২৩',
    lastLogin: '৩ ঘন্টা আগে',
    kycStatus: 'পেন্ডিং'
  },
  { 
    id: 3, 
    name: 'রাকিব হাসান', 
    email: 'rakib@example.com', 
    phone: '01912345678', 
    role: 'গ্রাহক', 
    status: 'সক্রিয়',
    joined: '২০ জুন, ২০২৩',
    lastLogin: '২ দিন আগে',
    kycStatus: 'যাচাইকৃত'
  },
  { 
    id: 4, 
    name: 'সাবরিনা আক্তার', 
    email: 'sabrina@example.com', 
    phone: '01612345678', 
    role: 'সার্ভিস প্রোভাইডার', 
    status: 'সসপেন্ডেড',
    joined: '৫ জুলাই, ২০২৩',
    lastLogin: '১ সপ্তাহ আগে',
    kycStatus: 'অযাচাইকৃত'
  },
  { 
    id: 5, 
    name: 'মাহফুজুর রহমান', 
    email: 'mahfuz@example.com', 
    phone: '01512345678', 
    role: 'কন্টেন্ট ক্রিয়েটর', 
    status: 'সক্রিয়',
    joined: '১২ আগস্ট, ২০২৩',
    lastLogin: '১২ ঘন্টা আগে',
    kycStatus: 'যাচাইকৃত'
  },
];

// Mock activity logs
const activityLogs = [
  { id: 1, userId: 1, action: 'লগইন', ip: '192.168.1.1', device: 'আইফোন', time: '১ ঘন্টা আগে', location: 'ঢাকা, বাংলাদেশ' },
  { id: 2, userId: 3, action: 'প্রোফাইল আপডেট', ip: '192.168.1.2', device: 'ম্যাক', time: '২ ঘন্টা আগে', location: 'ঢাকা, বাংলাদেশ' },
  { id: 3, userId: 2, action: 'পাসওয়ার্ড পরিবর্তন', ip: '192.168.1.3', device: 'উইন্ডোজ পিসি', time: '৩ ঘন্টা আগে', location: 'চট্টগ্রাম, বাংলাদেশ' },
  { id: 4, userId: 5, action: 'লগইন', ip: '192.168.1.4', device: 'অ্যান্ড্রয়েড', time: '৫ ঘন্টা আগে', location: 'খুলনা, বাংলাদেশ' },
  { id: 5, userId: 4, action: 'লগআউট', ip: '192.168.1.5', device: 'উইন্ডোজ পিসি', time: '৬ ঘন্টা আগে', location: 'সিলেট, বাংলাদেশ' },
];

// KYC mock data 
const kycInfo = {
  nidFront: 'https://example.com/nid-front.jpg',
  nidBack: 'https://example.com/nid-back.jpg',
  selfie: 'https://example.com/selfie.jpg',
  fullName: 'আব্দুল্লাহ খান',
  nidNumber: '12345678901',
  dateOfBirth: '০১/০১/১৯৯০',
  address: 'বাড়ি #৫, রোড #৭, মোহাম্মদপুর, ঢাকা',
  submitted: '১০ মার্চ, ২০২৩',
  status: 'পেন্ডিং'
};

// User roles
const userRoles = [
  'অ্যাডমিন',
  'মডারেটর',
  'বিক্রেতা',
  'গ্রাহক',
  'সার্ভিস প্রোভাইডার',
  'কন্টেন্ট ক্রিয়েটর',
  'রেন্টাল প্রোভাইডার'
];

const UserManagement = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('সব');
  const [statusFilter, setStatusFilter] = useState('সব');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [editMode, setEditMode] = useState(false);
  const [viewingKyc, setViewingKyc] = useState(false);
  const [viewingActivity, setViewingActivity] = useState(false);

  // Filter users based on search term, role, and status
  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm);
    
    const matchesRole = roleFilter === 'সব' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'সব' || user.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic for adding user would go here
    toast({
      title: "নতুন ব্যবহারকারী যোগ করা হয়েছে",
      description: "ব্যবহারকারী সফলভাবে যোগ করা হয়েছে।",
    });
  };

  const handleEditUser = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic for editing user would go here
    toast({
      title: "ব্যবহারকারী আপডেট করা হয়েছে",
      description: "ব্যবহারকারীর তথ্য সফলভাবে আপডেট করা হয়েছে।",
    });
    setEditMode(false);
  };

  const handleDeleteUser = (userId: number) => {
    // Logic for deleting user would go here
    toast({
      title: "ব্যবহারকারী ডিলিট করা হয়েছে",
      description: "ব্যবহারকারী সফলভাবে ডিলিট করা হয়েছে।",
      variant: "destructive",
    });
  };

  const handleSuspendUser = (userId: number) => {
    // Logic for suspending user would go here
    toast({
      title: "অ্যাকাউন্ট সসপেন্ড করা হয়েছে",
      description: "ব্যবহারকারীর অ্যাকাউন্ট সাময়িকভাবে সসপেন্ড করা হয়েছে।",
      variant: "destructive",
    });
  };

  const handleActivateUser = (userId: number) => {
    // Logic for activating user would go here
    toast({
      title: "অ্যাকাউন্ট সক্রিয় করা হয়েছে",
      description: "ব্যবহারকারীর অ্যাকাউন্ট সফলভাবে সক্রিয় করা হয়েছে।",
    });
  };

  const handleApproveKyc = () => {
    // Logic for approving KYC would go here
    toast({
      title: "KYC যাচাইকরণ সম্পন্ন",
      description: "ব্যবহারকারীর KYC সফলভাবে যাচাই করা হয়েছে।",
    });
    setViewingKyc(false);
  };

  const handleRejectKyc = () => {
    // Logic for rejecting KYC would go here
    toast({
      title: "KYC প্রত্যাখ্যান করা হয়েছে",
      description: "ব্যবহারকারীর KYC যাচাইকরণে সমস্যা হয়েছে।",
      variant: "destructive",
    });
    setViewingKyc(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">ব্যবহারকারী পরিচালনা</h1>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="h-4 w-4 mr-2" />
              নতুন ব্যবহারকারী
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>নতুন ব্যবহারকারী যোগ করুন</DialogTitle>
              <DialogDescription>
                নতুন ব্যবহারকারীর বিবরণ দিন। সকল তথ্য সঠিকভাবে পূরণ করুন।
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddUser}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    নাম
                  </Label>
                  <Input id="name" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    ইমেইল
                  </Label>
                  <Input id="email" type="email" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="phone" className="text-right">
                    ফোন
                  </Label>
                  <Input id="phone" type="tel" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="role" className="text-right">
                    রোল
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="রোল নির্বাচন করুন" />
                    </SelectTrigger>
                    <SelectContent>
                      {userRoles.map((role) => (
                        <SelectItem key={role} value={role}>
                          {role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="password" className="text-right">
                    পাসওয়ার্ড
                  </Label>
                  <Input id="password" type="password" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    বাতিল
                  </Button>
                </DialogClose>
                <Button type="submit">সংরক্ষণ করুন</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      
      <Tabs defaultValue="users">
        <TabsList>
          <TabsTrigger value="users">ব্যবহারকারী</TabsTrigger>
          <TabsTrigger value="roles">রোল ম্যানেজমেন্ট</TabsTrigger>
          <TabsTrigger value="kyc">KYC পর্যালোচনা</TabsTrigger>
          <TabsTrigger value="activity">একটিভিটি লগ</TabsTrigger>
        </TabsList>
        
        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="নাম, ইমেইল বা ফোন খুঁজুন"
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <Select value={roleFilter} onValueChange={setRoleFilter}>
                    <SelectTrigger className="w-[140px] h-9">
                      <Filter className="h-3.5 w-3.5 mr-2" />
                      <SelectValue placeholder="সকল রোল" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="সব">সকল রোল</SelectItem>
                      {userRoles.map((role) => (
                        <SelectItem key={role} value={role}>
                          {role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[140px] h-9">
                      <Filter className="h-3.5 w-3.5 mr-2" />
                      <SelectValue placeholder="সকল স্ট্যাটাস" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="সব">সকল স্ট্যাটাস</SelectItem>
                      <SelectItem value="সক্রিয়">সক্রিয়</SelectItem>
                      <SelectItem value="সসপেন্ডেড">সসপেন্ডেড</SelectItem>
                      <SelectItem value="ব্লক">ব্লক</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>নাম</TableHead>
                      <TableHead>যোগাযোগ</TableHead>
                      <TableHead>রোল</TableHead>
                      <TableHead>স্ট্যাটাস</TableHead>
                      <TableHead>KYC</TableHead>
                      <TableHead>সর্বশেষ লগইন</TableHead>
                      <TableHead className="text-right">অ্যাকশন</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.length > 0 ? (
                      filteredUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.name}</TableCell>
                          <TableCell>
                            <div className="text-sm">{user.email}</div>
                            <div className="text-xs text-muted-foreground">{user.phone}</div>
                          </TableCell>
                          <TableCell>{user.role}</TableCell>
                          <TableCell>
                            <Badge variant={
                              user.status === 'সক্রিয়' ? 'success' : 
                              user.status === 'সসপেন্ডেড' ? 'warning' : 
                              'destructive'
                            }>
                              {user.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={
                              user.kycStatus === 'যাচাইকৃত' ? 'success' : 
                              user.kycStatus === 'পেন্ডিং' ? 'warning' : 
                              'outline'
                            }>
                              {user.kycStatus}
                            </Badge>
                          </TableCell>
                          <TableCell>{user.lastLogin}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button 
                                    variant="ghost" 
                                    size="icon"
                                    onClick={() => {
                                      setSelectedUser(user);
                                      setEditMode(true);
                                    }}
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                  <DialogHeader>
                                    <DialogTitle>ব্যবহারকারী সম্পাদনা</DialogTitle>
                                    <DialogDescription>
                                      ব্যবহারকারীর তথ্য সম্পাদনা করুন।
                                    </DialogDescription>
                                  </DialogHeader>
                                  {selectedUser && (
                                    <form onSubmit={handleEditUser}>
                                      <div className="grid gap-4 py-4">
                                        <div className="grid grid-cols-4 items-center gap-4">
                                          <Label htmlFor="edit-name" className="text-right">
                                            নাম
                                          </Label>
                                          <Input 
                                            id="edit-name" 
                                            className="col-span-3" 
                                            defaultValue={selectedUser.name} 
                                          />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                          <Label htmlFor="edit-email" className="text-right">
                                            ইমেইল
                                          </Label>
                                          <Input 
                                            id="edit-email" 
                                            type="email" 
                                            className="col-span-3" 
                                            defaultValue={selectedUser.email} 
                                          />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                          <Label htmlFor="edit-phone" className="text-right">
                                            ফোন
                                          </Label>
                                          <Input 
                                            id="edit-phone" 
                                            type="tel" 
                                            className="col-span-3" 
                                            defaultValue={selectedUser.phone} 
                                          />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                          <Label htmlFor="edit-role" className="text-right">
                                            রোল
                                          </Label>
                                          <Select defaultValue={selectedUser.role}>
                                            <SelectTrigger className="col-span-3">
                                              <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                              {userRoles.map((role) => (
                                                <SelectItem key={role} value={role}>
                                                  {role}
                                                </SelectItem>
                                              ))}
                                            </SelectContent>
                                          </Select>
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                          <Label htmlFor="edit-status" className="text-right">
                                            স্ট্যাটাস
                                          </Label>
                                          <Select defaultValue={selectedUser.status}>
                                            <SelectTrigger className="col-span-3">
                                              <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                              <SelectItem value="সক্রিয়">সক্রিয়</SelectItem>
                                              <SelectItem value="সসপেন্ডেড">সসপেন্ডেড</SelectItem>
                                              <SelectItem value="ব্লক">ব্লক</SelectItem>
                                            </SelectContent>
                                          </Select>
                                        </div>
                                      </div>
                                      <DialogFooter>
                                        <DialogClose asChild>
                                          <Button type="button" variant="outline">
                                            বাতিল
                                          </Button>
                                        </DialogClose>
                                        <Button type="submit">আপডেট করুন</Button>
                                      </DialogFooter>
                                    </form>
                                  )}
                                </DialogContent>
                              </Dialog>
                              
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button 
                                    variant="ghost" 
                                    size="icon"
                                    onClick={() => {
                                      setSelectedUser(user);
                                      setViewingKyc(true);
                                    }}
                                  >
                                    <UserCheck className="h-4 w-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[600px]">
                                  <DialogHeader>
                                    <DialogTitle>KYC তথ্য দেখুন</DialogTitle>
                                    <DialogDescription>
                                      {selectedUser?.name} এর KYC তথ্য পর্যালোচনা করুন।
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="space-y-4 py-3">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                      <div className="border rounded-md p-2">
                                        <Label>এনআইডি (সামনে)</Label>
                                        <div className="mt-1 bg-slate-100 h-48 flex items-center justify-center">
                                          <FileText size={48} className="text-slate-400" />
                                        </div>
                                      </div>
                                      <div className="border rounded-md p-2">
                                        <Label>এনআইডি (পিছনে)</Label>
                                        <div className="mt-1 bg-slate-100 h-48 flex items-center justify-center">
                                          <FileText size={48} className="text-slate-400" />
                                        </div>
                                      </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                      <div className="space-y-2">
                                        <div className="space-y-1">
                                          <Label>পূর্ণ নাম</Label>
                                          <Input value={kycInfo.fullName} readOnly />
                                        </div>
                                        <div className="space-y-1">
                                          <Label>এনআইডি নম্বর</Label>
                                          <Input value={kycInfo.nidNumber} readOnly />
                                        </div>
                                        <div className="space-y-1">
                                          <Label>জন্ম তারিখ</Label>
                                          <Input value={kycInfo.dateOfBirth} readOnly />
                                        </div>
                                      </div>
                                      <div className="space-y-2">
                                        <div className="space-y-1">
                                          <Label>ঠিকানা</Label>
                                          <Input value={kycInfo.address} readOnly />
                                        </div>
                                        <div className="space-y-1">
                                          <Label>জমা দেওয়ার তারিখ</Label>
                                          <Input value={kycInfo.submitted} readOnly />
                                        </div>
                                        <div className="space-y-1">
                                          <Label>স্ট্যাটাস</Label>
                                          <Badge className="mt-1" variant="warning">
                                            {kycInfo.status}
                                          </Badge>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <DialogFooter className="gap-2 sm:gap-0">
                                    <DialogClose asChild>
                                      <Button type="button" variant="outline">
                                        বন্ধ করুন
                                      </Button>
                                    </DialogClose>
                                    <Button
                                      variant="destructive"
                                      onClick={handleRejectKyc}
                                    >
                                      প্রত্যাখ্যান করুন
                                    </Button>
                                    <Button
                                      onClick={handleApproveKyc}
                                    >
                                      অনুমোদন করুন
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                              
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button 
                                    variant="ghost" 
                                    size="icon"
                                    onClick={() => {
                                      setSelectedUser(user);
                                      setViewingActivity(true);
                                    }}
                                  >
                                    <Clock className="h-4 w-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[600px]">
                                  <DialogHeader>
                                    <DialogTitle>একটিভিটি লগ</DialogTitle>
                                    <DialogDescription>
                                      {selectedUser?.name} এর একটিভিটি লগ দেখুন।
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="py-3">
                                    <ScrollArea className="h-80">
                                      <div className="space-y-2">
                                        {activityLogs.map((log) => (
                                          <div 
                                            key={log.id} 
                                            className="border rounded-md p-3 text-sm flex justify-between items-center"
                                          >
                                            <div>
                                              <div className="font-medium">{log.action}</div>
                                              <div className="text-xs text-muted-foreground flex items-center gap-1">
                                                <span>IP: {log.ip}</span>
                                                <span>•</span>
                                                <span>{log.device}</span>
                                                <span>•</span>
                                                <span>{log.location}</span>
                                              </div>
                                            </div>
                                            <div className="text-muted-foreground">{log.time}</div>
                                          </div>
                                        ))}
                                      </div>
                                    </ScrollArea>
                                  </div>
                                  <DialogFooter>
                                    <DialogClose asChild>
                                      <Button type="button">
                                        বন্ধ করুন
                                      </Button>
                                    </DialogClose>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                              
                              {user.status === 'সক্রিয়' ? (
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  onClick={() => handleSuspendUser(user.id)}
                                >
                                  <Lock className="h-4 w-4" />
                                </Button>
                              ) : (
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  onClick={() => handleActivateUser(user.id)}
                                >
                                  <Unlock className="h-4 w-4" />
                                </Button>
                              )}
                              
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>ব্যবহারকারী অপসারণ</DialogTitle>
                                    <DialogDescription>
                                      আপনি কি নিশ্চিত যে আপনি এই ব্যবহারকারীকে অপসারণ করতে চান? এই পদক্ষেপ অপরিবর্তনীয়।
                                    </DialogDescription>
                                  </DialogHeader>
                                  <DialogFooter>
                                    <DialogClose asChild>
                                      <Button type="button" variant="outline">
                                        বাতিল
                                      </Button>
                                    </DialogClose>
                                    <Button 
                                      variant="destructive"
                                      onClick={() => handleDeleteUser(user.id)}
                                    >
                                      অপসারণ করুন
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                          কোন ব্যবহারকারী পাওয়া যায়নি
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="roles" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">রোল ম্যানেজমেন্ট ও পারমিশন</CardTitle>
            </CardHeader>
            <CardContent>
              <Table className="border rounded-md">
                <TableHeader>
                  <TableRow>
                    <TableHead>রোল</TableHead>
                    <TableHead>বর্ণনা</TableHead>
                    <TableHead>পারমিশন</TableHead>
                    <TableHead className="text-right">অ্যাকশন</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">অ্যাডমিন</TableCell>
                    <TableCell>সকল ধরনের প্রশাসনিক অ্যাকসেস</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        <Badge variant="secondary" className="text-xs">সব</Badge>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4 mr-2" />
                        সম্পাদনা
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">মডারেটর</TableCell>
                    <TableCell>কন্টেন্ট পর্যালোচনা ও অনুমোদন</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        <Badge variant="secondary" className="text-xs">পর্যালোচনা</Badge>
                        <Badge variant="secondary" className="text-xs">অনুমোদন</Badge>
                        <Badge variant="secondary" className="text-xs">সম্পাদনা</Badge>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4 mr-2" />
                        সম্পাদনা
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">বিক্রেতা</TableCell>
                    <TableCell>প্রোডাক্ট লিস্টিং ও ম্যানেজমেন্ট</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        <Badge variant="secondary" className="text-xs">প্রোডাক্ট</Badge>
                        <Badge variant="secondary" className="text-xs">অর্ডার</Badge>
                        <Badge variant="secondary" className="text-xs">ইনভেন্টরি</Badge>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4 mr-2" />
                        সম্পাদনা
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">গ্রাহক</TableCell>
                    <TableCell>অর্ডার ও পণ্য ক্রয়</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        <Badge variant="secondary" className="text-xs">ব্রাউজ</Badge>
                        <Badge variant="secondary" className="text-xs">ক্রয়</Badge>
                        <Badge variant="secondary" className="text-xs">রিভিউ</Badge>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4 mr-2" />
                        সম্পাদনা
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">সার্ভিস প্রোভাইডার</TableCell>
                    <TableCell>সার্ভিস লিস্টিং ও ম্যানেজমেন্ট</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        <Badge variant="secondary" className="text-xs">সার্ভিস</Badge>
                        <Badge variant="secondary" className="text-xs">অ্যাপয়েন্টমেন্ট</Badge>
                        <Badge variant="secondary" className="text-xs">ক্যালেন্ডার</Badge>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4 mr-2" />
                        সম্পাদনা
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              
              <div className="mt-6">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <UserCog className="h-4 w-4 mr-2" />
                      নতুন রোল যোগ করুন
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>নতুন রোল যোগ করুন</DialogTitle>
                      <DialogDescription>
                        নতুন ব্যবহারকারী রোল তৈরি করুন এবং পারমিশন সেট করুন।
                      </DialogDescription>
                    </DialogHeader>
                    <form>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="role-name" className="text-right">
                            রোল নাম
                          </Label>
                          <Input id="role-name" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="role-desc" className="text-right">
                            বর্ণনা
                          </Label>
                          <Input id="role-desc" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-start gap-4">
                          <Label className="text-right pt-2">
                            পারমিশন
                          </Label>
                          <div className="col-span-3 space-y-2">
                            <div className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                id="perm-users"
                                className="h-4 w-4 rounded border-gray-300"
                              />
                              <Label htmlFor="perm-users">ব্যবহারকারী ম্যানেজমেন্ট</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                id="perm-products"
                                className="h-4 w-4 rounded border-gray-300"
                              />
                              <Label htmlFor="perm-products">প্রোডাক্ট ম্যানেজমেন্ট</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                id="perm-orders"
                                className="h-4 w-4 rounded border-gray-300"
                              />
                              <Label htmlFor="perm-orders">অর্ডার ম্যানেজমেন্ট</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                id="perm-content"
                                className="h-4 w-4 rounded border-gray-300"
                              />
                              <Label htmlFor="perm-content">কন্টেন্ট মডারেশন</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                id="perm-settings"
                                className="h-4 w-4 rounded border-gray-300"
                              />
                              <Label htmlFor="perm-settings">সিস্টেম সেটিংস</Label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button type="button" variant="outline">
                            বাতিল
                          </Button>
                        </DialogClose>
                        <Button type="submit">সংরক্ষণ করুন</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="kyc" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex justify-between items-center">
                <span>KYC পর্যালোচনা</span>
                <div className="flex items-center gap-2">
                  <Select defaultValue="pending">
                    <SelectTrigger className="w-[140px] h-9">
                      <Filter className="h-3.5 w-3.5 mr-2" />
                      <SelectValue placeholder="ফিল্টার" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">সব</SelectItem>
                      <SelectItem value="pending">পেন্ডিং</SelectItem>
                      <SelectItem value="approved">অনুমোদিত</SelectItem>
                      <SelectItem value="rejected">বাতিল</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table className="border rounded-md">
                <TableHeader>
                  <TableRow>
                    <TableHead>ব্যবহারকারী</TableHead>
                    <TableHead>জমা দেওয়ার তারিখ</TableHead>
                    <TableHead>আইডি টাইপ</TableHead>
                    <TableHead>সত্যায়িত নাম</TableHead>
                    <TableHead>স্ট্যাটাস</TableHead>
                    <TableHead className="text-right">অ্যাকশন</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">ফারিয়া রহমান</div>
                      <div className="text-xs text-muted-foreground">faria@example.com</div>
                    </TableCell>
                    <TableCell>১৫ মে, ২০২৩</TableCell>
                    <TableCell>NID</TableCell>
                    <TableCell>ফারিয়া রহমান</TableCell>
                    <TableCell>
                      <Badge variant="warning">পেন্ডিং</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        দেখুন
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">সাবরিনা আক্তার</div>
                      <div className="text-xs text-muted-foreground">sabrina@example.com</div>
                    </TableCell>
                    <TableCell>৫ জুলাই, ২০২৩</TableCell>
                    <TableCell>পাসপোর্ট</TableCell>
                    <TableCell>সাবরিনা আক্তার</TableCell>
                    <TableCell>
                      <Badge variant="warning">পেন্ডিং</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        দেখুন
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">জাকির হোসেন</div>
                      <div className="text-xs text-muted-foreground">jakir@example.com</div>
                    </TableCell>
                    <TableCell>১০ জুন, ২০২৩</TableCell>
                    <TableCell>NID</TableCell>
                    <TableCell>জাকির হোসেন</TableCell>
                    <TableCell>
                      <Badge variant="success">অনুমোদিত</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        দেখুন
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">রিফাত আহমেদ</div>
                      <div className="text-xs text-muted-foreground">rifat@example.com</div>
                    </TableCell>
                    <TableCell>২০ জুলাই, ২০২৩</TableCell>
                    <TableCell>NID</TableCell>
                    <TableCell>রিফাত আহমেদ</TableCell>
                    <TableCell>
                      <Badge variant="destructive">বাতিল</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        দেখুন
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex justify-between items-center">
                <span>লগইন ও একটিভিটি লগ</span>
                <div className="flex items-center gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[140px] h-9">
                      <Filter className="h-3.5 w-3.5 mr-2" />
                      <SelectValue placeholder="অ্যাকশন" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">সব অ্যাকশন</SelectItem>
                      <SelectItem value="login">লগইন</SelectItem>
                      <SelectItem value="logout">লগআউট</SelectItem>
                      <SelectItem value="update">প্রোফাইল আপডেট</SelectItem>
                      <SelectItem value="password">পাসওয়ার্ড পরিবর্তন</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-md">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-slate-600" />
                      </div>
                      <div>
                        <div className="font-medium">আব্দুল্লাহ খান</div>
                        <div className="text-sm text-muted-foreground">abdullah@example.com</div>
                        <div className="mt-1 text-sm">
                          <Badge variant="secondary" className="mr-2">লগইন</Badge>
                          <span className="text-muted-foreground">১ ঘন্টা আগে</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <div>IP: 192.168.1.1</div>
                      <div>ডিভাইস: আইফোন</div>
                      <div>লোকেশন: ঢাকা, বাংলাদেশ</div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border rounded-md">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-slate-600" />
                      </div>
                      <div>
                        <div className="font-medium">রাকিব হাসান</div>
                        <div className="text-sm text-muted-foreground">rakib@example.com</div>
                        <div className="mt-1 text-sm">
                          <Badge variant="secondary" className="mr-2">প্রোফাইল আপডেট</Badge>
                          <span className="text-muted-foreground">২ ঘন্টা আগে</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <div>IP: 192.168.1.2</div>
                      <div>ডিভাইস: ম্যাক</div>
                      <div>লোকেশন: ঢাকা, বাংলাদেশ</div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border rounded-md">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-slate-600" />
                      </div>
                      <div>
                        <div className="font-medium">ফারিয়া রহমান</div>
                        <div className="text-sm text-muted-foreground">faria@example.com</div>
                        <div className="mt-1 text-sm">
                          <Badge variant="secondary" className="mr-2">পাসওয়ার্ড পরিবর্তন</Badge>
                          <span className="text-muted-foreground">৩ ঘন্টা আগে</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <div>IP: 192.168.1.3</div>
                      <div>ডিভাইস: উইন্ডোজ পিসি</div>
                      <div>লোকেশন: চট্টগ্রাম, বাংলাদেশ</div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border rounded-md">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-slate-600" />
                      </div>
                      <div>
                        <div className="font-medium">মাহফুজুর রহমান</div>
                        <div className="text-sm text-muted-foreground">mahfuz@example.com</div>
                        <div className="mt-1 text-sm">
                          <Badge variant="secondary" className="mr-2">লগইন</Badge>
                          <span className="text-muted-foreground">৫ ঘন্টা আগে</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <div>IP: 192.168.1.4</div>
                      <div>ডিভাইস: অ্যান্ড্রয়েড</div>
                      <div>লোকেশন: খুলনা, বাংলাদেশ</div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border rounded-md">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-slate-600" />
                      </div>
                      <div>
                        <div className="font-medium">সাবরিনা আক্তার</div>
                        <div className="text-sm text-muted-foreground">sabrina@example.com</div>
                        <div className="mt-1 text-sm">
                          <Badge variant="secondary" className="mr-2">লগআউট</Badge>
                          <span className="text-muted-foreground">৬ ঘন্টা আগে</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <div>IP: 192.168.1.5</div>
                      <div>ডিভাইস: উইন্ডোজ পিসি</div>
                      <div>লোকেশন: সিলেট, বাংলাদেশ</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserManagement;
