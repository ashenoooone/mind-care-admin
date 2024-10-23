import { TService } from '@/entities/service';
import { Button } from '@/shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog';
import { useState } from 'react';
import { useDeleteServiceMutation } from '../model/hooks';

type DeleteServiceModalProps = {
  serviceId: TService['id'];
};

export const DeleteServiceModal = (
  props: DeleteServiceModalProps
) => {
  const { serviceId } = props;
  const deleteServiceMutation = useDeleteServiceMutation();
  const [isOpen, setIsOpen] = useState(false);

  const onDeleteClick = () => {
    deleteServiceMutation.mutate({
      id: serviceId,
    });
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => setIsOpen(open)}
    >
      <DialogTrigger>
        <Button>Удалить</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Вы уверены?</DialogTitle>
          <DialogDescription>
            Это действие необратимо
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            onClick={onDeleteClick}
            variant={'destructive'}
          >
            Удалить
          </Button>
          <Button variant={'outline'}>Отменить</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
