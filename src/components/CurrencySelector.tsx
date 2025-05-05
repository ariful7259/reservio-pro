
import React from 'react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Currency, currencies } from '@/utils/currencyUtils';

interface CurrencySelectorProps {
  selectedCurrency: Currency;
  onCurrencyChange: (currency: Currency) => void;
  className?: string;
}

const CurrencySelector: React.FC<CurrencySelectorProps> = ({
  selectedCurrency,
  onCurrencyChange,
  className
}) => {
  return (
    <Select
      value={selectedCurrency}
      onValueChange={(value) => onCurrencyChange(value as Currency)}
    >
      <SelectTrigger className={`w-32 ${className}`}>
        <SelectValue placeholder="কারেন্সি" />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(currencies).map(([code, details]) => (
          <SelectItem key={code} value={code}>
            <div className="flex items-center gap-2">
              <span>{details.symbol}</span>
              <span>{details.name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CurrencySelector;
