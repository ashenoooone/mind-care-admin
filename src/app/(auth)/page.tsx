import { ROUTES } from '@/shared/config/router-config';
import { redirect } from 'next/navigation';

export default function Home() {
  redirect(ROUTES.appointments);
}
