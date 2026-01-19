import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Truck, Zap, Clock } from 'lucide-react';

export interface ShippingMethod {
  id: string;
  name: string;
  description: string;
  cost: number;
  estimatedDays: string;
  icon: 'standard' | 'express' | 'economy';
}

interface ShippingMethodSelectorProps {
  selectedMethod: string;
  onSelect: (methodId: string) => void;
  city?: string;
}

const shippingMethods: ShippingMethod[] = [
  {
    id: 'standard',
    name: 'স্ট্যান্ডার্ড ডেলিভারি',
    description: 'সাধারণ ডেলিভারি সার্ভিস',
    cost: 60,
    estimatedDays: '৩-৫ দিন',
    icon: 'standard'
  },
  {
    id: 'express',
    name: 'এক্সপ্রেস ডেলিভারি',
    description: 'দ্রুত ডেলিভারি সার্ভিস',
    cost: 120,
    estimatedDays: '১-২ দিন',
    icon: 'express'
  },
  {
    id: 'economy',
    name: 'ইকোনমি ডেলিভারি',
    description: 'সাশ্রয়ী ডেলিভারি সার্ভিস',
    cost: 40,
    estimatedDays: '৫-৭ দিন',
    icon: 'economy'
  }
];

const insideDhakaShipping: ShippingMethod[] = [
  {
    id: 'dhaka-express',
    name: 'ঢাকা এক্সপ্রেস',
    description: 'ঢাকা শহরের মধ্যে দ্রুত ডেলিভারি',
    cost: 70,
    estimatedDays: 'একই দিন / পরের দিন',
    icon: 'express'
  },
  {
    id: 'dhaka-standard',
    name: 'ঢাকা স্ট্যান্ডার্ড',
    description: 'ঢাকা শহরের মধ্যে সাধারণ ডেলিভারি',
    cost: 50,
    estimatedDays: '১-২ দিন',
    icon: 'standard'
  }
];

const ShippingMethodSelector: React.FC<ShippingMethodSelectorProps> = ({ 
  selectedMethod, 
  onSelect,
  city 
}) => {
  const isDhaka = city === 'ঢাকা';
  const availableMethods = isDhaka ? insideDhakaShipping : shippingMethods;

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'express':
        return <Zap className="h-5 w-5 text-amber-500" />;
      case 'economy':
        return <Clock className="h-5 w-5 text-blue-500" />;
      default:
        return <Truck className="h-5 w-5 text-green-500" />;
    }
  };

  const formatPrice = (price: number): string => {
    return `৳${price.toLocaleString('bn-BD')}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Truck className="h-5 w-5" />
          শিপিং মেথড
          {isDhaka && (
            <Badge variant="secondary" className="ml-2">ঢাকা শহর</Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup value={selectedMethod} onValueChange={onSelect}>
          <div className="space-y-3">
            {availableMethods.map((method) => (
              <div
                key={method.id}
                className={`flex items-center space-x-3 border rounded-lg p-4 cursor-pointer transition-all ${
                  selectedMethod === method.id 
                    ? 'border-primary bg-primary/5' 
                    : 'hover:border-muted-foreground/50'
                }`}
                onClick={() => onSelect(method.id)}
              >
                <RadioGroupItem value={method.id} id={method.id} />
                <div className="flex-shrink-0">
                  {getIcon(method.icon)}
                </div>
                <div className="flex-1">
                  <Label htmlFor={method.id} className="font-medium cursor-pointer">
                    {method.name}
                  </Label>
                  <p className="text-sm text-muted-foreground">{method.description}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs">
                      <Clock className="h-3 w-3 mr-1" />
                      {method.estimatedDays}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-bold text-primary">{formatPrice(method.cost)}</span>
                </div>
              </div>
            ))}
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  );
};

export const getShippingMethodById = (id: string, city?: string): ShippingMethod | undefined => {
  const isDhaka = city === 'ঢাকা';
  const methods = isDhaka ? insideDhakaShipping : shippingMethods;
  return methods.find(m => m.id === id);
};

export default ShippingMethodSelector;
