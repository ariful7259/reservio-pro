
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
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                currentStep > index
                  ? "bg-primary text-white"
                  : currentStep === index + 1
                  ? "bg-primary/90 text-white ring-4 ring-primary/30"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {index + 1}
            </div>
            <span
              className={cn(
                "text-xs mt-1.5",
                currentStep === index + 1 ? "text-primary font-medium" : "text-muted-foreground"
              )}
            >
              {step.label}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div className="flex-1 flex items-center">
              <div
                className={cn(
                  "h-0.5 w-full",
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
