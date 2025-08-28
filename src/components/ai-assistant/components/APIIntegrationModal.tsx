import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Settings, Key, Shield, Zap, Save, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface APIIntegrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface APIConfig {
  id: string;
  name: string;
  key: string;
  isEnabled: boolean;
  isDefault: boolean;
}

const DEFAULT_APIS = [
  { id: 'gemini', name: 'Gemini AI', description: 'Google\'s AI model', icon: '🤖' },
  { id: 'openai', name: 'OpenAI GPT', description: 'ChatGPT models', icon: '🧠' },
  { id: 'claude', name: 'Anthropic Claude', description: 'Claude AI assistant', icon: '💭' }
];

export const APIIntegrationModal: React.FC<APIIntegrationModalProps> = ({
  isOpen,
  onClose
}) => {
  const { toast } = useToast();
  const [userAPIs, setUserAPIs] = useState<APIConfig[]>([]);
  const [activeTab, setActiveTab] = useState('manage');
  const [newAPI, setNewAPI] = useState({ name: '', key: '' });
  const [useDefaultAPIs, setUseDefaultAPIs] = useState(true);

  useEffect(() => {
    if (isOpen) {
      loadUserAPIs();
    }
  }, [isOpen]);

  const loadUserAPIs = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const savedAPIs = localStorage.getItem(`user_apis_${user.id}`);
      const defaultSetting = localStorage.getItem(`use_default_apis_${user.id}`);
      
      if (savedAPIs) {
        setUserAPIs(JSON.parse(savedAPIs));
      }
      if (defaultSetting !== null) {
        setUseDefaultAPIs(JSON.parse(defaultSetting));
      }
    } catch (error) {
      console.error('Error loading user APIs:', error);
    }
  };

  const saveUserAPIs = async (apis: APIConfig[]) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      localStorage.setItem(`user_apis_${user.id}`, JSON.stringify(apis));
      setUserAPIs(apis);
    } catch (error) {
      console.error('Error saving user APIs:', error);
    }
  };

  const handleAddAPI = () => {
    if (!newAPI.name || !newAPI.key) {
      toast({
        title: "ত্রুটি",
        description: "নাম এবং API Key দুটিই প্রয়োজন",
        variant: "destructive"
      });
      return;
    }

    const newAPIConfig: APIConfig = {
      id: Date.now().toString(),
      name: newAPI.name,
      key: newAPI.key,
      isEnabled: true,
      isDefault: false
    };

    const updatedAPIs = [...userAPIs, newAPIConfig];
    saveUserAPIs(updatedAPIs);
    setNewAPI({ name: '', key: '' });
    
    toast({
      title: "সফল",
      description: "API সফলভাবে যোগ করা হয়েছে"
    });
  };

  const handleToggleAPI = (id: string) => {
    const updatedAPIs = userAPIs.map(api =>
      api.id === id ? { ...api, isEnabled: !api.isEnabled } : api
    );
    saveUserAPIs(updatedAPIs);
  };

  const handleDeleteAPI = (id: string) => {
    const updatedAPIs = userAPIs.filter(api => api.id !== id);
    saveUserAPIs(updatedAPIs);
    
    toast({
      title: "মুছে ফেলা হয়েছে",
      description: "API সফলভাবে মুছে ফেলা হয়েছে"
    });
  };

  const handleToggleDefaultAPIs = async (enabled: boolean) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      setUseDefaultAPIs(enabled);
      localStorage.setItem(`use_default_apis_${user.id}`, JSON.stringify(enabled));
      
      toast({
        title: "সেটিংস আপডেট",
        description: enabled ? "ডিফল্ট API সক্রিয় করা হয়েছে" : "ডিফল্ট API নিষ্ক্রিয় করা হয়েছে"
      });
    } catch (error) {
      console.error('Error updating default API setting:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            AI API ইন্টিগ্রেশন
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="manage">পরিচালনা</TabsTrigger>
            <TabsTrigger value="add">নতুন যোগ</TabsTrigger>
            <TabsTrigger value="settings">সেটিংস</TabsTrigger>
          </TabsList>

          <TabsContent value="manage" className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-3">আপনার API Keys</h3>
              {userAPIs.length === 0 ? (
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-center text-muted-foreground">
                      কোনো API যোগ করা হয়নি। নতুন API যোগ করুন।
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-3">
                  {userAPIs.map((api) => (
                    <Card key={api.id}>
                      <CardContent className="pt-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Key className="h-4 w-4 text-primary" />
                            <div>
                              <p className="font-medium">{api.name}</p>
                              <p className="text-sm text-muted-foreground">
                                ****{api.key.slice(-4)}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={api.isEnabled ? "default" : "secondary"}>
                              {api.isEnabled ? "সক্রিয়" : "নিষ্ক্রিয়"}
                            </Badge>
                            <Switch
                              checked={api.isEnabled}
                              onCheckedChange={() => handleToggleAPI(api.id)}
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteAPI(api.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="add" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>নতুন API যোগ করুন</CardTitle>
                <CardDescription>
                  আপনার নিজস্ব AI API key যোগ করুন আরও ভাল পরিষেবার জন্য
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="api-name">API নাম</Label>
                  <Input
                    id="api-name"
                    placeholder="যেমন: My OpenAI API"
                    value={newAPI.name}
                    onChange={(e) => setNewAPI(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="api-key">API Key</Label>
                  <Input
                    id="api-key"
                    type="password"
                    placeholder="sk-..."
                    value={newAPI.key}
                    onChange={(e) => setNewAPI(prev => ({ ...prev, key: e.target.value }))}
                  />
                </div>
                <Button onClick={handleAddAPI} className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  API যোগ করুন
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>ডিফল্ট API সেটিংস</CardTitle>
                <CardDescription>
                  আমাদের ডিফল্ট AI APIs ব্যবহার করুন
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-green-600" />
                    <span>ডিফল্ট APIs ব্যবহার করুন</span>
                  </div>
                  <Switch
                    checked={useDefaultAPIs}
                    onCheckedChange={handleToggleDefaultAPIs}
                  />
                </div>
                
                {useDefaultAPIs && (
                  <div className="space-y-3 pt-4 border-t">
                    <h4 className="font-medium">উপলব্ধ ডিফল্ট APIs:</h4>
                    {DEFAULT_APIS.map((api) => (
                      <div key={api.id} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                        <span className="text-2xl">{api.icon}</span>
                        <div>
                          <p className="font-medium">{api.name}</p>
                          <p className="text-sm text-muted-foreground">{api.description}</p>
                        </div>
                        <Badge variant="outline" className="ml-auto">
                          <Zap className="h-3 w-3 mr-1" />
                          ফ্রি
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};