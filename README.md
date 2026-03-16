# Landing Page

Personal landing page built with Next.js 16 (Pages Router), React 19, TypeScript, and Tailwind CSS v4.

## Prerequisites

- [Bun](https://bun.sh) (package manager and runtime)

## Getting Started

### 1. Install dependencies

```bash
bun install
```

### 2. Run the development server

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Command          | Description                        |
| ---------------- | ---------------------------------- |
| `bun run dev`    | Start the development server       |
| `bun run build`  | Create a production build          |
| `bun run start`  | Start the production server        |
| `bun run lint`   | Run ESLint                         |
| `bun run test`   | Run all tests (Vitest)             |
| `bun run test:watch` | Run tests in watch mode        |

## Project Structure

```
pages/            -- Next.js pages and API routes
components/       -- Reusable UI components
components/__tests__/ -- Component unit tests (Vitest + React Testing Library)
data/             -- Typed content data
styles/           -- Global CSS (Tailwind CSS v4)
public/           -- Static assets (images, favicons)
```

## Tech Stack

- **Framework:** Next.js 16 (Pages Router)
- **Language:** TypeScript (strict mode)
- **UI:** React 19 with React Compiler
- **Styling:** Tailwind CSS v4
- **Testing:** Vitest + React Testing Library + jsdom
- **Linting:** ESLint v9 (flat config)
