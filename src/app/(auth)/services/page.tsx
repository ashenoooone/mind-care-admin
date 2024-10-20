import { AuthFacade } from '@/features/auth';
import Page from '@/shared/ui/page';
import { ServicesList } from '@/widgets/services-list';

export default function ServicesPage() {
  return (
    <AuthFacade>
      <Page>
        <ServicesList />
      </Page>
    </AuthFacade>
  );
}
