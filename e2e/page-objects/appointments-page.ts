import { Page } from '@playwright/test';

export class AppointmentsPage {
  constructor(private page: Page) {
    this.page = page;
  }

  async isCurrent(): Promise<boolean> {
    await this.page.waitForURL('/appointments');
    return this.page.url().includes('/appointments');
  }
}
