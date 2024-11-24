import { createEvent, createStore } from 'effector';
import { debounce } from 'patronum';

export const createSearchClientsModel = (settings: {
  debounceTiming: number;
}) => {
  const { debounceTiming = 500 } = settings;

  const $name = createStore('');

  const setNameEv = createEvent<string>();

  debounce(setNameEv, debounceTiming);

  return {
    $name,
    setNameEv,
  };
};
