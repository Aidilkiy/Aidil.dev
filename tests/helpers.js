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
  // waitUntil: "domcontentloaded" = proceed once the HTML is parsed, WITHOUT
  // waiting for every image to finish downloading (the default "load" event).
  // This image-heavy site on a slow dev server can take minutes to fire
  // "load", while the content our assertions need is ready in seconds --
  // and each assertion auto-waits for its own element anyway.
  await page.goto(path, { waitUntil: "domcontentloaded" });

  const overlay = page.locator(".intro-loader-overlay");

  // Don't click the Skip button: until React hydrates, it's a "dead" button
  // (visible but not wired up), so the click is a no-op race. The loader
  // dismisses ITSELF once hydration runs -- instantly under our
  // reducedMotion: "reduce" setting -- so we only need to wait for that.
  //
  // Web-first assertion: retries automatically until the overlay is hidden.
  // The generous timeout covers slow hydration on a cold dev server; in the
  // normal warm case this resolves in about a second. Never use fixed sleeps
  // (waitForTimeout) for this -- they make tests slow AND flaky at once.
  await expect(overlay).toBeHidden({ timeout: 60_000 });
}

module.exports = { gotoHome };
