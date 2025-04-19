import * as React from "react"
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { cn } from "@/lib/utils"

interface SidebarContextProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  toggle: () => void;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

interface SidebarProviderProps {
  children: ReactNode;
  defaultOpen?: boolean;
}

export function SidebarProvider({ children, defaultOpen = false }: SidebarProviderProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1024) {
        setIsOpen(true);
      } else {
        setIsOpen(defaultOpen);
      }

      const handleResize = () => {
        if (window.innerWidth >= 1024) {
          setIsOpen(true);
        }
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [defaultOpen]);

  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen, toggle }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebarContext() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebarContext must be used within a SidebarProvider");
  }
  return context;
}

interface SidebarProps extends React.HTMLAttributes<HTMLElement> {}

export function Sidebar({ className, ...props }: SidebarProps) {
  const { isOpen } = useSidebarContext();

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 z-40 h-screen transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full",
        "lg:relative lg:translate-x-0",
        "w-64 bg-background border-r",
        className
      )}
      {...props}
    >
      {props.children}
    </aside>
  );
}

interface SidebarHeaderProps extends React.HTMLAttributes<HTMLElement> {}

export function SidebarHeader({ className, ...props }: SidebarHeaderProps) {
  return (
    <div className={cn("px-4 py-3", className)} {...props}>
      {props.children}
    </div>
  );
}

interface SidebarContentProps extends React.HTMLAttributes<HTMLElement> {}

export function SidebarContent({ className, ...props }: SidebarContentProps) {
  return (
    <div className={cn("flex flex-col flex-1 overflow-y-auto", className)} {...props}>
      {props.children}
    </div>
  );
}

interface SidebarFooterProps extends React.HTMLAttributes<HTMLElement> {}

export function SidebarFooter({ className, ...props }: SidebarFooterProps) {
  return (
    <div className={cn("px-4 py-3 mt-auto border-t", className)} {...props}>
      {props.children}
    </div>
  );
}

interface SidebarTriggerProps extends React.HTMLAttributes<HTMLButtonElement> {}

export function SidebarTrigger({ className, ...props }: SidebarTriggerProps) {
  const { toggle } = useSidebarContext();

  return (
    <button
      className={cn(
        "lg:hidden inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-secondary h-10 w-10",
        className
      )}
      onClick={toggle}
      {...props}
    >
      {props.children}
    </button>
  );
}

interface SidebarMenuProps extends React.HTMLAttributes<HTMLUListElement> {}

export function SidebarMenu({ className, ...props }: SidebarMenuProps) {
  return (
    <ul className={cn("space-y-1", className)} {...props}>
      {props.children}
    </ul>
  );
}

interface SidebarMenuItemProps extends React.HTMLAttributes<HTMLLIElement> {}

export function SidebarMenuItem({ className, ...props }: SidebarMenuItemProps) {
  return (
    <li className={cn("", className)} {...props}>
      {props.children}
    </li>
  );
}

interface SidebarMenuButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
  tooltip?: string;
}

export function SidebarMenuButton({ className, isActive, tooltip, ...props }: SidebarMenuButtonProps) {
  return (
    
    <button
      className={cn(
        "group flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary w-full justify-start",
        isActive ? "bg-secondary text-foreground" : "text-muted-foreground",
        className
      )}
      {...props}
    >
      {props.children}
    </button>
    
  );
}

interface SidebarGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarGroup({ className, ...props }: SidebarGroupProps) {
  return (
    <div className={cn("space-y-2", className)} {...props}>
      {props.children}
    </div>
  );
}

interface SidebarGroupLabelProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarGroupLabel({ className, ...props }: SidebarGroupLabelProps) {
  return (
    <div className={cn("px-3 text-sm font-medium text-muted-foreground", className)} {...props}>
      {props.children}
    </div>
  );
}

interface SidebarGroupContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarGroupContent({ className, ...props }: SidebarGroupContentProps) {
  return (
    <div className={cn("space-y-1", className)} {...props}>
      {props.children}
    </div>
  );
}

export function SidebarBackdrop() {
  const { isOpen, setIsOpen } = useSidebarContext();

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 z-30 lg:hidden transition-opacity duration-300 ease-in-out"
      onClick={() => setIsOpen(false)}
    />
  );
}

export {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarBackdrop,
};
