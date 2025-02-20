import {
  ToggleGroup,
  ToggleGroupItem,
} from '@/shared/ui/toggle-group';
import { TableShowMode } from '../domain/table';
import { cn } from '@/shared/lib/utils';

type Props = {
  className?: string;
  value: TableShowMode;
  onChange: (value: TableShowMode) => void;
};

export const TableHeader = (props: Props) => {
  const { className, value, onChange } = props;

  return (
    <ToggleGroup
      type="single"
      value={value}
      onValueChange={onChange}
      className={cn(
        'px-2 py-1 rounded-xl',
        'before:absolute before:z-10 before:left-0 before:right-0 before:h-10 before:bg-gray-500/10',
        className
      )}
    >
      <ToggleGroupItem className="z-20" value="day">
        День
      </ToggleGroupItem>
      <ToggleGroupItem className="z-20" value="week">
        Неделя
      </ToggleGroupItem>
      <ToggleGroupItem className="z-20" value="month">
        Месяц
      </ToggleGroupItem>
    </ToggleGroup>
  );
};
