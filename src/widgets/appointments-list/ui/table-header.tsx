import {
  ToggleGroup,
  ToggleGroupItem,
} from '@/shared/ui/toggle-group';
import { TableShowMode } from '../domain/table';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { Plus } from 'lucide-react';
import { useAppointmentModalOpen } from '../appointment-modal';

type Props = {
  className?: string;
  value: TableShowMode;
  onChange: (value: TableShowMode) => void;
};

export const TableHeader = (props: Props) => {
  const { className, value, onChange } = props;
  const { openAddModal } = useAppointmentModalOpen();

  return (
    <div className="flex items-center justify-between bg-gray-500/10 rounded-xl">
      <ToggleGroup
        type="single"
        value={value}
        onValueChange={onChange}
        className={cn(
          'px-2 py-1 rounded-xl z-50',
          className
        )}
      >
        <ToggleGroupItem
          data-testid="day-toggle-group-item"
          className="z-20"
          value="day"
        >
          День
        </ToggleGroupItem>
        <ToggleGroupItem
          data-testid="week-toggle-group-item"
          className="z-20"
          value="week"
        >
          Неделя
        </ToggleGroupItem>
        <ToggleGroupItem
          data-testid="month-toggle-group-item"
          className="z-20"
          value="month"
        >
          Месяц
        </ToggleGroupItem>
      </ToggleGroup>
      <Button
        data-testid="create-appointment-button"
        onClick={openAddModal}
        size="sm"
      >
        <Plus className="w-4 h-4 mr-2" />
        Создать запись
      </Button>
    </div>
  );
};
