import { mergeTests } from '@playwright/test';
import { mockApiFixture } from '../fixtures';
import { pageActionsFixture } from '../fixtures';
import { expect } from '@playwright/test';

const test = mergeTests(pageActionsFixture, mockApiFixture);

test.beforeEach(
  async ({
    loginActions,
    mockReportsApi,
    appointmentsPage,
    mockAuthApi,
    mockAppointmentsApi,
  }) => {
    await mockReportsApi({ count: 50 });
    await mockAuthApi();
    await mockAppointmentsApi.mockAppointmentsApi();
    await loginActions.login('root', 'root');
    await expect(await appointmentsPage.isCurrent()).toBe(
      true
    );
  }
);

test.describe('Reports Page', () => {
  test('должен отобразить страницу жалоб', async ({
    reportsPage,
  }) => {
    await reportsPage.navigate();
    await expect(await reportsPage.isCurrent()).toBe(true);
    expect(await reportsPage.hasReportsTable()).toBe(true);
  });

  test('должен корректно открыть страницу и изменить статус первого элемента', async ({
    reportsActions,
  }) => {
    await reportsActions.openReportsPageAndChangeFirstReportStatus();
  });
});
