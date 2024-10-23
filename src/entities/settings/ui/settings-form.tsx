'use client';
import { cn } from '@/shared/lib/utils';
import { TSettings } from '../model/types';
import { Button } from '@/shared/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/shared/ui/card';
import { Input } from '@/shared/ui/input';
import { Controller, useForm } from 'react-hook-form';
import { SelectComponent } from '@/shared/ui/select';

type SettingsFormProps = {
  className?: string;
  settings: TSettings;
  onSubmit?: (settings: TSettings) => void;
};

const MINUS_TIME = 5;

const getTimeZoneText = (timezone: number) => {
  if (timezone > 0) {
    return `+${timezone} от МСК`;
  } else if (timezone < 0) {
    return `${timezone} от МСК`;
  }
  return `по МСК`;
};

export const SettingsForm = (props: SettingsFormProps) => {
  const { className, settings, onSubmit } = props;

  const { control, handleSubmit } = useForm<TSettings>({
    defaultValues: { ...settings },
    disabled: onSubmit === undefined,
  });

  const timezoneOptions = new Array(11)
    .fill(0)
    .map((_, index) => ({
      value: index - MINUS_TIME,
      label: getTimeZoneText(index - MINUS_TIME),
    }));

  const submitHandler = onSubmit ? onSubmit : () => {};

  return (
    <Card className={cn(className, 'h-max')}>
      <CardHeader>
        <CardTitle>Настройки</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit(submitHandler)}>
        <CardContent className="flex gap-2">
          <div className="flex flex-col gap-4">
            <Controller
              name="begin_time"
              control={control}
              render={({ field }) => (
                <Input
                  label="Начало рабочего дня"
                  type="time"
                  {...field}
                />
              )}
            />
            <Controller
              name="end_time"
              control={control}
              render={({ field }) => (
                <Input
                  label="Конец рабочего дня"
                  type="time"
                  {...field}
                />
              )}
            />
          </div>
          <div className="flex flex-col gap-4">
            <Controller
              name="timezone_server"
              control={control}
              render={({ field }) => (
                <SelectComponent
                  {...field}
                  onValueChange={(val) =>
                    field.onChange(Number(val))
                  }
                  value={field.value}
                  options={timezoneOptions}
                  label="Часовой пояс сервера"
                />
              )}
            />
            <Controller
              name="timezone_admin"
              control={control}
              render={({ field }) => (
                <SelectComponent
                  {...field}
                  onValueChange={(val) =>
                    field.onChange(Number(val))
                  }
                  value={field.value}
                  options={timezoneOptions}
                  label="Ваша часовая зона"
                />
              )}
            />
          </div>
        </CardContent>
        {onSubmit && (
          <CardFooter>
            <Button type="submit">Сохранить</Button>
          </CardFooter>
        )}
      </form>
    </Card>
  );
};
