# Playwright Login Test Suite 🧪

A comprehensive Playwright test suite for testing login page functionality, built with TypeScript and the Page Object Model (POM) design pattern.

## 📁 Project Structure

```
Playwright-/
├── tests/
│   ├── login.spec.ts          # Full test suite (POM + standalone)
│   └── login.simple.spec.ts   # Simplified tests using POM
├── pages/
│   └── LoginPage.ts           # Page Object Model for login
├── playwright.config.ts       # Playwright configuration
├── package.json
└── README.md
```

## ✨ Features

- ✅ **Page Object Model (POM)** design pattern
- 🎯 **Multiple test scenarios**: valid login, invalid credentials, edge cases
- 🔒 **Security tests**: SQL injection, password masking
- 🌐 **Cross-browser testing**: Chrome, Firefox, Safari
- 📊 **Multiple reporters**: HTML, list, JSON
- 📸 **Auto screenshots** on failure
- 🎥 **Video recording** on failure
- 🔍 **Trace viewer** for debugging

## 🧪 Test Cases Covered

| # | Test | Description |
|---|------|-------------|
| 1 | Page UI | All elements visible on load |
| 2 | Empty fields | Inputs are empty by default |
| 3 | Valid login | Login with correct credentials |
| 4 | Invalid username | Error message for wrong username |
| 5 | Invalid password | Error message for wrong password |
| 6 | Empty username | Cannot submit without username |
| 7 | Empty password | Cannot submit without password |
| 8 | SQL injection | App handles malicious input safely |
| 9 | Password masking | Password field is type=password |
| 10 | Logout flow | Successful logout after login |

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Install Playwright Browsers

```bash
npx playwright install
```

### 3. Run Tests

```bash
# Run all tests
npx playwright test

# Run specific test file
npx playwright test tests/login.simple.spec.ts

# Run with UI mode (interactive)
npx playwright test --ui

# Run in headed mode (see browser)
npx playwright test --headed

# Run specific browser
npx playwright test --project=chromium

# Debug a specific test
npx playwright test --debug
```

### 4. View Reports

```bash
# Open HTML report
npx playwright show-report

# View trace
npx playwright show-trace trace.zip
```

## 🔧 Configuration

Edit `playwright.config.ts` to customize:
- Base URL
- Browser projects
- Timeouts
- Reporters
- Web server (for local apps)

## 🌐 Test Application

The tests use a public demo app: **The Internet** by Heroku
- URL: `https://the-internet.herokuapp.com/login`
- Valid credentials:
  - Username: `tomsmith`
  - Password: `SuperSecretPassword!`

## 🔄 Adapting for Your App

To use this with your own application:

1. Update `BASE_URL` in test files
2. Update locators in `pages/LoginPage.ts` to match your app's HTML
3. Update valid credentials
4. (Optional) Uncomment the `webServer` section in `playwright.config.ts`

Example for a custom app:

```typescript
// LoginPage.ts
this.usernameInput = page.locator('#email');      // Your selector
this.passwordInput = page.locator('#password');   // Your selector
this.loginButton = page.getByRole('button', { name: 'Sign In' });
```

## 📚 Key Concepts

### Page Object Model (POM)
Encapsulates page-specific locators and actions in a class, making tests:
- **Maintainable**: Update one file when UI changes
- **Reusable**: Same class across multiple tests
- **Readable**: Tests focus on *what*, not *how*

### Test Isolation
- Each test gets a fresh browser context
- No state leaks between tests
- `beforeEach` ensures clean setup

## 📝 License

MIT
