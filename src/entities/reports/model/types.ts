import { TClient } from '@/entities/users';

export type ReportStatus =
  | 'PENDING'
  | 'IN_PROGRESS'
  | 'RESOLVED'
  | 'CLOSED';

export type TReport = {
  id: number;
  client: TClient;
  createdAt: Date;
  description: string;
  status: ReportStatus;
};
