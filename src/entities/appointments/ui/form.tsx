import { Controller, useForm } from 'react-hook-form';
import { ServiceSelect } from '@/entities/service/ui/service-select';
import { ClientSelect } from '@/entities/users/ui/client-select';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { cn } from '@/shared/lib/utils';
import { AppointmentStatus } from '@/entities/appointments/model/types';

const formatDateForInput = (date: Date) => {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(
    2,
    '0'
  );
  const day = String(date.getUTCDate()).padStart(2, '0');
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(
    2,
    '0'
  );

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

const parseDateFromInput = (dateString: string) => {
  const [datePart, timePart] = dateString.split('T');
  const [year, month, day] = datePart
    .split('-')
    .map(Number);
  const [hours, minutes] = timePart.split(':').map(Number);

  const date = new Date();
  date.setUTCFullYear(year);
  date.setUTCMonth(month - 1);
  date.setUTCDate(day);
  date.setUTCHours(hours);
  date.setUTCMinutes(minutes);
  date.setUTCSeconds(0);
  date.setUTCMilliseconds(0);

  return date;
};

export type CreateAppointmentForm = {
  serviceId: number;
  clientId: number;
  startTime: Date;
  endTime: Date;
  note?: string;
  status?: AppointmentStatus;
};

type Props = {
  className?: string;
  defaultValues?: CreateAppointmentForm;
  onSubmit: (data: CreateAppointmentForm) => void;
  submitButtonText?: string;
};

export const AppointmentForm = (props: Props) => {
  const {
    className,
    defaultValues,
    onSubmit,
    submitButtonText = 'Сохранить',
  } = props;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateAppointmentForm>({
    defaultValues: defaultValues ?? {},
  });

  return (
    <form
      className={cn('flex flex-col gap-4', className)}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="grid grid-cols-2 gap-4">
        <Controller
          name="serviceId"
          control={control}
          rules={{ required: 'Выберите услугу' }}
          render={({ field }) => (
            <ServiceSelect
              dataTestId="service-select"
              contentTestId="service-select-content"
              error={errors.serviceId?.message}
              defaultValue={field.value?.toString()}
              onChange={(value) =>
                field.onChange(Number(value))
              }
            />
          )}
        />
        <Controller
          name="clientId"
          control={control}
          rules={{ required: 'Выберите клиента' }}
          render={({ field }) => (
            <ClientSelect
              dataTestId="client-select"
              contentTestId="client-select-content"
              error={errors.clientId?.message}
              defaultValue={field.value?.toString()}
              onChange={(value) =>
                field.onChange(Number(value))
              }
            />
          )}
        />
        <Controller
          name="startTime"
          control={control}
          rules={{ required: 'Укажите время начала' }}
          render={({ field }) => (
            <Input
              data-testid="start-time-input"
              label="Время начала"
              type="datetime-local"
              error={errors.startTime?.message}
              value={
                field.value
                  ? formatDateForInput(field.value)
                  : ''
              }
              onChange={(e) =>
                field.onChange(
                  parseDateFromInput(e.target.value)
                )
              }
            />
          )}
        />
        <Controller
          name="endTime"
          control={control}
          rules={{ required: 'Укажите время окончания' }}
          render={({ field }) => (
            <Input
              data-testid="end-time-input"
              label="Время окончания"
              type="datetime-local"
              error={errors.endTime?.message}
              value={
                field.value
                  ? formatDateForInput(field.value)
                  : ''
              }
              onChange={(e) =>
                field.onChange(
                  parseDateFromInput(e.target.value)
                )
              }
            />
          )}
        />
      </div>
      <Button
        type="submit"
        data-testid="submit-appointment-button"
        className="w-full"
      >
        {submitButtonText}
      </Button>
    </form>
  );
};
