import {
  mockApiFixture,
  pageActionsFixture,
} from '../fixtures';
import { expect, mergeTests } from '@playwright/test';

const test = mergeTests(pageActionsFixture, mockApiFixture);

test.beforeEach(async ({ mockAuthApi }) => {
  await mockAuthApi();
});

test.describe('Login Page', () => {
  test('должен корректно перейти на страницу и авторизоваться', async ({
    loginActions,
    appointmentsPage,
  }) => {
    await loginActions.login('root', 'root');
    expect(await appointmentsPage.isCurrent()).toBe(true);
  });
});
