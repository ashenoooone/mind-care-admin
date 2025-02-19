import Page from '@/shared/ui/page';
import { AppointmentsTable } from '@/widgets/appointments-list';

export default function AppointmentPage() {
  return (
    <Page className="w-full relative">
      <AppointmentsTable />
    </Page>
  );
}
