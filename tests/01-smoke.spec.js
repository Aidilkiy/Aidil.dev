// 01 -- SMOKE TESTS
//
// "Smoke tests" are the first, most basic checks in any QA suite: does the app
// even load and show its most important content? If these fail, everything
// else is meaningless -- like turning on a device and checking for smoke.
//
// Concepts introduced here:
//   - test.describe() groups related tests
//   - page.goto() / navigation (via our gotoHome helper)
//   - Locators: page.getByRole() finds elements the way USERS and screen
//     readers see them -- the most robust way to select elements
//   - Web-first assertions: expect(locator).toBeVisible() retries until true
const { test, expect } = require("@playwright/test");
const { gotoHome } = require("./helpers");

test.describe("Homepage smoke tests", () => {
  // Runs before EVERY test in this describe block -- keeps tests independent,
  // because each one starts from a freshly loaded page.
  test.beforeEach(async ({ page }) => {
    await gotoHome(page);
  });

  test("page loads with the correct title", async ({ page }) => {
    // The <title> tag is set in src/app/layout.js. A regex (/.../ instead of
    // "...") means "contains", so a small wording tweak won't break the test.
    await expect(page).toHaveTitle(/Aidil Rozaidi/);
  });

  test("hero shows the main headline", async ({ page }) => {
    // getByRole("heading") matches <h1>..<h6>. Searching by VISIBLE TEXT means
    // the test breaks only when a real user would notice a change -- exactly
    // what you want from a UI test.
    await expect(
      page.getByRole("heading", { name: /I build practical software/i })
    ).toBeVisible();

    await expect(page.getByText("Hi, I'm Aidil.", { exact: false })).toBeVisible();
  });

  test("primary call-to-action points at the work section", async ({ page }) => {
    const cta = page.getByRole("link", { name: "View My Work" });
    await expect(cta).toBeVisible();
    // toHaveAttribute checks the DOM, not just looks -- a broken href would
    // pass a purely visual check but fail this.
    await expect(cta).toHaveAttribute("href", "#work");
  });

  test("social links point to the right profiles", async ({ page }) => {
    // exact: true matters here: the contact section further down has links
    // named "Open GitHub" etc. Without exact matching, one name could match
    // several elements and Playwright's strict mode would (rightly) complain.
    const github = page.getByRole("link", { name: "GitHub", exact: true });
    const linkedin = page.getByRole("link", { name: "LinkedIn", exact: true });
    const email = page.getByRole("link", { name: "Email", exact: true });

    await expect(github).toHaveAttribute("href", "https://github.com/AidilKiy");
    await expect(linkedin).toHaveAttribute("href", "https://www.linkedin.com/in/aidil-rozaidi");
    await expect(email).toHaveAttribute("href", "mailto:aidilkiy21@gmail.com");

    // External links should open in a new tab so visitors don't lose the site.
    await expect(github).toHaveAttribute("target", "_blank");
    await expect(linkedin).toHaveAttribute("target", "_blank");
  });

  test("hero stats strip renders all three stats", async ({ page }) => {
    for (const label of ["Cloud certified", "Professional roles", "Featured projects"]) {
      await expect(page.getByText(label, { exact: true })).toBeVisible();
    }
  });
});
