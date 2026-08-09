import { workspaceRoot } from '@nx/devkit';
import { nxE2EPreset } from '@nx/playwright/preset';
import { defineConfig, devices } from '@playwright/test';

// For CI, you may want to set BASE_URL to the deployed application.
const baseURL = process.env['BASE_URL'] || 'http://localhost:3000';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import 'dotenv/config';

/**
 * See https://playwright.dev/docs/test-configuration.
 *
 * Generated as a .mts file so Node forces ESM regardless of workspace
 * `type`. Playwright routes `.mts` through its ESM loader (dynamic import,
 * bypassing the pirates CJS-compile path), and Nx's native TS strip loads
 * `.mts` directly. Playwright's configLoader auto-discovers
 * `playwright.config.mts` via its extension list
 * (.ts/.js/.mts/.mjs/.cts/.cjs).
 */
export default defineConfig({
  ...nxE2EPreset(import.meta.dirname, { testDir: './src' }),
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    baseURL,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },
  /* Run your local dev server before starting the tests.
   * Locally: reuse the dev server that Nx starts as a continuous task
   * (the @nx/playwright plugin infers `dependsOn: admin:dev` from this block).
   * In CI: `reuseExistingServer` is false, so the plugin skips the dependsOn
   * inference and Playwright owns the full server lifecycle. This avoids a
   * race where Nx schedules e2e before the cold dev server is listening and
   * Playwright spawns a second `next dev`, leaving two servers to untangle
   * (slow teardown) after the tests finish. */
  webServer: {
    command: 'npx nx run @costandcalc/admin:dev',
    url: 'http://localhost:3000',
    // cold boot of `next dev` on a CI agent can exceed the 60s default
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
    // The workspace root .env is not committed, so the CI-spawned dev server
    // must get these explicitly, otherwise Auth.js throws
    // UntrustedHost / MissingSecret for /auth/* requests.
    env: {
      AUTH_TRUST_HOST: 'true',
      // throwaway value, only used by the ephemeral e2e dev server
      AUTH_SECRET: 'e2e-playwright-dummy-secret',
      KEYCLOAK_ISSUER: "https://auth.datenium.de/realms/test_realm",
      KEYCLOAK_CLIENT_ID: "test_realm_id",
      KEYCLOAK_CLIENT_SECRET: "gYCK8ERXmi0PnLrZgdwXVHPMD7AdnZvdSLhYg2OGbG8ZQsoVgTZ4GOjRLlkRZvMHS9iKpz4AR8Us0eNv6KwOQ7",
      KEYCLOAK_SCOPE: "openid profile email"
    },
    cwd: workspaceRoot,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    // Uncomment for mobile browsers support
    /* {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    }, */

    // Uncomment for branded browsers
    /* {
      name: 'Microsoft Edge',
      use: { ...devices['Desktop Edge'], channel: 'msedge' },
    },
    {
      name: 'Google Chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    } */
  ],
});
