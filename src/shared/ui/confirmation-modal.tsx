import { Button, ButtonProps } from './button';
import {
  DialogHeader,
  DialogFooter,
  DialogTrigger,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from './dialog';
import { ReactNode } from 'react';

export type ConfirmationModalProps = {
  isOpen?: boolean;
  onOpenChange: (open: boolean) => void;
  confirmButtonProps: ButtonProps;
  cancelButtonProps: ButtonProps;
  title?: ReactNode;
  description?: ReactNode;
  trigger?: ReactNode;
};

export const ConfirmationModal = (
  props: ConfirmationModalProps
) => {
  const {
    isOpen,
    onOpenChange,
    confirmButtonProps,
    cancelButtonProps,
    title = 'Вы уверены?',
    description = 'Это действие необратимо',
    trigger,
  } = props;

  const handleCloseClick = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    onOpenChange(false);
    cancelButtonProps.onClick?.(e);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button {...confirmButtonProps} />
          <Button
            {...cancelButtonProps}
            onClick={handleCloseClick}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
