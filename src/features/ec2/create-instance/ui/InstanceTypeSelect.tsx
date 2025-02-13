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

interface CpuInfo {
  DefaultVCpus: number;
  DefaultCores: number;
  DefaultThreadsPerCore: number;
}

interface MemoryInfo {
  SizeInMiB: number;
}

interface InstanceType {
  _id: string;
  instanceType: string;
  freeTierEligible: boolean;
  cpuInfo: CpuInfo;
  memoryInfo: MemoryInfo;
  isDeleted: boolean;
  __v: number;
  createdAt: string;
  updatedAt: string;
}

interface InstanceTypeSelectProps {
  instanceType: InstanceType[];
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
export const InstanceTypeSelect = React.forwardRef<
  HTMLButtonElement,
  InstanceTypeSelectProps
>(
  (
    {
      instanceType,
      value,
      onChange,
      placeholder = 'Select an instance type',
      error,
      label,
      helpText,
      required = false,
      disabled = false,
      className,
      containerClassName,
      labelClassName,
      // name,
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);
    const uniqueId = React.useId();
    const helpTextId = helpText ? `${uniqueId}-help` : undefined;
    const errorId = error ? `${uniqueId}-error` : undefined;
    const selectedInstance = instanceType.find(
      (instance) => instance.instanceType === value
    );
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
                'w-full justify-between',
                selectedInstance && 'h-full',
                error && 'border-destructive',
                className
              )}
              disabled={disabled}
            >
              {selectedInstance ? (
                <>
                  <div className='flex w-full flex-col items-start py-3 px-1'>
                    <div className='flex w-full items-center justify-between'>
                      <span className='font-medium'>
                        {selectedInstance.instanceType}
                      </span>
                      <div className='flex gap-2'>
                        {selectedInstance.freeTierEligible && (
                          <Badge variant='secondary'>Free tier eligible</Badge>
                        )}
                      </div>
                    </div>

                    <div className='flex justify-between w-full  items-center pr-4 '>
                      <div className='mt-3 text-wrap text-sm text-muted-foreground'>
                        Family: t2 • {selectedInstance.cpuInfo.DefaultVCpus}{' '}
                        vCPU • {selectedInstance.cpuInfo.DefaultCores} Cores •{' '}
                        {selectedInstance.cpuInfo.DefaultThreadsPerCore} Thread
                        per Core •{' '}
                        {selectedInstance.memoryInfo.SizeInMiB / 1024} GiB
                        Memory
                      </div>
                      <ChevronDown />
                    </div>
                    {/* !freeTierEligible */}
                    {false && (
                      <div className='mt-1 text-xs text-muted-foreground'>
                        On-Demand Windows base pricing: $0.0162 USD per Hour
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className='flex items-center text-muted-foreground'>
                  <Search className='mr-2 h-4 w-4' />
                  {placeholder}
                </div>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className='md:w-[500px] w-full p-0' align='start'>
            <Command>
              <CommandInput
                placeholder='Choose the right instance for your project.'
                className='h-9'
              />
              <CommandList>
                <CommandEmpty>No instance type found.</CommandEmpty>
                <CommandGroup>
                  {instanceType.map((instance) => (
                    <CommandItem
                      key={instance._id}
                      value={instance.instanceType}
                      onSelect={() => {
                        onChange?.(instance.instanceType);
                        setOpen(false);
                      }}
                      className='flex flex-col items-start py-4 px-4'
                    >
                      <div className='flex w-full items-center justify-between'>
                        <span className='font-medium'>
                          {instance.instanceType}
                        </span>
                        <div className='flex gap-2'>
                          {instance.freeTierEligible && (
                            <Badge variant='secondary'>
                              Free tier eligible
                            </Badge>
                          )}
                          {value === instance.instanceType && (
                            <Check className='h-4 w-4' />
                          )}
                        </div>
                      </div>

                      <div className='mt-1 text-sm text-muted-foreground'>
                        Family: t2 • {instance.cpuInfo.DefaultVCpus} vCPU •{' '}
                        {instance.cpuInfo.DefaultCores} Cores •{' '}
                        {instance.cpuInfo.DefaultThreadsPerCore} Thread per Core
                        • {instance.memoryInfo.SizeInMiB / 1024} GiB Memory
                      </div>
                      {/* !freeTierEligible */}
                      {false && (
                        <div className='mt-1 text-xs text-muted-foreground'>
                          On-Demand Windows base pricing: $0.0162 USD per Hour
                        </div>
                      )}
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

InstanceTypeSelect.displayName = 'InstanceTypeSelect';

export default InstanceTypeSelect;
