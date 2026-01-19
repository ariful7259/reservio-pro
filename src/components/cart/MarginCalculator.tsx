import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import {
  Percent,
  TrendingUp,
  Calculator,
  Info
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface CartItem {
  id: string;
  title: string;
  price: string;
  quantity: number;
  image?: string;
}

interface ResellInfo {
  isResell: boolean;
  margin: number;
}

interface MarginCalculatorProps {
  item: CartItem;
  resellInfo: ResellInfo;
  onToggleResell: (checked: boolean) => void;
  onMarginChange: (margin: number) => void;
  parsePrice: (price: string) => number;
}

const MarginCalculator: React.FC<MarginCalculatorProps> = ({
  item,
  resellInfo,
  onToggleResell,
  onMarginChange,
  parsePrice
}) => {
  const itemPrice = parsePrice(item.price);
  const totalItemPrice = itemPrice * item.quantity;
  const marginAmount = resellInfo.margin * item.quantity;
  const finalPrice = totalItemPrice + marginAmount;
  const marginPercentage = itemPrice > 0 ? ((resellInfo.margin / itemPrice) * 100).toFixed(1) : '0';

  const formatPrice = (price: number): string => {
    return `৳${price.toLocaleString('bn-BD')}`;
  };

  const handleSliderChange = (values: number[]) => {
    onMarginChange(values[0]);
  };

  const suggestedMargins = [50, 100, 150, 200, 300];

  return (
    <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-4 space-y-4 border border-primary/20">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Checkbox
            id={`resell-${item.id}`}
            checked={resellInfo.isResell}
            onCheckedChange={onToggleResell}
          />
          <Label 
            htmlFor={`resell-${item.id}`}
            className="flex items-center gap-2 cursor-pointer font-medium"
          >
            <Percent className="h-4 w-4 text-primary" />
            এটি রিসেল করবেন?
          </Label>
        </div>
        {resellInfo.isResell && (
          <Badge className="bg-primary/20 text-primary hover:bg-primary/30">
            <TrendingUp className="h-3 w-3 mr-1" />
            রিসেল মোড
          </Badge>
        )}
      </div>

      {resellInfo.isResell && (
        <>
          <Separator />
          
          {/* Margin Input */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-1">
                <Calculator className="h-4 w-4" />
                মার্জিন যোগ করুন (প্রতি ইউনিট)
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>এই পরিমাণ আপনার লাভ হিসেবে যোগ হবে</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-lg">৳</span>
              <Input
                type="number"
                min="0"
                max="10000"
                placeholder="0"
                value={resellInfo.margin || ''}
                onChange={(e) => onMarginChange(parseFloat(e.target.value) || 0)}
                className="w-32 text-lg font-bold"
              />
              <span className="text-sm text-muted-foreground">
                ({marginPercentage}%)
              </span>
            </div>

            {/* Slider for margin */}
            <div className="pt-2">
              <Slider
                value={[resellInfo.margin]}
                onValueChange={handleSliderChange}
                max={Math.max(itemPrice, 500)}
                step={10}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>৳০</span>
                <span>৳{Math.max(itemPrice, 500)}</span>
              </div>
            </div>

            {/* Quick margin buttons */}
            <div className="flex flex-wrap gap-2">
              <span className="text-xs text-muted-foreground">দ্রুত নির্বাচন:</span>
              {suggestedMargins.map(margin => (
                <Badge
                  key={margin}
                  variant={resellInfo.margin === margin ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary/20"
                  onClick={() => onMarginChange(margin)}
                >
                  ৳{margin}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          {/* Price Breakdown Preview */}
          <Card className="bg-background/80">
            <CardHeader className="py-3 px-4">
              <CardTitle className="text-sm flex items-center gap-2">
                <Calculator className="h-4 w-4" />
                মূল্য প্রিভিউ
              </CardTitle>
            </CardHeader>
            <CardContent className="py-2 px-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  পণ্যের মূল্য ({item.quantity}×)
                </span>
                <span>{formatPrice(totalItemPrice)}</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span>
                  আপনার মার্জিন ({item.quantity}×{formatPrice(resellInfo.margin)})
                </span>
                <span>+{formatPrice(marginAmount)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-base">
                <span>গ্রাহকের কাছে মূল্য</span>
                <span className="text-primary">{formatPrice(finalPrice)}</span>
              </div>
              <div className="bg-green-50 dark:bg-green-950/30 rounded-lg p-2 mt-2">
                <p className="text-xs text-green-700 dark:text-green-400">
                  <TrendingUp className="h-3 w-3 inline mr-1" />
                  আপনার আনুমানিক লাভ: <strong>{formatPrice(marginAmount)}</strong>
                </p>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default MarginCalculator;
