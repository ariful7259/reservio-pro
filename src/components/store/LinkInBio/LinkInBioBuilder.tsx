
import React, { useState, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { 
  QrCode, Instagram, Smartphone, Monitor, ArrowDown, Facebook, 
  Layers, Plus, Trash2, Paintbrush, BarChart3, Copy, Link, Sparkles,
  Twitter, Youtube, LinkedIn, TiktokIcon, DragDropIcon, Move, GripVertical,
  AlertCircle, Menu, Globe
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import QRCode from 'react-qr-code';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

interface LinkItem {
  id: string;
  title: string;
  url: string;
  type: 'link' | 'social' | 'heading';
  icon?: string;
}

interface Template {
  id: string;
  name: string;
  preview: string;
  colors: {
    background: string;
    text: string;
    button: string;
  };
}

// TikTok আইকন কম্পোনেন্ট
const TiktokIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

// ড্র্যাগ-এন্ড-ড্রপ আইকন কম্পোনেন্ট
const DragDropIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M14 12a2 2 0 1 0-4 0 2 2 0 0 0 4 0Z" />
    <path d="M14 4a2 2 0 1 0-4 0 2 2 0 0 0 4 0Z" />
    <path d="M14 20a2 2 0 1 0-4 0 2 2 0 0 0 4 0Z" />
  </svg>
);

const LinkInBioBuilder: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('links');
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('mobile');
  const [linkItems, setLinkItems] = useState<LinkItem[]>([
    { id: '1', title: 'আমাদের কোর্স দেখুন', url: 'https://courses.example.com', type: 'link' },
    { id: '2', title: 'ইন্সটাগ্রাম', url: 'https://instagram.com/example', type: 'social', icon: 'instagram' },
    { id: '3', title: 'ফেসবুক', url: 'https://facebook.com/example', type: 'social', icon: 'facebook' }
  ]);
  const [newLinkTitle, setNewLinkTitle] = useState('');
  const [newLinkUrl, setNewLinkUrl] = useState('');
  const [selectedTheme, setSelectedTheme] = useState<string>('default');
  const [pageTitle, setPageTitle] = useState('আমার লিংক ইন বায়ো');
  const [profileImage, setProfileImage] = useState('');
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [selectedLink, setSelectedLink] = useState<string | null>(null);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const { toast } = useToast();

  const templates: Template[] = [
    {
      id: 'default',
      name: 'ডিফল্ট',
      preview: 'https://images.unsplash.com/photo-1508615039623-a25605d2b022?ixlib=rb-4.0.3&auto=format&fit=crop&w=150',
      colors: { background: '#ffffff', text: '#000000', button: '#3b82f6' }
    },
    {
      id: 'dark',
      name: 'ডার্ক',
      preview: 'https://images.unsplash.com/photo-1557682257-2f9c37a3a5f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=150',
      colors: { background: '#1f2937', text: '#ffffff', button: '#8b5cf6' }
    },
    {
      id: 'gradient',
      name: 'গ্রেডিয়েন্ট',
      preview: 'https://images.unsplash.com/photo-1579547945413-497e1b99dac0?ixlib=rb-4.0.3&auto=format&fit=crop&w=150',
      colors: { background: 'linear-gradient(to right, #4f46e5, #8b5cf6)', text: '#ffffff', button: '#ffffff' }
    },
    {
      id: 'nature',
      name: 'প্রকৃতি',
      preview: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&auto=format&fit=crop&w=150',
      colors: { background: '#f0fdf4', text: '#166534', button: '#16a34a' }
    },
    {
      id: 'ocean',
      name: 'সমুদ্র',
      preview: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&auto=format&fit=crop&w=150',
      colors: { background: 'linear-gradient(to bottom, #e0f2fe, #38bdf8)', text: '#0c4a6e', button: '#0284c7' }
    },
    {
      id: 'neon',
      name: 'নিওন',
      preview: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=150',
      colors: { background: '#18181b', text: '#fafafa', button: 'linear-gradient(to right, #ec4899, #8b5cf6)' }
    }
  ];

  const handleAddLink = () => {
    if (!newLinkTitle || !newLinkUrl) {
      toast({
        title: "সতর্কতা",
        description: "লিংকের নাম এবং URL উভয়ই প্রয়োজন",
        variant: "destructive",
      });
      return;
    }

    const newLink: LinkItem = {
      id: Date.now().toString(),
      title: newLinkTitle,
      url: newLinkUrl,
      type: 'link'
    };

    setLinkItems([...linkItems, newLink]);
    setNewLinkTitle('');
    setNewLinkUrl('');
    
    toast({
      title: "সফল",
      description: "নতুন লিংক যোগ করা হয়েছে",
    });
  };

  const handleAddSocialLink = (platform: string) => {
    const platformNames: Record<string, string> = {
      'facebook': 'ফেসবুক',
      'instagram': 'ইন্সটাগ্রাম',
      'twitter': 'টুইটার',
      'youtube': 'ইউটিউব',
      'linkedin': 'লিংকডইন',
      'tiktok': 'টিকটক',
      'website': 'ওয়েবসাইট'
    };

    const socialLink: LinkItem = {
      id: Date.now().toString(),
      title: platformNames[platform] || platform,
      url: `https://${platform}.com/yourusername`,
      type: 'social',
      icon: platform
    };

    setLinkItems([...linkItems, socialLink]);
    
    toast({
      title: "সফল",
      description: `${platformNames[platform] || platform} লিংক যোগ করা হয়েছে`,
    });
  };

  const handleRemoveLink = (id: string) => {
    setLinkItems(linkItems.filter(item => item.id !== id));
    
    toast({
      title: "সফল",
      description: "লিংক মুছে ফেলা হয়েছে",
    });
  };

  const handleGenerateQR = () => {
    toast({
      title: "QR কোড তৈরি হয়েছে",
      description: "আপনার QR কোড তৈরি করা হয়েছে। আপনি এটি ডাউনলোড বা শেয়ার করতে পারেন।",
    });
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://example.com/${pageTitle.replace(/\s+/g, '-').toLowerCase()}`);
    
    toast({
      title: "লিংক কপি হয়েছে",
      description: "লিংক কপি করা হয়েছে, আপনি এটি যেকোনো জায়গায় শেয়ার করতে পারেন।",
    });
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    
    const items = Array.from(linkItems);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setLinkItems(items);
    setIsDraggingOver(false);
    
    toast({
      title: "লিংক পুনঃসাজানো হয়েছে",
      description: "লিংকের অবস্থান পরিবর্তন করা হয়েছে",
    });
  };

  const handleDragStart = () => {
    setIsDraggingOver(true);
  };

  const renderSocialIcon = (icon?: string) => {
    switch (icon) {
      case 'instagram':
        return <Instagram className="h-4 w-4" />;
      case 'facebook':
        return <Facebook className="h-4 w-4" />;
      case 'twitter':
        return <Twitter className="h-4 w-4" />;
      case 'youtube':
        return <Youtube className="h-4 w-4" />;
      case 'linkedin':
        return <LinkedIn className="h-4 w-4" />;
      case 'tiktok':
        return <TiktokIcon className="h-4 w-4" />;
      case 'website':
        return <Globe className="h-4 w-4" />;
      default:
        return <Link className="h-4 w-4" />;
    }
  };

  const renderLinkEditor = () => {
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-sm font-medium">আপনার লিংক যুক্ত করুন</h3>
          <div className="grid grid-cols-1 gap-2">
            <Input
              placeholder="লিংকের নাম"
              value={newLinkTitle}
              onChange={(e) => setNewLinkTitle(e.target.value)}
            />
            <Input
              placeholder="URL (https://example.com)"
              value={newLinkUrl}
              onChange={(e) => setNewLinkUrl(e.target.value)}
            />
            <Button onClick={handleAddLink} className="w-full">
              <Plus className="h-4 w-4 mr-2" /> লিংক যুক্ত করুন
            </Button>
          </div>
        </div>

        <div className="border-t pt-4">
          <h3 className="text-sm font-medium mb-2">সোশ্যাল মিডিয়া লিংক</h3>
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center gap-2"
              onClick={() => handleAddSocialLink('facebook')}
            >
              <Facebook className="h-4 w-4" /> ফেসবুক
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center gap-2"
              onClick={() => handleAddSocialLink('instagram')}
            >
              <Instagram className="h-4 w-4" /> ইন্সটাগ্রাম
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center gap-2"
              onClick={() => handleAddSocialLink('twitter')}
            >
              <Twitter className="h-4 w-4" /> টুইটার
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-2">
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center gap-2"
              onClick={() => handleAddSocialLink('youtube')}
            >
              <Youtube className="h-4 w-4" /> ইউটিউব
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center gap-2"
              onClick={() => handleAddSocialLink('linkedin')}
            >
              <LinkedIn className="h-4 w-4" /> লিংকডইন
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center gap-2"
              onClick={() => handleAddSocialLink('tiktok')}
            >
              <TiktokIcon className="h-4 w-4" /> টিকটক
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center gap-2"
              onClick={() => handleAddSocialLink('website')}
            >
              <Globe className="h-4 w-4" /> ওয়েবসাইট
            </Button>
          </div>
        </div>
        
        <div className="border-t pt-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium">আপনার লিংকগুলো</h3>
            <div className="flex items-center text-xs text-muted-foreground">
              <DragDropIcon className="h-3.5 w-3.5 mr-1" /> ড্র্যাগ করে পুনঃসাজান
            </div>
          </div>
          
          <DragDropContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
            <Droppable droppableId="links">
              {(provided) => (
                <div 
                  className={cn(
                    "space-y-2 transition-all", 
                    isDraggingOver && "bg-accent/5 rounded-md p-2"
                  )}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {linkItems.length === 0 ? (
                    <p className="text-muted-foreground text-sm text-center py-4">কোনো লিংক যুক্ত করা হয়নি</p>
                  ) : (
                    linkItems.map((item, index) => (
                      <Draggable key={item.id} draggableId={item.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className={cn(
                              "flex items-center justify-between p-3 border rounded-md group hover:border-primary/30 hover:bg-primary/5 transition-colors",
                              selectedLink === item.id && "border-primary/50 bg-primary/10"
                            )}
                            onClick={() => setSelectedLink(item.id)}
                          >
                            <div className="flex items-center gap-2 w-full overflow-hidden">
                              <div 
                                {...provided.dragHandleProps}
                                className="text-gray-400 hover:text-gray-600 cursor-move p-1"
                              >
                                <GripVertical className="h-4 w-4" />
                              </div>
                              {renderSocialIcon(item.type === 'social' ? item.icon : undefined)}
                              <span className="text-sm truncate">{item.title}</span>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveLink(item.id);
                              }}
                              className="opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        )}
                      </Draggable>
                    ))
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    );
  };

  const renderDesignEditor = () => {
    return (
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium mb-2">পেজের তথ্য</h3>
          <div className="space-y-2">
            <Input 
              placeholder="পেজের শিরোনাম" 
              value={pageTitle}
              onChange={(e) => setPageTitle(e.target.value)}
            />
            <Input 
              placeholder="প্রোফাইল ছবির URL" 
              value={profileImage}
              onChange={(e) => setProfileImage(e.target.value)}
            />
          </div>
        </div>

        <div className="border-t pt-4">
          <h3 className="text-sm font-medium mb-2">থিম নির্বাচন করুন</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {templates.map(template => (
              <div 
                key={template.id}
                className={cn(
                  "border rounded-md overflow-hidden cursor-pointer transition-all hover:scale-[1.03] hover:shadow-md",
                  selectedTheme === template.id ? "ring-2 ring-primary" : ""
                )}
                onClick={() => setSelectedTheme(template.id)}
              >
                <div className="aspect-[9/16] w-full h-24 overflow-hidden">
                  <img 
                    src={template.preview} 
                    alt={template.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-2 text-xs font-medium text-center">{template.name}</div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-4">
            <Badge className="bg-gradient-to-r from-purple-500 to-blue-500">
              <Sparkles className="h-3 w-3 mr-1" />
              <span>কাস্টম থিম প্রিমিয়াম ফিচার</span>
            </Badge>
          </div>
        </div>
      </div>
    );
  };

  const renderQRCode = () => {
    return (
      <div className="space-y-4">
        <div className="flex justify-center">
          <div className="bg-white p-4 rounded-md">
            <QRCode
              size={180}
              value={`https://example.com/${pageTitle.replace(/\s+/g, '-').toLowerCase()}`}
              viewBox={`0 0 180 180`}
            />
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-sm mb-4">আপনার লিংক ইন বায়ো পেজের QR কোড</p>
          <Button onClick={handleGenerateQR} className="w-full">
            <QrCode className="h-4 w-4 mr-2" /> QR কোড ডাউনলোড করুন
          </Button>
        </div>
        
        <div className="border-t pt-4">
          <h3 className="text-sm font-medium mb-2">পাবলিক লিংক</h3>
          <div className="flex">
            <Input 
              value={`example.com/${pageTitle.replace(/\s+/g, '-').toLowerCase()}`}
              readOnly
            />
            <Button onClick={handleCopyLink} className="ml-2">
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="border-t pt-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-blue-700">এনালিটিক্স</h3>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowAnalytics(!showAnalytics)}
            >
              {showAnalytics ? 'সংক্ষিপ্ত দেখুন' : 'বিস্তারিত দেখুন'}
            </Button>
          </div>
          
          <div className="bg-blue-50 border border-blue-100 rounded-md p-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3">
              <div>
                <h4 className="text-sm font-medium text-blue-700">লিংক পারফরম্যান্স</h4>
                <p className="text-xs text-blue-600">গত ৩০ দিনের তথ্য</p>
              </div>
              <Badge className="bg-blue-100 text-blue-700">
                <Sparkles className="h-3 w-3 mr-1" />
                <span>প্রিমিয়াম ফিচার</span>
              </Badge>
            </div>
            
            {showAnalytics && (
              <div className="mt-4 space-y-3">
                {linkItems.slice(0, 3).map(item => (
                  <div key={item.id} className="flex justify-between items-center p-2 bg-white rounded border border-blue-100">
                    <div className="flex items-center gap-2">
                      {renderSocialIcon(item.type === 'social' ? item.icon : undefined)}
                      <span className="text-sm font-medium">{item.title}</span>
                    </div>
                    <div className="text-sm">
                      {Math.floor(Math.random() * 500) + 10} ক্লিক
                    </div>
                  </div>
                ))}
                
                <div className="pt-2 text-center">
                  <Button variant="link" size="sm" className="text-blue-700">
                    পুরো রিপোর্ট দেখুন
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const getSelectedTemplate = () => {
    return templates.find(t => t.id === selectedTheme) || templates[0];
  };

  const getPreviewStyles = () => {
    const template = getSelectedTemplate();
    return { 
      background: template.colors.background,
      color: template.colors.text
    };
  };

  const getLinkButtonStyle = (index: number) => {
    const template = getSelectedTemplate();
    let buttonStyle = {
      background: template.id === 'gradient' ? 'rgba(255, 255, 255, 0.2)' : template.colors.button,
      color: template.id === 'gradient' ? '#ffffff' : '#ffffff',
      border: template.id === 'gradient' ? '1px solid rgba(255, 255, 255, 0.3)' : 'none',
      transform: ''
    };
    
    // Add staggered animation
    buttonStyle.transform = `translateY(${index * 5}px)`;
    
    return buttonStyle;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-6">
      {/* বাম সাইডবার - এডিটর */}
      <div className="md:col-span-5 lg:col-span-4 order-2 md:order-1">
        <Card>
          <CardContent className="p-4">
            <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="links">
                  <Layers className="h-4 w-4 mr-2" />
                  <span>লিংকস</span>
                </TabsTrigger>
                <TabsTrigger value="design">
                  <Paintbrush className="h-4 w-4 mr-2" />
                  <span>ডিজাইন</span>
                </TabsTrigger>
                <TabsTrigger value="qr">
                  <QrCode className="h-4 w-4 mr-2" />
                  <span>QR & Analytics</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="links" className="mt-0">
                {renderLinkEditor()}
              </TabsContent>

              <TabsContent value="design" className="mt-0">
                {renderDesignEditor()}
              </TabsContent>

              <TabsContent value="qr" className="mt-0">
                {renderQRCode()}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* ডান সাইডবার - প্রিভিউ */}
      <div className="md:col-span-7 lg:col-span-8 order-1 md:order-2">
        <div className="bg-white border rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold">লিংক ইন বায়ো প্রিভিউ</h2>
            <div className="flex items-center bg-slate-100 rounded-md p-0.5">
              <Button 
                variant={viewMode === "desktop" ? "secondary" : "ghost"} 
                size="sm" 
                onClick={() => setViewMode("desktop")}
                className="flex items-center gap-1"
              >
                <Monitor className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">ডেস্কটপ</span>
              </Button>
              <Button 
                variant={viewMode === "mobile" ? "secondary" : "ghost"} 
                size="sm" 
                onClick={() => setViewMode("mobile")}
                className="flex items-center gap-1"
              >
                <Smartphone className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">মোবাইল</span>
              </Button>
            </div>
          </div>

          <div className="flex justify-center">
            <div 
              className={cn(
                "border rounded-lg overflow-hidden transition-all shadow-md",
                viewMode === "mobile" ? "w-64" : "w-full max-w-2xl"
              )}
            >
              <div 
                className="min-h-[500px] p-4 flex flex-col items-center"
                style={getPreviewStyles()}
              >
                {/* প্রোফাইল সেকশন */}
                <div className="flex flex-col items-center mb-6 mt-8">
                  {profileImage ? (
                    <img 
                      src={profileImage} 
                      alt="Profile" 
                      className="w-20 h-20 rounded-full object-cover border-2 border-white shadow-md"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400">ছবি</span>
                    </div>
                  )}
                  <h1 className="text-xl font-bold mt-4">{pageTitle || "আমার লিংক ইন বায়ো"}</h1>
                </div>

                {/* লিংক সেকশন */}
                <div className="w-full max-w-md space-y-3">
                  {linkItems.map((item, idx) => (
                    <a 
                      key={item.id}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full py-3 px-4 rounded-lg text-center transition-all hover:opacity-90 hover:scale-[1.02] animate-fade-in stagger-item"
                      style={getLinkButtonStyle(idx)}
                    >
                      <div className="flex items-center justify-center gap-2">
                        {renderSocialIcon(item.type === 'social' ? item.icon : undefined)}
                        <span>{item.title}</span>
                      </div>
                    </a>
                  ))}

                  {linkItems.length === 0 && (
                    <div className="border border-dashed border-gray-300 rounded-lg py-10 px-4 text-center">
                      <ArrowDown className="mx-auto h-6 w-6 text-gray-400 mb-2" />
                      <p className="text-sm opacity-70">বাম দিক থেকে লিংক যুক্ত করুন</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkInBioBuilder;
