import * as React from "react";
import { type VariantProps } from "class-variance-authority";
import { cn } from "@/context/lib/utils";
import { badgeVariants } from "./classNames";

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };