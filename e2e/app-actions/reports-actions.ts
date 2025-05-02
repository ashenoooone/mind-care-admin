import { expect, Page } from '@playwright/test';
import { ReportsPage } from '../page-objects/reports-page';
import { ReportStatus } from '@/entities/reports';

const STATUS_LIST: ReportStatus[] = [
  'PENDING',
  'IN_PROGRESS',
  'RESOLVED',
  'CLOSED',
];

const getRandomStatus = (
  excludeStatus: ReportStatus
): ReportStatus => {
  const filtered = STATUS_LIST.filter(
    (s) => s !== excludeStatus
  );
  return filtered[
    Math.floor(Math.random() * filtered.length)
  ];
};

export class ReportsActions {
  private reportsPageModel: ReportsPage;

  constructor(private readonly page: Page) {
    this.reportsPageModel = new ReportsPage(page);
  }

  async openReportsPageAndChangeFirstReportStatus() {
    await this.reportsPageModel.navigate();
    const { statusButton: statusButtonBefore } =
      await this.reportsPageModel.getNthReportTableRow(0);
    const currentStatusText =
      await statusButtonBefore.textContent();
    const currentStatus = this.mapStatusTextToCode(
      currentStatusText?.trim()
    );
    await statusButtonBefore.click();
    await this.reportsPageModel.checkChangeStatusModalState(
      {
        wait: true,
        state: 'visible',
      }
    );
    const newStatus = getRandomStatus(currentStatus);
    await this.reportsPageModel.clickChangeStatusButton(
      newStatus
    );
    await this.reportsPageModel.closeChangeStatusModal();
    await this.reportsPageModel.checkChangeStatusModalState(
      {
        wait: true,
        state: 'hidden',
      }
    );
    const { statusButton: statusButtonAfter } =
      await this.reportsPageModel.getNthReportTableRow(0);
    const statusText =
      await statusButtonAfter.textContent();
    expect(
      this.mapStatusTextToCode(statusText ?? '')
    ).toContain(newStatus);
  }

  private mapStatusTextToCode(text?: string): ReportStatus {
    const mapper: Record<string, ReportStatus> = {
      'На рассмотрении': 'PENDING',
      'В работе': 'IN_PROGRESS',
      Решено: 'RESOLVED',
      Закрыто: 'CLOSED',
    };

    if (!text || !mapper[text]) {
      throw new Error(
        `Не удалось сопоставить статус: "${text}"`
      );
    }

    return mapper[text];
  }
}
