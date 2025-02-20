import { HOURS } from '../domain/time-grid';
import { Cell } from './cell';

export const Hours = () => {
  return (
    <div className="flex flex-col w-12">
      <Cell border={false} />
      {HOURS.map((hour) => (
        <Cell
          key={hour}
          className="relative select-none"
          border={false}
        >
          <span className="absolute -top-3">
            {hour.toString().padStart(2, '0')}:00
          </span>
        </Cell>
      ))}
    </div>
  );
};
