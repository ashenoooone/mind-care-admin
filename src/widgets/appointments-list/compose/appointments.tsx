'use client';

import { useAppointmentsContent } from '../model/use-appointments-content';
import { AppointmentsLayout } from '../ui/appointments-layout';

export const Appointments = () => {
  const { buttons, content } = useAppointmentsContent();

  return (
    <AppointmentsLayout
      header={buttons}
      content={content}
    />
  );
};
