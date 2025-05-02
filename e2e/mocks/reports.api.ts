import { Page } from '@playwright/test';
import { ReportFactory } from './report.factory';
import { paginate } from '../utils/paginate';
import { TReport } from '@/entities/reports';
import { PlaywrightRouter } from '../utils/router';

type MockReportsParams = {
  count?: number;
};

export class ReportApiMock {
  private reports: TReport[] = [];

  constructor(private page: Page) {}

  async mockReportsApi(
    args: MockReportsParams
  ): Promise<void> {
    const { count = 10 } = args;
    this.reports = ReportFactory.createReports({ count });

    const router = new PlaywrightRouter(
      this.page,
      '**/api/reports'
    );

    // GET /reports?limit=...&page=...
    router.addRoute('GET', async ({ req, route }) => {
      const url = new URL(req.url());
      const limit = parseInt(
        url.searchParams.get('limit') || '10'
      );
      const page = parseInt(
        url.searchParams.get('page') || '0'
      );

      const paged = paginate(this.reports, page, limit);

      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(paged),
      });
    });

    // PATCH /reports/:id
    router.addRoute('PATCH', async ({ req, route }) => {
      const url = new URL(req.url());
      const id = parseInt(
        url.pathname.split('/').pop() || '0'
      );
      const body = await req.postDataJSON();

      this.reports = this.reports.map((report) =>
        report.id === id ? { ...report, ...body } : report
      );

      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(body),
      });
    });

    await router.build();
  }
}
