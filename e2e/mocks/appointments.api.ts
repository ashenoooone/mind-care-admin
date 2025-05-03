import { Page } from '@playwright/test';
import { PlaywrightRouter } from '../utils/router';
import { AppointmentsFactory } from './appointments.factory';

export class AppointmentsApi {
  constructor(private page: Page) {}

  async mockAppointmentsApi(): Promise<void> {
    const router = new PlaywrightRouter(
      this.page,
      '**/api/appointments/**'
    );

    router.addRoute('GET', async ({ route }) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          appointments:
            AppointmentsFactory.createAppointments(50),
        }),
      });
    });

    await router.build();
  }
}
