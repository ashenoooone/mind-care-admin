import Page from '@/shared/ui/page';
import { Appointments } from '@/widgets/appointments-list';

export default function AppointmentPage() {
  return (
    <Page className="w-full">
      <Appointments />
    </Page>
  );
}
