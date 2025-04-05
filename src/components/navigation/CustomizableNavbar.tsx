
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Home, 
  ShoppingBag, 
  Bookmark, 
  Settings, 
  Heart, 
  MessageSquare, 
  Bell, 
  Search, 
  Coffee, 
  UserCircle,
  Edit,
  Check,
  Grip,
  MoreHorizontal
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { useAuth } from '@/hooks/useAuth';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Badge } from '@/components/ui/badge';

// Define nav item type
type NavItem = {
  id: string;
  name: { en: string; bn: string };
  path: string;
  icon: React.ReactNode;
  isVisible: boolean;
  order: number;
};

export const CustomizableNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { language, t } = useApp();
  const { isAuthenticated, user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCustomizeDialogOpen, setIsCustomizeDialogOpen] = useState(false);
  const [navItems, setNavItems] = useState<NavItem[]>([]);
  const [activeCustomizing, setActiveCustomizing] = useState(false);
  
  // Default navigation items
  const defaultNavItems: NavItem[] = [
    { 
      id: 'home', 
      name: { en: 'Home', bn: 'হোম' }, 
      path: '/', 
      icon: <Home className="h-5 w-5" />, 
      isVisible: true,
      order: 0
    },
    { 
      id: 'services', 
      name: { en: 'Services', bn: 'সেবাসমূহ' }, 
      path: '/services', 
      icon: <Coffee className="h-5 w-5" />, 
      isVisible: true,
      order: 1
    },
    { 
      id: 'shopping', 
      name: { en: 'Shop', bn: 'শপিং' }, 
      path: '/shopping', 
      icon: <ShoppingBag className="h-5 w-5" />, 
      isVisible: true,
      order: 2
    },
    { 
      id: 'rentals', 
      name: { en: 'Rent', bn: 'ভাড়া' }, 
      path: '/rentals', 
      icon: <Bookmark className="h-5 w-5" />, 
      isVisible: true,
      order: 3
    },
    { 
      id: 'favorites', 
      name: { en: 'Favorites', bn: 'পছন্দসমূহ' }, 
      path: '/favorites', 
      icon: <Heart className="h-5 w-5" />, 
      isVisible: true,
      order: 4
    },
    { 
      id: 'messages', 
      name: { en: 'Messages', bn: 'মেসেজ' }, 
      path: '/messages', 
      icon: <MessageSquare className="h-5 w-5" />, 
      isVisible: true,
      order: 5
    },
    { 
      id: 'notifications', 
      name: { en: 'Notifications', bn: 'নোটিফিকেশন' }, 
      path: '/notifications', 
      icon: <Bell className="h-5 w-5" />, 
      isVisible: true,
      order: 6
    },
    { 
      id: 'search', 
      name: { en: 'Search', bn: 'সার্চ' }, 
      path: '/search', 
      icon: <Search className="h-5 w-5" />, 
      isVisible: true,
      order: 7
    },
    { 
      id: 'settings', 
      name: { en: 'Settings', bn: 'সেটিংস' }, 
      path: '/settings', 
      icon: <Settings className="h-5 w-5" />, 
      isVisible: false,
      order: 8
    }
  ];
  
  // Load saved navbar configuration on mount
  useEffect(() => {
    const savedNavConfig = localStorage.getItem('navbarConfig');
    if (savedNavConfig) {
      try {
        const parsedConfig = JSON.parse(savedNavConfig);
        setNavItems(parsedConfig);
      } catch (error) {
        console.error('Error loading navbar config:', error);
        setNavItems(defaultNavItems);
      }
    } else {
      setNavItems(defaultNavItems);
    }
  }, []);
  
  // Save navbar configuration when it changes
  useEffect(() => {
    if (navItems.length > 0) {
      localStorage.setItem('navbarConfig', JSON.stringify(navItems));
    }
  }, [navItems]);

  const handleNavClick = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const items = Array.from(navItems);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    // Update order property
    const updatedItems = items.map((item, index) => ({
      ...item,
      order: index
    }));
    
    setNavItems(updatedItems);
  };

  const toggleItemVisibility = (id: string) => {
    setNavItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, isVisible: !item.isVisible } : item
      )
    );
  };

  const resetToDefault = () => {
    setNavItems(defaultNavItems);
  };

  const saveCustomization = () => {
    setActiveCustomizing(false);
    setIsCustomizeDialogOpen(false);
  };

  // Filter visible items and sort by order
  const visibleNavItems = navItems
    .filter(item => item.isVisible)
    .sort((a, b) => a.order - b.order);
    
  // Show only the first 6 items in the navbar, the rest go to the "More" dropdown
  const displayedNavItems = visibleNavItems.slice(0, 6);
  const overflowNavItems = visibleNavItems.slice(6);

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden md:flex bg-background border-b sticky top-0 z-50">
        <div className="container flex items-center justify-between h-16 px-4">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              className="font-bold text-xl"
              onClick={() => navigate('/')}
            >
              {language === 'bn' ? 'সার্ভিস অ্যাপ' : 'Service App'}
            </Button>
            
            <nav className="flex items-center space-x-1">
              {displayedNavItems.map((item) => (
                <Button
                  key={item.id}
                  variant={location.pathname === item.path ? "default" : "ghost"}
                  size="sm"
                  onClick={() => handleNavClick(item.path)}
                  className="flex items-center gap-1.5"
                >
                  {item.icon}
                  <span>{language === 'bn' ? item.name.bn : item.name.en}</span>
                </Button>
              ))}
              
              {overflowNavItems.length > 0 && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-5 w-5" />
                      <span className="ml-1">{language === 'bn' ? 'আরও' : 'More'}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {overflowNavItems.map((item) => (
                      <DropdownMenuItem
                        key={item.id}
                        onClick={() => handleNavClick(item.path)}
                      >
                        <div className="flex items-center">
                          {item.icon}
                          <span className="ml-2">
                            {language === 'bn' ? item.name.bn : item.name.en}
                          </span>
                        </div>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </nav>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setIsCustomizeDialogOpen(true)}
            >
              <Edit className="h-4 w-4 mr-1" />
              {language === 'bn' ? 'কাস্টমাইজ' : 'Customize'}
            </Button>
            
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar>
                      <AvatarImage src={user?.avatar} alt={user?.name} />
                      <AvatarFallback>
                        {user?.name?.charAt(0) || <UserCircle className="h-6 w-6" />}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    {language === 'bn' ? 'প্রোফাইল' : 'Profile'}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/settings')}>
                    {language === 'bn' ? 'সেটিংস' : 'Settings'}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button onClick={() => navigate('/login')}>
                {language === 'bn' ? 'লগইন' : 'Login'}
              </Button>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <div className="md:hidden bg-background border-b sticky top-0 z-50">
        <div className="flex items-center justify-between h-16 px-4">
          <Button 
            variant="ghost" 
            className="font-bold text-lg"
            onClick={() => navigate('/')}
          >
            {language === 'bn' ? 'সার্ভিস অ্যাপ' : 'Service App'}
          </Button>
          
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[80%]">
              <SheetTitle className="text-left mb-6">
                {language === 'bn' ? 'মেনু' : 'Menu'}
              </SheetTitle>
              
              <div className="space-y-4 mt-2">
                {isAuthenticated && (
                  <div className="flex items-center space-x-3 mb-6">
                    <Avatar>
                      <AvatarImage src={user?.avatar} />
                      <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{user?.name}</div>
                      <div className="text-sm text-muted-foreground">{user?.email}</div>
                    </div>
                  </div>
                )}
                
                {visibleNavItems.map((item) => (
                  <Button
                    key={item.id}
                    variant={location.pathname === item.path ? "default" : "ghost"}
                    className="w-full justify-start text-left"
                    onClick={() => handleNavClick(item.path)}
                  >
                    <div className="flex items-center">
                      {item.icon}
                      <span className="ml-3">
                        {language === 'bn' ? item.name.bn : item.name.en}
                      </span>
                    </div>
                  </Button>
                ))}
                
                <div className="pt-4 mt-4 border-t">
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsCustomizeDialogOpen(true);
                    }}
                  >
                    <Edit className="h-4 w-4 mr-3" />
                    {language === 'bn' ? 'মেনু কাস্টমাইজ করুন' : 'Customize Menu'}
                  </Button>
                  
                  {!isAuthenticated && (
                    <Button 
                      className="w-full mt-4"
                      onClick={() => handleNavClick('/login')}
                    >
                      {language === 'bn' ? 'লগইন' : 'Login'}
                    </Button>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      
      {/* Customize Dialog */}
      <Dialog open={isCustomizeDialogOpen} onOpenChange={setIsCustomizeDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogTitle>
            {language === 'bn' ? 'নেভিগেশন কাস্টমাইজ করুন' : 'Customize Navigation'}
          </DialogTitle>
          
          <div className="py-4">
            <p className="text-sm text-muted-foreground mb-4">
              {language === 'bn' 
                ? 'আপনার পছন্দসই মেনু আইটেম সিলেক্ট করুন ও আকারে বিন্যাস করুন।' 
                : 'Select your preferred menu items and arrange them by dragging.'}
            </p>
            
            <div className="flex justify-end mb-4">
              <Button 
                variant="outline" 
                size="sm"
                onClick={resetToDefault}
              >
                {language === 'bn' ? 'ডিফল্ট সেট করুন' : 'Reset to Default'}
              </Button>
            </div>
            
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="nav-items">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="space-y-2"
                  >
                    {navItems
                      .sort((a, b) => a.order - b.order)
                      .map((item, index) => (
                        <Draggable key={item.id} draggableId={item.id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className={`flex items-center justify-between p-2 rounded-md border ${
                                item.isVisible ? 'bg-accent/10' : 'bg-background'
                              }`}
                            >
                              <div className="flex items-center">
                                <div {...provided.dragHandleProps} className="mr-2">
                                  <Grip className="h-4 w-4 text-muted-foreground" />
                                </div>
                                <div className="flex items-center">
                                  {item.icon}
                                  <span className="ml-3">
                                    {language === 'bn' ? item.name.bn : item.name.en}
                                  </span>
                                </div>
                              </div>
                              
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleItemVisibility(item.id)}
                              >
                                {item.isVisible ? (
                                  <Check className="h-4 w-4 text-green-500" />
                                ) : (
                                  <X className="h-4 w-4 text-muted-foreground" />
                                )}
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
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsCustomizeDialogOpen(false)}
            >
              {language === 'bn' ? 'বাতিল' : 'Cancel'}
            </Button>
            <Button onClick={saveCustomization}>
              {language === 'bn' ? 'সেভ করুন' : 'Save'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CustomizableNavbar;
