import { Button } from '@/shared/ui/button';
import {
  AppointmentStatus,
  TAppointment,
} from '../model/types';
import { cn } from '@/shared/lib/utils';
import { Check } from 'lucide-react';
import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import {
  APPOINTMENTS_BASE_KEY,
  PATCH_APPOINTMENTS_MUTATION_OPTIONS,
} from '../model/hooks';
import { useState } from 'react';
import { ConfirmationModal } from '@/shared/ui/confirmation-modal';

type Props = {
  className?: string;
  appointment: TAppointment;
};

export const ConfirmAppointment = (props: Props) => {
  const { className, appointment } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const patchAppointment = useMutation({
    ...PATCH_APPOINTMENTS_MUTATION_OPTIONS,
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [APPOINTMENTS_BASE_KEY],
      });
    },
  });

  const handleCancelAppointmentClick = () => {
    patchAppointment.mutate({
      ...appointment,
      status: AppointmentStatus.COMPLETED,
    });
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        onClick={() => setIsModalOpen(true)}
        title="Подтвердить"
        variant={'green'}
        className={cn('mt-2', className)}
      >
        <Check />
      </Button>
      <ConfirmationModal
        isOpen={isModalOpen}
        onOpenChange={(open) => setIsModalOpen(open)}
        confirmButtonProps={{
          onClick: handleCancelAppointmentClick,
          children: 'Подтвердить запись',
          variant: 'green',
        }}
        cancelButtonProps={{
          onClick: () => setIsModalOpen(false),
          children: 'Назад',
        }}
      />
    </>
  );
};
