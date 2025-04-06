
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PanelTop, Grip, Plus, X, Save, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { useApp } from '@/context/AppContext';
import { useAuth } from '@/hooks/useAuth';
import SmartSearch from './SmartSearch';

interface WidgetConfig {
  id: string;
  title: string;
  type: string;
  active: boolean;
  size: 'small' | 'medium' | 'large';
  order: number;
}

const CustomizableHomeScreen: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { language } = useApp();
  const { isAuthenticated } = useAuth();
  
  // Default widget configuration
  const defaultWidgets: WidgetConfig[] = [
    { id: 'recent', title: language === 'bn' ? 'সাম্প্রতিক' : 'Recent', type: 'recent', active: true, size: 'medium', order: 1 },
    { id: 'favorites', title: language === 'bn' ? 'পছন্দসমূহ' : 'Favorites', type: 'favorites', active: true, size: 'small', order: 2 },
    { id: 'recommendations', title: language === 'bn' ? 'রেকমেন্ডেড' : 'Recommended', type: 'recommendations', active: true, size: 'large', order: 3 },
    { id: 'nearby', title: language === 'bn' ? 'কাছাকাছি' : 'Nearby', type: 'nearby', active: true, size: 'medium', order: 4 },
    { id: 'trending', title: language === 'bn' ? 'ট্রেন্ডিং' : 'Trending', type: 'trending', active: true, size: 'small', order: 5 }
  ];
  
  const [widgets, setWidgets] = useState<WidgetConfig[]>(defaultWidgets);
  const [isEditing, setIsEditing] = useState(false);
  
  // Load widget configuration from localStorage
  useEffect(() => {
    const savedWidgets = localStorage.getItem('homeWidgets');
    if (savedWidgets) {
      try {
        const parsedWidgets = JSON.parse(savedWidgets);
        setWidgets(parsedWidgets);
      } catch (e) {
        console.error('Failed to parse saved widgets', e);
      }
    }
  }, []);
  
  const saveWidgetConfig = () => {
    localStorage.setItem('homeWidgets', JSON.stringify(widgets));
    setIsEditing(false);
    
    toast({
      description: language === 'bn' ? 'হোম স্ক্রিন কনফিগারেশন সেভ করা হয়েছে' : 'Home screen configuration saved',
    });
  };
  
  const toggleWidgetActive = (id: string) => {
    setWidgets(widgets.map(widget => 
      widget.id === id ? { ...widget, active: !widget.active } : widget
    ));
  };
  
  const changeWidgetSize = (id: string) => {
    setWidgets(widgets.map(widget => {
      if (widget.id === id) {
        const sizes: ('small' | 'medium' | 'large')[] = ['small', 'medium', 'large'];
        const currentIndex = sizes.indexOf(widget.size);
        const nextSize = sizes[(currentIndex + 1) % sizes.length];
        return { ...widget, size: nextSize };
      }
      return widget;
    }));
  };
  
  const moveWidgetUp = (id: string) => {
    const index = widgets.findIndex(w => w.id === id);
    if (index <= 0) return;
    
    const newWidgets = [...widgets];
    const currentOrder = newWidgets[index].order;
    newWidgets[index].order = newWidgets[index - 1].order;
    newWidgets[index - 1].order = currentOrder;
    
    setWidgets(newWidgets.sort((a, b) => a.order - b.order));
  };
  
  const moveWidgetDown = (id: string) => {
    const index = widgets.findIndex(w => w.id === id);
    if (index >= widgets.length - 1) return;
    
    const newWidgets = [...widgets];
    const currentOrder = newWidgets[index].order;
    newWidgets[index].order = newWidgets[index + 1].order;
    newWidgets[index + 1].order = currentOrder;
    
    setWidgets(newWidgets.sort((a, b) => a.order - b.order));
  };
  
  const resetToDefault = () => {
    setWidgets(defaultWidgets);
    localStorage.removeItem('homeWidgets');
    
    toast({
      description: language === 'bn' ? 'ডিফল্ট কনফিগারেশন পুনরায় সেট করা হয়েছে' : 'Reset to default configuration',
    });
  };
  
  // Mock widget content based on widget type
  const renderWidgetContent = (widget: WidgetConfig) => {
    if (!widget.active) return null;
    
    switch (widget.type) {
      case 'recent':
        return (
          <div className="p-2">
            <div className="grid grid-cols-2 gap-2">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="p-2 bg-gray-100 rounded-lg">
                  <div className="h-4 w-3/4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 w-1/2 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        );
        
      case 'favorites':
        return (
          <div className="p-2">
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs">
                  {language === 'bn' ? `পছন্দ ${i}` : `Favorite ${i}`}
                </div>
              ))}
            </div>
          </div>
        );
        
      case 'recommendations':
        return (
          <div className="p-2">
            <div className="grid grid-cols-2 gap-2">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="flex items-center p-2 bg-gray-100 rounded-lg">
                  <div className="h-10 w-10 bg-gray-200 rounded-full mr-2"></div>
                  <div>
                    <div className="h-3 w-20 bg-gray-200 rounded mb-1"></div>
                    <div className="h-2 w-16 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        
      case 'nearby':
        return (
          <div className="p-2">
            <div className="h-28 bg-gray-100 rounded-lg flex items-center justify-center">
              {language === 'bn' ? 'মানচিত্র লোড হচ্ছে...' : 'Loading map...'}
            </div>
          </div>
        );
        
      case 'trending':
        return (
          <div className="p-2">
            <div className="space-y-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center p-2 bg-gray-100 rounded-lg">
                  <div className="h-4 w-4 bg-gray-400 rounded-full flex items-center justify-center text-xs text-white mr-2">
                    {i}
                  </div>
                  <div className="h-3 w-24 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        );
        
      default:
        return (
          <div className="p-4 text-center">
            {language === 'bn' ? 'উইজেট কনটেন্ট' : 'Widget Content'}
          </div>
        );
    }
  };
  
  if (!isAuthenticated) {
    return (
      <div className="p-4">
        <SmartSearch showTrending={true} />
      </div>
    );
  }
  
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4 px-4">
        <h2 className="text-lg font-semibold">
          {language === 'bn' ? 'আপনার হোম স্ক্রিন' : 'Your Home Screen'}
        </h2>
        
        {isEditing ? (
          <div className="flex gap-2">
            <Button size="sm" variant="ghost" onClick={resetToDefault}>
              {language === 'bn' ? 'রিসেট' : 'Reset'}
            </Button>
            <Button size="sm" variant="default" onClick={saveWidgetConfig}>
              <Save className="h-4 w-4 mr-1" />
              {language === 'bn' ? 'সেভ' : 'Save'}
            </Button>
          </div>
        ) : (
          <Button size="sm" variant="outline" onClick={() => setIsEditing(true)}>
            <Settings className="h-4 w-4 mr-1" />
            {language === 'bn' ? 'কাস্টমাইজ' : 'Customize'}
          </Button>
        )}
      </div>
      
      <div className="space-y-4">
        {widgets
          .filter(widget => !isEditing || widget.active)
          .sort((a, b) => a.order - b.order)
          .map(widget => (
            <Card key={widget.id} className={`${isEditing ? 'border-dashed border-2' : ''}`}>
              <CardContent className="p-0">
                <div className="flex items-center justify-between p-2 border-b">
                  <div className="flex items-center">
                    {isEditing && <Grip className="h-4 w-4 text-muted-foreground mr-2" />}
                    <h3 className="font-medium">{widget.title}</h3>
                  </div>
                  
                  {isEditing && (
                    <div className="flex gap-1">
                      <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => moveWidgetUp(widget.id)}>
                        ↑
                      </Button>
                      <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => moveWidgetDown(widget.id)}>
                        ↓
                      </Button>
                      <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => changeWidgetSize(widget.id)}>
                        {widget.size === 'small' ? 'S' : widget.size === 'medium' ? 'M' : 'L'}
                      </Button>
                      <Button 
                        size="icon" 
                        variant={widget.active ? "default" : "outline"} 
                        className="h-6 w-6"
                        onClick={() => toggleWidgetActive(widget.id)}
                      >
                        {widget.active ? <X className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
                      </Button>
                    </div>
                  )}
                </div>
                
                <div className={`
                  ${widget.size === 'small' ? 'h-24' : widget.size === 'medium' ? 'h-40' : 'h-60'}
                  ${isEditing ? 'opacity-70' : ''}
                  overflow-hidden
                `}>
                  {renderWidgetContent(widget)}
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default CustomizableHomeScreen;
