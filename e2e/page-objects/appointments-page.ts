import { Locator, Page } from '@playwright/test';

export class AppointmentsPage {
  public createAppointmentButton: Locator;
  public dayToggleGroupItem: Locator;
  public weekToggleGroupItem: Locator;
  public monthToggleGroupItem: Locator;
  public submitAppointmentButton: Locator;
  public editAppointmentModal: Locator;
  public createAppointmentModal: Locator;
  public weekModeTimeGrid: Locator;
  public dayModeTimeGrid: Locator;
  public monthModeTimeGrid: Locator;

  constructor(private page: Page) {
    this.createAppointmentButton = this.page.getByTestId(
      'create-appointment-button'
    );
    this.dayToggleGroupItem = this.page.getByTestId(
      'day-toggle-group-item'
    );
    this.weekToggleGroupItem = this.page.getByTestId(
      'week-toggle-group-item'
    );
    this.monthToggleGroupItem = this.page.getByTestId(
      'month-toggle-group-item'
    );
    this.submitAppointmentButton = this.page.getByTestId(
      'submit-appointment-button'
    );
    this.editAppointmentModal = this.page.getByTestId(
      'edit-appointment-modal'
    );
    this.createAppointmentModal = this.page.getByTestId(
      'create-appointment-modal'
    );
    this.weekModeTimeGrid = this.page.getByTestId(
      'week-mode-time-grid'
    );
    this.dayModeTimeGrid = this.page.getByTestId(
      'day-mode-time-grid'
    );
    this.monthModeTimeGrid = this.page.getByTestId(
      'month-mode-time-grid'
    );
  }

  async isCurrent(): Promise<boolean> {
    await this.page.waitForURL('/appointments');
    return this.page.url().includes('/appointments');
  }

  async navigate() {
    await this.page.goto('/appointments');
  }

  async setShowMode(mode: 'day' | 'week' | 'month') {
    const modeMap = {
      day: this.dayToggleGroupItem,
      week: this.weekToggleGroupItem,
      month: this.monthToggleGroupItem,
    };

    await modeMap[mode].click();
  }

  async expectModeIsActive(mode: 'day' | 'week' | 'month') {
    const modeMap = {
      day: this.dayModeTimeGrid,
      week: this.weekModeTimeGrid,
      month: this.monthModeTimeGrid,
    };

    await modeMap[mode].waitFor({
      state: 'visible',
      timeout: 10000,
    });
  }
}
