import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
}

export function buttonVariants({
  variant = "default",
}: { variant?: "default" | "outline" | "ghost" } = {}) {
  if (variant === "outline")
    return "border border-purple-300 text-purple-600 bg-white hover:bg-purple-50";
  if (variant === "ghost")
    return "text-gray-600 hover:bg-gray-100 hover:text-gray-800";
  return "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-md";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "px-4 py-2 rounded-xl font-medium transition-all focus:outline-none",
        buttonVariants({ variant }),
        className
      )}
      {...props}
    />
  )
);
Button.displayName = "Button";
