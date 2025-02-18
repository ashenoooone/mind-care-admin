import { useUnit } from 'effector-react';
import { createTableModel } from './table';
import { Button } from '@/shared/ui/button';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from 'lucide-react';

const tableModel = createTableModel();

export const useAppointmentsTable = () => {
  const {
    increaseUnitIndex,
    setShowMode,
    decreaseUnitIndex,
    $currentPeriod,
    $tableState,
    dropUnitIndex,
    $title,
  } = useUnit(tableModel);

  return {
    setShowMode,
    $currentPeriod,
    $tableState,
    $title,
    controls: (
      <div className="flex gap-2">
        <Button
          onClick={decreaseUnitIndex}
          variant="outline"
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </Button>
        <Button onClick={dropUnitIndex} variant="outline">
          Сегодня
        </Button>
        <Button
          onClick={increaseUnitIndex}
          variant="outline"
        >
          <ChevronRightIcon className="h-4 w-4" />
        </Button>
      </div>
    ),
  };
};
