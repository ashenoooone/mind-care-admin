import { Sidebar } from '@/shared/ui/sidebar';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex gap-2">
      <Sidebar />
      {children}
    </section>
  );
}
