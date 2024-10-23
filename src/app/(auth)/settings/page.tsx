import { TSettings } from '@/entities/settings';
import { SettingsForm } from '@/entities/settings/ui/settings-form';
import Page from '@/shared/ui/page';

const settings: TSettings = {
  begin_time: '08:00',
  end_time: '19:00',
  id: 1,
  timezone_admin: 1,
  timezone_server: 1,
};

export default function SettingsPage() {
  return (
    <Page>
      <SettingsForm settings={settings} />
    </Page>
  );
}
