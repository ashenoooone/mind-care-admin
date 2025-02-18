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
import { Label } from '@/shared/ui/label';

type CreateServiceFormProps = {
  className?: string;
  onSuccess?: () => void;
};

type TFormState = Omit<
  TService,
  'id' | 'cost' | 'duration'
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
      duration: parseMins(formData.duration) ?? undefined,
    };

    createService.mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn('flex flex-col gap-4', className)}
    >
      <div className="grid grid-cols-2 gap-4">
        <Controller
          name="name"
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
          label="Стоимость"
          {...registerWithMask('cost', ['9{1,} руб/час'], {
            required: true,
          })}
        />
      </div>
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <Label className="flex flex-col gap-2">
            Описание
            <textarea className="border p-2" {...field} />
          </Label>
        )}
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
