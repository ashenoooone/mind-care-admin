import { Page } from '@playwright/test';
import { LoginPage } from '../page-objects/login-page';

export class LoginActions {
  private loginPageModel: LoginPage;

  constructor(page: Page) {
    this.loginPageModel = new LoginPage(page);
  }

  /**
   * Выполняет вход в систему
   * @param login  логин
   * @param password  пароль
   */
  async login(login: string, password: string) {
    await this.loginPageModel.navigate();
    await this.loginPageModel.fillLogin(login);
    await this.loginPageModel.fillPassword(password);
    await this.loginPageModel.clickLoginButton();
  }
}
