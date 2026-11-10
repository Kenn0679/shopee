# Shopee Clone (E-Commerce Storefront)

A responsive e-commerce web application built with React and TypeScript, featuring product browsing, cart & purchase flow, URL-synced filtering, silent JWT token refresh, bilingual UI (EN/VI), unit/integration tests, and Storybook components.

## Key Features

- **Auth & Token Lifecycle:** Login/register with React Hook Form + Yup validation and an Axios interceptor that queues requests and refreshes expired access tokens transparently (`src/utils/http.ts`).
- **Product Discovery & Cart:** URL-driven search, category/price/rating filters, pagination, product detail view (HTML descriptions sanitized with DOMPurify), and cart/purchase management powered by TanStack Query.
- **User Account:** Profile update with avatar upload validation, password change, and order history tracking.
- **Bilingual (EN / VI):** Runtime language switching via `i18next` and `react-i18next`.
- **Quality & Testing:** Unit and integration tests with Vitest, React Testing Library, and MSW (`src/msw`), plus isolated UI stories in Storybook.

## Tech Stack

- **Core:** React 18, TypeScript, Vite, React Router v7
- **Data & Forms:** TanStack Query (with storage persistence), Axios, React Hook Form, Yup
- **Styling & UX:** Tailwind CSS, Framer Motion, Floating UI, React Toastify, DOMPurify
- **Testing & Tooling:** Vitest, Testing Library, MSW, Storybook, ESLint, Prettier

## Getting Started

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Run tests
pnpm test

# Run Storybook
pnpm storybook

# Build for production
pnpm build
