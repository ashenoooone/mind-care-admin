import { createEvent, createStore } from 'effector';

export const createReportsListParamsModel = () => {
  const $page = createStore<number>(0);
  const changePageEv = createEvent<number>();
  $page.on(changePageEv, (_, n) => n);
  return {
    $page,
    changePageEv,
  };
};
