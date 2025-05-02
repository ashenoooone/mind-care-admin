import { test as base } from '@playwright/test';
import { LoginActions } from '../app-actions/login-actions';
import { AppointmentsPage } from '../page-objects/appointments-page';
import { ReportsPage } from '../page-objects/reports-page';

export type PageActionsFixture = {
  loginActions: LoginActions;
  appointmentsPage: AppointmentsPage;
  reportsPage: ReportsPage;
};

export const pageActionsFixture =
  base.extend<PageActionsFixture>({
    loginActions: async ({ page }, use) => {
      await use(new LoginActions(page));
    },
    appointmentsPage: async ({ page }, use) => {
      await use(new AppointmentsPage(page));
    },
    reportsPage: async ({ page }, use) => {
      await use(new ReportsPage(page));
    },
  });
