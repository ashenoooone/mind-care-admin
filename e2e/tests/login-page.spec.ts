import { ERROR_MAPPER } from '@/features/auth';
import {
  mockApiFixture,
  pageActionsFixture,
} from '../fixtures';
import { expect, mergeTests } from '@playwright/test';

const test = mergeTests(pageActionsFixture, mockApiFixture);

test.beforeEach(
  async ({ mockAuthApi, mockAppointmentsApi }) => {
    await mockAuthApi();
    await mockAppointmentsApi.mockAppointmentsApi();
  }
);

test.describe('Login Page', () => {
  test('должен корректно перейти на страницу и авторизоваться', async ({
    loginActions,
    appointmentsPage,
  }) => {
    await loginActions.login('root', 'root');
    expect(await appointmentsPage.isCurrent()).toBe(true);
  });

  test('должен корректно отобразить ошибку при неверном логине', async ({
    loginActions,
    loginPage,
  }) => {
    await loginActions.login('root', 'wrong-password');
    expect(await loginPage.isCurrent()).toBe(true);
    expect(await loginPage.getErrorText()).toBe(
      ERROR_MAPPER['Request failed with status code 401']
    );
  });
});
