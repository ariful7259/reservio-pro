
import React, { useState } from 'react';
import { useContactManagement } from '@/hooks/useContactManagement';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Check, AlertCircle, Send, Upload, UserPlus, Users, Phone, Mail, Trash2, Smartphone, FileText, CheckCheck } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const ContactsTab = () => {
  const { contacts, loading, error, addContact, uploadCsvContacts, inviteContact, inviteAll, deleteContact } = useContactManagement();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [bulkContacts, setBulkContacts] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const handleAddContact = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      toast({
        title: "ত্রুটি!",
        description: "সমস্ত ফিল্ড পূরণ করুন।",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    const result = await addContact({ name, email, phone });
    setIsSubmitting(false);
    
    if (result) {
      toast({
        title: "সফল!",
        description: "কন্টাক্ট যোগ করা হয়েছে।",
      });
      setName('');
      setEmail('');
      setPhone('');
    } else {
      toast({
        title: "ত্রুটি!",
        description: error || "কন্টাক্ট যোগ করতে ব্যর্থ হয়েছে।",
        variant: "destructive",
      });
    }
  };
  
  const handleBulkUpload = async () => {
    if (!bulkContacts) {
      toast({
        title: "ত্রুটি!",
        description: "কন্টাক্ট যোগ করুন।",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Parse bulk contacts (simple CSV format)
      const lines = bulkContacts.split('\n');
      const parsedContacts = lines
        .filter(line => line.trim() !== '')
        .map(line => {
          const [name, email, phone] = line.split(',').map(item => item.trim());
          return { name, email, phone };
        });
      
      if (parsedContacts.length === 0) {
        toast({
          title: "ত্রুটি!",
          description: "কোনো বৈধ কন্টাক্ট পাওয়া যায়নি।",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }
      
      const result = await addBulkContacts(parsedContacts);
      setIsSubmitting(false);
      
      toast({
        title: "সফল!",
        description: `${result.total} টি কন্টাক্টের মধ্যে ${result.added} টি যোগ করা হয়েছে। ${result.duplicates} টি ডুপ্লিকেট ছিল।`,
      });
      
      setBulkContacts('');
      setDialogOpen(false);
      
    } catch (err) {
      setIsSubmitting(false);
      toast({
        title: "ত্রুটি!",
        description: "কন্টাক্ট যোগ করতে ব্যর্থ হয়েছে।",
        variant: "destructive",
      });
    }
  };
  
  const handleFileUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      toast({
        title: "ত্রুটি!",
        description: "ফাইল নির্বাচন করুন।",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    const result = await uploadCsvContacts(selectedFile);
    setIsSubmitting(false);
    
    if (!result.error) {
      toast({
        title: "সফল!",
        description: `${result.total} টি কন্টাক্টের মধ্যে ${result.added} টি যোগ করা হয়েছে। ${result.duplicates} টি ডুপ্লিকেট ছিল।`,
      });
      setSelectedFile(null);
    } else {
      toast({
        title: "ত্রুটি!",
        description: error || "ফাইল আপলোড করতে ব্যর্থ হয়েছে।",
        variant: "destructive",
      });
    }
  };
  
  const handleInvite = async (id: string) => {
    setIsSubmitting(true);
    const result = await inviteContact(id);
    setIsSubmitting(false);
    
    if (result) {
      toast({
        title: "সফল!",
        description: "কন্টাক্ট ইনভাইট করা হয়েছে।",
      });
    } else {
      toast({
        title: "ত্রুটি!",
        description: error || "ইনভাইট পাঠাতে ব্যর্থ হয়েছে।",
        variant: "destructive",
      });
    }
  };
  
  const handleInviteAll = async () => {
    setIsSubmitting(true);
    const result = await inviteAll();
    setIsSubmitting(false);
    
    if (result) {
      toast({
        title: "সফল!",
        description: "সব কন্টাক্ট ইনভাইট করা হয়েছে।",
      });
    } else {
      toast({
        title: "ত্রুটি!",
        description: error || "ইনভাইট পাঠাতে ব্যর্থ হয়েছে।",
        variant: "destructive",
      });
    }
  };
  
  const handleDelete = async (id: string) => {
    setIsSubmitting(true);
    const result = await deleteContact(id);
    setIsSubmitting(false);
    
    if (result) {
      toast({
        title: "সফল!",
        description: "কন্টাক্ট মুছে ফেলা হয়েছে।",
      });
    } else {
      toast({
        title: "ত্রুটি!",
        description: error || "কন্টাক্ট মুছতে ব্যর্থ হয়েছে।",
        variant: "destructive",
      });
    }
  };
  
  // Map status to status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-secondary/20">পেন্ডিং</Badge>;
      case 'invited':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">আমন্ত্রিত</Badge>;
      case 'joined':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">যোগদান করেছে</Badge>;
      case 'invalid':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">অবৈধ</Badge>;
      case 'duplicate':
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">ডুপ্লিকেট</Badge>;
      default:
        return <Badge variant="outline">অজানা</Badge>;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>নতুন কন্টাক্ট যোগ করুন</CardTitle>
            <CardDescription>
              কন্টাক্ট যোগ করুন এবং ইনভাইট পাঠান
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddContact} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">নাম</Label>
                  <Input 
                    id="name" 
                    value={name} 
                    onChange={e => setName(e.target.value)}
                    placeholder="নাম লিখুন" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">ইমেইল</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)}
                    placeholder="ইমেইল লিখুন" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">ফোন</Label>
                  <Input 
                    id="phone" 
                    value={phone} 
                    onChange={e => setPhone(e.target.value)}
                    placeholder="ফোন নম্বর লিখুন" 
                  />
                </div>
              </div>
              <Button 
                type="submit" 
                disabled={isSubmitting || !name || !email || !phone} 
                className="w-full gap-2"
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin">◌</span>
                    প্রসেসিং...
                  </>
                ) : (
                  <>
                    <UserPlus className="h-4 w-4" />
                    কন্টাক্ট যোগ করুন
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>বাল্ক আপলোড</CardTitle>
            <CardDescription>
              একসাথে অনেক কন্টাক্ট যোগ করুন
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleFileUpload} className="space-y-4">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="csv">CSV ফাইল আপলোড করুন</Label>
                <Input 
                  id="csv" 
                  type="file" 
                  accept=".csv"
                  onChange={e => setSelectedFile(e.target.files?.[0] || null)} 
                />
              </div>
              <Button 
                type="submit" 
                variant="secondary"
                disabled={isSubmitting || !selectedFile} 
                className="w-full gap-2"
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin">◌</span>
                    আপলোডিং...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4" />
                    আপলোড করুন
                  </>
                )}
              </Button>
            </form>
            
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full gap-2">
                  <FileText className="h-4 w-4" />
                  টেক্সট দিয়ে যোগ করুন
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>বাল্ক কন্টাক্ট যোগ করুন</DialogTitle>
                  <DialogDescription>
                    প্রতি লাইনে একটি কন্টাক্ট লিখুন (নাম, ইমেইল, ফোন - কমা দিয়ে আলাদা করুন)
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <Textarea 
                    placeholder="রহিম আহমেদ, rahim@example.com, 01712345678
করিম মিয়া, karim@example.com, 01812345678"
                    rows={6}
                    value={bulkContacts}
                    onChange={e => setBulkContacts(e.target.value)}
                  />
                </div>
                <DialogFooter>
                  <Button 
                    type="button" 
                    disabled={isSubmitting || !bulkContacts}
                    onClick={handleBulkUpload}
                  >
                    {isSubmitting ? "প্রসেসিং..." : "কন্টাক্ট যোগ করুন"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            
            <Button variant="outline" className="w-full gap-2">
              <Smartphone className="h-4 w-4" />
              মোবাইল কন্টাক্ট
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="flex flex-row items-center">
          <div className="flex-1">
            <CardTitle>আপনার কন্টাক্ট লিস্ট</CardTitle>
            <CardDescription>
              মোট {contacts.length} জন কন্টাক্ট
            </CardDescription>
          </div>
          <Button 
            variant="outline" 
            className="gap-2"
            disabled={isSubmitting || contacts.filter(c => c.status === 'pending').length === 0}
            onClick={handleInviteAll}
          >
            <CheckCheck className="h-4 w-4" />
            সবাইকে ইনভাইট করুন
          </Button>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">সব ({contacts.length})</TabsTrigger>
              <TabsTrigger value="pending">পেন্ডিং ({contacts.filter(c => c.status === 'pending').length})</TabsTrigger>
              <TabsTrigger value="invited">আমন্ত্রিত ({contacts.filter(c => c.status === 'invited').length})</TabsTrigger>
              <TabsTrigger value="joined">যোগদানকারী ({contacts.filter(c => c.status === 'joined').length})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="m-0">
              <ContactList 
                contacts={contacts}
                onInvite={handleInvite}
                onDelete={handleDelete}
                isSubmitting={isSubmitting}
                getStatusBadge={getStatusBadge}
              />
            </TabsContent>
            
            <TabsContent value="pending" className="m-0">
              <ContactList 
                contacts={contacts.filter(c => c.status === 'pending')}
                onInvite={handleInvite}
                onDelete={handleDelete}
                isSubmitting={isSubmitting}
                getStatusBadge={getStatusBadge}
              />
            </TabsContent>
            
            <TabsContent value="invited" className="m-0">
              <ContactList 
                contacts={contacts.filter(c => c.status === 'invited')}
                onInvite={handleInvite}
                onDelete={handleDelete}
                isSubmitting={isSubmitting}
                getStatusBadge={getStatusBadge}
              />
            </TabsContent>
            
            <TabsContent value="joined" className="m-0">
              <ContactList 
                contacts={contacts.filter(c => c.status === 'joined')}
                onInvite={handleInvite}
                onDelete={handleDelete}
                isSubmitting={isSubmitting}
                getStatusBadge={getStatusBadge}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

interface ContactListProps {
  contacts: Array<{
    id: string;
    name: string;
    email: string;
    phone: string;
    status: string;
  }>;
  onInvite: (id: string) => void;
  onDelete: (id: string) => void;
  isSubmitting: boolean;
  getStatusBadge: (status: string) => React.ReactNode;
}

const ContactList: React.FC<ContactListProps> = ({ 
  contacts, 
  onInvite, 
  onDelete, 
  isSubmitting, 
  getStatusBadge 
}) => {
  if (contacts.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        কোনো কন্টাক্ট নেই
      </div>
    );
  }
  
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-secondary/20">
          <tr>
            <th className="text-left p-3 text-sm font-medium">নাম</th>
            <th className="text-left p-3 text-sm font-medium">ইমেইল</th>
            <th className="text-left p-3 text-sm font-medium">ফোন</th>
            <th className="text-left p-3 text-sm font-medium">স্ট্যাটাস</th>
            <th className="text-left p-3 text-sm font-medium">অ্যাকশন</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {contacts.map((contact) => (
            <tr key={contact.id} className="hover:bg-secondary/5">
              <td className="p-3">{contact.name}</td>
              <td className="p-3 flex items-center gap-1">
                <Mail className="h-3 w-3 text-muted-foreground" />
                <span className="text-sm">{contact.email}</span>
              </td>
              <td className="p-3 flex items-center gap-1">
                <Phone className="h-3 w-3 text-muted-foreground" />
                <span className="text-sm">{contact.phone}</span>
              </td>
              <td className="p-3">{getStatusBadge(contact.status)}</td>
              <td className="p-3">
                <div className="flex items-center gap-2">
                  {contact.status === 'pending' && (
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-8 gap-1"
                      disabled={isSubmitting}
                      onClick={() => onInvite(contact.id)}
                    >
                      <Send className="h-3 w-3" />
                      <span className="text-xs">ইনভাইট</span>
                    </Button>
                  )}
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="h-8 gap-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                    disabled={isSubmitting}
                    onClick={() => onDelete(contact.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactsTab;
