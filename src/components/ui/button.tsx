
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 touch-manipulation tap-highlight-none",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/95",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 active:bg-destructive/95",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground active:bg-accent/80",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 active:bg-secondary/90",
        ghost: "hover:bg-accent hover:text-accent-foreground active:bg-accent/80",
        link: "text-primary underline-offset-4 hover:underline active:text-primary/80",
        warning: "bg-amber-500 text-white hover:bg-amber-600 active:bg-amber-700",
        success: "bg-green-600 text-white hover:bg-green-700 active:bg-green-800",
        info: "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800",
        premium: "bg-purple-600 text-white hover:bg-purple-700 active:bg-purple-800",
      },
      size: {
        default: "h-9 px-3 py-2 text-sm sm:h-10 sm:px-4 sm:text-base",
        sm: "h-8 px-2 py-1 text-xs sm:h-9 sm:px-3 sm:text-sm",
        lg: "h-10 px-4 py-2 text-sm sm:h-11 sm:px-8 sm:text-base",
        icon: "h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10",
        "icon-sm": "h-7 w-7 sm:h-8 sm:w-8",
        "icon-lg": "h-10 w-10 sm:h-11 sm:w-11 md:h-12 md:w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
