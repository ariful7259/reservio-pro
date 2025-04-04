
import * as React from "react";
import { cn } from "@/lib/utils";

interface StepsProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: {
    id: string;
    label: string;
  }[];
  currentStep: number;
}

export function Steps({ steps, currentStep, className, ...props }: StepsProps) {
  // Calculates whether to show step numbers based on available width
  const [showNumbers, setShowNumbers] = React.useState(true);
  
  React.useEffect(() => {
    const checkWidth = () => {
      setShowNumbers(window.innerWidth > 400);
    };
    
    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  return (
    <div
      className={cn("flex justify-between", className)}
      {...props}
    >
      {steps.map((step, index) => (
        <React.Fragment key={step.id}>
          <div className="flex flex-col items-center">
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200",
                currentStep > index + 1
                  ? "bg-primary text-white"
                  : currentStep === index + 1
                  ? "bg-primary/90 text-white ring-4 ring-primary/30"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {showNumbers ? index + 1 : (
                currentStep > index + 1 ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg>
                ) : (
                  <span className="w-2 h-2 rounded-full bg-current"></span>
                )
              )}
            </div>
            <span
              className={cn(
                "text-xs mt-1.5 text-center font-medium transition-colors duration-200",
                currentStep === index + 1 ? "text-primary" : "text-muted-foreground"
              )}
            >
              {step.label}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div className="flex-1 flex items-center">
              <div
                className={cn(
                  "h-0.5 w-full transition-colors duration-300",
                  currentStep > index + 1
                    ? "bg-primary"
                    : "bg-muted"
                )}
              />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
