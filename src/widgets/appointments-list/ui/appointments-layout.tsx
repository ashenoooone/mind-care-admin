import { cn } from '@/shared/lib/utils';

type Props = {
  className?: string;
  content: React.ReactNode;
  header: React.ReactNode;
};

export const AppointmentsLayout = (props: Props) => {
  const { className, content, header } = props;
  return (
    <div className={cn('w-full', className)}>
      <header>{header}</header>
      {content}
    </div>
  );
};
