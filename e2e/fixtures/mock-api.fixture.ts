import { test as base } from '@playwright/test';
import { ReportApiMock } from '../mocks/reports.api';
import { AuthApiMock } from '../mocks/auth.api';
import { AppointmentsApi } from '../mocks/appointments.api';
import { ServicesApi } from '../mocks/services.api';

type MockReportsParams = {
  count?: number;
};

type MockApiFixture = {
  mockReportsApi: (
    params: MockReportsParams
  ) => Promise<void>;
  mockAuthApi: () => Promise<void>;
  mockAppointmentsApi: AppointmentsApi;
  mockServicesApi: ServicesApi;
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
  mockAppointmentsApi: async ({ page }, use) => {
    const appointmentsApiMock = new AppointmentsApi(page);
    await use(appointmentsApiMock);
  },
  mockServicesApi: async ({ page }, use) => {
    const servicesApiMock = new ServicesApi(page);
    await use(servicesApiMock);
  },
});
