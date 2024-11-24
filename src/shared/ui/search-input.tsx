'use client';

import * as React from 'react';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './popover';

import { cn } from '../lib/utils';
import { Button } from './button';
import {
  Check,
  ChevronsUpDown,
  CircleX,
  Search,
} from 'lucide-react';
import Loader from './loader';
import { Input } from './input';

export interface Option {
  value: string;
  label: string;
}

interface SearchableSelectProps {
  options: Option[];
  placeholder?: string;
  onSelect?: (value: string) => void;
  className?: string;
  isLoading?: boolean;
  searchValue?: string;
  onValueChange?: (value: string) => void;
}

export function SearchableSelect({
  options = [],
  placeholder = '',
  onSelect,
  className = '',
  isLoading,
  searchValue,
  onValueChange,
}: SearchableSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');

  const handleSelect = React.useCallback(
    (currentValue: string) => {
      setValue(currentValue === value ? '' : currentValue);
      setOpen(false);
      if (onSelect) {
        onSelect(
          currentValue === value ? '' : currentValue
        );
      }
    },
    [value, onSelect]
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            className,
            'min-w-[200px] justify-between'
          )}
        >
          {value
            ? options.find(
                (option) => option.value === value
              )?.label
            : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-max p-3">
        <Input
          startIcon={<Search className="w-4 h-4" />}
          value={searchValue}
          onChange={(e) => onValueChange?.(e.target.value)}
        />
        <div
          className={cn(
            className,
            'flex justify-center w-full align-center flex-col gap-1 mt-2'
          )}
        >
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <Button
                onClick={() => handleSelect('')}
                variant={'destructive'}
              >
                <CircleX />
              </Button>
              {options.map((o) => (
                <Button
                  onClick={() => handleSelect(o.value)}
                  variant={'ghost'}
                  key={o.value}
                >
                  {o.value === value && <Check />}
                  {o.label}
                </Button>
              ))}
            </>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
