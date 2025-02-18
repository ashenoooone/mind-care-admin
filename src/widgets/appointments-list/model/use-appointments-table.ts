import { useUnit } from 'effector-react';
import { createTableModel } from './table';

const tableModel = createTableModel();

export const useAppointmentsTable = () => {
  const {
    increaseUnitIndex,
    setShowMode,
    decreaseUnitIndex,
    $currentPeriod,
    $tableState,
    dropUnitIndex,
  } = useUnit(tableModel);
};
