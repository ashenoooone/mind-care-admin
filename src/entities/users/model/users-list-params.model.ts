import { createStore, createEvent } from 'effector';

export const createUsersListParamsModel = () => {
  const $page = createStore<number>(0);
  const changePageEv = createEvent<number>();
  $page.on(changePageEv, (_, n) => n);
  return {
    $page,
    changePageEv,
  };
};
