import { TAppointment } from '@/entities/appointments';
import { createEvent, createStore } from 'effector';
import { useUnit } from 'effector-react';
import { useMutation } from '@tanstack/react-query';
import { PATCH_APPOINTMENTS_MUTATION_OPTIONS } from '@/entities/appointments';

export const createEditModalModel = () => {
  const $open = createStore(false);
  const $appointment = createStore<TAppointment | null>(
    null
  );

  const setOpen = createEvent<boolean>();
  const setAppointment = createEvent<TAppointment | null>();

  $open.on(setOpen, (_, open) => open);
  $appointment.on(
    setAppointment,
    (_, appointment) => appointment
  );

  return { $open, $appointment, setOpen, setAppointment };
};

const model = createEditModalModel();

export const useEditAppointmentModal = () => {
  const { $open, $appointment, setOpen, setAppointment } =
    useUnit(model);

  return {
    $open,
    $appointment,
    setOpen,
    setAppointment,
  };
};
