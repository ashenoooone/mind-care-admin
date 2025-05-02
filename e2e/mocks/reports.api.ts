import { Route, Page } from '@playwright/test';
import { ReportFactory } from './report.factory';
import { paginate } from '../utils/paginate';

type MockReportsParams = {
  count?: number;
};

export class ReportApiMock {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async mockReportsApi(
    params: MockReportsParams
  ): Promise<void> {
    const { count } = params;
    await this.mockGetReports(count);
  }

  async mockGetReports(count = 10): Promise<void> {
    const reports = ReportFactory.createReports({ count });

    await this.page.route(
      '**/reports?**',
      async (route: Route) => {
        const url = new URL(route.request().url());
        const limit = parseInt(
          url.searchParams.get('limit') || '10'
        );
        const pageIndex = parseInt(
          url.searchParams.get('page') || '0'
        );

        const response = paginate(
          reports,
          pageIndex,
          limit
        );

        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(response),
        });
      }
    );
  }
}
