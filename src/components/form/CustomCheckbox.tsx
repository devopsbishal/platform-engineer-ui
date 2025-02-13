import React, { useState } from 'react';
import { cn } from "@/lib/utils";

interface CustomCheckboxProps {
  label: string;
  name?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  className?: string;
  labelClassName?: string;
  checkboxClassName?: string;
  description?: string;
  id?: string;
}

const CustomCheckbox = ({
  label,
  name,
  checked,
  defaultChecked = false,
  onChange,
  onFocus,
  onBlur,
  disabled = false,
  required = false,
  error,
  className,
  labelClassName,
  checkboxClassName,
  description,
  id = label.toLowerCase().replace(/\s+/g, '-'),
}: CustomCheckboxProps) => {
  // Use internal state only if component is uncontrolled
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  
  // Determine if the component is controlled
  const isControlled = checked !== undefined;
  const isChecked = isControlled ? checked : internalChecked;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setInternalChecked(event.target.checked);
    }
    onChange?.(event.target.checked);
  };

  return (
    <div className={cn("relative flex flex-col gap-1", className)}>
      <label
        className={cn(
          "flex gap-2 items-center",
          disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
          error ? "text-destructive" : "",
          labelClassName
        )}
        htmlFor={id}
      >
        <div className="relative flex items-center">
          <input
            type="checkbox"
            id={id}
            name={name || id}
            checked={isChecked}
            onChange={handleChange}
            onFocus={onFocus}
            onBlur={onBlur}
            disabled={disabled}
            required={required}
            aria-describedby={description ? `${id}-description` : undefined}
            aria-invalid={error ? true : undefined}
            className={cn(
              "h-4 w-4 rounded border border-input bg-background",
              "text-primary ring-offset-background",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              "disabled:cursor-not-allowed disabled:opacity-50",
              error && "border-destructive",
              checkboxClassName
            )}
          />
        </div>
        <span className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </span>
      </label>
      
      {description && (
        <p
          id={`${id}-description`}
          className="text-sm text-muted-foreground"
        >
          {description}
        </p>
      )}
      
      {error && (
        <p className="text-sm font-medium text-destructive">
          {error}
        </p>
      )}
    </div>
  );
};

export default CustomCheckbox;