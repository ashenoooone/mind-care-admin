import { TUser } from '@/features/auth/model/types';
import { faker } from '@faker-js/faker';

interface CreateUserParams {
  password?: string;
}

export class UserFactory {
  static createUser(params: CreateUserParams = {}): TUser {
    const { password = faker.internet.password() } = params;

    return {
      id: faker.number.int(),
      last_name: faker.person.lastName(),
      first_name: faker.person.firstName(),
      middle_name: faker.person.middleName(),
      phone: faker.phone.number(),
      password: password,
      token: faker.string.uuid(),
    };
  }
}
