import { Page, Locator } from '@playwright/test';

/**
 * Page Object Model for the Login Page
 * Encapsulates locators and actions for reusability across tests
 */
export class LoginPage {
  // Properties
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly flashMessage: Locator;
  readonly pageHeading: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByLabel('Username');
    this.passwordInput = page.getByLabel('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.submitButton = page.locator('button[type="submit"]');
    this.flashMessage = page.locator('#flash');
    this.pageHeading = page.getByRole('heading', { name: 'Login Page' });
  }

  /**
   * Navigate to the login page
   */
  async goto(url: string = '/login') {
    await this.page.goto(url);
  }

  /**
   * Perform login action with provided credentials
   */
  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  /**
   * Get the flash message text content
   */
  async getFlashMessage(): Promise<string> {
    return (await this.flashMessage.textContent()) ?? '';
  }

  /**
   * Check if currently on login page
   */
  async isOnLoginPage(): Promise<boolean> {
    return this.page.url().includes('/login');
  }

  /**
   * Clear input fields
   */
  async clearFields() {
    await this.usernameInput.clear();
    await this.passwordInput.clear();
  }
}
