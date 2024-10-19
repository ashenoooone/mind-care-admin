'use client';
import * as React from 'react';
import { Button } from './button';
import { cn } from '../lib/utils';
import { Label } from './label';

export type InputProps = {
  label?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<
  HTMLInputElement,
  InputProps
>(
  (
    {
      className,
      type,
      label,
      ...props
    },
    ref
  ) => {
    const input = (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    );

    if (label !== undefined) {
      return (
        <Label>
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
