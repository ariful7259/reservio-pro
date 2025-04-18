
import React from "react";
import { cn } from "@/lib/utils";

interface ThemedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "primary" | "secondary" | "accent" | "neutral";
  hover?: boolean;
}

export const ThemedCard = React.forwardRef<HTMLDivElement, ThemedCardProps>(
  ({ className, variant = "neutral", hover = true, children, ...props }, ref) => {
    const variantClasses = {
      primary: "bg-gradient-to-br from-primary/5 to-primary/10 border-primary/10",
      secondary: "bg-gradient-to-br from-secondary/5 to-secondary/10 border-secondary/10",
      accent: "bg-gradient-to-br from-accent/5 to-accent/10 border-accent/10",
      neutral: "bg-card border-border/40",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg border shadow-sm p-4 transition-all duration-200",
          hover && "hover:shadow-md hover:-translate-y-0.5",
          variantClasses[variant],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ThemedCard.displayName = "ThemedCard";
