import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog';
import { useEditAppointmentModal } from '../model/edit-modal';
import { useGetUserExtended } from '@/entities/users';
import { ModalLayout } from '../ui/modal-layout';
import { ClientInfo } from '../ui/client-info';
import { mapNotes } from '../domain';
import { Notes } from '../ui/notes';
import { Note } from '../ui/note';
import { AppointmentInfo } from '../ui/appointment-info';
import { EditNote } from '../ui/edit-note';
import {
  useGetAppointment,
  usePatchAppointment,
} from '@/entities/appointments';
import { AiSection } from '../ui/ai';
import { Skeleton } from '@/shared/ui/skeleton';

export const EditModal = () => {
  const { $open, appointmentId, onOpenChange } =
    useEditAppointmentModal();

  const {
    data: appointment,
    isLoading: isLoadingAppointment,
  } = useGetAppointment(Number(appointmentId));

  const { data: user, isLoading: isLoadingUser } =
    useGetUserExtended(appointment?.client.id);

  const updateAppointment = usePatchAppointment();

  const notes = mapNotes(user?.appointments || []);

  const onSubmitEditNote = (note: string) => {
    updateAppointment.mutate({
      ...appointment!,
      note,
    });
  };

  const open = $open || appointmentId !== undefined;

  // TODO: обработка состония загрузки и ошибки
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        fullscreen
        className="flex overflow-y-auto flex-col"
      >
        <DialogHeader>
          <DialogTitle>
            {isLoadingAppointment ? (
              <Skeleton className="h-6 w-full" />
            ) : (
              appointment?.service.name
            )}
          </DialogTitle>
        </DialogHeader>
        <ModalLayout
          userSection={
            <ClientInfo
              client={user}
              isLoading={isLoadingUser}
            />
          }
          appointmentSection={
            <AppointmentInfo appointment={appointment} />
          }
          notesSection={
            <Notes
              isLoading={isLoadingAppointment}
              notes={notes}
              renderNote={(note) => <Note note={note} />}
            />
          }
          noteSection={
            <EditNote
              isLoading={updateAppointment.isPending}
              onSubmit={onSubmitEditNote}
              initialNote={appointment?.note}
            />
          }
          aiSection={<AiSection />}
        />
      </DialogContent>
    </Dialog>
  );
};
