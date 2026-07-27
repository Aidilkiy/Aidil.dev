// Playwright configuration -- this file tells Playwright HOW to run your tests.
// Docs: https://playwright.dev/docs/test-configuration
const { defineConfig, devices } = require("@playwright/test");

module.exports = defineConfig({
  // Where the test files live. Playwright picks up every *.spec.js file in here.
  testDir: "./tests",

  // Run test FILES in parallel (each file gets its own browser context).
  fullyParallel: true,

  // On CI, retry a failed test once before declaring it broken. Locally, no
  // retries -- if it fails on your machine you want to see the failure.
  retries: process.env.CI ? 1 : 0,

  // The HTML report you can open after a run with: npm run test:report
  reporter: [["html", { open: "never" }], ["list"]],

  use: {
    // Every page.goto("/") resolves against this URL, so tests never
    // hard-code localhost:3000 -- change it once here if the port changes.
    baseURL: "http://localhost:3000",

    // On the first retry of a failed test, record a full trace (DOM snapshots,
    // network, console) you can replay with: npx playwright show-trace
    trace: "on-first-retry",

    // Screenshot only when a test fails -- saved into test-results/.
    screenshot: "only-on-failure",

    // Emulate the OS-level "prefers reduced motion" setting. Your IntroLoader
    // respects it and auto-skips, and it calms animations that would otherwise
    // make tests wait or flake.
    reducedMotion: "reduce",

    // Chromium normally asks the user before a page may touch the clipboard.
    // Tests have no human to click "Allow", so we pre-grant it (needed for the
    // copy-email test).
    permissions: ["clipboard-read", "clipboard-write"],
  },

  // "Projects" = the same tests run against different browsers/devices.
  // Start with Chromium only; add firefox/webkit here later if you want.
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],

  // Playwright starts your dev server before the tests and shuts it down
  // after -- you never have to remember to run `npm run dev` yourself.
  //
  // On CI we test the PRODUCTION build (next build + next start) instead of
  // the dev server: it's what visitors actually get, and prod-only bugs
  // (broken builds, missing env vars) should fail the pipeline.
  webServer: {
    command: process.env.CI ? "npm run build && npm run start" : "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI, // reuse a server you already have running locally
    timeout: 300_000, // long enough for a full production build on CI
  },
});
