import {
  SettingsForm,
  TSettings,
} from '@/entities/settings';
import { useMutation } from '@tanstack/react-query';
import { UPDATE_SETTINGS_QUERY } from '../model/hooks';

export type UpdateSettingsFormProps = {
  settings: TSettings;
};

export const UpdateSettingsForm = (
  props: UpdateSettingsFormProps
) => {
  const { settings } = props;

  const updateSettings = useMutation(UPDATE_SETTINGS_QUERY);

  const onSubmit = (s: TSettings) => {
    updateSettings.mutate({
      settings: s,
    });
  };

  return (
    <SettingsForm
      settings={settings}
      formStatus={updateSettings.status}
      onSubmit={onSubmit}
    />
  );
};
