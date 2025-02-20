import { TimeGridEvent } from './domain/time-grid';
import { getMinutes } from 'date-fns';

export const GRID_CELL_HEIGHT = 60;

/**
 * Вычисляет стили для отображения события в сетке времени
 * @param params.event - Событие для отображения
 * @param params.hour - Час, в котором отображается событие
 * @returns Объект со стилями для позиционирования и размера события
 */
export const calculateTimeGridEventStyles = <
  T extends TimeGridEvent,
>(params: {
  event: T;
  hour: number;
}): React.CSSProperties => {
  const startDate = new Date(params.event.startTime);
  const endDate = new Date(params.event.endTime);
  const duration =
    (endDate.getTime() - startDate.getTime()) / (1000 * 60);

  const heightMultiplier = duration / 60;
  const top = getMinutes(startDate);

  return {
    height: heightMultiplier * GRID_CELL_HEIGHT,
    top: top,
    position: 'absolute',
    zIndex: 100,
    width: '100%',
  };
};
