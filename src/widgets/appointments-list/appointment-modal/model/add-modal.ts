import { createEvent, createStore } from 'effector';
import { useUnit } from 'effector-react';

const createAddModalModel = () => {
  const $open = createStore(false);
  const setOpen = createEvent<boolean>();

  $open.on(setOpen, (_, open) => open);

  return { $open, setOpen };
};

const model = createAddModalModel();

export const useAddAppointmentModal = () => {
  const { $open, setOpen } = useUnit(model);

  return { $open, setOpen };
};
