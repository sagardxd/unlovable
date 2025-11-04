# Unlovable

AI-powered code execution platform built with Turborepo, Bun, and E2B for expo apps!

## Setup

```bash
bun install
```

Copy `.env.example` to `.env` and configure your environment variables:

- `BACKEND_PORT` - Port for the backend server
- `JWT_TOKEN_PASS` - Secret key for JWT token generation
- `HASH_SALT` - Salt for password hashing
- `OPENROUTER_API_KEY` - API key for OpenRouter
- `E2B_API_KEY` - API key for E2B sandbox
- `TEMPLATE_ID` - E2B template ID
- `REDIS_URL` - Redis connection URL
- `DATABASE_URL` - PostgreSQL connection URL

## Database

```bash
npx turbo db:generate
npx turbo db:migrate
```

## Development

```bash
bun run dev
```

## Apps

- `apps/backend` - Express API server
- `apps/worker` - Background job processor
- `apps/agent` - E2B code interpreter integration

## Packages

- `@repo/db` - Prisma database client
- `@repo/config` - Shared configuration
- `@repo/types` - Shared TypeScript types
- `@repo/e2b` - E2B sandbox manager
- `@repo/redis-store` - Redis utilities

## Commands

- `bun run dev` - Start development servers
- `bun run build` - Build all apps
- `bun run lint` - Lint code
- `bun run format` - Format code
