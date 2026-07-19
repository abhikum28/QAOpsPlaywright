# Project Guidelines

## Code Style
Use CommonJS modules (`require`) for imports. Always use `async/await` for Playwright operations. Follow consistent selector patterns: prefer IDs, then data attributes, then CSS classes. Use descriptive, past-tense test names.

## Architecture
This is an end-to-end testing project using Playwright. Tests are organized in a flat structure under `tests/` directory. Each test file focuses on specific application features (e.g., client app authentication, UI basics). Use browser contexts for test isolation when needed.

## Build and Test
Run tests with `npx playwright test`. For debugging, use `npx playwright test --debug`. Install dependencies with `npm ci` followed by `npx playwright install --with-deps`. HTML reports are generated in `playwright-report/` after test runs.

## Conventions
- Test files: `*.test.js` in `tests/` directory
- Locator strategy: Use specific selectors like `page.locator("input#userEmail")` or attribute matches like `page.locator("[href*='documents-request']")`
- Test structure: Define locators first, then navigate, interact, and assert
- Avoid `console.log` in production tests; use Playwright's tracing instead
- Extract credentials to environment variables; avoid hard-coding
- Ensure tests work in headless mode for CI/CD</content>
<parameter name="filePath">c:\Automation\PlayWright\PlayWrightAutomation\.github\copilot-instructions.md