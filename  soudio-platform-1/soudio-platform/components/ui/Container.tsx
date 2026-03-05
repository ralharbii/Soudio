import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl" | "full";
}

const sizes = {
  sm: "max-w-2xl",
  md: "max-w-4xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
  full: "max-w-full",
};

export function Container({ size = "xl", className, children, ...props }: ContainerProps) {
  return (
    <div
      className={cn("mx-auto px-4 sm:px-6 lg:px-8 w-full", sizes[size], className)}
      {...props}
    >
      {children}
    </div>
  );
}
