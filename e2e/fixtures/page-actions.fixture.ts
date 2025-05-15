import { test as base } from '@playwright/test';
import { LoginActions } from '../app-actions/login-actions';
import { AppointmentsPage } from '../page-objects/appointments-page';
import { ReportsPage } from '../page-objects/reports-page';
import { LoginPage } from '../page-objects/login-page';
import { ReportsActions } from '../app-actions/reports-actions';
import { AppointmentsActions } from '../app-actions/appointments-actions';

export type PageActionsFixture = {
  loginActions: LoginActions;
  appointmentsPage: AppointmentsPage;
  reportsPage: ReportsPage;
  reportsActions: ReportsActions;
  loginPage: LoginPage;
  appointmentsActions: AppointmentsActions;
};

export const pageActionsFixture =
  base.extend<PageActionsFixture>({
    appointmentsActions: async ({ page }, use) => {
      await use(new AppointmentsActions(page));
    },
    loginActions: async ({ page }, use) => {
      await use(new LoginActions(page));
    },
    appointmentsPage: async ({ page }, use) => {
      await use(new AppointmentsPage(page));
    },
    reportsPage: async ({ page }, use) => {
      await use(new ReportsPage(page));
    },
    loginPage: async ({ page }, use) => {
      await use(new LoginPage(page));
    },
    reportsActions: async ({ page }, use) => {
      await use(new ReportsActions(page));
    },
  });
