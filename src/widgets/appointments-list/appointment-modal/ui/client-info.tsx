import { TAppointment } from '@/entities/appointments';
import { TClient } from '@/entities/users';
import { Link } from '@/shared/ui/link';
import { ListItem, List } from '@/shared/ui/list';
import { Skeleton } from '@/shared/ui/skeleton';
import { MessageCircle, Phone, User } from 'lucide-react';
import { Error } from '@/shared/ui/error';

type Props = {
  className?: string;
  client?: TClient & { appointments: TAppointment[] };
  isLoading: boolean;
  isError: boolean;
};

export const ClientInfo = (props: Props) => {
  const { isLoading, className, client, isError } = props;

  if (isLoading) {
    return <Skeleton className="w-full h-full" />;
  }

  if (isError) {
    return (
      <Error
        title="Ошибка при загрузке информации о клиенте"
        description="Попробуйте обновить страницу"
      />
    );
  }

  return (
    <div className={className}>
      <List title={'Информация о клиенте'}>
        <ListItem>
          <User className="w-4 h-4" />
          {client?.name}
        </ListItem>
        <ListItem>
          <Link
            className="flex items-center gap-2"
            href={`tel:${client?.phoneNumber}`}
          >
            <Phone className="w-4 h-4" />
            {client?.phoneNumber}
          </Link>
        </ListItem>
        <ListItem>
          <Link
            className="flex items-center gap-2"
            href={`https://t.me/${client?.tgNickname}`}
          >
            <MessageCircle className="w-4 h-4" />
            {client?.tgNickname}
          </Link>
        </ListItem>
      </List>
    </div>
  );
};
