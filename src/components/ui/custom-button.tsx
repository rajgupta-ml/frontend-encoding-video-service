
import * as React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "primary" | "secondary" | "ghost" | "link" | "outline";
  size?: "sm" | "default" | "lg" | "icon";
  isLoading?: boolean;
}

const CustomButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", isLoading = false, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "relative inline-flex items-center justify-center rounded-md text-sm font-medium transition-all",
          "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-0",
          "disabled:opacity-50 disabled:pointer-events-none",
          {
            "bg-primary text-primary-foreground hover:bg-primary/90": variant === "primary",
            "bg-secondary text-secondary-foreground hover:bg-secondary/80": variant === "secondary",
            "hover:bg-accent hover:text-accent-foreground": variant === "ghost",
            "underline-offset-4 hover:underline text-primary": variant === "link",
            "border border-input hover:bg-accent hover:text-accent-foreground": variant === "outline",
            "bg-background hover:bg-accent hover:text-accent-foreground": variant === "default",
            "h-9 px-4 py-2": size === "default",
            "h-8 px-3 text-xs": size === "sm",
            "h-10 px-6": size === "lg",
            "h-9 w-9 p-0": size === "icon",
          },
          isLoading && "opacity-80 pointer-events-none",
          className
        )}
        {...props}
      >
        {isLoading ? (
          <span className="absolute inset-0 flex items-center justify-center">
            <svg
              className="animate-spin h-4 w-4 text-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </span>
        ) : null}
        <span className={cn(isLoading && "opacity-0")}>{children}</span>
      </button>
    );
  }
);

CustomButton.displayName = "CustomButton";

export { CustomButton };
