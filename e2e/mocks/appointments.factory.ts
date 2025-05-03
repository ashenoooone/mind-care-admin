import {
  AppointmentStatus,
  TAppointment,
} from '@/entities/appointments';
import { faker } from '@faker-js/faker/locale/ru';
import { ClientFactory } from './client.factory';
import { ServiceFactory } from './service.factory';

export class AppointmentsFactory {
  static createAppointments(count: number): TAppointment[] {
    return Array.from({ length: count }, () =>
      this.createAppointment()
    );
  }

  static createAppointment(): TAppointment {
    return {
      id: faker.number.int(),
      startTime: faker.date.future().toISOString(),
      endTime: faker.date.future().toISOString(),
      clientId: faker.number.int(),
      client: ClientFactory.createClient(),
      serviceId: faker.number.int(),
      service: ServiceFactory.createService(),
      status: faker.helpers.arrayElement([
        AppointmentStatus.COMPLETED,
        AppointmentStatus.CANCELLED,
        AppointmentStatus.SCHEDULED,
      ]),
    };
  }
}
