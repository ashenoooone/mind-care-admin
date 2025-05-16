import {
  AppointmentStatus,
  TAppointment,
} from '@/entities/appointments';
import { faker } from '@faker-js/faker/locale/ru';
import { ClientFactory } from './client.factory';
import { ServiceFactory } from './service.factory';

type CreateAppointmentParams = {
  count?: number;
  status?: AppointmentStatus;
};
export class AppointmentsFactory {
  static createCalendarAppointments({
    count = 10,
    status,
  }: CreateAppointmentParams): Record<
    string,
    TAppointment[]
  > {
    return Array.from({ length: count }, () =>
      this.createAppointment({ status })
    ).reduce(
      (ac, app) => {
        const dateWithTime = app.startTime.toString();
        const [dateWithoutTime] = dateWithTime.split('T');
        const key = `${dateWithoutTime}T00:00:00.000Z`;
        if (ac[key]) {
          ac[key].push(app);
        } else {
          ac[key] = [app];
        }
        return ac;
      },
      {} as Record<string, TAppointment[]>
    );
  }

  static createAppointments(count: number): TAppointment[] {
    return Array.from({ length: count }, () =>
      this.createAppointment()
    );
  }

  static createAppointment(
    params: CreateAppointmentParams = { status: undefined }
  ): TAppointment {
    const appointmentStatus =
      params.status ??
      faker.helpers.arrayElement([
        AppointmentStatus.COMPLETED,
        AppointmentStatus.CANCELLED,
        AppointmentStatus.SCHEDULED,
      ]);

    return {
      id: faker.number.int(),
      startTime: faker.date.future().toISOString(),
      endTime: faker.date.future().toISOString(),
      clientId: faker.number.int(),
      client: ClientFactory.createClient(),
      serviceId: faker.number.int(),
      service: ServiceFactory.createService(),
      status: appointmentStatus,
      note: faker.lorem.sentence(),
    };
  }
}
