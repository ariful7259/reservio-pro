import React from 'react';
import { cn } from '@/lib/utils';
import { 
  ShoppingCart, 
  MapPin, 
  Truck, 
  CreditCard, 
  CheckCircle 
} from 'lucide-react';

interface Step {
  id: string;
  name: string;
  icon: React.ReactNode;
}

interface CheckoutProgressIndicatorProps {
  currentStep: number;
  steps?: Step[];
}

const defaultSteps: Step[] = [
  { id: 'cart', name: 'কার্ট', icon: <ShoppingCart className="h-4 w-4" /> },
  { id: 'address', name: 'ঠিকানা', icon: <MapPin className="h-4 w-4" /> },
  { id: 'shipping', name: 'শিপিং', icon: <Truck className="h-4 w-4" /> },
  { id: 'payment', name: 'পেমেন্ট', icon: <CreditCard className="h-4 w-4" /> },
  { id: 'confirm', name: 'নিশ্চিত', icon: <CheckCircle className="h-4 w-4" /> },
];

const CheckoutProgressIndicator: React.FC<CheckoutProgressIndicatorProps> = ({
  currentStep,
  steps = defaultSteps,
}) => {
  return (
    <div className="w-full mb-6">
      {/* Desktop view */}
      <div className="hidden sm:flex items-center justify-between relative">
        {/* Progress line */}
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-muted rounded-full w-full z-0" />
        <div 
          className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-primary rounded-full z-0 transition-all duration-500"
          style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
        />
        
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          
          return (
            <div key={step.id} className="relative z-10 flex flex-col items-center">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border-2",
                  isCompleted 
                    ? "bg-primary text-primary-foreground border-primary" 
                    : isCurrent
                      ? "bg-background text-primary border-primary"
                      : "bg-muted text-muted-foreground border-muted"
                )}
              >
                {isCompleted ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  step.icon
                )}
              </div>
              <span 
                className={cn(
                  "mt-2 text-xs font-medium transition-colors",
                  isCompleted || isCurrent ? "text-primary" : "text-muted-foreground"
                )}
              >
                {step.name}
              </span>
            </div>
          );
        })}
      </div>

      {/* Mobile view */}
      <div className="sm:hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-primary">
            ধাপ {currentStep + 1} / {steps.length}
          </span>
          <span className="text-sm text-muted-foreground">
            {steps[currentStep]?.name}
          </span>
        </div>
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary rounded-full transition-all duration-500"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
        <div className="flex justify-between mt-2">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={cn(
                "w-6 h-6 rounded-full flex items-center justify-center transition-all",
                index < currentStep 
                  ? "bg-primary text-primary-foreground" 
                  : index === currentStep
                    ? "bg-primary/20 text-primary border border-primary"
                    : "bg-muted text-muted-foreground"
              )}
            >
              {index < currentStep ? (
                <CheckCircle className="h-3 w-3" />
              ) : (
                <span className="text-[10px] font-bold">{index + 1}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CheckoutProgressIndicator;
