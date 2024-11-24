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
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from './command';
import { CommandList } from 'cmdk';
import { Check, ChevronsUpDown } from 'lucide-react';

export interface Option {
  value: string;
  label: string;
}

interface SearchableSelectProps {
  options: Option[];
  placeholder?: string;
  onSelect?: (value: string) => void;
  className?: string;
}

export function SearchableSelect({
  options = [],
  placeholder = '',
  onSelect,
  className = '',
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
            'w-[200px] justify-between'
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
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Поиск..." />
            <CommandEmpty>Не найдено</CommandEmpty>
            <CommandGroup heading="">
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  onSelect={() =>
                    handleSelect(option.value)
                  }
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === option.value
                        ? 'opacity-100'
                        : 'opacity-0'
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
