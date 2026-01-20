
import React, { useEffect, useMemo, useState } from 'react';
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
  Copy, Trash, MoveRight, Check, Sparkles,
  PanelLeft, PanelRight, Eye, Undo, Redo,
  Sliders, ChevronRight, PencilRuler, GripVertical,
  PlusCircle, Settings, ArrowDownCircle, Upload,
  RectangleHorizontal, Move, Zap, Code, BoxSelect
} from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import StorePreview from '@/components/store/StorePreview';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export interface ElementProps {
  id: string;
  type: string;
  content: string;
  position: { x: number; y: number };
}

interface DragDropEditorProps {
  storeName: string;
  initialElements?: ElementProps[];
  initialTemplateId?: string;
  onLayoutChange?: (payload: { elements: ElementProps[]; templateId: string }) => void;
  onSave?: (payload: { elements: ElementProps[]; templateId: string }) => Promise<void> | void;
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
  },
  {
    id: 'artisan',
    name: 'হস্তশিল্প',
    description: 'হাতের কাজের পণ্য বিক্রয়ের জন্য'
  },
  {
    id: 'digital',
    name: 'ডিজিটাল',
    description: 'ডিজিটাল প্রডাক্ট এবং সার্ভিসের জন্য'
  },
  {
    id: 'services',
    name: 'সার্ভিস',
    description: 'পার্লার/রিপেয়ার/কনসালটেন্সি সার্ভিসের জন্য'
  },
  {
    id: 'books',
    name: 'বুক স্টোর',
    description: 'বই, স্টেশনারি এবং শিক্ষা সামগ্রীর জন্য'
  },
  {
    id: 'beauty',
    name: 'বিউটি',
    description: 'স্কিনকেয়ার, কসমেটিক্স, পার্লার এবং সেলুন'
  },
  {
    id: 'furniture',
    name: 'ফার্নিচার',
    description: 'ফার্নিচার/হোম ডেকর/লাইফস্টাইল পণ্যের জন্য'
  }
];

const ELEMENTS = [
  { id: 'header', name: 'হেডার', icon: <Layout className="h-4 w-4" /> },
  { id: 'hero', name: 'হিরো সেকশন', icon: <Image className="h-4 w-4" /> },
  { id: 'products', name: 'পণ্য শোকেস', icon: <Square className="h-4 w-4" /> },
  { id: 'categories', name: 'ক্যাটেগরি', icon: <Layers className="h-4 w-4" /> },
  { id: 'newsletter', name: 'নিউজলেটার', icon: <Type className="h-4 w-4" /> },
  { id: 'footer', name: 'ফুটার', icon: <Layout className="h-4 w-4" /> },
  { id: 'testimonial', name: 'টেস্টিমোনিয়াল', icon: <Type className="h-4 w-4" /> },
  { id: 'features', name: 'ফিচারস', icon: <Sliders className="h-4 w-4" /> }
];

const DragDropEditor: React.FC<DragDropEditorProps> = ({
  storeName,
  initialElements,
  initialTemplateId,
  onLayoutChange,
  onSave,
}) => {
  const [activeTab, setActiveTab] = useState('templates');
  const [selectedTemplate, setSelectedTemplate] = useState('minimal');
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [elements, setElements] = useState<ElementProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#E3324A'); // প্রাইমারি কালার
  const [secondaryColor, setSecondaryColor] = useState('#8b5cf6');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [history, setHistory] = useState<ElementProps[][]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [selectedFont, setSelectedFont] = useState('Hind Siliguri');
  const [logoUrl, setLogoUrl] = useState('');
  const [bannerUrl, setBannerUrl] = useState('');
  const [borderRadius, setBorderRadius] = useState(8);
  const [shadowLevel, setShadowLevel] = useState<'none' | 'sm' | 'md' | 'lg'>('md');
  const [spacing, setSpacing] = useState<'compact' | 'normal' | 'relaxed'>('normal');
  const [enableAnimations, setEnableAnimations] = useState(true);
  const [animationType, setAnimationType] = useState<'fade' | 'slide' | 'scale'>('fade');
  const [customCss, setCustomCss] = useState('');
  const isMobile = useIsMobile();
  const { toast } = useToast();

  // initial restore (layout + template)
  useEffect(() => {
    if (initialTemplateId) setSelectedTemplate(initialTemplateId);

    if (initialElements) {
      setElements(initialElements);
      setHistory([initialElements]);
      setHistoryIndex(0);
    } else {
      setElements([]);
      setHistory([]);
      setHistoryIndex(-1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialTemplateId, initialElements?.length]);

  const layoutPayload = useMemo(
    () => ({ elements, templateId: selectedTemplate }),
    [elements, selectedTemplate]
  );

  useEffect(() => {
    onLayoutChange?.(layoutPayload);
  }, [layoutPayload, onLayoutChange]);

  // ড্র্যাগ-ড্রপ এলিমেন্টগুলি মুভ করার ফাংশন
  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const items = Array.from(elements);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    saveToHistory(items);
    setElements(items);
    
    toast({
      title: "এলিমেন্ট সাজানো হয়েছে",
      description: `${reorderedItem.content} এলিমেন্ট নতুন অবস্থানে সাজানো হয়েছে।`,
    });
  };

  // হিস্টোরি লগ সেভ করার ফাংশন
  const saveToHistory = (newElements: ElementProps[]) => {
    const newHistory = [...history.slice(0, historyIndex + 1), newElements];
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  // অ্যান্ডু বাটন ক্লিক হ্যান্ডলার
  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setElements([...history[historyIndex - 1]]);
    }
  };

  // রি-ডু বাটন ক্লিক হ্যান্ডলার
  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setElements([...history[historyIndex + 1]]);
    }
  };

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
      
      const newElements = [...elements, newElement];
      saveToHistory(newElements);
      setElements(newElements);
      
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
        saveToHistory([]);
        setElements([]);
      }
    }
  };

  // সেভ হ্যান্ডলার
  const handleSave = () => {
    setLoading(true);

    Promise.resolve(onSave?.(layoutPayload))
      .then(() => {
        toast({
          title: "সংরক্ষিত হয়েছে",
          description: "আপনার ডিজাইন সফলভাবে সংরক্ষণ করা হয়েছে।",
        });
      })
      .catch((err: any) => {
        console.error('Design save error:', err);
        toast({
          title: "সেভ করা যায়নি",
          description: err?.message || "আবার চেষ্টা করুন।",
          variant: "destructive",
        });
      })
      .finally(() => setLoading(false));
  };

  // এলিমেন্ট মোছার হ্যান্ডলার
  const handleElementDelete = (id: string) => {
    const newElements = elements.filter(element => element.id !== id);
    saveToHistory(newElements);
    setElements(newElements);
    
    toast({
      title: "এলিমেন্ট মুছে ফেলা হয়েছে",
      description: "নির্বাচিত এলিমেন্ট সফলভাবে মুছে ফেলা হয়েছে।",
    });
  };

  // সিদ্ধান্ত নেয় যে সাইডবার টাইপ ট্যাব কন্টেন্ট রেন্ডার করবে
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
                  template.id === 'food' && "from-amber-400 to-amber-600",
                  template.id === 'artisan' && "from-emerald-400 to-emerald-700",
                    template.id === 'digital' && "from-purple-400 to-purple-700",
                    template.id === 'services' && "from-teal-400 to-teal-700",
                    template.id === 'books' && "from-indigo-400 to-indigo-700",
                    template.id === 'beauty' && "from-rose-400 to-rose-700",
                    template.id === 'furniture' && "from-orange-400 to-orange-700"
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
          <div className="text-sm text-muted-foreground mb-3 flex items-center">
            <ArrowDownCircle className="h-4 w-4 mr-1 animate-bounce" />
            নিচের এলিমেন্টগুলো ড্র্যাগ করে প্রিভিউ এরিয়াতে ড্রপ করুন
          </div>
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
          
          {elements.length > 0 && (
            <>
              <Separator className="my-4" />
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium">এলিমেন্ট লিস্ট</h3>
                <DragDropContext onDragEnd={onDragEnd}>
                  <Droppable droppableId="elements">
                    {(provided) => (
                      <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-1">
                        {elements.map((element, index) => (
                          <Draggable key={element.id} draggableId={element.id} index={index}>
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                className="flex items-center justify-between border rounded-sm p-2 bg-muted/50 hover:bg-muted"
                              >
                                <div className="flex items-center gap-2">
                                  <div {...provided.dragHandleProps} className="text-muted-foreground">
                                    <GripVertical className="h-4 w-4" />
                                  </div>
                                  <span className="text-xs">{element.content}</span>
                                </div>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-6 w-6 p-0"
                                  onClick={() => handleElementDelete(element.id)}
                                >
                                  <Trash className="h-3.5 w-3.5 text-red-500" />
                                </Button>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </div>
            </>
          )}
        </div>
      );
    } else if (activeTab === 'design') {
      return (
        <div className="p-3 space-y-2 overflow-y-auto max-h-[550px]">
          <Accordion type="multiple" defaultValue={['colors', 'branding']} className="w-full">
            {/* কালার সেটিংস */}
            <AccordionItem value="colors">
              <AccordionTrigger className="text-sm font-medium py-2">
                <div className="flex items-center gap-2">
                  <Palette className="h-4 w-4" /> রঙ কাস্টমাইজ
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-3 pt-2">
                <div>
                  <Label className="text-xs">প্রাইমারি কালার</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Input
                      type="color"
                      value={selectedColor}
                      onChange={(e) => setSelectedColor(e.target.value)}
                      className="w-12 h-8 p-1 cursor-pointer"
                    />
                    <Input
                      value={selectedColor}
                      onChange={(e) => setSelectedColor(e.target.value)}
                      className="flex-1 h-8 text-xs"
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-xs">সেকেন্ডারি কালার</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Input
                      type="color"
                      value={secondaryColor}
                      onChange={(e) => setSecondaryColor(e.target.value)}
                      className="w-12 h-8 p-1 cursor-pointer"
                    />
                    <Input
                      value={secondaryColor}
                      onChange={(e) => setSecondaryColor(e.target.value)}
                      className="flex-1 h-8 text-xs"
                    />
                  </div>
                </div>
                <div className="p-2 border rounded-md">
                  <p className="text-xs text-muted-foreground mb-2">প্রিভিউ</p>
                  <div className="flex gap-2">
                    <div className="w-10 h-10 rounded" style={{ backgroundColor: selectedColor }} />
                    <div className="w-10 h-10 rounded" style={{ backgroundColor: secondaryColor }} />
                    <div
                      className="flex-1 h-10 rounded"
                      style={{ background: `linear-gradient(135deg, ${selectedColor}, ${secondaryColor})` }}
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* ব্র্যান্ডিং */}
            <AccordionItem value="branding">
              <AccordionTrigger className="text-sm font-medium py-2">
                <div className="flex items-center gap-2">
                  <Image className="h-4 w-4" /> লোগো ও ব্যানার
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-3 pt-2">
                <div>
                  <Label className="text-xs">লোগো URL</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Input
                      placeholder="https://example.com/logo.png"
                      value={logoUrl}
                      onChange={(e) => setLogoUrl(e.target.value)}
                      className="flex-1 h-8 text-xs"
                    />
                    <Button size="sm" variant="outline" className="h-8">
                      <Upload className="h-3 w-3" />
                    </Button>
                  </div>
                  {logoUrl && (
                    <img src={logoUrl} alt="Logo" className="h-12 w-auto mt-2 rounded border" />
                  )}
                </div>
                <div>
                  <Label className="text-xs">ব্যানার URL</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Input
                      placeholder="https://example.com/banner.jpg"
                      value={bannerUrl}
                      onChange={(e) => setBannerUrl(e.target.value)}
                      className="flex-1 h-8 text-xs"
                    />
                    <Button size="sm" variant="outline" className="h-8">
                      <Upload className="h-3 w-3" />
                    </Button>
                  </div>
                  {bannerUrl && (
                    <img src={bannerUrl} alt="Banner" className="w-full h-16 object-cover mt-2 rounded border" />
                  )}
                </div>
                <div>
                  <Label className="text-xs">স্টোর নাম</Label>
                  <Input value={storeName} readOnly className="mt-1 h-8 text-xs bg-muted" />
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* টাইপোগ্রাফি */}
            <AccordionItem value="typography">
              <AccordionTrigger className="text-sm font-medium py-2">
                <div className="flex items-center gap-2">
                  <Type className="h-4 w-4" /> ফন্ট স্টাইল
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-3 pt-2">
                <div>
                  <Label className="text-xs">ফন্ট ফ্যামিলি</Label>
                  <Select value={selectedFont} onValueChange={setSelectedFont}>
                    <SelectTrigger className="h-8 text-xs mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {['Hind Siliguri', 'Noto Sans Bengali', 'SolaimanLipi', 'Kalpurush', 'Galada', 'Tiro Bangla'].map((font) => (
                        <SelectItem key={font} value={font} className="text-xs">
                          {font}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="p-2 border rounded-md" style={{ fontFamily: selectedFont }}>
                  <p className="text-sm">ফন্ট প্রিভিউ: বাংলায় দেখুন</p>
                  <p className="text-xs text-muted-foreground">Font Preview: English Text</p>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* স্টাইল সেটিংস */}
            <AccordionItem value="style">
              <AccordionTrigger className="text-sm font-medium py-2">
                <div className="flex items-center gap-2">
                  <BoxSelect className="h-4 w-4" /> বর্ডার ও শ্যাডো
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-3 pt-2">
                <div>
                  <Label className="text-xs">বর্ডার রেডিয়াস: {borderRadius}px</Label>
                  <Slider
                    value={[borderRadius]}
                    onValueChange={([v]) => setBorderRadius(v)}
                    min={0}
                    max={24}
                    step={2}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label className="text-xs">শ্যাডো লেভেল</Label>
                  <Select value={shadowLevel} onValueChange={(v: any) => setShadowLevel(v)}>
                    <SelectTrigger className="h-8 text-xs mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none" className="text-xs">কোনো শ্যাডো নেই</SelectItem>
                      <SelectItem value="sm" className="text-xs">হালকা (sm)</SelectItem>
                      <SelectItem value="md" className="text-xs">মাঝারি (md)</SelectItem>
                      <SelectItem value="lg" className="text-xs">গভীর (lg)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2 justify-center pt-2">
                  {(['none', 'sm', 'md', 'lg'] as const).map((s) => (
                    <div
                      key={s}
                      className={cn(
                        'w-12 h-12 bg-background border',
                        s === 'none' && 'shadow-none',
                        s === 'sm' && 'shadow-sm',
                        s === 'md' && 'shadow-md',
                        s === 'lg' && 'shadow-lg',
                        shadowLevel === s && 'ring-2 ring-primary'
                      )}
                      style={{ borderRadius: `${borderRadius}px` }}
                      onClick={() => setShadowLevel(s)}
                    />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* স্পেসিং */}
            <AccordionItem value="spacing">
              <AccordionTrigger className="text-sm font-medium py-2">
                <div className="flex items-center gap-2">
                  <Move className="h-4 w-4" /> স্পেসিং
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-3 pt-2">
                <div className="grid grid-cols-3 gap-2">
                  {([
                    { id: 'compact', label: 'কম্প্যাক্ট' },
                    { id: 'normal', label: 'নরমাল' },
                    { id: 'relaxed', label: 'রিল্যাক্সড' },
                  ] as const).map((s) => (
                    <Button
                      key={s.id}
                      variant={spacing === s.id ? 'default' : 'outline'}
                      size="sm"
                      className="text-xs"
                      onClick={() => setSpacing(s.id)}
                    >
                      {s.label}
                    </Button>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* অ্যানিমেশন */}
            <AccordionItem value="animation">
              <AccordionTrigger className="text-sm font-medium py-2">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4" /> অ্যানিমেশন
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <Label className="text-xs">অ্যানিমেশন চালু</Label>
                  <Switch checked={enableAnimations} onCheckedChange={setEnableAnimations} />
                </div>
                {enableAnimations && (
                  <div>
                    <Label className="text-xs">অ্যানিমেশন টাইপ</Label>
                    <Select value={animationType} onValueChange={(v: any) => setAnimationType(v)}>
                      <SelectTrigger className="h-8 text-xs mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fade" className="text-xs">Fade In</SelectItem>
                        <SelectItem value="slide" className="text-xs">Slide Up</SelectItem>
                        <SelectItem value="scale" className="text-xs">Scale In</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>

            {/* কাস্টম CSS */}
            <AccordionItem value="custom-css">
              <AccordionTrigger className="text-sm font-medium py-2">
                <div className="flex items-center gap-2">
                  <Code className="h-4 w-4" /> কাস্টম CSS
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-3 pt-2">
                <Textarea
                  placeholder=".my-class { color: red; }"
                  value={customCss}
                  onChange={(e) => setCustomCss(e.target.value)}
                  rows={4}
                  className="text-xs font-mono"
                />
                <p className="text-xs text-muted-foreground">
                  আপনার স্টোরে কাস্টম CSS যোগ করুন (অ্যাডভান্সড)
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="pt-3 flex justify-end border-t">
            <Button onClick={handleSave} size="sm">
              <Save className="h-4 w-4 mr-2" />
              সেটিংস সেভ করুন
            </Button>
          </div>
        </div>
      );
    }
    
    return null;
  };

  // সাইডবার টগল বাটন
  const SidebarToggleButton = () => (
    <Button
      variant="ghost"
      size="icon"
      className="absolute -right-3 top-20 h-6 w-6 rounded-full bg-background border shadow-sm z-10"
      onClick={() => setSidebarCollapsed(prev => !prev)}
    >
      {sidebarCollapsed ? <PanelRight className="h-3 w-3" /> : <PanelLeft className="h-3 w-3" />}
    </Button>
  );

  return (
    <div className="w-full h-full flex flex-col">
      {/* এডিট টুলবার */}
      <div className="flex items-center gap-2 bg-muted p-1.5 border-b">
        <div className="flex items-center gap-0.5">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleUndo} disabled={historyIndex <= 0}>
            <Undo className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleRedo} disabled={historyIndex >= history.length - 1}>
            <Redo className="h-4 w-4" />
          </Button>
        </div>
        <Separator orientation="vertical" className="h-6" />
        <div className="flex gap-1">
          <Button variant="ghost" size="sm" className={previewDevice === 'desktop' ? 'bg-accent/20' : ''} onClick={() => setPreviewDevice('desktop')}>
            <Monitor className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">ডেস্কটপ</span>
          </Button>
          <Button variant="ghost" size="sm" className={previewDevice === 'mobile' ? 'bg-accent/20' : ''} onClick={() => setPreviewDevice('mobile')}>
            <Smartphone className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">মোবাইল</span>
          </Button>
        </div>
        <Separator orientation="vertical" className="h-6 hidden sm:block" />
        <div className="hidden sm:flex items-center gap-1 ml-auto">
          <Button variant="secondary" size="sm">
            <Eye className="h-4 w-4 mr-2" /> প্রিভিউ
          </Button>
          <Button size="sm" onClick={handleSave} disabled={loading}>
            <Save className="h-4 w-4 mr-2" /> সেভ
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-0 h-full">
        {/* সাইডবার (অবস্থা অনুযায়ী সংকুচিত হতে পারে) */}
        <div className={cn(
          "relative border-r bg-white overflow-hidden transition-all duration-300",
          sidebarCollapsed ? "w-0" : "w-full md:w-64 md:min-w-64"
        )}>
          <SidebarToggleButton />
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="templates" className="flex items-center gap-1">
                <Palette className="h-4 w-4" />
                <span className="hidden sm:inline">টেমপ্লেট</span>
              </TabsTrigger>
              <TabsTrigger value="elements" className="flex items-center gap-1">
                <Layers className="h-4 w-4" />
                <span className="hidden sm:inline">এলিমেন্টস</span>
              </TabsTrigger>
              <TabsTrigger value="design" className="flex items-center gap-1">
                <PencilRuler className="h-4 w-4" />
                <span className="hidden sm:inline">ডিজাইন</span>
              </TabsTrigger>
            </TabsList>
            <div className="overflow-y-auto max-h-[600px]">
              {renderTabContent()}
            </div>
          </Tabs>
        </div>

        {/* প্রিভিউ এরিয়া */}
        <div className="flex-1 border-l overflow-hidden flex flex-col bg-slate-50">
          <div 
            className="flex-1 p-4 overflow-y-auto relative"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <div className={cn(
              "min-h-[500px] transition-all duration-300 mx-auto",
              previewDevice === 'mobile' ? "max-w-[375px]" : "w-full max-w-full"
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
                  className="absolute bg-white border-2 border-primary rounded-md p-2 shadow-md transition-transform hover:scale-[1.02] cursor-move"
                  style={{
                    left: `${element.position.x}px`,
                    top: `${element.position.y}px`
                  }}
                >
                  <div className="flex items-center gap-2">
                    {ELEMENTS.find(el => el.id === element.type)?.icon}
                    <span className="text-sm">{element.content}</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-6 w-6 p-0 ml-2"
                      onClick={() => handleElementDelete(element.id)}
                    >
                      <Trash className="h-3.5 w-3.5 text-red-500" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* মোবাইল ফ্লোটিং অ্যাকশন বাটন */}
          <div className="md:hidden flex justify-center p-2 border-t bg-white">
            <Button onClick={handleSave} disabled={loading} className="w-full">
              <Save className="h-4 w-4 mr-2" /> ডিজাইন সেভ করুন
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DragDropEditor;
