import type { LucideIcon } from "lucide-react";
import { createElement, type PropsWithChildren } from "react";
import { cn } from "~/lib/utils";

export const Meta = ({
  children,
  icon,
  className = "",
}: PropsWithChildren<{ icon: LucideIcon; className?: string }>) => (
  <div className={cn("flex items-center gap-1", className)}>
    {createElement(icon, { className: "size-4" })}
    <div>{children}</div>
  </div>
);
