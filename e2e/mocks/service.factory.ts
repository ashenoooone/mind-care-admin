import { TService } from '@/entities/service';
import { faker } from '@faker-js/faker/locale/ru';

export class ServiceFactory {
  static createServices(count: number): TService[] {
    return Array.from({ length: count }, () =>
      this.createService()
    );
  }

  static createService(): TService {
    return {
      id: faker.number.int(),
      name: faker.person.jobTitle(),
      price: faker.number.int(),
      duration: faker.number.int(),
      description: faker.lorem.sentence(),
    };
  }
}
