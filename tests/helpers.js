// Shared helpers used by every test file.
//
// QA lesson: when several tests need the same setup steps, pull them into one
// helper instead of copy-pasting. If the app changes (e.g. the intro loader is
// removed), you fix ONE file, not twenty tests.
const { expect } = require("@playwright/test");

/**
 * Open a page of the portfolio and make sure the animated boot intro is gone.
 *
 * The site shows a full-screen "boot sequence" overlay for ~7 seconds on every
 * load. While it is up, it covers every element, so any click would fail.
 * Our playwright.config.js sets `reducedMotion: "reduce"`, which the loader
 * respects by auto-skipping -- but we still click "Skip" if we catch it
 * on-screen, and we always WAIT until the overlay is hidden before returning.
 */
async function gotoHome(page, path = "/") {
  await page.goto(path);

  const overlay = page.locator(".intro-loader-overlay");

  // If the intro is still visible, dismiss it via its Skip button. The
  // .catch() guards a race: the overlay may finish hiding on its own between
  // our check and our click, and that's fine -- we only care that it's gone.
  if (await overlay.isVisible().catch(() => false)) {
    await page.getByRole("button", { name: /skip/i }).click().catch(() => {});
  }

  // Web-first assertion: retries automatically until the overlay is hidden
  // (or 10s pass). Never use fixed sleeps like waitForTimeout for this --
  // they make tests slow AND flaky at the same time.
  await expect(overlay).toBeHidden({ timeout: 10_000 });
}

module.exports = { gotoHome };
