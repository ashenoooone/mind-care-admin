import Page from '@/shared/ui/page';
import { AppointmentsList } from '@/widgets/appointments-list';

export default function AppointmentPage() {
  return (
    <Page className="w-full">
      <AppointmentsList />
    </Page>
  );
}
