// 02 -- NAVIGATION TESTS
//
// Navigation is a "critical user journey": if visitors can't reach your
// contact section, the portfolio fails at its one job. These tests simulate a
// real visitor clicking through the navbar.
//
// New concepts:
//   - Scoping: navbar.getByRole(...) searches INSIDE another locator, so
//     "Contact" in the navbar can't be confused with "Contact" elsewhere
//   - toHaveURL() for asserting where navigation ended up
//   - toBeInViewport() for asserting the page actually scrolled somewhere
const { test, expect } = require("@playwright/test");
const { gotoHome } = require("./helpers");

test.describe("Navbar navigation", () => {
  test.beforeEach(async ({ page }) => {
    await gotoHome(page);
  });

  test("navbar shows the logo and all section links", async ({ page }) => {
    await expect(page.getByRole("button", { name: "Go to top of page" })).toBeVisible();

    // The <nav> in navbar.jsx has aria-label="Main navigation" -- that label
    // becomes its accessible name, which is how we scope to exactly it.
    const navbar = page.getByRole("navigation", { name: "Main navigation" });
    for (const link of ["About", "Experience", "Education", "Projects", "Certifications", "Leadership", "Contact"]) {
      await expect(navbar.getByRole("link", { name: link })).toBeVisible();
    }
  });

  test("clicking Contact scrolls to the contact section", async ({ page }) => {
    const navbar = page.getByRole("navigation", { name: "Main navigation" });
    await navbar.getByRole("link", { name: "Contact" }).click();

    // The navbar updates the URL hash with history.replaceState...
    await expect(page).toHaveURL(/#contact/);

    // ...and smooth-scrolls the section into view. toBeInViewport() retries
    // while the scroll animation plays, so no manual waiting is needed.
    await expect(
      page.getByRole("heading", { name: /Let's build something/i })
    ).toBeInViewport();
  });

  test("clicking Projects scrolls to the work section", async ({ page }) => {
    const navbar = page.getByRole("navigation", { name: "Main navigation" });
    await navbar.getByRole("link", { name: "Projects" }).click();

    await expect(page).toHaveURL(/#work/);
  });
});
