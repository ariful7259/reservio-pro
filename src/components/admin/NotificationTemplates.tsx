import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  FileText, 
  Plus, 
  Edit, 
  Trash2, 
  RefreshCw,
  Copy,
  Check
} from 'lucide-react';
import { useNotificationTemplates, NotificationTemplate } from '@/hooks/useNotificationTemplates';
import { useToast } from '@/hooks/use-toast';

interface NotificationTemplatesProps {
  onSelectTemplate?: (template: NotificationTemplate) => void;
}

const NotificationTemplates: React.FC<NotificationTemplatesProps> = ({ onSelectTemplate }) => {
  const { templates, loading, createTemplate, updateTemplate, deleteTemplate, fetchTemplates } = useNotificationTemplates();
  const { toast } = useToast();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<NotificationTemplate | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    message: '',
    notification_type: 'custom' as 'custom' | 'verification' | 'warning' | 'announcement'
  });

  const resetForm = () => {
    setFormData({
      name: '',
      subject: '',
      message: '',
      notification_type: 'custom'
    });
  };

  const handleCreate = async () => {
    if (!formData.name || !formData.subject || !formData.message) {
      toast({
        title: "ত্রুটি",
        description: "সব ফিল্ড পূরণ করুন।",
        variant: "destructive"
      });
      return;
    }

    await createTemplate(formData);
    setIsCreateDialogOpen(false);
    resetForm();
  };

  const handleUpdate = async () => {
    if (!selectedTemplate) return;

    await updateTemplate(selectedTemplate.id, formData);
    setIsEditDialogOpen(false);
    setSelectedTemplate(null);
    resetForm();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('আপনি কি নিশ্চিত এই টেমপ্লেট মুছে ফেলতে চান?')) return;
    await deleteTemplate(id);
  };

  const openEditDialog = (template: NotificationTemplate) => {
    setSelectedTemplate(template);
    setFormData({
      name: template.name,
      subject: template.subject,
      message: template.message,
      notification_type: template.notification_type
    });
    setIsEditDialogOpen(true);
  };

  const handleCopyTemplate = (template: NotificationTemplate) => {
    if (onSelectTemplate) {
      onSelectTemplate(template);
      setCopiedId(template.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const getTypeBadge = (type: string) => {
    const typeMap: Record<string, { label: string; className: string }> = {
      custom: { label: '📬 কাস্টম', className: 'bg-primary/10 text-primary' },
      verification: { label: '✅ ভেরিফিকেশন', className: 'bg-emerald-500/10 text-emerald-600' },
      warning: { label: '⚠️ সতর্কতা', className: 'bg-amber-500/10 text-amber-600' },
      announcement: { label: '📢 ঘোষণা', className: 'bg-blue-500/10 text-blue-600' }
    };
    const typeInfo = typeMap[type] || { label: type, className: 'bg-muted' };
    return <Badge className={typeInfo.className}>{typeInfo.label}</Badge>;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              নোটিফিকেশন টেমপ্লেট
            </CardTitle>
            <CardDescription>
              পুনরায় ব্যবহারযোগ্য ইমেইল টেমপ্লেট তৈরি ও পরিচালনা করুন
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={fetchTemplates} disabled={loading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              রিফ্রেশ
            </Button>
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2" onClick={resetForm}>
                  <Plus className="h-4 w-4" />
                  নতুন টেমপ্লেট
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle>নতুন টেমপ্লেট তৈরি করুন</DialogTitle>
                  <DialogDescription>
                    বারবার ব্যবহারের জন্য একটি নতুন ইমেইল টেমপ্লেট তৈরি করুন
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label>টেমপ্লেট নাম *</Label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="যেমন: স্বাগতম বার্তা"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>টাইপ</Label>
                    <Select
                      value={formData.notification_type}
                      onValueChange={(value: any) => setFormData({ ...formData, notification_type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="custom">📬 কাস্টম বার্তা</SelectItem>
                        <SelectItem value="verification">✅ ভেরিফিকেশন</SelectItem>
                        <SelectItem value="warning">⚠️ সতর্কতা</SelectItem>
                        <SelectItem value="announcement">📢 ঘোষণা</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label>বিষয় *</Label>
                    <Input
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="ইমেইলের বিষয়"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>বার্তা *</Label>
                    <Textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="ইমেইলের বার্তা..."
                      rows={5}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    বাতিল
                  </Button>
                  <Button onClick={handleCreate}>
                    <Plus className="h-4 w-4 mr-2" />
                    তৈরি করুন
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center py-12">
            <RefreshCw className="h-8 w-8 animate-spin mx-auto text-muted-foreground" />
            <p className="mt-2 text-muted-foreground">লোড হচ্ছে...</p>
          </div>
        ) : templates.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 mx-auto text-muted-foreground" />
            <p className="mt-2 text-muted-foreground">কোনো টেমপ্লেট নেই</p>
            <p className="text-sm text-muted-foreground">নতুন টেমপ্লেট তৈরি করতে উপরের বাটনে ক্লিক করুন</p>
          </div>
        ) : (
          <ScrollArea className="h-[400px]">
            <div className="grid gap-4">
              {templates.map((template) => (
                <div 
                  key={template.id} 
                  className="p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-2">
                        <h3 className="font-medium">{template.name}</h3>
                        {getTypeBadge(template.notification_type)}
                      </div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">
                        বিষয়: {template.subject}
                      </p>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {template.message}
                      </p>
                    </div>
                    <div className="flex gap-1">
                      {onSelectTemplate && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleCopyTemplate(template)}
                          title="ব্যবহার করুন"
                        >
                          {copiedId === template.id ? (
                            <Check className="h-4 w-4 text-emerald-600" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      )}
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => openEditDialog(template)}
                        title="সম্পাদনা"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleDelete(template.id)}
                        title="মুছে ফেলুন"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>টেমপ্লেট সম্পাদনা করুন</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>টেমপ্লেট নাম *</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label>টাইপ</Label>
              <Select
                value={formData.notification_type}
                onValueChange={(value: any) => setFormData({ ...formData, notification_type: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="custom">📬 কাস্টম বার্তা</SelectItem>
                  <SelectItem value="verification">✅ ভেরিফিকেশন</SelectItem>
                  <SelectItem value="warning">⚠️ সতর্কতা</SelectItem>
                  <SelectItem value="announcement">📢 ঘোষণা</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>বিষয় *</Label>
              <Input
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label>বার্তা *</Label>
              <Textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={5}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              বাতিল
            </Button>
            <Button onClick={handleUpdate}>
              <Edit className="h-4 w-4 mr-2" />
              আপডেট করুন
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default NotificationTemplates;
