import { useAddAppointmentModal } from '../model/add-modal';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog';
import {
  AppointmentForm,
  CreateAppointmentForm,
} from '@/entities/appointments/ui/form';
import { useAdminCreateAppointment } from '@/entities/appointments/model/hooks';
import { toast } from '@/shared/hooks/use-toast';

export const AddModal = () => {
  const { $open, setOpen } = useAddAppointmentModal();
  const createAppointment = useAdminCreateAppointment();

  const onSubmit = async (data: CreateAppointmentForm) => {
    try {
      await createAppointment.mutateAsync(data);
      setOpen(false);
      toast({
        title: 'Запись создана',
        description:
          'Запись успешно добавлена в расписание',
      });
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось создать запись',
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog open={$open} onOpenChange={setOpen}>
      <DialogContent data-testid="create-appointment-modal">
        <DialogHeader>
          <DialogTitle>Создание записи</DialogTitle>
        </DialogHeader>
        <AppointmentForm
          onSubmit={onSubmit}
          submitButtonText="Создать"
        />
      </DialogContent>
    </Dialog>
  );
};
