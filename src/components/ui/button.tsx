import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { LoaderIcon, type LucideIcon } from "lucide-react";

import { cn } from "~/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-semibold ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300",
  {
    variants: {
      variant: {
        default:
          "bg-primary-500 text-primary-50 hover:bg-primary-500/90 dark:bg-primary-50 dark:text-primary-500 dark:hover:bg-primary-50/90",
        destructive:
          "bg-red-500 text-slate-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-slate-50 dark:hover:bg-red-900/90",
        outline:
          "border border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-800 dark:hover:text-slate-50",
        secondary:
          "bg-slate-100 text-slate-900 hover:bg-slate-100/80 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800/80",
        ghost:
          "hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-50",
        link: "text-slate-900 underline-offset-4 hover:underline dark:text-slate-50",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
  icon?: React.ComponentType;
  iconLeft?: LucideIcon | React.ComponentType<{ className: string }>;
  iconRight?: LucideIcon | React.ComponentType<{ className: string }>;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant,
      size,
      asChild = false,
      isLoading,
      icon,
      iconLeft,
      iconRight: RightIcon,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    const LeftIcon = isLoading ? LoaderIcon : icon || iconLeft;

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isLoading}
        {...props}
      >
        <>
          {LeftIcon && (
            <LeftIcon
              className={cn("size-4", {
                ["mr-2"]: children,
                ["animate-spin"]: isLoading,
              })}
            />
          )}
          {children}
          {RightIcon && (
            <RightIcon className={cn("size-4", { ["ml-2"]: children })} />
          )}
        </>
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
