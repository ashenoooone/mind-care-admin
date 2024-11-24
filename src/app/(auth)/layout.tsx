import { AuthFacade } from '@/features/auth';
import dynamic from 'next/dynamic';

// TODO fix
const Sidebar = dynamic(
  () =>
    import('@/shared/ui/sidebar').then(
      (mod) => mod.Sidebar
    ),
  {
    ssr: false,
  }
);

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthFacade>
      <section className="flex gap-2">
        <Sidebar />
        {children}
      </section>
    </AuthFacade>
  );
}
