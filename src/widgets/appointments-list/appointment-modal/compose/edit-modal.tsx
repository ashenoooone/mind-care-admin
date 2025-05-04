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
import { useGetAiHints } from '../model/use-get-ai-hints';
import { toast } from '@/shared/hooks/use-toast';

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

  const {
    mutateAsync: getAiHints,
    data: hints,
    isPending: isLoadingHints,
  } = useGetAiHints();

  const open = $open || appointmentId !== undefined;

  const onGenerateHintsClick = async () => {
    try {
      if (!user?.id) {
        return;
      }
      await getAiHints({ userId: user.id });
    } catch (error) {
      toast({
        title: 'Ошибка при генерации совет',
        description: 'Попробуйте позже',
      });
    }
  };

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
              isLoading={
                updateAppointment.isPending ||
                isLoadingAppointment
              }
              onSubmit={onSubmitEditNote}
              initialNote={appointment?.note}
            />
          }
          aiSection={
            <AiSection
              onGenerateHintsClick={onGenerateHintsClick}
              hints={hints?.data}
              isLoading={isLoadingHints}
            />
          }
        />
      </DialogContent>
    </Dialog>
  );
};
