'use client';
import * as React from 'react';
import { Button } from './button';
import { cn } from '../lib/utils';
import { Label } from './label';

export type InputProps = {
  label?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const PasswordEye = ({
  isVisible,
}: {
  isVisible: boolean;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5"
    >
      <path
        className={`transition-opacity duration-300 ${
          isVisible ? 'opacity-0' : 'opacity-100'
        }`}
        d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
      />
      <circle
        className={`transition-opacity duration-300 ${
          isVisible ? 'opacity-0' : 'opacity-100'
        }`}
        cx="12"
        cy="12"
        r="3"
      />
      <path
        className={`transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"
      />
      <path
        className={`transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"
      />
      <line
        className={`transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        x1="1"
        y1="1"
        x2="23"
        y2="23"
      />
    </svg>
  );
};

const Input = React.forwardRef<
  HTMLInputElement,
  InputProps
>(
  (
    {
      className,
      type,
      label,
      startIcon,
      endIcon,
      error,
      ...props
    },
    ref
  ) => {
    const [inputType, setInputType] =
      React.useState<React.ComponentProps<'input'>['type']>(
        type
      );

    const toggleVisibility = () => {
      setInputType((prev) => {
        return prev === 'password' ? 'text' : 'password';
      });
    };

    const input = (
      <div className="relative flex flex-col gap-1">
        <div className="relative flex items-center">
          {startIcon && (
            <span className="absolute left-2">
              {startIcon}
            </span>
          )}
          <input
            type={inputType}
            className={cn(
              'flex h-8 w-full rounded-md border border-input bg-background px-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
              startIcon ? 'pl-8' : '',
              endIcon ? 'pr-8' : '',
              error ? 'border-destructive' : '',
              className
            )}
            ref={ref}
            {...props}
          />
          {type === 'password' ? (
            <Button
              variant={'ghost'}
              onClick={toggleVisibility}
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              aria-label={
                inputType === 'password'
                  ? 'Показать пароль'
                  : 'Скрыть пароль'
              }
            >
              <PasswordEye
                isVisible={inputType !== 'password'}
              />
            </Button>
          ) : (
            endIcon && (
              <span className="absolute right-2">
                {endIcon}
              </span>
            )
          )}
        </div>
        {error && (
          <span className="text-sm font-bold select-none text-destructive">
            {error}
          </span>
        )}
      </div>
    );

    if (label !== undefined) {
      return (
        <Label className="flex flex-col gap-2">
          {label}
          {input}
        </Label>
      );
    }

    return input;
  }
);

Input.displayName = 'Input';

export { Input };
