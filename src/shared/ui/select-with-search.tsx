import { forwardRef, useState } from 'react';
import {
  SelectItem,
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from './select';
import { Input } from './input';
import { SearchIcon } from 'lucide-react';
import { Label } from './label';
import { cn } from '../lib/utils';

type Option<T> = {
  value: T;
  label: string;
};

type Props<T> = {
  isLoading?: boolean;
  placeholder?: string;
  options: Option<T>[];
  value: T;
  onChange?: (value: T) => void;
  label?: string;
  error?: string;
};

export const SelectWithSearch = forwardRef(
  <T extends string>(
    props: Props<T>,
    ref: React.ForwardedRef<HTMLButtonElement>
  ) => {
    const {
      placeholder = 'Выберите значение',
      isLoading,
      options,
      label,
      value,
      onChange,
      error,
    } = props;

    const [searchValue, setSearchValue] = useState('');

    const filteredOptions = options.filter((option) =>
      option.label
        .toLowerCase()
        .includes(searchValue.toLowerCase())
    );

    return (
      <div>
        <Label className={cn(error && 'text-destructive')}>
          {label}
          <Select value={value} onValueChange={onChange}>
            <SelectTrigger
              ref={ref}
              className={cn(error && 'border-destructive')}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              <div className="p-2">
                <Input
                  startIcon={
                    <SearchIcon className="h-4 w-4" />
                  }
                  placeholder="Поиск..."
                  value={searchValue}
                  onChange={(e) =>
                    setSearchValue(e.target.value)
                  }
                />
              </div>
              {isLoading ? (
                <SelectItem value="loading">
                  Loading...
                </SelectItem>
              ) : (
                options.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    className={cn({
                      hidden:
                        !filteredOptions.includes(option),
                    })}
                    onClick={() => {
                      setSearchValue('');
                    }}
                  >
                    {option.label}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
        </Label>
        {error && (
          <p className="text-sm font-medium text-destructive mt-1">
            {error}
          </p>
        )}
      </div>
    );
  }
);

SelectWithSearch.displayName = 'SelectWithSearch';
