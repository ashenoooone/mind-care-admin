import { Page, Route } from '@playwright/test';
import { UserFactory } from './user.factory';

export class AuthApiMock {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async mockAuthApi(): Promise<void> {
    await this.mockLogin();
    await this.mockCheckUser();
  }

  async mockLogin(): Promise<void> {
    await this.page.route(
      '**/owner/login',
      async (route: Route) => {
        const request = route.request();
        const postData = await request.postData();
        const { login, password } = JSON.parse(
          postData || '{}'
        );

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
            status: 409,
            contentType: 'application/json',
            body: JSON.stringify({
              message: 'Неверные данные',
            }),
          });
        }
      }
    );
  }

  async mockCheckUser(): Promise<void> {
    await this.page.route(
      '**/owner/checkToken',
      async (route: Route) => {
        const request = route.request();
        const token = request.headers().authorization;

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
      }
    );
  }
}
