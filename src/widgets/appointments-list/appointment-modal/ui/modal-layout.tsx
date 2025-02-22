import { cn } from '@/shared/lib/utils';

type Props = {
  className?: string;
  userSection?: React.ReactNode;
  appointmentSection?: React.ReactNode;
  notesSection?: React.ReactNode;
  noteSection?: React.ReactNode;
  aiSection?: React.ReactNode;
};

export const ModalLayout = (props: Props) => {
  const {
    className,
    userSection,
    appointmentSection,
    notesSection,
    noteSection,
    aiSection,
  } = props;
  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <div className="grid grid-cols-3 gap-4">
        {userSection}
        {appointmentSection}
        {aiSection}
      </div>
      <div className="flex flex-col gap-4">
        {notesSection}
        {noteSection}
      </div>
    </div>
  );
};
