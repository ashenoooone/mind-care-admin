/* eslint-disable @typescript-eslint/naming-convention */
import { $api } from '@/shared/api';
import { TSettings } from './types';

export class SettingsService {
  static getSettings() {
    return $api.get<TSettings[]>('/options');
  }

  static putSettings(params: { settings: TSettings }) {
    const {
      settings: {
        id,
        begin_time,
        end_time,
        timezone_admin,
        timezone_server,
      },
    } = params;

    return $api.put<TSettings>(`/options/${id}`, {
      end_time,
      begin_time,
      timezone_admin,
      timezone_server,
    });
  }
}
