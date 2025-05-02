import { faker } from '@faker-js/faker';
import { TReport } from '@/entities/reports';
import { ClientFactory } from './client.factory';

type CreateReportParams = {
  count?: number;
};

export class ReportFactory {
  static createReport(): TReport {
    return {
      id: faker.number.int(),
      client: ClientFactory.createClient(),
      description: faker.lorem.sentence(),
      status: faker.helpers.arrayElement([
        'PENDING',
        'IN_PROGRESS',
        'RESOLVED',
        'CLOSED',
      ]),
      createdAt: faker.date.recent(),
    };
  }

  static createReports(
    params: CreateReportParams
  ): TReport[] {
    const { count = 1 } = params;
    return Array.from({ length: count }, () =>
      this.createReport()
    );
  }
}
