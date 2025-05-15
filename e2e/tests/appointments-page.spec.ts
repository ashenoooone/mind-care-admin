import { mergeTests } from '@playwright/test';
import {
  mockApiFixture,
  pageActionsFixture,
} from '../fixtures';

const test = mergeTests(pageActionsFixture, mockApiFixture);

test.beforeEach(
  async ({
    mockAuthApi,
    mockAppointmentsApi,
    loginActions,
    mockServicesApi,
  }) => {
    await mockAuthApi();
    await loginActions.login('root', 'root');
    await mockServicesApi.mockServicesApi({ count: 10 });
    await mockAppointmentsApi.mockAppointmentsApi({
      count: 10,
    });
  }
);

test.describe('Appointments Page', () => {
  test('должен корректно отображать нужные таблицы под нужные режимы отображения', async ({
    appointmentsActions,
  }) => {
    await appointmentsActions.checkShowModes();
  });
  test('должен корректно создавать запись', async ({
    appointmentsActions,
    page,
  }) => {
    await page.clock.setSystemTime(new Date('2024-05-15'));
    await appointmentsActions.createNewAppointment({
      date: '2024-05-17T14:30',
    });
  });
});
