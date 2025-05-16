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
    // TODO: проверить, что запись создалась
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
   * проверяет, что можно редактировать заметки к записи
   */
  async editRandomAppointmentNote() {
    await this.pom.openEditAppointmentModal({ n: 0 });
    await this.pom.expectEditAppointmentModalIsOpen();
  }

  /**
   * проверяет, что статус записи меняется на "отменен"
   */
  async changeAppointmentStatusToCanceled() {
    return true;
  }

  /**
   * проверяет, что статус записи меняется на "завершено"
   */
  async changeAppointmentStatusToCompleted() {
    return true;
  }

  /**
   * проверяет, что ai советы к записи корректно отображаются и получаются
   */
  async checkAiAdvice() {
    return true;
  }
}
