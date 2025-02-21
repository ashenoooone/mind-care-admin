import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog';
import { useEditAppointmentModal } from '../model/edit-modal';

export const EditModal = () => {
  const { $open, $appointment, setOpen } =
    useEditAppointmentModal();

  const onOpenChange = (open: boolean) => {
    setOpen(open);
  };

  return (
    <Dialog open={$open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {$appointment?.service.name}
          </DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
