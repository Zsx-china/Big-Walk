# Task 2 report: locale routing, dictionaries, and root layout

## Status

Complete. Locale configuration supports English and Spanish, `/` redirects to `/en`, locale routes validate their parameter, and both the request configuration and layout load the matching dictionary.

## Commit

`feat: add locale routing and dictionaries` (commit hash recorded after commit).

## Files

- Created `i18n/config.ts` and `i18n/request.ts`.
- Created English and Spanish dictionaries in `messages/`.
- Created `app/[locale]/layout.tsx` and `app/[locale]/not-found.tsx`.
- Replaced `app/page.tsx` with the `/en` redirect.
- Updated `next.config.mjs` with `createNextIntlPlugin('./i18n/request.ts')` while preserving its existing Next configuration.
- Created `tests/i18n.test.ts`.

## Commands and results

1. `node_modules\\.bin\\vitest.CMD run tests/i18n.test.ts`
   - Initial test-first invocation was attempted before `i18n/config.ts` existed, but the shell did not have `node` on `PATH`; it exited 1 with `'node' is not recognized as an internal or external command`. This prevented the requested module-not-found observation.
2. `$env:PATH='C:\\Users\\34420\\.cache\\codex-runtimes\\codex-primary-runtime\\dependencies\\node\\bin;C:\\Users\\34420\\.cache\\codex-runtimes\\codex-primary-runtime\\dependencies\\bin\\fallback;'+$env:PATH; node_modules\\.bin\\vitest.CMD run tests/i18n.test.ts`
   - Passed: 1 test file, 1 test.
3. `$env:PATH='C:\\Users\\34420\\.cache\\codex-runtimes\\codex-primary-runtime\\dependencies\\node\\bin;C:\\Users\\34420\\.cache\\codex-runtimes\\codex-primary-runtime\\dependencies\\bin\\fallback;'+$env:PATH; node_modules\\.bin\\next.CMD build`
   - First run surfaced TypeScript errors in `i18n/request.ts` because `requestLocale` remained typed as possibly undefined. Fixed by narrowing the local value to `Locale`.
   - Final run passed: compilation, TypeScript checking, static-page generation, and final optimization all completed successfully.
4. Final Vitest command from step 2
   - Passed: 1 test file, 1 test.
5. `git diff --check`
   - Passed with no whitespace errors.

## Self-review

- `locales` is the exact readonly tuple `['en', 'es']`; the predicate narrows to `Locale`.
- Invalid locale route segments call `notFound()` in the locale layout.
- The request config selects a dictionary only after normalizing to a supported locale.
- The locale layout sets `lang`, uses only Inter weights 400/500/600/700, and wraps children in `NextIntlClientProvider`.
- Both dictionaries include the requested header, footer, common-label, and language-name translations.

## Concerns

- The pre-implementation test command could not exhibit the specified module-not-found failure because this shell initially lacked Node on `PATH`; the later supplied runtime path enabled all required direct-binary validation.
