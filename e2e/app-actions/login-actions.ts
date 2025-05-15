import { Page } from '@playwright/test';
import { LoginPage } from '../page-objects/login-page';

export class LoginActions {
  private pom: LoginPage;

  constructor(page: Page) {
    this.pom = new LoginPage(page);
  }

  /**
   * Выполняет вход в систему
   * @param login  логин
   * @param password  пароль
   */
  async login(login: string, password: string) {
    await this.pom.navigate();
    await this.pom.fillLogin(login);
    await this.pom.fillPassword(password);
    await this.pom.clickLoginButton();
  }
}
