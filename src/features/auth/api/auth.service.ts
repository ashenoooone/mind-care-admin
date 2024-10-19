import { TUser } from '../model/types';

export class AuthService {
  static async checkUser(): Promise<TUser> {
    if (process.env.NODE_ENV === 'development') {
      if (process.env.NEXT_PUBLIC_AUTH === '0') {
        throw new Error('not auth');
      }
      return {
        name: 'test_user',
      };
    }
    throw new Error('not implemented');
  }
}
