import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import {
  Tooltip as TooltipRoot,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function Tooltip({
  children,
  content,
  className,
  open,
  defaultOpen,
  onOpenChange,
  ...props
}: {
  children: React.ReactNode;
  content: React.ReactNode;
  className?: string;
} & Pick<TooltipPrimitive.TooltipProps, "open" | "defaultOpen" | "onOpenChange">) {
  const hasContent = content !== undefined && content !== "";
  return (
    <TooltipRoot open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      {hasContent && (
        <TooltipContent className={className} collisionPadding={8} {...props}>
          {content}
        </TooltipContent>
      )}
    </TooltipRoot>
  );
}
