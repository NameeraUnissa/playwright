import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

/**
 * Test Suite: Login Page (using Page Object Model)
 */

const BASE_URL = 'https://the-internet.herokuapp.com';

test.describe('Login Page - POM Tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto(`${BASE_URL}/login`);
  });

  test('✅ should display all UI elements on login page', async ({ page }) => {
    await expect(page).toHaveTitle(/The Internet/);
    await expect(loginPage.pageHeading).toBeVisible();
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
  });

  test('✅ should successfully login with valid credentials', async ({ page }) => {
    // Act
    await loginPage.login('tomsmith', 'SuperSecretPassword!');

    // Assert
    await expect(page).toHaveURL(/.*secure/);
    const message = await loginPage.getFlashMessage();
    expect(message).toContain('You logged into a secure area!');
  });

  test('❌ should show error for invalid username', async ({ page }) => {
    await loginPage.login('wronguser', 'SuperSecretPassword!');

    await expect(page).toHaveURL(/.*login/);
    const message = await loginPage.getFlashMessage();
    expect(message).toContain('Your username is invalid!');
  });

  test('❌ should show error for invalid password', async ({ page }) => {
    await loginPage.login('tomsmith', 'wrongpassword');

    await expect(page).toHaveURL(/.*login/);
    const message = await loginPage.getFlashMessage();
    expect(message).toContain('Your password is invalid!');
  });

  test('🔒 should mask the password input', async () => {
    await expect(loginPage.passwordInput).toHaveAttribute('type', 'password');
  });

  test('🚫 should not allow login with empty credentials', async ({ page }) => {
    await loginPage.loginButton.click();

    await expect(page).toHaveURL(/.*login/);
  });

  test('🔄 should logout successfully', async ({ page }) => {
    // Login first
    await loginPage.login('tomsmith', 'SuperSecretPassword!');
    await expect(page).toHaveURL(/.*secure/);

    // Logout
    await page.getByRole('link', { name: 'Logout' }).click();

    // Assert back on login
    await expect(page).toHaveURL(/.*login/);
    const message = await loginPage.getFlashMessage();
    expect(message).toContain('You logged out of the secure area!');
  });
});
