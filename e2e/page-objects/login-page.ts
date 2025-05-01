import { Locator, Page } from '@playwright/test';

export class LoginPage {
  private loginInput: Locator;
  private passwordInput: Locator;
  private loginButton: Locator;
  private page: Page;

  constructor(page: Page) {
    this.page = page;
    this.loginInput = page.getByTestId('login-input');
    this.passwordInput = page.getByTestId('password-input');
    this.loginButton = page.getByTestId('login-button');
  }

  async navigate() {
    await this.page.goto('/login');
  }

  async fillLogin(login: string) {
    await this.loginInput.fill(login);
  }

  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async clickLoginButton() {
    await this.loginButton.click();
  }
}
