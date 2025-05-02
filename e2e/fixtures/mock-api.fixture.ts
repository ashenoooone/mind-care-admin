import { test as base } from '@playwright/test';
import { ReportApiMock } from '../mocks/reports.api';
import { AuthApiMock } from '../mocks/auth.api';

type MockReportsParams = {
  count?: number;
};

type MockApiFixture = {
  mockReportsApi: (
    params: MockReportsParams
  ) => Promise<void>;
  mockAuthApi: () => Promise<void>;
};

export const mockApiFixture = base.extend<MockApiFixture>({
  mockReportsApi: async ({ page }, use) => {
    const reportApiMock = new ReportApiMock(page);
    await use(
      reportApiMock.mockReportsApi.bind(reportApiMock)
    );
  },
  mockAuthApi: async ({ page }, use) => {
    const authApiMock = new AuthApiMock(page);
    await use(authApiMock.mockAuthApi.bind(authApiMock));
  },
});
