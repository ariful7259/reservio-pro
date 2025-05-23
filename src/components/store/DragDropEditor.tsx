import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Layout, Monitor, Smartphone, Palette, 
  Layers, Image, Type, Square, Save,
  Copy, Trash, MoveRight, Check, Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import StorePreview from '@/components/store/StorePreview';

interface ElementProps {
  id: string;
  type: string;
  content: string;
  position: { x: number; y: number };
}

interface DragDropEditorProps {
  storeName: string;
}

const TEMPLATES = [
  {
    id: 'minimal',
    name: 'মিনিমাল',
    description: 'সাধারণ ডিজাইন, সহজ ব্যবহার'
  },
  {
    id: 'fashion',
    name: 'ফ্যাশন',
    description: 'ট্রেন্ডি ডিজাইন, ভিজ্যুয়াল ফোকাস'
  },
  {
    id: 'electronics',
    name: 'ইলেকট্রনিক্স',
    description: 'প্রযুক্তি পণ্যের জন্য উপযোগী'
  },
  {
    id: 'food',
    name: 'ফুড',
    description: 'খাবার ও রেস্টুরেন্ট ব্যবসার জন্য'
  }
];

const ELEMENTS = [
  { id: 'header', name: 'হেডার', icon: <Layout className="h-4 w-4" /> },
  { id: 'hero', name: 'হিরো সেকশন', icon: <Image className="h-4 w-4" /> },
  { id: 'products', name: 'পণ্য শোকেস', icon: <Square className="h-4 w-4" /> },
  { id: 'categories', name: 'ক্যাটেগরি', icon: <Layers className="h-4 w-4" /> },
  { id: 'newsletter', name: 'নিউজলেটার', icon: <Type className="h-4 w-4" /> },
  { id: 'footer', name: 'ফুটার', icon: <Layout className="h-4 w-4" /> }
];

const DragDropEditor: React.FC<DragDropEditorProps> = ({ storeName }) => {
  const [activeTab, setActiveTab] = useState('templates');
  const [selectedTemplate, setSelectedTemplate] = useState('minimal');
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [elements, setElements] = useState<ElementProps[]>([]);
  const [loading, setLoading] = useState(false);
  const isMobile = useIsMobile();
  const { toast } = useToast();

  // টেমপ্লেট পরিবর্তন হ্যান্ডলার
  const handleTemplateChange = (template: string) => {
    setLoading(true);
    setSelectedTemplate(template);
    
    // সিমুলেট করা লোডিং টাইম
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "টেমপ্লেট আপডেট হয়েছে",
        description: `${TEMPLATES.find(t => t.id === template)?.name} টেমপ্লেট সফলভাবে প্রয়োগ করা হয়েছে।`,
      });
    }, 800);
  };

  // এলিমেন্ট ড্র্যাগ শুরু করার হ্যান্ডলার
  const handleDragStart = (e: React.DragEvent, elementType: string) => {
    e.dataTransfer.setData('text/plain', elementType);
  };

  // ড্রপ জোনে ড্র্যাগ ওভার হ্যান্ডলার
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  // ড্রপ হ্যান্ডলার
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const elementType = e.dataTransfer.getData('text/plain');
    const elementInfo = ELEMENTS.find(el => el.id === elementType);
    
    if (elementInfo) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const newElement = {
        id: `element-${Date.now()}`,
        type: elementType,
        content: elementInfo.name,
        position: { x, y }
      };
      
      setElements([...elements, newElement]);
      
      toast({
        title: "এলিমেন্ট যোগ করা হয়েছে",
        description: `${elementInfo.name} সফলভাবে যোগ করা হয়েছে।`,
      });
    }
  };

  // রিসেট হ্যান্ডলার
  const handleReset = () => {
    if (elements.length > 0) {
      if (confirm('আপনি কি সত্যিই সব এলিমেন্ট মুছে ফেলতে চান?')) {
        setElements([]);
      }
    }
  };

  // সেভ হ্যান্ডলার
  const handleSave = () => {
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "সংরক্ষিত হয়েছে",
        description: "আপনার ডিজাইন সফলভাবে সংরক্ষণ করা হয়েছে।",
      });
    }, 1000);
  };

  // মোবাইল টাইপ ট্যাব কন্টেন্ট রেন্ডার করে
  const renderTabContent = () => {
    if (activeTab === 'templates') {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3">
          {TEMPLATES.map(template => (
            <Card 
              key={template.id}
              className={cn(
                "cursor-pointer transition-all hover:scale-[1.02] hover:shadow-md overflow-hidden", 
                selectedTemplate === template.id && "ring-2 ring-primary ring-offset-2"
              )}
              onClick={() => handleTemplateChange(template.id)}
            >
              <div 
                className={cn(
                  "h-24 bg-gradient-to-r", 
                  template.id === 'minimal' && "from-slate-700 to-slate-900",
                  template.id === 'fashion' && "from-pink-400 to-pink-700",
                  template.id === 'electronics' && "from-blue-400 to-blue-700",
                  template.id === 'food' && "from-amber-400 to-amber-600"
                )}
              />
              <CardContent className="p-3">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{template.name}</p>
                    <p className="text-xs text-muted-foreground">{template.description}</p>
                  </div>
                  {selectedTemplate === template.id && (
                    <Check className="h-5 w-5 text-primary" />
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      );
    } else if (activeTab === 'elements') {
      return (
        <div className="p-3">
          <p className="text-sm text-muted-foreground mb-3">নিচের এলিমেন্টগুলো ড্র্যাগ করে প্রিভিউ এরিয়াতে ড্রপ করুন</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {ELEMENTS.map(element => (
              <div
                key={element.id}
                className="border rounded-md p-3 flex flex-col items-center gap-1 cursor-move hover:bg-accent/20 active:scale-95 transition-all"
                draggable
                onDragStart={(e) => handleDragStart(e, element.id)}
              >
                {element.icon}
                <span className="text-xs">{element.name}</span>
              </div>
            ))}
          </div>
          
          <Separator className="my-4" />
          
          <div className="flex justify-between">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleReset}
              disabled={elements.length === 0}
            >
              <Trash className="h-4 w-4 mr-2" />
              রিসেট
            </Button>
            <Button 
              size="sm"
              onClick={handleSave}
              disabled={loading}
            >
              {loading ? (
                <>লোড হচ্ছে...</>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  সংরক্ষণ করুন
                </>
              )}
            </Button>
          </div>
        </div>
      );
    }
    
    return null;
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex flex-col md:flex-row gap-4 h-full">
        {/* টুলবার */}
        <div className="w-full md:w-64 md:min-w-64 border rounded-md overflow-hidden flex flex-col">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="templates">টেমপ্লেটস</TabsTrigger>
              <TabsTrigger value="elements">এলিমেন্টস</TabsTrigger>
            </TabsList>
            <div className="overflow-y-auto max-h-[500px]">
              {renderTabContent()}
            </div>
          </Tabs>
        </div>

        {/* প্রিভিউ এরিয়া */}
        <div className="flex-1 border rounded-md overflow-hidden flex flex-col">
          <div className="p-2 bg-muted border-b flex justify-between items-center">
            <div className="text-sm font-medium">প্রিভিউ: {storeName}</div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setPreviewDevice('desktop')}
                className={cn(previewDevice === 'desktop' ? 'bg-accent' : 'bg-transparent')}
              >
                <Monitor className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setPreviewDevice('mobile')}
                className={cn(previewDevice === 'mobile' ? 'bg-accent' : 'bg-transparent')}
              >
                <Smartphone className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div 
            className="flex-1 p-4 bg-slate-50 overflow-y-auto relative"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <div className={cn(
              "min-h-[500px] transition-all duration-300",
              previewDevice === 'mobile' ? "max-w-[375px] mx-auto" : "w-full"
            )}>
              {loading ? (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="flex flex-col items-center">
                    <Sparkles className="h-12 w-12 text-primary animate-pulse" />
                    <p className="mt-2 text-muted-foreground">টেমপ্লেট লোড হচ্ছে...</p>
                  </div>
                </div>
              ) : (
                <div className="rounded-md overflow-hidden shadow-md">
                  <StorePreview theme={selectedTemplate} storeName={storeName} />
                </div>
              )}
              
              {/* ড্রপ করা এলিমেন্টগুলো */}
              {elements.map(element => (
                <div
                  key={element.id}
                  className="absolute bg-white border-2 border-primary rounded-md p-2 shadow-md"
                  style={{
                    left: `${element.position.x}px`,
                    top: `${element.position.y}px`
                  }}
                >
                  <div className="flex items-center gap-2">
                    {ELEMENTS.find(el => el.id === element.type)?.icon}
                    <span className="text-sm">{element.content}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DragDropEditor;
