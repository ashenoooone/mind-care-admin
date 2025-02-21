import { TAppointment } from '@/entities/appointments';
import { createEvent, createStore } from 'effector';
import { useUnit } from 'effector-react';

const createAppointmentModalModel = () => {
  const $open = createStore<boolean>(false);
  const $appointment = createStore<TAppointment | null>(
    null
  );

  const setOpen = createEvent<{
    open: boolean;
    appointment: TAppointment | null;
  }>();

  $open.on(setOpen, (_, { open }) => open);
  $appointment.on(
    setOpen,
    (_, { appointment }) => appointment
  );

  return {
    $open,
    $appointment,
    setOpen,
  };
};

const model = createAppointmentModalModel();

export const useAppointmentModal = () => {
  const { $open, $appointment, setOpen } = useUnit(model);

  return {
    $open,
    $appointment,
    setOpen,
  };
};

export const useAppointmentModalOpen = () => {
  const { setOpen, $appointment } = useUnit(model);

  return {
    open: (appointment: TAppointment) =>
      setOpen({ open: true, appointment }),
    isAppointmentActive: (appointment: TAppointment) =>
      $appointment?.id === appointment.id,
  };
};
