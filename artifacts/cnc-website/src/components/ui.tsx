import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    const variants = {
      default: "bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90 hover:shadow-primary/40",
      outline: "border-2 border-primary text-primary hover:bg-primary/10",
      ghost: "hover:bg-white/5 text-foreground",
      destructive: "bg-destructive text-white hover:bg-destructive/90 shadow-lg shadow-destructive/20",
    };
    
    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base font-semibold",
      lg: "px-8 py-4 text-lg font-bold uppercase tracking-wider",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-sm transition-all duration-300 ease-out active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none font-display",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "flex w-full rounded-sm border border-border bg-background/50 px-4 py-3 text-sm text-foreground transition-colors focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50 placeholder:text-muted-foreground",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "flex min-h-[120px] w-full rounded-sm border border-border bg-background/50 px-4 py-3 text-sm text-foreground transition-colors focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50 placeholder:text-muted-foreground",
          className
        )}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export const Card = ({ className, children }: { className?: string; children: React.ReactNode }) => (
  <div className={cn("glass-panel rounded-lg overflow-hidden group hover:border-primary/30 transition-all duration-500", className)}>
    {children}
  </div>
);
