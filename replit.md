# Flixo Studio

A premium SaaS landing page with an AI Translator tool — built with TanStack Start, React 19, TypeScript, Tailwind CSS v4, and Radix UI.

## Stack

- **Framework**: TanStack Start (SSR + Vite)
- **Router**: TanStack Router (file-based)
- **UI**: Radix UI + Tailwind CSS v4 + shadcn/ui components
- **Animations**: Motion (Framer Motion)
- **Translation**: Gemini API (server-side)

## Running the app

```sh
npm run dev   # starts on port 5000
```

The "Start application" workflow runs `npm run dev` and serves on port 5000.

## Environment variables

| Variable | Required | Description |
|---|---|---|
| `GEMINI_API_KEY` | Optional | Enables real AI translation (falls back to mock without it) |
| `VITE_GA_MEASUREMENT_ID` | Optional | Google Analytics |
| `VITE_CLARITY_PROJECT_ID` | Optional | Microsoft Clarity analytics |

## Project structure

```
src/
  routes/       # File-based routes (TanStack Router)
  components/   # Reusable UI components
  hooks/        # Custom React hooks
  lib/          # Utilities and helpers
  data/         # Static data / mock content
```

## User preferences

- Keep port 5000 for dev (Replit webview requirement)
- Do not restructure the existing TanStack Start / Lovable project layout
