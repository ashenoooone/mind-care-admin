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

export const EditModal = () => {
  const { $open, $appointment, setOpen } =
    useEditAppointmentModal();

  const onOpenChange = (open: boolean) => {
    setOpen(open);
  };

  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useGetUserExtended($appointment?.client.id);

  const notes = mapNotes(user?.appointments || []);

  return (
    <Dialog open={$open} onOpenChange={onOpenChange}>
      <DialogContent fullscreen className="flex flex-col">
        <DialogHeader>
          <DialogTitle>
            {$appointment?.service.name}
          </DialogTitle>
        </DialogHeader>
        <ModalLayout
          userSection={
            <ClientInfo
              client={user}
              isLoading={isUserLoading}
              isError={isUserError}
            />
          }
          appointmentSection={undefined}
          notesSection={
            <Notes
              notes={notes}
              renderNote={(note) => <Note note={note} />}
            />
          }
        />
      </DialogContent>
    </Dialog>
  );
};
