import { Page } from '@playwright/test';
import { UserFactory } from './user.factory';
import { PlaywrightRouter } from '../utils/router';

export class AuthApiMock {
  constructor(private page: Page) {}

  async mockAuthApi(): Promise<void> {
    const router = new PlaywrightRouter(
      this.page,
      '**/api/owner/**'
    );

    // POST /owner/login
    router.addRoute('POST', async ({ req, route }) => {
      const body = await req.postDataJSON();
      const { login, password } = body;

      if (login === 'root' && password === 'root') {
        const mockUser = UserFactory.createUser({
          password,
        });
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(mockUser),
        });
      } else {
        await route.fulfill({
          status: 401,
          contentType: 'application/json',
          body: JSON.stringify({
            message: 'Неверные данные',
          }),
        });
      }
    });

    // GET /owner/checkToken
    router.addRoute('GET', async ({ req, route }) => {
      const token = req.headers().authorization;

      if (token) {
        const mockUser = UserFactory.createUser();
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(mockUser),
        });
      } else {
        await route.fulfill({
          status: 401,
          contentType: 'application/json',
          body: JSON.stringify({
            message: 'Не авторизован',
          }),
        });
      }
    });

    await router.build();
  }
}
