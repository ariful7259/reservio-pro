import React from 'react';
import { ChevronRight } from 'lucide-react';

interface ServiceItem {
  title: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

interface WalletServiceGridProps {
  title: string;
  services: ServiceItem[];
  onViewMore?: () => void;
}

const WalletServiceGrid: React.FC<WalletServiceGridProps> = ({
  title,
  services,
  onViewMore
}) => {
  // Show only first 7 items, 8th slot is for "View More"
  const displayServices = services.slice(0, 7);
  const hasMore = services.length > 7;

  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 mb-4">
      <h3 className="text-base font-semibold text-foreground mb-4">{title}</h3>
      <div className="grid grid-cols-4 gap-3">
        {displayServices.map((service, index) => (
          <button
            key={index}
            onClick={service.onClick}
            className="flex flex-col items-center gap-2 p-2 rounded-xl hover:bg-accent transition-colors"
          >
            <div className="h-12 w-12 rounded-xl border border-primary/20 bg-primary/5 flex items-center justify-center text-primary">
              {service.icon}
            </div>
            <span className="text-xs text-center text-muted-foreground leading-tight">
              {service.title}
            </span>
          </button>
        ))}
        {hasMore && onViewMore && (
          <button
            onClick={onViewMore}
            className="flex flex-col items-center gap-2 p-2 rounded-xl hover:bg-accent transition-colors"
          >
            <div className="h-12 w-12 rounded-full border-2 border-primary bg-white flex items-center justify-center text-primary">
              <ChevronRight className="h-6 w-6" />
            </div>
            <span className="text-xs text-center text-primary font-medium leading-tight">
              আরো দেখুন
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

export default WalletServiceGrid;
