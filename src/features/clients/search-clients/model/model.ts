import { createEvent, createStore } from 'effector';
import { debounce } from 'patronum';

export const createSearchClientsModel = (settings: {
  debounceTiming: number;
}) => {
  const { debounceTiming = 500 } = settings;

  const $name = createStore('');
  const $debouncedName = createStore('');
  const setNameEv = createEvent<string>();

  $name.on(setNameEv, (_, v) => v);

  debounce({
    source: setNameEv,
    timeout: debounceTiming,
    target: $debouncedName,
  });

  return {
    $name,
    $debouncedName,
    setNameEv,
  };
};
