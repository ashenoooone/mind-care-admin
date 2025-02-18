import { Calendar, List } from 'lucide-react';
import { useState } from 'react';
import { AppointmentsTable } from '../compose/appointments-table';
import { AppointmentsList } from '../compose/appointments-list';
import {
  ToggleGroup,
  ToggleGroupItem,
} from '@/shared/ui/toggle-group';

export const useAppointmentsContent = () => {
  const [showMode, setShowMode] = useState<
    'calendar' | 'list'
  >('calendar');

  return {
    buttons: (
      <ToggleGroup
        type="single"
        value={showMode}
        onValueChange={(value) =>
          setShowMode(value as 'calendar' | 'list')
        }
      >
        <ToggleGroupItem
          value="calendar"
          aria-label="Календарь"
        >
          <Calendar />
        </ToggleGroupItem>
        <ToggleGroupItem value="list" aria-label="Список">
          <List />
        </ToggleGroupItem>
      </ToggleGroup>
    ),
    content:
      showMode === 'calendar' ? (
        <AppointmentsTable />
      ) : (
        <AppointmentsList />
      ),
  };
};
