import Loader from '@/shared/ui/loader';
import { useGetAppointments } from '../model/hooks';
import { Appointment } from './appointment';
import { cn } from '@/shared/lib/utils';
import { Status } from './status';

type Props = {
  className?: string;
  params: FuncFirstParameter<typeof useGetAppointments>;
};

export const List = (props: Props) => {
  const { className, params } = props;

  const { data, isLoading, isError } =
    useGetAppointments(params);

  // TODO обработка ошибок

  if (isLoading || isError) {
    return <Loader />;
  }

  return (
    <div
      className={cn(className, 'grid grid-cols-4 gap-4')}
    >
      {data?.data.items.map((ap) => (
        <Appointment
          appointment={ap}
          key={ap.id}
          className="relative"
          status={
            <Status
              className="absolute top-1 right-1"
              status={ap.status}
            />
          }
        />
      ))}
    </div>
  );
};
