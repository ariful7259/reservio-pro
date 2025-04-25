
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface MenuItem {
  icon: React.ReactNode;
  name: string;
  path: string;
  description?: string;
  show?: boolean;
  onClick?: () => void;
}

interface NavbarMenuProps {
  trigger: React.ReactNode;
  items: MenuItem[];
  title?: string;
  align?: 'start' | 'center' | 'end';
  className?: string;
}

const NavbarMenu: React.FC<NavbarMenuProps> = ({
  trigger,
  items,
  title,
  align = 'end',
  className
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const filteredItems = items.filter(item => !item.hasOwnProperty('show') || item.show);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        {trigger}
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align={align} 
        className={cn(
          "w-56 bg-background/80 backdrop-blur-md border border-border/50 p-1 rounded-xl", 
          className
        )}
      >
        <AnimatePresence>
          {isOpen && (
            <>
              {title && (
                <DropdownMenuLabel className="px-2 py-1.5">
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {title}
                  </motion.div>
                </DropdownMenuLabel>
              )}
              
              {title && <DropdownMenuSeparator className="my-1 bg-border/30" />}
              
              {filteredItems.map((item, index) => (
                <motion.div
                  key={`${item.name}-${index}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                >
                  <DropdownMenuItem asChild className="focus:bg-primary/10 rounded-lg p-0">
                    {item.onClick ? (
                      <button
                        onClick={() => {
                          item.onClick?.();
                          setIsOpen(false);
                        }}
                        className="flex flex-col w-full px-2 py-1.5"
                      >
                        <div className="flex items-center gap-2 w-full">
                          {item.icon}
                          <span>{item.name}</span>
                        </div>
                        {item.description && (
                          <p className="text-xs text-muted-foreground pl-6 mt-0.5">{item.description}</p>
                        )}
                      </button>
                    ) : (
                      <Link 
                        to={item.path}
                        className="flex flex-col w-full px-2 py-1.5"
                        onClick={() => setIsOpen(false)}
                      >
                        <div className="flex items-center gap-2">
                          {item.icon}
                          <span>{item.name}</span>
                        </div>
                        {item.description && (
                          <p className="text-xs text-muted-foreground pl-6 mt-0.5">{item.description}</p>
                        )}
                      </Link>
                    )}
                  </DropdownMenuItem>
                </motion.div>
              ))}
            </>
          )}
        </AnimatePresence>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavbarMenu;
