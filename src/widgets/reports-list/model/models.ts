import { createReportsListParamsModel } from '@/entities/reports';
import { createChangeReportModalModel } from '@/features/reports/change-report-status';

export const changeReportStatusModel =
  createChangeReportModalModel();
export const reportsListParamsModel =
  createReportsListParamsModel();
