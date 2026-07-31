# Flixo Studio

A premium SaaS landing page and AI tools workspace built with TanStack Start, React 19, TypeScript, Tailwind CSS v4, and Radix UI.

## Running the app

The "Start application" workflow runs the Vite development server on port 5000:

```sh
npm run dev
```

Open the Replit preview pane to view the app.

## Stack

- **Framework**: TanStack Start (SSR + Vite)
- **Router**: TanStack Router (file-based)
- **UI**: Radix UI + Tailwind CSS v4
- **Translation**: Gemini API when configured, with a local mock fallback

## Environment variables

| Variable | Required | Description |
|---|---|---|
| `GEMINI_API_KEY` | Optional | Enables real AI translation |
| `VITE_GA_MEASUREMENT_ID` | Optional | Google Analytics |
| `VITE_CLARITY_PROJECT_ID` | Optional | Microsoft Clarity analytics |

## Project structure

```text
src/
  routes/       # File-based routes and page-level metadata
  components/   # Reusable UI, landing, layout, tool, and admin components
  hooks/        # Custom React hooks
  lib/          # Utilities, services, i18n, theme, and shared logic
  data/         # Static tool and content data
  styles.css    # Global Tailwind styles and theme tokens
```

## Adding a tool

1. Add the tool metadata to the canonical registry in `src/data/tools.ts`.
2. Add or update the corresponding category metadata in `src/data/categories.ts`.
3. Create a route under `src/routes/tools/<tool-name>.tsx`.
4. Build reusable UI in `src/components/tools/`.

## Security notes

- Keep provider keys in Replit Secrets or environment variables; never commit them.
- The development server is configured for Replit's proxied preview and must not be exposed as a public production server.
- Run `npm run typecheck`, `npm run lint`, and `npm run build` before shipping changes.

## User preferences

- Keep port 5000 for development and Replit preview.
- Preserve the existing TanStack Start architecture and project layout.