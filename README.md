# Angular upgrade: 14 → 22, step by step

A typical legacy Angular 14 app with Angular Material, upgraded **one major version at a time** to Angular 22 and then modernized.
Every step is a separate commit, and the build and unit tests pass after each one.

**[Live demo](https://raven737.github.io/angular-upgrade-14-to-22/)** · the version in the toolbar shows what is running.

## Result

| | Angular 14 (start) | Angular 22 (end) |
|---|---|---|
| Initial bundle, transferred | 187 kB | **145 kB (−22%)** |
| zone.js and polyfills | 33 kB | **removed (zoneless)** |
| NgModules | 6 | **0 (standalone)** |
| Build system | webpack | **esbuild** |
| Change detection | Default, manual subscriptions | **OnPush + signals** |
| Lines of code in `src` | | **−154** |

Production builds on the same machine, the "transferred" size is the compressed size the browser downloads.

## How to read this repo

Open the [commit history](https://github.com/Raven737/angular-upgrade-14-to-22/commits/main). Each commit message explains what `ng update` did, what broke and how it was fixed.

## Upgrade steps

| Step | What changed | What broke and how it was fixed |
|---|---|---|
| **14 → 15** | `relativeLinkResolution` removed from the router, test boilerplate removed, Material moved to `MatLegacy*` imports | `ng update` left a mix of 15 and 16 packages. Aligned all `@angular/*` packages to 15.2 |
| **Material → MDC** | New MDC-based Material components | The schematic turned display-only chips into a selectable listbox, moved them to `mat-chip-set`. A `::ng-deep` override of an internal class stopped working, replaced it with the official `subscriptSizing` API. `matLine` → `matListItemTitle` |
| **15 → 16** | | Build failed: `entryComponents` was removed from `NgModule`. Deleted it (not needed since Ivy). TypeScript 5.4 was installed but Angular 16 needs ≤ 5.1, pinned it |
| **16 → 17** | `browserTarget` → `buildTarget` | Legacy Material was removed in 17. The MDC migration done earlier made this step painless |
| **17 → 18** | `HttpClientModule` → `provideHttpClient()`, also in tests | Material 3 became the default. Moved the theme to the `m2-*` API to keep the design unchanged |
| **18 → 19** | Standalone became the default, `standalone: false` added to declared components | Stale `.angular/cache` caused "ɵɵdomElement was not found" errors. A package was left on v20, regenerated the lockfile. TypeScript pinned to 5.8 |
| **19 → 20** | `moduleResolution: bundler`, old file naming kept for the new style guide | TypeScript 6.0 was installed but Angular 20 supports up to 5.9, pinned it |
| **20 → 21** | `*ngIf` / `*ngFor` → `@if` / `@for`, `provideZoneChangeDetection()` added because zoneless became the default | Checked every migrated template by hand |
| **21 → 22** | OnPush became the default (existing components marked `Eager`), `HttpClient` now uses fetch (`withXhr()` added) | TypeScript 6.0 rejects the old `baseUrl` and `downlevelIteration` options from the v14 tsconfig, removed them |

## Modernization after the upgrade

| Before | After |
|---|---|
| NgModules, `SharedModule`, routing modules | Standalone components, `app.routes.ts`, lazy `loadComponent` |
| Constructor injection | `inject()` |
| `@Input()` / `@Output()` / `@ViewChild()` | `input()`, `output()`, `viewChild()` |
| Manual `subscribe` / `unsubscribe`, `Subject` + `takeUntil` | `toSignal()`, `computed()`, `takeUntilDestroyed()` |
| `ActivatedRoute` for the `:id` parameter | Route parameter bound as a component input |
| Default change detection with zone.js | OnPush everywhere, **zoneless** app |
| webpack builder | `@angular/build:application` (esbuild) |

## Run locally

```bash
npm install
npm start        # http://localhost:4200
npm test
npm run build
```

To see any intermediate version, check out its commit, for example `git checkout <commit>` and run `npm install`.

## Need to upgrade your Angular app?

I upgrade Angular projects, fix performance problems and build UI from Figma: https://www.fiverr.com/roman_dev777
