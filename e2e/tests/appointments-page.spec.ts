import { mergeTests } from '@playwright/test';
import {
  mockApiFixture,
  pageActionsFixture,
} from '../fixtures';
import { AppointmentStatus } from '@/entities/appointments/model/types';

const test = mergeTests(pageActionsFixture, mockApiFixture);

test.beforeEach(
  async ({
    mockAuthApi,
    mockAppointmentsApi,
    loginActions,
    mockServicesApi,
  }) => {
    await mockAuthApi();
    await loginActions.login('root', 'root');
    await mockServicesApi.mockServicesApi({ count: 10 });
    await mockAppointmentsApi.mockAppointmentsApi({
      count: 10,
    });
  }
);

test.describe('Appointments Page', () => {
  test('должен корректно отображать нужные таблицы под нужные режимы отображения', async ({
    appointmentsActions,
  }) => {
    await appointmentsActions.checkShowModes();
  });
  test('должен корректно создавать запись', async ({
    appointmentsActions,
    page,
  }) => {
    await page.clock.setSystemTime(new Date('2024-05-15'));
    await appointmentsActions.createNewAppointment({
      date: '2024-05-17T14:30',
    });
  });

  test('должен корректно открывать модалку редактирования записи', async ({
    mockAppointmentsApi,
    appointmentsActions,
  }) => {
    await mockAppointmentsApi.mockAppointmentsApi({
      count: 10,
      status: AppointmentStatus.SCHEDULED,
    });
    await appointmentsActions.editRandomAppointmentNote();
  });

  test('должен корректно менять статус записи на "отменен"', async ({
    appointmentsActions,
  }) => {
    await appointmentsActions.changeAppointmentStatusToCanceled();
    await new Promise((resolve) =>
      setTimeout(resolve, 5000)
    );
  });

  test('должен корректно менять статус записи на "завершено"', async ({
    appointmentsActions,
  }) => {
    await appointmentsActions.changeAppointmentStatusToCompleted();
    await new Promise((resolve) =>
      setTimeout(resolve, 4500)
    );
  });

  test('должен корректно отображать AI советы', async ({
    appointmentsActions,
  }) => {
    await appointmentsActions.checkAiAdvice();
    await new Promise((resolve) =>
      setTimeout(resolve, 6000)
    );
  });
});
