import { Controller, useForm } from 'react-hook-form';
import { ServiceSelect } from '@/entities/service/ui/service-select';
import { ClientSelect } from '@/entities/users/ui/client-select';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { cn } from '@/shared/lib/utils';

export type CreateAppointmentForm = {
  serviceId: number;
  clientId: number;
  date: Date;
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
              error={errors.clientId?.message}
              defaultValue={field.value?.toString()}
              onChange={(value) =>
                field.onChange(Number(value))
              }
            />
          )}
        />
        <Controller
          name="date"
          control={control}
          rules={{ required: 'Укажите дату и время' }}
          render={({ field }) => (
            <Input
              label="Дата и время"
              type="datetime-local"
              error={errors.date?.message}
              value={
                field.value
                  ? new Date(field.value)
                      .toISOString()
                      .slice(0, 16)
                  : ''
              }
              onChange={(e) =>
                field.onChange(new Date(e.target.value))
              }
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
