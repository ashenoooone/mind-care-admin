import { SettingsService } from '@/entities/settings';
import { mutationOptions } from '@/shared/lib/mutation-options';

export const UPDATE_SETTINGS_QUERY = mutationOptions<
  typeof SettingsService.putSettings
>({
  mutationKey: ['UPDATE-SETTINGS-QUERY'],
  mutationFn: (params) =>
    SettingsService.putSettings(params),
});
