import {
  combine,
  createEvent,
  createStore,
} from 'effector';
import {
  getPeriodForTable,
  TableShowMode,
  TableUnitIndex,
} from '../domain';

// 0 - текущая единица времени (неделя, день, месяц)
// 1 - +1 единица времени (следующая неделя, день, месяц)
// -1 - -1 единица времени (предыдущая неделя, день, месяц)

const createUnitModel = () => {
  const $unitIndex = createStore<TableUnitIndex>(0);

  const increaseUnitIndex = createEvent();
  const decreaseUnitIndex = createEvent();
  const dropUnitIndex = createEvent();

  return {
    $unitIndex,
    increaseUnitIndex,
    decreaseUnitIndex,
    dropUnitIndex,
  };
};

export const createTableModel = () => {
  const $showMode = createStore<TableShowMode>('week');

  const setShowMode = createEvent<TableShowMode>();

  const {
    $unitIndex,
    increaseUnitIndex,
    decreaseUnitIndex,
    dropUnitIndex,
  } = createUnitModel();

  const $tableState = combine({
    showMode: $showMode,
    unitIndex: $unitIndex,
  });

  const $currentPeriod = $tableState.map(
    ({ showMode, unitIndex }) =>
      getPeriodForTable({ showMode, unitIndex })
  );

  return {
    $tableState,
    $currentPeriod,
    setShowMode,
    increaseUnitIndex,
    decreaseUnitIndex,
    dropUnitIndex,
  };
};
