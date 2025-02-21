import { TAppointment } from '@/entities/appointments';
import { useAddAppointmentModal } from '../model/add-modal';
import { useEditAppointmentModal } from '../model/edit-modal';

export const useAppointmentModalOpen = () => {
  const { setOpen } = useAddAppointmentModal();
  const {
    setOpen: setEditOpen,
    setAppointment,
    $appointment,
    $open: editOpen,
  } = useEditAppointmentModal();

  return {
    isAppointmentActive: (appointment: TAppointment) =>
      $appointment?.id === appointment.id && editOpen,
    openEditModal: (appointment: TAppointment) => {
      setEditOpen(true);
      setAppointment(appointment);
    },
    openAddModal: () => {
      setOpen(true);
    },
  };
};
