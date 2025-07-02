
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Palette, Image, Type, Layout, Smartphone, Monitor, 
  Eye, Download, Upload, Wand2 
} from 'lucide-react';

interface StoreDesignEditorProps {
  storeName: string;
}

const StoreDesignEditor: React.FC<StoreDesignEditorProps> = ({ storeName }) => {
  const [selectedTheme, setSelectedTheme] = useState('modern');
  const [primaryColor, setPrimaryColor] = useState('#3B82F6');
  const [secondaryColor, setSecondaryColor] = useState('#8B5CF6');

  const themes = [
    {
      id: 'modern',
      name: 'মডার্ন',
      preview: 'bg-gradient-to-br from-blue-500 to-purple-600',
      description: 'ক্লিন এবং মিনিমাল ডিজাইন'
    },
    {
      id: 'classic',
      name: 'ক্লাসিক',
      preview: 'bg-gradient-to-br from-gray-700 to-gray-900',
      description: 'প্রফেশনাল এবং এলিগ্যান্ট'
    },
    {
      id: 'colorful',
      name: 'রঙিন',
      preview: 'bg-gradient-to-br from-pink-500 to-orange-500',
      description: 'উজ্জ্বল এবং আকর্ষণীয়'
    },
    {
      id: 'minimal',
      name: 'মিনিমাল',
      preview: 'bg-gradient-to-br from-green-400 to-blue-500',
      description: 'সাদামাটা এবং সহজ'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">স্টোর ডিজাইন কাস্টমাইজ করুন</h2>
        <p className="text-gray-600">আপনার ব্র্যান্ড অনুযায়ী ডিজাইন তৈরি করুন</p>
      </div>

      <Tabs defaultValue="theme" className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full">
          <TabsTrigger value="theme" className="flex items-center gap-2">
            <Layout className="h-4 w-4" />
            <span className="hidden sm:inline">থিম</span>
          </TabsTrigger>
          <TabsTrigger value="colors" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            <span className="hidden sm:inline">রঙ</span>
          </TabsTrigger>
          <TabsTrigger value="images" className="flex items-center gap-2">
            <Image className="h-4 w-4" />
            <span className="hidden sm:inline">ছবি</span>
          </TabsTrigger>
          <TabsTrigger value="preview" className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            <span className="hidden sm:inline">প্রিভিউ</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="theme" className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">থিম সিলেক্ট করুন</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {themes.map((theme) => (
                <Card 
                  key={theme.id}
                  className={`cursor-pointer transition-all hover:shadow-lg ${
                    selectedTheme === theme.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedTheme(theme.id)}
                >
                  <CardContent className="p-4">
                    <div className={`w-full h-24 rounded-lg mb-3 ${theme.preview}`}></div>
                    <h4 className="font-medium">{theme.name}</h4>
                    <p className="text-sm text-gray-600">{theme.description}</p>
                    {selectedTheme === theme.id && (
                      <Badge className="mt-2">নির্বাচিত</Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="colors" className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">রঙ কাস্টমাইজ করুন</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="primaryColor">প্রাথমিক রঙ</Label>
                <div className="flex items-center gap-3 mt-2">
                  <Input
                    type="color"
                    id="primaryColor"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="w-16 h-12 p-1 border-2"
                  />
                  <Input
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    placeholder="#3B82F6"
                    className="flex-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="secondaryColor">সেকেন্ডারি রঙ</Label>
                <div className="flex items-center gap-3 mt-2">
                  <Input
                    type="color"
                    id="secondaryColor"
                    value={secondaryColor}
                    onChange={(e) => setSecondaryColor(e.target.value)}
                    className="w-16 h-12 p-1 border-2"
                  />
                  <Input
                    value={secondaryColor}
                    onChange={(e) => setSecondaryColor(e.target.value)}
                    placeholder="#8B5CF6"
                    className="flex-1"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 border rounded-lg">
              <h4 className="font-medium mb-2">রঙের প্রিভিউ</h4>
              <div className="flex items-center gap-4">
                <div 
                  className="w-16 h-16 rounded-lg"
                  style={{ backgroundColor: primaryColor }}
                ></div>
                <div 
                  className="w-16 h-16 rounded-lg"
                  style={{ backgroundColor: secondaryColor }}
                ></div>
                <div 
                  className="flex-1 h-16 rounded-lg"
                  style={{ 
                    background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` 
                  }}
                ></div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="images" className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">লোগো এবং ব্যানার আপলোড করুন</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">স্টোর লোগো</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-sm text-gray-600 mb-4">লোগো আপলোড করুন (PNG, JPG)</p>
                    <Button variant="outline">ফাইল নির্বাচন</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">ব্যানার ইমেজ</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-sm text-gray-600 mb-4">ব্যানার আপলোড করুন (1920x400px)</p>
                    <Button variant="outline">ফাইল নির্বাচন</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="preview" className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">লাইভ প্রিভিউ</h3>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Monitor className="h-4 w-4 mr-2" />
                  ডেস্কটপ
                </Button>
                <Button variant="outline" size="sm">
                  <Smartphone className="h-4 w-4 mr-2" />
                  মোবাইল
                </Button>
              </div>
            </div>

            <Card className="overflow-hidden">
              <div 
                className="h-64 p-6 text-white"
                style={{ 
                  background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` 
                }}
              >
                <div className="flex items-center justify-between mb-8">
                  <h1 className="text-2xl font-bold">{storeName || "আমার স্টোর"}</h1>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 bg-white/20 rounded"></div>
                    <div className="w-8 h-8 bg-white/20 rounded"></div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white/10 p-4 rounded-lg">
                    <div className="w-full h-20 bg-white/20 rounded mb-2"></div>
                    <div className="h-4 bg-white/30 rounded"></div>
                  </div>
                  <div className="bg-white/10 p-4 rounded-lg">
                    <div className="w-full h-20 bg-white/20 rounded mb-2"></div>
                    <div className="h-4 bg-white/30 rounded"></div>
                  </div>
                  <div className="bg-white/10 p-4 rounded-lg">
                    <div className="w-full h-20 bg-white/20 rounded mb-2"></div>
                    <div className="h-4 bg-white/30 rounded"></div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-3">
        <Button variant="outline">রিসেট করুন</Button>
        <Button className="bg-gradient-to-r from-primary to-purple-600">
          <Wand2 className="h-4 w-4 mr-2" />
          ডিজাইন সেভ করুন
        </Button>
      </div>
    </div>
  );
};

export default StoreDesignEditor;
