import { Button } from '@/shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog';
import { EditServiceForm } from './edit-service-form';
import { useState } from 'react';
import { TService } from '@/entities/service';

interface EditServiceModalProps {
  service: TService;
}

export const EditServiceModal = ({
  service,
}: EditServiceModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Dialog
      open={isModalOpen}
      onOpenChange={(open) => setIsModalOpen(open)}
    >
      <DialogTrigger>
        <Button variant="outline">Редактировать</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Редактирование услуги</DialogTitle>
          <DialogDescription>
            После отправки формы изменения будут применены к
            услуге
          </DialogDescription>
        </DialogHeader>
        <EditServiceForm
          service={service}
          onSuccess={() => setIsModalOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
};
