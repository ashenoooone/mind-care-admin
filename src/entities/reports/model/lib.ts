import { ReportStatus } from './types';

export const REPORT_STATUS_MAPPER: Record<
  ReportStatus,
  string
> = {
  RESOLVED: 'Решено',
  IN_PROGRESS: 'В работе',
  PENDING: 'На рассмотрении',
  CLOSED: 'Закрыто',
};
