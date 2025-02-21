import { Controller, useForm } from 'react-hook-form';
import { TAppointmentForm } from '../model/types';
import { ServiceSelect } from '@/entities/service/ui/service-select';

type Props = {
  className?: string;
  defaultValues?: TAppointmentForm | null;
  onSubmit: (data: TAppointmentForm) => void;
};

export const AppointmentForm = (props: Props) => {
  const { className, defaultValues, onSubmit } = props;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TAppointmentForm>({
    defaultValues: defaultValues ?? undefined,
  });

  return (
    <form
      className={className}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        name="serviceId"
        control={control}
        render={({ field }) => (
          <ServiceSelect
            error={errors.serviceId?.message}
            defaultValue={field.value.toString()}
            onChange={field.onChange}
          />
        )}
      />
    </form>
  );
};
