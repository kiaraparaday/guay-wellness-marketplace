
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        accent: "bg-guay-green text-white hover:bg-guay-green/90", 
        white: "bg-white text-guay-dark-blue border border-border hover:bg-gray-50",
        light: "bg-white/10 text-white border border-white/30 hover:bg-white/20",
        // Variantes guay con azul institucional
        "guay-primary": "bg-[#355C91] text-white hover:bg-[#355C91]/90 font-quicksand font-medium",
        "guay-secondary": "bg-[#355C91]/10 text-[#355C91] hover:bg-[#355C91]/20 font-quicksand font-medium border border-[#355C91]/20",
        // Nuevas variantes CTA con verde institucional
        "guay-cta-primary": "bg-[#A2C73F] text-white hover:bg-[#A2C73F]/90 font-quicksand font-medium",
        "guay-cta-secondary": "bg-white text-[#A2C73F] hover:bg-gray-50 font-quicksand font-medium border-2 border-[#A2C73F]",
      },
      size: {
        grande: "h-12 px-6 py-3 rounded-full text-base", // Botón grande
        mediano: "h-10 px-5 py-2.5 rounded-full", // Botón mediano (estándar)
        chico: "h-8 px-4 py-1.5 rounded-full text-sm", // Botón chico
        default: "h-10 px-4 py-2", // Mantener compatibilidad
        sm: "h-9 rounded-md px-3", // Mantener compatibilidad
        lg: "h-11 rounded-md px-8", // Mantener compatibilidad
        icon: "h-10 w-10 rounded-full", // Botón de icono
        "icon-sm": "h-8 w-8 rounded-full", // Botón de icono pequeño
      },
    },
    defaultVariants: {
      variant: "default",
      size: "mediano",
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
