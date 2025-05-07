
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface MenuItem {
  icon: React.ReactNode;
  name: string;
  path: string;
  badge?: number;
  highlight?: boolean;
}

interface CollapsibleMenuSectionProps {
  title: string;
  icon: React.ReactNode;
  items: MenuItem[];
  defaultOpen?: boolean;
}

export const CollapsibleMenuSection = ({ title, icon, items, defaultOpen = false }: CollapsibleMenuSectionProps) => {
  return (
    <Collapsible className="border rounded-md" defaultOpen={defaultOpen}>
      <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-gray-50">
        <div className="flex items-center gap-3">
          {icon}
          <span className="font-medium">{title}</span>
        </div>
        <ChevronDown className="h-4 w-4" />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="p-2">
          {items.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`flex items-center gap-3 p-3 hover:bg-gray-50 rounded-md ${item.highlight ? 'bg-primary/5 border border-primary/20' : ''}`}
            >
              {item.icon}
              <div className="flex items-center justify-between w-full">
                <span>{item.name}</span>
                {item.badge && (
                  <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-medium leading-none text-white bg-primary rounded-full">
                    {item.badge}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};
