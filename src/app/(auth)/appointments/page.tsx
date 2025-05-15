import Page from '@/shared/ui/page';
import { AppointmentsTable } from '@/widgets/appointments-list';
import { Suspense } from 'react';

export default function AppointmentPage() {
  return (
    <Page className="w-full relative">
      <Suspense>
        <AppointmentsTable />
      </Suspense>
    </Page>
  );
}
