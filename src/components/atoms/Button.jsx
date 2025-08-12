import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Button = forwardRef(({
  className,
  variant = "primary",
  size = "default",
  disabled = false,
  children,
  ...props
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg";
  
  const variants = {
    primary: "bg-accent hover:bg-accent/90 text-white shadow-sm hover:shadow-md focus:ring-accent/50",
    secondary: "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 focus:ring-gray-400/50",
    ghost: "text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:ring-gray-400/50",
    outline: "border border-accent text-accent hover:bg-accent hover:text-white focus:ring-accent/50"
  };
  
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    default: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base"
  };

  return (
    <button
      ref={ref}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;