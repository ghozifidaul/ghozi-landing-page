# AGENTS.md

This file provides guidance for AI coding agents operating in this repository.

## Project Overview

Next.js 16 landing page using the **Pages Router**, TypeScript (strict mode), React 19,
Tailwind CSS v4, and the React Compiler. Package manager is **Bun**.

### Key Directories

- `pages/` -- Next.js Pages Router (pages, API routes)
- `pages/api/` -- API route handlers
- `components/` -- Reusable UI components
- `components/__tests__/` -- Component unit tests (Vitest + RTL)
- `data/` -- Typed content data (`profile.ts`, `types.ts`)
- `styles/` -- Global CSS (Tailwind v4)
- `public/` -- Static assets (images, favicons)

## Build / Lint / Test Commands

All commands use **Bun** as the package manager. Do NOT use npm or yarn.

```bash
# Development server
bun run dev

# Production build
bun run build

# Start production server
bun run start

# Lint the entire project (ESLint v9 flat config)
bun run lint

# Type-check without emitting
bunx tsc --noEmit
```

### Testing

Uses **Vitest** with **React Testing Library** and **jsdom**. Tests live alongside
components in `components/__tests__/`.

```bash
# Run all tests
bun run test

# Run tests in watch mode
bun run test:watch

# Run a single test file
bunx vitest run components/__tests__/SectionHeading.test.tsx

# Run tests matching a name pattern
bunx vitest run --testNamePattern "renders the title"
```

## Code Style Guidelines

### TypeScript

- **Strict mode is enabled** -- do not use `any` unless absolutely necessary.
- Use `import type { ... }` for type-only imports (separate from value imports).
- Use inline `type` keyword for type aliases: `type Foo = { bar: string }`.
- Use generics for typed API responses: `NextApiResponse<Data>`.
- Target is ES2017; avoid APIs not available in that target.

### Imports

Order imports as follows (separated by blank lines if desired):

1. Third-party packages (`next/*`, `react`, external libs)
2. Path-aliased local imports (`@/styles/...`, `@/components/...`)
3. Type-only imports using `import type` syntax

The path alias `@/*` maps to the project root. Use it for all local imports:

```ts
// Good
import { something } from "@/lib/utils";
import type { MyType } from "@/types";

// Avoid
import { something } from "../../lib/utils";
```

### Formatting

- **2-space indentation** (spaces, not tabs)
- **Double quotes** for all strings (imports, JSX attributes, string literals)
- **Semicolons** at end of statements
- **Trailing commas** on multi-line structures (objects, arrays, parameters)
- JSX attributes on separate lines when an element has many props
- Self-closing tags for void/childless elements: `<Component />`

### Naming Conventions

| Kind              | Convention  | Example                          |
|-------------------|-------------|----------------------------------|
| Components        | PascalCase  | `HomePage`, `UserCard`           |
| Pages (default)   | PascalCase  | `export default function Home()` |
| Functions         | camelCase   | `handleClick`, `fetchData`       |
| Variables/consts  | camelCase   | `userName`, `apiUrl`             |
| Types/Interfaces  | PascalCase  | `UserData`, `ApiResponse`        |
| CSS variables     | kebab-case  | `--color-background`             |
| Files (pages)     | kebab-case  | `about-us.tsx`, `api/hello.ts`   |
| Files (components)| PascalCase  | `UserCard.tsx`                   |

### Components

- Use **functional components** only (no class components).
- Use **named function declarations** for page/exported components:
  ```tsx
  export default function Home() { ... }
  ```
- Do NOT import React explicitly (the modern `react-jsx` transform is active).
- The React Compiler is enabled -- avoid manual `useMemo`/`useCallback` in most cases.

### Styling

- Use **Tailwind CSS v4** utility classes inline via `className`.
- For dynamic class names, use template literals:
  ```tsx
  className={`${baseClass} ${isActive ? "text-blue-500" : "text-gray-500"}`}
  ```
- Dark mode is handled via `prefers-color-scheme` media query and Tailwind `dark:` variant.
- Use CSS custom properties for theme values in `styles/globals.css`.

### API Routes

Follow the standard Next.js Pages Router pattern:

```ts
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  res.status(200).json({ message: "OK" });
}
```

### Error Handling

- In API routes, return appropriate HTTP status codes with typed error responses.
- In components, use React error boundaries for runtime errors.
- Prefer early returns for guard clauses over deeply nested conditionals.
- Always handle promise rejections -- never leave `.catch()` empty or omit error handling.

## Configuration Reference

| File                 | Purpose                                      |
|----------------------|----------------------------------------------|
| `next.config.ts`     | Next.js config (React Compiler, strict mode) |
| `tsconfig.json`      | TypeScript config (strict, path aliases)     |
| `eslint.config.mjs`  | ESLint v9 flat config (next/core-web-vitals)  |
| `postcss.config.mjs` | PostCSS with Tailwind CSS v4 plugin          |
| `package.json`       | Dependencies, scripts                        |

## ESLint

Uses ESLint v9 **flat config** format with:
- `eslint-config-next/core-web-vitals` -- Next.js + Web Vitals rules
- `eslint-config-next/typescript` -- TypeScript-specific rules

Global ignores: `.next/`, `out/`, `build/`, `next-env.d.ts`.

When adding new ESLint rules, add them to `eslint.config.mjs` using the flat config API.

## Common Pitfalls

- **Do not edit `next-env.d.ts`** -- it is auto-generated by Next.js.
- **Do not use `require()`** -- use ESM `import` syntax exclusively.
- **Do not add `"use client"` or `"use server"` directives** -- those are App Router
  features. This project uses the Pages Router.
- **Bun lockfile** (`bun.lock`) should be committed. Do not delete it or generate
  lockfiles for other package managers.
- **React 19** is in use -- be aware of new APIs and behavior changes vs React 18.
