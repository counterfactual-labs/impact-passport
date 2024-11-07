"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "~/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const progressVariants = cva(
  "h-full w-full flex-1 bg-neutral-900 transition-all dark:bg-neutral-50",
  {
    variants: {
      variant: {
        default: "bg-gray-900 dark:bg-neutral-50",
        success: "bg-primary-500 dark:bg-neutral-50",
        secondary: "bg-secondary-400 dark:bg-neutral-100",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>,
    VariantProps<typeof progressVariants> {}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value, variant, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-2 w-full overflow-hidden rounded-full bg-neutral-900/20 dark:bg-neutral-50/20",
      className,
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={cn(progressVariants({ variant }), className)}
      // className="h-full w-full flex-1 bg-neutral-900 transition-all dark:bg-neutral-50"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
