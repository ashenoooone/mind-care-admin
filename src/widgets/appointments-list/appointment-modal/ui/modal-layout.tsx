import { Separator } from '@/shared/ui/separator';
import { cn } from '@/shared/lib/utils';

type Props = {
  className?: string;
  userSection?: React.ReactNode;
  appointmentSection?: React.ReactNode;
  notesSection?: React.ReactNode;
  noteSection?: React.ReactNode;
};

export const ModalLayout = (props: Props) => {
  const {
    className,
    userSection,
    appointmentSection,
    notesSection,
    noteSection,
  } = props;
  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <div className="flex gap-4">
        {userSection}
        <Separator
          orientation="vertical"
          className="mx-4"
        />
        {appointmentSection}
      </div>
      <div className="flex flex-col gap-4">
        {notesSection}
        {noteSection}
      </div>
    </div>
  );
};
