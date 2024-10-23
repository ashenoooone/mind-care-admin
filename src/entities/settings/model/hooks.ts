import { queryOptions } from '@tanstack/react-query';
import { SettingsService } from './settings.service';

export const SETTINGS_BASE_QUERY_KEY = 'settings';

export const GET_SETTINGS_QUERY_OPTIONS = queryOptions({
  queryKey: [SETTINGS_BASE_QUERY_KEY],
  queryFn: () => SettingsService.getSettings(),
});
