import { TService } from '@/entities/service';
import { getFormButtonText } from '@/shared/lib/get-form-button-text';
import { parseHourRate } from '@/shared/lib/parse-hour-rate';
import { parseMins } from '@/shared/lib/parse-mins';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Controller, useForm } from 'react-hook-form';
import { useHookFormMask } from 'use-mask-input';
import { usePostCreateService } from '../model/hooks';

type CreateServiceFormProps = {
  className?: string;
  onSuccess?: () => void;
};

type TFormState = Omit<
  TService,
  'id' | 'cost' | 'duration' | 'after_pause'
> & {
  cost: string;
  duration: string;
  after_pause: string;
};

export const CreateServiceForm = (
  props: CreateServiceFormProps
) => {
  const { className, onSuccess } = props;
  const createService = usePostCreateService({
    onSuccess,
  });

  const { handleSubmit, control, register } =
    useForm<TFormState>();

  const registerWithMask = useHookFormMask(register);

  const onSubmit = (formData: TFormState) => {
    const data: Omit<Partial<TService>, 'id'> = {
      ...formData,
      price: parseHourRate(formData.cost) ?? undefined,
      after_pause:
        parseMins(formData.after_pause) ?? undefined,
      duration: parseMins(formData.duration) ?? undefined,
    };

    createService.mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn('grid grid-cols-2 gap-4', className)}
    >
      <Controller
        name="title"
        control={control}
        render={({ field }) => (
          <Input label="Название" {...field} />
        )}
      />
      <Input
        label="Длительность"
        {...registerWithMask('duration', ['9{1,} мин'], {
          required: true,
        })}
      />
      <Input
        label="Пауза после услуги"
        {...registerWithMask('after_pause', ['9{1,} мин'], {
          required: true,
        })}
      />
      <Input
        label="Стоимость"
        {...registerWithMask('cost', ['9{1,} руб/час'], {
          required: true,
        })}
      />
      <Button className="col-span-2">
        {getFormButtonText({
          state: createService.status,
          mapper: {
            idle: 'Создать',
          },
        })}
      </Button>
    </form>
  );
};
