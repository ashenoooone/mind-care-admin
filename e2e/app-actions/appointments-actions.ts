import { Page } from '@playwright/test';
import { AppointmentsPage } from '../page-objects/appointments-page';

export class AppointmentsActions {
  private pom: AppointmentsPage;

  constructor(private page: Page) {
    this.pom = new AppointmentsPage(page);
  }

  /**
   * заходит на страницу и проверят, что создание записи работает
   */
  async createNewAppointment({ date }: { date: string }) {
    await this.pom.openCreateAppointmentModal();
    await this.pom.setClient({ n: 0 });
    await this.pom.setService({ n: 0 });
    await this.pom.setDate({ date });
    await this.pom.submitAppointmentButton.click();
  }

  /**
   * заходит на страницу и проверяет, что кнопки в хедере корректно работают
   */
  async checkShowModes() {
    await this.pom.expectModeIsActive('week');
    await this.pom.setShowMode('month');
    await this.pom.expectModeIsActive('month');
    await this.pom.setShowMode('week');
    await this.pom.expectModeIsActive('week');
    await this.pom.setShowMode('day');
    await this.pom.expectModeIsActive('day');
  }

  /**
   * проверяет, что можно редактирование записей работает
   */
  //   async editRandomAppointment() {}
}
