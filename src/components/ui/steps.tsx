
import * as React from "react"
import { cn } from "@/lib/utils"

interface Step {
  id: string
  label: string
}

interface StepsProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: Step[]
  currentStep: number
}

export function Steps({ steps, currentStep, className, ...props }: StepsProps) {
  return (
    <div className={cn("flex w-full justify-between", className)} {...props}>
      {steps.map((step, index) => (
        <div
          key={step.id}
          className={cn("flex flex-col items-center", {
            "text-muted-foreground": currentStep !== index + 1,
          })}
        >
          <div
            className={cn("flex h-8 w-8 items-center justify-center rounded-full border text-xs font-medium", {
              "border-primary bg-primary text-primary-foreground": currentStep === index + 1,
              "border-primary/40 bg-primary/10 text-muted-foreground": currentStep > index + 1,
              "border-muted-foreground/30 bg-background text-muted-foreground": currentStep < index + 1,
            })}
          >
            {index + 1}
          </div>
          <div
            className={cn("mt-2 text-center text-xs font-medium", {
              "text-primary": currentStep === index + 1,
              "text-muted-foreground": currentStep !== index + 1,
            })}
          >
            {step.label}
          </div>
          {index < steps.length - 1 && (
            <div
              className={cn("mt-2 h-px w-full flex-1", {
                "bg-primary": currentStep > index + 1,
                "bg-muted-foreground/30": currentStep <= index + 1,
              })}
              style={{
                position: "absolute",
                right: `-${100 / (steps.length * 2)}%`,
                width: `${100 / steps.length}%`,
                top: "1rem",
              }}
            />
          )}
        </div>
      ))}
    </div>
  )
}
