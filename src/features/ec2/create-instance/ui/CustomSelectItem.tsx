import { forwardRef } from 'react';
import { Check } from 'lucide-react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { cn } from '@/lib/utils';

// Custom SelectItem component with checkmark support
const CustomSelectItem = forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> & {
    selected?: boolean;
  }
>(({ className, children, selected, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      {selected && <Check className="h-4 w-4" />}
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));

CustomSelectItem.displayName = 'CustomSelectItem';

export { CustomSelectItem };