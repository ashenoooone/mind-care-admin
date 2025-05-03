import { TService } from '@/entities/service';
import { faker } from '@faker-js/faker/locale/ru';

export class ServiceFactory {
  static createService(): TService {
    return {
      id: faker.number.int(),
      name: faker.lorem.word(),
      price: faker.number.int(),
      duration: faker.number.int(),
      description: faker.lorem.sentence(),
    };
  }
}
