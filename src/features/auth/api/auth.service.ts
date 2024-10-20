import { $api } from '@/shared/api';
import { TUser } from '../model/types';

export class AuthService {
  static async login(body: { password: string }) {
    return $api.post<TUser>('/owner/login', body);
  }

  static async checkUser() {
    return $api.get<TUser>('/owner/check_token');
  }
}
