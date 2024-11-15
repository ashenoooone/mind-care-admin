import { AuthFacade } from '@/features/auth';
import { Sidebar } from '@/shared/ui/sidebar';

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
