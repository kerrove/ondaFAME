# Зависимости ставит bun (lockfile — bun.lock), а собирает и запускает Next настоящий node:
# под bun процесс сборки падает на выгрузке WASM (resvg/yoga для next/og), см. CLAUDE.md.
FROM oven/bun:1.3.8 AS deps
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

FROM node:22-slim AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# NEXT_PUBLIC_* вшиваются в бандл на этапе сборки, поэтому .env.production нужен именно здесь
RUN node node_modules/next/dist/bin/next build

FROM node:22-slim AS production
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json /app/next.config.ts /app/.env.production ./
EXPOSE 3000
CMD ["node", "node_modules/next/dist/bin/next", "start", "-H", "0.0.0.0", "-p", "3000"]
