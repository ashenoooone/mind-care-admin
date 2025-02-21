import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog';
import { useAppointmentModal } from './model';

export const AppointmentModal = () => {
  const { $appointment, $open, setOpen } =
    useAppointmentModal();

  const onOpenChange = (open: boolean) => {
    setOpen({
      open: false,
      appointment: open ? $appointment : null,
    });
  };

  return (
    <Dialog open={$open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
