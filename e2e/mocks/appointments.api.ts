import { Page } from '@playwright/test';
import { PlaywrightRouter } from '../utils/router';
import { AppointmentsFactory } from './appointments.factory';
import { AppointmentStatus } from '@/entities/appointments/model/types';

type MockAppointmentsParams = {
  count: number;
  status?: AppointmentStatus;
};

export class AppointmentsApi {
  constructor(private page: Page) {}

  async mockAppointmentsApi(
    params: MockAppointmentsParams = {
      count: 50,
      status: undefined,
    }
  ): Promise<void> {
    const { count, status } = params;

    const router = new PlaywrightRouter(
      this.page,
      '**/api/appointments/calendar**'
    );

    router.addRoute('GET', async ({ route }) => {
      const appointments =
        AppointmentsFactory.createCalendarAppointments({
          count,
          status,
        });
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          ...appointments,
        }),
      });
    });

    const postRouter = new PlaywrightRouter(
      this.page,
      '**/api/appointments'
    );

    postRouter.addRoute('POST', async ({ route, req }) => {
      const body = await req.postDataJSON();

      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          appointment: body,
        }),
      });
    });

    await router.build();
    await postRouter.build();
  }
}
