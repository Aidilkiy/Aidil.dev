# QA & Playwright Learning Guide

*Your personal reference for the automated test suite in this portfolio — and for QA interviews.*

**Status: ✅ COMPLETE AND LIVE**

| | |
|---|---|
| Test suite | 13 E2E tests, all passing |
| Framework | Playwright 1.x (JavaScript) |
| CI/CD | GitHub Actions — runs on every push/PR to `main` |
| First CI run | ✅ Passed in 2.3 minutes ([see it live](https://github.com/Aidilkiy/Aidil.dev/actions)) |
| Local run time | ~55s (dev server) / ~53s (production build) |

**Contents:** 1. Why this exists · 2. How to run · 3. How this suite was built · 4. Testing pyramid · 5. What's in the suite · 6. Core concepts · 7. Problems solved (interview stories) · 8. CI pipeline · 9. Reading results & debugging · 10. Troubleshooting · 11. Glossary · 12. Learning path · 13. Cheat sheet

---

## 1. Why this exists

This project has an **end-to-end (E2E) test suite** built with [Playwright](https://playwright.dev). E2E tests open a real browser, click through the site like a visitor would, and verify that everything works. This is the exact skill asked for in QA Engineer roles ("Playwright", "JavaScript/TypeScript automated tests", "testing pyramid", "CI/CD integration").

On your CV you can now honestly write:

> Built an automated E2E test suite with Playwright (JavaScript) covering critical user journeys — navigation, responsive mobile behaviour, and clipboard interactions — integrated into a GitHub Actions CI/CD pipeline that tests the production build on every push.

Every word of that is verifiable: the code is public, and the Actions tab shows green pipeline runs.

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

## 3. How this suite was built, step by step

This mirrors how a QA engineer approaches a new app on the job — the process is a skill in itself:

1. **Explored the app first.** Read the source to find what matters: four page sections on one scrolling page, a navbar that scrolls to anchors, a contact section with copy-to-clipboard, a mobile hamburger menu — and a 7-second intro animation covering everything on load.
2. **Chose what to test.** Not everything — the *critical user journeys*: does the site load, can a visitor navigate, can a recruiter reach the contact info, does it work on a phone. (See the testing pyramid, section 4.)
3. **Installed the tooling.** `npm install --save-dev @playwright/test`, then `npx playwright install chromium` to download the browser Playwright drives.
4. **Wrote the config** (`playwright.config.js`) before any test: base URL, auto-started web server, reduced-motion emulation, clipboard permissions, screenshots on failure.
5. **Solved the blocker first.** The intro overlay would have broken every test, so the shared `gotoHome()` helper in `tests/helpers.js` was written before any test file.
6. **Wrote tests in increasing difficulty** — smoke → navigation → interactions → mobile — and ran them: **13/13 passed, 58s**.
7. **Added CI** (`.github/workflows/playwright.yml`), switched CI runs to the production build, **simulated CI locally first** (`CI=true npm test` → 13/13 in 52.7s), then pushed. First real pipeline run: **✅ success, 2.3 minutes**.

**The habit to copy:** verify locally before pushing; solve shared problems in one helper, not in every test; test the build users actually get.

---

## 4. The big picture: the Testing Pyramid

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

## 5. What's in this suite — all 13 tests

| File | Tests | Key concepts taught |
|---|---|---|
| `tests/helpers.js` | (shared setup, no tests) | DRY helpers, handling app overlays |
| `tests/01-smoke.spec.js` | 5 tests | locators, `getByRole`, web-first assertions |
| `tests/02-navigation.spec.js` | 3 tests | scoping locators, `toHaveURL`, `toBeInViewport` |
| `tests/03-contact.spec.js` | 3 tests | interactions & side effects, `page.evaluate` |
| `tests/04-mobile.spec.js` | 2 tests | `test.use`, responsive testing, asserting absence |

The full list — each name states an expected behaviour, readable as a mini spec of the site:

**01 — Smoke** (does the app fundamentally work?)
1. page loads with the correct title
2. hero shows the main headline
3. primary call-to-action points at the work section
4. social links point to the right profiles
5. hero stats strip renders all three stats

**02 — Navigation** (can a visitor get around?)
6. navbar shows the logo and all section links
7. clicking Contact scrolls to the contact section
8. clicking Projects scrolls to the work section

**03 — Contact** (can a recruiter reach you?)
9. contact cards link to the right destinations
10. copy button copies the email address and shows feedback
11. availability panel and footer are present

**04 — Mobile** (does it work on a phone?)
12. shows the hamburger button instead of the desktop navbar
13. hamburger opens the menu and navigates to a section

Each file has heavy comments — **read them top to bottom in order**, they build on each other.

---

## 6. Core concepts (the vocabulary of QA automation)

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

## 7. Real problems this suite solved (great interview stories)

**The intro-loader overlay.** This site shows a 7-second full-screen boot animation. Any click during it fails with "element is covered". Solutions applied (see `helpers.js` + config):
1. `reducedMotion: "reduce"` in the config — the loader respects the OS "reduce motion" setting and auto-skips. Emulating user preferences is a legit QA technique.
2. A defensive Skip-click in a shared helper, then an assertion that the overlay is *hidden* before any test proceeds.

**Clipboard permissions.** Browsers ask the user before a page may read the clipboard. Headless tests have no user to click "Allow", so the config pre-grants `clipboard-read`/`clipboard-write`.

**Strict mode / ambiguous locators.** "GitHub" matches a link in the hero AND one in the contact section. Playwright refuses to guess (strict mode) — we disambiguated with `exact: true` and by scoping searches inside the navbar locator. Ambiguity errors are a *feature*: they catch tests that might silently click the wrong thing.

**Dev/prod parity.** Locally you test against `next dev`; visitors get the production build — and prod-only bugs exist (build failures, different optimisation). The config switches on `CI=true` to `next build && next start`, so the pipeline tests what actually ships. We proved this path worked by simulating CI locally *before* pushing.

---

## 8. CI: the tests run automatically on every push ✅ LIVE

The workflow at `.github/workflows/playwright.yml` is active — the first pipeline run passed in 2.3 minutes with every step green. Read the file; every step is commented. In short:

- **Trigger:** every push and pull request to `main`.
- **What happens:** GitHub spins up a clean Ubuntu machine, checks out the code, installs your exact dependencies (`npm ci` — reproducible, unlike `npm install`), installs Chromium, and runs `npx playwright test`. A failure marks the commit with a red ❌.
- **Prod parity:** on CI, `playwright.config.js` detects `CI=true` and tests the **production build** — CI verifies what visitors actually get, and a broken build fails the pipeline too.
- **Debugging failures:** open the failed run on GitHub → *Artifacts* → download `playwright-report` → unzip and open `index.html`. It contains screenshots and traces of the failure.
- **Where to see runs:** the [Actions tab](https://github.com/Aidilkiy/Aidil.dev/actions) of the repo, or the ✅/❌ icon next to each commit.

**Interview line this earns you:** "My E2E suite is integrated into a CI/CD pipeline — every push runs the tests against a production build on a clean machine, with HTML reports and traces uploaded as artifacts for debugging."

---

## 9. Reading results & debugging

- Terminal: `ok` per test, then `13 passed`.
- On failure, Playwright prints the failing assertion, the locator, and saves a **screenshot** into `test-results/`.
- `npm run test:report` opens the HTML report of the last run.
- On CI retries, a **trace** is recorded — open with `npx playwright show-trace <file>` to replay the whole test with DOM snapshots, console, and network. Traces are the single best debugging tool in Playwright.
- To debug one test interactively: `npx playwright test -g "test name" --debug` — opens the Playwright Inspector and steps through line by line.

---

## 10. Troubleshooting — errors you'll meet while experimenting

| Error message | What it means | Fix |
|---|---|---|
| `Timed out waiting for expect(locator).toBeVisible()` | The element never appeared — wrong locator, or the feature actually broke | Run with `--ui` and look at the page; check the locator matches what's rendered |
| `strict mode violation: resolved to N elements` | Your locator matches several elements | Add `exact: true`, scope inside a parent locator, or use `.first()` deliberately |
| `element is not visible` / `element is covered` | Something overlaps it (remember the intro loader!) | Make sure `gotoHome()` was used; check for overlays/modals |
| `Port 3000 is already in use` (CI) | A stray server was running when Playwright tried to start one | Locally harmless (`reuseExistingServer` handles it); on CI, kill duplicate server steps |
| `browserType.launch: Executable doesn't exist` | Playwright's browser isn't installed on this machine | `npx playwright install chromium` |
| `Error: page.evaluate: ... clipboard` | Clipboard permission missing | Already granted in `playwright.config.js` — check you didn't remove `permissions` |
| Test passes locally, fails on CI | Usually timing (slower machine) or dev/prod difference | Download the CI report artifact, open the trace, watch what happened |

**Golden debugging rule:** don't guess — *look*. UI mode, traces, and screenshots show you exactly what the browser saw. Guessing is how flaky "fixes" get written.

---

## 11. Glossary (terms that come up in interviews)

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
| **Artifact (CI)** | A file a pipeline saves for download — here, the HTML test report |
| **`npm ci`** | Clean install of *exactly* what package-lock.json pins — the CI-safe install command |
| **Prod parity** | Testing the same build users get, not just the dev version |

---

## 12. Learning path

Done so far (by building this suite):

- [x] Playwright installed and configured
- [x] 13 tests across smoke / navigation / interaction / mobile — all passing
- [x] Shared helper pattern for app-specific setup
- [x] CI pipeline on GitHub Actions — first run green (2.3 min)
- [x] Production-build testing on CI

Your next steps, in order:

1. **Watch the suite run:** `npm run test:ui` — click through each test's steps.
2. **Break something on purpose:** change a heading in `src/app/page.jsx`, run `npm test`, read the failure, fix it back. Seeing failures teaches more than seeing passes. Then push a breaking change on a branch and watch CI catch it — that's the pipeline doing its job.
3. **Write one new test yourself.** Ideas (in rough difficulty order):
   - The About section shows some text you care about
   - The resume button exists and points at your PDF
   - The Certifications section renders each certificate name
   - The Work section shows all your project cards
4. **Try codegen:** `npx playwright codegen localhost:3000` — click around, watch it write code, compare its output to our hand-written tests.
5. **Study the CI workflow:** read `.github/workflows/playwright.yml` line by line — every step is commented. Background reading: https://playwright.dev/docs/ci-intro
6. **Then explore:** visual regression (`toHaveScreenshot`), accessibility scans (`@axe-core/playwright`), API testing (`request` fixture), cross-browser (add `firefox`/`webkit` projects in the config) — each is one more bullet point of genuine skill.

Official docs — genuinely good: https://playwright.dev/docs/intro

---

## 13. Cheat sheet

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

// Run (terminal)
// npm test                          all tests, headless
// npm run test:ui                   interactive UI mode (learning!)
// npx playwright test -g "name"     one test by name
// npx playwright test --debug       step through with Inspector
// npx playwright codegen <url>      record clicks as code
```
