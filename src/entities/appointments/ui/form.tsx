import { Controller, useForm } from 'react-hook-form';
import {
  TAppointmentForm,
  AppointmentStatus,
} from '../model/types';
import { ServiceSelect } from '@/entities/service/ui/service-select';
import { ClientSelect } from '@/entities/users/ui/client-select';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { SelectComponent } from '@/shared/ui/select';
import { cn } from '@/shared/lib/utils';

type Props = {
  className?: string;
  defaultValues?: TAppointmentForm | null;
  onSubmit: (data: TAppointmentForm) => void;
  submitButtonText?: string;
};

const statusOptions = [
  {
    value: AppointmentStatus.SCHEDULED,
    label: 'Запланировано',
  },
  {
    value: AppointmentStatus.COMPLETED,
    label: 'Завершено',
  },
  { value: AppointmentStatus.CANCELLED, label: 'Отменено' },
];

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
  } = useForm<TAppointmentForm>({
    defaultValues: defaultValues ?? {
      status: AppointmentStatus.SCHEDULED,
    },
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
              error={errors.serviceId?.message}
              defaultValue={field.value?.toString()}
              onChange={field.onChange}
            />
          )}
        />
        <Controller
          name="clientId"
          control={control}
          rules={{ required: 'Выберите клиента' }}
          render={({ field }) => (
            <ClientSelect
              error={errors.clientId?.message}
              defaultValue={field.value?.toString()}
              onChange={field.onChange}
            />
          )}
        />
        <Controller
          name="startTime"
          control={control}
          rules={{ required: 'Укажите время начала' }}
          render={({ field }) => (
            <Input
              label="Время начала"
              type="datetime-local"
              error={errors.startTime?.message}
              {...field}
            />
          )}
        />
        <Controller
          name="endTime"
          control={control}
          rules={{ required: 'Укажите время окончания' }}
          render={({ field }) => (
            <Input
              label="Время окончания"
              type="datetime-local"
              error={errors.endTime?.message}
              {...field}
            />
          )}
        />
        <Controller
          name="status"
          control={control}
          rules={{ required: 'Выберите статус' }}
          render={({ field }) => (
            <SelectComponent
              label="Статус"
              options={statusOptions}
              value={field.value}
              onValueChange={field.onChange}
            />
          )}
        />
      </div>
      <Button type="submit" className="w-full">
        {submitButtonText}
      </Button>
    </form>
  );
};
