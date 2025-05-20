import {
  createEvent,
  createStore,
  combine,
} from 'effector';
import { debounce } from 'patronum';

export type UsersFiltersStore = {
  name: string;
  telegramNickname: string;
  phoneNumber: string;
  page: number;
};

export const createUsersFiltersModel = () => {
  // Создаем сторы для каждого фильтра
  const $name = createStore('');
  const $debouncedName = createStore('');
  const $telegramNickname = createStore('');
  const $debouncedTelegramNickname = createStore('');
  const $phoneNumber = createStore('');
  const $debouncedPhoneNumber = createStore('');
  const $page = createStore(0);

  // Создаем события для обновления фильтров
  const setNameEv = createEvent<string>();
  const setTelegramNicknameEv = createEvent<string>();
  const setPhoneNumberEv = createEvent<string>();
  const setPageEv = createEvent<number>();
  const resetFiltersEv = createEvent();

  // Подписываемся на события
  $name.on(setNameEv, (_, v) => v).reset(resetFiltersEv);
  $telegramNickname
    .on(setTelegramNicknameEv, (_, v) => v)
    .reset(resetFiltersEv);
  $phoneNumber
    .on(setPhoneNumberEv, (_, v) => v)
    .reset(resetFiltersEv);

  $page
    .on(setPageEv, (_, n) => n)
    .reset(setNameEv)
    .reset(setTelegramNicknameEv)
    .reset(setPhoneNumberEv);

  // Добавляем debounce для полей
  debounce({
    source: setNameEv,
    timeout: 500,
    target: $debouncedName,
  });

  debounce({
    source: setTelegramNicknameEv,
    timeout: 500,
    target: $debouncedTelegramNickname,
  });

  debounce({
    source: setPhoneNumberEv,
    timeout: 500,
    target: $debouncedPhoneNumber,
  });

  // Комбинируем все фильтры в один стор
  const $filters = combine({
    name: $debouncedName,
    telegramNickname: $debouncedTelegramNickname,
    phoneNumber: $debouncedPhoneNumber,
    page: $page,
  });

  return {
    $filters,
    $name,
    $telegramNickname,
    $phoneNumber,
    actions: {
      setNameEv,
      setTelegramNicknameEv,
      setPhoneNumberEv,
      setPageEv,
      resetFiltersEv,
    },
  };
};
