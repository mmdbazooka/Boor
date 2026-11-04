# Boor — Creative intelligence studio

A bilingual, frontend-only creative studio built as a portfolio project. Boor turns a short brief into an editable starting point for a brand identity, campaign, or content direction using curated local templates. No live AI API, authentication, or backend is required.

## Run locally

Requires Node.js 20.9+ (validated with Node.js 24) and npm.

```bash
npm ci
npm run dev
```

Open the app on port 3000. `/` redirects to `/en`; Persian is available at `/fa`.

```bash
npm run lint
npm run typecheck
npm run build
npm run start
```

## Pages

| Route                 | Purpose                                                                     |
| --------------------- | --------------------------------------------------------------------------- |
| `/[locale]`           | Editorial landing page, platform overview, showcase and process             |
| `/[locale]/dashboard` | Project overview, brief shortcut, creative inspiration                      |
| `/[locale]/studio`    | Validated brief form, mood selection, simulated generation, copy and export |
| `/[locale]/library`   | Search, type filters, project details, export and confirmed deletion        |
| `/[locale]/settings`  | Persistent profile and workspace language                                   |

`locale` is `en` or `fa`. Language switching preserves the current route and search parameters. Persian pages render `lang="fa"` and `dir="rtl"` on the server, use Vazirmatn, logical CSS spacing, and localized numbers and dates. English uses Manrope. Both fonts are bundled locally.

## Structure

```text
src/
  app/
    [locale]/
      (marketing)/         # Landing route
      (workspace)/         # Shared application layout and tool routes
      layout.tsx           # Server-rendered language, direction and metadata
      loading.tsx
      error.tsx
    globals.css            # Tailwind v4, tokens, component styling, RTL and responsive rules
  components/
    brand/                 # Original Boor mark and procedural CSS artwork
    layout/                # Marketing navigation and workspace shell
    marketing/             # Server-rendered landing composition
    workspace/             # Feature components and persisted workspace state
    ui/                    # Accessible dialog and locale switch
  i18n/
    config.ts              # Supported locales and formatting
    dictionaries.ts        # Typed English/Persian copy
  lib/
    projects.ts            # Domain types, sample projects, template generation and export
public/icon.svg            # Original Boor app icon
tests/workspace.spec.ts    # Browser-level workflow checks
```

## Architecture decisions

- App Router layouts and route pages are Server Components. The landing composition remains on the server; navigation, forms, dialogs, and browser state are isolated Client Components. Props crossing the boundary are serializable.
- Tailwind CSS v4 is integrated through PostCSS. Theme tokens, utility classes, and semantic component classes handle the visual system without a UI framework.
- One typed dictionary contract guarantees that both locales contain the same content keys. No translation service or network font requests are required.
- `useSyncExternalStore` reads browser state safely after hydration and synchronizes changes across tabs. Storage failures surface to the user; malformed records are discarded. Data is stored under `boor-workspace-v1`.
- Native modal dialogs provide focus trapping and Escape dismissal. Inputs have labels, controls have focus states, reduced motion is respected, and a skip link is provided.
- The original brand mark and abstract product compositions are SVG/CSS, so the interface does not depend on external image services.

## Demo boundaries

Generation is intentionally simulated with a short delay and deterministic templates selected by type and mood. Your brief and audience are included in the resulting direction. Projects and profile preferences exist only in the current browser; clearing site data removes them. Exported `.txt` briefs provide a portable copy. Sample projects can be inspected and removed. There are no fake sign-in or billing flows.

To connect a real model later, replace the template generation call behind a server-side route, add authentication and persistence, and keep provider credentials on the server.

## Browser checks

```bash
npx playwright install chromium
npm run build
npm run test:e2e
```

The suite runs against the production server on desktop and mobile. It checks both languages, horizontal overflow, browser errors, project creation/persistence/search/export/deletion, profile persistence, locale switching, and landing navigation.

In the managed cloud environment Chromium is preinstalled:

```bash
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm run test:e2e
```

## Formatting

```bash
npm run format
npm run format:check
```

Use the existing checkout in isolated cloud tasks; an additional Git worktree is unnecessary unless explicitly requested.
