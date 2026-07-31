# Flixo Studio

A premium SaaS landing page and AI tools workspace built with React + Vite + TanStack Start + Tailwind CSS.

## How to run

The dev server starts automatically via the "Start application" workflow:

```sh
npm run dev
```

Runs on port 5000. Open the preview pane to see the app.

## Stack

- **React 19** + **TypeScript**
- **Vite 8** with `@lovable.dev/vite-tanstack-config`
- **TanStack Start** (SSR/file-based routing via TanStack Router)
- **Tailwind CSS v4**
- **Radix UI** component primitives
- **TanStack Query** for data fetching

## Project structure

```
src/
  routes/          # File-based routes (TanStack Router)
    index.tsx      # Landing page
    tools/         # AI tool pages (e.g. translator)
  components/
    landing/       # Landing page sections
    layout/        # Shared layout (navbar, footer)
    tools/         # Tool-specific UI components
    ui/            # Reusable Radix-based primitives
  lib/             # Utilities, theme, i18n helpers
  data/            # Static data (tool catalog, categories)
  hooks/           # Custom React hooks
```

## Adding a new AI tool

1. Add tool metadata to `src/data/`.
2. Create a route file under `src/routes/tools/<tool-name>.tsx`.
3. Build the tool UI in `src/components/tools/`.

## Notes

- No backend, no authentication required.
- Translation uses a mock function — swap it for a real API call when ready.
- `vite.config.ts` sets `host: "0.0.0.0"` and `port: 5000` so the app works inside Replit's proxied preview.

## User preferences
