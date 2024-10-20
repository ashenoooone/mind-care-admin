import { $api } from '@/shared/api';
import { TUser } from '../model/types';

export class AuthService {
  static async login(body: { password: string }) {
    return $api.post<TUser>('/owner/login', body);
  }

  static async checkUser() {
    if (process.env.NODE_ENV === 'development') {
      if (process.env.NEXT_PUBLIC_AUTH === '0') {
        throw new Error('not auth');
      }
      return {
        first_name: 'test_user',
      } as TUser;
    }
    throw new Error('not implemented');
  }
}
