import {
  Calendar,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import {
  AppointmentStatus,
  appointmentStatusMapper,
} from '../model/types';
import { cn } from '@/shared/lib/utils';

type Props = {
  className?: string;
  status: AppointmentStatus;
};

const statusIcons = {
  SCHEDULED: <Calendar className="w-4 h-4 text-blue-500" />,
  COMPLETED: (
    <CheckCircle className="w-4 h-4 text-green-500" />
  ),
  CANCELLED: <XCircle className="w-4 h-4 text-red-500" />,
};

const statusColors = {
  SCHEDULED: 'text-blue-500 bg-blue-100',
  COMPLETED: 'text-green-500 bg-green-100',
  CANCELLED: 'text-red-500 bg-red-100',
};

export const Status = (props: Props) => {
  const { className, status } = props;
  return (
    <div
      className={cn(
        statusColors[status],
        className,
        'px-2 py-1 select-none items-center text-sm font-medium rounded-full group flex'
      )}
    >
      {statusIcons[status]}
      <span className="overflow-hidden max-w-0 group-hover:ml-1 group-hover:max-w-[150px] transition-all duration-300 ease-in-out whitespace-nowrap">
        {appointmentStatusMapper[status]}
      </span>
    </div>
  );
};
