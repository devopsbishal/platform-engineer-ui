import * as React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Option {
  value: string;
  label: string;
  disabled?: boolean;
}

interface OptionGroup {
  label: string;
  options: Option[];
}

interface EnhancedSelectProps {
  options: Option[] | OptionGroup[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  error?: string;
  label?: string;
  helpText?: string;
  required?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
  containerClassName?: string;
  labelClassName?: string;
  name?: string;
}

const isOptionGroup = (option: Option | OptionGroup): option is OptionGroup => {
  return (option as OptionGroup).options !== undefined;
};

export const CustomSelect = React.forwardRef<
  HTMLButtonElement,
  EnhancedSelectProps
>(
  (
    {
      options,
      value,
      onChange,
      placeholder = 'Select an option',
      error,
      label,
      helpText,
      required = false,
      isLoading = false,
      disabled = false,
      className,
      containerClassName,
      labelClassName,
      name,
    },
    ref
  ) => {
    const id = React.useId();
    const helpTextId = helpText ? `${id}-help` : undefined;
    const errorId = error ? `${id}-error` : undefined;

    return (
      <div className={cn('flex flex-col gap-1.5', containerClassName)}>
        {label && (
          <Label
            htmlFor={id}
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

        <Select
          name={name}
          value={value}
          onValueChange={onChange}
          disabled={disabled || isLoading}
        >
          <SelectTrigger
            ref={ref}
            id={id}
            className={cn(
              error && 'border-destructive',
              isLoading && 'pr-10',
              className
            )}
          >
            <SelectValue placeholder={placeholder} />
            {isLoading && <Loader2 className='h-4 w-4 animate-spin ml-2' />}
          </SelectTrigger>
          <SelectContent>
            {options.map((item, index) =>
              isOptionGroup(item) ? (
                <SelectGroup key={`group-${index}`}>
                  <SelectLabel>{item.label}</SelectLabel>
                  {item.options.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value}
                      disabled={option.disabled}
                      className='cursor-pointer'
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              ) : (
                <SelectItem
                  key={item.value}
                  value={item.value}
                  disabled={item.disabled}
                  className='cursor-pointer'
                >
                  {item.label}
                </SelectItem>
              )
            )}
          </SelectContent>
        </Select>

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

CustomSelect.displayName = 'CustomSelect';

export default CustomSelect;
