import { TClient } from '@/entities/users';
import { faker } from '@faker-js/faker';

export class ClientFactory {
  static createClient(): TClient {
    return {
      id: faker.number.int(),
      name: faker.person.fullName(),
      phoneNumber: faker.phone.number(),
      tgNickname: faker.internet.username(),
      telegramId: faker.string.uuid(),
    };
  }
}
