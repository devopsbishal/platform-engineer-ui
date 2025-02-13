import React, { forwardRef } from 'react';
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

interface CustomInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  type: "text" | "number" | "email" | "password" | "tel" | "url" | "search";
  label?: string;
  error?: string | boolean;
  hint?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  errorClassName?: string;
  hintClassName?: string;
  showPasswordToggle?: boolean;
  onIconClick?: () => void;
}

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(({
  type: initialType,
  label,
  error,
  hint,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  containerClassName,
  labelClassName,
  inputClassName,
  errorClassName,
  hintClassName,
  className,
  required,
  disabled,
  id,
  name,
  showPasswordToggle = false,
  onIconClick,
  ...props
}, ref) => {
  const [type, setType] = React.useState(initialType);
  const [isFocused, setIsFocused] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const uniqueId = id || `input-${name || Math.random().toString(36).substr(2, 9)}`;

  const togglePasswordVisibility = () => {
    setType(type === 'password' ? 'text' : 'password');
  };

  const handleLabelClick = () => {
    inputRef.current?.focus();
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    props.onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    props.onBlur?.(e);
  };

  return (
    <div
      className={cn(
        'flex flex-col gap-1.5',
        fullWidth && 'w-full',
        containerClassName
      )}
    >
      {label && (
        <label
          htmlFor={uniqueId}
          onClick={handleLabelClick}
          className={cn(
            "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
            required && "after:content-['*'] after:ml-0.5 after:text-destructive",
            labelClassName
          )}
        >
          {label}
        </label>
      )}

      <div className="relative">
        {icon && iconPosition === 'left' && (
          <div
            onClick={onIconClick}
            className={cn(
              "absolute left-3 top-1/2 -translate-y-1/2",
              onIconClick && "cursor-pointer"
            )}
          >
            {icon}
          </div>
        )}

        <Input
          {...props}
          ref={ref || inputRef}
          id={uniqueId}
          type={type}
          name={name}
          required={required}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={
            error ? `${uniqueId}-error` : hint ? `${uniqueId}-hint` : undefined
          }
          className={cn(
            icon && iconPosition === 'left' && "pl-10",
            (icon || showPasswordToggle) && iconPosition === 'right' && "pr-10",
            error && "border-destructive",
            isFocused && "ring-2 ring-ring ring-offset-2",
            inputClassName,
            className
          )}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />

        {(icon && iconPosition === 'right' || (showPasswordToggle && initialType === 'password')) && (
          <div
            onClick={initialType === 'password' ? togglePasswordVisibility : onIconClick}
            className={cn(
              "absolute right-3 top-1/2 -translate-y-1/2",
              (onIconClick || showPasswordToggle) && "cursor-pointer"
            )}
          >
            {initialType === 'password' && showPasswordToggle ? (
              type === 'password' ? <EyeOff size={20} /> : <Eye size={20} />
            ) : (
              icon
            )}
          </div>
        )}
      </div>

      {error && (
        <p
          id={`${uniqueId}-error`}
          className={cn(
            "text-sm font-medium text-destructive",
            errorClassName
          )}
        >
          {typeof error === 'string' ? error : 'This field is required'}
        </p>
      )}

      {hint && !error && (
        <p
          id={`${uniqueId}-hint`}
          className={cn(
            "text-sm text-muted-foreground",
            hintClassName
          )}
        >
          {hint}
        </p>
      )}
    </div>
  );
});

CustomInput.displayName = "CustomInput";

export default CustomInput;