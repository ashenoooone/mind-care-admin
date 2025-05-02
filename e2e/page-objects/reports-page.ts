import { ReportStatus } from '@/entities/reports';
import { Locator, Page } from '@playwright/test';

export class ReportsPage {
  private reportsTable: Locator;
  private modal: Locator;

  constructor(private readonly page: Page) {
    this.reportsTable = page.getByTestId('reports-table');
    this.modal = page.getByTestId(
      'change-report-status-dialog'
    );
  }

  async isCurrent() {
    await this.page.waitForURL('/reports');
    return this.page.url().includes('/reports');
  }

  async navigate() {
    await this.page.goto('/reports');
    await this.page.waitForURL('/reports');
  }

  async hasReportsTable() {
    try {
      await this.reportsTable.waitFor({
        state: 'visible',
      });
      return true;
    } catch {
      return false;
    }
  }

  async getReportsTableRows() {
    return this.reportsTable.locator('tbody tr');
  }

  async getNthReportTableRow(n: number) {
    const rows = await this.getReportsTableRows();
    const row = rows.nth(n);
    const statusButton = row.locator(
      '[data-testid^="report-status-"]'
    );
    const client = row.locator(
      '[data-testid^="report-client-"]'
    );
    const date = row.locator(
      '[data-testid^="report-date-"]'
    );
    const description = row.locator(
      '[data-testid^="report-description-"]'
    );

    return {
      row,
      statusButton,
      client,
      date,
      description,
    };
  }

  async checkChangeStatusModalState(options?: {
    wait?: boolean;
    state?: 'visible' | 'hidden';
  }): Promise<boolean> {
    const { wait = true, state = 'visible' } =
      options || {};

    if (wait) {
      try {
        await this.modal.waitFor({ state });
        return true;
      } catch {
        return false;
      }
    }

    return this.modal.isVisible();
  }

  async clickChangeStatusButton(status: ReportStatus) {
    const button = this.modal.locator(
      `[data-testid="change-report-status-dialog-${status.toLowerCase()}"]`
    );
    await button.click();
  }

  async closeChangeStatusModal() {
    const closeButton = this.modal.getByRole('button', {
      name: 'Close',
    });
    await closeButton.click();
  }
}
