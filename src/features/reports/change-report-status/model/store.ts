import { TReport } from '@/entities/reports';
import { createEvent, createStore } from 'effector';

export const createChangeReportModalModel = () => {
  const $report = createStore<TReport | null>(null);

  const openChangeReportModal =
    createEvent<TReport | null>();

  $report.on(openChangeReportModal, (_, report) => report);

  return {
    $report,
    openChangeReportModal,
  } as const;
};
