import { TAppointment } from '@/entities/appointments/@x/users';

export type TClient = {
  id: number;
  name: string;
  phoneNumber: string;
  tgNickname: string;
  telegramId: string;
  appointments?: TAppointment[];
};
