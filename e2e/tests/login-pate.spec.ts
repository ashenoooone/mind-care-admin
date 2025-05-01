import { pageActionsFixture as test } from '../fixtures';
import { expect } from '@playwright/test';

test.describe('Login Page', () => {
  test('должен корректно перейти на страницу и авторизоваться', async ({
    loginActions,
    appointmentsPage,
  }) => {
    await loginActions.login('root', 'root');
    expect(await appointmentsPage.isCurrent()).toBe(true);
  });
});
