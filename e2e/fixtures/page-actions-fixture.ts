import { test as base } from '@playwright/test';
import { LoginActions } from '../app-actions/login-actions';
import { AppointmentsPage } from '../page-objects/appointments-page';

export type PageActionsFixture = {
  loginActions: LoginActions;
  appointmentsPage: AppointmentsPage;
};

export const pageActionsFixture =
  base.extend<PageActionsFixture>({
    loginActions: async ({ page }, use) => {
      await use(new LoginActions(page));
    },
    appointmentsPage: async ({ page }, use) => {
      await use(new AppointmentsPage(page));
    },
  });
