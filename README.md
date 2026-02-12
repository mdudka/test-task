# Test Documentation

## Project Overview

This test suite covers the Alynea application UI and AutomationExercise API:

- **UI Testing**: Authentication and project management using Page Object Model
- **API Testing**: RESTful API validation with API Client pattern

**Framework**: Playwright with TypeScript

**Live Test Report**: [https://mdudka.github.io/test-task/](https://mdudka.github.io/test-task/)

## Test Cases

### UI Tests (7 total)

#### Authentication Tests (`tests/sign-in.test.ts`)

**1. Should sign in with valid credentials**

- **Purpose**: Verify successful login with correct credentials
- **Test Data**: Email: `bacos38210@aixind.com`, Password: `123123`
- **Steps**:
    1. Navigate to landing page
    2. Click "Log In" button
    3. Accept cookies if prompted
    4. Enter valid credentials
    5. Submit login form
- **Expected**: User redirected to home page, authentication successful

**2. Should not sign in with invalid email**

- **Purpose**: Validate error handling for incorrect email
- **Test Data**: Email: `invalid.email@invalid.domain`, Password: `123123`
- **Expected**: Error message "Invalid Email or password." displayed

**3. Should not sign in with invalid password**

- **Purpose**: Validate error handling for incorrect password
- **Test Data**: Email: `bacos38210@aixind.com`, Password: `wrong-password`
- **Expected**: Error message "Invalid Email or password." displayed

**4. Should show validation error for invalid email format**

- **Purpose**: Test client-side email validation
- **Test Data**: Invalid formats: `invalid-email`, `invalid-email@`, `invalid-email@domain`
- **Expected**: Validation error "Please enter a valid email address"

#### Project Creation Tests (`tests/create-custom-project.test.ts`)

**5. Should create a new custom project successfully**

- **Purpose**: Verify complete project creation workflow
- **Test Data**:
    - Jurisdiction ID: `1`
    - Project Name: `Custom Project [timestamp]`
    - Address: `Kyiv Street, Springfield,`
    - Unit Number: `5`
- **Steps**:
    1. Login with valid credentials
    2. Navigate to Projects page
    3. Click "Create Custom Project"
    4. Fill all required and optional fields
    5. Submit project creation
    6. Verify project details
    7. Verify project appears in list
- **Expected**: Project created with "Draft" status, all details match

**6. Should validate required fields for project creation**

- **Purpose**: Ensure form validation works correctly
- **Steps**:
    1. Login and navigate to project creation
    2. Verify "Create Project" button is disabled
    3. Fill required fields one by one
    4. Verify button enables only when all required fields filled
- **Expected**: Button state changes based on form completion

**7. Should create project without optional unit number**

- **Purpose**: Verify optional fields don't block project creation
- **Test Data**: Same as test #5 but without unit number
- **Expected**: Project created successfully without unit number

### API Tests (5 total)

#### Products API Tests (`tests/api.test.ts`)

**8. Positive: Should successfully retrieve all products list**

- **Endpoint**: `GET /api/productsList`
- **Purpose**: Validate product list retrieval
- **Expected Response**:
    - Status: 200
    - Response code: 200
    - Products array with items
    - Each product has: id, name, price, brand, category

**9. Negative: Should return error when searching without required parameter**

- **Endpoint**: `POST /api/searchProduct` (without body)
- **Purpose**: Validate parameter validation
- **Expected Response**:
    - Status: 200
    - Response code: 400
    - Message contains "Bad request"

#### Brands API Tests

**10. Positive: Should successfully retrieve all brands list**

- **Endpoint**: `GET /api/brandsList`
- **Purpose**: Validate brands list retrieval
- **Expected Response**:
    - Status: 200
    - Response code: 200
    - Brands array with id and brand name

#### Authentication API Tests

**11. Negative: Should return error for login with invalid credentials**

- **Endpoint**: `POST /api/verifyLogin`
- **Test Data**: Email: `invalid@email.com`, Password: `wrongpassword`
- **Purpose**: Validate authentication error handling
- **Expected Response**:
    - Status: 200
    - Response code: 404
    - Message: "User not found!"

**12. Negative: Should return error for login without email parameter**

- **Endpoint**: `POST /api/verifyLogin` (password only)
- **Purpose**: Validate required parameter enforcement
- **Expected Response**:
    - Status: 200
    - Response code: 400
    - Message contains "Bad request"

## Getting Started

### Prerequisites

- **Node.js**: v20 or higher
- **npm**: Comes with Node.js
- **Git**: For cloning the repository
- **Docker** (optional): For containerized test execution

### Installation

**1. Fork and Clone the Repository**

Fork the repository on GitHub, then clone your fork:

```bash
# Fork the repository at: https://github.com/mdudka/test-task
# Then clone your fork:
git clone https://github.com/YOUR_USERNAME/test-task.git
cd test-task
```

Or clone the original repository directly:

```bash
git clone https://github.com/mdudka/test-task.git
cd test-task
```

**2. Install Dependencies**

```bash
npm install
```

**3. Install Playwright Browsers**

```bash
npx playwright install
```

This will download Chromium and WebKit browsers.

### Local Test Execution

**Run All Tests**

```bash
npm test
# or
npx playwright test
```

**Run UI Tests Only**

```bash
npm run test:ui
# or
npx playwright test tests/sign-in.test.ts tests/create-custom-project.test.ts
```

**Run API Tests Only**

```bash
npm run test:api
# or
npx playwright test tests/api.test.ts
```

**Run Tests in Headed Mode (Watch Browser)**

```bash
npm run test:headed
# or
npx playwright test --headed
```

**Run Tests in Debug Mode**

```bash
npm run test:debug
# or
npx playwright test --debug
```

**Run Tests with UI Mode (Interactive)**

```bash
npm run test:ui-mode
# or
npx playwright test --ui
```

**Run Tests on Specific Browser**

```bash
npm run test:chromium
npm run test:webkit
# or
npx playwright test --project=chromium
npx playwright test --project=webkit
```

**Run Specific Test File**

```bash
npx playwright test tests/sign-in.test.ts
npx playwright test tests/create-custom-project.test.ts
npx playwright test tests/api.test.ts
```

**Run Specific Test by Name**

```bash
npx playwright test -g "should sign in with valid credentials"
npx playwright test -g "should create a new custom project"
```

### View Test Results

**HTML Report (Recommended)**

```bash
npm run report
# or
npx playwright show-report
```

Opens an interactive HTML report in your browser with:

- Test execution timeline
- Screenshots and videos of failures
- Detailed error messages and traces
- Network logs

**Console Output**

Test results are automatically displayed in the terminal after execution.

**Test Artifacts**

After test execution, check:

- `playwright-report/` - HTML report
- `test-results/` - Screenshots, videos, traces
- `test-results/error-logs/` - Console and network error logs (JSON format)

### Troubleshooting

**Tests fail with "Browser not found"**

```bash
npx playwright install
```

**Port conflicts or connection errors**

- Ensure no other services are blocking required ports
- Check your internet connection for external API tests

**Tests timeout**

- Increase timeout in `playwright.config.ts`
- Check if the application is accessible: https://staging-stack.alynea.io

**Need clean test run**

```bash
# Remove previous test results
rm -rf test-results playwright-report

# Run tests again
npm test
```

## Docker Support

**Build and Run with Docker:**

```bash
# Using npm scripts (recommended)
npm run docker:build      # Build image
npm run docker:run        # Run tests

# Using Docker Compose
docker-compose up --build

# Using Docker CLI
docker build -t playwright-tests .
docker run --rm playwright-tests
```

**Docker Test Results:**

After running in Docker, results are available in:

- `./test-results/` - Screenshots, videos, error logs
- `./playwright-report/` - HTML report

View report after Docker run:

```bash
npm run report
```

## Configuration

**playwright.config.ts** settings:

- Base URL: `https://staging-stack.alynea.io/`
- Browsers: Chromium, WebKit (UI tests only)
- API tests: Separate project (single execution, browser-independent)
- Retries: 2 attempts on CI
- Screenshots: On failure
- Videos: On failure
- Reporters: HTML, List, JSON

## CI/CD Pipeline

**GitHub Actions Workflows:**

1. **Standard Workflow** (`.github/workflows/playwright.yml`)
    - Triggers: Push to main, Pull Requests
    - Runs all tests on Ubuntu
    - Uploads test results as artifacts

2. **Docker Workflow with GitHub Pages** (`.github/workflows/playwright-docker.yml`)
    - Runs tests in Docker container
    - Publishes HTML report to GitHub Pages
    - Report URL: `https://<username>.github.io/<repository>/`

**Enable GitHub Pages:**

1. Go to repository Settings → Pages
2. Source: Select "GitHub Actions"
3. Save changes

Reports will be published automatically on each workflow run.

## Project Structure

```
test-task/
├── app/
│   ├── pages/              # Page Object Model
│   │   ├── projects/       # Project-related pages
│   │   │   ├── create-project.page.ts
│   │   │   ├── project-details.page.ts
│   │   │   └── projects.page.ts
│   │   ├── home.page.ts
│   │   └── landing.page.ts
│   ├── components/         # Reusable UI components
│   │   ├── navigation.component.ts
│   │   └── sign-in.component.ts
│   └── abstractPage.ts     # Base page class
├── api/
│   ├── api-client.ts       # API methods
│   └── api-fixtures.ts     # API fixtures
├── fixtures/
│   └── index.ts            # Test fixtures
├── tests/
│   ├── sign-in.test.ts
│   ├── create-custom-project.test.ts
│   └── api.test.ts
├── utils/
│   └── error-logger.ts     # Error capture utility
├── .github/workflows/      # CI/CD pipelines
├── Dockerfile
├── docker-compose.yml
└── playwright.config.ts
```

## Notes

**Mobile Viewports**: Configuring and maintaining tests for mobile viewports requires additional time for viewport detection, conditional logic, and separate selectors. This was excluded from the task scope to meet time constraints.

**Error Logging**: Automatic capture of console and network errors during test execution, saved to `test-results/error-logs/` in JSON format.

**Cross-Browser Testing**: UI tests run on Chromium and WebKit. API tests execute once (browser-independent).

**Dynamic Test Data**: Project names include timestamps to ensure uniqueness across test runs.

## Future Improvements

Potential production enhancements:

1. **Environment Configuration**: Externalize credentials and URLs using `.env` files
2. **Test Data Management**: Centralized factory with cleanup hooks and faker.js integration
3. **Enhanced Reporting**: Allure integration, metrics tracking, Slack notifications
4. **API Optimization**: Use API for test setup to improve performance
5. **Code Quality**: ESLint, Husky pre-commit hooks, TypeScript strict mode
6. **CI/CD Enhancements**: Test sharding, parallel execution, scheduled runs
7. **Advanced Testing**: Visual regression, performance, accessibility testing
8. **Documentation**: JSDoc comments, ADRs, troubleshooting guides
