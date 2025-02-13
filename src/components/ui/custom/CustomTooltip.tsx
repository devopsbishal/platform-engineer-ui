import { ReactNode } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface CustomTooltipProps {
  triggerElement: ReactNode;
  tooltipContent: ReactNode | string;
  delayDuration?: number;
  asChild?: boolean;
  side?: 'right' | 'left' | 'top' | 'bottom';
  align?: 'start' | 'center' | 'end';
  contentClassName?: string;
  triggerClassName?: string;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
  sideOffset?: number;
  alignOffset?: number;
}

const CustomTooltip = ({
  triggerElement,
  tooltipContent,
  delayDuration = 200,
  asChild = false,
  side = 'top',
  align = 'center',
  contentClassName,
  triggerClassName,
  defaultOpen,
  onOpenChange,
  disabled = false,
  sideOffset = 4,
  alignOffset = 0,
}: CustomTooltipProps) => {
  if (!triggerElement || !tooltipContent) {
    console.warn('CustomTooltip: triggerElement and tooltipContent are required');
    return null;
  }

  if (disabled) {
    return <>{triggerElement}</>;
  }

  return (
    <TooltipProvider>
      <Tooltip 
        delayDuration={delayDuration} 
        defaultOpen={defaultOpen}
        onOpenChange={onOpenChange}
      >
        <TooltipTrigger 
          asChild={asChild}
          className={cn("outline-none", triggerClassName)}
          aria-label={typeof tooltipContent === 'string' ? tooltipContent : undefined}
        >
          {triggerElement}
        </TooltipTrigger>
        <TooltipContent 
          side={side}
          align={align}
          className={cn(
            "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95",
            contentClassName
          )}
          sideOffset={sideOffset}
          alignOffset={alignOffset}
        >
          {tooltipContent}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CustomTooltip;