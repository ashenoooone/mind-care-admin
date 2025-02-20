import { cn } from '@/shared/lib/utils';
import { Hours } from './hours';

type Props = {
  className?: string;
  mode?: 'week' | 'day';
  columns: React.ReactNode;
};

export const TimeGrid = (props: Props) => {
  const { className, mode = 'week', columns } = props;

  return (
    <div className="flex">
      <Hours />
      <div
        className={cn(
          `w-full grid overflow-auto`,
          {
            'grid-cols-5': mode === 'week',
            'grid-cols-1': mode === 'day',
          },
          className
        )}
      >
        {columns}
      </div>
    </div>
  );
};

// const Column = <T extends TimeGridEvent>(props: {
//   title: string;
//   className?: string;
//   events: T[];
//   renderEvent: (event: T) => React.ReactNode;
//   renderDay: (day: string) => React.ReactNode;
// }) => {
//   const {
//     title,
//     className,
//     events,
//     renderEvent,
//     renderDay,
//   } = props;

//   return (
//     <div
//       className={cn('flex flex-col border-r', className)}
//     >
//       <Cell className="font-bold text-center">
//         {renderDay(title)}
//       </Cell>
//       {hours.map((hour) => {
//         const event = findEventStartingAtHour({
//           events,
//           hour,
//         });

//         let content = null;
//         let styles: React.CSSProperties | undefined;

//         if (event) {
//           styles = calculateTimeGridEventStyles({
//             event,
//             hour,
//           });

//           content = (
//             <div
//               className="bg-red-400 absolute w-full z-20 p-2 rounded-xl"
//               style={styles}
//             >
//               {renderEvent(event)}
//             </div>
//           );
//         }

//         return (
//           <Cell key={hour} className="relative">
//             {content}
//           </Cell>
//         );
//       })}
//     </div>
//   );
// };
