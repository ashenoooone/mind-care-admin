import { TAppointment } from '@/entities/appointments';
import { useAddAppointmentModal } from '../model/add-modal';
import { useEditAppointmentModal } from '../model/edit-modal';

export const useAppointmentModalOpen = () => {
  const { setOpen } = useAddAppointmentModal();
  const {
    $open: editOpen,
    appointmentId,
    openEditModal,
  } = useEditAppointmentModal();

  return {
    isAppointmentActive: (appointment: TAppointment) =>
      Number(appointmentId) === appointment.id && editOpen,
    openEditModal: (appointment: TAppointment) => {
      openEditModal(appointment.id);
    },
    openAddModal: () => {
      setOpen(true);
    },
  };
};
