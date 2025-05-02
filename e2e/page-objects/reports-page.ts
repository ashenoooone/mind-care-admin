import { Locator, Page } from '@playwright/test';

export class ReportsPage {
  private reportsTable: Locator;

  constructor(private readonly page: Page) {
    this.reportsTable = page.getByTestId('reports-table');
  }

  async isCurrent() {
    await this.page.waitForURL('/reports');
    return this.page.url().includes('/reports');
  }

  async navigate() {
    await this.page.goto('/reports');
  }

  async hasReportsTable(): Promise<boolean> {
    return this.reportsTable.isVisible();
  }

  async getReportsTableRows() {
    return this.reportsTable.locator('tbody tr');
  }
}
