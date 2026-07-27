# QA & Playwright Learning Guide

*Your personal reference for the automated test suite in this portfolio — and for QA interviews.*

---

## 1. Why this exists

This project now has an **end-to-end (E2E) test suite** built with [Playwright](https://playwright.dev). E2E tests open a real browser, click through the site like a visitor would, and verify that everything works. This is the exact skill asked for in QA Engineer roles ("Playwright", "JavaScript/TypeScript automated tests", "testing pyramid", "CI/CD integration").

On your CV you can now honestly write:

> Built an automated E2E test suite with Playwright (JavaScript) covering critical user journeys — navigation, responsive mobile behaviour, and clipboard interactions — integrated into a GitHub Actions CI/CD pipeline that tests the production build on every push.

---

## 2. How to run the tests

```bash
npm test              # run all tests headless (no visible browser)
npm run test:headed   # run with a visible browser window — watch it click!
npm run test:ui       # BEST FOR LEARNING: interactive UI mode
npm run test:report   # open the HTML report of the last run
```

Playwright **starts the dev server for you** (see `webServer` in `playwright.config.js`), so you don't need `npm run dev` running first.

Other commands worth knowing:

```bash
npx playwright test tests/01-smoke.spec.js        # run one file
npx playwright test -g "copy button"              # run tests whose name matches
npx playwright codegen localhost:3000             # record your clicks as code
```

> **Start with `npm run test:ui`.** It shows every test, every step, and a filmstrip of what the page looked like at each moment. It is the fastest way to *understand* what the tests do.

---

## 3. The big picture: the Testing Pyramid

Job postings mention "applying the testing pyramid". It means: have many cheap fast tests, fewer expensive slow ones.

```
        /  E2E  \        ← few: full browser, whole app (what we built — Playwright)
       / Integr. \       ← some: several units working together
      /   Unit    \      ← many: one function/component in isolation (Jest/Vitest)
```

- **Unit tests** are fast (milliseconds) and pinpoint failures exactly, but can't tell you the app *as a whole* works.
- **E2E tests** prove real user journeys work, but are slower and can break for unrelated reasons.
- The pyramid says: don't build your whole strategy on E2E. Use it for **critical journeys** only — which is exactly what our 4 spec files do.

**Interview answer to remember:** "I'd cover business-critical user journeys with a small number of E2E tests, and push detailed logic checks down to unit tests where they're faster and more precise."

---

## 4. What's in this suite

| File | What it tests | Key concepts taught |
|---|---|---|
| `tests/helpers.js` | (shared setup) | DRY helpers, handling app overlays |
| `tests/01-smoke.spec.js` | Page loads, headline, links | locators, `getByRole`, web-first assertions |
| `tests/02-navigation.spec.js` | Navbar scrolls to sections | scoping locators, `toHaveURL`, `toBeInViewport` |
| `tests/03-contact.spec.js` | Copy-to-clipboard flow | testing interactions & side effects, `page.evaluate` |
| `tests/04-mobile.spec.js` | Hamburger menu on phone viewport | `test.use`, responsive testing, asserting absence |

Each file has heavy comments — **read them top to bottom in order**, they build on each other.

---

## 5. Core concepts (the vocabulary of QA automation)

### Locators — how you find elements

```js
page.getByRole("button", { name: "Copy Email" })   // ← preferred
page.getByText("Copied!")
page.locator(".intro-loader-overlay")               // CSS — last resort
```

**Rule of thumb:** prefer `getByRole` (finds elements by their *accessible role and name*, the way a screen reader sees them). It's robust — redesigns that keep the same meaning don't break the test — and it quietly verifies your site's accessibility. Use raw CSS selectors only when there's no semantic way in.

### Auto-waiting — why Playwright rarely flakes

When you write `await locator.click()`, Playwright automatically waits for the element to exist, be visible, be stable (not mid-animation), and be unobstructed. You almost never write manual waits.

**Never do this:** `await page.waitForTimeout(3000)` — fixed sleeps make suites slow AND flaky. If you feel you need one, you actually need a better assertion.

### Web-first assertions — expect that retries

```js
await expect(page.getByText("Copied!")).toBeVisible();  // retries up to 5s
await expect(page.getByText("Copied!")).toBeHidden();   // also retries!
```

`expect(locator)` doesn't check once — it *keeps checking* until the condition is true or the timeout expires. This is how we tested the "Copied!" label reverting after 1.5s without any sleep.

### Test independence

Every test must pass **on its own and in any order**. That's why `test.beforeEach` reloads the page for every test — no test depends on what a previous test did. (Playwright runs files in parallel; dependent tests would break instantly.)

### Arrange–Act–Assert

The universal shape of a test:

1. **Arrange** — get into the right state (`gotoHome(page, "/#contact")`)
2. **Act** — do the thing (`click the copy button`)
3. **Assert** — check the outcome (`"Copied!" visible`, clipboard content correct)

Look at the copy-button test in `03-contact.spec.js` — it's labelled with exactly these steps.

### Test both the feedback AND the side effect

The copy test checks the UI said "Copied!" **and** reads the actual clipboard. A test that only checked the label would pass even if the app copied the wrong text. Always ask: *"what could be broken while this test still passes?"*

---

## 6. Real problems this suite already solved (great interview stories)

**The intro-loader overlay.** This site shows a 7-second full-screen boot animation. Any click during it fails with "element is covered". Solutions applied (see `helpers.js` + config):
1. `reducedMotion: "reduce"` in the config — the loader respects the OS "reduce motion" setting and auto-skips. Emulating user preferences is a legit QA technique.
2. A defensive Skip-click in a shared helper, then an assertion that the overlay is *hidden* before any test proceeds.

**Clipboard permissions.** Browsers ask the user before a page may read the clipboard. Headless tests have no user to click "Allow", so the config pre-grants `clipboard-read`/`clipboard-write`.

**Strict mode / ambiguous locators.** "GitHub" matches a link in the hero AND one in the contact section. Playwright refuses to guess (strict mode) — we disambiguated with `exact: true` and by scoping searches inside the navbar locator. Ambiguity errors are a *feature*: they catch tests that might silently click the wrong thing.

---

## 7. Reading test results

- Terminal: `ok` per test, then `13 passed`.
- On failure, Playwright prints the failing assertion, the locator, and saves a **screenshot** into `test-results/`.
- `npm run test:report` opens the HTML report of the last run.
- On CI retries, a **trace** is recorded — open with `npx playwright show-trace <file>` to replay the whole test with DOM snapshots, console, and network. Traces are the single best debugging tool in Playwright.

---

## 8. CI: the tests run automatically on every push

This repo has a GitHub Actions workflow at `.github/workflows/playwright.yml`. Read the file — every step is commented. In short:

- **Trigger:** every push and pull request to `main`.
- **What happens:** GitHub spins up a clean Ubuntu machine, installs your exact dependencies (`npm ci`), installs Chromium, and runs `npx playwright test`. A failure marks the commit with a red ❌.
- **Prod parity:** on CI, `playwright.config.js` detects `CI=true` and tests the **production build** (`next build` + `next start`) instead of the dev server — CI verifies what visitors actually get, and a broken build fails the pipeline too.
- **Debugging failures:** open the failed run on GitHub → *Artifacts* → download `playwright-report` → unzip and open `index.html`. It contains screenshots and traces of the failure.
- **Where to see runs:** the *Actions* tab of the repo, or the ✅/❌ icon next to each commit.

**Interview line this earns you:** "My E2E suite is integrated into a CI/CD pipeline — every push runs the tests against a production build on a clean machine, with HTML reports and traces uploaded as artifacts for debugging."

---

## 9. Glossary (terms that come up in interviews)

| Term | Meaning |
|---|---|
| **Smoke test** | Minimal "does it even load" checks, run first |
| **Regression test** | Verifies previously-working behaviour still works after changes |
| **Flaky test** | Passes/fails randomly without code changes — usually timing/waits; the #1 enemy of automation |
| **Test pyramid** | Many unit tests, some integration, few E2E |
| **SDET** | Software Development Engineer in Test — QA who codes (the role you're aiming at) |
| **CI/CD integration** | Tests run automatically on every push (e.g. GitHub Actions) so broken code can't merge |
| **Selector / Locator** | The way a test finds an element on the page |
| **Assertion** | The check that decides pass/fail |
| **Fixture** | Reusable setup a test receives (Playwright's `{ page }` is one) |
| **Headless** | Browser running without a visible window (how CI runs tests) |
| **Trace** | Playwright's recording of a test run for debugging |
| **AAA** | Arrange–Act–Assert, the standard test structure |

---

## 10. Suggested learning path from here

1. **Watch the suite run:** `npm run test:ui` — click through each test's steps.
2. **Break something on purpose:** change a heading in `src/app/page.jsx`, run `npm test`, read the failure, fix it back. Seeing failures teaches more than seeing passes.
3. **Write one new test yourself.** Ideas (in rough difficulty order):
   - The About section shows some text you care about
   - The resume button exists and points at your PDF
   - The Certifications section renders each certificate name
   - The Work section shows all your project cards
4. **Try codegen:** `npx playwright codegen localhost:3000` — click around, watch it write code, compare its output to our hand-written tests.
5. **Study the CI workflow (already set up — see section 8):** read `.github/workflows/playwright.yml` line by line, then push a commit and watch it run in the repo's *Actions* tab. Background reading: https://playwright.dev/docs/ci-intro
6. **Then explore:** visual regression (`toHaveScreenshot`), accessibility scans (`@axe-core/playwright`), API testing (`request` fixture) — each is one more bullet point of genuine skill.

Official docs — genuinely good: https://playwright.dev/docs/intro

---

## 11. Cheat sheet

```js
// Navigate
await page.goto("/");                         // uses baseURL from config

// Find
page.getByRole("button", { name: "Save" });   // by accessible role+name (best)
page.getByText("Welcome");                    // by visible text
page.getByLabel("Email");                     // form field by its label
page.locator("#id, .class");                  // CSS (last resort)
navbar.getByRole("link", { name: "X" });      // scoped search inside a locator

// Act
await locator.click();
await locator.fill("text");                   // clears + types into an input
await locator.press("Enter");
await locator.hover();

// Assert (all auto-retry)
await expect(page).toHaveTitle(/regex/);
await expect(page).toHaveURL(/#contact/);
await expect(locator).toBeVisible();
await expect(locator).toBeHidden();
await expect(locator).toHaveText("exact");
await expect(locator).toContainText("part");
await expect(locator).toHaveAttribute("href", "/x");
await expect(locator).toBeInViewport();

// Structure
test.describe("group", () => { ... });
test.beforeEach(async ({ page }) => { ... });
test("name", async ({ page }) => { ... });
test.use({ viewport: { width: 375, height: 812 } });  // per-file overrides
```
