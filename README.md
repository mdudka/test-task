# Test Documentation

## Project Overview

This test suite covers the core functionality of the Alynea application, focusing on authentication and project management workflows using the Page Object Model pattern with Playwright.

## Test Framework

- **Framework**: Playwright with TypeScript
- **Pattern**: Page Object Model (POM)
- **Test Runner**: Playwright Test
- **Language**: TypeScript

## Test Cases

### Authentication Tests (`sign-in.test.ts`)

#### 1. Should sign in with valid credentials

**Description**: Verifies that a user can successfully log in with valid email and password.

**Steps**:

1. Open landing page
2. Click "Log In" button
3. Enter valid email: `bacos38210@aixind.com`
4. Enter valid password: `123123`
5. Click "Log in" button

**Expected Result**: User is redirected to the home page and successfully authenticated.

---

#### 2. Should not sign in with invalid email

**Description**: Validates that the system rejects login attempts with an invalid email address.

**Steps**:

1. Open landing page
2. Click "Log In" button
3. Enter invalid email: `invalid.email@invalid.domain`
4. Enter valid password: `123123`
5. Click "Log in" button

**Expected Result**: Error message "Invalid Email or password." is displayed.

---

#### 3. Should not sign in with invalid password

**Description**: Validates that the system rejects login attempts with an incorrect password.

**Steps**:

1. Open landing page
2. Click "Log In" button
3. Enter valid email: `bacos38210@aixind.com`
4. Enter invalid password: `wrong-password`
5. Click "Log in" button

**Expected Result**: Error message "Invalid Email or password." is displayed.

---

#### 4. Should show validation error for invalid email format

**Description**: Tests client-side email format validation before form submission.

**Steps**:

1. Open landing page
2. Click "Log In" button
3. Enter invalid email formats:
    - `invalid-email`
    - `invalid-email@`
    - `invalid-email@domain`
4. Click on password field to trigger validation

**Expected Result**: Validation error "Please enter a valid email address" is displayed for each invalid format.

---

### Project Creation Tests (`create-custom-project.test.ts`)

#### 1. Should create a new custom project successfully

**Description**: Verifies the complete workflow of creating a custom project with all required and optional fields.

**Preconditions**: User is authenticated with valid credentials.

**Steps**:

1. Navigate to Projects page
2. Click "Create Custom Project" button
3. Select jurisdiction with ID `1`
4. Enter unique project name (generated with timestamp)
5. Search for address: `Kyiv`
6. Select address: `Kyiv Street, Springfield,`
7. Enter unit number: `5`
8. Click "Create Project" button
9. Verify project details page displays correct information
10. Navigate back to Projects list
11. Verify new project appears in the list

**Expected Result**:

- Success message is displayed
- Project details match entered information
- Project appears in the projects list with "Draft" status

---

#### 2. Should validate required fields for project creation

**Description**: Tests that the Create Project button remains disabled until all required fields are filled.

**Preconditions**: User is authenticated with valid credentials.

**Steps**:

1. Navigate to Projects page
2. Click "Create Custom Project" button
3. Verify "Create Project" button is disabled
4. Enter project name: `Test Project`
5. Verify "Create Project" button is still disabled
6. Select jurisdiction with ID `1`
7. Search and select address: `Kyiv Street, Springfield,`
8. Verify "Create Project" button is now enabled

**Expected Result**:

- Create button is disabled when required fields are empty
- Create button becomes enabled only when all required fields are filled

---

#### 3. Should create project without optional unit number

**Description**: Verifies that projects can be created successfully without filling optional fields.

**Preconditions**: User is authenticated with valid credentials.

**Steps**:

1. Navigate to Projects page
2. Click "Create Custom Project" button
3. Select jurisdiction with ID `1`
4. Enter unique project name (generated with timestamp)
5. Search for address: `Kyiv`
6. Select address: `Kyiv Street, Springfield,`
7. Skip unit number field (optional)
8. Click "Create Project" button

**Expected Result**: Project is created successfully and success message is displayed.

---

## Test Summary

### Coverage

- **Total Test Cases**: 7
- **Authentication Tests**: 4
- **Project Management Tests**: 3

### Test Results

| Test Suite             | Total | Status    |
| ---------------------- | ----- | --------- |
| Sign-in Tests          | 4     | ✓ Passing |
| Project Creation Tests | 3     | ✓ Passing |

### Architecture

- **Pattern**: Page Object Model
- **Structure**:
    - `app/pages/` - Page objects for different pages
    - `app/pages/projects/` - Project-related page objects
    - `app/components/` - Reusable UI components
    - `fixtures/` - Test fixtures and setup
    - `tests/` - Test specifications

### Key Features

- Viewport-adaptive design ready (mobile/desktop)
- Reusable authentication flows
- Centralized element selectors
- Type-safe test data interfaces
- Cookie acceptance handling
- Dynamic test data generation with unique identifiers

### Running Tests

```bash
# Run all tests
npx playwright test

# Run specific test file
npx playwright test tests/sign-in.test.ts

# Run tests in headed mode
npx playwright test --headed

# Run tests with UI mode
npx playwright test --ui

# Generate test report
npx playwright show-report
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd uitop-test-task
```

2. **Install dependencies**

```bash
npm install
```

3. **Install Playwright browsers**

```bash
npx playwright install
```

### Running Tests Locally

1. **Run all tests in headless mode**

```bash
npx playwright test
```

2. **Run tests in headed mode (see browser)**

```bash
npx playwright test --headed
```

3. **Run specific test file**

```bash
npx playwright test tests/sign-in.test.ts
npx playwright test tests/create-custom-project.test.ts
```

4. **Run tests in UI mode (interactive)**

```bash
npx playwright test --ui
```

5. **Run tests in debug mode**

```bash
npx playwright test --debug
```

6. **Run tests on specific browser**

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

7. **View test report**

```bash
npx playwright show-report
```

### Configuration

Test configuration is defined in `playwright.config.ts`. Key settings include:

- Base URL: `https://staging-stack.alynea.io/`
- Timeout: 30 seconds
- Retries: 2 attempts on CI
- Browsers: Chromium, Firefox, Webkit

### Project Structure

```
uitop-test-task/
├── app/
│   ├── components/          # Reusable UI components
│   │   ├── navigation.component.ts
│   │   └── sign-in.component.ts
│   ├── pages/              # Page objects
│   │   ├── projects/       # Project-related pages
│   │   │   ├── create-project.page.ts
│   │   │   ├── project-details.page.ts
│   │   │   └── projects.page.ts
│   │   ├── home.page.ts
│   │   └── landing.page.ts
│   ├── abstractPage.ts     # Base page class
│   └── index.ts           # Application entry point
├── fixtures/              # Test fixtures
│   └── index.ts
├── tests/                 # Test specifications
│   ├── sign-in.test.ts
│   └── create-custom-project.test.ts
├── playwright.config.ts   # Playwright configuration
└── README.md             # This file
```

### Test Maintenance

- All page objects follow consistent naming conventions
- Selectors are centralized in page objects for easy maintenance
- Test data is typed using TypeScript interfaces
- Mobile viewport support structure in place

---

## Future Improvements & Best Practices

This section outlines potential enhancements that could be implemented in a production environment but were intentionally scoped out due to time constraints for this test task.

### 1. Environment Configuration & Secrets Management

**Current State**: Credentials and URLs are hardcoded in test files and config.

**What Can Be Done**:
- Implement environment variables using `.env` files with `dotenv` package
- Store sensitive data (credentials, API keys) in environment variables
- Create separate configs for different environments (dev, staging, production)
- Use GitHub Secrets for CI/CD credentials
- Add `.env.example` file for documentation

**Example**:
```typescript
// .env file
TEST_USER_EMAIL=bacos38210@aixind.com
TEST_USER_PASSWORD=123123
BASE_URL=https://staging-stack.alynea.io
```

### 2. Test Data Management

**Current State**: Test data is scattered across test files and some values are hardcoded.

**What Can Be Done**:
- Create a centralized test data factory or fixtures
- Implement data builders for complex objects (e.g., `ProjectDataBuilder`)
- Add test data cleanup/teardown hooks to maintain test isolation
- Consider using faker.js for generating realistic random data
- Store common test data in JSON/YAML files

**Example**:
```typescript
// test-data/users.ts
export const TEST_USERS = {
  validUser: { email: process.env.TEST_USER_EMAIL, password: process.env.TEST_USER_PASSWORD },
  invalidUser: { email: 'invalid@test.com', password: 'wrong-pass' }
};
```

### 3. Enhanced Error Handling & Logging

**Current State**: Basic Playwright error messages and assertions.

**What Can Be Done**:
- Add custom error messages to all assertions for better debugging
- Implement structured logging (e.g., winston, pino)
- Add screenshots on failure with descriptive names
- Create custom expect matchers for domain-specific assertions
- Add retry logic for flaky elements
- Implement better wait strategies with polling

### 4. API Testing & Test Performance

**Current State**: All tests go through UI which is slower and more fragile.

**What Can Be Done**:
- Use API calls for test setup (authentication, data creation)
- Implement API helper utilities for common operations
- Create reusable authentication state that can be loaded
- Use Playwright's storage state to cache authentication
- Add API test suite for backend validation

**Example**:
```typescript
// Use auth state to skip login UI
test.use({ storageState: 'auth.json' });
```

### 5. Test Organization & Scalability

**Current State**: Tests are in a flat structure with basic organization.

**What Can Be Done**:
- Organize tests by feature/module directories
- Implement test tags for selective test execution (@smoke, @regression)
- Create separate test suites (smoke, regression, E2E)
- Add visual regression testing with Percy or Playwright screenshots
- Implement cross-browser testing strategy
- Add accessibility testing (axe-core integration)

### 6. Reporting & Monitoring

**Current State**: Basic HTML report from Playwright.

**What Can Be Done**:
- Integrate with test management tools (TestRail, Xray)
- Add custom reporters (Allure, Mochawesome)
- Implement test metrics tracking (duration, flakiness, pass rate)
- Add Slack/email notifications for CI failures
- Create dashboards for test trends and coverage
- Integrate with monitoring tools (Datadog, New Relic)

### 7. Code Quality & Standards

**Current State**: Basic TypeScript setup with Prettier.

**What Can Be Done**:
- Add ESLint with Playwright plugin and strict rules
- Implement pre-commit hooks with Husky
- Add commit message linting (commitlint)
- Create coding standards documentation
- Implement code coverage reporting
- Add TypeScript strict mode
- Set up SonarQube or similar for code quality metrics

### 8. CI/CD Enhancements

**Current State**: Basic GitHub Actions workflow.

**What Can Be Done**:
- Parallelize test execution across multiple machines
- Implement test sharding for faster execution
- Add matrix strategy for multiple environments/browsers
- Create separate workflows for smoke vs full regression
- Implement scheduled test runs (nightly builds)
- Add deployment gates based on test results
- Cache dependencies and Playwright browsers
- Add test result trends in PR comments

### 9. Page Object Enhancements

**Current State**: Basic page objects with some reusability.

**What Can Be Done**:
- Implement proper wait strategies (avoid hard waits)
- Add method chaining for fluent API style
- Create base component classes for common UI patterns
- Add data-testid attributes to application for stable selectors
- Implement soft assertions for multiple validations
- Add JSDoc comments for better IDE support
- Create helper methods for common workflows

### 10. Test Data Isolation & Cleanup

**Current State**: Tests create data but don't clean up.

**What Can Be Done**:
- Implement database cleanup hooks
- Use unique identifiers for all test entities
- Add afterEach hooks to delete created test data
- Consider using transactions that can be rolled back
- Implement test user pools to avoid conflicts
- Add database seeding for consistent test state

### 11. Documentation

**Current State**: Basic README with test documentation.

**What Can Be Done**:
- Add JSDoc comments to all page objects and methods
- Create architecture decision records (ADRs)
- Document common patterns and anti-patterns
- Add troubleshooting guide
- Create onboarding guide for new team members
- Document CI/CD pipeline and deployment process
- Add API documentation for helper methods

### 12. Advanced Testing Strategies

**Current State**: Basic functional E2E tests.

**What Can Be Done**:
- Add performance testing (Lighthouse CI)
- Implement visual regression testing
- Add security testing basics (OWASP checks)
- Create load/stress test scenarios
- Add contract testing for APIs
- Implement mutation testing
- Add chaos engineering tests

### Priority Recommendations

For immediate implementation in a real project, prioritize:

1. **High Priority**: Environment configuration, test data management, authentication optimization
2. **Medium Priority**: Enhanced reporting, CI/CD improvements, code quality tools
3. **Low Priority**: Advanced testing strategies, comprehensive documentation

### Conclusion

These improvements represent industry best practices for scalable, maintainable test automation. The current implementation provides a solid foundation with proper POM architecture, TypeScript typing, and basic CI/CD integration. The suggested enhancements would make the framework production-ready for enterprise-level applications.
