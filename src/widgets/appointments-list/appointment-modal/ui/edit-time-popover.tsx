import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import {
  PopoverContent,
  PopoverTrigger,
} from '@/shared/ui/popover';

import { Popover } from '@/shared/ui/popover';
import { Edit } from 'lucide-react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { cn } from '@/shared/lib/utils';

type FormValues = {
  startTime: string;
  endTime: string;
};

type Props = {
  startTime: string;
  endTime: string;
  onSubmit: (data: {
    startTime: string;
    endTime: string;
  }) => void;
};

const formatTimeFromISO = (isoString: string) => {
  const date = new Date(isoString);
  const utcHours = date.getUTCHours();
  const utcMinutes = date.getUTCMinutes();
  return `${utcHours.toString().padStart(2, '0')}:${utcMinutes.toString().padStart(2, '0')}`;
};

const formatISOFromTime = (
  timeString: string,
  originalISOString: string
) => {
  const [hours, minutes] = timeString.split(':');
  const date = new Date(originalISOString);
  date.setUTCHours(parseInt(hours, 10));
  date.setUTCMinutes(parseInt(minutes, 10));
  date.setUTCSeconds(0);
  date.setUTCMilliseconds(0);
  return date.toISOString();
};

const compareTime = (time1: string, time2: string) => {
  const [hours1, minutes1] = time1.split(':').map(Number);
  const [hours2, minutes2] = time2.split(':').map(Number);

  if (hours1 > hours2) return 1;
  if (hours1 < hours2) return -1;
  if (minutes1 > minutes2) return 1;
  if (minutes1 < minutes2) return -1;
  return 0;
};

export const EditTimePopover = (props: Props) => {
  const { startTime, endTime, onSubmit } = props;

  const [isOpenPopover, setIsOpenPopover] = useState(false);

  const defaultValues = {
    startTime: formatTimeFromISO(startTime),
    endTime: formatTimeFromISO(endTime),
  };

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, dirtyFields },
    getValues,
  } = useForm<FormValues>({
    defaultValues,
    mode: 'onChange',
  });

  const handleFormSubmit = (data: FormValues) => {
    onSubmit({
      startTime: formatISOFromTime(
        data.startTime,
        startTime
      ),
      endTime: formatISOFromTime(data.endTime, endTime),
    });
    setIsOpenPopover(false);
  };

  return (
    <Popover
      open={isOpenPopover}
      onOpenChange={setIsOpenPopover}
    >
      <PopoverTrigger>
        <Button>
          <Edit />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <form
          className="flex flex-col gap-3"
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <Controller
            control={control}
            name="startTime"
            rules={{
              validate: (value) => {
                const currentEndTime = getValues('endTime');
                return (
                  compareTime(value, currentEndTime) <= 0 ||
                  'Время начала не может быть больше времени окончания'
                );
              },
            }}
            render={({ field }) => (
              <Input
                type="time"
                label="Время начала"
                error={errors.startTime?.message}
                className={cn(
                  dirtyFields.startTime && 'bg-blue-50'
                )}
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name="endTime"
            rules={{
              validate: (value) => {
                const currentStartTime =
                  getValues('startTime');
                return (
                  compareTime(currentStartTime, value) <=
                    0 ||
                  'Время окончания не может быть меньше времени начала'
                );
              },
            }}
            render={({ field }) => (
              <Input
                type="time"
                label="Время окончания"
                error={errors.endTime?.message}
                className={cn(
                  dirtyFields.endTime && 'bg-blue-50'
                )}
                {...field}
              />
            )}
          />
          <Button
            type="submit"
            disabled={
              !isDirty || Object.keys(errors).length > 0
            }
          >
            Сохранить
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
};
