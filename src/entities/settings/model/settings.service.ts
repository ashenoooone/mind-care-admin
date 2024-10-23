import { TService } from '@/entities/service';
import { $api } from '@/shared/api';

export class SettingsService {
  static getSettings() {
    return $api.get<TService[]>('/options');
  }
}
