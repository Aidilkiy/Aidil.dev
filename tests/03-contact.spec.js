// 03 -- CONTACT SECTION / INTERACTION TESTS
//
// These go beyond "is it visible?" into real behaviour: clicking a button and
// checking that the app RESPONDED correctly (UI feedback + clipboard content).
//
// New concepts:
//   - Testing user feedback loops (click -> "Copied!" appears -> reverts)
//   - page.evaluate() to run JavaScript inside the browser page
//   - Asserting a state change AND the side effect behind it
const { test, expect } = require("@playwright/test");
const { gotoHome } = require("./helpers");

test.describe("Contact section", () => {
  test.beforeEach(async ({ page }) => {
    // Deep-link straight to the section under test -- faster than loading the
    // top of the page and scrolling down manually.
    await gotoHome(page, "/#contact");
  });

  test("contact cards link to the right destinations", async ({ page }) => {
    // Each card's whole surface is a link with aria-label "Open <name>".
    await expect(page.getByRole("link", { name: "Open Email" })).toHaveAttribute(
      "href",
      "mailto:aidilkiy21@gmail.com"
    );
    await expect(page.getByRole("link", { name: "Open LinkedIn" })).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/aidil-rozaidi"
    );
    await expect(page.getByRole("link", { name: "Open GitHub" })).toHaveAttribute(
      "href",
      "https://github.com/AidilKiy"
    );
  });

  test("copy button copies the email address and shows feedback", async ({ page }) => {
    // 1. ACT -- click the copy button (found by its aria-label).
    await page.getByRole("button", { name: "Copy Email" }).click();

    // 2. ASSERT the UI feedback: the card's label flips to "Copied!".
    await expect(page.getByText("Copied!")).toBeVisible();

    // 3. ASSERT the side effect: what actually landed on the clipboard?
    //    A test that only checked "Copied!" would pass even if the app copied
    //    the wrong text. page.evaluate() runs this code inside the page.
    //    (Works because playwright.config.js pre-grants clipboard permission.)
    const clipboardText = await page.evaluate(() => navigator.clipboard.readText());
    expect(clipboardText).toBe("aidilkiy21@gmail.com");

    // 4. ASSERT the feedback reverts after ~1.5s. The default assertion
    //    timeout (5s) comfortably covers it -- again, no manual sleep.
    await expect(page.getByText("Copied!")).toBeHidden();
  });

  test("availability panel and footer are present", async ({ page }) => {
    await expect(page.getByText("availability.config")).toBeVisible();

    const year = new Date().getFullYear().toString();
    await expect(page.getByText(`© ${year}`, { exact: false })).toBeVisible();
  });
});
