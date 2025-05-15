import { Page } from '@playwright/test';
import { PlaywrightRouter } from '../utils/router';
import { ServiceFactory } from './service.factory';
import { paginate } from '../utils/paginate';
import { TService } from '@/entities/service';

export class ServicesApi {
  private services: TService[] = [];

  constructor(private page: Page) {}

  async mockServicesApi(
    params: { count: number } = {
      count: 10,
    }
  ) {
    const { count } = params;

    this.services = ServiceFactory.createServices(count);

    const router = new PlaywrightRouter(
      this.page,
      '**/api/services?**'
    );

    // GET /services?limit=...&page=...
    router.addRoute('GET', async ({ req, route }) => {
      const url = new URL(req.url());
      const limit = parseInt(
        url.searchParams.get('limit') || '10'
      );
      const page = parseInt(
        url.searchParams.get('page') || '0'
      );

      const paged = paginate(this.services, page, limit);

      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(paged),
      });
    });

    await router.build();
  }
}
