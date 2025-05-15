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
  }) => {
    await mockAuthApi();
    await loginActions.login('root', 'root');
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
});
