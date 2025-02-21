import { useForm } from 'react-hook-form';
import {
  TAppointment,
  TAppointmentForm,
} from '../model/types';
import { Input } from '@/shared/ui/input';

type Props = {
  className?: string;
  defaultValues?: TAppointmentForm;
  onSubmit: (data: TAppointmentForm) => void;
};

export const AppointmentForm = (props: Props) => {
  const { className, defaultValues, onSubmit } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAppointmentForm>({
    defaultValues,
  });

  return (
    <form
      className={className}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input error="test" />
    </form>
  );
};
