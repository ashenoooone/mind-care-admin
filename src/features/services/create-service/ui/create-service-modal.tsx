import { Button } from '@/shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog';
import { CreateServiceForm } from './create-service-form';
import { useState } from 'react';

export const CreateServiceModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Dialog
      open={isModalOpen}
      onOpenChange={(open) => setIsModalOpen(open)}
    >
      <DialogTrigger>
        <Button>Создать новую услугу</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Создание новой услуги</DialogTitle>
          <DialogDescription>
            После отправки формы будет создана новая услуга
            у всех клиентов
          </DialogDescription>
        </DialogHeader>
        <CreateServiceForm
          onSuccess={() => setIsModalOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
};
