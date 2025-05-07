
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface MenuItem {
  icon: React.ReactNode;
  name: string;
  path: string;
}

interface CollapsibleMenuSectionProps {
  title: string;
  icon: React.ReactNode;
  items: MenuItem[];
}

export const CollapsibleMenuSection = ({ title, icon, items }: CollapsibleMenuSectionProps) => {
  return (
    <Collapsible className="border rounded-md">
      <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-gray-50">
        <div className="flex items-center">
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
              className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-md"
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};
