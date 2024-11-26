import { TService } from '@/entities/service';
import { TClient } from '@/entities/users';
import {
  combine,
  createEvent,
  createStore,
} from 'effector';

export const createAppointmentsFiltersModel = () => {
  const $sortDirection = createStore<'asc' | 'desc'>(
    'desc'
  );
  const $clientId = createStore<number | null>(null);
  const $serviceId = createStore<number | null>(null);
  const $dateFrom = createStore<Date | null>(null);
  const $dateTo = createStore<Date | null>(null);
  const $date = createStore<Date | null>(null);
  const $page = createStore(0);
  const $filters = combine(
    combine({
      sortDirection: $sortDirection,
      clientId: $clientId,
      serviceId: $serviceId,
      dateFrom: $dateFrom,
      dateTo: $dateTo,
      date: $date,
      page: $page,
    })
  );

  const resetFiltersEv = createEvent();
  const setSortDirectionEv = createEvent<'asc' | 'desc'>();
  const setClientIdEv = createEvent<TClient | null>();
  const setServiceIdEv = createEvent<TService | null>();
  const setDateEv = createEvent<Date | null>();
  const setDateFromEv = createEvent<Date | null>();
  const setDateToEv = createEvent<Date | null>();
  const setPageEv = createEvent<number>();

  $page.on(setPageEv, (_, n) => n);
  $sortDirection
    .on(setSortDirectionEv, (_, s) => s)
    .reset(resetFiltersEv);
  $clientId
    .on(setClientIdEv, (_, n) => (n === null ? n : n.id))
    .reset(resetFiltersEv);
  $serviceId
    .on(setServiceIdEv, (_, n) => (n === null ? n : n.id))
    .reset(resetFiltersEv);
  $date
    .on(setDateEv, (_, n) => n)
    .reset(resetFiltersEv)
    .reset(setDateFromEv)
    .reset(setDateToEv);
  $dateFrom
    .on(setDateFromEv, (_, n) => n)
    .reset(resetFiltersEv)
    .reset(setDateEv);
  $dateTo
    .on(setDateToEv, (_, n) => n)
    .reset(resetFiltersEv)
    .reset(setDateEv);

  return {
    filters: $filters,
    actions: {
      resetFiltersEv,
      setSortDirectionEv,
      setClientIdEv,
      setServiceIdEv,
      setDateEv,
      setDateFromEv,
      setDateToEv,
      setPageEv,
    },
  };
};
