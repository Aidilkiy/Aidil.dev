// 04 -- MOBILE / RESPONSIVE TESTS
//
// Most portfolio visitors from LinkedIn open on a phone, and the job you're
// eyeing is mobile-app QA -- responsive testing is core business.
//
// New concepts:
//   - test.use() overrides config PER FILE: here, an iPhone-sized viewport
//   - The same page can behave differently per viewport (hamburger vs navbar),
//     and your tests must target the right variant
const { test, expect } = require("@playwright/test");
const { gotoHome } = require("./helpers");

// Every test in this file runs in a phone-sized window (iPhone 13-ish).
test.use({ viewport: { width: 375, height: 812 } });

test.describe("Mobile navigation", () => {
  test.beforeEach(async ({ page }) => {
    await gotoHome(page);
  });

  test("shows the hamburger button instead of the desktop navbar", async ({ page }) => {
    await expect(page.getByRole("button", { name: "Toggle navigation menu" })).toBeVisible();

    // The desktop <nav> is display:hidden below the md breakpoint. Asserting
    // what should NOT be there is as important as asserting what should.
    await expect(page.getByRole("navigation", { name: "Main navigation" })).toBeHidden();
  });

  test("hamburger opens the menu and navigates to a section", async ({ page }) => {
    await page.getByRole("button", { name: "Toggle navigation menu" }).click();

    const contactLink = page.getByRole("link", { name: /Contact/ });
    await expect(contactLink).toBeVisible();

    await contactLink.click();

    // Navigating should update the hash AND close the menu behind itself --
    // a classic mobile-menu bug worth guarding against.
    await expect(page).toHaveURL(/#contact/);
    await expect(contactLink).toBeHidden();
  });
});
