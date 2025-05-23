
import React from 'react';
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from '@/components/ui/button';
import MarketplaceSettings from './MarketplaceSettings';
import RentalSettings from './RentalSettings';
import ServiceSettings from './ServiceSettings';
import ContentSettings from './ContentSettings';
import { FormValues } from './StoreCreationForm';
import { SellerType } from './StoreCreationForm';

interface SettingsTabContentProps {
  form: ReturnType<typeof useForm<FormValues>>;
  onNextTab: () => void;
  onPreviousTab: () => void;
  selectedSellerType: SellerType;
}

const SettingsTabContent: React.FC<SettingsTabContentProps> = ({ 
  form, 
  onNextTab,
  onPreviousTab,
  selectedSellerType
}) => {
  
  const renderBusinessTypeSettings = () => {
    switch (selectedSellerType) {
      case 'marketplace':
        return <MarketplaceSettings form={form} />;
      case 'rental':
        return <RentalSettings form={form} />;
      case 'service':
        return <ServiceSettings form={form} />;
      case 'content':
        return <ContentSettings form={form} />;
      default:
        return null;
    }
  };
  
  return (
    <div className="space-y-6 animate-in fade-in-50">
      <Form {...form}>
        <form className="space-y-6">
          {renderBusinessTypeSettings()}
        
          <div className="flex justify-between mt-6">
            <Button variant="outline" onClick={onPreviousTab} type="button">
              আগের ধাপ
            </Button>
            <Button onClick={onNextTab} type="button">
              পরবর্তী ধাপ
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SettingsTabContent;
