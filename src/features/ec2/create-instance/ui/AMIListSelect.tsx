import * as React from 'react';
import { Check, ChevronDown, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface AMI {
  _id: string;
  name: string;
  ami: string;
  description: string;
  architecture: string;
  os: string;
  isDeleted: boolean;
  __v: number;
  createdAt: string;
  updatedAt: string;
}

interface AMISelectProps {
  amiList: AMI[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  error?: string;
  label?: string;
  helpText?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  containerClassName?: string;
  labelClassName?: string;
  name?: string;
}

export const AMIListSelect = React.forwardRef<
  HTMLButtonElement,
  AMISelectProps
>(
  (
    {
      amiList,
      value,
      onChange,
      placeholder = 'Search for an AMI',
      error,
      label,
      helpText,
      required = false,
      disabled = false,
      className,
      containerClassName,
      labelClassName,
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);
    const uniqueId = React.useId();
    const helpTextId = helpText ? `${uniqueId}-help` : undefined;
    const errorId = error ? `${uniqueId}-error` : undefined;
    const selectedAMI = amiList.find((ami) => ami.ami === value);

    return (
      <div className={cn('flex flex-col gap-1.5', containerClassName)}>
        {label && (
          <Label
            htmlFor={uniqueId}
            className={cn(
              required &&
                "after:content-['*'] after:ml-0.5 after:text-destructive",
              disabled && 'opacity-50 cursor-not-allowed',
              labelClassName
            )}
          >
            {label}
          </Label>
        )}
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              ref={ref}
              id={uniqueId}
              variant='outline'
              role='combobox'
              aria-expanded={open}
              className={cn(
                'w-full justify-between border-slate-200',
                selectedAMI && 'h-full',
                error && 'border-destructive',
                className
              )}
              disabled={disabled}
            >
              {selectedAMI ? (
                <div className='flex w-full flex-col items-start py-3 px-1'>
                  <div className='flex w-full items-center justify-between'>
                    <span className='font-medium text-base'>
                      {selectedAMI.name}
                    </span>
                    <Badge variant='secondary' className='ml-2'>
                      Free tier eligible
                    </Badge>
                  </div>
                  <div className='flex w-full items-end pr-4 justify-between'>
                    <div className='mt-2 text-sm text-muted-foreground'>
                      {selectedAMI.ami} ({selectedAMI.architecture})
                    </div>
                    <ChevronDown />
                  </div>
                  <div className='mt-1 text-wrap text-sm text-muted-foreground'>
                    Virtualization: hvm • ENA enabled: true • Root device type:
                    ebs
                  </div>
                </div>
              ) : (
                <div className='flex items-center text-muted-foreground'>
                  <Search className='mr-2 h-4 w-4' />
                  {placeholder}
                </div>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className='md:w-[500px] w-full p-0' align='start'>
            <Command className='border-none'>
              <CommandInput
                placeholder='Search AMIs by name or ID'
                className='h-11'
              />
              <CommandList>
                <CommandEmpty>No AMIs found.</CommandEmpty>
                <CommandGroup>
                  {amiList.map((ami) => (
                    <CommandItem
                      key={ami._id}
                      value={ami.ami}
                      onSelect={() => {
                        onChange?.(ami.ami);
                        setOpen(false);
                      }}
                      className='flex flex-col items-start py-4 px-4 hover:bg-slate-50'
                    >
                      <div className='flex w-full items-center justify-between'>
                        <span className='font-medium text-base'>
                          {ami.name}
                        </span>
                        <div className='flex items-center gap-2'>
                          <Badge variant='secondary'>Free tier eligible</Badge>
                          {value === ami.ami && (
                            <Check className='h-4 w-4 text-blue-600' />
                          )}
                        </div>
                      </div>
                      <div className='mt-2 text-sm text-muted-foreground'>
                        {ami.ami} ({ami.architecture})
                      </div>
                      <div className='mt-1 text-sm text-muted-foreground'>
                        Virtualization: hvm • ENA enabled: true • Root device
                        type: ebs
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        {helpText && !error && (
          <p id={helpTextId} className='text-sm text-muted-foreground'>
            {helpText}
          </p>
        )}
        {error && (
          <p
            id={errorId}
            className='text-sm font-medium text-destructive'
            role='alert'
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

AMIListSelect.displayName = 'AMIListSelect';

export default AMIListSelect;
