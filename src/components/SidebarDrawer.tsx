
import React, { useState } from "react";
import { Menu, X, ChevronRight } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAuth } from '@/hooks/useAuth';

export function SidebarDrawer() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { user, isAuthenticated } = useAuth();

  const sections = [
    {
      title: 'মাধ্যম',
      links: [
        { label: 'হোম', href: '/' },
        { label: 'রেন্টাল', href: '/rentals' },
        { label: 'সার্ভিস', href: '/services' },
        { label: 'মার্কেটপ্লেস', href: '/shopping' },
        { label: 'স্টোরি', href: '/stories' },
      ],
    },
    {
      title: 'কমিউনিটি',
      links: [
        { label: 'ইভেন্ট', href: '/events' },
        { label: 'ফোরাম', href: '/forums' },
        { label: 'গ্রুপ বুকিং', href: '/group-booking' },
      ],
    },
    {
      title: 'একাউন্ট',
      links: [
        { label: 'প্রোফাইল', href: '/profile-management', authRequired: true },
        { label: 'নোটিফিকেশন', href: '/notifications', authRequired: true },
        { label: 'সেটিংস', href: '/security', authRequired: true },
        { label: 'ফিডব্যাক', href: '/feedback' },
        { label: 'সাহায্য', href: '/help' },
        { label: isAuthenticated ? 'লগআউট' : 'লগইন', href: isAuthenticated ? '#logout' : '/login' },
      ],
    },
  ];

  const handleNavigate = (href: string) => {
    if (href === '#logout') {
      // Handle logout
      return;
    }
    navigate(href);
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="mr-2 sm:flex">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[280px] sm:w-[350px] p-0 bg-background/95 backdrop-blur-lg border-r border-border/50">
        <SheetHeader className="p-4 text-left border-b border-border/10">
          <div className="flex items-center justify-between">
            <Link to="/" onClick={() => setOpen(false)}>
              <SheetTitle className="text-xl font-bold text-primary">Reservio</SheetTitle>
            </Link>
            <ThemeToggle />
          </div>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-80px)] px-2">
          <div className="mt-4 pb-8">
            {isAuthenticated && (
              <div className="p-4">
                <div className="flex items-center space-x-3 mb-4">
                  <img 
                    src={user?.avatar || "https://i.pravatar.cc/150?img=1"} 
                    alt={user?.name || "User"}
                    className="h-12 w-12 rounded-full border-2 border-primary/30"
                  />
                  <div>
                    <div className="font-medium">{user?.name || "User"}</div>
                    <div className="text-xs text-muted-foreground">{user?.email || ""}</div>
                  </div>
                </div>
              </div>
            )}

            {sections.map((section, idx) => (
              <div key={section.title} className={`pb-2 ${idx > 0 ? 'mt-6' : ''}`}>
                <h2 className="text-muted-foreground font-medium text-xs px-4 mb-1">
                  {section.title}
                </h2>
                <Separator className="mb-2 bg-border/40" />
                <div className="space-y-1">
                  {section.links
                    .filter(link => !link.authRequired || isAuthenticated)
                    .map((link) => (
                      <Button
                        key={link.label}
                        variant="ghost"
                        className="w-full justify-start text-left rounded-lg hover:bg-accent/50"
                        onClick={() => handleNavigate(link.href)}
                      >
                        <motion.div 
                          className="flex items-center justify-between w-full"
                          whileHover={{ x: 2 }}
                          transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        >
                          <span>{link.label}</span>
                          <ChevronRight className="h-4 w-4 opacity-50" />
                        </motion.div>
                      </Button>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
