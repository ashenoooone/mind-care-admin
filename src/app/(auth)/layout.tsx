import { AuthFacade } from '@/features/auth';
import { Skeleton } from '@/shared/ui/skeleton';
import dynamic from 'next/dynamic';

// TODO fix
const Sidebar = dynamic(
  () =>
    import('@/shared/ui/sidebar').then(
      (mod) => mod.Sidebar
    ),
  {
    ssr: false,
    loading: () => <Skeleton className="w-10 h-screen" />,
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
