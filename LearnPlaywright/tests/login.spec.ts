import { test, expect, Page } from '@playwright/test';

/**
 * Test Suite: Login Page
 * Covers: valid login, invalid credentials, validation, and UI elements
 */

// Test configuration
const BASE_URL = 'https://the-internet.herokuapp.com/login'; // Demo app
const VALID_USERNAME = 'tomsmith';
const VALID_PASSWORD = 'SuperSecretPassword!';
const INVALID_USERNAME = 'invalidUser';
const INVALID_PASSWORD = 'wrongPassword';

// Page Object Model for Login Page
class LoginPage {
  constructor(private page: Page) {}

  // Locators
  get usernameInput() {
    return this.page.getByLabel('Username');
  }

  get passwordInput() {
    return this.page.getByLabel('Password');
  }

  get loginButton() {
    return this.page.getByRole('button', { name: 'Login' });
  }

  get flashMessage() {
    return this.page.locator('#flash');
  }

  get pageHeading() {
    return this.page.getByRole('heading', { name: 'Login Page' });
  }

  // Actions
  async goto() {
    await this.page.goto(BASE_URL);
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async getFlashMessageText(): Promise<string> {
    return (await this.flashMessage.textContent()) ?? '';
  }
}

test.describe('Login Page Tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test.describe('Page UI', () => {
    test('should display login page with all elements', async ({ page }) => {
      // Assert
      await expect(page).toHaveURL(/.*login/);
      await expect(loginPage.pageHeading).toBeVisible();
      await expect(loginPage.usernameInput).toBeVisible();
      await expect(loginPage.passwordInput).toBeVisible();
      await expect(loginPage.loginButton).toBeVisible();
    });

    test('should have empty input fields on load', async () => {
      await expect(loginPage.usernameInput).toHaveValue('');
      await expect(loginPage.passwordInput).toHaveValue('');
    });
  });

  test.describe('Successful Login', () => {
    test('should login with valid credentials and redirect to secure area', async ({ page }) => {
      // Act
      await loginPage.login(VALID_USERNAME, VALID_PASSWORD);

      // Assert
      await expect(page).toHaveURL(/.*secure/);
      const message = await loginPage.getFlashMessageText();
      expect(message).toContain('You logged into a secure area!');
    });
  });

  test.describe('Failed Login Scenarios', () => {
    test('should show error for invalid username', async ({ page }) => {
      // Act
      await loginPage.login(INVALID_USERNAME, VALID_PASSWORD);

      // Assert
      await expect(page).toHaveURL(/.*login/);
      const message = await loginPage.getFlashMessageText();
      expect(message).toContain('Your username is invalid!');
    });

    test('should show error for invalid password', async ({ page }) => {
      // Act
      await loginPage.login(VALID_USERNAME, INVALID_PASSWORD);

      // Assert
      await expect(page).toHaveURL(/.*login/);
      const message = await loginPage.getFlashMessageText();
      expect(message).toContain('Your password is invalid!');
    });

    test('should show error for both invalid credentials', async ({ page }) => {
      // Act
      await loginPage.login(INVALID_USERNAME, INVALID_PASSWORD);

      // Assert
      await expect(page).toHaveURL(/.*login/);
      const message = await loginPage.getFlashMessageText();
      expect(message).toMatch(/invalid/i);
    });
  });

  test.describe('Form Validation', () => {
    test('should not submit with empty username', async ({ page }) => {
      // Act
      await loginPage.passwordInput.fill(VALID_PASSWORD);
      await loginPage.loginButton.click();

      // Assert
      await expect(page).toHaveURL(/.*login/);
    });

    test('should not submit with empty password', async ({ page }) => {
      // Act
      await loginPage.usernameInput.fill(VALID_USERNAME);
      await loginPage.loginButton.click();

      // Assert
      await expect(page).toHaveURL(/.*login/);
    });

    test('should not submit with both fields empty', async ({ page }) => {
      // Act
      await loginPage.loginButton.click();

      // Assert
      await expect(page).toHaveURL(/.*login/);
    });
  });

  test.describe('Security & Edge Cases', () => {
    test('should mask password input', async () => {
      // Assert
      await expect(loginPage.passwordInput).toHaveAttribute('type', 'password');
    });

    test('should handle SQL injection attempt safely', async ({ page }) => {
      // Act
      await loginPage.login("' OR '1'='1", "' OR '1'='1");

      // Assert - should not be logged in
      await expect(page).toHaveURL(/.*login/);
    });

    test('should trim whitespace in credentials (or reject them)', async ({ page }) => {
      // Act
      await loginPage.login(`  ${VALID_USERNAME}  `, `  ${VALID_PASSWORD}  `);

      // Assert - behavior depends on app; here we check it doesn't crash
      const currentUrl = page.url();
      expect(currentUrl).toMatch(/login|secure/);
    });
  });

  test.describe('Logout Flow', () => {
    test('should logout successfully after login', async ({ page }) => {
      // Arrange - login first
      await loginPage.login(VALID_USERNAME, VALID_PASSWORD);
      await expect(page).toHaveURL(/.*secure/);

      // Act - logout
      await page.getByRole('link', { name: 'Logout' }).click();

      // Assert
      await expect(page).toHaveURL(/.*login/);
      const message = await loginPage.getFlashMessageText();
      expect(message).toContain('You logged out of the secure area!');
    });
  });
});
