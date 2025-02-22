import { useQueryState } from '@/shared/hooks/use-query-state';
import { createEvent, createStore } from 'effector';
import { useUnit } from 'effector-react';

export const createEditModalModel = () => {
  const $open = createStore(false);

  const setOpen = createEvent<boolean>();

  $open.on(setOpen, (_, open) => open);

  return { $open, setOpen };
};

const model = createEditModalModel();

export const useEditAppointmentModal = () => {
  const { $open, setOpen } = useUnit(model);

  const [appointmentId, setAppointmentId] =
    useQueryState('appointmentId');

  return {
    $open,
    appointmentId,
    openEditModal: (id: number) => {
      setAppointmentId(id.toString());
      setOpen(true);
    },
    onOpenChange: (open: boolean) => {
      setOpen(open);
      setAppointmentId(null);
    },
  };
};
